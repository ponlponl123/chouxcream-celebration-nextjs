"use client";

import { gsap } from "gsap";
import { useState, useRef } from "react";
import Countdown from "react-countdown";
import { Button } from "@heroui/button";
import { CakeIcon } from "@phosphor-icons/react/dist/ssr";
import type { TConductorInstance } from "react-canvas-confetti/dist/types/index";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({
  title,
  description,
  date,
}: {
  title?: string;
  description?: string;
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
        className="flex flex-col items-center justify-center"
        data-apply-default-transitions="false"
      >
        <span className="mt-6 mb-3">ในอีก</span>
        <div className="flex items-center justify-center">
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
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
                  <span className="countdown font-mono text-5xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": days } as React.CSSProperties}
                    >
                      {days}
                    </span>
                  </span>
                  วัน
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
                  <span className="countdown font-mono text-5xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": hours } as React.CSSProperties}
                    >
                      {hours}
                    </span>
                  </span>
                  ชั่วโมง
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
                  <span className="countdown font-mono text-5xl">
                    <span
                      data-apply-default-fonts="false"
                      aria-label={counter}
                      aria-live="polite"
                      style={{ "--value": minutes } as React.CSSProperties}
                    >
                      {minutes}
                    </span>
                  </span>
                  นาที
                </motion.div>
              )}
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span
                    data-apply-default-fonts="false"
                    aria-label={counter}
                    aria-live="polite"
                    style={{ "--value": seconds } as React.CSSProperties}
                  >
                    {seconds}
                  </span>
                </span>
                วินาที
              </div>
            </AnimatePresence>
          </div>
        </div>
        <br />
        <h3 className="mt-6">
          {date && new Date(date).getTime() - new Date().getTime() < 30000
            ? "ไกล้จะถึงเวลาแล้ว!"
            : "เหมือนว่าปาร์ตี้จะยังไม่เริ่มนะ!"}
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
            <motion.h1
              key="countdown-title"
              layoutId="countdown-title"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl countdown-title countdown-text"
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
              className="text-2xl countdown-description countdown-text"
              data-apply-default-transitions="false"
            >
              {description}
            </motion.h2>
            <motion.h3
              key="countdown-by"
              layoutId="countdown-by"
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-2xl text-center countdown-by countdown-text opacity-0 absolute"
              data-apply-default-transitions="false"
            >
              Ponlponl123 Presents
            </motion.h3>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
