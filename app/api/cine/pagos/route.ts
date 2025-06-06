import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

// Esquema de validación para registrar el pago
const pagoSchema = z.object({
  monto: z.number().positive(),
  id_metodo: z.number().int().positive(),
  // Puedes agregar campos adicionales si lo requieres, como los datos del comprobante
});

export const POST = verifyAuth(async (req: Request & { auth: any }) => {
  try {
    const user = (req as any).auth; // O "req.user" según tu middleware
    const body = await req.json();
    
    const parse = pagoSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parse.error.errors },
        { status: 400 }
      );
    }
    
    const { monto, id_metodo } = parse.data;

    const estado = "completado"; // O "pendiente" en casos reales

    const [result] = await db.query(
      `INSERT INTO pagos (id_usuario, monto, id_metodo, estado) VALUES (?, ?, ?, ?)`,
      [user.id, monto, id_metodo, estado]
    );
    
    return NextResponse.json({
      success: true,
      id_pago: (result as any).insertId,
      estado,
    }, { status: 201 });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
  }
});
