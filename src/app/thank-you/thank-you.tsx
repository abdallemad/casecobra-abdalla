"use client";

import PhonePreview from "@/components/phone-preview";
import useGetOrderStatus from "@/hooks/use-get-order-status";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function ThankYou({ orderId }: { orderId: string }) {
  const { data, isLoading } = useGetOrderStatus({ orderId });

  if (isLoading) return <LoadingState />;
  if (data === false || data === true || !data) return <NotPaidYet />;
  const { BillingAddress, shippingAddress, amount, configuration } = data;
  const { color, croppedImageUrl, } = configuration;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank You!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            We{"'"}v received you order and are processing it.
          </p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-900">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great chios.
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We add casecobra believe that phone does{"'"}t only need to look
              good, but also last you for the years to come. We offer a five
              year print guarantee if you case isn{"'"}t of the heights quality
              replace it for free.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview color={color!} croppedImageUrl={croppedImageUrl!} />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-x-7 gap-y-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping Address</p>
              <div className="mt-2 text-zinc-600">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing Address</p>
              <div className="mt-2 text-zinc-600">
                <address className="not-italic">
                  <span className="block">{BillingAddress?.name}</span>
                  <span className="block">{BillingAddress?.street}</span>
                  <span className="block">
                    {BillingAddress?.postalCode} {BillingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment Status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="mt-2 text-zinc-700">
                DHL, takes up 3 working days.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">sub total</p>
            <p className="font-medium text-zinc-700">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">shipping</p>
            <p className="font-medium text-zinc-700">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">total</p>
            <p className="font-medium text-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;

function LoadingState() {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-100" />
        <h3 className="font-semibold text-xl ">Loading your order...</h3>
        <p>This won&apos;t take long!</p>
      </div>
    </div>
  );
}
function NotPaidYet() {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-100" />
        <h3 className="font-semibold text-xl ">Verifying you payment</h3>
        <p>This might take a moment.</p>
      </div>
    </div>
  );
}
