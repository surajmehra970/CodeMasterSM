import { Content } from '@/types/course';

const arraysBasicContent: Content = {
  introduction: "Arrays are one of the most fundamental data structures in computer science. They store elements of the same type in contiguous memory locations, allowing for direct access using indices. Understanding arrays is essential for solving numerous algorithmic problems and building more complex data structures.",
  
  learningObjectives: [
    "Understand array operations and their time complexities",
    "Learn basic array manipulation techniques",
    "Master common array algorithms and patterns",
    "Practice solving array-based problems"
  ],
  
  sections: [
    {
      title: "Array Fundamentals",
      content: "An array is a collection of elements stored at contiguous memory locations. The elements can be accessed using indices, which typically start at 0. Arrays offer constant-time access to elements using their indices, making them highly efficient for certain operations.",
      codeExamples: [
        {
          language: "java",
          code: `// Declaring arrays in Java
int[] numbers = new int[5]; // Creates an array of size 5 with default values (0)
int[] initialized = {1, 2, 3, 4, 5}; // Initializes array with values

// Accessing array elements
int firstElement = initialized[0]; // Accessing first element (value: 1)
int lastElement = initialized[4]; // Accessing last element (value: 5)

// Modifying array elements
numbers[0] = 10; // Assigns value 10 to first element
numbers[4] = 50; // Assigns value 50 to last element`,
          explanation: "Basic operations with arrays in Java including declaration, accessing, and modification."
        }
      ]
    },
    {
      title: "Common Array Operations",
      content: "Arrays support various operations, each with different time complexities. Understanding these operations and their performance characteristics helps in writing efficient code. Let's look at some common operations and their time complexities.",
      codeExamples: [
        {
          language: "java",
          code: `// Traversal - O(n)
void traverse(int[] arr) {
    for (int element : arr) {
        System.out.println(element);
    }
}

// Search - O(n) for linear search
int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Insertion in an unsorted array - O(1) at the end if space available
// Insertion at specific position - O(n) due to shifting
void insertAtPosition(int[] arr, int pos, int value, int size) {
    // Assuming array has enough space and size is current filled size
    for (int i = size - 1; i >= pos; i--) {
        arr[i + 1] = arr[i]; // Shift elements right
    }
    arr[pos] = value;
}

// Deletion - O(n) due to shifting
void deleteFromPosition(int[] arr, int pos, int size) {
    for (int i = pos; i < size - 1; i++) {
        arr[i] = arr[i + 1]; // Shift elements left
    }
}`,
          explanation: "This example shows different array operations and their time complexities."
        }
      ]
    },
    {
      title: "Array Manipulation Techniques",
      content: "Several techniques are commonly used to manipulate arrays in algorithmic problem-solving. These include in-place modifications, using additional data structures, and various iteration patterns.",
      codeExamples: [
        {
          language: "java",
          code: `// Reversing an array in-place - O(n)
void reverseArray(int[] arr) {
    int start = 0, end = arr.length - 1;
    while (start < end) {
        // Swap elements at start and end indices
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        
        // Move indices towards center
        start++;
        end--;
    }
}

// Rotating an array by k positions to the right - O(n)
void rotateArray(int[] nums, int k) {
    int n = nums.length;
    k = k % n; // Handle cases where k > n
    
    // Reverse the entire array
    reverse(nums, 0, n - 1);
    // Reverse first k elements
    reverse(nums, 0, k - 1);
    // Reverse the rest
    reverse(nums, k, n - 1);
}

void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}`,
          explanation: "Common array manipulation techniques like in-place reversal and rotation."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "arrays-hw-1",
      question: "Implement a function to find the second largest element in an array without sorting it. What is the time complexity of your solution?",
      solution: "```java\nint findSecondLargest(int[] arr) {\n    if (arr.length < 2) return -1; // Invalid input\n    \n    int largest = Integer.MIN_VALUE;\n    int secondLargest = Integer.MIN_VALUE;\n    \n    for (int num : arr) {\n        if (num > largest) {\n            secondLargest = largest;\n            largest = num;\n        } else if (num > secondLargest && num != largest) {\n            secondLargest = num;\n        }\n    }\n    \n    return secondLargest;\n}\n```\nTime complexity: O(n) - We traverse the array once."
    },
    {
      id: "arrays-hw-2",
      question: "Given an array of integers, move all zeros to the end of the array while maintaining the relative order of the non-zero elements. Do this in-place without creating a copy of the array.",
      solution: "```java\nvoid moveZeroes(int[] nums) {\n    int insertPos = 0;\n    \n    // Move all non-zero elements to the front\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] != 0) {\n            nums[insertPos++] = nums[i];\n        }\n    }\n    \n    // Fill remaining positions with zeros\n    while (insertPos < nums.length) {\n        nums[insertPos++] = 0;\n    }\n}\n```"
    }
  ],
  
  quiz: [
    {
      id: "arrays-quiz-1",
      question: "What is the time complexity of accessing an element at a given index in an array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Array access by index is O(1) (constant time) because arrays store elements in contiguous memory locations, allowing direct access using the index."
    },
    {
      id: "arrays-quiz-2",
      question: "Which of the following operations on an array has the highest time complexity?",
      options: ["Accessing an element by index", "Finding the maximum element", "Inserting an element at the beginning", "Appending an element at the end (with space available)"],
      correctAnswer: 2,
      explanation: "Inserting an element at the beginning of an array requires shifting all existing elements one position to the right, resulting in O(n) time complexity."
    },
    {
      id: "arrays-quiz-3",
      question: "What is the space complexity of in-place array reversal?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "In-place reversal uses only a few variables regardless of the array size, resulting in constant O(1) space complexity."
    }
  ],
  
  // Added practice section for Array Basics
  practice: {
    introduction: "Practice is essential to master array manipulation. Complete the following LeetCode problems to reinforce your understanding of array operations and techniques.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Two Sum",
          link: "https://leetcode.com/problems/two-sum/",
          description: "Given an array of integers and a target, return indices of the two numbers such that they add up to the target."
        },
        {
          id: "e2",
          title: "Best Time to Buy and Sell Stock",
          link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
          description: "Find the maximum profit by buying and selling a stock once, given an array of prices."
        },
        {
          id: "e3",
          title: "Remove Duplicates from Sorted Array",
          link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
          description: "Remove duplicates from a sorted array in-place, returning the number of unique elements."
        },
        {
          id: "e4",
          title: "Majority Element",
          link: "https://leetcode.com/problems/majority-element/",
          description: "Find the majority element (appears more than n/2 times) in an array of size n."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Product of Array Except Self",
          link: "https://leetcode.com/problems/product-of-array-except-self/",
          description: "Calculate the product of all elements in the array except the current element without using division."
        },
        {
          id: "m2",
          title: "Find First and Last Position of Element in Sorted Array",
          link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
          description: "Find the starting and ending positions of a target value in a sorted array."
        },
        {
          id: "m3",
          title: "Rotate Array",
          link: "https://leetcode.com/problems/rotate-array/",
          description: "Rotate an array to the right by k steps."
        },
        {
          id: "m4",
          title: "Jump Game",
          link: "https://leetcode.com/problems/jump-game/",
          description: "Determine if you can reach the last index of an array where each element represents your maximum jump length."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Trapping Rain Water",
          link: "https://leetcode.com/problems/trapping-rain-water/",
          description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining."
        },
        {
          id: "h2",
          title: "Maximum Subarray Sum Circular",
          link: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
          description: "Find the maximum possible sum of a subarray in a circular array."
        }
      ]
    }
  }
};

export default arraysBasicContent; 