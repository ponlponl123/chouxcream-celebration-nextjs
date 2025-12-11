"use client";
import React, { useEffect, useRef } from "react";
import { TConductorInstance } from "react-canvas-confetti/dist/types/index";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Page() {
  const controller = useRef<TConductorInstance | null>(null);

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor;
    if (!controller.current) return;

    controller.current.run({ speed: 3, duration: 3000 });
  };

  return (
    <>
      <Fireworks onInit={onInitHandler} />
      <main className="flex flex-col gap-6 items-center justify-center min-h-screen h-full w-full">
        <h1 className="text-2xl font-semibold">🎂 Happy birthday 🎉</h1>
        <h2 className="text-8xl text-center">シュークリーム</h2>
        <span>2 Year's Anniversary</span>
      </main>
      <section className="min-h-screen h-full"></section>
    </>
  );
}

export default Page;
