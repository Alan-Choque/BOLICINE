import os
import sys
import numpy as np
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

# 1) Cargar .env
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/novacode')

# 2) Conexión a MongoDB
try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database()
    users_col = db['users']
    movies_col = db['movies']
    recmodels_col = db['rec_models']
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    sys.exit(1)

# 3) Preparar diccionario de películas
#    Incluye: movie_id_mysql, release_date, average_rating, synopsis (para longitud), embedding
peliculas_cursor = movies_col.find({}, {
    "movie_id_mysql": 1,
    "release_date": 1,
    "average_rating": 1,
    "synopsis": 1,
    "embedding": 1
})
peliculas_dict = {
    m["movie_id_mysql"]: m
    for m in peliculas_cursor
    if m.get("embedding") and isinstance(m.get("embedding"), list)
}

if not peliculas_dict:
    print("❌ No hay películas con embedding en Mongo. Asegúrate de ejecutar compute_movie_embeddings.py primero.")
    sys.exit(1)

# 4) Leer usuarios con embedding
usuarios = list(users_col.find({"embedding.0": {"$exists": True}}, {
    "user_id_mysql": 1,
    "embedding": 1,
    "ratings": 1
}))

if not usuarios:
    print("❌ No hay usuarios con embedding en Mongo. Asegúrate de ejecutar compute_user_embeddings.py primero.")
    sys.exit(1)

print(f"👤 Usuarios con embedding: {len(usuarios)}")
print(f"🎥 Películas disponibles (con embedding): {len(peliculas_dict)}")

# 5) Calcular year_mean (promedio de año de estreno)
years = []
for m in peliculas_dict.values():
    rd = m.get("release_date")
    if isinstance(rd, datetime):
        years.append(rd.year)
year_mean = sum(years) / len(years) if years else datetime.now().year
print(f"🔢 Año promedio de estreno (year_mean): {year_mean:.2f}")

# 6) Construir dataset Z (features) e Y (labels)
Z = []
Y = []

for u in usuarios:
    u_id_mysql = u["user_id_mysql"]
    user_emb = u.get("embedding", [])
    if not user_emb:
        continue

    # ratings del usuario: cada elemento es { movie_id: ObjectId, rating: int, rated_at: datetime }
    ratings = u.get("ratings", [])
    # Creamos un dicc: movie_id_mysql → rating
    rated_dict = {}
    for r in ratings:
        movie_oid = r["movie_id"]
        movie_doc = movies_col.find_one({"_id": movie_oid}, {"movie_id_mysql": 1})
        if movie_doc:
            rated_dict[movie_doc["movie_id_mysql"]] = r["rating"]

    for movie_id_mysql, m in peliculas_dict.items():
        movie_emb = m.get("embedding", [])
        # Feature 1: similitud coseno
        if movie_emb and user_emb:
            u_arr = np.array(user_emb)
            m_arr = np.array(movie_emb)
            num = np.dot(u_arr, m_arr)
            den = np.linalg.norm(u_arr) * np.linalg.norm(m_arr) + 1e-8
            z1 = float(num / den)
        else:
            z1 = 0.0

        # Feature 2: |release_year - year_mean|
        rd = m.get("release_date")
        ry = rd.year if isinstance(rd, datetime) else year_mean
        z2 = abs(ry - year_mean)

        # Feature 3: average_rating (ya almacenado en la película)
        z3 = float(m.get("average_rating", 0.0))

        # Feature 4: longitud del synopsis (número de palabras)
        synopsis = m.get("synopsis", "") or ""
        z4 = float(len(synopsis.split()))

        # Feature 5: indicador si el usuario ya vio (cualquier rating) esta película
        z5 = 1.0 if (movie_id_mysql in rated_dict) else 0.0

        # Label y: 1 si rating >= 4, 0 en otro caso (si no existe rating, 0)
        rating_val = rated_dict.get(movie_id_mysql)
        y_val = 1.0 if (rating_val is not None and rating_val >= 4.0) else 0.0

        Z.append([z1, z2, z3, z4, z5])
        Y.append(y_val)

Z_arr = np.array(Z)
Y_arr = np.array(Y)

print(f"📊 Construido dataset con {Z_arr.shape[0]} ejemplos y {Z_arr.shape[1]} features.")

# 7) Entrenar regresión logística con Newton–Raphson
p = Z_arr.shape[1]
beta = np.zeros(p)

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

max_iter = 10
tol = 1e-6

for it in range(max_iter):
    linear = Z_arr.dot(beta)
    pi = sigmoid(linear)

    # Gradiente
    grad = (Y_arr - pi).dot(Z_arr)   # (p,)

    # Hessiana
    H = np.zeros((p, p))
    for i in range(Z_arr.shape[0]):
        zi = Z_arr[i, :].reshape(p, 1)
        pi_i = pi[i]
        H += pi_i * (1 - pi_i) * (zi @ zi.T)

    # Resolver H delta = grad
    try:
        delta = np.linalg.solve(H + 1e-8 * np.eye(p), grad)
    except np.linalg.LinAlgError:
        print("⚠️ Hessiana singular. Deteniendo entrenamiento.")
        break

    beta_new = beta + delta
    diff = np.linalg.norm(beta_new - beta)
    beta = beta_new
    print(f"Iter {it+1}: ||Δβ|| = {diff:.6f}")
    if diff < tol:
        print("🔔 Convergencia alcanzada.")
        break

print(f"🏁 Entrenamiento completado. Coeficientes β:\n{beta}")

# 8) Guardar en MongoDB (colección `rec_models`)
model_doc = {
    "name": "logistic_v1",
    "coefficients": beta.tolist(),
    "updated_at": datetime.now()
}
recmodels_col.replace_one({"name": "logistic_v1"}, model_doc, upsert=True)
print("✅ Coeficientes guardados en rec_models (MongoDB)")


