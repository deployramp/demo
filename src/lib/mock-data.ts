import type { Task, Project } from "./types";

export const projects: Project[] = [
  { id: "forge", name: "Lightning", icon: "⚡", taskCount: 24 },
  { id: "atlas", name: "Atlas", icon: "🗺️", taskCount: 18 },
  { id: "nebula", name: "Nebula", icon: "🌀", taskCount: 12 },
];

export const users = [
  { id: "u1", name: "Sarah Chen", initials: "SC", color: "hsl(217 91% 60%)" },
  { id: "u2", name: "Alex Petrov", initials: "AP", color: "hsl(142 71% 45%)" },
  { id: "u3", name: "Maya Johnson", initials: "MJ", color: "hsl(36 100% 50%)" },
  { id: "u4", name: "James Liu", initials: "JL", color: "hsl(0 84% 60%)" },
];

export const tasks: Task[] = [
  { id: "1", key: "LIG-128", title: "Refactor Auth Middleware", status: "in-progress", priority: "urgent", assignee: "u1", labels: ["backend", "security"], project: "forge", sprint: "Sprint 12", estimate: 8, dueDate: "2026-03-18", createdAt: "2026-03-01", description: "Migrate from JWT to session-based auth with Redis backing store." },
  { id: "2", key: "LIG-129", title: "Implement Rate Limiting on API Gateway", status: "todo", priority: "high", assignee: "u2", labels: ["backend", "infra"], project: "forge", sprint: "Sprint 12", estimate: 5, dueDate: "2026-03-20", createdAt: "2026-03-02" },
  { id: "3", key: "LIG-130", title: "Design Token System Migration", status: "in-progress", priority: "medium", assignee: "u3", labels: ["frontend", "design-system"], project: "forge", sprint: "Sprint 12", estimate: 13, dueDate: "2026-03-22", createdAt: "2026-03-03" },
  { id: "4", key: "LIG-131", title: "WebSocket Connection Pool Optimization", status: "backlog", priority: "medium", labels: ["backend", "performance"], project: "forge", sprint: "Sprint 13", estimate: 8, createdAt: "2026-03-04" },
  { id: "5", key: "LIG-132", title: "Add E2E Tests for Onboarding Flow", status: "todo", priority: "low", assignee: "u4", labels: ["testing", "frontend"], project: "forge", sprint: "Sprint 12", estimate: 3, dueDate: "2026-03-19", createdAt: "2026-03-05" },
  { id: "6", key: "LIG-133", title: "Migrate to Edge Functions", status: "done", priority: "high", assignee: "u1", labels: ["backend", "infra"], project: "forge", sprint: "Sprint 11", estimate: 13, createdAt: "2026-02-20" },
  { id: "7", key: "LIG-134", title: "Implement Dark Mode Toggle", status: "done", priority: "low", assignee: "u3", labels: ["frontend"], project: "forge", sprint: "Sprint 11", estimate: 2, createdAt: "2026-02-21" },
  { id: "8", key: "LIG-135", title: "Database Index Optimization", status: "in-progress", priority: "high", assignee: "u2", labels: ["backend", "performance"], project: "forge", sprint: "Sprint 12", estimate: 5, dueDate: "2026-03-17", createdAt: "2026-03-06" },
  { id: "9", key: "LIG-136", title: "GraphQL Schema Stitching", status: "backlog", priority: "medium", labels: ["backend", "api"], project: "forge", sprint: "Sprint 13", estimate: 8, createdAt: "2026-03-07" },
  { id: "10", key: "LIG-137", title: "Feature Flag SDK Integration", status: "todo", priority: "urgent", assignee: "u1", labels: ["frontend", "sdk"], project: "forge", sprint: "Sprint 12", estimate: 5, dueDate: "2026-03-16", createdAt: "2026-03-08" },
  { id: "11", key: "LIG-138", title: "Audit Logging System", status: "todo", priority: "medium", assignee: "u4", labels: ["backend", "compliance"], project: "forge", sprint: "Sprint 12", estimate: 8, dueDate: "2026-03-21", createdAt: "2026-03-09" },
  { id: "12", key: "LIG-139", title: "CI/CD Pipeline Caching", status: "done", priority: "medium", labels: ["devops"], project: "forge", sprint: "Sprint 11", estimate: 3, createdAt: "2026-02-22" },
  { id: "13", key: "LIG-140", title: "SSO with SAML Provider", status: "backlog", priority: "high", labels: ["backend", "security"], project: "forge", sprint: "Sprint 13", estimate: 13, createdAt: "2026-03-10" },
  { id: "14", key: "LIG-141", title: "Real-time Collaboration Cursors", status: "backlog", priority: "low", labels: ["frontend", "experimental"], project: "forge", sprint: "Sprint 14", estimate: 21, createdAt: "2026-03-11" },
  { id: "15", key: "LIG-142", title: "Webhook Retry Logic", status: "cancelled", priority: "medium", assignee: "u2", labels: ["backend"], project: "forge", sprint: "Sprint 11", estimate: 3, createdAt: "2026-02-25" },
  { id: "16", key: "ATL-001", title: "Map Tile Caching Layer", status: "in-progress", priority: "high", assignee: "u2", labels: ["backend", "geo"], project: "atlas", sprint: "Sprint 8", estimate: 8, createdAt: "2026-03-01" },
  { id: "17", key: "ATL-002", title: "Geofence Alert System", status: "todo", priority: "medium", assignee: "u4", labels: ["backend", "notifications"], project: "atlas", sprint: "Sprint 8", estimate: 5, createdAt: "2026-03-02" },
  { id: "18", key: "NEB-001", title: "Particle System Renderer", status: "in-progress", priority: "medium", assignee: "u3", labels: ["frontend", "webgl"], project: "nebula", sprint: "Sprint 3", estimate: 13, createdAt: "2026-03-05" },
];
