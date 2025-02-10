import supabaseClient from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

interface MessageResponse {
  content: {
    action?: string;
    text: string;
    user?: string;
    blobId?: string;
  };
  createdAt: string;
}

export interface ANALYZE_MESSAGE {
  type: "PORTFOLIO_ANALYSIS" | "ANALYZE_TRADE";
  tokenName: string;
  coinType: string;
  recommendation: string;
  amount: number;
  confidence: number;
  reasoning: string;
  risks: string[];
  opportunities: string[];
  nextAction: {
    fromCoinType?: string;
    toCoinType?: string;
  };
}

export interface SWAP_MESSAGE {
  type: "SWAP_TOKEN";
  amount: number;
  destination_coin_type: string;
  from_coin_type: string;
}

export interface MergedMessage {
  content: {
    action?: string;
    text: string;
    user?: string;
    blobId?: string;
    action_data?: ANALYZE_MESSAGE | SWAP_MESSAGE;
  };
  createdAt: string;
}

function mergeMessagesPreservingOrder(messages: MessageResponse[]): MergedMessage[] {
  const result: MergedMessage[] = [];
  const actionQueue: MergedMessage[] = []; // Queue of messages with action but without blobId

  for (const message of messages) {
    const { content, createdAt } = message;

    if (content.action && !content.blobId) {
      // Message with action but without blobId - add to queue
      const actionMessage: MergedMessage = { content: { ...content }, createdAt };
      actionQueue.push(actionMessage);
      result.push(actionMessage);
    } else if (content.blobId && content.action) {
      // Message with blobId and action - look for match in queue
      const matchedMessage = actionQueue.find((msg) => msg.content.action === content.action);

      if (matchedMessage) {
        try {
          matchedMessage.content.action_data = JSON.parse(content.text);
        } catch {
          matchedMessage.content.action_data = undefined; // If JSON is invalid, ignore
        }
        matchedMessage.content.blobId = content.blobId;

        // Remove from queue as it's processed
        actionQueue.splice(actionQueue.indexOf(matchedMessage), 1);
      } else {
        // If no match found - just add it
        result.push({ content: { ...content, action_data: JSON.parse(content.text) }, createdAt });
      }
    } else {
      // Regular message - just add it
      result.push({ content, createdAt });
    }
  }
  return result;
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
      return mergeMessagesPreservingOrder(response as MessageResponse[]);
    },
    enabled: true,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};
