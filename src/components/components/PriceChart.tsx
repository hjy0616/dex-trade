"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, IChartApi, UTCTimestamp, LineSeries } from "lightweight-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  symbol: string;
  className?: string;
}

interface ChartData {
  time: UTCTimestamp;
  value: number;
}

export default function PriceChart({ symbol = "BTC-USD", className }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [percentChange, setPercentChange] = useState<number>(0);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    // 기존 차트 제거
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.7)",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(255, 255, 255, 0.1)" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          color: "rgba(255, 255, 255, 0.3)",
          labelBackgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        horzLine: {
          color: "rgba(255, 255, 255, 0.3)",
          labelBackgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: "#3674d9",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    chartRef.current = chart;
    
    // 차트에 표시할 샘플 데이터 생성 (실제 구현 시에는 API나 WebSocket으로 대체)
    const generateMockData = (): ChartData[] => {
      const startTime = Math.floor(Date.now() / 1000) - 24 * 60 * 60; // 24시간 전
      const data: ChartData[] = [];
      
      // BTC-USD 초기 가격 (샘플용)
      let basePrice = 50000;
      if (symbol === "ETH-USD") basePrice = 3000;
      if (symbol === "SOL-USD") basePrice = 100;
      
      // 24시간 동안의 데이터를 15분 간격으로 생성
      for (let i = 0; i < 96; i++) {
        // 가격 변동 시뮬레이션 (실제 데이터는 API로 가져와야 함)
        const randomChange = (Math.random() - 0.5) * 200;
        basePrice += randomChange;
        
        data.push({
          time: (startTime + i * 15 * 60) as UTCTimestamp,
          value: basePrice,
        });
      }
      
      // 현재 가격 및 변동률 계산
      const initialPrice = data[0].value;
      const currentPrice = data[data.length - 1].value;
      const priceChange = currentPrice - initialPrice;
      const percentChange = (priceChange / initialPrice) * 100;
      
      setCurrentPrice(currentPrice);
      setPriceChange(priceChange);
      setPercentChange(percentChange);
      
      return data;
    };
    
    const data = generateMockData();
    lineSeries.setData(data);
    chart.timeScale().fitContent();
    
    // 실시간 데이터 업데이트 시뮬레이션 (실제 구현 시에는 WebSocket으로 대체)
    const intervalId = setInterval(() => {
      const lastPoint = data[data.length - 1];
      const newTime = (lastPoint.time + 15 * 60) as UTCTimestamp;
      
      // 새로운 가격 생성 (실제로는 API에서 실시간 가격을 가져와야 함)
      const randomChange = (Math.random() - 0.5) * 50;
      const newValue = lastPoint.value + randomChange;
      
      const newPoint = { time: newTime, value: newValue };
      data.push(newPoint);
      data.shift(); // 오래된 데이터 제거
      
      lineSeries.update(newPoint);
      
      // 현재 가격 및 변동률 업데이트
      const initialPrice = data[0].value;
      setCurrentPrice(newValue);
      setPriceChange(newValue - initialPrice);
      setPercentChange(((newValue - initialPrice) / initialPrice) * 100);
    }, 5000); // 5초마다 업데이트
    
    // 창 크기 변경 시 차트 크기 조정
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [symbol]);
  
  // 숫자 포맷팅 함수
  const formatNumber = (num: number, precision: number = 2) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardHeader className="px-4 py-3 bg-card/40 backdrop-blur-sm border-b flex-row justify-between items-center">
        <div>
          <CardTitle className="text-base font-medium">{symbol} 차트</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-mono font-bold">${formatNumber(currentPrice)}</span>
            <Badge 
              variant={percentChange >= 0 ? "default" : "destructive"} 
              className="font-mono"
            >
              {percentChange >= 0 ? "+" : ""}{formatNumber(percentChange)}%
            </Badge>
            <span className="text-xs text-muted-foreground">
              {priceChange >= 0 ? "+" : ""}{formatNumber(priceChange)} USD
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="font-mono">24H</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-[300px]">
        <div ref={chartContainerRef} className="w-full h-full" />
      </CardContent>
    </Card>
  );
} 