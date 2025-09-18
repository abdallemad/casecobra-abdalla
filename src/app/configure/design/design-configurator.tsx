"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { COLORS, FINISHES, MATERIALS, MODEL } from "@/config";
import useDesignConfigurator from "@/hooks/use-design-configurator";
import { cn, formatPrice } from "@/lib/utils";
import { Description, Label, Radio, RadioGroup } from "@headlessui/react";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Check, ChevronsUpDownIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label as ShadLabel } from "@/components/ui/label";
import { BASE_PRICE } from "@/config/product";

type DesignConfiguratorProps = {
  configId: string;
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
};

function DesignConfigurator({
  configId,
  dimensions,
  imageUrl,
}: DesignConfiguratorProps) {
  const{
    setRenderDimensions,
    setRenderedPosition,
    containerRef,
    phoneCaseRef,
    options,
    setOptions,
    isPend,
    isPending,
    saveConfig
  } = useDesignConfigurator({
    dimensions,
    configId,
    imageUrl
  });

  return (
    <div className="relative gap-2 mt-20 grid lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden lg:col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            ref={phoneCaseRef}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              alt="phone template"
              src={"/assets/phone-template.png"}
              fill
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `${options.color.tw.bg}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: dimensions.height / 4,
            width: dimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
          }}
          className="absolute z-20 border-[3px] border-primary"
          onResizeStop={(_, _1, ref, __, { x, y }) => {
            setRenderDimensions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });
            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              alt="your image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      {/* OPTIONS */}
      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          {/* FADE IN EFFECT */}
          <div
            aria-hidden
            className="absolute z-10 inset-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none "
          />
          <div className="px-8 pb-12 pt-12">
            <h2 className="tracking-tighter font-bold text-3xl">
              Customize your case
            </h2>
            <Separator className="my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => {
                      return {
                        ...prev,
                        color: val,
                      };
                    });
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color, i) => {
                      return (
                        <Radio
                          key={i}
                          value={color}
                          className={({ checked, autofocus }) =>
                            cn(
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-0 border-2 border-transparent",
                              {
                                [`${color.tw.border}`]: checked,
                                autofocus,
                              }
                            )
                          }
                        >
                          <span
                            className={cn(
                              `${color.tw.bg} `,
                              "h-8 w-8 rounded-full border border-black border-opacity-10 "
                            )}
                          ></span>
                        </Radio>
                      );
                    })}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full ">
                  <ShadLabel>Model</ShadLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <>
                          {options.model.label}
                          <ChevronsUpDownIcon className="w-4 h-4 shrink-0 ml-2 opacity-50" />
                        </>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-full" align="start">
                      {MODEL.options.map((model, i) => {
                        const isChecked = model.value === options.model.value;
                        return (
                          <DropdownMenuItem
                            key={i}
                            className={cn(
                              "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                              {
                                "bg-zinc-100": isChecked,
                              }
                            )}
                            onClick={() => {
                              setOptions((prev) => {
                                return {
                                  ...prev,
                                  model,
                                };
                              });
                            }}
                          >
                            <>
                              {
                                <Check
                                  className={cn("w-4 h-4 mr-2 opacity-0", {
                                    "opacity-100": isChecked,
                                  })}
                                />
                              }
                              {model.label}
                            </>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => {
                    return (
                      <RadioGroup
                        key={name}
                        value={options[name]}
                        onChange={(val) => {
                          setOptions((prev) => {
                            return {
                              ...prev,
                              [name]: val,
                            };
                          });
                        }}
                      >
                        <Label className="capitalize">{name}</Label>
                        <div className="mt-3 space-y-4">
                          {selectableOptions.map((option, i) => {
                            return (
                              <Radio
                                key={i}
                                value={option}
                                className={({ checked, autofocus }) =>
                                  cn(
                                    "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                    {
                                      "border-primary": checked || autofocus,
                                    }
                                  )
                                }
                              >
                                <span className="flex items-center">
                                  <span className="flex flex-col text-sm">
                                    <Label
                                      as="span"
                                      className="font-medium text-gray-900"
                                    >
                                      {option.label}
                                    </Label>
                                    {option.description && (
                                      <Description
                                        as="span"
                                        className={"text-gray-500"}
                                      >
                                        <span className="block sm:inline">
                                          {option.description}
                                        </span>
                                      </Description>
                                    )}
                                  </span>
                                </span>
                                <Description
                                  as={"span"}
                                  className={
                                    "mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                                  }
                                >
                                  <span className="font-medium text-gray-900">
                                    {formatPrice(option.price / 100)}
                                  </span>
                                </Description>
                              </Radio>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <Separator />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>
              <Button
                onClick={() =>{
                  saveConfig({
                    color: options.color.value,
                    configId,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }}
                size={"sm"}
                className="w-full "
                disabled={isPending || isPend}
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin" />
                    saving...
                  </>
                ) : isPend ? (
                  <>
                    <LoaderIcon className="animate-spin" />
                    redirecting...
                  </>
                ) : (
                  <>
                    <span>Confirm</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignConfigurator;

function HandleComponent() {
  return (
    <div className="w-5 h-5 bg-white rounded-full shadow border-zinc-200 border transition hover:bg-primary z-50 " />
  );
}
