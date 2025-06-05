import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM metodos_pago");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener métodos de pago:", error);
    return NextResponse.json({ error: "Error al obtener métodos de pago" }, { status: 500 });
  }
}
