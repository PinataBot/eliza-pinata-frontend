import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CoinMetadata {
  _id: string;
  coinType: string;
  createdAt: string;
  decimals: string;
  description?: string;
  iconUrl?: string;
  id: string;
  name: string;
  symbol: string;
  dev?: string;
  isHoneypot: string;
  supply: string;
  treasuryCap: string;
  treasuryCapOwner: {
    AddressOwner: string;
  };
  lastTradeAt?: string | null;
}

interface AdvancedScores {
  _id: string;
  coin: string;
  updatedAt: string;
  holdersWithProminentNft: string;
  holdersWithSuiNs: string;
  averageAgeOfHolders: string;
  holderQualityScore: string;
  volumeMin: string;
  volumeMax: string;
  volumeMean: string;
  volumeStdDev: string;
  volumeScore: string;
  liqMin: string;
  liqMax: string;
  liqMean: string;
  liqStdDev: string;
  liqScore: string;
  uniqueUsersMin: string;
  uniqueUsersMax: string;
  uniqueUsersMean: string;
  uniqueUsersStdDev: string;
  uniqueUsersScore: string;
  tradePerUserMin: string;
  tradePerUserMax: string;
  tradePerUserMean: string;
  tradePerUserStdDev: string;
  tradePerUserScore: string;
  uniqueBuyers7d: string;
  uniqueSellers7d: string;
  uniqueBuyers14d: string;
  uniqueSellers14d: string;
  totalTrades7d: string;
  uniqueBuyersWithVolumeMoreThan500_7d: string;
  uniqueSellersWithVolumeMoreThan500_7d: string;
  uniqueBuyersWithVolumeMoreThan500_14d: string;
  uniqueSellersWithVolumeMoreThan500_14d: string;
  uniqueBuyersWithVolumeMoreThan1000_7d: string;
  uniqueSellersWithVolumeMoreThan1000_7d: string;
  uniqueBuyersWithVolumeMoreThan1000_14d: string;
  uniqueSellersWithVolumeMoreThan1000_14d: string;
}

export interface CoinData {
  isMintable: string;
  tokensBurned: string;
  tokensBurnedPercentage: string;
  lpBurnt: string;
  coinSupply: string;
  coinMetadata: CoinMetadata;
  tokensInLiquidity: string;
  tokensInBurntLp: string;
  suiInBurntLp: string;
  percentageTokenSupplyInBurntLp: string;
  percentageTokenSupplyInLiquidity: string;
  isCoinHoneyPot: string;
  suspiciousActivities: any[];
  top10HolderPercentage: string;
  top20HolderPercentage: string;
  fullyDilutedMarketCap: string;
  marketCap: string;
  totalLiquidityUsd: string;
  timeCreated: string;
  coin: string;
  coinDev: string;
  price5mAgo: string;
  price1hAgo: string;
  price6hAgo: string;
  price24hAgo: string;
  percentagePriceChange5m: string;
  percentagePriceChange1h: string;
  percentagePriceChange6h: string;
  percentagePriceChange24h: string;
  coinDevHoldings: string;
  coinDevHoldingsPercentage: string;
  buyVolume5m: string;
  buyVolume1h: string;
  buyVolume6h: string;
  buyVolume24h: string;
  sellVolume5m: string;
  sellVolume1h: string;
  sellVolume6h: string;
  sellVolume24h: string;
  volume5m: string;
  volume1h: string;
  volume6h: string;
  volume24h: string;
  coinPrice: string;
  advancedScores: AdvancedScores;
}

// const coinsData: CoinData[] = [
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

export const useQueryCoinsData = (coinTypes: string[]) => {
  const refetchInterval = 5_000;

  return useQuery({
    queryKey: ["coins-data", coinTypes],
    queryFn: async () => {
      const coinsQueryParam = coinTypes.join(",");

      const response = await axios.get<CoinData[]>(`https://api.insidex.trade/external/coin-details?coins=${coinsQueryParam}`);

      return response.data;
    },
    enabled: coinTypes.length > 0,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};
