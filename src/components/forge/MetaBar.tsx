import { useRef, useEffect, useState } from "react";
import { List, Columns, Search, X, ArrowUpDown, Check } from "lucide-react";
import type { ViewMode, SortOption } from "@/lib/types";
import { useFlags } from "@/lib/feature-flags";
import { displayFeedback } from "@deployramp/sdk";
import { AvatarStack } from "./UserAvatar";

interface MetaBarProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  projectName: string;
  sprint: string;
  taskCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "manual", label: "Manual" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due date" },
  { value: "title", label: "Title" },
  { value: "created", label: "Created" },
];

const viewOptions: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: "list", icon: <List className="w-3.5 h-3.5" />, label: "List" },
  { mode: "board", icon: <Columns className="w-3.5 h-3.5" />, label: "Board" },
];

export function MetaBar({ view, onViewChange, projectName, sprint, taskCount, searchQuery, onSearchChange, sortBy, onSortChange }: MetaBarProps) {
  const { flags } = useFlags();
  const searchRef = useRef<HTMLInputElement>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

      {/* Sort */}
      {flags.taskSorting && (
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen((o) => !o)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              sortBy !== "manual"
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortBy !== "manual" && (
              <span>{sortOptions.find((o) => o.value === sortBy)?.label}</span>
            )}
          </button>
          {sortOpen && (
            <div className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-md shadow-md py-1 z-50 min-w-[140px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    setSortOpen(false);
                    if (opt.value !== "manual") setTimeout(() => displayFeedback("task-sorting"), 3000);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                    sortBy === opt.value
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Check className={`w-3 h-3 ${sortBy === opt.value ? "opacity-100" : "opacity-0"}`} />
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
