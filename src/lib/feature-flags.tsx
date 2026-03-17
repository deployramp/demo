import React, { createContext, useContext, useState, useEffect } from "react";
import { init, flag } from "@deployramp/sdk";
import type { FeatureFlags } from "./types";

init({
  publicToken: import.meta.env.VITE_DEPLOYRAMP_TOKEN ?? "demo",
});

function readFlags(): FeatureFlags {
  return {
    showPriority: flag("showPriority"),
    showAvatars: flag("showAvatars"),
    showAiSummary: flag("showAiSummary"),
    showTimeline: flag("showTimeline"),
    showBulkActions: flag("showBulkActions"),
    showPriorityMatrix: flag("showPriorityMatrix"),
    showEstimates: flag("showEstimates"),
    showLabels: flag("showLabels"),
    experimentalUI: flag("experimentalUI"),
  };
}

interface FlagContextValue {
  flags: FeatureFlags;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(readFlags);

  useEffect(() => {
    // Re-read after SDK finishes initial fetch from DeployRamp
    const t = setTimeout(() => setFlags(readFlags()), 500);
    // Poll to pick up real-time WebSocket-driven updates
    const interval = setInterval(() => setFlags(readFlags()), 5000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <FlagContext.Provider value={{ flags }}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFlags() {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFlags must be used within FlagProvider");
  return ctx;
}
