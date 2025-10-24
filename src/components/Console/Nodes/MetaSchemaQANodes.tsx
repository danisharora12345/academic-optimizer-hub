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
      title="Metadata & Schema Agent"
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
            <p className="text-muted-foreground">Auto-generating metadata and structured JSON-LD...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card p-4 rounded-lg border border-primary/20 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">Generated Metadata</h4>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Schema Validation Passed ✓
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meta Title (58 chars)</p>
                <p className="text-sm font-medium text-foreground">
                  BSc Accounting and Finance London | ACCA Accredited | UWL
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meta Description (156 chars)</p>
                <p className="text-sm text-foreground">
                  Study Accounting and Finance at UWL London. ACCA/CIMA accredited degree with FinTech, ESG finance & data analytics. Start your global finance career.
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Schema JSON-LD (Course, Organization, FAQ)</p>
                <div className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
                  <pre className="text-foreground">
{`{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "BSc Accounting and Finance",
  "provider": {
    "@type": "Organization",
    "name": "University of West London"
  },
  "offers": {
    "@type": "Offer",
    "category": "Undergraduate"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit Schema
              </Button>
              <Button size="sm" variant="outline">
                Validate JSON-LD
              </Button>
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
  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Publishing & QA Agent"
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
            <p className="text-muted-foreground">Running QA checks: Lighthouse, broken links, schema validation, duplicate meta...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: "Performance", score: 96 },
                { label: "Accessibility", score: 98 },
                { label: "SEO", score: 95 },
                { label: "Schema", score: 94 },
              ].map((item, i) => (
                <div key={i} className="bg-card p-3 rounded-lg border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-primary">{item.score}</p>
                  <div className="w-full bg-muted h-1.5 rounded-full mt-2">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">QA Check</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Result</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Lighthouse Score", score: "95/100", status: "Pass" },
                    { metric: "Broken Links", score: "0 found", status: "Pass" },
                    { metric: "Schema Validation", score: "Valid JSON-LD", status: "Pass" },
                    { metric: "Duplicate Meta", score: "None detected", status: "Pass" },
                    { metric: "Mobile Responsive", score: "100%", status: "Pass" },
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{item.metric}</td>
                      <td className="py-2 text-foreground">{item.score}</td>
                      <td className="py-2">
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="text-sm font-semibold text-foreground">
                  Pass Rate: <span className="text-primary text-lg">97%</span> | Publish Success ✅
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All QA checks passed. Content is ready for publishing.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                View Full Report
              </Button>
              <Button size="sm">
                Publish Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
