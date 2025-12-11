"use client";
import React, { useEffect, useRef } from "react";
import { TConductorInstance } from "react-canvas-confetti/dist/types/index";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { AnimatePresence, motion } from "framer-motion";

function Page() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controller = useRef<TConductorInstance | null>(null);

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor;
    if (!controller.current) return;

    controller.current.run({ speed: 3, duration: 3000, delay: 5000 });
  };

  useEffect(() => {
    const introVideo = introVideoRef.current;
    const video = videoRef.current;
    if (!introVideo || !video) return;
    introVideo.play().catch((error) => {
      console.error("Error playing intro video:", error);
    });

    const handleIntroEnded = () => {
      introVideo.classList.add("hidden");
      video.classList.remove("hidden");
      video.play().catch((error) => {
        console.error("Error playing main video:", error);
      });
    };
    introVideo.addEventListener("ended", handleIntroEnded);

    return () => {
      introVideo.removeEventListener("ended", handleIntroEnded);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="absolute w-full h-screen z-0 pointer-events-none">
        <video
          ref={introVideoRef}
          key="background-video-intro"
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://static.ponlponl123.com/h.264/chouxproject/Comp%203.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <video
          ref={videoRef}
          key="background-video"
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden"
        >
          <source
            src="https://static.ponlponl123.com/h.264/chouxproject/Comp%202.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.64, delay: 5 }}
        key="main"
        className="flex flex-col gap-6 items-center justify-center min-h-screen h-full w-full z-10 bg-linear-to-t from-black to-transparent"
      >
        <Fireworks key="fireworks" onInit={onInitHandler} />
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5 }}
          className="text-2xl font-semibold"
        >
          🎂 Happy birthday 🎉
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5.12 }}
          className="text-8xl text-center"
        >
          シュークリーム
        </motion.h2>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5.24 }}
        >
          2 Year's Anniversary
        </motion.span>
      </motion.main>
      <section key="section" className="min-h-screen h-full"></section>
    </AnimatePresence>
  );
}

export default Page;
