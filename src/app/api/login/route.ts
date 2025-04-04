import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "abc@def.com" && password === "1234") {
    return NextResponse.json({ token: "12345678", message: "Login successed" });
  }
  return NextResponse.json({ message: "Login failed" }, { status: 401 });
}
