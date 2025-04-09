import { Content } from '@/types/course';

const mockTestWeek1Content: Content = {
  introduction: "This mock test contains a selection of LeetCode-style problems that cover topics from Week 1. It will help you apply what you've learned about time complexity, bit manipulation, arrays, two pointers, sliding window, and prefix sum.",
  learningObjectives: [
    "Apply Week 1 concepts to solve algorithm problems",
    "Practice problem-solving under time constraints",
    "Develop a systematic approach to algorithmic challenges",
    "Build confidence for technical interviews"
  ],
  sections: [
    {
      title: "Week 1 Mixed Problems",
      content: "These problems cover all the topics we've learned this week. Try to solve them within the recommended time limit to simulate a real competitive programming environment.",
      codeExamples: []
    }
  ],
  homework: [
    {
      id: "mock1-1",
      question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      solution: "Use a HashMap to store numbers and their indices. For each number, check if target-number exists in the map."
    },
    {
      id: "mock1-2",
      question: "Maximum Subarray: Find the contiguous subarray which has the largest sum.",
      solution: "Use Kadane's algorithm to keep track of current sum and maximum sum."
    },
    {
      id: "mock1-3",
      question: "Single Number: Given a non-empty array of integers, every element appears twice except for one. Find that single one.",
      solution: "Use XOR operation on all numbers. The result will be the single number."
    },
    {
      id: "mock1-4",
      question: "Subarray Sum Equals K: Given an array of integers and an integer k, find the total number of continuous subarrays whose sum equals k.",
      solution: "Use a HashMap to store prefix sums and their frequencies."
    },
    {
      id: "mock1-5",
      question: "Longest Substring Without Repeating Characters: Find the length of the longest substring without repeating characters.",
      solution: "Use sliding window technique with a hash set to track characters in the current window."
    }
  ],
  quiz: [
    {
      id: "mock1-q1",
      question: "What is the most efficient approach to find if there exists a pair with a given sum in an unsorted array?",
      options: ["Two nested loops (O(n²))", "Sort and use two pointers (O(n log n))", "Use a hash set (O(n))", "Binary search (O(n log n))"],
      correctAnswer: 2,
      explanation: "Using a hash set gives O(n) time complexity, which is the most efficient for an unsorted array."
    },
    {
      id: "mock1-q2",
      question: "Which approach is best suited for finding the maximum sum subarray of fixed size k?",
      options: ["Prefix sum", "Sliding window", "Divide and conquer", "Dynamic programming"],
      correctAnswer: 1,
      explanation: "Sliding window is the optimal approach for finding maximum sum subarray of fixed size k with O(n) time complexity."
    }
  ]
};

export default mockTestWeek1Content; 