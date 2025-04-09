# CodeMaster: DSA and Programming Learning Platform

CodeMaster is a comprehensive web application for learning Data Structures, Algorithms, and Programming Languages. It provides structured courses with day-by-day learning paths to help users master technical concepts and prepare for interviews.

## Features

- **Structured Learning Path**: Follow a day-by-day roadmap that guides you from basics to advanced topics
- **DSA Course**: A 4-month curriculum covering all essential data structures and algorithms
- **Problem-Based Learning**: Each topic includes hand-picked practice problems from platforms like LeetCode
- **Extensible Architecture**: Designed to easily add new courses for different programming languages
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Local Data**: Course content stored locally in TypeScript files for easy editing

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
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

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
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

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
    /courses            # Course pages
      /dsa              # DSA course
    /resources          # Resources page
    /about              # About page
  /components           # Reusable UI components
  /data                 # Data files for courses and content
    /courseContent      # Daily content stored as TypeScript files
    /dsaCourse.ts       # Course structure definition
  /services             # Service layer for content retrieval
  /types                # TypeScript type definitions
```

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