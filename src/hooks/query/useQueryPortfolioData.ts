import supabaseClient from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

export interface Token {
  symbol: string;
  coinType: string;
  usd: string;
  totalBalance: string;
}

export interface PortfolioData {
  value: {
    totalUsd: string;
    totalSui: string;
    tokens: Token[];
  };
  expires: number;
}

export const useQueryPortfolioData = () => {
  const refetchInterval = 5_000;

  const fetchMessages = async () => {
    const { data: messages, error } = await supabaseClient
      .from("cache")
      .select("value")
      .eq("key", "sui/wallet/portfolio-0x62e6022f612e5cd8e8c4985f94443134167746eaf157aff3afb31bd87c38466a")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      console.log(messages);
    }
    return messages;
  };

  return useQuery({
    queryKey: ["portfolio-data"],
    queryFn: async () => {
      const response = await fetchMessages();
      if (!response) return null;
      const portfolioData = JSON.parse(response[0].value as string) as PortfolioData;
      return portfolioData;
    },
    enabled: true,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};
