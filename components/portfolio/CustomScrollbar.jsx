"use client";

import { useEffect, useRef } from "react";

const MIN_THUMB_HEIGHT = 46;
const IDLE_MS = 520;
const LERP = 0.16;

export default function CustomScrollbar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return undefined;

    let rafId = 0;
    let idleTimeoutId = 0;
    let resizeObserver = null;
    let currentOffset = 0;
    let targetOffset = 0;
    let targetHeight = MIN_THUMB_HEIGHT;
    let isScrollable = false;

    const updateMetrics = () => {
      const doc = document.documentElement;
      const body = document.body;
      const viewportHeight = window.innerHeight || doc.clientHeight || 0;
      const totalHeight = Math.max(doc.scrollHeight, body?.scrollHeight || 0);
      const scrollable = Math.max(0, totalHeight - viewportHeight);

      if (scrollable <= 0 || viewportHeight <= 0 || totalHeight <= 0) {
        isScrollable = false;
        track.classList.add("is-hidden");
        track.classList.remove("is-scrolling");
        thumb.style.height = "";
        thumb.style.transform = "";
        currentOffset = 0;
        targetOffset = 0;
        return;
      }

      isScrollable = true;
      track.classList.remove("is-hidden");

      const trackHeight = track.clientHeight;
      if (trackHeight <= 0) return;

      targetHeight = Math.max(MIN_THUMB_HEIGHT, (viewportHeight / totalHeight) * trackHeight);
      const maxTravel = Math.max(0, trackHeight - targetHeight);
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, scrollTop / scrollable));
      targetOffset = maxTravel * progress;
    };

    const draw = () => {
      rafId = 0;
      if (!isScrollable) return;

      currentOffset += (targetOffset - currentOffset) * LERP;
      if (Math.abs(targetOffset - currentOffset) < 0.08) {
        currentOffset = targetOffset;
      }

      thumb.style.height = `${targetHeight}px`;
      thumb.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`;

      if (Math.abs(targetOffset - currentOffset) > 0.08) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(draw);
    };

    const markScrolling = () => {
      if (!isScrollable) return;
      track.classList.add("is-scrolling");
      if (idleTimeoutId) window.clearTimeout(idleTimeoutId);
      idleTimeoutId = window.setTimeout(() => {
        track.classList.remove("is-scrolling");
      }, IDLE_MS);
    };

    const onScroll = () => {
      updateMetrics();
      markScrolling();
      scheduleDraw();
    };
    const onResize = () => {
      updateMetrics();
      scheduleDraw();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("load", onResize);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateMetrics();
        scheduleDraw();
      });
      resizeObserver.observe(document.documentElement);
      if (document.body) resizeObserver.observe(document.body);
    }

    updateMetrics();
    scheduleDraw();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("load", onResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      if (idleTimeoutId) window.clearTimeout(idleTimeoutId);
    };
  }, []);

  return (
    <div className="site-scrollbar" ref={trackRef} aria-hidden="true">
      <span className="site-scrollbar-thumb" ref={thumbRef} />
    </div>
  );
}
