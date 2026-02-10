import { Lightbulb, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { workflows, getAverageTimePerStage, getBottleneckCount, formatDuration } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface Insight {
  icon: React.ElementType;
  title: string;
  description: string;
  type: "warning" | "info" | "success";
}

function generateInsights(): Insight[] {
  const insights: Insight[] = [];
  const stageData = getAverageTimePerStage();
  const bottlenecks = getBottleneckCount();
  const totalAvgTime = stageData.reduce((s, d) => s + d.avgMinutes, 0);

  // Biggest bottleneck stage
  const maxStage = stageData.reduce((a, b) => (a.avgMinutes > b.avgMinutes ? a : b));
  if (maxStage.avgMinutes > 0) {
    const pct = Math.round((maxStage.avgMinutes / totalAvgTime) * 100);
    insights.push({
      icon: AlertTriangle,
      title: `${maxStage.stage} stage causes ${pct}% of total delay`,
      description: `The ${maxStage.stage} stage averages ${formatDuration(maxStage.avgMinutes)}, making it the largest contributor to overall workflow time. Consider streamlining this step.`,
      type: "warning",
    });
  }

  // Bottleneck count
  if (bottlenecks > workflows.length / 2) {
    insights.push({
      icon: TrendingUp,
      title: `${bottlenecks} of ${workflows.length} workflows have bottlenecks`,
      description: "More than half of all workflows exhibit at least one bottleneck stage. Investigate recurring blockers in the approval and review processes.",
      type: "warning",
    });
  }

  // Fast workflows
  const fastOnes = workflows.filter((w) => w.status === "Completed" && w.completionTimeMinutes < 180);
  if (fastOnes.length > 0) {
    insights.push({
      icon: Zap,
      title: `${fastOnes.length} workflow${fastOnes.length > 1 ? "s" : ""} completed in under 3 hours`,
      description: `Workflows like "${fastOnes[0].name}" complete quickly. Consider auto-approving similar low-risk workflows to replicate this efficiency.`,
      type: "success",
    });
  }

  // Delayed workflows
  const delayed = workflows.filter((w) => w.status === "Delayed");
  if (delayed.length > 0) {
    insights.push({
      icon: Lightbulb,
      title: `${delayed.length} workflow${delayed.length > 1 ? "s are" : " is"} currently delayed`,
      description: `Consider adding escalation rules for workflows stuck longer than their expected SLA to prevent further delays.`,
      type: "info",
    });
  }

  return insights;
}

const typeStyles = {
  warning: "border-warning/20 bg-warning/5",
  info: "border-primary/20 bg-primary/5",
  success: "border-success/20 bg-success/5",
};

const iconStyles = {
  warning: "text-warning bg-warning/10",
  info: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
};

export default function Insights() {
  const insights = generateInsights();

  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm text-muted-foreground">AI-powered recommendations based on your workflow data.</p>

      {insights.map((insight, i) => (
        <div key={i} className={cn("border rounded-xl p-5 flex gap-4", typeStyles[insight.type])}>
          <div className={cn("shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", iconStyles[insight.type])}>
            <insight.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm">{insight.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
