"use client";

import PriceChart from "./PriceChart";
import OrderBook from "./OrderBook";

interface ClientTradingViewProps {
  symbol: string;
}

export default function ClientTradingView({ symbol }: ClientTradingViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <PriceChart symbol={symbol} />
      </div>
      <div>
        <OrderBook symbol={symbol} precision={4} />
      </div>
    </div>
  );
} 