import { List, Columns, GanttChart, Search, Plus } from "lucide-react";
import type { ViewMode } from "@/lib/types";
import { useFlags } from "@/lib/feature-flags";
import { AvatarStack } from "./UserAvatar";

interface MetaBarProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  projectName: string;
  sprint: string;
  taskCount: number;
}

const viewOptions: { mode: ViewMode; icon: React.ReactNode; label: string; flagKey?: string }[] = [
  { mode: "list", icon: <List className="w-3.5 h-3.5" />, label: "List" },
  { mode: "board", icon: <Columns className="w-3.5 h-3.5" />, label: "Board" },
  { mode: "timeline", icon: <GanttChart className="w-3.5 h-3.5" />, label: "Timeline", flagKey: "showTimeline" },
];

export function MetaBar({ view, onViewChange, projectName, sprint, taskCount }: MetaBarProps) {
  const { flags } = useFlags();

  return (
    <div className="h-12 border-b border-border flex items-center px-4 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="font-semibold text-foreground tracking-tight">{projectName}</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">{sprint}</span>
      </div>

      <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
        {taskCount} tasks
      </span>

      {/* Search */}
      <div className="ml-auto flex items-center gap-1 bg-secondary rounded px-2 py-1">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks…"
          className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32"
        />
        <kbd className="text-[9px] text-muted-foreground bg-background px-1 rounded">⌘K</kbd>
      </div>

      {/* View Switcher */}
      <div className="flex items-center bg-secondary rounded p-0.5 gap-0.5">
        {viewOptions.map((opt) => {
          if (opt.flagKey && !flags[opt.flagKey as keyof typeof flags]) return null;
          return (
            <button
              key={opt.mode}
              onClick={() => onViewChange(opt.mode)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors duration-150 ${
                view === opt.mode
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Presence */}
      {flags.showAvatars && <AvatarStack userIds={["u1", "u2", "u3"]} />}

      <button className="flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 rounded text-xs font-medium hover:bg-primary/90 transition-colors">
        <Plus className="w-3.5 h-3.5" />
        New
      </button>
    </div>
  );
}
