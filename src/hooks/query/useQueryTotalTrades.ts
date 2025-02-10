import { useQuery } from "@tanstack/react-query";
import { suiClient } from "@/sui/config";

const fetchObject = async () => {
  const object = await suiClient.getObject({
    id: "0x8ac0beffccfa1ac522d30d3886e4bf3bdf419d33a6afd585badae967438e7fb3",
    options: {
      showType: true,
      showContent: true,
    },
  });

  interface ObjectData {
    content: {
      dataType: string;
      fields: {
        action_blobs: {
          fields: {
            contents: {
              fields: {
                size: string;
              };
            };
          };
        };
      };
    };
  }
  const response = object.data as unknown as ObjectData;
  const trades = response?.content?.fields?.action_blobs?.fields.contents.fields.size;
  console.log("trades", trades);
  return trades;
};

export const useQueryTotalTrades = () => {
  const refetchInterval = 10_000;

  return useQuery({
    queryKey: ["total-trades"],
    queryFn: fetchObject,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
    refetchInterval,
  });
};
