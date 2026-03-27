import { motion } from "framer-motion";
import type { Task } from "@/lib/types";
import { useFlags } from "@/lib/feature-flags";
import { StatusIcon } from "./StatusIcon";
import { PriorityBadge } from "./PriorityBadge";
import { UserAvatar } from "./UserAvatar";

interface TaskRowProps {
  task: Task;
  onOpen: (id: string) => void;
}

export function TaskRow({ task, onOpen }: TaskRowProps) {
  const { flags } = useFlags();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.15 }}
      className="group flex h-9 items-center border-b border-border px-4 gap-3 cursor-default select-none"
      onClick={() => onOpen(task.id)}
    >
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
