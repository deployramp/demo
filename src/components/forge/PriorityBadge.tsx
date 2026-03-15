import type { Priority } from "@/lib/types";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  urgent: { label: "URGENT", className: "bg-forge-urgent/10 text-forge-urgent" },
  high: { label: "HIGH", className: "bg-forge-high/10 text-forge-high" },
  medium: { label: "MED", className: "bg-forge-medium/10 text-forge-medium" },
  low: { label: "LOW", className: "bg-forge-low/10 text-forge-low" },
  none: { label: "—", className: "bg-muted text-muted-foreground" },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide ${config.className}`}>
      {config.label}
    </span>
  );
}
