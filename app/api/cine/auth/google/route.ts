import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = encodeURIComponent(process.env.GOOGLE_REDIRECT_URI!);
  const scope = encodeURIComponent("profile email");
  const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return NextResponse.redirect(googleOauthUrl);
}