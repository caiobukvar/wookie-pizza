import { createUser } from "@/services/database/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const name = searchParams.get("name");
  const points = searchParams.get("points");

  if (!name || !points) {
    return NextResponse.json(
      { error: "Parâmetros inexistentes" },
      { status: 400 }
    );
  }

  // http://localhost:3000/api/database/createUser?name=Caio%20Bukvar&points=0 para criar um user customizado
  const user = await createUser({ name: name, points: parseInt(points) }).catch(
    (e) => {
      console.error(e);
    }
  );

  try {
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
