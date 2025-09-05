"use client"

import { useState, useEffect } from "react";
import { getContractEvents, prepareEvent, readContract } from "thirdweb";
import { contract } from "@/lib/contract-utils";

const marketCreatedEvent = prepareEvent({
  signature:
    "event MarketCreated(uint256 indexed marketId, address indexed creator, string question, uint256 endTime)",
});

export function useMarkets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get MarketCreated events
      const events = await getContractEvents({
        contract,
        events: [marketCreatedEvent],
        query: {
          order: "desc", // Latest first
          limit: 100, // Adjust as needed
        },
      });

      // Get full details for each market
      const marketDetails = await Promise.all(
        events.map(async (event) => {
          try {
            const marketData = await readContract({
              contract,
              method:
                "function getMarket(uint256) view returns (uint256,string,string,uint256,bool,uint8,uint256,uint256,uint256,uint256,uint256,address,uint256,bool)",
              params: [event.args.marketId],
            });


console.log("Market Details:", marketData);
            return {
            
              // Event data
              createdAtBlock: event.blockNumber.toString(),
              transactionHash: event.transactionHash,

              // Contract state
              id: marketData[0].toString(),
              question: marketData[1],
              description: marketData[2],
              endTime: marketData[3].toString(),
              resolved: marketData[4],
              winner: marketData[5],
              totalYesAmount: marketData[6].toString(),
              totalNoAmount: marketData[7].toString(),
              creator: marketData[11],
              active: marketData[13],
            };
          } catch (err) {
            console.error(`Error fetching market ${event.args.marketId}:`, err);
            return null;
          }
        })
      );

      
      const validMarkets = marketDetails.filter((m) => m !== null);
      setMarkets(validMarkets);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching markets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  return {
    markets,
    loading,
    error,
    refetch: fetchMarkets,
  };
}
