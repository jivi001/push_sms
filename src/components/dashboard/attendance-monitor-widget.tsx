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
import { Rocket, Loader2, CheckCircle, XCircle } from "lucide-react";
import { checkAttendanceAndSendReminders } from "@/ai/flows/attendance-monitoring";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AttendanceMonitorWidget() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    success: false,
  });

  const handleManualTrigger = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const result = await checkAttendanceAndSendReminders({
        date: now.toISOString().split("T")[0],
        hour: now.getHours(),
      });
      setDialogContent({
        title: "AI Task Completed",
        description: `${result.remindersSent} attendance reminders have been sent successfully.`,
        success: true,
      });
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to trigger attendance check:", error);
      setDialogContent({
        title: "AI Task Failed",
        description:
          "There was an issue sending attendance reminders. The AI model may be temporarily unavailable. Please try again later.",
        success: false,
      });
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              {dialogContent.success ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-destructive" />
              )}
            </div>
            <AlertDialogTitle className="text-center text-2xl font-headline">{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)} className="w-full">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
