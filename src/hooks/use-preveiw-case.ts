import { createCheckoutSessionAction } from "@/actions/create-checkout-session-action";
import { COLORS, FINISHES, MATERIALS, MODEL } from "@/config";
import { useUser } from "@clerk/nextjs";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function usePreviewCase(configuration: Configuration) {
  const router = useRouter();
  const user = useUser();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setShowConfetti(true), []);
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSessionAction,
    onSuccess: ({url}) => {
      if (url) router.push(url);
    },
  });
  const tw = COLORS.find(
    (colorOption) => colorOption.value === configuration.color
  )!.tw;
  const model = MODEL.options.find(
    (modelOption) => modelOption.value == configuration.model
  )!;
  const finish = FINISHES.options.find(
    (modelOption) => modelOption.value == configuration.finish
  )!;
  const material = MATERIALS.options.find(
    (modelOption) => modelOption.value == configuration.material
  )!;
  const handelCheckout = () => {
    if (user.user) {
      setIsLoading(true);
      createPaymentSession({ configurationId: configuration.id });
    } else {
      localStorage.setItem("configurationId", configuration.id);
      setIsOpen(true);
      setIsLoading(false);
    }
  };
  return {
    showConfetti,
    tw,
    model,
    finish,
    material,
    isLoading,
    handelCheckout,
    isOpen, 
    setIsOpen,
  };
}

export default usePreviewCase;
