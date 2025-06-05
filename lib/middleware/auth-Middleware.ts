import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../auth";

type Handler = (
  req: NextRequest & { auth: { id: number; email: string } },
  context?: any
) => Promise<NextResponse>;

export function verifyAuth(handler: Handler) {
  return async (req: Request, context?: any) => {
    const nextReq = new NextRequest(req);

    const cookie = nextReq.headers.get("cookie") || "";
    const tokenMatch = cookie.match(/token=([^;]+)/);
    if (!tokenMatch) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = tokenMatch[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    (nextReq as any).auth = payload;

    return handler(nextReq as NextRequest & { auth: { id: number; email: string } }, context);
  };
}