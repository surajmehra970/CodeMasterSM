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
  ]
};

export default templateContent; 