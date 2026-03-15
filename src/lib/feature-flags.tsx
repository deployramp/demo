import React, { createContext, useContext, useState, useCallback } from "react";
import type { FeatureFlags } from "./types";

const defaultFlags: FeatureFlags = {
  showPriority: true,
  showAvatars: true,
  showAiSummary: true,
  showTimeline: false,
  showBulkActions: true,
  showPriorityMatrix: false,
  showEstimates: true,
  showLabels: true,
  experimentalUI: false,
};

interface FlagContextValue {
  flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
  toggleFlag: (key: keyof FeatureFlags) => void;
  resetFlags: () => void;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);

  const setFlag = useCallback((key: keyof FeatureFlags, value: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleFlag = useCallback((key: keyof FeatureFlags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetFlags = useCallback(() => setFlags(defaultFlags), []);

  return (
    <FlagContext.Provider value={{ flags, setFlag, toggleFlag, resetFlags }}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFlags() {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFlags must be used within FlagProvider");
  return ctx;
}
