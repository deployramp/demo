import type { Task } from "@/lib/types";

export function StatsBar({ tasks }: { tasks: Task[] }) {
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const totalPts = tasks.reduce((s, t) => s + (t.estimate || 0), 0);
  const donePts = tasks.filter((t) => t.status === "done").reduce((s, t) => s + (t.estimate || 0), 0);

  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-border text-[10px] font-mono text-muted-foreground">
      <span>
        <span className="text-foreground font-semibold">{pct}%</span> Complete
      </span>
      <span>
        <span className="text-forge-in-progress">{inProgress}</span> In Progress
      </span>
      <span>
        <span className="text-forge-done">{done}</span>/{total} Tasks
      </span>
      <span>
        <span className="text-foreground">{donePts}</span>/{totalPts} pts
      </span>
      {/* Progress bar */}
      <div className="flex-1 max-w-32 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
