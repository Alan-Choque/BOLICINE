import { db } from "@/lib/database";

export const getUserByEmail = async (email: string) => {
  if (!email) return null;

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ? LIMIT 1", [email]);
    const user = (rows as any[])[0];

    return user || null;
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    return null;
  }
};
