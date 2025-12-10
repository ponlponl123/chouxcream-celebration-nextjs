"use client";

import Countdown from "react-countdown";
import { Button } from "@heroui/button";
import { CakeIcon } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  const counter =
    "Countdown timer showing days, hours, minutes and seconds remaining";

  const Completionist = () => (
    <div className="flex flex-col items-center justify-center gap-4 mt-6">
      <h1>ChouxCream Celebration พร้อมแล้ว！</h1>
      <Button
        className="font-semibold text-sm"
        color="success"
        size="lg"
        variant="shadow"
      >
        <CakeIcon size={20} weight="bold" />
        Refresh this page
      </Button>
    </div>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col">
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
            days
          </div>
          <div className="flex flex-col">
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
            hours
          </div>
          <div className="flex flex-col">
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
            min
          </div>
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
            sec
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
        <div className="flex flex-col max-w-xl text-center justify-center gap-1">
          <h1 className="text-6xl">シュークリーム</h1>
          <h2>2 Year&apos;s Anniversary Celebration 🎉</h2>
          <span className="mt-6 mb-3">ในอีก</span>
          <div className="flex items-center justify-center">
            <Countdown
              date={new Date("2025-12-16T19:30:00")}
              renderer={renderer}
            />
          </div>
          <br />
          <h3 className="mt-6">ไว้กลับมาใหม่นะ！</h3>
        </div>
      </section>
    </>
  );
}
