"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryCoinsData, useQueryGetAllCoinFromAddress } from "@/hooks/query";
import { BOT_WALLET_ADDRESS } from "@/sui/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const Chart = ({
  sortedCoins,
  topCoins,
  totalBalance,
}: {
  sortedCoins: { name: string; price: number; amount: number }[];
  topCoins: { name: string; price: number; amount: number }[];
  totalBalance: string;
}) => {
  const otherCoins = sortedCoins.slice(4);

  const otherTotal = otherCoins.length ? otherCoins.reduce((sum, coin) => sum + coin.price * coin.amount, 0) : 0;

  const chartData = useMemo(() => {
    const topChartData = topCoins.map((coin) => ({
      name: coin.name,
      value: ((coin.price * coin.amount) / +totalBalance) * 100,
    }));

    if (otherCoins.length > 0) {
      topChartData.push({
        name: "Other",
        value: (otherTotal / +totalBalance) * 100,
      });
    }

    return topChartData;
  }, [topCoins, otherTotal, totalBalance, otherCoins]);

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
  const { data: coinsOnBalance, isLoading: isLoadingCoinsOnBalance } = useQueryGetAllCoinFromAddress(BOT_WALLET_ADDRESS);
  const coinTypesOnBalance = useMemo(() => coinsOnBalance?.map((coin) => coin.coinType) || [], [coinsOnBalance]);

  const { data: coinsData, isLoading: isLoadingCoinsData } = useQueryCoinsData(coinTypesOnBalance);

  if (isLoadingCoinsOnBalance || isLoadingCoinsData) {
    return <Skeleton className="h-full min-h-72 mt-5 rounded-2xl w-1/3" />;
  }

  if (!coinsData || !coinsOnBalance) {
    return <p>Unable to load coins data</p>;
  }

  // Array of normalized coins with price and amount
  const coins = coinsOnBalance
    .map((coin) => {
      const coinInfo = coinsData.find((data) => data.coinMetadata.coinType === coin.coinType);
      if (!coinInfo) return null;
      const decimals = parseInt(coinInfo.coinMetadata.decimals);
      const price = parseFloat(coinInfo.coinPrice);
      const amount = parseFloat(coin.totalBalance) / Math.pow(10, decimals);
      return {
        name: coinInfo.coinMetadata.symbol,
        price,
        amount,
      };
    })
    .filter((coin) => coin !== null);

  const totalBalance = (coins.length ? coins.reduce((sum, coin) => sum + coin.price * coin.amount, 0) : 0).toFixed(1);

  const sortedCoins = coins.sort((a, b) => b.price * b.amount - a.price * a.amount);
  const topCoins = sortedCoins.slice(0, 4);

  return (
    <div className="h-full text-white p-4 bg-gray-950 rounded-2xl w-1/3">
      <h1 className="font-bold">Balance:</h1>
      <p className="text-3xl font-medium">${totalBalance}</p>
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-gray-100 text-sm">trades</p>
          <p className="text-xl font-medium">140</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm">tokens</p>
          <p className="text-xl font-medium">{coinsOnBalance.length}</p>
        </div>
      </div>
      <Separator />
      <h2>Top tokens holding:</h2>
      {topCoins.map((coin) => (
        <p className="font-black" key={coin.name}>
          {coin.name}
        </p>
      ))}
      <Chart sortedCoins={sortedCoins} topCoins={topCoins} totalBalance={totalBalance} />
    </div>
  );
};
