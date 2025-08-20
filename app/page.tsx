"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MarketGrid } from "@/components/market-grid"
import { MarketModal } from "@/components/market-modal"
import { TradingModal } from "@/components/trading-modal"
import { Market } from "@/types/market"
import { ConnectButton } from "thirdweb/react";
import {client} from '../lib/utils'


const sampleMarkets: Market[] = [
  {
    id: "1",
    title: "Ethereum's new ATH by end of 2025?",
    category: "Crypto",
    probability: 58,
    change: 2,
    volume: "$50.1k",
    endDate: "Dec 31",
    image: "/ethereum-logo.png",
    yesPrice: 0.58,
    noPrice: 0.42,
    totalVolume: 4849,
    description: "Will Ethereum reach a new all-time high price by December 31, 2025?"
  },
  {
    id: "2",
    title: "Will a PENGU ETF be approved before October?",
    category: "Crypto",
    probability: 15,
    change: -3,
    volume: "$726",
    endDate: "Oct 1",
    image: "/penguin-mascot.png",
    yesPrice: 0.15,
    noPrice: 0.85,
    totalVolume: 726,
    description: "Will the SEC approve a PENGU ETF before October 2025?"
  },
  {
    id: "3",
    title: "Bitcoin's next hit: moon to $125K or dip to $105K?",
    category: "Crypto",
    probability: 54,
    change: 1,
    volume: "$72.5k",
    endDate: "Dec 31",
    image: "/bitcoin-logo.png",
    yesPrice: 0.54,
    noPrice: 0.46,
    totalVolume: 3540,
    description: "Will Bitcoin reach $125K before it drops to $105K?"
  },
  {
    id: "4",
    title: "Will Donald Trump visit China in 2025?",
    category: "Politics",
    probability: 52,
    change: 0,
    volume: "$35.5k",
    endDate: "Jan 1",
    image: "/trump-china-flags.png",
    yesPrice: 0.52,
    noPrice: 0.48,
    totalVolume: 4464,
    description: "Will Donald Trump make an official visit to China during 2025?"
  },
  {
    id: "5",
    title: "Will Binance or Coinbase list REKT before September?",
    category: "Crypto",
    probability: 43,
    change: -2,
    volume: "$34.7k",
    endDate: "Sep 1",
    image: "/cryptocurrency-exchange.png",
    yesPrice: 0.43,
    noPrice: 0.57,
    totalVolume: 1418,
    description: "Will either Binance or Coinbase list the REKT token before September 2025?"
  },
  {
    id: "6",
    title: "Fear & Greed next hit: moon to 80 or dip to 40?",
    category: "Economy",
    probability: 58,
    change: 4,
    volume: "$28.1k",
    endDate: "Dec 31",
    image: "/fear-greed-index-chart.png",
    yesPrice: 0.58,
    noPrice: 0.42,
    totalVolume: 2535,
    description: "Will the Fear & Greed Index reach 80 before dropping to 40?"
  }
]

export default function HomePage() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [tradingModal, setTradingModal] = useState<{
    market: Market
    side: 'yes' | 'no'
  } | null>(null)

  const filteredMarkets = selectedCategory === "All" 
    ? sampleMarkets 
    : sampleMarkets.filter(market => market.category === selectedCategory)

  const handleTradeClick = (market: Market, side: 'yes' | 'no') => {
    setTradingModal({ market, side })
  }

  const handleConfirmTrade = (market: Market, side: 'yes' | 'no', amount: number) => {
    // Handle the trade confirmation here
    console.log(`Trading ${amount} on ${side} for market: ${market.title}`)
    // You would typically send this to your backend/blockchain here
  }


  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Markets</h1>
            <p className="text-gray-400">
              Trade on the outcomes of future events
            </p>
          </div>

          <div>
            <ConnectButton client={client} />
          </div>
        </div>

        <MarketGrid
          markets={filteredMarkets}
          onMarketClick={setSelectedMarket}
          onTradeClick={handleTradeClick}
        />
      </main>

      {selectedMarket && (
        <MarketModal
          market={selectedMarket}
          onClose={() => setSelectedMarket(null)}
        />
      )}

      {tradingModal && (
        <TradingModal
          market={tradingModal.market}
          side={tradingModal.side}
          onClose={() => setTradingModal(null)}
          onConfirmTrade={handleConfirmTrade}
        />
      )}
    </div>
  );
}
