import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { verifyAuth } from "@/lib/middleware/auth-Middleware";
import { z } from "zod";

const productoSchema = z.object({
  nombre_producto: z.string().min(1),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  imagen_url: z.string().url().optional().or(z.literal("")),
  es_promocion: z.boolean().default(false),
  precio_promocional: z.number().positive().optional(),
  promo_fecha_inicio: z.string().datetime().optional(),
  promo_fecha_fin: z.string().datetime().optional(),
  categoria: z.string().optional(),
  stock: z.number().int().nonnegative(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoria = url.searchParams.get('categoria');
    const enPromocion = url.searchParams.get('en_promocion');
    
    let query = "SELECT * FROM candy_bar WHERE 1=1";
    const params = [];
    
    if (categoria) {
      query += " AND categoria = ?";
      params.push(categoria);
    }
    
    if (enPromocion === 'true') {
      query += " AND es_promocion = 1";
    }
    
    query += " ORDER BY nombre_producto";
    
    const [productos] = await db.query(query, params);
    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
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
      return NextResponse.json(
        { error: "Datos inválidos", details: parse.error.errors },
        { status: 400 }
      );
    }

    const { 
      nombre_producto, 
      descripcion, 
      precio, 
      imagen_url, 
      es_promocion, 
      precio_promocional, 
      promo_fecha_inicio, 
      promo_fecha_fin, 
      categoria, 
      stock 
    } = parse.data;

    const [result] = await db.query(
      `INSERT INTO candy_bar (
        nombre_producto, descripcion, precio, imagen_url,
        es_promocion, precio_promocional, promo_fecha_inicio,
        promo_fecha_fin, categoria, stock
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_producto, 
        descripcion || null, 
        precio, 
        imagen_url || null,
        es_promocion ? 1 : 0, 
        precio_promocional || null,
        promo_fecha_inicio || null, 
        promo_fecha_fin || null,
        categoria || null, 
        stock
      ]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    }, { status: 201 });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
});