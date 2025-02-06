import { getCoinMeta, getCoinMetas } from "@polymedia/coinmeta";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { CoinMetadata } from "@mysten/sui/client";
import { suiClient } from "@/sui/config";

const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day

export function useQueryCoinMeta(
  coinTypes: string,
  enabled?: boolean, // No default value in overloads
): UseQueryResult<CoinMetadata, Error>;
export function useQueryCoinMeta(
  coinTypes: string[],
  enabled?: boolean, // No default value in overloads
): UseQueryResult<Map<string, CoinMetadata | null>, Error>;
export function useQueryCoinMeta(coinTypes: string | string[], enabled: boolean = true) {
  return useQuery({
    queryKey: ["coin-meta", coinTypes],
    queryFn: async () => {
      if (!Array.isArray(coinTypes)) {
        // If it's a string (single coin)
        const meta = await getCoinMeta(suiClient, coinTypes);
        return meta;
      } else {
        // If it's an array (multiple coins)
        const metas = await getCoinMetas(suiClient, coinTypes);
        return metas;
      }
    },
    enabled, // Pass the enabled flag to the query
    refetchOnWindowFocus: false,
    staleTime: ONE_DAY,
    refetchInterval: ONE_DAY,
  });
}
