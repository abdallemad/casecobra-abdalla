"use server";
import { BASE_PRICE, PRICES } from "@/config/product";
import db from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Order } from "@prisma/client";
import { stripe } from "@/lib/stripe";
export async function createCheckoutSessionAction({
  configurationId,
}: {
  configurationId: string;
}) {
  // check for configuration
  const configuration = await db.configuration.findUnique({
    where: { id: configurationId },
  });
  if (!configuration) throw new Error("Configuration not found");
  // check for user
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  // calculate price
  let price = BASE_PRICE;
  if (configuration.finish == "texture") price += PRICES.finish.texture;
  if (configuration.material === "polycarbonate")
    price += PRICES.materials.polyCarbonate;
  // create order
  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: { userId: user.id, configurationId: configuration.id },
  });

  if (existingOrder) order = existingOrder;
  else
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  // create product on stripe;
  const product = await stripe.products.create({
    name: "custom iphone case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });
  // create checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["EG", "US", "DK"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });
  // return the session url
  return { url: stripeSession.url }
}
