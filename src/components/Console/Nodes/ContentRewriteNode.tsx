import { useState } from "react";
import { PenTool, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const ContentRewriteNode = ({ nodeNumber, isActive, progress }: any) => {
  const [tone, setTone] = useState("academic");
  const [generating, setGenerating] = useState(false);

  const beforeText = "Learn about Business Management at UWL. Our course covers key topics.";
  const afterText = "Discover transformative Business Management education at the University of West London. Our AACSB-accredited programme combines strategic leadership, digital innovation, and industry partnerships to launch your career.";

  const handleGenerate = () => {
    setGenerating(true);
    toast.success("Generating enhanced content");
    setTimeout(() => {
      setGenerating(false);
      toast.success("Content rewrite complete");
    }, 2000);
  };

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Content Rewrite & Enhancement"
      icon={PenTool}
      isActive={isActive}
      progress={progress}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Before</p>
            <div className="p-3 rounded-lg bg-secondary/50 text-sm text-foreground">
              {beforeText}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">SEO Score:</span>
              <span className="font-semibold text-warning">45/100</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">After</p>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-foreground">
              {afterText}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">SEO Score:</span>
              <span className="font-semibold text-success">88/100</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">Tone Selection</p>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="engaging">Engaging</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">Consistency</p>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: "92%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">92% tone match</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-primary hover:bg-primary-hover"
          >
            {generating ? "Generating..." : "Generate Rewrite"}
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Draft
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Submit for Review
          </Button>
        </div>
      </div>
    </WorkflowNode>
  );
};
