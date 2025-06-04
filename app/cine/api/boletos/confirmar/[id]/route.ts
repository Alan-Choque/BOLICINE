import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const POST = verifyAuth(async (req: NextRequest) => {
  const { ids_reservas } = await req.json();
  const user = (req as any).user;

  await Promise.all(
    ids_reservas.map(async (id: number) => {
      await db.query(
        `UPDATE reservas SET estado = 'comprado' WHERE id_reserva = ? AND id_usuario = ?`,
        [id, user.id]
      );
    })
  );

  return NextResponse.json({ message: "Reservas confirmadas" });
});
