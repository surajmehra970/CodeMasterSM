# Firebase Setup for User Profile Storage

This application uses Firebase to store user profile data. Follow these steps to set up Firebase for your project:

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the steps to create a new project
3. Give your project a name and follow the setup wizard

## Step 2: Add Firebase to your Web App

1. In your Firebase project console, click on the web icon (</>) to add a web app
2. Register your app with a nickname
3. Copy the Firebase configuration values that are provided

## Step 3: Set up Environment Variables

1. Create a `.env.local` file in the root directory of your project if it doesn't exist
2. Add the following environment variables with your Firebase configuration values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 4: Set up Firestore Database

1. In the Firebase console, navigate to "Firestore Database"
2. Click "Create database"
3. Choose either "Start in production mode" or "Start in test mode" (for development, test mode is easier)
4. Select a location for your database
5. Wait for the database to be created

## Step 5: Set up Authentication Rules

1. Go to the "Rules" tab in Firestore
2. Update the rules to allow authenticated users to read and write their own data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /userProfiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 6: Set up Authentication

1. In the Firebase console, navigate to "Authentication"
2. Click "Get started"
3. Enable the authentication methods you want to use (Email/Password, Google, etc.)
4. Follow the steps to configure each provider

After completing these steps, your application will be connected to Firebase and ready to store user profiles! 