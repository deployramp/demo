import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Returns 'overdue' | 'soon' | 'normal' | null for a yyyy-mm-dd due date string. */
export function getDueDateStatus(dueDate: string | undefined, taskStatus: string): "overdue" | "soon" | "normal" | null {
  if (!dueDate || taskStatus === "done" || taskStatus === "cancelled") return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "overdue";
  if (diffDays <= 3) return "soon";
  return "normal";
}
