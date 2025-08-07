"use client";

import { useAuth } from "@/hooks/use-auth";
import TeacherView from "@/components/dashboard/teacher-view";
import AdminHodView from "@/components/dashboard/admin-hod-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in-50">
      {user.role === "teacher" ? <TeacherView /> : <AdminHodView user={user} />}
    </div>
  );
}
