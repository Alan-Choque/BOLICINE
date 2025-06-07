import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/database";
import { getUserByEmail } from "@/data/user";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO usuarios (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    const insertedId = (result as any).insertId;

    const [rows]: [any[], any] = await db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [insertedId]);

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
