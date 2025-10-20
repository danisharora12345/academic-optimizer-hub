import { useState } from "react";
import { BarChart3, Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const BenchmarkNode = ({ nodeNumber, isActive, progress }: any) => {
  const [running, setRunning] = useState(false);

  const competitors = [
    { rank: 1, name: "University of London" },
    { rank: 2, name: "The London School of Economics and Political Science" },
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
