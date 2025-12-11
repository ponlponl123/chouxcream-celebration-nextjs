import React from "react";
import Countdown from "@/app/countdown";
import { siteConfig } from "@/config/site";

import Page2025 from "./recap-2025/_page";

const countdown = new Date("2025-12-16T19:30:00");

function Page() {
  const now = new Date();

  if (
    !(process.env.NODE_ENV === "development" && siteConfig.debug) &&
    now < countdown
  ) {
    return (
      <Countdown
        title="シュークリーム"
        description="2 Year's Anniversary Celebration 🎉"
        date={new Date("2025-12-16T19:30:00")}
      />
    );
  }

  return <Page2025 />;
}

export default Page;
