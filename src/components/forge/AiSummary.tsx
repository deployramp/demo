import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useFlags } from "@/lib/feature-flags";

export function AiSummary() {
  const { flags } = useFlags();
  if (!flags.showAiSummary) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border bg-primary/5 overflow-hidden"
    >
      <div className="px-4 py-3 flex items-start gap-3">
        <div className="flex-none w-6 h-6 rounded bg-primary/10 flex items-center justify-center mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground mb-1">AI Sprint Summary</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sprint 12 is <span className="text-foreground font-medium">68% complete</span> with 3 tasks at risk. 
            <span className="text-forge-urgent font-medium"> FOR-128</span> (Auth Middleware) is blocking 2 downstream tasks. 
            Recommend reallocating <span className="text-foreground">FOR-132</span> to next sprint to reduce scope.
            Estimated velocity: <span className="font-mono text-foreground">34 pts</span> vs planned <span className="font-mono text-foreground">42 pts</span>.
          </p>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">12ms · GPT-4</span>
      </div>
    </motion.div>
  );
}
