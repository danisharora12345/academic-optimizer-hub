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

  const title = "BA (Hons) Accounting and Financial Management";
  const body = `Empower your global career with a BA (Hons) Accounting and Finance degree in London.

This industry-focused programme combines essential knowledge with practical experience, preparing you for a career in professional accountancy, financial management, or investment analysis. Studying at the University of West London places you at the heart of one of the world's most dynamic financial centres, where innovation meets opportunity.

Why Choose This Course:
• Career-ready skills: Develop expertise in accounting principles, financial reporting, business analytics, and taxation while gaining analytical, communication, and problem-solving skills that global employers demand.
• Accredited for success: The course is designed to maximise exemptions from exams of leading accountancy bodies – including ACCA, CIMA, and ICAEW – helping you achieve your professional qualifications faster.
• Learn from professionals: Taught by experienced accountants and finance professionals, many with Big Four experience, you will gain insight into the financial practices shaping today's global economy.
• Global perspective: Explore accounting and finance within the wider context of sustainability, corporate governance, and FinTech.`;

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
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
            <div className="text-sm text-foreground whitespace-pre-line">
              {body}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">SEO Score:</span>
            <span className="font-semibold text-success">92/100</span>
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
              <div className="h-full bg-success" style={{ width: "95%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">95% tone match</p>
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
