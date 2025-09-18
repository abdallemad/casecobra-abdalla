"use client";

import { getAuthStatusAction } from "@/actions/get-auth-status-action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useAuthCallback() {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatusAction(),
    retry: true,
    retryDelay: 2000,
  });

  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem("configurationId");
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push("/configure/upload");
      }
    } else {
      toast("Something went wrong during login. Please try again.", {
        description: "If the problem persists, contact support.",
        action: {
          label: "Go to Home",
          onClick: () => router.push("/"),
        },
      });
      router.push("/");
    }
  }, [data, configId, router]);
}

export default useAuthCallback;