// middleware.ts - VERSIÓN TEMPORAL PARA DEPURAR
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('¡Middleware básico encontrado y ejecutándose!');
  // Puedes incluso quitar esta línea si solo quieres ver si el error desaparece.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // No agregues 'runtime: nodejs' todavía, para ver si el problema es solo de hallazgo.
};