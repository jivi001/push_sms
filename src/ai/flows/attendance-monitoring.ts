// src/ai/flows/attendance-monitoring.ts
'use server';
/**
 * @fileOverview A flow to monitor attendance status and send reminders to teachers.
 *
 * - checkAttendanceAndSendReminders - A function that checks for missing attendance and sends reminders.
 * - CheckAttendanceAndSendRemindersInput - The input type for the checkAttendanceAndSendReminders function.
 * - CheckAttendanceAndSendRemindersOutput - The return type for the checkAttendanceAndSendReminders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {fcmService} from "@/services/fcm-service";
import type { User } from '@/lib/types';

// Mock database of teachers and their schedules
const MOCK_TEACHERS: (User & {schedule: {[hour: number]: {className: string, subject: string}}, fcmToken?: string})[] = [
    { uid: '1', name: 'Alice Williams', email: 'teacher@example.com', role: 'teacher', fcmToken: 'mock-fcm-token-for-alice', schedule: { 9: {className: "Grade 10 - A", subject: "Mathematics"}, 14: {className: "Grade 11 - B", subject: "Algebra"} } },
    { uid: '2', name: 'Bob Johnson', email: 'teacher2@example.com', role: 'teacher', fcmToken: 'mock-fcm-token-for-bob', schedule: { 10: {className: "Grade 8 - C", subject: "History"}, 15: {className: "Grade 9 - A", subject: "Geography"} } },
    { uid: '3', name: 'Charlie Brown', email: 'teacher3@example.com', role: 'teacher', schedule: { 11: {className: "Grade 12 - B", subject: "Physics"} } }, // No FCM token
    { uid: '4', name: 'Diana Prince', email: 'teacher4@example.com', role: 'teacher', fcmToken: 'mock-fcm-token-for-diana', schedule: { 9: {className: "Grade 9 - D", subject: "English"} } },
    { uid: '5', name: 'Eve Adams', email: 'teacher5@example.com', role: 'teacher', fcmToken: 'mock-fcm-token-for-eve', schedule: { 9: {className: "Grade 11 - C", subject: "Chemistry"} } },
];


const CheckAttendanceAndSendRemindersInputSchema = z.object({
  date: z.string().describe('The date to check attendance for (YYYY-MM-DD).'),
  hour: z.number().describe('The hour to check attendance for (0-23).'),
});
export type CheckAttendanceAndSendRemindersInput = z.infer<typeof CheckAttendanceAndSendRemindersInputSchema>;

const CheckAttendanceAndSendRemindersOutputSchema = z.object({
  remindersSent: z.number().describe('The number of attendance reminders sent.'),
});
export type CheckAttendanceAndSendRemindersOutput = z.infer<typeof CheckAttendanceAndSendRemindersOutputSchema>;

export async function checkAttendanceAndSendReminders(input: CheckAttendanceAndSendRemindersInput): Promise<CheckAttendanceAndSendRemindersOutput> {
  return checkAttendanceAndSendRemindersFlow(input);
}

const checkAttendanceAndSendRemindersFlow = ai.defineFlow(
  {
    name: 'checkAttendanceAndSendRemindersFlow',
    inputSchema: CheckAttendanceAndSendRemindersInputSchema,
    outputSchema: CheckAttendanceAndSendRemindersOutputSchema,
  },
  async input => {
    const { hour } = input;

    // In a real app, you would query your database (e.g., Firestore) to find teachers 
    // who have a class scheduled for the current hour but haven't submitted attendance.
    
    // For this demo, we'll find all teachers who have a class scheduled for the given hour.
    // We'll pretend none of them have submitted attendance yet.
    const teachersToRemind = MOCK_TEACHERS.filter(t => t.schedule[hour]);

    if (!teachersToRemind.length) {
      return { remindersSent: 0 };
    }

    let remindersSentCount = 0;
    
    for (const teacher of teachersToRemind) {
        if (teacher.fcmToken) {
            const { className, subject } = teacher.schedule[hour];
            const title = "Attendance Reminder";
            const body = `Please submit attendance for ${subject} in ${className}.`;
            
            const success = await fcmService.sendFcmMessage(teacher.fcmToken, title, body);
            
            if (success) {
                remindersSentCount++;
            }
        }
    }

    return { remindersSent: remindersSentCount };
  }
);
