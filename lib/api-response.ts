import { NextResponse } from "next/server";

export function successResponse(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(
  message: string,
  status = 500,
  error?: unknown
) {
  if (process.env.NODE_ENV !== "production" && error) {
    console.error("API Error:", error);
  }

  return NextResponse.json({ success: false, error: message }, { status });
}
