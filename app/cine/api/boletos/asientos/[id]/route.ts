import { NextResponse } from "next/server";
import { db } from "@lib/db";
export async function GET(
  request: Request,
  { params }: { params: { id_funcion: string } }
) {
  try {
    const [asientos] = await db.query(
      `
      SELECT a.id_asiento, a.fila, a.numero, 
             CASE WHEN r.id_reserva IS NULL THEN 1 ELSE 0 END AS disponible
      FROM asientos a
      JOIN salas s ON a.id_sala = s.id_sala
      JOIN funciones f ON f.id_sala = s.id_sala
      LEFT JOIN reservas r ON a.id_asiento = r.id_asiento AND r.id_funcion = f.id_funcion AND r.estado = 'reservado'
      WHERE f.id_funcion = ?
      ORDER BY a.fila, a.numero
      `,
      [params.id_funcion]
    );
    return NextResponse.json(asientos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los asientos" },
      { status: 500 }
    );
  }
}
