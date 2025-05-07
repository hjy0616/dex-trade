"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Order = {
  price: number;
  size: number;
  total: number;
  depth: number; // percentage for visualization
};

interface OrderBookProps {
  symbol: string;
  spread?: number;
  precision?: number;
  className?: string;
}

export default function OrderBook({ 
  symbol = "BTC-USD", 
  spread = 0.15, 
  precision = 2,
  className 
}: OrderBookProps) {
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [grouping, setGrouping] = useState<string>("0.1");

  // 실제 구현 시에는 WebSocket을 통해 실시간 데이터를 받아와야 합니다
  useEffect(() => {
    // Mock data for demonstration
    const mockAsks: Order[] = Array(12).fill(0).map((_, i) => ({
      price: 50000 + (i * 10),
      size: Math.random() * 5 + 0.1,
      total: 0,
      depth: 0,
    }));
    
    const mockBids: Order[] = Array(12).fill(0).map((_, i) => ({
      price: 49990 - (i * 10),
      size: Math.random() * 5 + 0.1,
      total: 0,
      depth: 0,
    }));

    // Calculate totals and depths
    let askTotal = 0;
    let bidTotal = 0;
    const processedAsks = mockAsks.map(ask => {
      askTotal += ask.size;
      return { ...ask, total: askTotal, depth: 0 };
    });
    
    const processedBids = mockBids.map(bid => {
      bidTotal += bid.size;
      return { ...bid, total: bidTotal, depth: 0 };
    });
    
    const maxTotal = Math.max(askTotal, bidTotal);
    
    const asksWithDepth = processedAsks.map(ask => ({
      ...ask,
      depth: (ask.total / maxTotal) * 100
    }));
    
    const bidsWithDepth = processedBids.map(bid => ({
      ...bid,
      depth: (bid.total / maxTotal) * 100
    }));
    
    setAsks(asksWithDepth);
    setBids(bidsWithDepth);
    
    // 실제 구현 시 WebSocket 연결 및 정리 코드 필요
  }, []);

  const formatNumber = (num: number, precision: number) => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: precision, 
      maximumFractionDigits: precision 
    });
  };

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
      <CardHeader className="px-4 py-3 bg-card/40 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Order Book</CardTitle>
          <Badge variant="outline" className="font-mono">{symbol}</Badge>
        </div>
        
        <div className="flex items-center justify-between mt-1.5">
          <Tabs defaultValue={grouping} className="w-[200px]">
            <TabsList className="grid grid-cols-4 h-7">
              <TabsTrigger value="0.01" onClick={() => setGrouping("0.01")}>0.01</TabsTrigger>
              <TabsTrigger value="0.1" onClick={() => setGrouping("0.1")}>0.1</TabsTrigger>
              <TabsTrigger value="1" onClick={() => setGrouping("1")}>1.0</TabsTrigger>
              <TabsTrigger value="10" onClick={() => setGrouping("10")}>10</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <span className="text-xs text-muted-foreground">Spread: {formatNumber(spread, 2)}%</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-3 text-xs px-4 py-1.5 text-muted-foreground bg-muted/40">
          <div>Price</div>
          <div className="text-right">Size</div>
          <div className="text-right">Total</div>
        </div>
        
        <div className="relative">
          {/* Asks (Sell orders) */}
          <div className="max-h-[240px] overflow-auto">
            {/* 배경 그래프를 위한 컨테이너 */}
            <div className="relative">
              <div className="absolute top-0 right-0 h-full pointer-events-none">
                {asks.map((ask, i) => (
                  <div 
                    key={`ask-bg-${i}`}
                    className="absolute top-0 right-0 h-7 bg-destructive/20 z-0" 
                    style={{ 
                      width: `${ask.depth}%`,
                      top: `${i * 28}px` // 행 높이에 맞춰 조정
                    }}
                  />
                ))}
              </div>
              
              <Table>
                <TableBody>
                  {asks.map((ask, i) => (
                    <TableRow key={`ask-${i}`} className="h-7 relative z-10">
                      <TableCell className="py-1 font-mono text-xs text-destructive-foreground">
                        {formatNumber(ask.price, precision)}
                      </TableCell>
                      <TableCell className="py-1 font-mono text-xs text-right">
                        {formatNumber(ask.size, precision)}
                      </TableCell>
                      <TableCell className="py-1 font-mono text-xs text-right">
                        {formatNumber(ask.total, precision)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Current price indicator */}
          <div className="px-4 py-2 border-y flex justify-between items-center bg-muted/30 font-medium">
            <span className="text-sm font-mono text-primary">
              {formatNumber(bids[0]?.price || 0, precision)}
            </span>
            <span className="text-xs text-muted-foreground">Last traded price</span>
          </div>
          
          {/* Bids (Buy orders) */}
          <div className="max-h-[240px] overflow-auto">
            {/* 배경 그래프를 위한 컨테이너 */}
            <div className="relative">
              <div className="absolute top-0 right-0 h-full pointer-events-none">
                {bids.map((bid, i) => (
                  <div 
                    key={`bid-bg-${i}`}
                    className="absolute top-0 right-0 h-7 bg-primary/20 z-0" 
                    style={{ 
                      width: `${bid.depth}%`,
                      top: `${i * 28}px` // 행 높이에 맞춰 조정
                    }}
                  />
                ))}
              </div>
              
              <Table>
                <TableBody>
                  {bids.map((bid, i) => (
                    <TableRow key={`bid-${i}`} className="h-7 relative z-10">
                      <TableCell className="py-1 font-mono text-xs text-primary-foreground">
                        {formatNumber(bid.price, precision)}
                      </TableCell>
                      <TableCell className="py-1 font-mono text-xs text-right">
                        {formatNumber(bid.size, precision)}
                      </TableCell>
                      <TableCell className="py-1 font-mono text-xs text-right">
                        {formatNumber(bid.total, precision)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}