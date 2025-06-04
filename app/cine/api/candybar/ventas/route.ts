import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

const ventaSchema = z.object({
  productos: z.array(
    z.object({
      id_producto: z.number().int(),
      cantidad: z.number().int().positive(),
    })
  ),
  total: z.number().positive(),
});

export const GET = verifyAuth(async (req) => {
  const { id } = req.auth;

  try {
    const [ventas] = await db.query(
      `SELECT v.id_venta, v.fecha_venta, v.total, vp.id_producto, vp.cantidad, p.nombre_producto
       FROM candybar_ventas v
       JOIN candybar_ventas_productos vp ON v.id_venta = vp.id_venta
       JOIN candybar_productos p ON vp.id_producto = p.id_producto
       WHERE v.id_usuario = ?
       ORDER BY v.fecha_venta DESC`,
      [id]
    );

    const ventasMap: Record<number, any> = {};
    (ventas as any[]).forEach((item) => {
      if (!ventasMap[item.id_venta]) {
        ventasMap[item.id_venta] = {
          id_venta: item.id_venta,
          fecha_venta: item.fecha_venta,
          total: item.total,
          productos: [],
        };
      }
      ventasMap[item.id_venta].productos.push({
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        nombre_producto: item.nombre_producto,
      });
    });

    return NextResponse.json(Object.values(ventasMap));
  } catch {
    return NextResponse.json(
      { error: "Error al obtener ventas" },
      { status: 500 }
    );
  }
});

export const POST = verifyAuth(async (req) => {
  const { id } = req.auth;

  try {
    const body = await req.json();
    const parse = ventaSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { productos, total } = parse.data;

    const [ventaResult] = await db.query(
      `INSERT INTO candybar_ventas (id_usuario, fecha_venta, total)
       VALUES (?, NOW(), ?)`,
      [id, total]
    );

    const idVenta = (ventaResult as any).insertId;

    for (const item of productos) {
      await db.query(
        `INSERT INTO candybar_ventas_productos (id_venta, id_producto, cantidad)
         VALUES (?, ?, ?)`,
        [idVenta, item.id_producto, item.cantidad]
      );

      await db.query(
        `UPDATE candybar_productos SET stock = stock - ? WHERE id_producto = ?`,
        [item.cantidad, item.id_producto]
      );
    }

    return NextResponse.json({ message: "Venta registrada", idVenta });
  } catch {
    return NextResponse.json(
      { error: "Error al registrar venta" },
      { status: 500 }
    );
  }
});
