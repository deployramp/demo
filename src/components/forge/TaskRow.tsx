import { motion } from "framer-motion";
import type { Task } from "@/lib/types";
import { useFlags } from "@/lib/feature-flags";
import { StatusIcon } from "./StatusIcon";
import { PriorityBadge } from "./PriorityBadge";
import { UserAvatar } from "./UserAvatar";

interface TaskRowProps {
  task: Task;
  selected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
}

export function TaskRow({ task, selected, onSelect, onOpen }: TaskRowProps) {
  const { flags } = useFlags();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.15 }}
      className={`group flex h-9 items-center border-b border-border px-4 gap-3 cursor-default select-none ${
        selected ? "bg-primary/5 border-l-2 border-l-primary" : ""
      }`}
      onClick={() => onOpen(task.id)}
    >
      {/* Checkbox */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(task.id);
        }}
        className={`flex-none w-4 h-4 rounded-sm border cursor-pointer transition-colors duration-150 flex items-center justify-center ${
          selected
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-muted-foreground/60"
        }`}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
          </svg>
        )}
      </div>

      {/* Status */}
      <StatusIcon status={task.status} />

      {/* Key */}
      <span className="flex-none text-[10px] font-mono text-muted-foreground uppercase tracking-wide w-16">
        {task.key}
      </span>

      {/* Title */}
      <span className="flex-1 truncate text-sm font-medium text-foreground">
        {task.title}
      </span>

      {/* Labels */}
      {flags.showLabels && task.labels.length > 0 && (
        <div className="hidden lg:flex items-center gap-1">
          {task.labels.slice(0, 2).map((label) => (
            <span key={label} className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Priority */}
      {task.priority !== "none" && (
        <PriorityBadge priority={task.priority} />
      )}

      {/* Estimate */}
      {task.estimate && (
        <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">
          {task.estimate}p
        </span>
      )}

      {/* Assignee */}
      {task.assignee && (
        <UserAvatar userId={task.assignee} />
      )}
    </motion.div>
  );
}
