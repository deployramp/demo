import { useMemo } from "react";
import type { Task } from "@/lib/types";
import { StatusIcon } from "./StatusIcon";
import { useFlags } from "@/lib/feature-flags";

interface TimelineViewProps {
  tasks: Task[];
  onOpen: (id: string) => void;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const NUM_WEEKS = 4;

function getMondayOf(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeek(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TimelineView({ tasks, onOpen }: TimelineViewProps) {
  const { flags } = useFlags();
  const timelineTasks = tasks.filter((t) => t.dueDate);

  const { weeks, weekStarts } = useMemo(() => {
    const dueDates = timelineTasks.map((t) => new Date(t.dueDate!).getTime());
    const earliest = dueDates.length > 0 ? Math.min(...dueDates) : Date.now();
    const anchor = getMondayOf(new Date(earliest));
    const starts = Array.from({ length: NUM_WEEKS }, (_, i) => new Date(anchor.getTime() + i * WEEK_MS));
    return { weeks: starts.map(formatWeek), weekStarts: starts };
  }, [timelineTasks]);

  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      {/* Week headers */}
      <div className="flex border-b border-border sticky top-0 bg-background z-10">
        <div className="w-64 flex-none px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Task
        </div>
        {weeks.map((w) => (
          <div key={w} className="flex-1 min-w-[120px] px-2 py-2 text-[10px] font-mono text-muted-foreground border-l border-border">
            {w}
          </div>
        ))}
      </div>

      {/* Rows */}
      {timelineTasks.map((task) => {
        const dueMs = new Date(task.dueDate!).getTime();
        const weekIdx = Math.max(0, Math.min(NUM_WEEKS - 1,
          weekStarts.findIndex((ws, i) => {
            const next = weekStarts[i + 1];
            return dueMs >= ws.getTime() && (!next || dueMs < next.getTime());
          })
        ));
        const barWidth = (task.estimate || 3) * 8;
        return (
          <div
            key={task.id}
            onClick={() => onOpen(task.id)}
            className="flex items-center border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
          >
            <div className="w-64 flex-none flex items-center gap-2 px-4 py-2">
              <StatusIcon status={task.status} />
              <span className="text-[10px] font-mono text-muted-foreground">{task.key}</span>
              <span className="text-xs text-foreground truncate">{task.title}</span>
            </div>
            {weeks.map((w, i) => (
              <div key={w} className="flex-1 min-w-[120px] px-1 py-2 border-l border-border relative">
                {i === weekIdx && (
                  <div
                    className="h-5 rounded-sm bg-primary/20 border border-primary/30 flex items-center px-1.5"
                    style={{ width: Math.min(barWidth, 100) + "%" }}
                  >
                    {flags.showEstimates && (
                      <span className="text-[9px] font-mono text-primary">{task.estimate}p</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
