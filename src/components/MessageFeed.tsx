"use client";
import { Message, MessageProps } from "@/components/Message";
import { useEffect, useRef } from "react";

export const MessageFeed = ({ messages }: { messages: MessageProps[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full px-20 max-h-full auto overflow-scroll">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} time={message.time} swapData={message.swapData} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
