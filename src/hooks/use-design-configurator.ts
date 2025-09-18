import {
  ConfigureSaved,
  saveConfigAction,
} from "@/actions/design-config-action";
import { COLORS, FINISHES, MATERIALS, MODEL } from "@/config";
import { useUploadThing } from "@/lib/uploadthing";
import { base64ToBlob } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

function useDesignConfigurator({
  dimensions,
  configId,
  imageUrl,
}: {
  dimensions: { width: number; height: number };
  configId: string;
  imageUrl: string;
}) {
  const router = useRouter();
  const [isPend, startTransition] = useTransition();
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });
  const [renderDimensions, setRenderDimensions] = useState({
    width: dimensions.width / 4,
    height: dimensions.height / 4,
  });
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
  const { startUpload } = useUploadThing("imageUploader", {});
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["config", configId],
    mutationFn: async (data: ConfigureSaved) => {
      return await Promise.all([saveConfiguration(), saveConfigAction(data)]);
    },
    onError: () => {
      toast("Upload Failed!", {
        description:
          "some thing went wrong when saving your config try again later.",
      });
    },
    onSuccess: () => {
      startTransition(() => router.push(`/configure/preview?id=${configId}`));
    },
  });
  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;
      const XFromPhone = Math.floor(renderedPosition.x - leftOffset);
      const YFromPhone = Math.floor(renderedPosition.y - topOffset);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const userImage = new Image();
      canvas.width = width;
      canvas.height = height;
      userImage.src = imageUrl;
      userImage.crossOrigin = "anonymous";
      await new Promise((resolve) => (userImage.onload = resolve));
      ctx?.drawImage(
        userImage,
        XFromPhone,
        YFromPhone,
        renderDimensions.width,
        renderDimensions.height
      );
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];
      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.bng", { type: "image/png" });
      await startUpload([file], { configId });
    } catch (error) {
      console.log(error);
      toast( "Some thing happened wrong please try again later",{
        description: "confirm your configurations is failed!!",
      });
    }
  }
  return {
    setRenderDimensions,
    setRenderedPosition,
    containerRef,
    phoneCaseRef,
    options,
    setOptions,
    isPend,
    isPending,
    saveConfig
  };
}

export default useDesignConfigurator;
