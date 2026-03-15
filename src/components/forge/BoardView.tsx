import type { Task, Status } from "@/lib/types";
import { StatusIcon } from "./StatusIcon";
import { PriorityBadge } from "./PriorityBadge";
import { UserAvatar } from "./UserAvatar";
import { useFlags } from "@/lib/feature-flags";

const columns: { status: Status; label: string }[] = [
  { status: "backlog", label: "Backlog" },
  { status: "todo", label: "To Do" },
  { status: "in-progress", label: "In Progress" },
  { status: "done", label: "Done" },
];

interface BoardViewProps {
  tasks: Task[];
  onOpen: (id: string) => void;
}

export function BoardView({ tasks, onOpen }: BoardViewProps) {
  const { flags } = useFlags();

  return (
    <div className="flex-1 overflow-x-auto custom-scrollbar p-4">
      <div className="flex gap-3 min-w-max h-full">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="w-64 flex flex-col">
              <div className="flex items-center gap-2 px-2 py-2 mb-2">
                <StatusIcon status={col.status} size="md" />
                <span className="text-xs font-semibold text-foreground">{col.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">{colTasks.length}</span>
              </div>
              <div className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onOpen(task.id)}
                    className="bg-card border border-border rounded p-3 cursor-pointer hover:border-muted-foreground/30 transition-colors duration-150 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-muted-foreground">{task.key}</span>
                      {flags.showPriority && task.priority !== "none" && (
                        <PriorityBadge priority={task.priority} />
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">{task.title}</p>
                    <div className="flex items-center gap-2">
                      {flags.showLabels && task.labels.slice(0, 1).map((l) => (
                        <span key={l} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{l}</span>
                      ))}
                      <span className="flex-1" />
                      {flags.showEstimates && task.estimate && (
                        <span className="text-[10px] font-mono text-muted-foreground">{task.estimate}p</span>
                      )}
                      {flags.showAvatars && task.assignee && <UserAvatar userId={task.assignee} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
