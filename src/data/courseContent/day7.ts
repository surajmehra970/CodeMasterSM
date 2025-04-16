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
  ],
  practice: {
    introduction: "This mock test contains a mix of problems from the topics covered in Week 1: Time Complexity, Bit Manipulation, Arrays, Two Pointers, Sliding Window, and Prefix Sum. Challenge yourself to solve these problems within a time limit to test your understanding.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Missing Number (Bit Manipulation)",
          link: "https://leetcode.com/problems/missing-number/",
          description: "Find the missing number in an array containing n distinct numbers in range [0, n] using bit manipulation."
        },
        {
          id: "e2",
          title: "Valid Palindrome (Two Pointers)",
          link: "https://leetcode.com/problems/valid-palindrome/",
          description: "Determine if a string is a palindrome, considering only alphanumeric characters and ignoring cases."
        },
        {
          id: "e3",
          title: "Running Sum of 1d Array (Prefix Sum)",
          link: "https://leetcode.com/problems/running-sum-of-1d-array/",
          description: "Return the running sum of an array to demonstrate understanding of prefix sums."
        },
        {
          id: "e4",
          title: "Contains Duplicate (Arrays)",
          link: "https://leetcode.com/problems/contains-duplicate/",
          description: "Given an integer array, determine if any value appears at least twice. Analyze different approaches and their time complexity."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Subarray Sum Equals K (Prefix Sum)",
          link: "https://leetcode.com/problems/subarray-sum-equals-k/",
          description: "Find the number of subarrays with sum equal to k using prefix sum techniques."
        },
        {
          id: "m2",
          title: "Longest Substring Without Repeating Characters (Sliding Window)",
          link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
          description: "Find the length of the longest substring without repeating characters using a sliding window approach."
        },
        {
          id: "m3",
          title: "Single Number III (Bit Manipulation)",
          link: "https://leetcode.com/problems/single-number-iii/",
          description: "Find two numbers that appear only once in an array where every other number appears twice. Use bit manipulation."
        },
        {
          id: "m4",
          title: "3Sum (Two Pointers)",
          link: "https://leetcode.com/problems/3sum/",
          description: "Find all unique triplets that sum to zero using the two pointers technique."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Sliding Window Maximum (Sliding Window)",
          link: "https://leetcode.com/problems/sliding-window-maximum/",
          description: "Find the maximum element in each sliding window of size k in an array."
        },
        {
          id: "h2",
          title: "Trapping Rain Water (Two Pointers/Array)",
          link: "https://leetcode.com/problems/trapping-rain-water/",
          description: "Compute how much water can be trapped after raining, using a two-pointer approach."
        }
      ]
    }
  }
};

export default mockTestWeek1Content; 