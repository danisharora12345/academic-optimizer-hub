import { useState } from "react";
import { FileText, Code, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const MetaAgentNode = ({ nodeNumber, isActive, progress }: any) => {
  const [scanning, setScanning] = useState(false);

  const metaData = [
    { course: "Business Management BSc", title: "✓", desc: "✓", keywords: "✓" },
    { course: "Computer Science BSc", title: "✓", desc: "⚠", keywords: "✓" },
    { course: "Law LLB", title: "✓", desc: "✓", keywords: "✗" },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Meta Agent"
      icon={FileText}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 text-muted-foreground font-medium">Course</th>
                <th className="text-center p-2 text-muted-foreground font-medium">Title</th>
                <th className="text-center p-2 text-muted-foreground font-medium">Description</th>
                <th className="text-center p-2 text-muted-foreground font-medium">Keywords</th>
              </tr>
            </thead>
            <tbody>
              {metaData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-secondary/50">
                  <td className="p-2 text-foreground">{row.course}</td>
                  <td className="p-2 text-center">{row.title}</td>
                  <td className="p-2 text-center">{row.desc}</td>
                  <td className="p-2 text-center">{row.keywords}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          onClick={() => {
            setScanning(true);
            toast.success("Meta scan started");
            setTimeout(() => {
              setScanning(false);
              toast.success("Meta scan complete");
            }, 2000);
          }}
          disabled={scanning}
          className="bg-primary hover:bg-primary-hover"
        >
          {scanning ? "Scanning..." : "Run Meta Scan"}
        </Button>
      </div>
    </WorkflowNode>
  );
};

export const SchemaAgentNode = ({ nodeNumber, isActive, progress }: any) => {
  const [validating, setValidating] = useState(false);

  const schemas = [
    { course: "Business Management BSc", status: "pass" },
    { course: "Computer Science BSc", status: "pass" },
    { course: "Law LLB", status: "fail" },
    { course: "Psychology BSc", status: "pass" },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Schema Agent"
      icon={Code}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {schemas.map((item, i) => (
            <div key={i} className="p-3 rounded-lg border bg-card flex items-center justify-between">
              <span className="text-sm text-foreground">{item.course}</span>
              {item.status === "pass" ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
          ))}
        </div>
        <Button
          onClick={() => {
            setValidating(true);
            toast.success("Schema validation started");
            setTimeout(() => {
              setValidating(false);
              toast.success("Validation complete");
            }, 2000);
          }}
          disabled={validating}
          className="bg-primary hover:bg-primary-hover"
        >
          {validating ? "Validating..." : "Run Schema Validation"}
        </Button>
      </div>
    </WorkflowNode>
  );
};

export const QAAgentNode = ({ nodeNumber, isActive, progress }: any) => {
  const [checking, setChecking] = useState(false);

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="QA Agent"
      icon={CheckCircle}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground mb-1">Readability</p>
            <p className="text-2xl font-bold text-success">87/100</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">SEO Score</p>
            <p className="text-2xl font-bold text-primary">92/100</p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-sm text-muted-foreground mb-1">Warnings</p>
            <p className="text-2xl font-bold text-warning">3</p>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-xs text-foreground">⚠ 3 pages missing alt text for images</p>
        </div>
        <Button
          onClick={() => {
            setChecking(true);
            toast.success("QA checks started");
            setTimeout(() => {
              setChecking(false);
              toast.success("QA complete");
            }, 2000);
          }}
          disabled={checking}
          className="bg-primary hover:bg-primary-hover"
        >
          {checking ? "Checking..." : "Run QA Checks"}
        </Button>
      </div>
    </WorkflowNode>
  );
};
