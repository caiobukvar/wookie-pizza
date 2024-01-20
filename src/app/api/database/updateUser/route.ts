import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { id, points } = body;

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: { points: { increment: points } },
    });

    return NextResponse.json({ user, status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
