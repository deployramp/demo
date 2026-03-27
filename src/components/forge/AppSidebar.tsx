import { LayoutGrid } from "lucide-react";
import { projects } from "@/lib/mock-data";

interface AppSidebarProps {
  activeProject: string;
  onProjectChange: (id: string) => void;
}

export function AppSidebar({ activeProject, onProjectChange }: AppSidebarProps) {
  return (
    <aside className="w-60 h-screen border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="h-12 flex items-center px-4 border-b border-border gap-2">
        <img src="/favicon.svg" alt="Forge" className="w-5 h-5" />
        <span className="text-sm font-semibold text-foreground tracking-tight">Forge</span>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground">v2.4.0-β</span>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
        <div className="px-3 mb-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Projects</span>
        </div>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onProjectChange(p.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors duration-150 ${
              activeProject === p.id
                ? "bg-secondary text-foreground"
                : "text-sidebar-foreground hover:bg-secondary/50"
            }`}
          >
            <span className="text-base">{p.icon}</span>
            <span className="flex-1 text-left truncate">{p.name}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{p.taskCount}</span>
          </button>
        ))}

        <div className="px-3 mt-4 mb-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Views</span>
        </div>
        <button
          onClick={() => onProjectChange("all")}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors duration-150 ${
            activeProject === "all"
              ? "bg-secondary text-foreground"
              : "text-sidebar-foreground hover:bg-secondary/50"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>All Tasks</span>
        </button>
      </div>

    </aside>
  );
}
