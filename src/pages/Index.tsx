import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/types";
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
import { FlagPanel } from "@/components/forge/FlagPanel";

const Index = () => {
  const [activeProject, setActiveProject] = useState("forge");
  const [view, setView] = useState<ViewMode>("list");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [flagPanelOpen, setFlagPanelOpen] = useState(false);
  const { flags } = useFlags();

  const projectTasks = useMemo(
    () => allTasks.filter((t) => t.project === activeProject),
    [activeProject]
  );

  const project = projects.find((p) => p.id === activeProject);
  const openTask = openTaskId ? allTasks.find((t) => t.id === openTaskId) : null;
  const currentSprint = projectTasks[0]?.sprint || "Sprint 12";

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
        tasks: projectTasks.filter((t) => t.status === status),
      }))
      .filter((g) => g.tasks.length > 0);
  }, [projectTasks]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <AppSidebar
        activeProject={activeProject}
        onProjectChange={setActiveProject}
        onOpenFlags={() => setFlagPanelOpen(true)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <MetaBar
          view={view}
          onViewChange={setView}
          projectName={project?.name || ""}
          sprint={currentSprint}
          taskCount={projectTasks.length}
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

        {view === "board" && <BoardView tasks={projectTasks} onOpen={setOpenTaskId} />}

        {view === "timeline" && flags.showTimeline && (
          <TimelineView tasks={projectTasks} onOpen={setOpenTaskId} />
        )}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {openTask && <TaskDetail task={openTask} onClose={() => setOpenTaskId(null)} />}
      </AnimatePresence>

      {/* Bulk Actions */}
      <BulkActions selectedCount={selectedIds.size} onClear={() => setSelectedIds(new Set())} />

      {/* Flag Panel */}
      <FlagPanel open={flagPanelOpen} onClose={() => setFlagPanelOpen(false)} />
    </div>
  );
};

export default Index;
