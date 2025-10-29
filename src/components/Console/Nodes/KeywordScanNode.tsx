import { Search, FileDown, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowNode } from "../WorkflowNode";

interface KeywordScanNodeProps {
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

export const KeywordScanNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled,
  selectedCourse 
}: KeywordScanNodeProps) => {

  const mustHaveKeywords = [
    "Accounting and finance degree London",
    "BSc Accounting and Finance",
    "BA Accounting and Finance London",
    "Study accounting in London",
    "Accounting and Finance course UK",
    "Financial management course London",
    "Undergraduate accounting courses UK",
    "ACCREDITED by ACCA/CIMA/CIPFA/ICAEW",
    "Professional accounting qualification",
    "Global career in finance",
    "London university accounting program",
    "Entry requirements accounting finance"
  ];

  const trendingKeywords = [
    "FinTech",
    "Forensic accounting",
    "Sustainable finance",
    "ESG finance",
    "Investment banking course London",
    "Data analytics in accounting",
    "Digital accounting degree London",
    "Accounting and financial analysis",
    "Taxation and business law London",
    "Remote learning accounting",
    "Master's in Accounting London"
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Keyword & Performance Scan"
      icon={Search}
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
            <p className="text-muted-foreground">Scanning keywords and analyzing performance...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 animate-fade-in">
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-1">Course Scanned</p>
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedCourse === "accounting" && "Accounting and Finance"}
              {selectedCourse === "cybersecurity" && "Cyber Security"}
              {selectedCourse === "fashion" && "Fashion Design"}
              {!selectedCourse && "Select a course"}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-1">Keywords Found</p>
            <p className="text-2xl font-bold text-primary">47</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-1">Avg. CTR</p>
            <p className="text-2xl font-bold text-foreground">3.2%</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-1">Avg. Rank</p>
            <p className="text-2xl font-bold text-foreground">9.0</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Must-Have Course Keywords</p>
            <div className="flex flex-wrap gap-2">
              {mustHaveKeywords.map((keyword, i) => (
                <Badge key={i} variant="default" className="bg-primary hover:bg-primary-hover">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Trending Keywords</p>
            <div className="flex flex-wrap gap-2">
              {trendingKeywords.map((keyword, i) => (
                <Badge key={i} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>

          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
