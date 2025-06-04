import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const POST = verifyAuth(async (req: NextRequest) => {
  const body = await req.json();
  const { id_funcion, asientos } = body;

  const user = (req as any).user;

  const reservas = await Promise.all(
    asientos.map(async (id_asiento: number) => {
      const [result] = await db.query(
        `INSERT INTO reservas (id_funcion, id_asiento, id_usuario, estado, fecha_reserva)
         VALUES (?, ?, ?, 'reservado', NOW())`,
        [id_funcion, id_asiento, user.id]
      );
      return (result as any).insertId;
    })
  );

  return NextResponse.json({ message: "Reservas creadas", reservas });
});
