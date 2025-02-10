"use client";
import { MessageFeed } from "@/components/MessageFeed";
import { Dashboard } from "@/components/Dashboard";
import { TypeAnimation } from "react-type-animation";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export default function Home() {
  const [showGreeting, setShowGreeting] = useLocalStorage<boolean>("showGreeting", true, {
    initializeWithValue: false,
  });

  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting((prev) => !prev);
      }, 5000); // change this time to sentence length * speed in type animation + about 3 secs

      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  return (
    <div className="min-h-screen w-screen relative max-h-screen bg-gray-900 font-[family-name:var(--font-geist-sans)] px-5 py-5 md:px-10 md:py-10 flex flex-col-reverse md:flex-row">
      {showGreeting ? (
        <div className="w-full min-h-full flex items-center justify-center">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Hello I am trading sui bot bla bla bla bla",
              1000,
            ]}
            wrapper="span"
            speed={50}
            className="font-bold text-white text-xl"
            cursor={false}
          />
        </div>
      ) : (
        <>
          <MessageFeed />
          <Dashboard />
        </>
      )}
    </div>
  );
}
