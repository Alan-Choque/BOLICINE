import { db } from "@/lib/db";
import { z } from "zod";
import { successResponse, errorResponse } from "../../../../../lib/api-response";

const querySchema = z.object({
  cine: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedParams = querySchema.safeParse({
      cine: searchParams.get("cine"),
    });

    if (!parsedParams.success) {
      return errorResponse("Parámetros inválidos", 400);
    }

    let query = `
      SELECT s.*, c.nombre_cine 
      FROM salas s
      JOIN cines c ON s.id_cine = c.id_cine
    `;

    const params = [];

    if (parsedParams.data.cine) {
      query += " WHERE s.id_cine = ?";
      params.push(parsedParams.data.cine);
    }

    const [rows] = await db.query(query, params);
    const salas = rows as any[];

    return successResponse(salas);
  } catch (error) {
    return errorResponse("Error al obtener las salas", 500, error);
  }
}
