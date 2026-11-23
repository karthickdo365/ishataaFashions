import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export function MotionRoot() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let alive = true;
    let stop = () => {};

    void (async () => {
      const [{ default: Lenis }, gsapModule, scrollModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!alive) return;
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollModule.ScrollTrigger);
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", scrollModule.ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      stop = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      alive = false;
      stop();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
