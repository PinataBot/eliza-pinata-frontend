"use client";
import { Message } from "@/components/Message";
import { useQueryMessages } from "@/hooks/query/useQueryMessages";

export const MessageFeed = () => {
  const { data: messages } = useQueryMessages();
  console.log(messages);
  return (
    <div className="w-full md:px-20 max-h-full auto overflow-scroll">
      {messages?.map((message) => <Message key={message.createdAt} message={message} />)}
    </div>
  );
};
