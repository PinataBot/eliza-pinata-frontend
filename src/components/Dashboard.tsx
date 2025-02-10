"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryPortfolioData, useQueryTotalTrades } from "@/hooks/query";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { Token } from "@/hooks/query/useQueryPortfolioData";

const Chart = ({
  sortedCoins,
  topCoins,
  totalBalance,
  totalCoinsUsd,
}: {
  sortedCoins: Token[];
  topCoins: Token[];
  totalBalance: number;
  totalCoinsUsd: number;
}) => {
  const otherCoins = sortedCoins.slice(4);

  const chartData = useMemo(() => {
    const topChartData = topCoins.map((coin) => ({
      name: coin.symbol,
      value: (+coin.usd / +totalBalance) * 100,
    }));

    if (otherCoins.length > 0) {
      topChartData.push({
        name: "Other",
        value: (+totalCoinsUsd / +totalBalance) * 100,
      });
    }

    return topChartData;
  }, [topCoins, totalBalance, totalCoinsUsd, otherCoins]);

  return (
    <div className="flex items-baseline gap-4 h-64 mt-8">
      {chartData.map((item, index) => (
        <div key={index} className="flex h-full flex-col items-center">
          <div
            className="w-10 bg-white rounded-t"
            style={{
              height: `${item.value}%`,
            }}
          />
          <span className="text-sm mt-2 font-bold">{item.name}</span>
          <span className="text-xs">{item.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const { data: coinsData, isLoading: isLoadingCoinsData } = useQueryPortfolioData();
  const { data: totalTrades, isLoading: isLoadingTotalTrades } = useQueryTotalTrades();

  if (isLoadingCoinsData) {
    return <Skeleton className="h-full min-h-72 mt-5 rounded-2xl w-1/3" />;
  }

  if (!coinsData) {
    return <p>Unable to load coins data</p>;
  }
  // Calculate total balance
  const totalCoinsUsd = coinsData?.value?.tokens.reduce((acc, coin) => acc + +coin.usd, 0);
  const totalBalance = +coinsData?.value?.totalUsd + totalCoinsUsd;

  // Sort coins by price * amount
  const coinsOnBalance = coinsData?.value?.tokens;
  const sortedCoins = coinsOnBalance?.sort((a, b) => +b.usd * +b.totalBalance - +a.usd * +a.totalBalance);
  const topCoins = sortedCoins?.slice(0, 4);

  return (
    <div className="h-full text-white p-4 bg-gray-950 rounded-2xl w-1/3">
      <h1 className="font-bold">Balance:</h1>
      <p className="text-3xl font-medium">${totalBalance.toFixed(2)}</p>
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-gray-100 text-sm">trades</p>
          {isLoadingTotalTrades ? <Skeleton className="h-6 w-12" /> : <p className="text-xl font-medium">{totalTrades}</p>}
        </div>
        <div>
          <p className="text-gray-100 text-sm">tokens</p>
          <p className="text-xl font-medium">{coinsOnBalance?.length}</p>
        </div>
      </div>
      <Separator />
      <h2>Top tokens holding:</h2>
      {topCoins?.map((coin) => (
        <p className="font-black" key={coin.coinType}>
          {coin.symbol}
        </p>
      ))}
      <Chart sortedCoins={sortedCoins} topCoins={topCoins} totalBalance={totalBalance} totalCoinsUsd={totalCoinsUsd} />
    </div>
  );
};
