import { suiClient } from "@/sui/config";
import { useQuery } from "@tanstack/react-query";
import { WHITELIST_COINS } from "@/sui/constants";

export const useQueryGetAllCoinFromAddress = (userAddress?: string) => {
  const refetchInterval = 10_000;

  return useQuery({
    queryKey: ["allBalances", userAddress],
    queryFn: async () => {
      if (!userAddress) return [];
      const balances = await suiClient.getAllBalances({ owner: userAddress });
      return balances.filter((balance) => WHITELIST_COINS.includes(balance.coinType));
    },
    enabled: !!userAddress,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};
