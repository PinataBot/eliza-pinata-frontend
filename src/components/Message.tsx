"use client";
import { SwapIcon } from "@/components/icons";
import Link from "next/link";
import { ANALYZE_MESSAGE, MergedMessage, SWAP_MESSAGE } from "@/hooks/query/useQueryMessages";

const PurpleBadgeAction = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-[0.1rem] text-[10px] font-medium text-purple-400 ring-1 ring-purple-400/30 ring-inset">
    {text}
  </span>
);

const BlueWalrusBadgeAction = ({ text }: { text: string }) => (
  <Link
    href={`https://walruscan.com/testnet/blob/${text}`}
    className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-[0.1rem] text-[10px] font-medium text-blue-400 ring-1 ring-blue-400/30 ring-inset"
    target="_blank"
  >
    Blob ID:{text.slice(0, 2)}...{text.slice(-2)}
  </Link>
);

// TODO: maybe add tx link to scanner
export const Message = ({ message }: { message: MergedMessage }) => {
  const localTime = new Date(message?.createdAt).toLocaleString();
  if (!message.content?.action_data) {
    return null;
  }
  const actionDataSwap = message.content.action_data as SWAP_MESSAGE;
  const actionDataPortfolioAnalysis = message.content.action_data as ANALYZE_MESSAGE;

  return (
    <div className="w-full my-4 first:mt-0">
      <div className="flex z-10 items-start gap-2">
        <div className="rounded-xl border-[0.5px] border-gray-700 w-full text-gray-200 px-5 py-3 max-w-full bg-gray-950">
          <p className="font-medium line-clamp-4">{message.content.text}</p>
          <div className="w-full flex justify-between items-end mt-2">
            <p className="text-xs text-gray-600 items-center">{localTime}</p>
            {message.content.blobId && <BlueWalrusBadgeAction text={message.content.blobId} />}
            {message.content.action && <PurpleBadgeAction text={message.content.action} />}
          </div>
        </div>
      </div>

      {message.content.action === "SWAP_TOKEN" && (
        <div className="w-full flex items-end -mt-3 pt-5 gap-2 rounded-b-xl px-5 pb-3 bg-gray-200">
          <h3 className="font-bold text-xl">Swap</h3>
          <div className="flex rounded-2xl gap-10 font-bold text-sms text-gray-700 w-full max-w-full">
            <div className="flex gap-2 items-center">
              <span>{actionDataSwap.from_coin_type.split("::").pop()}</span>
              <span>{actionDataSwap.amount}</span>
            </div>
            <SwapIcon />
            <div className="flex gap-2 items-center">
              <span>{actionDataSwap.destination_coin_type.split("::").pop()}</span>
            </div>
          </div>
        </div>
      )}

      {(message.content.action === "PORTFOLIO_ANALYSIS" || message.content.action === "ANALYZE_TRADE") && (
        <div className="w-full flex items-end -mt-3 pt-5 gap-2 rounded-b-xl px-5 pb-3 bg-gray-200">
          <h3 className="font-bold text-xl">Analysis</h3>
          <div className="flex rounded-2xl gap-10 font-bold text-sms text-gray-700 w-full max-w-full">
            <div className="flex gap-2 items-center">
              <span>{actionDataPortfolioAnalysis.coinType.split("::").pop()}</span>
              <span>{actionDataPortfolioAnalysis.amount}</span>
            </div>
            <SwapIcon />
            <div className="flex gap-2 items-center">
              <span>{actionDataPortfolioAnalysis.nextAction.toCoinType?.split("::").pop()}</span>
            </div>
            <PurpleBadgeAction text={actionDataPortfolioAnalysis.recommendation} />
          </div>
        </div>
      )}
    </div>
  );
};
