import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

const productoUpdateSchema = z.object({
  nombre_producto: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  precio: z.number().positive().optional(),
  imagen_url: z.string().url().optional().or(z.literal("")),
  es_promocion: z.boolean().optional(),
  precio_promocional: z.number().positive().optional(),
  promo_fecha_inicio: z.string().datetime().optional(),
  promo_fecha_fin: z.string().datetime().optional(),
  categoria: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
});

// Tipo que permite valores para actualización (string, number, boolean o null)
type UpdateFields = { [key: string]: string | number | boolean | null };

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM candy_bar WHERE id_producto = ?",
      [params.id]
    );

    const producto = (rows as any[])[0];
    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
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
        return NextResponse.json(
          { error: "Datos inválidos", details: parse.error.errors },
          { status: 400 }
        );
      }

      const fields: UpdateFields = { ...parse.data };

      if (typeof fields.es_promocion !== "undefined") {
        // Convertir boolean a number para la base de datos
        fields.es_promocion = fields.es_promocion ? 1 : 0;
      }

      if (Object.keys(fields).length === 0) {
        return NextResponse.json(
          { error: "No se proporcionaron campos para actualizar" },
          { status: 400 }
        );
      }

      const updates = Object.keys(fields)
        .map((key) => `${key} = ?`)
        .join(", ");

      const values = Object.values(fields);
      values.push(params.id);

      await db.query(
        `UPDATE candy_bar SET ${updates} WHERE id_producto = ?`,
        values
      );

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
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
      const [producto] = await db.query(
        "SELECT id_producto FROM candy_bar WHERE id_producto = ?",
        [params.id]
      );

      if (!(producto as any[]).length) {
        return NextResponse.json(
          { error: "Producto no encontrado" },
          { status: 404 }
        );
      }

      await db.query("DELETE FROM candy_bar WHERE id_producto = ?", [
        params.id,
      ]);

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return NextResponse.json(
        { error: "Error al eliminar producto" },
        { status: 500 }
      );
    }
  }
);
