// pages/api/usuario.ts
import { db } from "@/lib/database";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { nombre, foto_perfil } = body;

    // Insertar nuevo perfil en la tabla usuario
    await db.query(
      `INSERT INTO usuario (nombre, email, password, rol, fecha_registro, foto_perfil, verificado)
        VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
      [
        nombre,
        session.user.email, // Asocia el perfil al email
        "", // contraseña vacía por ahora
        "perfil", // o lo que uses para roles
        foto_perfil,
        false,
      ]
    );

    return NextResponse.json({ message: "Perfil creado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id_usuario } = body;

    await db.query(`DELETE FROM usuario WHERE id_usuario = ?`, [id_usuario]);

    return NextResponse.json({ message: "Perfil eliminado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}