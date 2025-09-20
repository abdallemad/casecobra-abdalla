"use server";

import db from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getPaymentStatusAction({ orderId }: { orderId: string }) {
  const user = await currentUser();
  if (!user || !user.emailAddresses[0]?.emailAddress)
    throw new Error("User not authenticated");
  const order = await db.order.findFirst({
    where: { userId: user.id, id: orderId },
    include: {
      BillingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true
    },
  });
  if (!order) throw new Error("this error doesn't exists");

  if (order.isPaid) return order;
  else return false;
}
