import { useRef, useEffect } from "react";
import { List, Columns, Search, X } from "lucide-react";
import type { ViewMode } from "@/lib/types";
import { AvatarStack } from "./UserAvatar";

interface MetaBarProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  projectName: string;
  sprint: string;
  taskCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const viewOptions: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: "list", icon: <List className="w-3.5 h-3.5" />, label: "List" },
  { mode: "board", icon: <Columns className="w-3.5 h-3.5" />, label: "Board" },
];

export function MetaBar({ view, onViewChange, projectName, sprint, taskCount, searchQuery, onSearchChange }: MetaBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        onSearchChange("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSearchChange]);

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
      <div className={`ml-auto flex items-center gap-1 rounded px-2 py-1 transition-colors ${searchQuery ? "bg-primary/10 ring-1 ring-primary/30" : "bg-secondary"}`}>
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32"
        />
        {searchQuery ? (
          <button onClick={() => { onSearchChange(""); searchRef.current?.focus(); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-3 h-3" />
          </button>
        ) : (
          <kbd className="text-[9px] text-muted-foreground bg-background px-1 rounded">⌘K</kbd>
        )}
      </div>

      {/* View Switcher */}
      <div className="flex items-center bg-secondary rounded p-0.5 gap-0.5">
        {viewOptions.map((opt) => (
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
        ))}
      </div>

      {/* Presence */}
      <AvatarStack userIds={["u1", "u2", "u3"]} />

    </div>
  );
}
