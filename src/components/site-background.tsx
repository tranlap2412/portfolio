"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";

const PortfolioScene = dynamic(
  () => import("@/components/scene/portfolio-scene").then((mod) => mod.PortfolioScene),
  { ssr: false },
);

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function SiteBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      if (canUseWebGL()) setReady(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 600 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {ready ? (
        <SceneBoundary>
          <PortfolioScene />
        </SceneBoundary>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/50 via-background/30 to-background/65"
      />
    </>
  );
}
