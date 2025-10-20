import { useState } from "react";
import { Upload, Calendar, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const PublishingNode = ({ nodeNumber, isActive, progress }: any) => {
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    toast.success("Publishing started");
    setTimeout(() => {
      setPublishing(false);
      toast.success("Content published successfully");
    }, 3000);
  };

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Publishing / Sync Status"
      icon={Upload}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
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
          <div className="flex-1 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-accent/30 flex items-center justify-center">
                <span className="text-sm font-bold text-accent-foreground">SC</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Sitecore</p>
                <Badge variant="outline" className="mt-1">Connected</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Publishing Status</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-success transition-all" style={{ width: "33%" }} />
            </div>
            <Badge>Draft</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3">
            <div>
              <p className="text-muted-foreground">Draft</p>
              <p className="font-semibold text-foreground">45 pages</p>
            </div>
            <div>
              <p className="text-muted-foreground">Review</p>
              <p className="font-semibold text-warning">12 pages</p>
            </div>
            <div>
              <p className="text-muted-foreground">Published</p>
              <p className="font-semibold text-success">143 pages</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            {publishing ? "Publishing..." : "Publish Now"}
          </Button>
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
    </WorkflowNode>
  );
};
