import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Alert } from "@/lib/types";

const mockAlerts: Alert[] = [
  {
    id: "1",
    teacherName: "Alice Williams",
    className: "Grade 10 - A",
    subject: "Mathematics",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1, 45)),
  },
  {
    id: "2",
    teacherName: "Bob Johnson",
    className: "Grade 8 - C",
    subject: "History",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1, 42)),
  },
  {
    id: "3",
    teacherName: "Charlie Brown",
    className: "Grade 12 - B",
    subject: "Physics",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1, 30)),
  },
  {
    id: "4",
    teacherName: "Diana Prince",
    className: "Grade 9 - A",
    subject: "English",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, 55)),
  },
  {
    id: "5",
    teacherName: "Eve Adams",
    className: "Grade 11 - D",
    subject: "Chemistry",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, 50)),
  },
];

export function AlertLogTable() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Recent Alert Log</CardTitle>
        <CardDescription>
          Showing the latest reminders sent to teachers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Time Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.teacherName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{alert.className}</Badge>
                </TableCell>
                <TableCell>{alert.subject}</TableCell>
                <TableCell className="text-right">
                  {alert.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
