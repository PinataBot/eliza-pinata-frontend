"use client";
import { SwapIcon } from "@/components/icons";
import Link from "next/link";
import { ANALYZE_MESSAGE, MergedMessage, SWAP_MESSAGE } from "@/hooks/query/useQueryMessages";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnalyzeDialog } from "@/components/Dialogs/AnalyzeDialog";
import { MessageActionType, PortfolioAnalysis, TrendingTokens } from "@/types";

const PurpleBadgeAction = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-[0.1rem] text-[10px] font-medium text-purple-400 ring-1 ring-purple-400/30 ring-inset">
    {text}
  </span>
);

const GreenBadgeAction = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-[0.1rem] text-[10px] font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
    {text}
  </span>
);

const GrayBadgeAction = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-[0.1rem] text-[10px] font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
    {text}
  </span>
);

const BadgeAction = ({ text }: { text: string }) => {
  if (text === MessageActionType.SWAP_TOKEN) {
    return <GreenBadgeAction text={text} />;
  } else if (text === TrendingTokens || text === PortfolioAnalysis) {
    return <PurpleBadgeAction text={text} />;
  }
  return <GrayBadgeAction text={text} />;
};

const BadgeActionGrayForWhiteBg = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
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
  const [isOpenAnalyzeDialogOpen, setIsOpenAnalyzeDialogOpen] = useState(false);
  const localTime = new Date(message.createdAt).toLocaleString();
  const actionDataSwap = message.content.action_data as SWAP_MESSAGE;
  const actionDataPortfolioAnalysis = message.content.action_data as ANALYZE_MESSAGE;
  const isAnalyze = message.content.action === PortfolioAnalysis || message.content.action === TrendingTokens;

  return (
    <div
      className={cn(
        "w-full my-4 first:mt-0",
        isAnalyze && "cursor-pointer",
        isAnalyze && "border-2 border-inherit rounded-[14px]",
        isAnalyze && "hover:border-purple-400",
      )}
      onClick={() => {
        if (isAnalyze) {
          setIsOpenAnalyzeDialogOpen(true);
        }
      }}
      key={message.createdAt}
    >
      <div className="flex z-10 items-start gap-2">
        <div className="rounded-xl border-[0.5px] border-gray-700 w-full text-gray-200 px-5 py-3 max-w-full bg-gray-950">
          <p className="font-medium line-clamp-4">{message.content.text}</p>
          <div className="w-full flex justify-between items-end mt-2">
            <div className="flex gap-1">
              {message.content.action && <BadgeAction text={message.content.action} />}
              {message.content.blobId && <BlueWalrusBadgeAction text={message.content.blobId} />}
            </div>
            <p className="text-xs text-gray-500 items-center">{localTime}</p>
          </div>
        </div>
      </div>

      {/*{message.content.action === MessageActionType.SWAP_TOKEN && (*/}
      {/*  <div className="w-full flex items-end -mt-3 pt-5 gap-2 rounded-b-xl px-5 pb-3 bg-gray-300">*/}
      {/*    <div className="flex rounded-2xl items-center gap-2 font-medium text-md text-black w-full max-w-full">*/}
      {/*      <div className="flex gap-1 items-center">*/}
      {/*        <span>{actionDataSwap.amount}</span>*/}
      {/*        <span>{actionDataSwap.from_coin_type.split("::").pop()}</span>*/}
      {/*      </div>*/}
      {/*      <SwapIcon className="w-5 h-5" />*/}
      {/*      <div className="flex gap-2 items-center">*/}
      {/*        <span>{actionDataSwap.destination_coin_type.split("::").pop()}</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {(message.content.action === PortfolioAnalysis || message.content.action === TrendingTokens) && (
        <div className="w-full flex items-end -mt-3 pt-5 gap-2 rounded-b-xl px-5 pb-3 bg-gray-300">
          <div className="flex rounded-2xl items-center gap-2 font-medium text-md text-black w-full max-w-full">
            {actionDataPortfolioAnalysis?.recommendation === "HOLD" ? (
              <BadgeActionGrayForWhiteBg
                text={
                  "Recommended: " +
                  actionDataPortfolioAnalysis?.recommendation.toLocaleLowerCase() +
                  " " +
                  actionDataPortfolioAnalysis?.coinType.split("::").pop()
                }
              />
            ) : (
              <BadgeActionGrayForWhiteBg
                text={
                  "Recommended: " +
                  actionDataPortfolioAnalysis?.recommendation.toLocaleLowerCase() +
                  " " +
                  actionDataPortfolioAnalysis?.amount +
                  " " +
                  actionDataPortfolioAnalysis?.coinType.split("::").pop() +
                  " for " +
                  actionDataPortfolioAnalysis?.nextAction.toCoinType?.split("::").pop()
                }
              />
            )}
          </div>
        </div>
      )}
      {isAnalyze && (
        <AnalyzeDialog
          open={isOpenAnalyzeDialogOpen}
          onClose={() => setIsOpenAnalyzeDialogOpen(false)}
          analyzeData={actionDataPortfolioAnalysis}
        />
      )}
    </div>
  );
};
