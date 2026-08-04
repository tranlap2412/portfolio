"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactElement,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type Play = "load" | "scroll";

function motionOff() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RevealRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || motionOff()) return;

    const ctx = gsap.context(() => {
      const load = root.querySelectorAll<HTMLElement>("[data-reveal='load']");
      const scroll = root.querySelectorAll<HTMLElement>("[data-reveal='scroll']");
      const items = [...Array.from(load), ...Array.from(scroll)];
      if (items.length === 0) return;

      gsap.set(items, { autoAlpha: 0, y: 20 });

      if (load.length > 0) {
        gsap.to(load, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.04,
        });
      }

      if (scroll.length > 0) {
        ScrollTrigger.batch(scroll, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}

export function Reveal({
  children,
  className,
  play = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  play?: Play;
}) {
  return (
    <div data-reveal={play} className={className}>
      {children}
    </div>
  );
}

export function RevealList({
  children,
  className,
  play = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  play?: Play;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ "data-reveal"?: Play }>, {
              "data-reveal": play,
            })
          : child,
      )}
    </div>
  );
}
