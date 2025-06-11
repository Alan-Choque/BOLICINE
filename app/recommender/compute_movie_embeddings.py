import os
import sys
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/novacode')

try:
    client = MongoClient(MONGODB_URI)
    db = client.get_database()
    movies_col = db['movies']
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    sys.exit(1)

cursor = movies_col.find({}, {"genres": 1, "synopsis": 1})
docs = list(cursor)
if not docs:
    print("❌ No hay documentos en la colección 'movies'. Asegúrate de correr el ETL primero.")
    sys.exit(1)

sinopsis_list = []
genres_list = []
_ids = []

for doc in docs:
    _ids.append(doc["_id"])
    sinopsis_list.append(doc.get("synopsis", "") or "")
    genres_list.append(doc.get("genres", []) or [])

print("🔧 Construyendo TF-IDF de sinopsis...")
tfidf = TfidfVectorizer(max_features=500)
tfidf_matrix = tfidf.fit_transform(sinopsis_list)
tfidf_dense = tfidf_matrix.toarray()       

print("🔧 Construyendo one-hot de géneros...")
mlb = MultiLabelBinarizer()
onehot_genres = mlb.fit_transform(genres_list)  

import numpy as np
embeddings = np.hstack([onehot_genres, tfidf_dense])
print(f"  ‣ Número de películas: {len(_ids)}")
print(f"  ‣ Dimensión de cada embedding: {embeddings.shape[1]}")

print("💾 Guardando embeddings en MongoDB...")
for idx, movie_oid in enumerate(_ids):
    emb_vector = embeddings[idx].tolist()
    movies_col.update_one(
        {"_id": movie_oid},
        {"$set": {"embedding": emb_vector}}
    )

print("✅ Embeddings de películas calculados y guardados correctamente.")
