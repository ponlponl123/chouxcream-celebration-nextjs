"use client";
import React, { useEffect, useMemo, useRef } from "react";
import {
  TConductorInstance,
  TDecorateOptionsFn,
} from "react-canvas-confetti/dist/types/index";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { GitMergeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useCustomCursor } from "@/context/customCursor";
import { AnimatePresence, motion } from "framer-motion";
import { SplitText } from "gsap/SplitText";
import { twMerge } from "tailwind-merge";
import { Button } from "@heroui/button";
import confetti from "canvas-confetti";
import gsap from "gsap";

import "@/styles/recap-2026.css";

gsap.registerPlugin(SplitText);

function Page() {
  const { setCustomCursor, setForceRotation } = useCustomCursor();
  const introTlRef = useRef<any>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const controller = useRef<TConductorInstance | null>(null);
  const sendHeartButtonRef = useRef<HTMLButtonElement>(null);
  const [isIntroPlayed, setIsIntroPlayed] = React.useState(false);
  const [isContentReady, setIsContentReady] = React.useState(false);
  const [isMailDearWritten, setIsMailDearWritten] = React.useState(false);
  const [isMailContentWritten, setIsMailContentWritten] = React.useState(false);
  const [isMailClosingWritten, setIsMailClosingWritten] = React.useState(false);
  const [isMailHovered, setIsMailHovered] = React.useState(false);
  const [isMailOpened, setIsMailOpened] = React.useState(false);
  const [hearts, setHearts] = React.useState<
    { id: number; x: number; color: string }[]
  >([]);
  const [selectedMemory, setSelectedMemory] = React.useState<{
    name: string;
    img: string;
  } | null>(null);
  const sendHeartButtonRect = useMemo(() => {
    return sendHeartButtonRef.current?.getBoundingClientRect();
  }, [sendHeartButtonRef]);
  const hasTransitionedRef = useRef(false);

  const colors = React.useMemo(
    () => [
      "text-red-500",
      "text-pink-500",
      "text-purple-500",
      "text-yellow-500",
    ],
    [],
  );

  const handleSendLove = React.useCallback(() => {
    const id = Date.now();
    const x = Math.random() * 100 - 50;
    const color = colors[Math.floor(Math.random() * colors.length)];

    setHearts((prev) => [...prev, { id, x, color }]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  }, [colors]);

  const onInitHandler = React.useCallback(
    ({ conductor }: { conductor: TConductorInstance }) => {
      controller.current = conductor;
      if (!controller.current) return;

      controller.current.run({ speed: 3, duration: 3000, delay: 2600 });
    },
    [],
  );

  useEffect(() => {
    if (isMailClosingWritten) {
      let intervalId: number | null = null;
      const timeoutId = window.setTimeout(() => {
        const end = Date.now() + 3 * 1000;
        const colors = [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ];
        const particleCount = 24; // fire fewer particles for a lighter rainbow
        const intervalMs = 140; // fire less often than a frame to reduce overall intensity
        const originY = 0.56;

        intervalId = window.setInterval(() => {
          if (Date.now() > end) {
            if (intervalId) window.clearInterval(intervalId);
            return;
          }

          confetti({
            particleCount,
            angle: 60,
            spread: 96,
            startVelocity: 60,
            origin: { x: 0, y: originY },
            colors,
          });
          confetti({
            particleCount,
            angle: 120,
            spread: 96,
            startVelocity: 60,
            origin: { x: 1, y: originY },
            colors,
          });
        }, intervalMs);
      }, 3600);

      return () => {
        window.clearTimeout(timeoutId);
        if (intervalId) window.clearInterval(intervalId);
      };
    }
  }, [isMailClosingWritten]);

  useEffect(() => {
    const introVideo = introVideoRef.current;
    if (!introVideo) return;

    introTlRef.current = gsap.timeline();
    introTlRef.current.to("body", { overflow: "hidden", duration: 0 });

    introVideo.play().catch((error) => {
      console.error("Error playing intro video:", error);
    });

    const handleIntroEnded = () => {
      if (hasTransitionedRef.current) return;
      hasTransitionedRef.current = true;
      setIsIntroPlayed(true);

      introVideo.classList.add("hidden");
      setTimeout(() => {
        introTlRef.current?.to("body", { overflow: "auto", duration: 0 });
        setIsContentReady(true);
      }, 3000);
    };

    introVideo.addEventListener("ended", handleIntroEnded);

    return () => {
      introVideo.removeEventListener("ended", handleIntroEnded);
      introTlRef.current?.kill?.();
      introTlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isContentReady) {
      const hbd_text = SplitText.create(".text-hbd-title", {
        type: "chars",
      });
      const choux_text = SplitText.create(".text-chouxcream-title", {
        type: "chars",
      });
      const anniversary_text = SplitText.create(".text-chouxcream-aniversary", {
        type: "chars",
      });
      gsap
        .timeline()
        .from(hbd_text.chars, {
          duration: 1,
          y: 6,
          filter: "blur(4px)",
          autoAlpha: 0,
          stagger: 0.06,
        })
        .from(choux_text.chars, {
          duration: 0.8,
          filter: "blur(4px)",
          x: 12,
          autoAlpha: 0,
          stagger: 0.12,
        })
        .from(anniversary_text.chars, {
          duration: 0.8,
          filter: "blur(4px)",
          y: 6,
          autoAlpha: 0,
          stagger: 0.06,
        });
      return () => {
        hbd_text.revert();
        choux_text.revert();
        anniversary_text.revert();
      };
    }
  }, [isContentReady]);

  useEffect(() => {
    if (!isMailOpened) return;

    let isActive = true;
    let dearSplit: any = null;
    let thankSplit: any = null;
    let closingSplit: any = null;

    const runSequence = async () => {
      const runAnim = (target: any, vars: any) =>
        new Promise<void>((resolve) => {
          gsap.from(target, { ...vars, onComplete: () => resolve() });
        });

      try {
        dearSplit = SplitText.create(".dear-thank-you-message", {
          type: "chars",
        });
        thankSplit = SplitText.create(".thank-you-message", { type: "chars" });
        closingSplit = SplitText.create(".closing-thank-you-message", {
          type: "chars",
        });
        await runAnim(dearSplit.chars, {
          duration: 1,
          y: 6,
          filter: "blur(4px)",
          autoAlpha: 0,
          stagger: 0.12,
          delay: 0.64,
        });
        if (!isActive) return;
        setIsMailDearWritten(true);
        await runAnim(thankSplit.chars, {
          duration: 1,
          y: 3,
          filter: "blur(4px)",
          autoAlpha: 0,
          stagger: 0.06,
          delay: 1.64,
        });
        if (!isActive) return;
        setIsMailContentWritten(true);
        await runAnim(closingSplit.chars, {
          duration: 1,
          x: 3,
          filter: "blur(4px)",
          autoAlpha: 0,
          stagger: 0.06,
          delay: 1.48,
        });
        if (!isActive) return;
        setIsMailClosingWritten(true);
      } catch (e) {
        // swallow animation errors when component unmounts
      }
    };

    runSequence();

    return () => {
      isActive = false;
      try {
        dearSplit?.revert();
        thankSplit?.revert();
        closingSplit?.revert();
      } catch (e) {
        // noop
      }
    };
  }, [isMailOpened]);

  return (
    <div className={twMerge("contents", isMailHovered && "mailcard-hovered")}>
      <AnimatePresence mode="wait">
        <div
          key="video-container"
          className="absolute w-full h-screen pointer-events-none z-50"
        >
          <video
            ref={introVideoRef}
            key="background-video-intro"
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-50"
          >
            <source
              src="https://static.ponlponl123.com/h.264/chouxproject/Comp%203.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div
            className={twMerge(
              "absolute top-0 left-0 w-full h-full z-40 bg-white transition-opacity duration-[3s]",
              isIntroPlayed && "opacity-0 pointer-events-none",
            )}
          />
          <div
            className={twMerge(
              "absolute top-0 left-0 w-full h-full z-30 transition-opacity duration-[3s] overflow-hidden mask-gradient blur-[2px] saturate-150 brightness-50",
              !isIntroPlayed && "opacity-0 pointer-events-none",
            )}
          >
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none saturate-75 brightness-50"
              style={{
                background:
                  "url('/2026/pattern-3371709_1280.jpg') center/cover no-repeat",
              }}
            />
            {[
              {
                from: {
                  x: 6,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 9,
                  y: 18,
                  rotateZ: -12,
                },
                image: undefined,
                aspect: "square",
              },
              {
                from: {
                  x: 6,
                  y: 140,
                  rotateZ: -32,
                },
                to: {
                  x: 6,
                  y: 64,
                  rotateZ: 12,
                },
                image: undefined,
                aspect: "square",
                scale: 1.04,
              },
              {
                from: {
                  x: 57,
                  y: 140,
                  rotateZ: -32,
                },
                to: {
                  x: 81,
                  y: 14,
                  rotateZ: 28,
                },
                image: undefined,
                aspect: "square",
                scale: 0.94,
              },
              {
                from: {
                  x: 54,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 43,
                  y: 13,
                  rotateZ: 4,
                },
                image: undefined,
                aspect: "video",
                scale: 0.78,
              },
              {
                from: {
                  x: 32,
                  y: 140,
                  rotateZ: -32,
                },
                to: {
                  x: 17,
                  y: 50,
                  rotateZ: -5,
                },
                image: undefined,
                aspect: "square",
                scale: 0.95,
              },
              {
                from: {
                  x: 54,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 91,
                  y: 89,
                  rotateZ: -2,
                },
                image: undefined,
                aspect: "video",
                scale: 0.9,
              },
              {
                from: {
                  x: 89,
                  y: 140,
                  rotateZ: -32,
                },
                to: {
                  x: 94,
                  y: 46,
                  rotateZ: -16,
                },
                image: undefined,
                aspect: "square",
              },
              {
                from: {
                  x: 27,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 34,
                  y: 80,
                  rotateZ: 6,
                },
                image: undefined,
                aspect: "video",
                scale: 0.91,
              },
              {
                from: {
                  x: 27,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 50,
                  y: 77,
                  rotateZ: -3,
                },
                image: undefined,
                aspect: "square",
                scale: 0.97,
              },
              {
                from: {
                  x: 89,
                  y: 140,
                  rotateZ: -32,
                },
                to: {
                  x: 73,
                  y: 70,
                  rotateZ: -8,
                },
                image: undefined,
                aspect: "square",
              },
              {
                from: {
                  x: 58,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 65,
                  y: 42,
                  rotateZ: 4,
                },
                image: undefined,
                aspect: "square",
                scale: 0.9,
              },
              {
                from: {
                  x: 50,
                  y: 140,
                  rotateZ: 32,
                },
                to: {
                  x: 43,
                  y: 49,
                  rotateZ: -1,
                },
                image: undefined,
                aspect: "video",
                scale: 1.1,
              },
            ].map((item, index) => {
              return (
                isIntroPlayed && (
                  <motion.div
                    key={"polaroid-" + index}
                    className={twMerge(
                      "absolute top-0 left-0 pointer-events-none bg-white p-3 pb-16 shadow-xl brightness-75 -translate-1/2",
                      item.aspect === "video" &&
                        "w-[26vw] min-w-lg aspect-video",
                      item.aspect === "square" && "min-w-64 w-[13vw] max-w-80",
                    )}
                    initial={{
                      opacity: 0,
                      scale: 1.1,
                      x: item.from.x + "vw",
                      y: item.from.y + "vh",
                      rotateZ: item.from.rotateZ,
                    }}
                    animate={{
                      opacity: 1,
                      scale: item?.scale || 1,
                      x: item.to.x + "vw",
                      y: item.to.y + "vh",
                      rotateZ: item.to.rotateZ,
                    }}
                    transition={{
                      duration: 1.6,
                      delay: 0.72 + index * 0.36,
                      ease: "easeInOut",
                      type: "tween",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`Polaroid #${index}`}
                      className={twMerge(
                        "w-full h-full object-cover bg-black",
                        item.aspect === "video" && "aspect-video",
                        item.aspect === "square" && "aspect-square",
                      )}
                    />
                  </motion.div>
                )
              );
            })}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-radial to-black/60 from-white/40" />
            <div className="absolute top-0 right-[27vw] translate-1/2 w-[64vw] h-[32vh] -rotate-32 pointer-events-none bg-radial to-transparent from-amber-500/60 brightness-125 bg-blend-lighten blur-[128px]" />
          </div>
        </div>
        {isContentReady && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.64 }}
            key="main"
            className="flex flex-col gap-6 items-center justify-center min-h-screen h-full w-full z-50 apply-default-transition"
          >
            <Fireworks key="fireworks" onInit={onInitHandler} />
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.64 }}
              className="text-2xl font-semibold text-hbd-title"
            >
              🎂 Happy birthday 🎉
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.64, delay: 0.16 }}
              className="text-8xl text-center text-chouxcream-title"
            >
              シュークリーム
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.64, delay: 0.32 }}
              className="text-chouxcream-aniversary"
            >
              {new Date().getFullYear() - 2023} Year's Anniversary
            </motion.span>
          </motion.main>
        )}
        {isContentReady && (
          <>
            <section
              key="section-stats"
              className="w-full py-12 z-10 apply-default-transition"
            >
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  {
                    label: "Subscribers",
                    value: {
                      before: 3.23,
                      after: 3.57,
                    },
                    unit: "k",
                  },
                  {
                    label: "Videos",
                    value: {
                      before: 551,
                      after: 564,
                    },
                    unit: "",
                  },
                  {
                    label: "Streams",
                    value: {
                      before: 608,
                      after: 672,
                    },
                    unit: "h",
                  },
                  { label: "Smiles", value: "∞" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2 relative">
                      {typeof stat.value === "string" ? (
                        stat.value
                      ) : (
                        <>
                          {stat.value.after}
                          {stat.unit}+
                          <span
                            className={twMerge(
                              "text-xs font-medium px-1 py-0.5 rounded-sm block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6",
                              (stat.value.after -
                                stat.value.before / stat.value.before) *
                                100 >=
                                5
                                ? " text-green-400 bg-green-500/20"
                                : " text-gray-400 bg-gray-500/20",
                            )}
                          >
                            {(stat.value.after -
                              stat.value.before / stat.value.before) *
                              100 >=
                            5
                              ? ` +${(
                                  (stat.value.after - stat.value.before) /
                                  stat.value.before
                                ).toFixed(2)}%`
                              : ""}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-gray-400">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </section>
            <section
              key="section-thankyou-card"
              className="h-max flex flex-col items-center w-full z-10 py-12 relative mailcard-section"
            >
              <div
                className="relative w-[calc(100%-6rem)] max-w-2xl mx-auto"
                onMouseEnter={() => {
                  setIsMailHovered(true),
                    setForceRotation(0),
                    setCustomCursor(
                      <motion.div
                        animate={{
                          scale: [0.8, 1, 0.8],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-amber-500"
                        >
                          <motion.path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="currentColor"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </svg>
                      </motion.div>,
                    );
                }}
                onMouseLeave={() => {
                  setIsMailHovered(false),
                    setForceRotation(undefined),
                    setCustomCursor(undefined);
                }}
              >
                <motion.div
                  className="mailcard absolute max-w-2xl w-full h-full group cursor-pointer apply-default-transition"
                  onClick={() => setIsMailOpened(true)}
                >
                  <div className="absolute w-full h-full overflow-hidden rounded-lg">
                    <div className="w-full group-hover:-translate-y-4 transition-transform duration-300">
                      <div
                        className="bg-white w-full h-32 rotate-180"
                        style={{
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        }}
                      />
                      <HeartIcon
                        className="text-amber-500 mx-auto -translate-y-1/2"
                        size={64}
                        weight="fill"
                      />
                    </div>
                    <span className="mx-auto block text-center text-white text-sm text-shadow-lg opacity-80 mt-4 pointer-events-none">
                      Click to open the card and see the message inside!
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className={twMerge(
                    "mailcard relative max-w-2xl p-3 sm:p-6 w-full h-max apply-default-transition",
                    !isMailOpened && "opacity-0 pointer-events-none",
                  )}
                >
                  <HeartIcon
                    className="absolute text-amber-500 -top-4 -right-4 rotate-12 sm:scale-150"
                    size={64}
                    weight="fill"
                  />
                  <div className="w-full h-full bg-white/90 text-black text-center px-4 py-6 sm:px-12 rounded-sm">
                    <motion.h3
                      className="text-2xl font-semibold mb-4"
                      initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 1 }}
                      key={"thank-you-title-" + isMailOpened}
                    >
                      Thank You!
                    </motion.h3>
                    <div className="flex items-center justify-start gap-1 mb-2">
                      <span className="text-base dear-thank-you-message">
                        ถึง
                      </span>
                      <motion.a
                        href="https://www.youtube.com/@ChouxCreamii"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-600 font-semibold hover:underline"
                        initial={{ opacity: 0 }}
                        animate={isMailDearWritten ? { opacity: 1 } : {}}
                        transition={{ duration: 0.64, delay: 0.42 }}
                        key={"dear-thank-you-link-" + isMailDearWritten}
                      >
                        ChouxCreamii
                      </motion.a>
                    </div>
                    <div
                      className={twMerge(
                        "text-base mb-2 thank-you-message",
                        !isMailDearWritten && "opacity-0",
                      )}
                      key={"thank-you-message-" + isMailContentWritten}
                    >
                      ตลอดปี 2026 ที่ผ่านมา
                      ขอบคุณสำหรับรอยยิ้มและเสียงหัวเราะที่มอบให้กันเสมอมา
                      ถึงจะไม่ได้โผล่ไปทักทายเลย
                      ดีใจที่ได้ติดตามและเป็นส่วนหนึ่งในการเดินทางครั้งนี้
                      ขอให้มีความสุขมากๆ และสร้างสรรค์ผลงานดีๆ
                      <br />
                      ให้พวกเราได้ชมกันต่อไปนะ!
                    </div>
                    <br />
                    <span
                      className={twMerge(
                        "text-base mb-2 closing-thank-you-message",
                        !isMailContentWritten && "opacity-0",
                      )}
                      key={"closing-thank-you-message-" + isMailClosingWritten}
                    >
                      คอยเป็นกำลังใจและติดตามเสมอ
                    </span>
                    <br />
                    <motion.a
                      href="https://ponlponl123.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-600 font-semibold hover:underline"
                      initial={{ opacity: 0, y: -12 }}
                      animate={isMailClosingWritten ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.64, delay: 1 }}
                      key={"closing-thank-you-link-" + isMailClosingWritten}
                    >
                      ポーン
                    </motion.a>
                  </div>
                </motion.div>
              </div>
              <motion.span
                className="mt-4"
                initial={{ opacity: 0, y: -12 }}
                animate={isMailClosingWritten ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.64, delay: 2.64 }}
                key={"after-mail-hbd-" + isMailClosingWritten}
              >
                สุขสันต์วันเกิดนะ
              </motion.span>
              <Button
                size="sm"
                color="warning"
                className="mt-4"
                radius="full"
                variant="flat"
                isIconOnly
                onPress={handleSendLove}
                ref={sendHeartButtonRef}
              >
                💛
              </Button>
            </section>
            <section
              key="section-forcontributions"
              className="h-max flex flex-col items-center w-full z-10 py-12 mt-24 mb-16 apply-default-transition"
            >
              <GitMergeIcon size={32} weight="fill" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold mb-6 mt-4"
              >
                มีส่วนร่วมในการสร้าง ChouxCream Celebration ในปีหน้า!
              </motion.h2>
              <Button
                as="a"
                href="https://github.com/ponlponl123/chouxcream-celebration-nextjs"
                size="sm"
                color="warning"
                className="-mt-2"
                radius="full"
                target="_blank"
                rel="noreferrer"
              >
                Fork now!
              </Button>
            </section>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: 40, scale: 0.5 }}
            animate={{ opacity: 1, y: -120, scale: 1 }}
            exit={{ opacity: 0, y: -160, scale: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 text-4xl ${heart.color} z-30 pointer-events-none`}
            style={{ x: heart.x }}
          >
            <HeartIcon weight="fill" />
          </motion.div>
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            key="memory-modal"
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="relative bg-black/80 border border-white/10 rounded-lg max-w-lg w-[90%] p-4"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMemory.img}
                alt={selectedMemory.name}
                className="w-full rounded-md mb-4"
              />
              <p className="text-white font-semibold mb-4 text-center">
                {selectedMemory.name}
              </p>
              <Button
                size="sm"
                color="warning"
                className="mx-auto block"
                onPress={() => setSelectedMemory(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page;
