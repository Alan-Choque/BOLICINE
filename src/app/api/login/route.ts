import { NextResponse } from "next/server";
import { loginSchema } from "../../../../lib/validation";
import { signToken } from "../../../../lib/auth";
import bcrypt from "bcryptjs";

//MOCK DE USUARIO
const Hash = await bcrypt.hash("123456", 10);
console.log("Nuevo hash generado:", Hash);

const fakeUser = {
  id: 1,
  email: "usuario@mock.com",
  password: Hash,
};
//

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const user = email === fakeUser.email ? fakeUser : null;

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = signToken({ id: user.id, email: user.email });
    const response = NextResponse.json({ message: "Login exitoso" });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
