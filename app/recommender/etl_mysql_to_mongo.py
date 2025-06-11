import os
import sys
from datetime import datetime
import mysql.connector
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
MYSQL_USER = os.getenv('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
MYSQL_DATABASE = os.getenv('MYSQL_DATABASE', 'bd_novacode')

MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/novacode')

try:
    mysql_conn = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )
except mysql.connector.Error as err:
    print(f"❌ Error conectando a MySQL: {err}")
    sys.exit(1)

mysql_cursor = mysql_conn.cursor(dictionary=True)
print("✅ Conectado a MySQL")

try:
    mongo_client = MongoClient(MONGODB_URI)
    mongo_db = mongo_client.get_database()
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    sys.exit(1)

users_col = mongo_db['users']
movies_col = mongo_db['movies']
print("✅ Conectado a MongoDB")

 
mysql_cursor.execute("""
    SELECT 
        id_usuario, 
        nombre, 
        apellido, 
        email, 
        rol, 
        fecha_registro 
    FROM usuarios;
""")
usuarios = mysql_cursor.fetchall()
print(f"🧑‍💻 Usuarios encontrados en MySQL: {len(usuarios)}")

for u in usuarios:
    doc_user = {
        "user_id_mysql": u["id_usuario"],
        "first_name": u["nombre"],
        "last_name": u["apellido"],
        "email": u["email"],
        "role": u["rol"],
        "created_at": u["fecha_registro"] if isinstance(u["fecha_registro"], datetime) else None,
        "preferences": {"genres": [], "content_types": []},
        "history": [],      
        "ratings": [],      
        "embedding": []    
    }
    users_col.replace_one(
        {"user_id_mysql": u["id_usuario"]},
        doc_user,
        upsert=True
    )
print("✅ Usuarios importados a MongoDB")

mysql_cursor.execute("""
    SELECT 
        p.id_pelicula AS movie_id_mysql,
        p.titulo        AS title,
        p.sinopsis      AS synopsis,
        p.duracion      AS duration,
        p.fecha_lanzamiento AS release_date,
        pr.nombre_productora AS producer,
        p.tipo_contenido AS content_type,
        p.imagen_portada AS cover_url,
        p.url_video      AS stream_url,
        c.codigo         AS classification,
        p.calificacion_promedio AS average_rating
    FROM peliculas p
    LEFT JOIN productoras pr ON p.id_productora = pr.id_productora
    LEFT JOIN clasificaciones c ON p.id_clasificacion = c.id_clasificacion;
""")
peliculas = mysql_cursor.fetchall()
print(f"🎥 Películas encontradas en MySQL: {len(peliculas)}")

for m in peliculas:
    movie_id = m["movie_id_mysql"]

    mysql_cursor.execute("""
        SELECT g.nombre_genero 
        FROM peliculas_generos pg 
        JOIN generos g ON pg.id_genero = g.id_genero 
        WHERE pg.id_pelicula = %s;
    """, (movie_id,))
    genero_rows = mysql_cursor.fetchall()
    genres = [g["nombre_genero"] for g in genero_rows] if genero_rows else []

    mysql_cursor.execute("""
        SELECT d.nombre_director, d.apellido_director 
        FROM peliculas_directores pd 
        JOIN directores d ON pd.id_director = d.id_director 
        WHERE pd.id_pelicula = %s;
    """, (movie_id,))
    director_rows = mysql_cursor.fetchall()
    directors = []
    for d in director_rows:
        nombre = d.get("nombre_director") or ""
        apellido = d.get("apellido_director") or ""
        full = f"{nombre} {apellido}".strip()
        if full:
            directors.append(full)

    mysql_cursor.execute("""
        SELECT a.nombre_actor, a.apellido_actor, r.rol 
        FROM reparto r 
        JOIN actores a ON r.id_actor = a.id_actor 
        WHERE r.id_pelicula = %s;
    """, (movie_id,))
    reparto_rows = mysql_cursor.fetchall()
    cast = []
    for r in reparto_rows:
        actor_nombre = r.get("nombre_actor") or ""
        actor_apellido = r.get("apellido_actor") or ""
        rol_act = r.get("rol") or ""
        actor_full = f"{actor_nombre} {actor_apellido}".strip()
        if actor_full:
            cast.append({"name": actor_full, "role": rol_act})

    doc_movie = {
        "movie_id_mysql": movie_id,
        "title": m["title"],
        "synopsis": m["synopsis"] or "",
        "duration": m["duration"] or 0,
        "release_date": m["release_date"] if isinstance(m["release_date"], datetime) else None,
        "producer": m["producer"] or "",
        "content_type": m["content_type"] or "",
        "cover_url": m["cover_url"] or "",
        "stream_url": m["stream_url"] or "",
        "classification": m["classification"] or "",
        "genres": genres,              
        "director": directors,         
        "cast": cast,                   
        "average_rating": m.get("average_rating", 0.0) or 0.0,
        "rating_count": 0,              
        "embedding": []                 
    }

    movies_col.replace_one(
        {"movie_id_mysql": movie_id},
        doc_movie,
        upsert=True
    )

print("✅ Películas (+ géneros, directores, reparto) importadas a MongoDB")

mysql_cursor.execute("""
    SELECT id_valoracion, id_usuario AS user_id, id_pelicula AS movie_id, 
           puntaje AS rating, fecha_valoracion AS rated_at 
    FROM valoraciones;
""")
valoraciones = mysql_cursor.fetchall()
print(f"⭐ Valoraciones encontradas en MySQL: {len(valoraciones)}")

for r in valoraciones:
    u_id = r["user_id"]
    m_id = r["movie_id"]
    rating_value = r.get("rating", 0)
    rated_at = r.get("rated_at")

    user_doc = users_col.find_one({"user_id_mysql": u_id})
    movie_doc = movies_col.find_one({"movie_id_mysql": m_id})

    if not user_doc or not movie_doc:
        continue

    users_col.update_one(
        {"_id": user_doc["_id"]},
        {"$push": {"ratings": {
            "movie_id": movie_doc["_id"],   
            "rating": rating_value,
            "rated_at": rated_at if isinstance(rated_at, datetime) else None
        }}}
    )

    old_count = movie_doc.get("rating_count", 0)
    old_avg = movie_doc.get("average_rating", 0.0)
    new_count = old_count + 1
    new_avg = ((old_avg * old_count) + rating_value) / new_count

    movies_col.update_one(
        {"_id": movie_doc["_id"]},
        {"$set": {"rating_count": new_count, "average_rating": new_avg}}
    )

print("✅ Valoraciones sincronizadas en MongoDB")

print("🎉 ETL completado con éxito")
