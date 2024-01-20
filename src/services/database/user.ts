import { prisma } from "@/lib/prisma";

type User = {
  name: string;
  points: number;
};

export async function createUser(body: User) {
  const user = await prisma.user.create({
    data: body,
  });

  return user;
}

export async function updateUser(id: number, body: User) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: { name: body.name, points: body.points },
  });

  return user;
}
