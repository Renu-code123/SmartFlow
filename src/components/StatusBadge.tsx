import { cn } from "@/lib/utils";

type Status = "Active" | "Delayed" | "Completed";

const styles: Record<Status, string> = {
  Active: "bg-primary/10 text-primary border-primary/20",
  Delayed: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status])}>
      {status}
    </span>
  );
}
