import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";

const productoUpdateSchema = z.object({
  nombre_producto: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  precio: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM candybar_productos WHERE id_producto = ?",
      [params.id]
    );

    const producto = (rows as any[])[0];
    if (!producto)
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );

    return NextResponse.json(producto);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener producto" },
      { status: 500 }
    );
  }
}

export const PUT = verifyAuth(
  async (
    req: Request & { auth: any },
    { params }: { params: { id: string } }
  ) => {
    try {
      const body = await req.json();
      const parse = productoUpdateSchema.safeParse(body);
      if (!parse.success) {
        return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
      }

      const fields = parse.data;
      if (Object.keys(fields).length === 0) {
        return NextResponse.json(
          { error: "Nada para actualizar" },
          { status: 400 }
        );
      }

      const updates = Object.entries(fields)
        .map(([key]) => `${key} = ?`)
        .join(", ");
      const values = Object.values(fields);
      values.push(params.id);

      await db.query(
        `UPDATE candybar_productos SET ${updates} WHERE id_producto = ?`,
        values
      );

      return NextResponse.json({ message: "Producto actualizado" });
    } catch {
      return NextResponse.json(
        { error: "Error al actualizar producto" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = verifyAuth(
  async (
    _req: Request & { auth: any },
    { params }: { params: { id: string } }
  ) => {
    try {
      await db.query("DELETE FROM candybar_productos WHERE id_producto = ?", [
        params.id,
      ]);
      return NextResponse.json({ message: "Producto eliminado" });
    } catch {
      return NextResponse.json(
        { error: "Error al eliminar producto" },
        { status: 500 }
      );
    }
  }
);
