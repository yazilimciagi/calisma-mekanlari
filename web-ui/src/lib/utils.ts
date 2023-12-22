import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};
