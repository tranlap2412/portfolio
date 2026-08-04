"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PortfolioScene = dynamic(
  () => import("@/components/scene/portfolio-scene").then((mod) => mod.PortfolioScene),
  { ssr: false },
);

export function SiteBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    const id = window.requestIdleCallback(start, { timeout: 600 });
    return () => window.cancelIdleCallback(id);
  }, []);

  if (!ready) return null;
  return <PortfolioScene />;
}
