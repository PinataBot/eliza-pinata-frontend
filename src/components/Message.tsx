"use client";
import { SwapIcon } from "@/components/icons";
import Link from "next/link";
import { MergedMessage } from "@/hooks/query/useQueryMessages";

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
  console.log(message.content?.action_data);
  return (
    <div className="w-full my-4 first:mt-0">
      {message.content.action === "SWAP_TOKEN" && (
        <div className="w-full -mb-3 pb-5 gap-2 rounded-t-xl px-5 pt-3 bg-gray-200 items-center">
          <h3 className="font-bold text-3xl">Swap:</h3>
          <div className="flex rounded-2xl justify-between gap-10 font-bold text-sms text-gray-700 w-full max-w-full">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>
                {message.content.action_data?.amount as string} {message.content.action_data!.amount.toFixed(2)}
              </span>
            </div>
            <SwapIcon />
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>
                {/*{message.content.action_data.nextAction.fromCoinType &&*/}
                {/*  message.content.action_data.nextAction.fromCoinType.split("::")[0]}*/}
              </span>
            </div>
          </div>
        </div>
      )}
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
    </div>
  );
};
