export async function getRecommendations(userId: number, limit: number = 10) {
  const res = await fetch(`http://localhost:8000/api/users/${userId}/recommendations?limit=${limit}`);
  if (!res.ok) {
    throw new Error("No se pudieron obtener recomendaciones desde el motor IA");
  }
  return res.json();
}
