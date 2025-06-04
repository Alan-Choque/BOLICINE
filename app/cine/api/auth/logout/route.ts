import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout exitoso" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" }); // borrar cookie
  return res;
}