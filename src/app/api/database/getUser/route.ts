import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const id = 1;

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
