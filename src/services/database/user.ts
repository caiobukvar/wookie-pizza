/* eslint-disable react-hooks/rules-of-hooks */
import { setUser } from "@/app/stores/userSlice";
import { prisma } from "@/lib/prisma";
import { useDispatch } from "react-redux";

export type User = {
  id?: number;
  name: string;
  points: number;
};

export async function createUser(body: User) {
  const user = await prisma.user.create({
    data: body,
  });

  return user;
}

export async function getUserById(userId: number): Promise<User | null> {
  const dispatch = useDispatch();

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  dispatch(setUser(user));
  return user;
}

export async function updateUser(id: number, body: User) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    return null;
  }

  const updatedPoints = existingUser.points + body.points;

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: { name: body.name, points: updatedPoints },
  });

  return updatedUser;
}
