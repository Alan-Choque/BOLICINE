import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const [cines] = await db.query("SELECT * FROM cines");
    return successResponse(cines);
  } catch (error) {
    return errorResponse("Error al obtener los cines", 500, error);
  }
}
