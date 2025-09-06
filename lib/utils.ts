"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createThirdwebClient } from "thirdweb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});