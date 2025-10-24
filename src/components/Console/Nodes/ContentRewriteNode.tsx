import { useState } from "react";
import { PenTool, Eye, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentRewriteNodeProps {
  nodeNumber: number;
  isActive: boolean;
  progress: number;
  completed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onRun: () => void;
  enabled: boolean;
}

export const ContentRewriteNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled 
}: ContentRewriteNodeProps) => {
  const [tone, setTone] = useState("academic");

  const title = "BA (Hons) Accounting and Financial Management";
  const body = `Empower your global career with a BA (Hons) Accounting and Finance degree in London.

This industry-focused programme combines essential knowledge with practical experience, preparing you for a career in professional accountancy, financial management, or investment analysis. Studying at the University of West London places you at the heart of one of the world's most dynamic financial centres, where innovation meets opportunity.

Why Choose This Course:
• Career-ready skills: Develop expertise in accounting principles, financial reporting, business analytics, and taxation while gaining analytical, communication, and problem-solving skills that global employers demand.
• Accredited for success: The course is designed to maximise exemptions from exams of leading accountancy bodies – including ACCA, CIMA, and ICAEW – helping you achieve your professional qualifications faster.
• Learn from professionals: Taught by experienced accountants and finance professionals, many with Big Four experience, you will gain insight into the financial practices shaping today's global economy.
• Global perspective: Explore accounting and finance within the wider context of sustainability, corporate governance, and FinTech.`;

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Content Rewrite & Enhancement"
      icon={PenTool}
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
            <p className="text-muted-foreground">AI is rewriting content with SEO optimization...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-card p-4 rounded-lg border border-border mb-4">
              <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="text-green-500">✓</span> Before vs After Keyword Insertion Map
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground font-medium mb-2">Original:</p>
                  <p className="text-xs text-muted-foreground italic">
                    "Learn about accounting and finance at UWL..."
                  </p>
                  <p className="text-xs text-destructive mt-1">Keywords: 3 | Readability: 65%</p>
                </div>
                <div>
                  <p className="text-primary font-medium mb-2">Optimized:</p>
                  <p className="text-xs text-foreground">
                    "Study Accounting and Finance at the University of West London and gain expertise for a global career..."
                  </p>
                  <p className="text-xs text-green-500 mt-1">Keywords: 15 | Readability: 82%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-3 text-foreground">SEO-Optimized Academic Copy</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <p className="text-foreground font-medium mt-1 typing-effect">BSc Accounting and Finance London | ACCA Accredited | UWL</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Meta Description:</span>
                    <p className="text-foreground mt-1 typing-effect">Study Accounting and Finance at UWL London. ACCA/CIMA accredited degree with FinTech, ESG finance & data analytics. Start your global finance career.</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">H1:</span>
                    <p className="text-foreground font-semibold mt-1 typing-effect">Accounting and Finance Degree London - ACCA Accredited</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Course Overview (excerpt):</span>
                    <p className="text-foreground mt-1 text-xs typing-effect">{body.substring(0, 200)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">+12 target keywords</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">95% academic tone</span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded">SEO score: 92</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tone Selection:</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Full Content
              </Button>
              <Button size="sm">
                Approve & Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
