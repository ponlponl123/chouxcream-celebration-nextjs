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
  const btn = useRef<HTMLButtonElement>(null);
  const controller = useRef<TConductorInstance | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const getBoundingClientRect = () => {
    console.log("btn.current", btn.current);
    return (
      btn.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }
    );
  };

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor;
  };
  const counter =
    "Countdown timer showing days, hours, minutes and seconds remaining";

  const Completionist = () => {
    return <></>;
    return (
      <motion.div
        key="completionist"
        layoutId="countdown-completionist"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.32 }}
        className="flex flex-col items-center justify-center gap-4 mt-6"
      >
        <h1>ปาร์ตี้พร้อมแล้ว！</h1>
        <div className="relative">
          <Realistic
            decorateOptions={() => {
              const rect = getBoundingClientRect();
              return {
                origin: {
                  x: (rect.left + 0.5 * rect.width) / window.innerWidth,
                  y: (rect.top + 0.5 * rect.height) / window.innerHeight,
                },
                spread: 90,
                startVelocity: 32,
                elementCount: 64,
                gravity: 0.5,
                scalar: 0.48,
                decay: 0.9,
              };
            }}
            onInit={onInitHandler}
          />
          <Button
            ref={btn}
            className="font-semibold text-sm bg-amber-100 text-gray-900"
            size="lg"
            variant="shadow"
            onPress={() => {
              if (!controller.current) return;
              controller.current.shoot();
            }}
          >
            <CakeIcon size={20} weight="bold" />
            ไปกันเลย!
          </Button>
        </div>
      </motion.div>
    );
  };

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
          {days + hours + minutes + seconds < 30
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
        <div className="flex flex-col max-w-xl text-center justify-center gap-1">
          <AnimatePresence mode="popLayout" initial={true}>
            <motion.h1
              key="countdown-title"
              layoutId="countdown-title"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl countdown-title countdown-text"
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
            >
              {description}
            </motion.h2>
            <motion.h3
              key="countdown-by"
              layoutId="countdown-by"
              initial={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-2xl text-center countdown-by countdown-text opacity-0 absolute"
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
