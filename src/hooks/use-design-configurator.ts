import { COLORS, FINISHES, MATERIALS, MODEL } from "@/config";
import { useRef, useState } from "react";

function useDesignConfigurator({
  dimensions,
}: {
  dimensions: { width: number; height: number };
}) {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODEL.options)[number];
    finish: (typeof FINISHES.options)[number];
    material: (typeof MATERIALS.options)[number];
  }>({
    color: COLORS[0],
    model: MODEL.options[0],
    finish: FINISHES.options[0],
    material: MATERIALS.options[0],
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });
  const [renderDimensions, setRenderDimensions] = useState({
    width: dimensions.width / 4,
    height: dimensions.height / 4,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneCaseRef = useRef<HTMLDivElement>(null);

  return {
    setRenderDimensions,
    setRenderedPosition,
    containerRef,
    phoneCaseRef,
  };
}

export default useDesignConfigurator;
