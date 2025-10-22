import { Upload, Calendar, History, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { Badge } from "@/components/ui/badge";

interface PublishingNodeProps {
  nodeNumber: number;
  isActive: boolean;
  progress: number;
  completed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRun: () => void;
  enabled: boolean;
}

export const PublishingNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: PublishingNodeProps) => {
  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Publishing / Sync Status"
      icon={Upload}
      isActive={isActive}
      progress={progress}
      completed={completed}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        {!completed && !isActive && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {enabled ? "Publish optimized content to your CMS" : "Complete Node 3 first"}
            </p>
            <Button onClick={onRun} disabled={!enabled || isActive}>
              {isActive ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Run Node 4"
              )}
            </Button>
          </div>
        )}

        {isActive && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Publishing content...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">WP</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">WordPress</p>
                  <Badge variant="outline" className="mt-1">Connected</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Publish
              </Button>
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" />
                Version History
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
