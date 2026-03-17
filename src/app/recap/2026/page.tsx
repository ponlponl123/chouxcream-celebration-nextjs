"use client";
import React, { useRef } from "react";
import { TConductorInstance } from "react-canvas-confetti/dist/types/index";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { GitMergeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "@heroui/button";

import "@/styles/recap-2026.css";
import Mail from "./components/mail";
import HeroLanding from "./components/hero-landing";

function Page() {
  const controller = useRef<TConductorInstance | null>(null);
  const [isContentReady, setIsContentReady] = React.useState(false);
  const [isMailHovered, setIsMailHovered] = React.useState(false);
  const [hearts, setHearts] = React.useState<
    { id: number; x: number; color: string }[]
  >([]);
  const [selectedMemory, setSelectedMemory] = React.useState<{
    name: string;
    img: string;
  } | null>(null);

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

  return (
    <div className={twMerge("contents", isMailHovered && "mailcard-hovered")}>
      <AnimatePresence key="recap-2026" mode="wait">
        <HeroLanding
          key="hero-intro"
          onContentReady={() => setIsContentReady(true)}
        />
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
          <div key="content">
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
              <Mail onMailHovered={(v) => setIsMailHovered(v)} />
              <Button
                size="sm"
                color="warning"
                className="mt-4"
                radius="full"
                variant="flat"
                isIconOnly
                onPress={handleSendLove}
              >
                💛
              </Button>
            </section>
            <section
              key="section-forcontributions"
              className="h-max flex flex-col items-center w-full z-10 py-12 mt-56 mb-16 apply-default-transition"
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
          </div>
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
