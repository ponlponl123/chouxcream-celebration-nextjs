"use client";
import React from "react";
import Countdown from "react-countdown";
import CountdownRenderer from "@/app/countdown";
import { AnimatePresence, motion } from "framer-motion";
import { DiscordLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";

import RecapPage from "./recap/2026/page";
import { dateBuilder } from "@/lib/utils";
import { celebrationDate, debugDate } from "@/config/date";

function Page() {
  const bkkDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const date = process.env.NEXT_PUBLIC_COUNTDOWN_TIME
    ? new Date(process.env.NEXT_PUBLIC_COUNTDOWN_TIME)
    : process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_DEBUG_DATE === "true"
      ? dateBuilder(new Date(bkkDate).getFullYear(), debugDate)
      : dateBuilder(new Date(bkkDate).getFullYear(), celebrationDate);

  const [timeleft, setTimeleft] = React.useState<number>(
    date.getTime() - new Date(bkkDate).getTime(),
  );
  const [isCompleted, setIsCompleted] = React.useState<boolean>(timeleft <= 0);
  const [showRecap, setShowRecap] = React.useState<boolean>(timeleft <= 0);

  const onCountdownComplete = () => {
    setTimeout(() => {
      setIsCompleted(true);
      setTimeleft(0);
      let tl = gsap.timeline();
      tl.to(".countdown-text:not(.countdown-by)", {
        opacity: 0,
        delay: 2,
      })
        .to(".countdown-by", {
          opacity: 1,
          delay: 0.5,
        })
        .to(".countdown-by", {
          opacity: 0,
          delay: 2,
        })
        .then(() => {
          setTimeout(() => {
            setShowRecap(true);
          }, 1000);
        });
    }, 1000);
  };

  if (!showRecap) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
          <div className="flex flex-col max-w-xl text-center items-center justify-center gap-1">
            <AnimatePresence
              key="countdown-timer-container"
              mode="popLayout"
              initial={true}
            >
              {timeleft > 60 * 1000 && (
                <motion.div
                  exit={{
                    opacity: 0,
                  }}
                  key="hero-countdown-container"
                  layoutId="hero-countdown-container"
                  className="relative flex flex-col items-center justify-center gap-6 min-h-screen"
                >
                  <div className="-mt-24" />
                  <motion.h1
                    key="countdown-title"
                    layoutId="countdown-title"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-9xl max-lg:text-8xl max-md:text-7xl max-sm:text-6xl countdown-title countdown-text bg-linear-150 from-amber-50 to-amber-500 bg-clip-text text-transparent font-bold"
                    data-apply-default-transitions="false"
                  >
                    シュークリーム
                  </motion.h1>
                  <motion.h2
                    key="countdown-description"
                    layoutId="countdown-description"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: !isCompleted ? 0.1 : 0 }}
                    className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl countdown-description countdown-text mt-20"
                    data-apply-default-transitions="false"
                  >
                    Join us on Dec 16, {new Date().getFullYear()} for a special
                    celebration!
                  </motion.h2>
                  <motion.a
                    key="countdown-link"
                    layoutId="countdown-link"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: !isCompleted ? 0.2 : 0 }}
                    className="mt-3 countdown-text"
                    data-apply-default-transitions="false"
                    href="https://www.youtube.com/@ChouxCreamii"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-3 text-xl bg-amber-400 text-white rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                      Subscribe
                    </button>
                  </motion.a>
                </motion.div>
              )}
              {!isCompleted && (
                <motion.div
                  key="completionist"
                  layoutId="countdown-completionist"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1 }}
                  data-apply-default-transitions="false"
                >
                  <Countdown
                    date={date}
                    renderer={CountdownRenderer}
                    onTick={(d) => {
                      setTimeleft(d.total);
                      if (d.total === 60 * 1000) {
                        document.body.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                          inline: "nearest",
                        });
                      }
                    }}
                    onComplete={onCountdownComplete}
                  />
                  <h3 className="mt-6">
                    {timeleft < 60 * 1000 ? "ไกล้จะถึงเวลาแล้ว!" : ""}
                  </h3>
                </motion.div>
              )}
              {timeleft > 60 * 1000 && (
                <motion.div
                  exit={{
                    opacity: 0,
                  }}
                  key="group-countdown"
                  layoutId="group-countdown"
                  className="relative flex flex-col items-center justify-center gap-6 min-h-screen"
                >
                  <DiscordLogoIcon weight="fill" size={100} />
                  <motion.h1
                    key="countdown-group-title"
                    layoutId="countdown-group-title"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl countdown-title countdown-text bg-linear-150 from-amber-50 to-amber-500 bg-clip-text text-transparent font-bold"
                    data-apply-default-transitions="false"
                  >
                    Join a community group
                  </motion.h1>
                  <motion.h2
                    key="countdown-group-description"
                    layoutId="countdown-group-description"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: !isCompleted ? 0.1 : 0 }}
                    className="text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg countdown-description countdown-text mt-8"
                    data-apply-default-transitions="false"
                  >
                    Connect with other fans and get the latest updates on our
                    Discord server!
                  </motion.h2>
                  <motion.a
                    key="countdown-group-link"
                    layoutId="countdown-group-link"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: !isCompleted ? 0.2 : 0 }}
                    className="mt-3"
                    data-apply-default-transitions="false"
                    href="https://discord.gg/W4WwqRXSVN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-3 text-xl bg-amber-400 text-white rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                      Browse the Discord Server
                    </button>
                  </motion.a>
                </motion.div>
              )}
              <motion.h3
                key="countdown-by"
                layoutId="countdown-by"
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl text-center countdown-by countdown-text opacity-0 absolute"
                data-apply-default-transitions="false"
              >
                Ponlponl123 Presents
              </motion.h3>
            </AnimatePresence>
          </div>
        </section>
      </main>
    );
  }

  return <RecapPage />;
}

export default Page;
