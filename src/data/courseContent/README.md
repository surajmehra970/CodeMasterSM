# Course Content Organization

This directory contains modular content files for the DSA course. Each day's content is stored in a separate file with a clear naming pattern.

## File Structure

- `day1.ts` - Time Complexity, Big-O
- `day2.ts` - Bit Manipulation
- `day7.ts` - Mock Test (LeetCode Contest)
- `day17.ts` - Binary Search

## How to Add New Content

1. Create a new file named `day{N}.ts` where N is the day number
2. Import the Content type from `@/types/course`
3. Define and export the content object using the standard structure
4. Import the new file in `index.ts` and add it to the `courseContentMap`

## Example

```typescript
// day3.ts
import { Content } from '@/types/course';

const arraysBasicContent: Content = {
  introduction: "Arrays are fundamental data structures...",
  learningObjectives: [
    "Master basic array operations",
    "Understand array memory representation"
  ],
  sections: [
    // ...
  ],
  homework: [
    // ...
  ],
  quiz: [
    // ...
  ]
};

export default arraysBasicContent;
```

Then update the index.ts file:

```typescript
// In index.ts
import arraysBasicContent from './day3';

// Add to courseContentMap
const courseContentMap = {
  // ...existing entries
  3: arraysBasicContent
};
``` 