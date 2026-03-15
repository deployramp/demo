import type { Status } from "@/lib/types";

const statusConfig: Record<Status, { color: string; icon: string }> = {
  backlog: { color: "text-forge-backlog", icon: "◯" },
  todo: { color: "text-forge-todo", icon: "○" },
  "in-progress": { color: "text-forge-in-progress", icon: "◑" },
  done: { color: "text-forge-done", icon: "●" },
  cancelled: { color: "text-forge-cancelled", icon: "⊘" },
};

export function StatusIcon({ status, size = "sm" }: { status: Status; size?: "sm" | "md" }) {
  const config = statusConfig[status];
  const sizeClass = size === "md" ? "text-sm" : "text-[11px]";
  return <span className={`${config.color} ${sizeClass} leading-none`}>{config.icon}</span>;
}
