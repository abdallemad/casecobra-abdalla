import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FileRejection } from "react-dropzone";
import { toast } from "sonner";

function useUploadConfigure() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast(`${file.file.type} is not supported`, {
      description: `this file is rejected: ${file.file.name}`,
      style: {
        backgroundColor: "#ff0033",
      }
    });
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  return {
    onDropRejected,
    onDropAccepted,
    isDragOver,
    isPending,
    uploadProgress,
    isUploading,
    setIsDragOver,
  };
}

export default useUploadConfigure;
