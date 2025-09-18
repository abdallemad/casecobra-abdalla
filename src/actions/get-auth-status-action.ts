"use server";
import db from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
export const getAuthStatusAction = async () => {
  const user = await currentUser();
  if (!user || !user.emailAddresses[0].emailAddress)
    throw new Error("Invalid user data");
  // if the use is login.
  const existingUser = await db.user.findUnique({ where: { userId: user.id } });
  if (!existingUser)
    await db.user.create({
      data: { email: user.emailAddresses[0].emailAddress, userId: user.id },
    });
  return { success: true };
};
