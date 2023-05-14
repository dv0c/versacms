import { ClassValue, clsx } from "clsx"
import { env } from "process"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}


export function uuid() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const now = new Date();
  let uuid = now.getTime().toString(36).slice(-8);
  for (let i = 0; i < 7; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
}