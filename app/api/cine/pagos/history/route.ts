import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

export const GET = verifyAuth(async (req: Request & { auth: any }) => {
  try {
    const user = (req as any).auth;
    const [rows] = await db.query(
      "SELECT p.*, mp.nombre as metodo_pago FROM pagos p JOIN metodos_pago mp ON p.id_metodo = mp.id_metodo WHERE id_usuario = ? ORDER BY p.fecha_pago DESC",
      [user.id]
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener historial de pagos:", error);
    return NextResponse.json({ error: "Error al obtener historial de pagos" }, { status: 500 });
  }
});
