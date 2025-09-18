import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitArray<T>(arr: T[], columns: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < arr.length; i++) {
    const index = i % columns;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(arr[i]);
  }
  return result;
}
export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
}

export function base64ToBlob(base64: string, mimType: string) {
  const byteData = atob(base64);
  const byteNumbers = new Array(byteData.length);
  for (let i = 0; i < byteData.length; i++) {
    byteNumbers[i] = byteData.charCodeAt(i);
  }
  const byteArray = new Int8Array(byteNumbers);
  return new Blob([byteArray], {
    type: mimType,
  });
}
