import Image from "next/image";
import { MessageProps } from "@/components/Message";
import { MessageFeed } from "@/components/MessageFeed";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

const mockMessages: MessageProps[] = [
  {
    text: "Hello! How are you?",
    time: "12:00",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "Everything is great, thank you! onerifoneoi rejf ern ern ijern ierfnie nief neif iern fijernf ijernf ijern fiejn iejrn fijern fijern iejrfn eijr neirf ejrifn eijrfn ijer njre neri fenrifjenrfo neor fneo noren ien oernf oern oeifn eoin feoifn oiernf eorifn eoirfn eoif neorf neor no",
    time: "12:01",
  },
  {
    text: "I made a token swap ",
    time: "12:05",
    swapData: {
      fromSwap: "ETH",
      toSwap: "SUI",
      amountFrom: "0.5",
      amountTo: "1500",
      usdAmount: "300",
    },
  },
  {
    text: "What are your plans for today?",
    time: "12:07",
  },
  {
    text: "I'm thinking of going to the park",
    time: "12:08",
  },
  {
    text: "That sounds like a great idea!",
    time: "12:09",
  },
  {
    text: "Another swap completed",
    time: "12:10",
    swapData: {
      fromSwap: "BTC",
      toSwap: "ETH",
      amountFrom: "0.1",
      amountTo: "3.2",
      usdAmount: "300",
    },
  },
  {
    text: "Let's meet at 3 PM?",
    time: "12:15",
  },
  {
    text: "Sure, see you then!",
    time: "12:16",
  },
  {
    text: "I just swapped some more tokens",
    time: "12:20",
    swapData: {
      fromSwap: "USDT",
      toSwap: "BTC",
      amountFrom: "500",
      amountTo: "0.015",
      usdAmount: "300",
    },
  },
  {
    text: "The weather is beautiful today",
    time: "12:25",
  },
  {
    text: "Yes, perfect for a walk",
    time: "12:26",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-screen relative max-h-screen bg-gray-200 font-[family-name:var(--font-geist-sans)] px-10 py-10 flex">
      <Header />
      <MessageFeed messages={mockMessages} />
      <Dashboard />
    </div>
  );
}
