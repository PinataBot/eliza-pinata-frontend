"use client";
import { Separator } from "@/components/ui/separator";
import { useQueryCoinsData, useQueryGetAllCoinFromAddress } from "@/hooks/query";
import { BOT_WALLET_ADDRESS } from "@/sui/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { CoinData } from "@/hooks/query/useQueryCoinsData";

// const coinsDataMockup: CoinData[] = [
//   {
//     isMintable: "true",
//     tokensBurned: "1000000",
//     tokensBurnedPercentage: "10",
//     lpBurnt: "500000",
//     coinSupply: "9000000",
//     coinMetadata: {
//       _id: "1",
//       coinType: "0x2::sui::SUI",
//       createdAt: "2024-02-06T12:00:00Z",
//       decimals: "9",
//       description: "Sui blockchain token",
//       iconUrl: "https://example.com/icon.png",
//       id: "coin_1",
//       name: "Sui Token",
//       symbol: "SUI",
//       dev: "Sui Foundation",
//       isHoneypot: "false",
//       supply: "9000000",
//       treasuryCap: "5000000",
//       treasuryCapOwner: {
//         AddressOwner: "0x123456",
//       },
//       lastTradeAt: "2024-02-06T14:30:00Z",
//     },
//     tokensInLiquidity: "2000000",
//     tokensInBurntLp: "300000",
//     suiInBurntLp: "150000",
//     percentageTokenSupplyInBurntLp: "3.33",
//     percentageTokenSupplyInLiquidity: "22.22",
//     isCoinHoneyPot: "false",
//     suspiciousActivities: [],
//     top10HolderPercentage: "40",
//     top20HolderPercentage: "55",
//     fullyDilutedMarketCap: "100000000",
//     marketCap: "85000000",
//     totalLiquidityUsd: "5000000",
//     timeCreated: "2023-12-01T00:00:00Z",
//     coin: "SUI",
//     coinDev: "Sui Foundation",
//     price5mAgo: "1.10",
//     price1hAgo: "1.08",
//     price6hAgo: "1.05",
//     price24hAgo: "0.98",
//     percentagePriceChange5m: "0.91",
//     percentagePriceChange1h: "1.85",
//     percentagePriceChange6h: "4.76",
//     percentagePriceChange24h: "12.24",
//     coinDevHoldings: "1000000",
//     coinDevHoldingsPercentage: "11.11",
//     buyVolume5m: "50000",
//     buyVolume1h: "250000",
//     buyVolume6h: "1000000",
//     buyVolume24h: "5000000",
//     sellVolume5m: "30000",
//     sellVolume1h: "200000",
//     sellVolume6h: "800000",
//     sellVolume24h: "4000000",
//     volume5m: "80000",
//     volume1h: "450000",
//     volume6h: "1800000",
//     volume24h: "9000000",
//     coinPrice: "1.11",
//     advancedScores: {
//       _id: "score_1",
//       coin: "SUI",
//       updatedAt: "2024-02-06T12:30:00Z",
//       holdersWithProminentNft: "500",
//       holdersWithSuiNs: "200",
//       averageAgeOfHolders: "3",
//       holderQualityScore: "85",
//       volumeMin: "0.5",
//       volumeMax: "10",
//       volumeMean: "2.5",
//       volumeStdDev: "1.2",
//       volumeScore: "80",
//       liqMin: "1000",
//       liqMax: "50000",
//       liqMean: "12000",
//       liqStdDev: "5000",
//       liqScore: "75",
//       uniqueUsersMin: "10",
//       uniqueUsersMax: "1000",
//       uniqueUsersMean: "300",
//       uniqueUsersStdDev: "150",
//       uniqueUsersScore: "70",
//       tradePerUserMin: "1",
//       tradePerUserMax: "10",
//       tradePerUserMean: "3",
//       tradePerUserStdDev: "1.5",
//       tradePerUserScore: "78",
//       uniqueBuyers7d: "1500",
//       uniqueSellers7d: "1400",
//       uniqueBuyers14d: "3000",
//       uniqueSellers14d: "2800",
//       totalTrades7d: "5000",
//       uniqueBuyersWithVolumeMoreThan500_7d: "300",
//       uniqueSellersWithVolumeMoreThan500_7d: "280",
//       uniqueBuyersWithVolumeMoreThan500_14d: "600",
//       uniqueSellersWithVolumeMoreThan500_14d: "550",
//       uniqueBuyersWithVolumeMoreThan1000_7d: "100",
//       uniqueSellersWithVolumeMoreThan1000_7d: "90",
//       uniqueBuyersWithVolumeMoreThan1000_14d: "200",
//       uniqueSellersWithVolumeMoreThan1000_14d: "180",
//     },
//   },
// ];

const Chart = ({
  sortedCoins,
  topCoins,
  totalBalance,
}: {
  sortedCoins: { name: string; price: number; amount: number }[];
  topCoins: { name: string; price: number; amount: number }[];
  totalBalance: string;
}) => {
  const otherCoins = useMemo(() => sortedCoins.slice(4), [sortedCoins]);

  const otherTotal = useMemo(
    () => (otherCoins.length ? otherCoins.reduce((sum, coin) => sum + coin.price * coin.amount, 0) : 0),
    [otherCoins],
  );

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
  const coins = useMemo(() => {
    return coinsOnBalance
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
  }, [coinsOnBalance, coinsData]);

  const totalBalance = useMemo(
    () => (coins.length ? coins.reduce((sum, coin) => sum + coin.price * coin.amount, 0) : 0).toFixed(1),
    [coins],
  );

  const sortedCoins = useMemo(() => coins.sort((a, b) => b.price * b.amount - a.price * a.amount), [coins]);
  const topCoins = useMemo(() => sortedCoins.slice(0, 4), [sortedCoins]);

  return (
    <div className="h-full text-white p-4 mt-5 bg-gray-950 rounded-2xl w-1/3">
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
