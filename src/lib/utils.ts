import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmptyString(value: unknown): boolean {
  return typeof value !== "string" || value.trim().length === 0
}
