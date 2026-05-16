"use client";

import { useEffect } from "react";

function getStoredTheme() {
  try {
    return window.localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    // Storage can fail in private or locked-down browser contexts.
  }
}

function clamp01(value) {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export default function PortfolioEffects() {
  useEffect(() => {
    const cleanups = [];
    const html = document.documentElement;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const enableCustomCursor = isFinePointer && !prefersReduced;

    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const applyTheme = (theme) => {
      if (theme === "light") {
        html.setAttribute("data-theme", "light");
        if (themeIcon) themeIcon.textContent = "☀";
      } else {
        html.removeAttribute("data-theme");
        if (themeIcon) themeIcon.textContent = "☽";
      }
      setStoredTheme(theme || "dark");
    };

    if (getStoredTheme() === "light" && themeIcon) {
      themeIcon.textContent = "☀";
    } else if (themeIcon) {
      themeIcon.textContent = "☽";
    }

    if (toggleBtn) {
      const onThemeClick = () => {
        const current = html.getAttribute("data-theme");
        applyTheme(current === "light" ? "dark" : "light");
      };
      toggleBtn.addEventListener("click", onThemeClick);
      cleanups.push(() => toggleBtn.removeEventListener("click", onThemeClick));
    }

    const updateClock = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      const s = String(ist.getSeconds()).padStart(2, "0");
      const clock = document.getElementById("ist-clock");
      if (clock) clock.textContent = `${h}:${m}:${s} IST`;
    };

    updateClock();
    const clockId = window.setInterval(updateClock, 1000);
    cleanups.push(() => window.clearInterval(clockId));

    if (enableCustomCursor) {
      const dot = document.getElementById("cursor-dot");

      if (dot) {
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        let rafId = 0;
        const proximityTargets = Array.from(
          document.querySelectorAll('a,button,.project-card,.cap-row,[data-cursor="hover"],[data-cursor-shape]'),
        );

        const applyCursorState = (shape, sizeVariant = "") => {
          dot.classList.remove("hovering", "cursor-square", "cursor-text", "cursor-hover-small");
          if (shape === "square") {
            dot.classList.add("cursor-square");
            return;
          }
          if (shape === "text") {
            dot.classList.add("cursor-text");
            return;
          }
          if (shape === "hover") {
            dot.classList.add("hovering");
            if (sizeVariant === "sm") {
              dot.classList.add("cursor-hover-small");
            }
          }
        };

        const evaluateProximity = (x, y) => {
          let activeShape = "";
          let activeSizeVariant = "";
          let minDistance = Number.POSITIVE_INFINITY;

          for (const element of proximityTargets) {
            const rect = element.getBoundingClientRect();
            const shape = element.getAttribute("data-cursor-shape") || "hover";
            const sizeVariant = element.getAttribute("data-cursor-size") || "";
            const inflate = shape === "hover" ? 24 : 0;
            const inside =
              x >= rect.left - inflate &&
              x <= rect.right + inflate &&
              y >= rect.top - inflate &&
              y <= rect.bottom + inflate;
            if (!inside) continue;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = (x - centerX) ** 2 + (y - centerY) ** 2;
            if (distance < minDistance) {
              minDistance = distance;
              activeShape = shape;
              activeSizeVariant = sizeVariant;
            }
          }

          applyCursorState(activeShape, activeSizeVariant);
        };

        const tick = () => {
          currentX += (targetX - currentX) * 0.13;
          currentY += (targetY - currentY) * 0.13;
          dot.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
          rafId = window.requestAnimationFrame(tick);
        };

        const onMouseMove = (event) => {
          targetX = event.clientX;
          targetY = event.clientY;
          evaluateProximity(event.clientX, event.clientY);
        };
        const onMouseDown = () => dot.classList.add("clicking");
        const onMouseUp = () => dot.classList.remove("clicking");
        const onWindowBlur = () =>
          dot.classList.remove("clicking", "hovering", "cursor-square", "cursor-text", "cursor-hover-small");
        const onVisibilityChange = () => {
          if (document.hidden) {
            dot.classList.remove("clicking", "hovering", "cursor-square", "cursor-text", "cursor-hover-small");
          }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("blur", onWindowBlur);
        document.addEventListener("visibilitychange", onVisibilityChange);
        rafId = window.requestAnimationFrame(tick);

        cleanups.push(() => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mousedown", onMouseDown);
          window.removeEventListener("mouseup", onMouseUp);
          window.removeEventListener("blur", onWindowBlur);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          window.cancelAnimationFrame(rafId);
          dot.classList.remove("clicking", "hovering", "cursor-square", "cursor-text", "cursor-hover-small");
        });
      }
    }

    if (prefersReduced) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      document.querySelectorAll(".process-stage").forEach((stage) => {
        stage.style.opacity = "1";
        stage.style.transform = "none";
      });
      const navElement = document.querySelector("nav");
      if (navElement) navElement.classList.remove("nav-hidden");
      const processProgressFill = document.getElementById("process-progress-fill");
      if (processProgressFill) processProgressFill.style.width = "100%";
      return () => cleanups.forEach((cleanup) => cleanup());
    }

    let cancelled = false;

    const initMotion = async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        let lenis;
        try {
          lenis = new Lenis({ lerp: 0.1, autoRaf: false });
          const updateScrollTrigger = () => ScrollTrigger.update();
          lenis.on("scroll", updateScrollTrigger);

          const lenisTick = (time) => {
            lenis.raf(time * 1000);
          };
          gsap.ticker.add(lenisTick);
          gsap.ticker.lagSmoothing(0);

          cleanups.push(() => {
            gsap.ticker.remove(lenisTick);
            lenis.off?.("scroll", updateScrollTrigger);
            lenis.destroy();
          });

          document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            const onAnchorClick = (event) => {
              const href = anchor.getAttribute("href");
              if (!href || href === "#") return;
              const target = document.querySelector(href);
              if (!target) return;
              event.preventDefault();
              lenis.scrollTo(target, {
                offset: -80,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
              });
            };
            anchor.addEventListener("click", onAnchorClick);
            cleanups.push(() => anchor.removeEventListener("click", onAnchorClick));
          });
        } catch (error) {
          console.warn("Lenis init failed", error);
        }

        if (enableCustomCursor) {
          document.querySelectorAll("[data-magnetic]").forEach((el) => {
            const onMove = (event) => {
              const rect = el.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = event.clientX - cx;
              const dy = event.clientY - cy;
              gsap.to(el, {
                x: dx * 0.3,
                y: dy * 0.3,
                duration: 0.3,
                ease: "power2.out",
              });
            };
            const onLeave = () => {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
              });
            };
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              el.removeEventListener("mousemove", onMove);
              el.removeEventListener("mouseleave", onLeave);
            });
          });
        }

        const context = gsap.context(() => {
          const navElement = document.querySelector("nav");
          let lastNavHidden = null;
          let navShowTimeoutId = 0;
          const clearPendingNavShow = () => {
            if (!navShowTimeoutId) return;
            window.clearTimeout(navShowTimeoutId);
            navShowTimeoutId = 0;
          };
          const setNavHidden = (nextHidden, options = {}) => {
            const { immediate = false } = options;
            if (!navElement) return;
            if (nextHidden) {
              clearPendingNavShow();
              if (lastNavHidden === true) return;
              lastNavHidden = true;
              navElement.classList.add("nav-hidden");
              return;
            }

            if (immediate) {
              clearPendingNavShow();
              if (lastNavHidden === false) return;
              lastNavHidden = false;
              navElement.classList.remove("nav-hidden");
              return;
            }

            clearPendingNavShow();
            navShowTimeoutId = window.setTimeout(() => {
              navShowTimeoutId = 0;
              if (lastNavHidden === false) return;
              lastNavHidden = false;
              navElement.classList.remove("nav-hidden");
            }, 110);
          };
          const heroHeadline = document.querySelector(".hero-headline");
          const heroSub = document.querySelector(".hero-sub");
          const processSection = document.getElementById("process");
          const processStory = processSection?.querySelector(".process-story");
          const processStages = processSection ? gsap.utils.toArray(".process-stage", processSection) : [];
          const processProgressFill = document.getElementById("process-progress-fill");

          if (heroHeadline) {
            gsap.set(heroHeadline, { opacity: 1, y: 0 });
            if (heroSub) gsap.set(heroSub, { opacity: 1, y: 0 });

            gsap.to(heroHeadline, {
              scale: 1.36,
              y: 260,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });

            if (heroSub) {
              gsap.to(heroSub, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: "#hero",
                  start: "top -10%",
                  end: "top -35%",
                  toggleActions: "play none none reverse",
                },
              });
            }
          }

          document.querySelectorAll(".reveal").forEach((el) => {
            if (el.closest("#hero")) return;
            gsap.fromTo(
              el,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          });

          if (processSection && processStory && processStages.length > 0) {
            gsap.set(processStages, { autoAlpha: 0 });
            processStages.forEach((stage) => stage.classList.remove("is-active"));
            const aboutSection = document.getElementById("about");

            const setActiveStage = (activeIndex) => {
              processStages.forEach((stage, index) => {
                stage.classList.toggle("is-active", index === activeIndex);
              });
              if (activeIndex >= 0) {
                processSection.setAttribute("data-process-active", String(activeIndex + 1));
              } else {
                processSection.removeAttribute("data-process-active");
              }
            };

            const introHold = 0.48;
            const stageHold = 1.32;
            const transition = 0.78;
            const transitionGap = 0.12;
            const lastHold = 0.68;
            const processScrollDistance = Math.max(4200, processStages.length * 1400);
            const processVisualRoots = processStages.map((stage) => stage.querySelector(".process-visual"));
            const processVisualSequences = processStages.map((stage, index) => {
              if (index === 0) {
                return gsap.utils.toArray(
                  ".visual-brief-head, .visual-brief-line-1, .visual-brief-line-2, .visual-brief-line-3, .visual-lens, .visual-flow-line-1, .visual-flow-node-1, .visual-flow-node-2, .visual-flow-line-2, .visual-flow-node-3",
                  stage,
                );
              }
              if (index === 1) {
                return gsap.utils.toArray(
                  ".visual-window-head, .visual-build-nav-1, .visual-build-nav-2, .visual-build-nav-3, .visual-build-progress-step-1, .visual-build-progress-step-2, .visual-build-progress-step-3, .visual-cell-1, .visual-cell-2, .visual-cell-3, .visual-cell-4",
                  stage,
                );
              }
              return gsap.utils.toArray(
                ".visual-handover-source, .visual-handover-source-line-1, .visual-handover-source-line-2, .visual-handover-source-line-3, .visual-handover-arrow, .visual-handover-target, .visual-handover-target-slot, .visual-handover-target-badge",
                stage,
              );
            });
            const allVisualParts = processVisualSequences.flat();
            if (allVisualParts.length > 0) {
              gsap.set(allVisualParts, { autoAlpha: 0.16, scale: 0.972, x: -2, y: 12, rotate: -0.25, filter: "blur(1.4px)" });
            }
            if (processVisualRoots.length > 0) {
              gsap.set(processVisualRoots, { autoAlpha: 0.78, x: -1, y: 10, scale: 0.992, rotate: -0.16, filter: "blur(0.6px)" });
            }

            const addVisualReveal = (timeline, elements) => {
              if (!elements || elements.length === 0) return;
              timeline.to(
                elements,
                {
                  autoAlpha: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  duration: transition * 0.74,
                  ease: "expo.out",
                  stagger: { each: 0.038, from: "start" },
                },
                "<0.01",
              );
            };

            const addVisualDim = (timeline, elements) => {
              if (!elements || elements.length === 0) return;
              timeline.to(
                elements,
                {
                  autoAlpha: 0.16,
                  scale: 0.982,
                  x: 1,
                  y: 8,
                  rotate: 0.18,
                  filter: "blur(1.2px)",
                  duration: transition * 0.52,
                  ease: "power2.inOut",
                  stagger: { each: 0.022, from: "end" },
                },
                "<",
              );
            };

            const addVisualRootReveal = (timeline, root) => {
              if (!root) return;
              timeline.to(
                root,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                  duration: transition * 0.66,
                  ease: "expo.out",
                },
                "<",
              );
            };

            const addVisualRootDim = (timeline, root) => {
              if (!root) return;
              timeline.to(
                root,
                {
                  autoAlpha: 0.78,
                  x: 0.8,
                  y: 9,
                  scale: 0.993,
                  rotate: 0.12,
                  filter: "blur(0.45px)",
                  duration: transition * 0.5,
                  ease: "power2.inOut",
                },
                "<",
              );
            };

            let processTimeline = null;
            let rafId = 0;
            let processEndScrollY = 0;
            let aboutTopScrollY = 0;
            let lastProgressWidth = -1;
            let lastTrackScale = -1;
            let lastScrollY = window.scrollY || window.pageYOffset || 0;

            const updateProgressMetrics = () => {
              const processTrigger = processTimeline?.scrollTrigger;
              if (!processTrigger) return;
              processEndScrollY = processTrigger.end;
              if (aboutSection) {
                const aboutRect = aboutSection.getBoundingClientRect();
                aboutTopScrollY = window.scrollY + aboutRect.top;
              } else {
                aboutTopScrollY = processEndScrollY;
              }
            };

            const getProcessProgress = () => {
              const processTrigger = processTimeline?.scrollTrigger;
              if (!processTrigger) return 0;

              const scrollY = window.scrollY || window.pageYOffset || 0;
              const fillStart = processTrigger.start;
              const fillEnd = processEndScrollY;

              if (scrollY <= fillStart) return 0;

              if (scrollY <= fillEnd) {
                const fillSpan = Math.max(1, fillEnd - fillStart);
                return clamp01((scrollY - fillStart) / fillSpan);
              }

              return 1;
            };

            const getProcessTrackScale = (scrollY, isScrollingDown) => {
              const processTrigger = processTimeline?.scrollTrigger;
              if (!processTrigger) return 1;

              const fillEnd = processEndScrollY;
              const shrinkEndDown = aboutTopScrollY - 10;
              const unshrinkStartUp = aboutTopScrollY - 10;

              if (scrollY <= fillEnd) return 1;

              if (isScrollingDown) {
                const shrinkSpan = shrinkEndDown - fillEnd;
                if (shrinkSpan <= 1) return scrollY > fillEnd ? 0 : 1;

                const shrinkProgress = clamp01((scrollY - fillEnd) / shrinkSpan);
                return 1 - shrinkProgress;
              }

              if (scrollY >= unshrinkStartUp) return 0;

              const unshrinkSpan = unshrinkStartUp - fillEnd;
              if (unshrinkSpan <= 1) return scrollY > fillEnd ? 0 : 1;

              const unshrinkProgress = clamp01((scrollY - fillEnd) / unshrinkSpan);
              return 1 - unshrinkProgress;
            };

            const applyProcessProgress = () => {
              if (!processProgressFill) return;
              const scrollY = window.scrollY || window.pageYOffset || 0;
              const isScrollingDown = scrollY >= lastScrollY;
              lastScrollY = scrollY;
              const fillProgress = getProcessProgress();
              const trackScale = getProcessTrackScale(scrollY, isScrollingDown);
              const widthPercent = Number((fillProgress * 100).toFixed(2));
              const roundedTrackScale = Number(trackScale.toFixed(4));
              if (widthPercent !== lastProgressWidth) {
                lastProgressWidth = widthPercent;
                processProgressFill.style.width = `${widthPercent}%`;
              }
              if (roundedTrackScale !== lastTrackScale) {
                lastTrackScale = roundedTrackScale;
                processSection.style.setProperty("--process-track-scale", roundedTrackScale.toFixed(4));
              }
              processSection.style.setProperty("--process-progress", fillProgress.toFixed(4));
            };

            const scheduleProcessProgressUpdate = () => {
              if (rafId) return;
              rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                applyProcessProgress();
              });
            };

            const handleProcessProgressRefresh = () => {
              updateProgressMetrics();
              scheduleProcessProgressUpdate();
            };

            const onWindowScroll = () => scheduleProcessProgressUpdate();
            const onWindowResize = () => handleProcessProgressRefresh();

            processTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: processSection,
                start: "top top",
                end: `+=${processScrollDistance}`,
                pin: true,
                pinReparent: true,
                scrub: 0.42,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onToggle: (self) => setNavHidden(self.isActive),
                onRefresh: () => handleProcessProgressRefresh(),
                onUpdate: () => scheduleProcessProgressUpdate(),
              },
            });

            updateProgressMetrics();
            applyProcessProgress();
            window.addEventListener("scroll", onWindowScroll, { passive: true });
            window.addEventListener("resize", onWindowResize, { passive: true });
            ScrollTrigger.addEventListener("refresh", handleProcessProgressRefresh);

            processTimeline.to({}, { duration: introHold });
            processTimeline.to(processStages[0], {
              autoAlpha: 1,
              duration: transition,
              ease: "power2.out",
              onStart: () => setActiveStage(0),
              onReverseComplete: () => setActiveStage(-1),
            });
            addVisualRootReveal(processTimeline, processVisualRoots[0]);
            addVisualReveal(processTimeline, processVisualSequences[0]);

            for (let index = 1; index < processStages.length; index += 1) {
              processTimeline.to({}, { duration: stageHold });
              processTimeline.to(processStages[index - 1], { autoAlpha: 0, duration: transition, ease: "power2.inOut" });
              addVisualRootDim(processTimeline, processVisualRoots[index - 1]);
              addVisualDim(processTimeline, processVisualSequences[index - 1]);
              processTimeline.to({}, { duration: transitionGap });
              processTimeline.to(processStages[index], {
                autoAlpha: 1,
                duration: transition,
                ease: "power2.out",
                onStart: () => setActiveStage(index),
                onReverseComplete: () => setActiveStage(index - 1),
              });
              addVisualRootReveal(processTimeline, processVisualRoots[index]);
              addVisualReveal(processTimeline, processVisualSequences[index]);
            }

            processTimeline.to({}, { duration: lastHold });
            processTimeline.to(processStages[processStages.length - 1], {
              autoAlpha: 0,
              duration: transition,
              ease: "power2.inOut",
              onStart: () => setActiveStage(-1),
              onReverseComplete: () => setActiveStage(processStages.length - 1),
            });
            addVisualRootDim(processTimeline, processVisualRoots[processStages.length - 1]);
            addVisualDim(processTimeline, processVisualSequences[processStages.length - 1]);

            cleanups.push(() => {
              window.removeEventListener("scroll", onWindowScroll);
              window.removeEventListener("resize", onWindowResize);
              ScrollTrigger.removeEventListener("refresh", handleProcessProgressRefresh);
              if (rafId) window.cancelAnimationFrame(rafId);
              processSection.removeAttribute("data-process-active");
              processSection.style.removeProperty("--process-progress");
              processSection.style.removeProperty("--process-track-scale");
              processStages.forEach((stage) => stage.classList.remove("is-active"));
              processTimeline.scrollTrigger?.kill();
              setNavHidden(false, { immediate: true });
              clearPendingNavShow();
            });
          }

          document.querySelectorAll(".project-card").forEach((card) => {
            const image = card.querySelector(".project-image");
            if (!image) return;
            const onEnter = () => gsap.to(image, { scale: 1.05, duration: 0.6, ease: "power2.out" });
            const onLeave = () => gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
            });
          });

          ["marquee1-wrap", "marquee2-wrap"].forEach((id) => {
            const wrap = document.getElementById(id);
            const track = wrap?.querySelector(".marquee-track");
            if (!wrap || !track) return;
            const onEnter = () => track.classList.add("paused");
            const onLeave = () => track.classList.remove("paused");
            wrap.addEventListener("mouseenter", onEnter);
            wrap.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              wrap.removeEventListener("mouseenter", onEnter);
              wrap.removeEventListener("mouseleave", onLeave);
            });
          });

          const footerLine = document.getElementById("footer-line");
          if (footerLine) {
            gsap.to(footerLine, {
              scaleX: 1,
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: footerLine,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          }

          document.querySelectorAll(".cap-row").forEach((row, index) => {
            gsap.fromTo(
              row,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              },
            );
          });
        });

        cleanups.push(() => {
          context.revert();
          const navElement = document.querySelector("nav");
          if (navElement) navElement.classList.remove("nav-hidden");
          const processProgressFill = document.getElementById("process-progress-fill");
          if (processProgressFill) processProgressFill.style.width = "0%";
        });
      } catch (error) {
        console.warn("Motion init failed", error);
        document.querySelectorAll(".reveal").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        const navElement = document.querySelector("nav");
        if (navElement) navElement.classList.remove("nav-hidden");
      }
    };

    initMotion();

    return () => {
      cancelled = true;
      cleanups.splice(0).forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
