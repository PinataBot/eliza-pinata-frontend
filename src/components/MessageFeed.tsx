import { Message, MessageProps } from "@/components/Message";

export const MessageFeed = ({ messages }: { messages: MessageProps[] }) => {
  return (
    <div className="w-full px-20 max-h-full auto overflow-scroll">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} time={message.time} swapData={message.swapData} />
      ))}
    </div>
  );
};
