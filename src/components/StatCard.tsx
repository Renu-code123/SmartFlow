import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "primary" | "accent" | "warning";
}

const variantStyles = {
  default: "bg-card border-border",
  primary: "bg-card border-primary/20",
  accent: "bg-card border-accent/20",
  warning: "bg-card border-warning/20",
};

const iconVariant = {
  default: "bg-secondary text-foreground",
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
};

export default function StatCard({ title, value, icon: Icon, description, variant = "default" }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border p-5 transition-shadow hover:shadow-md", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className={cn("rounded-lg p-2.5", iconVariant[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
