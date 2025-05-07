import OrderBook from "@/components/components/OrderBook";

export default function TradePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trade</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 다른 컴포넌트들 */}
        <OrderBook symbol="ETH-USD" precision={4} />
      </div>
    </div>
  );
}