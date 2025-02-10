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
    <div className="h-full text-white p-4 bg-gray-950 rounded-2xl md:w-1/3 w-full">
      <h1 className="text-3xl font-extrabold gradientText">Agent balance</h1>
      <p className="text-3xl font-black">${totalBalance.toFixed(2)}</p>
      <div className="flex flex-wrap justify-between">
        <p className="mt-2 flex items-baseline gap-x-2">
          {isLoadingTotalTrades ? (
            <Skeleton className="h-12 w-4" />
          ) : (
            <span className="text-3xl font-semibold tracking-tight text-white">{totalTrades}</span>
          )}
          <span className="text-sm text-gray-400">trades</span>
        </p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-3xl font-semibold tracking-tight text-white">{coinsOnBalance?.length}</span>
          <span className="text-sm text-gray-400">tokens</span>
        </p>
      </div>

      <Separator className="bg-gray-700" />
      <h2 className="font-black mt-2">Top tokens holding:</h2>
      {/* SUI */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>{Number(coinsData?.value?.totalSui).toFixed(2)} SUI</p>
          <p>${Number(coinsData?.value?.totalUsd).toFixed(2)}</p>
        </div>
      </div>
      {topCoins?.map((coin) => (
        <div className="flex justify-between">
          <p>
            {Number(coin.totalBalance).toFixed(2)} {coin.symbol}
          </p>
          <p>${Number(coin.usd).toFixed(2)}</p>
        </div>
      ))}
      <Chart sortedCoins={sortedCoins} topCoins={topCoins} totalBalance={totalBalance} totalCoinsUsd={totalCoinsUsd} />
    </div>
  );
};
