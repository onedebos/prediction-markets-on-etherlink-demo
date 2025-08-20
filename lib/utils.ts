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


export const CONTRACT_ABI = {
  createMarket: "function createMarket(string calldata question, string calldata description, uint256 duration) external returns (uint256)",
  placeBet: "function placeBet(uint256 marketId, bool isYes) external payable",
  getMarket: "function getMarket(uint256 marketId) external view returns (tuple(uint256 id, string question, string description, uint256 endTime, bool resolved, uint8 winner, uint256 totalYesAmount, uint256 totalNoAmount, uint256 totalYesShares, uint256 totalNoShares, uint256 feesCollected, address creator, uint256 createdAt, bool active))",
  getUserPosition: "function getUserPosition(uint256 marketId, address user) external view returns (tuple(uint256 yesAmount, uint256 noAmount, uint256 yesShares, uint256 noShares, bool claimed))",
  claimWinnings: "function claimWinnings(uint256 marketId) external",
  pricePerShareWithFees: "function pricePerShareWithFees(uint256 marketId, bool isYes) external view returns (uint256)",
  calculatePotentialPayout: "function calculatePotentialPayout(uint256 marketId, bool isYes, uint256 betAmount) external view returns (uint256)",
  marketCounter: "function marketCounter() external view returns (uint256)",
  MarketCreated: "event MarketCreated(uint256 indexed marketId, address indexed creator, string question, uint256 endTime)",
  BetPlaced:"event BetPlaced(uint256 indexed marketId, address indexed user, bool indexed isYes, uint256 amount, uint256 shares)",
  MarketResolved: "event MarketResolved(uint256 indexed marketId, uint8 indexed winner, address indexed resolver)",
};