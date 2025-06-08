import { db } from "@/lib/database";
import { Usuario } from "@/types/user";

export const getUserByEmail = async (email: string): Promise<Usuario | null> => {
  if (!email) return null;

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ? LIMIT 1", [email]);
    const user = (rows as Usuario[])[0];
    console.log("Resultado de la consulta (rows):", rows); // Mira qué devuelve la BD
    console.log("Usuario encontrado:", user);
    return user || null;
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    return null;
  }
};
