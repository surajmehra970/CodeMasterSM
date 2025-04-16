import { Content } from '@/types/course';

/**
 * Template for creating new day content
 * 
 * To use:
 * 1. Copy this file to day{N}.ts (where N is the day number)
 * 2. Fill in the content sections
 * 3. Import in index.ts and add to courseContentMap
 */
const templateContent: Content = {
  introduction: "Brief introduction to the topic (1-2 paragraphs explaining the concept)",
  
  learningObjectives: [
    "Objective 1",
    "Objective 2",
    "Objective 3",
    "Objective 4"
  ],
  
  sections: [
    {
      title: "Section 1 Title",
      content: "Content for section 1. Provide detailed explanations of concepts.",
      codeExamples: [
        {
          language: "java",
          code: `// Example code here
public void exampleMethod() {
    // Implementation here
    System.out.println("Example code");
}`,
          explanation: "Brief explanation of what this code demonstrates"
        }
      ]
    },
    {
      title: "Section 2 Title",
      content: "Content for section 2. Add more in-depth information.",
      codeExamples: [
        {
          language: "java",
          code: `// Another example
public void anotherExample() {
    // Implementation
}`,
          explanation: "Explanation of this code"
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Question 1 for homework",
      solution: "Brief solution or approach hint"
    },
    {
      id: "hw-2",
      question: "Question 2 for homework",
      solution: "Brief solution or approach hint"
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "Multiple choice question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0, // Index of correct option (0-based)
      explanation: "Explanation of why this answer is correct"
    },
    {
      id: "quiz-2",
      question: "Another multiple choice question?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 2, // Index of correct option (0-based)
      explanation: "Explanation of why this answer is correct"
    }
  ],
  
  // Practice section with LeetCode questions
  practice: {
    introduction: "Practice is essential to master this topic. Complete the following LeetCode problems to reinforce your understanding.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Easy Problem 1",
          link: "https://leetcode.com/problems/problem-slug-1/",
          description: "Brief description of the problem"
        },
        {
          id: "e2",
          title: "Easy Problem 2",
          link: "https://leetcode.com/problems/problem-slug-2/",
          description: "Brief description of the problem"
        },
        {
          id: "e3",
          title: "Easy Problem 3",
          link: "https://leetcode.com/problems/problem-slug-3/",
          description: "Brief description of the problem"
        },
        {
          id: "e4",
          title: "Easy Problem 4",
          link: "https://leetcode.com/problems/problem-slug-4/",
          description: "Brief description of the problem"
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Medium Problem 1",
          link: "https://leetcode.com/problems/problem-slug-5/",
          description: "Brief description of the problem"
        },
        {
          id: "m2",
          title: "Medium Problem 2",
          link: "https://leetcode.com/problems/problem-slug-6/",
          description: "Brief description of the problem"
        },
        {
          id: "m3",
          title: "Medium Problem 3",
          link: "https://leetcode.com/problems/problem-slug-7/",
          description: "Brief description of the problem"
        },
        {
          id: "m4",
          title: "Medium Problem 4",
          link: "https://leetcode.com/problems/problem-slug-8/",
          description: "Brief description of the problem"
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Hard Problem 1",
          link: "https://leetcode.com/problems/problem-slug-9/",
          description: "Brief description of the problem"
        },
        {
          id: "h2",
          title: "Hard Problem 2",
          link: "https://leetcode.com/problems/problem-slug-10/",
          description: "Brief description of the problem"
        }
      ]
    }
  }
};

export default templateContent; 