import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface WorkflowNodeProps {
  nodeNumber: number;
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  progress: number;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  completed: boolean;
}

export const WorkflowNode = ({
  nodeNumber,
  title,
  icon: Icon,
  isActive,
  progress,
  children,
  isExpanded,
  onToggle,
  completed,
}: WorkflowNodeProps) => {
  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div
        className={cn(
          "rounded-xl border-2 bg-card transition-all duration-300",
          isActive
            ? "border-primary shadow-lg shadow-primary/20"
            : completed
            ? "border-success/50"
            : "border-border hover:border-primary/50"
        )}
      >
        <CollapsibleTrigger className="w-full p-6 text-left">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : completed
                  ? "bg-success text-success-foreground"
                  : "bg-secondary"
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Node {nodeNumber}
                </span>
                {isActive && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
                {completed && !isActive && (
                  <span className="text-xs text-success font-medium">✓ Completed</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                isExpanded && "transform rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6">
            {isActive && progress > 0 && progress < 100 && (
              <div className="mb-4 space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">Processing... {Math.round(progress)}%</p>
              </div>
            )}
            <div className={completed ? "animate-fade-in" : ""}>
              {children}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
