import { redirect } from "next/navigation";
import { Metadata } from "next";
import db from "@/lib/prisma";
import DesignConfigurator from "./design-configurator";

export const metadata: Metadata = {
  title: "Design Configuration",
  description: "Configure design settings for your project",
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams)?.id as string;
  if (!id) return redirect("/upload");
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) return redirect("/upload");
  return (
    <DesignConfigurator
      configId={configuration.id}
      imageUrl={configuration.imageUrl}
      dimensions={{
        width: configuration.width,
        height: configuration.height,
      }}
    />
  );
}

export default page;
