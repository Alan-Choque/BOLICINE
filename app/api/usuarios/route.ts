import { currentUser } from "@/lib/auth";
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  const { nombre, foto_perfil } = await req.json();

  if (!user || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!nombre || !foto_perfil) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  try {
    await db.execute(
      "UPDATE usuarios SET nombre = ?, foto_perfil = ? WHERE id_usuario = ?",
      [nombre, foto_perfil, user.id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE() {
  const user = await currentUser();
  if (!user || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.execute("DELETE FROM usuarios WHERE id_usuario = ?", [user.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}