import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET(
  request: Request,
  { params }: { params: { id_funcion: string } }
) {
  try {
    const [asientosOcupados]: any = await db.query(
      `SELECT asiento 
       FROM boletos 
       WHERE id_funcion = ? AND estado IN ('reservado', 'vendido')`,
      [params.id_funcion]
    );

    const [salaInfo]: any = await db.query(
      `SELECT s.capacidad 
       FROM salas s
       JOIN funciones f ON f.id_sala = s.id_sala
       WHERE f.id_funcion = ?`,
      [params.id_funcion]
    );

    const capacidad = salaInfo[0]?.capacidad || 100;
    const asientosDisponibles = [];
    const ocupados = asientosOcupados.map((b: any) => b.asiento);

    for (let i = 1; i <= capacidad; i++) {
      asientosDisponibles.push({
        asiento: `A-${i}`,
        disponible: !ocupados.includes(`A-${i}`)
      });
    }

    return NextResponse.json(asientosDisponibles);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los asientos" },
      { status: 500 }
    );
  }
}
