import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Flag } from "lucide-react";
import { useFlags } from "@/lib/feature-flags";
import type { FeatureFlags } from "@/lib/types";

const flagMeta: { key: keyof FeatureFlags; label: string; description: string }[] = [
  { key: "showPriority", label: "Priority Badges", description: "Show priority indicators on tasks" },
  { key: "showAvatars", label: "User Avatars", description: "Display assignee avatars and presence" },
  { key: "showAiSummary", label: "AI Summary", description: "Show AI-generated sprint insights" },
  { key: "showTimeline", label: "Timeline View", description: "Enable experimental timeline view" },
  { key: "showBulkActions", label: "Bulk Actions", description: "Enable multi-select task actions" },
  { key: "showPriorityMatrix", label: "Priority Matrix", description: "Impact vs. effort scoring" },
  { key: "showEstimates", label: "Point Estimates", description: "Show story point estimates" },
  { key: "showLabels", label: "Labels", description: "Display task labels" },
  { key: "experimentalUI", label: "Experimental UI", description: "Enable new visual treatments" },
];

interface FlagPanelProps {
  open: boolean;
  onClose: () => void;
}

export function FlagPanel({ open, onClose }: FlagPanelProps) {
  const { flags, toggleFlag, resetFlags } = useFlags();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 w-80 h-screen bg-card border-l border-border z-50 flex flex-col shadow-xl"
        >
          <div className="h-12 flex items-center px-4 border-b border-border gap-2">
            <Flag className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Feature Flags</span>
            <span className="ml-auto flex items-center gap-2">
              <button
                onClick={resetFlags}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Reset all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
            {flagMeta.map((fm) => (
              <div
                key={fm.key}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-secondary/30 transition-colors cursor-pointer"
                onClick={() => toggleFlag(fm.key)}
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">{fm.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{fm.description}</p>
                </div>
                <div
                  className={`flex-none w-8 h-[18px] rounded-full transition-colors duration-200 relative ${
                    flags[fm.key] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-foreground transition-transform duration-200 ${
                      flags[fm.key] ? "translate-x-[16px]" : "translate-x-[2px]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <p className="text-[10px] text-muted-foreground text-center">
              Toggle flags to demo feature variations in real-time
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
