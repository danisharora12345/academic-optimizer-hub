import { useState } from "react";
import { Search, FileDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import { toast } from "sonner";

export const KeywordScanNode = ({ nodeNumber, isActive, progress }: any) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    toast.success("Keyword scan started");
    setTimeout(() => {
      setScanning(false);
      toast.success("Keyword scan completed");
    }, 2000);
  };

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Keyword & Performance Scan"
      icon={Search}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Courses Scanned</p>
            <p className="text-2xl font-bold text-foreground">200</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Keywords Found</p>
            <p className="text-2xl font-bold text-primary">1,500</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Opportunities</p>
            <p className="text-2xl font-bold text-warning">120</p>
          </div>
        </div>

        <div className="h-20 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleScan}
            disabled={scanning}
            className="bg-primary hover:bg-primary-hover"
          >
            {scanning ? "Scanning..." : "Run Keyword Scan"}
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Keyword Report
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </WorkflowNode>
  );
};
