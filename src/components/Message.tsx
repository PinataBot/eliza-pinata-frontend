import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="w-full flex gap-2 mb-1 items-center">
          <h3 className="font-bold">SWAP:</h3>
          <div className="flex rounded-2xl bg-green-300 justify-between gap-10 font-bold text-sm px-4 text-gray-700 w-full max-w-full">
            <span>
              {swapData.fromSwap} → {swapData.toSwap}
            </span>
            <span>
              {swapData.amountFrom} → {swapData.amountTo}(<span>${swapData.usdAmount}</span>)
            </span>
          </div>
        </div>
      )}
      <div className="flex items-start gap-2">
        <Avatar>
          <AvatarImage src="https://t4.ftcdn.net/jpg/02/66/31/75/360_F_266317554_kr7DPOoM5Uty0YCeFU9nDZTt4a2LeMJF.jpg" />
          <AvatarFallback>
            <Skeleton className="h-12 w-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="rounded-lg w-full text-white px-4 py-2 max-w-full justify-between bg-gray-950 flex items-center gap-2">
          <span>{text}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
};
