import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ClipboardList } from "lucide-react";

export default function TeacherView() {
  return (
    <div className="grid gap-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline">
            Your Attendance Status
          </CardTitle>
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-6 bg-secondary/50 rounded-lg">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-2xl font-bold">All Good!</p>
              <p className="text-muted-foreground">
                Your attendance submissions are all up to date. Keep up the great work!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-center py-12 text-muted-foreground">
                <p>You have no new alerts.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
