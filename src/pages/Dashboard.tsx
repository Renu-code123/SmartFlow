import { Activity, GitBranch, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import StatCard from "@/components/StatCard";
import { workflows, weeklyCompletionData, getAverageCompletionTime, getBottleneckCount, getAverageTimePerStage, formatDuration } from "@/data/mockData";

export default function Dashboard() {
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter((w) => w.status === "Active").length;
  const avgTime = getAverageCompletionTime();
  const bottlenecks = getBottleneckCount();
  const stageData = getAverageTimePerStage();

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workflows" value={totalWorkflows} icon={GitBranch} variant="primary" />
        <StatCard title="Active Workflows" value={activeWorkflows} icon={Activity} variant="accent" />
        <StatCard title="Avg. Completion Time" value={formatDuration(avgTime)} icon={Clock} variant="default" />
        <StatCard title="Bottlenecks Detected" value={bottlenecks} icon={AlertTriangle} variant="warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Average Time per Stage</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} label={{ value: "min", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(value: number) => [formatDuration(value), "Avg Time"]}
              />
              <Bar dataKey="avgMinutes" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Weekly Completion Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="completed" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ fill: "hsl(var(--accent))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
