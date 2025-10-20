import { BarChart3, Eye, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";

interface BenchmarkNodeProps {
  nodeNumber: number;
  isActive: boolean;
  progress: number;
  completed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRun: () => void;
  enabled: boolean;
}

export const BenchmarkNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: BenchmarkNodeProps) => {

  const competitors = [
    { rank: 1, name: "University of London" },
    { rank: 2, name: "The London School of Economics and Political Science" },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Competitive Benchmarking"
      icon={BarChart3}
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
              {enabled ? "Analyze competitors in the market" : "Complete Node 1 first"}
            </p>
            <Button onClick={onRun} disabled={!enabled || isActive}>
              {isActive ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Node 2"
              )}
            </Button>
          </div>
        )}

        {isActive && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Analyzing competitors...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Top Competitors</p>
          {competitors.map((comp, i) => (
            <div key={i} className="p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">#{comp.rank}</span>
                </div>
                <span className="font-medium text-foreground">{comp.name}</span>
              </div>
            </div>
          ))}
        </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Insights
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
