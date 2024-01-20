import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: NextRequest, res: NextResponse) {
  const { query } = parse(req.url, true);
  const id = query.id;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    return Response.json({ user, status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Internal Server Error", status: 500 });
  }
}
