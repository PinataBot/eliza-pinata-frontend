"use client";
import { Message } from "@/components/Message";
import { REFETCH_MESSAGES_INTERVAL, useQueryMessages } from "@/hooks/query/useQueryMessages";
import { useEffect, useState, useMemo } from "react";

export const MessageFeed = () => {
  const { data: messages, isLoading, isFetching, dataUpdatedAt } = useQueryMessages();
  const [timeLeft, setTimeLeft] = useState(REFETCH_MESSAGES_INTERVAL / 1000);
  // Calculate time since last update
  useEffect(() => {
    const timeSinceLastUpdate = Date.now() - dataUpdatedAt;
    const remainingTime = Math.max(0, (REFETCH_MESSAGES_INTERVAL - timeSinceLastUpdate) / 1000);
    setTimeLeft(Math.round(remainingTime));
  }, [dataUpdatedAt]);

  // Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Memoize the status display to prevent unnecessary re-renders
  const statusDisplay = useMemo(() => {
    return (
      <div className="w-full flex justify-center">
        {isLoading || isFetching ? (
          <>
            <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24" aria-label="Loading indicator">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Updating data...</span>
          </>
        ) : (
          <div className="flex items-center gap-1 font-medium">
            <span>Next update</span>
            <span>{timeLeft} sec</span>
          </div>
        )}
      </div>
    );
  }, [isLoading, isFetching, timeLeft]);

  return (
    <div className="w-full md:px-20 max-h-full auto overflow-scroll">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">{statusDisplay}</div>
      {messages?.map((message) => <Message key={message.createdAt} message={message} />)}
    </div>
  );
};
