"use client";

import { useEffect, useState } from "react";

const COUNT_DURATION_MS = 800;
const START_HOLD_MS = 500;
const END_HOLD_MS = 1000;
const COUNT_FADE_MS = 320;
const BG_FADE_MS = 220;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isCountFading, setIsCountFading] = useState(false);
  const [isBgFading, setIsBgFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let countFadeTimeoutId = 0;
    let bgFadeTimeoutId = 0;
    const startTime = performance.now();
    document.body.classList.add("preloading");

    const tick = (now) => {
      const elapsed = now - startTime;
      if (elapsed < START_HOLD_MS) {
        setCount(0);
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const countElapsed = elapsed - START_HOLD_MS;
      const progress = Math.min(1, countElapsed / COUNT_DURATION_MS);
      const nextCount = Math.min(100, Math.round(progress * 100));
      setCount(nextCount);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      if (countElapsed < COUNT_DURATION_MS + END_HOLD_MS) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      setIsCountFading(true);
      countFadeTimeoutId = window.setTimeout(() => {
        setIsBgFading(true);
        bgFadeTimeoutId = window.setTimeout(() => {
          document.body.classList.remove("preloading");
          setIsDone(true);
        }, BG_FADE_MS);
      }, COUNT_FADE_MS);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (countFadeTimeoutId) window.clearTimeout(countFadeTimeoutId);
      if (bgFadeTimeoutId) window.clearTimeout(bgFadeTimeoutId);
      document.body.classList.remove("preloading");
    };
  }, []);

  if (isDone) return null;

  return (
    <div className={`preloader${isBgFading ? " is-bg-fading" : ""}`} role="status" aria-live="polite" aria-label="Loading">
      <p className={`preloader-count${isCountFading ? " is-fading" : ""}`}>{count}</p>
    </div>
  );
}
