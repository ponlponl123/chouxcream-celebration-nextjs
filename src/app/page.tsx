import React from "react";
import Countdown from "@/app/countdown";
import { siteConfig } from "@/config/site";

import RecapPage from "./recap-2026/_page";

const getBKKDate = () => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
};

const getCountdownDate = () => {
  const envTime = process.env.NEXT_PUBLIC_COUNTDOWN_TIME;
  if (envTime) {
    const date = new Date(envTime);
    if (!isNaN(date.getTime())) return date;
  }
  const bkkNow = getBKKDate();
  const year = bkkNow.getFullYear();
  return new Date(`${year}-12-16T22:50:00+07:00`);
};

const countdown = getCountdownDate();

function Page() {
  const now = new Date();

  if (
    !(process.env.NODE_ENV === "development" && siteConfig.debug) &&
    now < countdown
  ) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <Countdown title="シュークリーム" date={countdown} />
      </main>
    );
  }

  return <RecapPage />;
}

export default Page;
