import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { nombre, email, password } = await req.json();

  if (!nombre || !email || !password) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
  }

  const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  if ((existingUser as any[]).length > 0) {
    return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [
    nombre,
    email,
    hashedPassword,
  ]);

  return NextResponse.json({ message: "Usuario registrado correctamente" });
}
