import { Content } from '@/types/course';

const binarySearchContent: Content = {
  introduction: "Binary Search is an efficient algorithm for searching sorted arrays. It repeatedly divides the search space in half, making it much faster than linear search for large datasets.",
  learningObjectives: [
    "Understand binary search algorithm",
    "Implement binary search",
    "Solve variations of binary search problems",
    "Analyze time complexity"
  ],
  sections: [
    {
      title: "Binary Search Fundamentals",
      content: "Binary search is a divide-and-conquer algorithm that works on sorted arrays. It compares the target value with the middle element and eliminates half of the remaining elements in each step.",
      codeExamples: [
        {
          language: "java",
          code: `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) 
            return mid;  // Found the target
            
        if (arr[mid] < target)
            left = mid + 1;  // Target is in right half
        else
            right = mid - 1;  // Target is in left half
    }
    
    return -1;  // Target not found
}`,
          explanation: "Basic implementation of binary search"
        }
      ]
    },
    {
      title: "Binary Search Variations",
      content: "Binary search can be modified to solve various problems like finding the first/last occurrence, finding insertion point, or searching in rotated arrays.",
      codeExamples: [
        {
          language: "java",
          code: `// Find first occurrence of target
public int findFirst(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;  // Found a match, but continue searching left
            right = mid - 1;
        }
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return result;
}

// Find last occurrence of target
public int findLast(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;  // Found a match, but continue searching right
            left = mid + 1;
        }
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return result;
}`,
          explanation: "Finding first and last occurrences of a target value"
        }
      ]
    },
    {
      title: "Binary Search on Answer",
      content: "Binary Search can also be applied on the answer space rather than the index space, which is useful for optimization problems.",
      codeExamples: [
        {
          language: "java",
          code: `// Find the square root of a number using binary search
public int sqrt(int x) {
    if (x == 0) return 0;
    
    long left = 1;
    long right = x;
    long result = 0;
    
    while (left <= right) {
        long mid = left + (right - left) / 2;
        
        if (mid * mid <= x) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return (int) result;
}

// Find the minimum element in a rotated sorted array
public int findMin(int[] nums) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}`,
          explanation: "Binary search applied to finding optimal values rather than indexes"
        }
      ]
    }
  ],
  homework: [
    {
      id: "bs-1",
      question: "Implement binary search to find the insertion position of a target value in a sorted array.",
      solution: "Return left after the binary search loop ends"
    },
    {
      id: "bs-2",
      question: "Find the peak element in an array. A peak element is one that is greater than its neighbors.",
      solution: "Use binary search by comparing mid element with its neighbors"
    },
    {
      id: "bs-3",
      question: "Search for a target in a sorted 2D matrix where each row and column is sorted.",
      solution: "Either use binary search on each row, or treat the 2D matrix as a 1D array"
    }
  ],
  quiz: [
    {
      id: "bs-q1",
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity because it divides the search space in half in each step."
    },
    {
      id: "bs-q2",
      question: "What is a prerequisite for using binary search?",
      options: ["The array must be sorted", "The array must be of even length", "The array must contain unique elements", "The array must be dynamically allocated"],
      correctAnswer: 0,
      explanation: "Binary search requires the array to be sorted for it to work correctly."
    },
    {
      id: "bs-q3",
      question: "What is the potential issue with calculating mid as (left + right) / 2?",
      options: ["It's slower than other methods", "It might cause arithmetic overflow", "It only works with even-sized arrays", "It causes rounding issues with negative numbers"],
      correctAnswer: 1,
      explanation: "When left and right are large integers, their sum might overflow. left + (right - left) / 2 is safer."
    }
  ]
};

export default binarySearchContent; 