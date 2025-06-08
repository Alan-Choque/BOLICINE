import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, password } = await req.json();

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE email = ?",
      [email]
    );

    if ((rows as any[]).length > 0) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO usuarios (nombre, email, password, verificado) VALUES (?, ?, ?, 1)",
      [nombre, email, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: "Usuario registrado exitosamente",
    });

  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
