import { X } from "lucide-react";
import { motion } from "framer-motion";
import type { Task } from "@/lib/types";
import { StatusIcon } from "./StatusIcon";
import { PriorityBadge } from "./PriorityBadge";
import { UserAvatar } from "./UserAvatar";
import { useFlags } from "@/lib/feature-flags";

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const { flags } = useFlags();

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-[400px] h-screen border-l border-border bg-card flex flex-col"
    >
      {/* Header */}
      <div className="h-12 flex items-center px-4 border-b border-border gap-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase">{task.key}</span>
        <span className="flex-1" />
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Title */}
        <h2 className="text-base font-semibold text-foreground tracking-tight">{task.title}</h2>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground block mb-1">Status</span>
            <div className="flex items-center gap-1.5">
              <StatusIcon status={task.status} />
              <span className="text-foreground capitalize">{task.status}</span>
            </div>
          </div>
          {flags.showPriority && (
            <div>
              <span className="text-muted-foreground block mb-1">Priority</span>
              <PriorityBadge priority={task.priority} />
            </div>
          )}
          <div>
            <span className="text-muted-foreground block mb-1">Assignee</span>
            {task.assignee ? (
              <div className="flex items-center gap-1.5">
                <UserAvatar userId={task.assignee} />
              </div>
            ) : (
              <span className="text-muted-foreground">Unassigned</span>
            )}
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Estimate</span>
            <span className="font-mono text-foreground">{task.estimate ?? "—"} pts</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Sprint</span>
            <span className="text-foreground">{task.sprint}</span>
          </div>
          {task.dueDate && (
            <div>
              <span className="text-muted-foreground block mb-1">Due</span>
              <span className="text-foreground font-mono">{task.dueDate}</span>
            </div>
          )}
        </div>

        {/* Labels */}
        {flags.showLabels && task.labels.length > 0 && (
          <div>
            <span className="text-xs text-muted-foreground block mb-1.5">Labels</span>
            <div className="flex flex-wrap gap-1.5">
              {task.labels.map((l) => (
                <span key={l} className="px-2 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {task.description && (
          <div>
            <span className="text-xs text-muted-foreground block mb-1.5">Description</span>
            <p className="text-xs text-foreground/80 leading-relaxed">{task.description}</p>
          </div>
        )}

        {/* Activity placeholder */}
        <div>
          <span className="text-xs text-muted-foreground block mb-1.5">Activity</span>
          <div className="text-xs text-muted-foreground/60 py-4 text-center">No activity yet</div>
        </div>
      </div>
    </motion.div>
  );
}
