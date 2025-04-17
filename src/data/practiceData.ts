import { Practice } from '@/types/course';

export const practiceData: Practice = {
  introduction: "This page contains a collection of coding practice problems across various difficulty levels. Practice regularly to improve your coding skills and problem-solving abilities.",
  
  questions: {
    easy: [
      {
        id: "practice-e1",
        title: "Two Sum",
        link: "https://leetcode.com/problems/two-sum/",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
      },
      {
        id: "practice-e2",
        title: "Valid Parentheses",
        link: "https://leetcode.com/problems/valid-parentheses/",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
      },
      {
        id: "practice-e3",
        title: "Merge Two Sorted Lists",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        description: "Merge two sorted linked lists and return it as a sorted list."
      },
      {
        id: "practice-e4",
        title: "Maximum Subarray",
        link: "https://leetcode.com/problems/maximum-subarray/",
        description: "Find the contiguous subarray (containing at least one number) which has the largest sum."
      }
    ],
    medium: [
      {
        id: "practice-m1",
        title: "Add Two Numbers",
        link: "https://leetcode.com/problems/add-two-numbers/",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit."
      },
      {
        id: "practice-m2",
        title: "Longest Substring Without Repeating Characters",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        description: "Given a string s, find the length of the longest substring without repeating characters."
      },
      {
        id: "practice-m3",
        title: "3Sum",
        link: "https://leetcode.com/problems/3sum/",
        description: "Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero."
      },
      {
        id: "practice-m4",
        title: "Container With Most Water",
        link: "https://leetcode.com/problems/container-with-most-water/",
        description: "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water."
      }
    ],
    hard: [
      {
        id: "practice-h1",
        title: "Median of Two Sorted Arrays",
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays."
      },
      {
        id: "practice-h2",
        title: "Regular Expression Matching",
        link: "https://leetcode.com/problems/regular-expression-matching/",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element."
      },
      {
        id: "practice-h3",
        title: "Trapping Rain Water",
        link: "https://leetcode.com/problems/trapping-rain-water/",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining."
      },
      {
        id: "practice-h4",
        title: "Merge k Sorted Lists",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        description: "You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it."
      }
    ]
  }
}; 