import ClientTradingView from "@/components/components/ClientTradingView";

export default async function TradePage({ params }: { params: { tradeId: string } }) {
  const formattedSymbol = params.tradeId.toUpperCase();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">트레이딩 대시보드</h1>
      <ClientTradingView symbol={formattedSymbol} />
    </div>
  );
}