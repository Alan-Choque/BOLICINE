import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

const ventaSchema = z.object({
  id_funcion: z.number().int().positive(),
  productos: z.array(
    z.object({
      id_producto: z.number().int().positive(),
      cantidad: z.number().int().positive(),
      precio_unitario: z.number().positive(),
    })
  ).min(1),
});

export const POST = verifyAuth(async (req: Request & { auth: any }) => {
  try {
    const user = req.auth;
    const body = await req.json();
    const parse = ventaSchema.safeParse(body);
    
    if (!parse.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parse.error.errors },
        { status: 400 }
      );
    }

    const { id_funcion, productos } = parse.data;
    
    // Calcular total
    const total = productos.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);
    
    // Registrar en boletos (como solución temporal)
    await db.query(
      `INSERT INTO boletos 
       (id_funcion, id_usuario, asiento, estado) 
       VALUES (?, ?, ?, 'vendido')`,
      [id_funcion, user.id, `VENTA-${Date.now()}`, 'vendido']
    );

    // Actualizar stocks (sin registro detallado de venta)
    await Promise.all(
      productos.map(item => 
        db.query(
          `UPDATE candy_bar SET stock = stock - ? 
           WHERE id_producto = ? AND stock >= ?`,
          [item.cantidad, item.id_producto, item.cantidad]
        )
      )
    );

    return NextResponse.json({ 
      success: true,
      total,
      productos_vendidos: productos.length 
    }, { status: 201 });

  } catch (error) {
    console.error('Error al procesar venta:', error);
    return NextResponse.json(
      { error: "Error al procesar la venta" },
      { status: 500 }
    );
  }
});