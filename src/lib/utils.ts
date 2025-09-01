import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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