"use client";
import { SwapIcon } from "@/components/icons";
import Link from "next/link";

export interface MessageProps {
  text: string;
  time: string;
  action: string;
  actionData?: {
    tokenName: string;
    coinType: string;
    recommendation: string;
    amount: number;
    confidence: number;
    reasoning: string;
    risks: string[];
    opportunities: string[];
    nextAction: {
      fromCoinType: string;
      toCoinType: string;
    };
  };
  blobId?: string;
}

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
export const Message = ({ text, time, action, actionData, blobId }: MessageProps) => {
  const localTime = new Date(time).toLocaleString();

  return (
    <div className="w-full my-4 first:mt-0">
      {actionData && (
        <div className="w-full -mb-3 pb-5 gap-2 rounded-t-xl px-5 pt-3 bg-gray-200 items-center">
          <h3 className="font-bold text-3xl">Swap:</h3>
          <div className="flex rounded-2xl justify-between gap-10 font-bold text-sms text-gray-700 w-full max-w-full">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>
                {actionData.tokenName} {actionData.amount}
              </span>
            </div>
            <SwapIcon />
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>{actionData.nextAction.toCoinType.split(":")[-1]}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex z-10 items-start gap-2">
        <div className="rounded-xl border-[0.5px] border-gray-700 w-full text-gray-200 px-5 py-3 max-w-full bg-gray-950">
          <p className="font-medium line-clamp-4">{text}</p>
          <div className="w-full flex justify-between items-end mt-2">
            <p className="text-xs text-gray-600 items-center">{localTime}</p>
            {blobId && <BlueWalrusBadgeAction text={blobId} />}
            {action && <PurpleBadgeAction text={action} />}
          </div>
        </div>
      </div>
    </div>
  );
};
