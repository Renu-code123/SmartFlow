export interface WorkflowStage {
  name: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  thresholdMinutes: number;
}

export interface Workflow {
  id: string;
  name: string;
  status: "Active" | "Delayed" | "Completed";
  stages: WorkflowStage[];
  completionTimeMinutes: number;
  bottleneckStage: string | null;
  createdAt: string;
}

export const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Employee Onboarding",
    status: "Completed",
    stages: [
      { name: "Submitted", startTime: "2025-01-15 09:00", endTime: "2025-01-15 09:15", durationMinutes: 15, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-15 09:15", endTime: "2025-01-15 11:45", durationMinutes: 150, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-01-15 11:45", endTime: "2025-01-16 14:00", durationMinutes: 1575, thresholdMinutes: 480 },
      { name: "Completed", startTime: "2025-01-16 14:00", endTime: "2025-01-16 14:30", durationMinutes: 30, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 1770,
    bottleneckStage: "Approved",
    createdAt: "2025-01-15",
  },
  {
    id: "wf-002",
    name: "Invoice Processing",
    status: "Active",
    stages: [
      { name: "Submitted", startTime: "2025-02-01 08:00", endTime: "2025-02-01 08:05", durationMinutes: 5, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-02-01 08:05", endTime: "2025-02-01 10:30", durationMinutes: 145, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-02-01 10:30", endTime: "", durationMinutes: 0, thresholdMinutes: 480 },
      { name: "Completed", startTime: "", endTime: "", durationMinutes: 0, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 150,
    bottleneckStage: "Reviewed",
    createdAt: "2025-02-01",
  },
  {
    id: "wf-003",
    name: "Leave Request",
    status: "Completed",
    stages: [
      { name: "Submitted", startTime: "2025-01-20 10:00", endTime: "2025-01-20 10:02", durationMinutes: 2, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-20 10:02", endTime: "2025-01-20 10:30", durationMinutes: 28, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-01-20 10:30", endTime: "2025-01-20 11:00", durationMinutes: 30, thresholdMinutes: 480 },
      { name: "Completed", startTime: "2025-01-20 11:00", endTime: "2025-01-20 11:05", durationMinutes: 5, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 65,
    bottleneckStage: null,
    createdAt: "2025-01-20",
  },
  {
    id: "wf-004",
    name: "Vendor Registration",
    status: "Delayed",
    stages: [
      { name: "Submitted", startTime: "2025-01-25 14:00", endTime: "2025-01-25 14:10", durationMinutes: 10, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-25 14:10", endTime: "2025-01-27 09:00", durationMinutes: 2570, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-01-27 09:00", endTime: "", durationMinutes: 0, thresholdMinutes: 480 },
      { name: "Completed", startTime: "", endTime: "", durationMinutes: 0, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 2580,
    bottleneckStage: "Reviewed",
    createdAt: "2025-01-25",
  },
  {
    id: "wf-005",
    name: "Budget Approval",
    status: "Completed",
    stages: [
      { name: "Submitted", startTime: "2025-01-10 08:00", endTime: "2025-01-10 08:20", durationMinutes: 20, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-10 08:20", endTime: "2025-01-10 12:00", durationMinutes: 220, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-01-10 12:00", endTime: "2025-01-12 16:00", durationMinutes: 3120, thresholdMinutes: 480 },
      { name: "Completed", startTime: "2025-01-12 16:00", endTime: "2025-01-12 16:15", durationMinutes: 15, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 3375,
    bottleneckStage: "Approved",
    createdAt: "2025-01-10",
  },
  {
    id: "wf-006",
    name: "IT Access Request",
    status: "Completed",
    stages: [
      { name: "Submitted", startTime: "2025-01-18 09:00", endTime: "2025-01-18 09:05", durationMinutes: 5, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-18 09:05", endTime: "2025-01-18 09:45", durationMinutes: 40, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-01-18 09:45", endTime: "2025-01-18 10:30", durationMinutes: 45, thresholdMinutes: 480 },
      { name: "Completed", startTime: "2025-01-18 10:30", endTime: "2025-01-18 11:00", durationMinutes: 30, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 120,
    bottleneckStage: null,
    createdAt: "2025-01-18",
  },
  {
    id: "wf-007",
    name: "Contract Renewal",
    status: "Delayed",
    stages: [
      { name: "Submitted", startTime: "2025-01-28 11:00", endTime: "2025-01-28 11:30", durationMinutes: 30, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-01-28 11:30", endTime: "2025-01-30 15:00", durationMinutes: 3090, thresholdMinutes: 120 },
      { name: "Approved", startTime: "", endTime: "", durationMinutes: 0, thresholdMinutes: 480 },
      { name: "Completed", startTime: "", endTime: "", durationMinutes: 0, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 3120,
    bottleneckStage: "Reviewed",
    createdAt: "2025-01-28",
  },
  {
    id: "wf-008",
    name: "Travel Reimbursement",
    status: "Completed",
    stages: [
      { name: "Submitted", startTime: "2025-02-03 13:00", endTime: "2025-02-03 13:10", durationMinutes: 10, thresholdMinutes: 30 },
      { name: "Reviewed", startTime: "2025-02-03 13:10", endTime: "2025-02-03 15:00", durationMinutes: 110, thresholdMinutes: 120 },
      { name: "Approved", startTime: "2025-02-03 15:00", endTime: "2025-02-04 09:00", durationMinutes: 1080, thresholdMinutes: 480 },
      { name: "Completed", startTime: "2025-02-04 09:00", endTime: "2025-02-04 09:20", durationMinutes: 20, thresholdMinutes: 60 },
    ],
    completionTimeMinutes: 1220,
    bottleneckStage: "Approved",
    createdAt: "2025-02-03",
  },
];

export const weeklyCompletionData = [
  { week: "Week 1", completed: 3 },
  { week: "Week 2", completed: 5 },
  { week: "Week 3", completed: 4 },
  { week: "Week 4", completed: 7 },
  { week: "Week 5", completed: 6 },
  { week: "Week 6", completed: 8 },
];

// Computed helpers
export function getAverageCompletionTime(): number {
  const completed = workflows.filter((w) => w.status === "Completed");
  if (completed.length === 0) return 0;
  return Math.round(completed.reduce((sum, w) => sum + w.completionTimeMinutes, 0) / completed.length);
}

export function getBottleneckCount(): number {
  return workflows.filter((w) => w.bottleneckStage !== null).length;
}

export function getAverageTimePerStage(): { stage: string; avgMinutes: number }[] {
  const stageNames = ["Submitted", "Reviewed", "Approved", "Completed"];
  return stageNames.map((stage) => {
    const durations = workflows
      .flatMap((w) => w.stages)
      .filter((s) => s.name === stage && s.durationMinutes > 0);
    const avg = durations.length > 0
      ? Math.round(durations.reduce((sum, s) => sum + s.durationMinutes, 0) / durations.length)
      : 0;
    return { stage, avgMinutes: avg };
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours < 24) return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}
