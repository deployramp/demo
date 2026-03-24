import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import type { ViewMode, SortOption } from "@/lib/types";
import { tasks as allTasks } from "@/lib/mock-data";
import { projects } from "@/lib/mock-data";
import { useFlags } from "@/lib/feature-flags";
import { AppSidebar } from "@/components/forge/AppSidebar";
import { MetaBar } from "@/components/forge/MetaBar";
import { AiSummary } from "@/components/forge/AiSummary";
import { StatsBar } from "@/components/forge/StatsBar";
import { PriorityMatrix } from "@/components/forge/PriorityMatrix";
import { TaskRow } from "@/components/forge/TaskRow";
import { BoardView } from "@/components/forge/BoardView";
import { TimelineView } from "@/components/forge/TimelineView";
import { TaskDetail } from "@/components/forge/TaskDetail";
import { BulkActions } from "@/components/forge/BulkActions";

const Index = () => {
  const [activeProject, setActiveProject] = useState("forge");
  const [view, setView] = useState<ViewMode>("list");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("manual");
  const { flags } = useFlags();

  // Feature flag: task-sorting
  const enableTaskSorting = flags.taskSorting;

  const projectTasks = useMemo(
    () => activeProject === "all" ? allTasks : allTasks.filter((t) => t.project === activeProject),
    [activeProject]
  );

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return projectTasks;
    const q = searchQuery.toLowerCase();
    return projectTasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.key.toLowerCase().includes(q) ||
        t.labels.some((l) => l.toLowerCase().includes(q)) ||
        t.description?.toLowerCase().includes(q)
    );
  }, [projectTasks, searchQuery]);

  const sortedTasks = useMemo(() => {
    if (!enableTaskSorting || sortBy === "manual") return filteredTasks;
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3, none: 4 };
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "dueDate": {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [filteredTasks, sortBy, enableTaskSorting]);

  const project = projects.find((p) => p.id === activeProject);
  const openTask = openTaskId ? allTasks.find((t) => t.id === openTaskId) : null;
  const currentSprint = activeProject === "all" ? "All Projects" : (projectTasks[0]?.sprint || "Sprint 12");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Group tasks by status for list view
  const statusGroups = useMemo(() => {
    const order = ["in-progress", "todo", "backlog", "done", "cancelled"] as const;
    return order
      .map((status) => ({
        status,
        tasks: sortedTasks.filter((t) => t.status === status),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [sortedTasks]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <AppSidebar
        activeProject={activeProject}
        onProjectChange={setActiveProject}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <MetaBar
          view={view}
          onViewChange={setView}
          projectName={activeProject === "all" ? "All Tasks" : (project?.name || "")}
          sprint={currentSprint}
          taskCount={filteredTasks.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={enableTaskSorting ? sortBy : "manual"}
          onSortChange={setSortBy}
        />

        <AiSummary />
        <StatsBar tasks={projectTasks} />
        <PriorityMatrix tasks={projectTasks} />

        {/* Content */}
        {view === "list" && (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {statusGroups.map((group) => (
              <div key={group.status}>
                <div className="px-4 py-1.5 bg-background sticky top-0 z-10 flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest capitalize">
                    {group.status}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{group.tasks.length}</span>
                </div>
                {group.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    selected={selectedIds.has(task.id)}
                    onSelect={toggleSelect}
                    onOpen={setOpenTaskId}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {view === "board" && <BoardView tasks={sortedTasks} onOpen={setOpenTaskId} />}

        {view === "timeline" && flags.showTimeline && (
          <TimelineView tasks={sortedTasks} onOpen={setOpenTaskId} />
        )}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {openTask && <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} />}
      </AnimatePresence>

      {/* Bulk Actions */}
      <BulkActions selectedCount={selectedIds.size} onClear={() => setSelectedIds(new Set())} />

    </div>
  );
};

export default Index;
