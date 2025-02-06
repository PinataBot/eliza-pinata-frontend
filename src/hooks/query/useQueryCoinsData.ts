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

interface CoinData {
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
