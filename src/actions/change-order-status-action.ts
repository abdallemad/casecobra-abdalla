'use server';

import db from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export  async function changeOrderStatusAction({
  id,
  newOrderStatus,
}: {
  id: string;
  newOrderStatus: OrderStatus;
}) {
  await db.order.update({
    where: { id },
    data: {
      status: newOrderStatus,
    },
  });
}
