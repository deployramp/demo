import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, Tag, X } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onClear: () => void;
}

export function BulkActions({ selectedCount, onClear }: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg px-4 py-2.5 flex items-center gap-3 z-50"
        >
          <span className="text-xs font-medium text-foreground">
            {selectedCount} selected
          </span>
          <div className="w-px h-4 bg-border" />
          <button onClick={() => displayFeedback("showBulkActions")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
            Move
          </button>
          <button onClick={() => displayFeedback("showBulkActions")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Tag className="w-3.5 h-3.5" />
            Label
          </button>
          <button onClick={() => displayFeedback("showBulkActions")} className="flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
          <div className="w-px h-4 bg-border" />
          <button onClick={onClear} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
