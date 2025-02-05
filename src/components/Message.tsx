import cn from "classnames";
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

export const Message = ({ text, time, swapData }: MessageProps) => {
  return (
    <div className="w-full my-2">
      {swapData && (
        <div className="flex justify-between gap-10 text-sm mb-1 px-4 text-gray-400 w-fit max-w-full">
          <span>
            {swapData.fromSwap} → {swapData.toSwap}
          </span>
          <span>
            {swapData.amountFrom} → {swapData.amountTo}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://t4.ftcdn.net/jpg/02/66/31/75/360_F_266317554_kr7DPOoM5Uty0YCeFU9nDZTt4a2LeMJF.jpg" />
          <AvatarFallback>
            <Skeleton className="h-12 w-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="rounded-lg text-white px-4 py-2 w-fit max-w-full bg-gray-950 flex items-center gap-2">
          <span>{text}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
};
