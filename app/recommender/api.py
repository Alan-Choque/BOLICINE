import os
import sys
from datetime import datetime
import numpy as np
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/novacode')

try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database()
    users_col = db['users']
    movies_col = db['movies']
    recmodels_col = db['rec_models']
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    sys.exit(1)

app = FastAPI(title="NovaCode Recommender API (Local)")

@app.get("/")
def root():
    return {"status": "NovaCode Recommender API corriendo correctamente."}

@app.get("/api/users/{user_id_mysql}")
def get_user_detail(user_id_mysql: int):
    u = users_col.find_one({"user_id_mysql": user_id_mysql}, {"_id": 0})
    if not u:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    converted_ratings = []
    for r in u.get("ratings", []):
        mid = r.get("movie_id")
        if isinstance(mid, ObjectId):
            movie_doc = movies_col.find_one({"_id": mid}, {"movie_id_mysql": 1})
            if movie_doc:
                r["movie_id"] = movie_doc["movie_id_mysql"]
            else:
                r["movie_id"] = str(mid)
        converted_ratings.append(r)
    u["ratings"] = converted_ratings

    return u

@app.get("/api/movies/{movie_id_mysql}")
def get_movie_detail(movie_id_mysql: int):
    m = movies_col.find_one({"movie_id_mysql": movie_id_mysql}, {"_id": 0})
    if not m:
        raise HTTPException(status_code=404, detail="Película no encontrada.")
    return m

def load_beta():
    doc = recmodels_col.find_one({"name": "logistic_v1"})
    if not doc or "coefficients" not in doc:
        raise HTTPException(status_code=500, detail="Modelo de recomendación no entrenado.")
    return np.array(doc["coefficients"], dtype=float)

def cos_sim(u, v):
    if not u or not v:
        return 0.0
    u_arr = np.array(u, dtype=float)
    v_arr = np.array(v, dtype=float)
    num = np.dot(u_arr, v_arr)
    den = np.linalg.norm(u_arr) * np.linalg.norm(v_arr) + 1e-8
    return float(num / den)

@app.get("/api/users/{user_id_mysql}/recommendations")
def get_recommendations(user_id_mysql: int, limit: int = 10):

    user_doc = users_col.find_one({"user_id_mysql": user_id_mysql})
    if not user_doc:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    user_emb = user_doc.get("embedding", [])
    if not user_emb:
        raise HTTPException(
            status_code=400,
            detail="Usuario no tiene embedding (no tiene calificaciones o no cumple umbral)."
        )

    beta = load_beta()

    candidates_cursor = movies_col.find({}).sort("average_rating", -1).limit(200)
    candidates = list(candidates_cursor)

    rated_set = set()
    for r in user_doc.get("ratings", []):
        mid = r.get("movie_id")
        if mid is not None:
            rated_set.add(mid)

    years = []
    for m in candidates:
        rd = m.get("release_date")
        if isinstance(rd, datetime):
            years.append(rd.year)
    year_mean = sum(years) / len(years) if years else datetime.now().year

    recs = []
    for m in candidates:
        mid_mysql = m.get("movie_id_mysql")
        if mid_mysql is None or mid_mysql in rated_set:
            continue

        movie_emb = m.get("embedding", [])
        z1 = cos_sim(user_emb, movie_emb)

        rd = m.get("release_date")
        ry = rd.year if isinstance(rd, datetime) else year_mean
        z2 = abs(ry - year_mean)

        z3 = float(m.get("average_rating", 0.0))

        synopsis = m.get("synopsis", "") or ""
        z4 = float(len(synopsis.split()))

        z5 = 0.0

        z_vec = np.array([z1, z2, z3, z4, z5], dtype=float)

        score = float(1.0 / (1.0 + np.exp(-beta.dot(z_vec))))

        recs.append({
            "movie_id_mysql": mid_mysql,
            "title": m.get("title", ""),
            "score": score,
            "cover_url": m.get("cover_url", ""),
            "stream_url": m.get("stream_url", "")
        })

    recs_sorted = sorted(recs, key=lambda x: x["score"], reverse=True)[:limit]

    return {
        "user_id_mysql": user_id_mysql,
        "recommendations": recs_sorted
    }
