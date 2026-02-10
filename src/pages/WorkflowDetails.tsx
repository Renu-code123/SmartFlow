import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { workflows, formatDuration } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function WorkflowDetails() {
  const { id } = useParams();
  const workflow = workflows.find((w) => w.id === id);

  if (!workflow) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Workflow not found.</p>
        <Link to="/workflows" className="text-primary text-sm mt-2 inline-block hover:underline">Back to Workflows</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/workflows" className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">{workflow.name}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Created {workflow.createdAt}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={workflow.status} />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-0">
        {workflow.stages.map((stage, i) => {
          const isDelayed = stage.durationMinutes > stage.thresholdMinutes;
          const isDone = stage.durationMinutes > 0;
          const isLast = i === workflow.stages.length - 1;

          return (
            <div key={stage.name} className="flex gap-4">
              {/* Timeline bar */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                    isDone
                      ? isDelayed
                        ? "border-warning bg-warning/10"
                        : "border-success bg-success/10"
                      : "border-border bg-muted"
                  )}
                >
                  {isDone ? (
                    isDelayed ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    )
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                {!isLast && (
                  <div className={cn("w-0.5 flex-1 min-h-[2rem]", isDone ? "bg-border" : "bg-border/40")} />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-6", isLast && "pb-0")}>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-card-foreground text-sm">{stage.name}</span>
                  {isDelayed && (
                    <span className="text-[10px] font-medium text-warning bg-warning/10 px-1.5 py-0.5 rounded">
                      DELAYED
                    </span>
                  )}
                </div>
                {isDone ? (
                  <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
                    <p>Start: {stage.startTime}</p>
                    <p>End: {stage.endTime}</p>
                    <p>Duration: <span className={cn("font-medium", isDelayed ? "text-warning" : "text-card-foreground")}>{formatDuration(stage.durationMinutes)}</span></p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">Pending</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
