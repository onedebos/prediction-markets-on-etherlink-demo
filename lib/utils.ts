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

// generate an array of market IDs based on the no of markets
export const marketIds = (noOfMarkets) => {
return noOfMarkets
  ? Array.from({ length: Number(noOfMarkets) }, (_, i) => i + 1)
  : [];
};