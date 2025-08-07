# **App Name**: Timely Attendance Notifier

## Core Features:

- Secure Authentication: User Authentication: Secure email and password-based authentication using Firebase Auth to manage user accounts.
- Role Detection: Role-Based Access: Automatically determine the user's role (teacher, admin, HOD) upon login based on data stored in Firestore.
- Role-Based Dashboards: Customizable Dashboard: Role-specific dashboard UI that displays relevant information and actions based on the user's role.
- Attendance Monitoring: Intelligent Attendance Monitoring Tool: AI backend monitors Firestore for pending attendance and schedules alerts to instructors.
- Real-Time Fullscreen Alerts: Real-Time Notifications: Utilizes Firebase Cloud Messaging (FCM) to send real-time, full-screen alerts to remind teachers to submit attendance, and create alert logs in Firestore.
- FCM Token Handling: Token Management: Automatically save and update FCM tokens in Firestore after login for reliable notification delivery.

## Style Guidelines:

- Primary color: #3B82F6 (a vibrant blue) to evoke trust and reliability in educational administration. This color conveys authority while remaining accessible.
- Background color: #E5E7EB (a light gray), for a clean and professional feel. It provides a neutral backdrop that complements the primary color without distracting from the app's core functionalities.
- Accent color: #4ADE80 (a bright green) to highlight key interactive elements such as call-to-action buttons and notifications. Its brightness helps draw attention.
- Font pairing: 'Poppins' (sans-serif) for headlines, giving a geometric and contemporary look, and 'PT Sans' (sans-serif) for body text, to ensure readability and a modern feel.
- Use clear and recognizable icons for navigation and alerts, with a consistent design style throughout the app.
- Responsive layout that adapts seamlessly to different screen sizes, ensuring optimal usability on both mobile phones and tablets.
- Subtle animations for transitions and loading states to enhance user experience without being distracting.