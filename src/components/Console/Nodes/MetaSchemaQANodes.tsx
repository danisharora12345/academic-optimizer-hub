import { FileText, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowNode } from "../WorkflowNode";

interface NodeProps {
  nodeNumber: number;
  isActive: boolean;
  progress: number;
  completed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRun: () => void;
  enabled: boolean;
}

export const MetaAgentNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: NodeProps) => {
  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Metadata Generation"
      icon={FileText}
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
            <p className="text-muted-foreground">Generating metadata...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm font-medium text-muted-foreground mb-2">Meta Title</p>
                <p className="text-sm text-foreground">BA (Hons) Accounting and Financial Management – University of West London</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm font-medium text-muted-foreground mb-2">Meta Description</p>
                <p className="text-sm text-foreground">Empower your global career with a BA (Hons) Accounting and Finance degree in London. Accredited for ACCA, CIMA, and ICAEW exemptions.</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm font-medium text-muted-foreground mb-2">Meta Keywords</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Accounting degree London", "BSc Accounting and Finance", "Professional accounting qualification", "Global career finance"].map((keyword, i) => (
                    <Badge key={i} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-hover">
                Update Metadata
              </Button>
              <Button variant="outline">View All Meta Tags</Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};

export const QAAgentNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: NodeProps) => {
  const qaResults = [
    { metric: "Readability", score: 89, status: "success" },
    { metric: "SEO Compliance", score: 94, status: "success" },
    { metric: "Content Quality", score: 91, status: "success" },
    { metric: "Mobile Friendly", score: 88, status: "success" },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="QA Checks"
      icon={CheckCircle2}
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
            <p className="text-muted-foreground">Running QA checks...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-muted-foreground font-medium">Metric</th>
                    <th className="text-center p-2 text-muted-foreground font-medium">Score</th>
                    <th className="text-right p-2 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {qaResults.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-secondary/50">
                      <td className="p-2 text-foreground">{row.metric}</td>
                      <td className="p-2 text-center font-semibold text-primary">{row.score}%</td>
                      <td className="p-2 text-right">
                        <Badge variant="default" className="bg-success">
                          {row.status === "success" ? "✓ Pass" : "✗ Fail"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-xs text-foreground">⚠ Minor issues: 2 pages need image alt text optimization</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-hover">
                Re-run QA Checks
              </Button>
              <Button variant="outline">Export QA Report</Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
