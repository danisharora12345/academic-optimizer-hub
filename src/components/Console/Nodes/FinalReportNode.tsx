import { BarChart, FileDown, Eye, Loader2, CheckCircle2 } from "lucide-react";
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
  selectedCourse: string;
}

export const FinalReportNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled,
  selectedCourse 
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
          <div className="space-y-6 animate-fade-in">
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Workflow Complete ✓
              </h3>
              <p className="text-muted-foreground">
                {selectedCourse === "accounting" && "Accounting and Finance"}
                {selectedCourse === "cybersecurity" && "Cyber Security"}
                {selectedCourse === "fashion" && "Fashion Design"}
                {!selectedCourse && "Course"} page successfully optimized and ready for publishing
              </p>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
