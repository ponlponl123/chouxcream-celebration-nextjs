"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function CountdownTimer({ days, hours, minutes, seconds }: any) {
  const counter =
    "Countdown timer showing days, hours, minutes and seconds remaining";

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
                    suppressHydrationWarning
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
                    suppressHydrationWarning
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
                    suppressHydrationWarning
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
                  suppressHydrationWarning
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
    </motion.div>
  );
}
