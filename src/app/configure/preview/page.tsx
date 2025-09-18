import { notFound } from "next/navigation";
import React from "react";
import db from "@/lib/prisma";
import DesignPreview from "./design-preview";

async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams)?.id as string;
  if (!id || typeof id !== "string") return notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) return notFound();
  return <DesignPreview configuration={configuration} />;
}

export default PreviewPage;
