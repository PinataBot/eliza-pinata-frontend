"use client";
import { SwapIcon } from "@/components/icons";

export interface MessageProps {
  text: string;
  time: string;
  swapData?: {
    fromSwap: string;
    toSwap: string;
    amountFrom: string;
    amountTo: string;
    usdAmount: string;
  };
}

// TODO: maybe add tx link to scanner
export const Message = ({ text, time, swapData }: MessageProps) => {
  return (
    <div className="w-full my-4">
      {swapData && (
        <div className="w-full -mb-3 pb-5 gap-2 rounded-t-xl px-5 pt-3 bg-gray-200 items-center">
          <h3 className="font-bold text-3xl">Swap:</h3>
          <div className="flex rounded-2xl justify-between gap-10 font-bold text-sms text-gray-700 w-full max-w-full">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>
                {swapData.fromSwap} {swapData.amountFrom}
              </span>
            </div>
            <SwapIcon />
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-4 h-4 bg-red-300" />
              <span>
                {swapData.toSwap} {swapData.amountTo}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex z-10 items-start gap-2">
        <div className="rounded-xl border-[0.5px] border-gray-700 w-full text-gray-200 px-5 py-3 max-w-full bg-gray-950">
          <h3 className="font-bold text-xl">Some heading maybe</h3>
          <p className="font-medium line-clamp-4">{text}</p>
          <p className="text-xs mt-2 text-gray-600">{time}</p>
        </div>
      </div>
    </div>
  );
};
