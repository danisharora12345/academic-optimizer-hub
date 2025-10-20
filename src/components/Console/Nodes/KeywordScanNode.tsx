import { useState } from "react";
import { Search, FileDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowNode } from "../WorkflowNode";
import { toast } from "sonner";

export const KeywordScanNode = ({ nodeNumber, isActive, progress }: any) => {
  const [scanning, setScanning] = useState(false);

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
      title="Keyword & Performance Scan Results"
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
            <p className="text-sm text-muted-foreground mb-1">Performance Score</p>
            <p className="text-2xl font-bold text-success">85%</p>
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
