import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { flag } from "@deployramp/sdk";
import type { ViewMode, SortOption } from "@/lib/types";
import { tasks as allTasks, projects } from "@/lib/mock-data";
import { AppSidebar } from "@/components/forge/AppSidebar";
import { MetaBar } from "@/components/forge/MetaBar";
import { StatsBar } from "@/components/forge/StatsBar";
import { TaskRow } from "@/components/forge/TaskRow";
import { BoardView } from "@/components/forge/BoardView";
import { TaskDetail } from "@/components/forge/TaskDetail";

const Index = () => {
  const sortingEnabled = flag('task-sorting');
  const [activeProject, setActiveProject] = useState("forge");
  const [view, setView] = useState<ViewMode>("list");
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("manual");

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
    if (!sortingEnabled || sortBy === "manual") return filteredTasks;
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
  }, [filteredTasks, sortBy, sortingEnabled]);

  const project = projects.find((p) => p.id === activeProject);
  const openTask = openTaskId ? allTasks.find((t) => t.id === openTaskId) : null;
  const currentSprint = activeProject === "all" ? "All Projects" : (projectTasks[0]?.sprint || "Sprint 12");

  // Group tasks by status for list view
  const statusGroups = useMemo(() => {
    const order = ["in-progress", "todo", "backlog", "done", "cancelled"] as const;
    const tasksToUse = sortingEnabled ? sortedTasks : filteredTasks;
    return order
      .map((status) => ({
        status,
        tasks: tasksToUse.filter((t) => t.status === status),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [sortedTasks, filteredTasks, sortingEnabled]);

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
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <StatsBar tasks={projectTasks} />

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
                    onOpen={setOpenTaskId}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {view === "board" && <BoardView tasks={sortingEnabled ? sortedTasks : filteredTasks} onOpen={setOpenTaskId} />}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {openTask && <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} />}
      </AnimatePresence>

    </div>
  );
};

export default Index;
