// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No se recibió el código de autorización" }, { status: 400 });
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI!;
    
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      { headers: { "Content-Type": "application/json" } }
    );
    
    const { id_token } = tokenRes.data;
    const googleUser = jwt.decode(id_token) as { email?: string; name?: string };

    if (!googleUser || !googleUser.email) {
      return NextResponse.json({ error: "No se pudo recuperar la información de Google" }, { status: 400 });
    }

    // Busca el usuario en la BD por email
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [googleUser.email]);
    let user = (rows as any[])[0];

    if (!user) {
      const name = googleUser.name || "Usuario de Google";
      const [result] = await db.query(
        "INSERT INTO usuarios (nombre, email, password, verificado) VALUES (?, ?, ?, 1)",
        [name, googleUser.email, ""]
      );
      const newUserId = (result as any).insertId;
      user = { id_usuario: newUserId, nombre: name, email: googleUser.email };
    }

    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: user.id_usuario, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    
    const response = NextResponse.redirect(process.env.FRONTEND_URL!);
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    });
    
    return response;
    
  } catch (error) {
    console.error("Error en callback de Google:", error);
    return NextResponse.json({ error: "Error al procesar la autenticación con Google" }, { status: 500 });
  }
}
