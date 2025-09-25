import db from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

async function page() {
  const user = await currentUser();
  if (!user || user.emailAddresses[0].emailAddress !== process.env.A_EMAIL)
    return notFound();
  const order = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });
  
  return <div></div>;
}

export default page;
