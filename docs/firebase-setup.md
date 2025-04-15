# Firebase Configuration

This document provides guidance on setting up Firebase in this application.

## Environment Variables

Firebase requires specific environment variables to be set in your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin (for server-side operations)
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email
FIREBASE_ADMIN_PRIVATE_KEY=your-private-key
```

## Authentication Setup

This application uses NextAuth with Google for authentication, which is then integrated with Firebase Auth:

1. The user signs in with Google through NextAuth
2. The server creates a Firebase custom token
3. The client exchanges this token for a Firebase session
4. This allows the user to interact with Firestore while maintaining security

## Security Considerations

- The API endpoint intentionally does not return sensitive information like API keys
- Use environment variables with the `NEXT_PUBLIC_` prefix only for values that are safe to expose to the client
- For server-only credentials, use environment variables without the `NEXT_PUBLIC_` prefix
- Consider using Firebase Security Rules to restrict access to your Firestore database

## Firestore Security Rules

The application uses the following security rules for Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules for userProfiles to match by email rather than uid
    match /userProfiles/{userId} {
      // Allow read/write if authenticated and the userId matches the user's email
      allow read, write: if request.auth != null && (
        request.auth.token.email == userId || 
        request.auth.uid == userId
      );
    }
    
    // Default deny rule for other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

These rules ensure users can only access their own profile data. 