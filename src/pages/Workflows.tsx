import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { workflows, formatDuration } from "@/data/mockData";

export default function Workflows() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{workflows.length} workflows total</p>

      {/* Table (desktop) / Cards (mobile) */}
      <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Workflow</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Completion Time</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bottleneck</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {workflows.map((wf) => (
              <tr key={wf.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-medium text-card-foreground">{wf.name}</td>
                <td className="py-3 px-4"><StatusBadge status={wf.status} /></td>
                <td className="py-3 px-4 text-muted-foreground">{formatDuration(wf.completionTimeMinutes)}</td>
                <td className="py-3 px-4 text-muted-foreground">{wf.bottleneckStage ? `⚠️ ${wf.bottleneckStage}` : "—"}</td>
                <td className="py-3 px-4">
                  <Link to={`/workflows/${wf.id}`} className="text-primary hover:underline inline-flex items-center gap-1 text-xs font-medium">
                    Details <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {workflows.map((wf) => (
          <Link key={wf.id} to={`/workflows/${wf.id}`} className="block bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-card-foreground">{wf.name}</span>
              <StatusBadge status={wf.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{formatDuration(wf.completionTimeMinutes)}</span>
              {wf.bottleneckStage && <span>⚠️ {wf.bottleneckStage}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
