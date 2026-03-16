"use client";
import { randomInRange } from "@/lib/utils";
import confetti from "canvas-confetti";
import React, { useEffect } from "react";

function page() {
  useEffect(() => {
    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
    });

    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 12;

    (function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(64, 256 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 0.9,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: 1,
        },
        colors: ["#fb6490"],
        shapes: [heart],
        gravity: randomInRange(-0.2, -0.6),
        scalar: randomInRange(1.4, 2.5),
        drift: randomInRange(-0.6, 0.6),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);
  return <div>page</div>;
}

export default page;
