"use client";
import { Message, MessageProps } from "@/components/Message";
import { useQueryMessages } from "@/hooks/query/useQueryMessages";

export const MessageFeed = () => {
  const { data: messages } = useQueryMessages();

  return (
    <div className="w-full md:px-20 max-h-full auto overflow-scroll">
      {messages?.map((message, index) => (
        <Message
          key={index}
          text={message?.content?.text as string}
          time={message.createdAt!}
          action={message?.content?.action as string}
          blobId={message?.content?.blobId as string}
        />
      ))}
    </div>
  );
};
