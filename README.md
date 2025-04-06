# CodeMaster: DSA and Programming Learning Platform

CodeMaster is a comprehensive web application for learning Data Structures, Algorithms, and Programming Languages. It provides structured courses with day-by-day learning paths to help users master technical concepts and prepare for interviews.

## Features

- **Structured Learning Path**: Follow a day-by-day roadmap that guides you from basics to advanced topics
- **DSA Course**: A 4-month curriculum covering all essential data structures and algorithms
- **Problem-Based Learning**: Each topic includes hand-picked practice problems from platforms like LeetCode
- **Extensible Architecture**: Designed to easily add new courses for different programming languages
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Firebase Integration**: Dynamic content management with Firestore database

## Current Courses

- **Data Structures & Algorithms**: A comprehensive 4-month roadmap covering:
  - Foundations & Problem-Solving Basics
  - Trees, Graphs & Dynamic Programming
  - Advanced DSA & Interview-Style Problems
  - Mock Interviews & System Design

- **Coming Soon**:
  - Python Programming
  - JavaScript Mastery

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Database**: Firebase Firestore
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Firebase account (for database)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dsa-learning-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Go to Project Settings > General > Your apps > Web app
   - Click "Add app" if you don't have one already
   - Register your app and get the configuration
   - Copy the configuration values to `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Migrate course data to Firebase:
```bash
npm run migrate:course
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Firebase Data Structure

The application uses Firebase Firestore with the following structure:

- `courses/` - Collection of all courses
  - `dsa-course/` - Document for the DSA course
    - `days/` - Sub-collection for course days content
      - `day-1/` - Document containing content for Day 1
      - `day-2/` - Document containing content for Day 2
      - ...
    - `problems/` - Sub-collection for LeetCode problems
      - `day-1/` - Document containing problems for Day 1
      - `day-2/` - Document containing problems for Day 2
      - ...

## Project Structure

```
/src
  /app                  # Next.js app router pages
    /courses            # Course pages
      /dsa              # DSA course
    /resources          # Resources page
    /about              # About page
  /components           # Reusable UI components
  /data                 # Data files for courses and content
  /services             # Services for interacting with Firebase
  /types                # TypeScript type definitions
/scripts                # Scripts for data migration
```

## Adding New Content

You can add new content in two ways:

1. **Using the Firebase Console:**
   - Navigate to your Firestore Database
   - Add documents to the appropriate collections

2. **Updating the source code:**
   - Modify `src/data/dsaCourse.ts` with new content
   - Run `npm run migrate:course` to upload to Firebase

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- LeetCode for problem references
- All educational content creators whose resources we've referenced 