import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface WorkflowNodeProps {
  nodeNumber: number;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isExpanded?: boolean;
  isActive?: boolean;
  progress?: number;
}

export const WorkflowNode = ({
  nodeNumber,
  title,
  icon: Icon,
  children,
  isExpanded = true,
  isActive = false,
  progress = 0,
}: WorkflowNodeProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-md",
        isActive && "ring-2 ring-primary shadow-primary",
        !expanded && "cursor-pointer"
      )}
      onClick={() => !expanded && setExpanded(true)}
    >
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-all",
              isActive
                ? "bg-primary text-primary-foreground animate-pulse-glow"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Node {nodeNumber}
              </span>
              {progress > 0 && progress < 100 && (
                <span className="text-xs text-primary font-semibold">
                  {progress}%
                </span>
              )}
              {progress === 100 && (
                <span className="text-xs text-success font-semibold">
                  ✓ Complete
                </span>
              )}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
        {progress > 0 && (
          <Progress value={progress} className="mt-3 h-2" />
        )}
      </CardHeader>
      {expanded && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
};
