import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

const productoSchema = z.object({
  nombre_producto: z.string().min(1),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

export async function GET() {
  try {
    const [productos] = await db.query("SELECT * FROM candybar_productos");
    return NextResponse.json(productos);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export const POST = verifyAuth(async (req: Request & { auth: any }) => {
  try {
    const body = await req.json();
    const parse = productoSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { nombre_producto, descripcion, precio, stock } = parse.data;

    const [result] = await db.query(
      `INSERT INTO candybar_productos (nombre_producto, descripcion, precio, stock)
       VALUES (?, ?, ?, ?)`,
      [nombre_producto, descripcion || null, precio, stock]
    );

    return NextResponse.json({
      message: "Producto creado",
      id: (result as any).insertId,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
});
