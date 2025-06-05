import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const POST = verifyAuth(async (req: NextRequest) => {
  try {
    const { ids_boletos } = await req.json();
    const user = (req as any).user;

    await db.query(
      `UPDATE boletos 
       SET estado = 'cancelado' 
       WHERE id_boleto IN (?) AND id_usuario = ? AND estado = 'reservado'`,
      [ids_boletos, user.id]
    );

    return NextResponse.json({ message: "Boletos cancelados correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al cancelar los boletos" },
      { status: 500 }
    );
  }
});