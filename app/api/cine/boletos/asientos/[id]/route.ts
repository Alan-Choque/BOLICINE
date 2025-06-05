import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET(
  request: Request,
  { params }: { params: { id_funcion: string } }
) {
  try {
    const [asientos] = await db.query(
      `SELECT 
        b.asiento,
        b.estado,
        f.precio_boleto
       FROM boletos b
       JOIN funciones f ON b.id_funcion = f.id_funcion
       WHERE b.id_funcion = ?`,
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
