export type Role = 'teacher' | 'admin' | 'hod';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
  fcmToken?: string;
}

export interface Alert {
  id: string;
  teacherName: string;
  className: string;
  subject: string;
  timestamp: Date;
}
