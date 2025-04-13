# CodeMaster: DSA and Programming Learning Platform

CodeMaster is a comprehensive web application for learning Data Structures, Algorithms, and Programming Languages. It provides structured courses with day-by-day learning paths to help users master technical concepts and prepare for interviews.

## Features

- **Structured Learning Path**: Follow a day-by-day roadmap that guides you from basics to advanced topics
- **DSA Course**: A 4-month curriculum covering all essential data structures and algorithms
- **Problem-Based Learning**: Each topic includes hand-picked practice problems from platforms like LeetCode
- **AI Career Mentor**: Personalized guidance powered by lightweight models for efficient processing
- **Extensible Architecture**: Designed to easily add new courses for different programming languages
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Local Data**: Course content stored locally in TypeScript files for easy editing
- **Authentication**: Secure access with Google Sign-In integration

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
- **Authentication**: NextAuth.js with Google provider
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- A Google OAuth client ID and secret (for authentication)

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

3. Set up environment variables:
   - Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_APP_NAME=CodeMaster
NEXT_PUBLIC_APP_VERSION=1.0.0

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Hugging Face API for AI Mentor
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

4. Set up Google OAuth:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as the application type
   - Add "http://localhost:3000" to the "Authorized JavaScript origins"
   - Add "http://localhost:3000/api/auth/callback/google" to the "Authorized redirect URIs"
   - Copy the Client ID and Client Secret to your `.env.local` file

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Data Structure

The application uses local TypeScript files to store course content:

- `src/data/courseContent/` - Directory containing all course content
  - `index.ts` - Main file that exports all course content and provides helper functions
  - `day1.ts` through `day51.ts` - Individual day content files
  - Each day content includes:
    - Introduction
    - Learning objectives
    - Sections with explanations and code examples
    - Homework problems
    - Quiz questions

## Project Structure

```
/src
  /app                  # Next.js app router pages
    /api                # API routes
      /auth             # Authentication API routes
    /courses            # Course pages
      /dsa              # DSA course
    /login              # Login page
    /resources          # Resources page
    /about              # About page
  /components           # Reusable UI components
    /AuthProvider.tsx   # NextAuth context provider
  /data                 # Data files for courses and content
    /courseContent      # Daily content stored as TypeScript files
    /dsaCourse.ts       # Course structure definition
  /services             # Service layer for content retrieval
  /types                # TypeScript type definitions
  /middleware.ts        # NextAuth middleware for route protection
```

## Authentication

The application uses NextAuth.js with Google OAuth for authentication. The authentication flow is as follows:

1. Users navigate to the application
2. Unauthenticated users are redirected to the login page
3. Users click "Sign in with Google" and are redirected to Google's OAuth consent screen
4. After successful authentication, users are redirected back to the application
5. Authenticated users can access all content and features

### Protected Routes

All routes except for the login page and authentication API routes are protected and require authentication. This is implemented using NextAuth.js middleware.

## AI Career Mentor

The platform includes an AI Career Mentor powered by lightweight models for efficient processing:

- **Personalized Career Guidance**: Get advice tailored to your skills, experience, and career goals
- **Learning Path Recommendations**: Receive suggestions for courses and resources based on your profile
- **Interview Preparation**: Get tips and practice questions for technical interviews
- **Resource Curation**: Discover curated learning materials for your desired skills

The mentor uses DistilGPT2, a lightweight version of GPT-2 that offers:
- Faster response times
- Lower computational requirements
- Efficient natural language understanding
- Similar capabilities to larger models but optimized for performance

### Setting up the AI Mentor

To use the AI Mentor:

1. Sign up for a free Hugging Face account at [huggingface.co](https://huggingface.co)
2. Get your API key from your Hugging Face account settings
3. Add the API key to your `.env.local` file:
   ```
   HUGGINGFACE_API_KEY=your-huggingface-api-key
   ```
4. Ensure the `USE_REAL_MODEL` constant is set to `true` in `src/app/api/ai-mentor/route.ts`

Note: The AI Mentor will fall back to rule-based responses if the Hugging Face API is unavailable or rate-limited.

## Adding New Content

You can add new content by:

1. **Creating a new day content file:**
   - Create a new TypeScript file in `src/data/courseContent/` following the existing pattern
   - Export the content with the appropriate type
   - Import and add it to the `courseContentMap` in `src/data/courseContent/index.ts`

2. **Updating existing content:**
   - Modify the appropriate day file in `src/data/courseContent/`
   - Your changes will be available immediately after refreshing

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to improve the platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- LeetCode for problem references
- All educational content creators whose resources we've referenced 