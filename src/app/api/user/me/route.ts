// src/app/api/user/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'very-very-secret-key-no-one-knows';

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  // Extract token from cookies (assuming a simple extraction)
  const tokenMatch = cookieHeader.split(";").find((c) => c.trim().startsWith("token="));
  const token = tokenMatch ? tokenMatch.split("=")[1] : null;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
