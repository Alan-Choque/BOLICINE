import os
import sys
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/novacode')

try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database()
    users_col = db['users']
    movies_col = db['movies']
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    sys.exit(1)

cursor_users = users_col.find({}, {"ratings": 1})
users = list(cursor_users)
if not users:
    print("❌ No hay usuarios en la colección 'users'. Asegúrate de correr el ETL primero.")
    sys.exit(1)

print(f"👤 Usuarios a procesar: {len(users)}")

for u in users:
    user_oid = u["_id"]
    ratings = u.get("ratings", [])
    liked = [r for r in ratings if r.get("rating", 0) >= 2.0]
    if not liked:
        users_col.update_one(
            {"_id": user_oid},
            {"$set": {"embedding": []}}
        )
        continue

    emb_list = []
    for r in liked:
        movie_oid = r["movie_id"]
        movie_doc = movies_col.find_one({"_id": movie_oid}, {"embedding": 1})
        if movie_doc and movie_doc.get("embedding"):
            emb_list.append(movie_doc["embedding"])

    if not emb_list:
        users_col.update_one(
            {"_id": user_oid},
            {"$set": {"embedding": []}}
        )
        continue

    emb_arr = np.array(emb_list)  
    user_emb = emb_arr.mean(axis=0)  

    users_col.update_one(
        {"_id": user_oid},
        {"$set": {"embedding": user_emb.tolist()}}
    )

print("✅ Embeddings de usuarios calculados y guardados correctamente.")
