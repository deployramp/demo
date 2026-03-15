export type Priority = "urgent" | "high" | "medium" | "low" | "none";
export type Status = "backlog" | "todo" | "in-progress" | "done" | "cancelled";
export type ViewMode = "list" | "board" | "timeline";

export interface Task {
  id: string;
  key: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  labels: string[];
  project: string;
  sprint: string;
  estimate?: number;
  dueDate?: string;
  createdAt: string;
  description?: string;
}

export interface FeatureFlags {
  showPriority: boolean;
  showAvatars: boolean;
  showAiSummary: boolean;
  showTimeline: boolean;
  showBulkActions: boolean;
  showPriorityMatrix: boolean;
  showEstimates: boolean;
  showLabels: boolean;
  experimentalUI: boolean;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
  taskCount: number;
}
