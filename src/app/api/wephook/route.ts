import { sendOrderEmail } from "@/lib/nodemailer";
import db from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = (await headers()).get("stripe-signature") as string;

    if (!signature) return new Response("No signature", { status: 400 });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Handle the checkout session completed event
        if (!session.customer_details?.email)
          throw new Error("No customer email");
        const { orderId, userId } = session.metadata || {
          orderId: null,
          userId: null,
        };

        if (!orderId || !userId)
          throw new Error("No orderId or userId provided");

        const shippingAddress = session.customer_details?.address;
        await db.order.update({
          where: { id: orderId },
          data: {
            isPaid: true,
            shippingAddress: {
              create: {
                name: session.customer_details?.name || "",
                country: shippingAddress?.country || "",
                city: shippingAddress?.city || "",
                postalCode: shippingAddress?.postal_code || "",
                street: shippingAddress?.line1 || "",
                state: shippingAddress?.state || "",
              },
            },
            BillingAddress: {
              create: {
                name: session.customer_details?.name || "",
                country: shippingAddress?.country || "",
                city: shippingAddress?.city || "",
                postalCode: shippingAddress?.postal_code || "",
                street: shippingAddress?.line1 || "",
                state: shippingAddress?.state || "",
              },
            },
          },
          include: { shippingAddress: true },
        });

        await sendOrderEmail({
          orderId,
          orderDate: new Date().toDateString(),
          mailTo: session.customer_details?.email,
          shippingAddress: {
            name: session.customer_details?.name || "",
            country: shippingAddress?.country || "",
            city: shippingAddress?.city || "",
            postalCode: shippingAddress?.postal_code || "",
            street: shippingAddress?.line1 || "",
            state: shippingAddress?.state || "",
            phoneNumber: session.customer_details?.phone || "",
            id:""
          },
        });
        return NextResponse.json({ result: event, ok: true });
      default:
        throw new Error("Unhandled event type");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
