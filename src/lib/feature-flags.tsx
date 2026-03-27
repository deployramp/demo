import React, { createContext, useContext } from "react";
import { useFlag } from "@deployramp/sdk/react";
import type { FeatureFlags } from "./types";

interface FlagContextValue {
  flags: FeatureFlags;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children }: { children: React.ReactNode }) {
  const flags: FeatureFlags = {
    showLabels: useFlag("showLabels"),
  };

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
