import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 });
  }

  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  const user = (rows as any[])[0];

  if (!user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id_usuario, nombre: user.nombre }, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ message: "Login exitoso" });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  return res;
}
