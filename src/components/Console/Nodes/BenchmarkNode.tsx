import { useState } from "react";
import { BarChart3, Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const BenchmarkNode = ({ nodeNumber, isActive, progress }: any) => {
  const [running, setRunning] = useState(false);

  const competitors = [
    { name: "UWL", score: 75, color: "bg-primary" },
    { name: "Kingston", score: 82, color: "bg-warning" },
    { name: "Brunel", score: 68, color: "bg-accent" },
    { name: "Westminster", score: 71, color: "bg-success" },
  ];

  const handleBenchmark = () => {
    setRunning(true);
    toast.success("Benchmark analysis started");
    setTimeout(() => {
      setRunning(false);
      toast.success("Benchmark complete");
    }, 2000);
  };

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Competitive Benchmarking"
      icon={BarChart3}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {competitors.map((comp, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{comp.name}</span>
                <span className="text-muted-foreground">{comp.score}/100</span>
              </div>
              <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    comp.color
                  )}
                  style={{ width: `${comp.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Key Insight:</span> Competitors mention
            "accreditations" 3x more frequently. Consider adding professional body
            certifications.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleBenchmark}
            disabled={running}
            className="bg-primary hover:bg-primary-hover"
          >
            {running ? "Running..." : "Run Benchmark"}
          </Button>
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
    </WorkflowNode>
  );
};
