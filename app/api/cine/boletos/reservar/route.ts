import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const POST = verifyAuth(async (req: NextRequest) => {
  const { id_funcion, asientos } = await req.json();
  const user = (req as any).user;

  const [disponibles]: any = await db.query(
    `SELECT asiento 
     FROM boletos 
     WHERE id_funcion = ? AND asiento IN (?) AND estado IN ('reservado', 'vendido')`,
    [id_funcion, asientos]
  );

  if (disponibles.length > 0) {
    return NextResponse.json(
      { error: "Asientos no disponibles" },
      { status: 400 }
    );
  }

  const resultados = await Promise.all(
    asientos.map(async (asiento: string) => {
      const [result]: any = await db.query(
        `INSERT INTO boletos 
         (id_funcion, id_usuario, asiento, estado) 
         VALUES (?, ?, ?, 'reservado')`,
        [id_funcion, user.id, asiento]
      );
      return { id: result.insertId, asiento };
    })
  );

  return NextResponse.json({ boletos: resultados });
});