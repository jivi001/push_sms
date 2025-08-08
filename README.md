
# EduAlert - Role-Based Attendance Reminder System

EduAlert is a **forever-free** role-based attendance monitoring & notification system
built using **Next.js**, **Firebase**, and **Flutter**. It is designed to notify
staff (HOD, Admin, Teacher) via **in-app push notifications** when attendance
is not submitted on time.

## 🚀 Features
- **Role-Based Login** (Admin, HOD, Teacher) using Firebase Authentication
- **Web Dashboard** (Next.js on Vercel) for staff & attendance management
- **Mobile App** (Flutter) with full-screen push notifications
- **Firestore Database** for storing staff, attendance, and login details
- **Firebase Cloud Messaging (FCM)** for unlimited, free in-app notifications
- **Firebase Cloud Functions** to automate hourly attendance checks
- **Zero Cost Forever** using only free Firebase and Vercel tiers

## 🗂️ Data Structure (Firestore)
```
users/{uid}:
  name: string
  email: string
  role: "Admin" | "HOD" | "Teacher"
  phone: string
  department: string
  lastLogin: timestamp

attendance/{docId}:
  staffId: string (ref to users/{uid})
  date: timestamp
  submitted: boolean
```

## 📦 Tech Stack
- **Frontend (Web)**: Next.js + TypeScript + TailwindCSS
- **Backend API**: Next.js API Routes + Firebase Admin SDK
- **Database**: Firebase Firestore (Spark Plan)
- **Notifications**: Firebase Cloud Messaging
- **Automation**: Firebase Cloud Functions
- **Mobile App**: Flutter + Firebase

## 🛠️ Setup & Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/edualert.git
cd edualert
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file with:
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
```

### 4. Firebase Setup
- Create a Firebase project
- Enable **Authentication**, **Firestore**, and **Cloud Messaging**
- Download service account credentials and place in `.env.local`
- Deploy Cloud Functions:
```bash
firebase deploy --only functions
```

### 5. Run Locally
```bash
npm run dev
```

### 6. Deploy
- Push to GitHub
- Connect repo to **Vercel**
- Add environment variables in Vercel dashboard
- Deploy!

## 📱 Mobile App
The Flutter app subscribes users to their **role-based topic** after login:
```dart
FirebaseMessaging.instance.subscribeToTopic(role);
```
It listens for `data` payloads to display **full-screen alerts**.

## 🛡️ Security
- All sensitive operations (writing to Firestore, sending notifications) are done via secure API routes or Cloud Functions.
- No service account keys are exposed in client code.

## 📄 License
This project is licensed under the MIT License.
