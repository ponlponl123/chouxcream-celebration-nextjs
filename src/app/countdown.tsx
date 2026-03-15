"use client";

import { gsap } from "gsap";
import { useState, useRef } from "react";
import Countdown from "react-countdown";
import { AnimatePresence, motion } from "framer-motion";
import { DiscordLogoIcon } from "@phosphor-icons/react/dist/ssr";

export default function Home({
  title,
  date,
}: {
  title?: string;
  date?: string | number | Date;
}) {
  const [isCompleted, setIsCompleted] = useState(false);

  const counter =
    "Countdown timer showing days, hours, minutes and seconds remaining";

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    // if (completed) {
    //   return <Completionist />;
    // } else {

    return (
      <motion.div
        key="countdown-timer"
        layoutId="countdown-timer"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.64, delay: 0.2 }}
        className="flex flex-col items-center justify-center pb-[32vh]"
        data-apply-default-transitions="false"
      >
        <span className="text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl mb-12">
          🥯
        </span>
        <span className="my-6 text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
          Starting in
        </span>
        <div className="flex items-center justify-center">
          <div className="grid grid-flow-col gap-12 text-center auto-cols-max">
            <AnimatePresence mode="popLayout">
              {days > 0 && (
                <motion.div
                  key="countdown-days"
                  layoutId="countdown-days"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32 }}
                  className="flex flex-col"
                  data-apply-default-transitions="false"
                >
                  <span className="countdown font-mono text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": days } as React.CSSProperties}
                    >
                      {days}
                    </span>
                  </span>
                  Days
                </motion.div>
              )}
              {hours > 0 && (
                <motion.div
                  key="countdown-hours"
                  layoutId="countdown-hours"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32 }}
                  className="flex flex-col"
                  data-apply-default-transitions="false"
                >
                  <span className="countdown font-mono text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": hours } as React.CSSProperties}
                    >
                      {hours}
                    </span>
                  </span>
                  Hours
                </motion.div>
              )}
              {minutes > 0 && (
                <motion.div
                  key="countdown-minutes"
                  layoutId="countdown-minutes"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32 }}
                  className="flex flex-col"
                  data-apply-default-transitions="false"
                >
                  <span className="countdown font-mono text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": minutes } as React.CSSProperties}
                    >
                      {minutes}
                    </span>
                  </span>
                  Min.
                </motion.div>
              )}
              <div className="flex flex-col">
                <span className="countdown font-mono text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl">
                  <span
                    data-apply-default-fonts="false"
                    aria-label={counter}
                    aria-live="polite"
                    style={{ "--value": seconds } as React.CSSProperties}
                  >
                    {seconds}
                  </span>
                </span>
                Sec.
              </div>
            </AnimatePresence>
          </div>
        </div>
        <br />
        <h3 className="mt-6">
          {date && new Date(date).getTime() - new Date().getTime() < 30000
            ? "ไกล้จะถึงเวลาแล้ว!"
            : ""}
        </h3>
      </motion.div>
    );
    // }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
        <div className="flex flex-col max-w-xl text-center items-center justify-center gap-1">
          <AnimatePresence mode="popLayout" initial={true}>
            <div className="relative flex flex-col items-center justify-center gap-6 min-h-screen">
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
                {title}
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
                Join us on Dec 16, {new Date(date!).getFullYear()} for a special
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
            </div>
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
                  date={date!}
                  renderer={renderer}
                  onComplete={() => {
                    setTimeout(() => {
                      setIsCompleted(true);
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
                            window.location.reload();
                          }, 1000);
                        });
                    }, 1000);
                  }}
                />
                <div className="relative flex flex-col items-center justify-center gap-6 min-h-screen">
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
                    href="https://www.youtube.com/@ChouxCreamii"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-3 text-xl bg-amber-400 text-white rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                      Browse the Discord Server
                    </button>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
