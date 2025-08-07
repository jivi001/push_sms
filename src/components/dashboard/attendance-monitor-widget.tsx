"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkAttendanceAndSendReminders } from "@/ai/flows/attendance-monitoring";

export function AttendanceMonitorWidget() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleManualTrigger = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const result = await checkAttendanceAndSendReminders({
        date: now.toISOString().split("T")[0],
        hour: now.getHours(),
      });
      toast({
        title: "AI Task Completed",
        description: `${result.remindersSent} attendance reminders have been sent successfully.`,
        className: "bg-accent text-accent-foreground",
      });
    } catch (error) {
      console.error("Failed to trigger attendance check:", error);
      toast({
        variant: "destructive",
        title: "AI Task Failed",
        description:
          "There was an issue sending attendance reminders. The AI model may be temporarily unavailable. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg bg-card sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Rocket className="text-primary" />
          Intelligent Monitoring
        </CardTitle>
        <CardDescription>
          The AI backend runs hourly, but you can trigger a manual check now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will check for any teachers who have not yet submitted
          attendance for the current hour and send them a reminder.
        </p>
        <Button
          onClick={handleManualTrigger}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Check & Send Reminders"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
