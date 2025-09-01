"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { Rnd } from "react-rnd";

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
  const { setRenderDimensions, setRenderedPosition } = useDesignConfigurator({
    dimensions,
  });

  return (
    <div className="relative gap-2 mt-20 grid lg:grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden lg:col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
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
              `bg-blue-900`
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
    </div>
  );
}

export default DesignConfigurator;
import React from "react";
import useDesignConfigurator from "@/hooks/use-design-configurator";

function HandleComponent() {
  return (
    <div className="w-5 h-5 bg-white rounded-full shadow border-zinc-200 border transition hover:bg-primary z-50 " />
  );
}
