import supabaseClient from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

interface Message {
  text: string;
  user: string;
  action: string;
}

export const useQueryMessages = () => {
  const refetchInterval = 5_000;

  // TODO: compare roomID with the current roomID
  const fetchMessages = async () => {
    const { data: messages, error } = await supabaseClient
      .from("memories")
      .select("content, createdAt")
      //.eq("roomID", "")
      .or("content->>source.is.null,content->>source.neq.direct") // Include records where source is null OR not "direct"
      .order("createdAt", { ascending: false })
      .limit(50);

    if (error) {
      console.error(error);
    } else {
      console.log(messages);
    }
    return messages;
  };

  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await fetchMessages();
      if (!response) return null;

      return response;
    },
    enabled: true,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};
