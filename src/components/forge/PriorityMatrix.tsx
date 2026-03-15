import { useFlags } from "@/lib/feature-flags";
import type { Task } from "@/lib/types";

interface PriorityMatrixProps {
  tasks: Task[];
}

export function PriorityMatrix({ tasks }: PriorityMatrixProps) {
  const { flags } = useFlags();
  if (!flags.showPriorityMatrix) return null;

  const activeTasks = tasks.filter((t) => t.status !== "done" && t.status !== "cancelled");

  // Quadrants based on priority and estimate
  const highImpactLowEffort = activeTasks.filter((t) => ["urgent", "high"].includes(t.priority) && (t.estimate || 5) <= 5);
  const highImpactHighEffort = activeTasks.filter((t) => ["urgent", "high"].includes(t.priority) && (t.estimate || 5) > 5);
  const lowImpactLowEffort = activeTasks.filter((t) => !["urgent", "high"].includes(t.priority) && (t.estimate || 5) <= 5);
  const lowImpactHighEffort = activeTasks.filter((t) => !["urgent", "high"].includes(t.priority) && (t.estimate || 5) > 5);

  const Quadrant = ({ label, items, accent }: { label: string; items: Task[]; accent: string }) => (
    <div className="border border-border rounded p-2 flex flex-col">
      <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${accent}`}>{label}</span>
      <div className="flex-1 space-y-1">
        {items.map((t) => (
          <div key={t.id} className="text-[10px] text-muted-foreground truncate font-mono">
            {t.key} <span className="text-foreground/60">{t.title.slice(0, 25)}</span>
          </div>
        ))}
        {items.length === 0 && <span className="text-[10px] text-muted-foreground/40">Empty</span>}
      </div>
    </div>
  );

  return (
    <div className="border-b border-border bg-card/50 p-4">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Impact × Effort Matrix</p>
      <div className="grid grid-cols-2 gap-2">
        <Quadrant label="Quick Wins" items={highImpactLowEffort} accent="text-forge-low" />
        <Quadrant label="Big Bets" items={highImpactHighEffort} accent="text-forge-urgent" />
        <Quadrant label="Fill-ins" items={lowImpactLowEffort} accent="text-muted-foreground" />
        <Quadrant label="Money Pits" items={lowImpactHighEffort} accent="text-forge-high" />
      </div>
    </div>
  );
}
