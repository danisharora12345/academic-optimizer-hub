import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface OrchestrationBarProps {
  currentNode: number;
  totalNodes: number;
  onRunAll: () => void;
  isRunning: boolean;
}

export const OrchestrationBar = ({
  currentNode,
  totalNodes,
  onRunAll,
  isRunning,
}: OrchestrationBarProps) => {
  const progress = (currentNode / totalNodes) * 100;

  return (
    <div className="sticky bottom-0 z-40 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-lg">
      <div className="container px-4 py-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onRunAll}
            disabled={isRunning}
            className="bg-primary hover:bg-primary-hover text-primary-foreground gap-2 shadow-primary"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run All Nodes Sequentially"}
          </Button>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Workflow Progress
              </span>
              <span className="text-sm text-muted-foreground">
                Node {currentNode} of {totalNodes}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalNodes }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                  i < currentNode
                    ? "bg-success text-success-foreground"
                    : i === currentNode
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
