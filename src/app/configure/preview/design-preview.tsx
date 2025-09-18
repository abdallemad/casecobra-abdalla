"use client";
import { Configuration } from "@prisma/client";
import usePreviewCase from "@/hooks/use-preveiw-case";
import Confetti from "react-dom-confetti";
import React from "react";
import { CONFIG } from "@/config/confettie";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "@/components/globals/phone";
import { ArrowRight, Check, LoaderIcon } from "lucide-react";
import { BASE_PRICE } from "@/config/product";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/login-dialog";

function DesignPreview({ configuration }: { configuration: Configuration }) {
  const {
    showConfetti,
    tw,
    finish,
    material,
    model,
    isLoading,
    handelCheckout,
    isOpen,
    setIsOpen
  } = usePreviewCase(configuration);

  return (
    <>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden
      >
        <Confetti active={showConfetti} config={CONFIG} />
      </div>
      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        {/* PHONE */}
        <div className="lg:col-span-3 md:col-span-4 md:row-span-2 md:row-end-2 ">
          <Phone
            imgSrc={configuration.croppedImageUrl!}
            className={cn(
              tw?.bg,
              "max-w-[70dvh] mx-auto",
              "max-w-[150px] md:max-w-full"
            )}
          />
        </div>
        {/* INFO */}
        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your: {model.label} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <div className="flex gap-1.5 items-center text-left w-fit">
              <Check className="h-5 w-5 shrink-0 text-green-600" />
              {"In stock and ready to ship"}
            </div>
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base ">
          <div className="grid gap-y-8 border-b border-gray-200 by-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">HightLights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU chock absorption</li>
                <li>Page made from recycle material</li>
                <li>5 years print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality durable material</li>
                <li>Scratch- and fingers resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base Price: </p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 1_00)}
                  </p>
                </div>
                {finish.value == "texture" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Textured Price: </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(finish.price / 100)}
                    </p>
                  </div>
                )}
                {material.value == "polycarbonate" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Polycarbonate Price: </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(material.price / 100)}
                    </p>
                  </div>
                )}
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-900 font-semibold">Total:</p>
                <p className="text-zinc-950 font-semibold">
                  {formatPrice(
                    (BASE_PRICE + material.price + finish.price) / 100
                  )}
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                className="px-4 sm:px-6 lg:px-8"
                onClick={handelCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="animate-spin" />
                    saving...
                  </>
                ) : (
                  <>
                    Checkout <ArrowRight className="w-4 h-4 ml-1.5 inline " />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignPreview;
