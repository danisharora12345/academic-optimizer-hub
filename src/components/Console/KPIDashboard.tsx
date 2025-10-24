import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, CheckCircle2, Zap } from "lucide-react";

interface KPIMetric {
  label: string;
  baseline: string;
  optimized: string;
  change: string;
  icon: React.ReactNode;
}

interface KPIDashboardProps {
  isComplete: boolean;
}

export const KPIDashboard = ({ isComplete }: KPIDashboardProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isComplete && !animated) {
      setAnimated(true);
    }
  }, [isComplete, animated]);

  const metrics: KPIMetric[] = [
    {
      label: "Average SERP Rank",
      baseline: "9.0",
      optimized: "4.0",
      change: "+55%",
      icon: <Target className="w-5 h-5" />,
    },
    {
      label: "Keyword Coverage",
      baseline: "68%",
      optimized: "92%",
      change: "+35%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Schema Completeness",
      baseline: "60%",
      optimized: "94%",
      change: "+57%",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      label: "Lighthouse SEO Score",
      baseline: "85%",
      optimized: "95%",
      change: "+12%",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Performance Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="p-5 bg-card border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-primary">{metric.icon}</div>
              {animated && (
                <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full animate-scale-in">
                  {metric.change}
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {metric.label}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground transition-all duration-500">
                {animated ? metric.optimized : metric.baseline}
              </span>
              {animated && (
                <span className="text-xs text-muted-foreground line-through">
                  {metric.baseline}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
      {isComplete && (
        <Card className="mt-4 p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">
              Competitor Gap Score: <span className="text-2xl">82/100</span>
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};
