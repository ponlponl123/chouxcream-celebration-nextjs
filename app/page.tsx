import React from "react";
import Countdown from "@/app/countdown";
import { siteConfig } from "@/config/site";

import Page2025 from "./recap-2025/_page";

const now = new Date();
// const countdown = new Date(`${now.getFullYear()}-12-16T20:30:00`);
const countdown = new Date("2025-12-11T23:04:00");

function Page() {
  const now = new Date();

  if (
    !(process.env.NODE_ENV === "development" && siteConfig.debug) &&
    now < countdown
  ) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <Countdown
          title="シュークリーム"
          description="2 Year's Anniversary Celebration 🎉"
          date={countdown}
        />
      </main>
    );
  }

  return <Page2025 />;
}

export default Page;
