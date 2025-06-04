import { NextRequest, NextResponse } from "next/server";
import { db } from "@lib/db";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const POST = verifyAuth(async (req: NextRequest) => {
  const { ids_reservas } = await req.json();
  const user = (req as any).user;

  await Promise.all(
    ids_reservas.map(async (id: number) => {
      await db.query(
        `DELETE FROM reservas WHERE id_reserva = ? AND id_usuario = ? AND estado = 'reservado'`,
        [id, user.id]
      );
    })
  );

  return NextResponse.json({ message: "Reservas canceladas" });
});
