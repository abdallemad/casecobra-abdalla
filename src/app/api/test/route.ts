import { sendOrderEmail } from "@/lib/nodemailer";
import { request } from "http";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await sendOrderEmail({
    orderId:"12345",
    orderDate: new Date().toISOString(),
    shippingAddress: {
      name: "John Doe",
      country: "USA",
      city: "New York",
      postalCode: "10001",
      street: "123 Main St",
      state: "NY",
      id: "",
      phoneNumber:"1234567890"
    },
    mailTo: "fynwjmbry@gmail.com",
  });
  console.log('email sent')
  return NextResponse.json({ message: "Email sent" });
}