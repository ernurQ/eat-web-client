// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/shared/lib/database/db";
import { User } from "@/shared/lib/database/models/User";

const JWT_SECRET = 'very-very-secret-key-no-one-knows';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set HttpOnly cookie
    const response = NextResponse.json({ ok: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true, // only on HTTPS in production
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
