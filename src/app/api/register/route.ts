// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/shared/lib/database/db";
import { User } from "@/shared/lib/database/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      hashedPassword,
    });

    return NextResponse.json({ ok: true, userId: newUser._id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
