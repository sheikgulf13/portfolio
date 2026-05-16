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
            gsap.set(processStages, { autoAlpha: 0, y: 48 });

            const introHold = 0.65;
            const stageHold = 1.2;
            const transition = 0.65;
            const lastHold = 0.55;
            const processScrollDistance = Math.max(4200, processStages.length * 1400);

            const processTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: processSection,
                start: "top top",
                end: `+=${processScrollDistance}`,
                pin: true,
                pinReparent: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onToggle: (self) => setNavHidden(self.isActive),
                onUpdate: (self) => {
                  if (!processProgressFill) return;
                  processProgressFill.style.width = `${(self.progress * 100).toFixed(2)}%`;
                },
              },
            });

            processTimeline.to({}, { duration: introHold });
            processTimeline.to(processStages[0], { autoAlpha: 1, y: 0, duration: transition });

            for (let index = 1; index < processStages.length; index += 1) {
              processTimeline.to({}, { duration: stageHold });
              processTimeline.to(processStages[index - 1], { autoAlpha: 0, y: -36, duration: transition });
              processTimeline.to(processStages[index], { autoAlpha: 1, y: 0, duration: transition }, "<0.08");
            }

            processTimeline.to({}, { duration: lastHold });
            processTimeline.to(processStages[processStages.length - 1], { autoAlpha: 0, y: -36, duration: transition });

            cleanups.push(() => {
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
