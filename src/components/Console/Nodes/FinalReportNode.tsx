import { BarChart, FileDown, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";

interface FinalReportNodeProps {
  nodeNumber: number;
  isActive: boolean;
  progress: number;
  completed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRun: () => void;
  enabled: boolean;
}

export const FinalReportNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: FinalReportNodeProps) => {
  const performanceData = [
    { label: "Week 1", before: 45, after: 72 },
    { label: "Week 2", before: 48, after: 78 },
    { label: "Week 3", before: 52, after: 85 },
    { label: "Week 4", before: 50, after: 88 },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Final Ranking & Scores"
      icon={BarChart}
      isActive={isActive}
      progress={progress}
      completed={completed}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        {!completed && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Generating final report...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">SEO Score</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-primary">92</p>
              <p className="text-lg text-muted-foreground">%</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
              <div className="h-full bg-primary" style={{ width: "92%" }} />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <p className="text-sm text-muted-foreground mb-1">Readability</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-success">89</p>
              <p className="text-lg text-muted-foreground">%</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
              <div className="h-full bg-success" style={{ width: "89%" }} />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
            <p className="text-sm text-muted-foreground mb-1">Engagement Lift</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-accent-foreground">+67</p>
              <p className="text-lg text-muted-foreground">%</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
              <div className="h-full bg-accent" style={{ width: "67%" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Avg Rank Improvement</p>
            <p className="text-3xl font-bold text-primary">+43%</p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Pages Optimized</p>
            <p className="text-3xl font-bold text-foreground">200</p>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <p className="text-sm font-medium text-muted-foreground mb-3">Performance Trend</p>
          <div className="flex items-end gap-2 h-32">
            {performanceData.map((item, i) => (
              <div key={i} className="flex-1 flex gap-1 items-end">
                <div
                  className="flex-1 bg-secondary rounded-t transition-all hover:bg-muted"
                  style={{ height: `${item.before}%` }}
                  title={`Before: ${item.before}`}
                />
                <div
                  className="flex-1 bg-primary rounded-t transition-all hover:bg-primary-hover"
                  style={{ height: `${item.after}%` }}
                  title={`After: ${item.after}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {performanceData.map((item, i) => (
              <span key={i}>{item.label}</span>
            ))}
          </div>
        </div>

            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-hover">
                Generate Final Report
              </Button>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
