import { BarChart3, Eye, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "../WorkflowNode";

interface BenchmarkNodeProps {
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

export const BenchmarkNode = ({ 
  nodeNumber, 
  isActive, 
  progress, 
  completed, 
  isExpanded, 
  onToggle, 
  onRun,
  enabled,
  selectedCourse 
}: BenchmarkNodeProps) => {

  const competitors = [
    { rank: 1, name: "Brunel University", keywords: 92, content: 88, total: 87 },
    { rank: 2, name: "Kingston University", keywords: 88, content: 85, total: 82 },
    { rank: 3, name: "University of Westminster", keywords: 85, content: 80, total: 79 },
    { rank: 4, name: "University of West London", keywords: 68, content: 72, total: 70 },
  ];

  const missingKeywords = [
    { keyword: "ACCA accredited accounting courses", difficulty: "Medium", searchVolume: "1.2K" },
    { keyword: "professional finance degree London", difficulty: "High", searchVolume: "890" },
    { keyword: "career prospects in accounting UK", difficulty: "Medium", searchVolume: "720" },
    { keyword: "financial management certification", difficulty: "Low", searchVolume: "510" },
    { keyword: "accounting internships London", difficulty: "Medium", searchVolume: "640" },
  ];

  return (
    <WorkflowNode
      nodeNumber={nodeNumber}
      title="Competitive Benchmarking"
      icon={BarChart3}
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
            <p className="text-muted-foreground">Analyzing competitors...</p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-4">
              <h4 className="font-semibold text-foreground mb-2">Weighted Scoring Methodology</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>Keyword Coverage: 35%</div>
                <div>Content Depth: 30%</div>
                <div>Technical SEO: 35%</div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Competitive Analysis (Side-by-Side Comparison):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">Rank</th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">Institution</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Keywords</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Content</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, i) => (
                      <tr key={i} className={`border-b border-border/50 ${comp.rank === 4 ? 'bg-primary/5' : ''}`}>
                        <td className="py-2 px-3 font-bold text-foreground">Rank {comp.rank}</td>
                        <td className="py-2 px-3 font-medium text-foreground">{comp.name}</td>
                        <td className="text-center py-2 px-3">{comp.keywords}</td>
                        <td className="text-center py-2 px-3">{comp.content}</td>
                        <td className="text-center py-2 px-3 font-bold text-primary">{comp.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <p className="text-sm font-medium text-foreground">Keywords Present in Competitors but Missing from UWL:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">Keyword</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Difficulty</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">Search Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {missingKeywords.map((kw, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-3 text-foreground">{kw.keyword}</td>
                        <td className="text-center py-2 px-3">
                          <span className={`text-xs px-2 py-1 rounded ${
                            kw.difficulty === 'Low' ? 'bg-green-500/10 text-green-500' :
                            kw.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {kw.difficulty}
                          </span>
                        </td>
                        <td className="text-center py-2 px-3 text-muted-foreground">{kw.searchVolume}/mo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-foreground">
                Competitor Gap Score: <span className="text-primary text-lg">82/100</span>
              </p>
            </div>
            
          </div>
        )}
      </div>
    </WorkflowNode>
  );
};
