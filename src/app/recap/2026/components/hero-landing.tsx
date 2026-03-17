"use client";
import gsap from "gsap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SplitText } from "gsap/SplitText";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(SplitText);

function HeroLanding({ onContentReady }: { onContentReady?: () => void }) {
  const introTlRef = useRef<any>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [isIntroPlaying, setIsIntroPlaying] = React.useState(false);
  const [isIntroPlayed, setIsIntroPlayed] = React.useState(false);
  const [isContentReady, setIsContentReady] = React.useState(false);
  const [isIntroVideoFailed, setIsIntroVideoFailed] = React.useState(false);
  const hasTransitionedRef = useRef(false);

  useEffect(() => {
    const introVideo = introVideoRef.current;
    if (!introVideo) {
      setIsIntroVideoFailed(true);
      return;
    }

    introTlRef.current = gsap.timeline();

    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_DEVELOPMENT_SKIP_INTRO === "true"
    ) {
      introVideo.classList.add("hidden");
      setIsIntroPlayed(true);
      setTimeout(() => {
        introTlRef.current?.to("body", { overflow: "auto", duration: 0 });
        setIsContentReady(true);
        onContentReady && onContentReady();
      }, 3000);
      return;
    }

    introTlRef.current.to("body", { overflow: "hidden", duration: 0 });

    introVideo.play().catch((error) => {
      setIsIntroVideoFailed(true);
      console.error("Error playing intro video:", error);
    });

    introVideo.addEventListener("playing", () => {
      setIsIntroPlaying(true);
    });

    const handleIntroEnded = () => {
      if (hasTransitionedRef.current) return;
      hasTransitionedRef.current = true;
      setIsIntroPlayed(true);

      introVideo.classList.add("hidden");
      setTimeout(() => {
        introTlRef.current?.to("body", { overflow: "auto", duration: 0 });
        setIsContentReady(true);
        onContentReady && onContentReady();
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

  return (
    <>
      {isIntroVideoFailed && (
        <AlertDialog open={true}>
          <AlertDialogContent className="rounded-lg">
            <AlertDialogHeader>
              <AlertDialogMedia className="rounded-md bg-amber-400/10">
                <WarningIcon className="text-amber-400" />
              </AlertDialogMedia>
              <AlertDialogTitle>Failed to ref video</AlertDialogTitle>
              <AlertDialogDescription>
                The intro video failed to load or incorrectly mount to React.
                Please reload the page to try again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => window.location.reload()}
                className="rounded-md!"
              >
                Reload page
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div
        key="video-container"
        className="absolute w-full h-screen pointer-events-none z-50"
      >
        <video
          ref={introVideoRef}
          key="background-video-intro"
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-50 bg-black"
        >
          <source
            src="https://static.ponlponl123.com/h.264/chouxproject/Comp%203.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {!(
          process.env.NODE_ENV === "development" &&
          process.env.NEXT_PUBLIC_DEVELOPMENT_SKIP_INTRO === "true"
        ) && (
          <div
            className={twMerge(
              "absolute top-0 left-0 w-full h-full z-40 transition-opacity duration-[3s]",
              isIntroPlaying && "bg-white",
              isIntroPlayed && "opacity-0 pointer-events-none",
            )}
          />
        )}
        <motion.div
          key="polaroids-intro-container"
          initial={{ scale: 1.32 }}
          animate={isIntroPlayed && { scale: 1 }}
          transition={{ duration: 4.8, delay: 1, ease: "easeOut" }}
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
                    item.aspect === "video" && "w-[26vw] min-w-lg aspect-video",
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
        </motion.div>
      </div>
    </>
  );
}

export default HeroLanding;
