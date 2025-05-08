import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Web3 거래 플랫폼</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['BTC-USD', 'ETH-USD', 'SOL-USD'].map((pair) => (
            <Link 
              key={pair} 
              href={`/trade/${pair.toLowerCase()}`}
              className="block p-6 bg-card hover:bg-card/80 rounded-lg shadow transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{pair}</h2>
              <p className="text-muted-foreground">실시간 거래 차트 보기</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
