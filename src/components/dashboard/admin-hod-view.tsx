import type { User } from "@/lib/types";
import { StatsCard } from "./stats-card";
import { AttendanceMonitorWidget } from "./attendance-monitor-widget";
import { AlertLogTable } from "./alert-log-table";
import { Users, UserX, BarChart, BellRing } from "lucide-react";

interface AdminHodViewProps {
  user: User;
}

export default function AdminHodView({ user }: AdminHodViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Welcome, {user.name}!
        </h2>
        <p className="text-muted-foreground">
          Here is the overview of the attendance status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Teachers"
          value="42"
          icon={<Users />}
          description="Managed across all departments"
        />
        <StatsCard
          title="Pending Attendance"
          value="5"
          icon={<UserX />}
          description="For the current hour"
        />
        <StatsCard
          title="Submission Rate"
          value="88%"
          icon={<BarChart />}
          description="Average for today"
        />
        <StatsCard
          title="Alerts Sent Today"
          value="17"
          icon={<BellRing />}
          description="Total automated reminders"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AlertLogTable />
        </div>
        <div>
          <AttendanceMonitorWidget />
        </div>
      </div>
    </div>
  );
}
