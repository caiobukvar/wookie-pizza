import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const name = "Caio Bukvar";
    const points = 0;

    await sql`INSERT INTO users (Name, Points) VALUES (${name}, ${points});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}
