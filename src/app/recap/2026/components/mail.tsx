"use client";
import React, { useEffect } from "react";
import { useCustomCursor } from "@/context/customCursor";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

function Mail({
  onMailHovered,
  onMailOpened,
  onMailClosing,
}: {
  onMailHovered?: (v: boolean) => void;
  onMailOpened?: () => void;
  onMailClosing?: () => void;
}) {
  const { setCustomCursor, setForceRotation } = useCustomCursor();
  const [isMailDearWritten, setIsMailDearWritten] = React.useState(false);
  const [isMailContentWritten, setIsMailContentWritten] = React.useState(false);
  const [isMailClosingWritten, setIsMailClosingWritten] = React.useState(false);
  const [_, setIsMailHovered] = React.useState(false);
  const [isMailOpened, setIsMailOpened] = React.useState(false);

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
    if (!isMailOpened) return;

    let isActive = true;
    let dearSplit: any = null;
    let thankSplit: any = null;
    let closingSplit: any = null;

    onMailOpened && onMailOpened();

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
          stagger: 0.12,
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
        onMailClosing && onMailClosing();
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
    <>
      <div
        className="relative w-[calc(100%-6rem)] max-w-2xl mx-auto"
        onMouseEnter={() => {
          onMailHovered && onMailHovered(true),
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
          onMailHovered && onMailHovered(false),
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
              <span className="text-base dear-thank-you-message">ถึง</span>
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
    </>
  );
}

export default Mail;
