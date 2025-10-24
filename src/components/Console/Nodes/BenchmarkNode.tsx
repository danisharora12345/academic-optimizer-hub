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
    { name: "Brunel University", keywords: 92, content: 88, schema: 85, total: 87 },
    { name: "Kingston University", keywords: 88, content: 85, schema: 80, total: 82 },
    { name: "University of Westminster", keywords: 85, content: 80, schema: 75, total: 79 },
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
        {!completed && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Analyzing competitors...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-4">
              <h4 className="font-semibold text-foreground mb-2">Weighted Scoring Methodology</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>Keyword Coverage: 25%</div>
                <div>Content Depth: 20%</div>
                <div>Schema: 15%</div>
                <div>Backlinks: 15%</div>
                <div>Technical SEO: 25%</div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Competitive Analysis (Side-by-Side Comparison):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">Competitor</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Keywords</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Content</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Schema</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-3 font-medium text-foreground">{comp.name}</td>
                        <td className="text-center py-2 px-3">{comp.keywords}</td>
                        <td className="text-center py-2 px-3">{comp.content}</td>
                        <td className="text-center py-2 px-3">{comp.schema}</td>
                        <td className="text-center py-2 px-3 font-bold text-primary">{comp.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-foreground">
                Competitor Gap Score: <span className="text-primary text-lg">82/100</span>
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Full Analysis
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
