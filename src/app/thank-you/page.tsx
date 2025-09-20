import { Metadata } from "next";
import { notFound } from "next/navigation";
import ThankYou from "./thank-you";

export const metadata: Metadata = {
  title: "Thank You - Case Cobra",
  description: "Thank you for your purchase! Your order is being processed.",
};

async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const orderId = (await searchParams).orderId as string;
  if (!orderId) notFound();

  return (
      <ThankYou orderId={orderId} />
  );
}

export default ThankYouPage;
