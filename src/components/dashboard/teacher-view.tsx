// src/components/dashboard/teacher-view.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ClipboardList, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


export default function TeacherView() {
  // In a real app, this would come from a data source (e.g., Firestore listener)
  const [hasPendingAttendance, setHasPendingAttendance] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(true);

  const handleAcknowledge = () => {
    setIsAlertOpen(false);
    // Optionally, update the state to reflect the action
    // setHasPendingAttendance(false); 
  };

  const renderNoPendingAttendance = () => (
    <div className="flex items-center gap-4 p-6 bg-secondary/50 rounded-lg">
      <CheckCircle2 className="h-10 w-10 text-green-500" />
      <div>
        <p className="text-2xl font-bold">All Good!</p>
        <p className="text-muted-foreground">
          Your attendance submissions are all up to date. Keep up the great work!
        </p>
      </div>
    </div>
  );

  const renderPendingAttendanceCard = () => (
     <Card className="shadow-lg border-destructive">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline text-destructive">
            Action Required
          </CardTitle>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
           <div className="flex items-center gap-4 p-6 bg-destructive/10 rounded-lg">
             <AlertTriangle className="h-10 w-10 text-destructive" />
            <div>
              <p className="text-2xl font-bold">Attendance Pending</p>
              <p className="text-destructive/80">
                Please submit your attendance for the current class.
              </p>
            </div>
          </div>
          <Button variant="destructive" className="w-full mt-4" onClick={() => setIsAlertOpen(true)}>
            View Alert
          </Button>
        </CardContent>
      </Card>
  );

  return (
    <>
      <div className="grid gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium font-headline">
              Your Attendance Status
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {!hasPendingAttendance ? renderNoPendingAttendance() : renderPendingAttendanceCard()}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Alerts</CardTitle>
             <CardDescription>
              A history of reminders you have received.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                  <p>You have no new alerts.</p>
              </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isAlertOpen && hasPendingAttendance} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-headline">Attendance Submission Required</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              This is a reminder to please submit your attendance for your current class (Grade 10 - A, Mathematics). Timely submission is important for our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAcknowledge} className="w-full">
              I will submit it now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
