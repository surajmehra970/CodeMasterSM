export interface Problem {
  id: string;
  name: string;
  link?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface CodeExample {
  language: string;
  code: string;
  explanation?: string;
}

export interface HomeworkProblem {
  id: string;
  question: string;
  codeExample?: CodeExample;
  solution?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DetailedContent {
  introduction: string;
  learningObjectives: string[];
  sections: {
    title: string;
    content: string;
    codeExamples?: CodeExample[];
  }[];
  homework?: HomeworkProblem[];
  quiz?: QuizQuestion[];
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  problems: Problem[];
  content?: DetailedContent;
}

export interface Day {
  id: string;
  day: number;
  topics: Topic[];
}

export interface Week {
  id: string;
  title: string;
  days: Day[];
}

export interface Month {
  id: string;
  title: string;
  description: string;
  target: string;
  weeks: Week[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  months: Month[];
}

// DSA Course Data
export const dsaCourse: Course = {
  id: "dsa-course",
  title: "Data Structures & Algorithms",
  description: "A comprehensive 4-month roadmap to master DSA concepts and ace technical interviews.",
  months: [
    {
      id: "month-1",
      title: "Foundations & Problem-Solving Basics",
      description: "Learn the fundamentals of DSA and start solving basic problems",
      target: "Learn Basics + Solve 100 Problems",
      weeks: [
        {
          id: "week-1",
          title: "Math, Arrays & Strings",
          days: [
            {
              id: "day-1",
              day: 1,
              topics: [
                {
                  id: "time-complexity",
                  title: "Time Complexity, Big-O",
                  description: "Understanding algorithmic efficiency and notation",
                  problems: [],
                  content: {
                    introduction: "Time complexity is a fundamental concept in algorithm analysis. It helps us understand how an algorithm's performance scales with input size, allowing us to make informed decisions about which algorithms to use for different problems.",
                    learningObjectives: [
                      "Understand why time complexity is important",
                      "Learn Big-O notation and common complexity classes",
                      "Analyze simple algorithms for their time complexity",
                      "Understand the basics of space complexity"
                    ],
                    sections: [
                      {
                        title: "Why Time Complexity?",
                        content: "Imagine you wrote a program that finds the largest number in an array. If your solution works on an array of 10 elements, it may still work for 1 million elements, but how fast? This is where time complexity helps us measure how an algorithm's runtime grows with input size."
                      },
                      {
                        title: "Understanding Big-O Notation",
                        content: "Big-O notation describes the upper bound of an algorithm's growth rate. It helps us classify algorithms based on how their runtime or space requirements grow as the input size grows.\n\nHere's a quick cheat sheet of common complexities:\n\n- O(1) - Constant: Accessing an element in an array\n- O(log N) - Logarithmic: Binary search\n- O(N) - Linear: Iterating through an array\n- O(N log N) - Log-Linear: Merge Sort, Quick Sort\n- O(N²) - Quadratic: Nested loops (Bubble Sort)\n- O(2^N) - Exponential: Recursive Fibonacci\n- O(N!) - Factorial: Traveling Salesman Problem"
                      },
                      {
                        title: "Practical Examples",
                        content: "Let's analyze time complexity using simple examples:",
                        codeExamples: [
                          {
                            language: "java",
                            code: "public class ConstantTime {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        System.out.println(arr[2]);  // Always takes the same time, no loops.\n    }\n}",
                            explanation: "Example 1: O(1) – Constant Time Complexity - This operation takes the same amount of time regardless of the input size."
                          },
                          {
                            language: "java",
                            code: "public class LinearTime {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for (int num : arr) {\n            System.out.print(num + \" \");  // Iterates through the array once.\n        }\n    }\n}",
                            explanation: "Example 2: O(N) – Linear Time Complexity - The runtime increases linearly with the input size."
                          },
                          {
                            language: "java",
                            code: "public class QuadraticTime {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = 0; j < arr.length; j++) {\n                System.out.print(arr[i] + \"\" + arr[j] + \" \");  // Nested loops\n            }\n        }\n    }\n}",
                            explanation: "Example 3: O(N²) – Quadratic Time Complexity - The runtime grows quadratically with the input size due to nested loops."
                          }
                        ]
                      },
                      {
                        title: "Space Complexity",
                        content: "Space complexity measures how much extra memory an algorithm needs as the input size grows.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "public class SpaceComplexity {\n    public static void main(String[] args) {\n        int n = 5;  // O(1) space (constant)\n        int[] arr = new int[n];  // O(N) space (depends on input size)\n    }\n}",
                            explanation: "This example shows both constant O(1) and linear O(N) space complexity."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw1-1",
                        question: "What is the time complexity of this function?",
                        codeExample: {
                          language: "java",
                          code: "void printNumbers(int n) {\n    for (int i = 1; i <= n; i *= 2) {\n        System.out.println(i);\n    }\n}"
                        },
                        solution: "O(log N) - The loop starts from 1 and doubles (i *= 2) until it reaches n. The number of iterations is log₂(N), so the complexity is O(log N)."
                      },
                      {
                        id: "hw1-2",
                        question: "Implement a function in Java that prints all pairs of elements from an array (Hint: Nested loops).",
                        solution: "```java\npublic class PrintPairs {\n    public static void printPairs(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = 0; j < arr.length; j++) {\n                System.out.println(arr[i] + \", \" + arr[j]);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        printPairs(arr);\n    }\n}\n```\nTime Complexity: O(N²) - Since we use nested loops iterating N × N times, the complexity is O(N²)."
                      },
                      {
                        id: "hw1-3",
                        question: "Find the time complexity of this function:",
                        codeExample: {
                          language: "java",
                          code: "void mysteryFunction(int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = i; j < n; j++) {\n            System.out.println(i + \" \" + j);\n        }\n    }\n}"
                        },
                        solution: "O(N²) - The outer loop runs N times. The inner loop runs (N + (N-1) + (N-2) + ... + 1) = N(N+1)/2 times. Since N²/2 simplifies to O(N²), the final complexity is O(N²)."
                      }
                    ],
                    quiz: [
                      {
                        id: "q1-1",
                        question: "What is the time complexity of this function?",
                        options: [
                          "O(N)",
                          "O(N log N)",
                          "O(N√N)",
                          "O(N²)"
                        ],
                        correctAnswer: 2,
                        explanation: "The outer loop runs N times, and the inner loop runs √N times. Total iterations: N × √N = O(N√N)"
                      },
                      {
                        id: "q1-2",
                        question: "Which time complexity is the best?",
                        options: [
                          "O(1)",
                          "O(log N)",
                          "O(N)",
                          "O(N²)"
                        ],
                        correctAnswer: 0,
                        explanation: "O(1) is constant time complexity, which means the algorithm's performance doesn't change with input size. This is the most efficient."
                      },
                      {
                        id: "q1-3",
                        question: "What is the space complexity of this function?",
                        options: [
                          "O(1)",
                          "O(N)",
                          "O(N log N)",
                          "O(N²)"
                        ],
                        correctAnswer: 1,
                        explanation: "The function creates an array of size N, which requires O(N) memory space."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-2",
              day: 2,
              topics: [
                {
                  id: "bit-manipulation",
                  title: "Bit Manipulation",
                  description: "Operations at bit-level to solve problems efficiently",
                  problems: [
                    {
                      id: "136",
                      name: "Single Number",
                      link: "https://leetcode.com/problems/single-number/",
                      difficulty: "Easy"
                    },
                    {
                      id: "338",
                      name: "Counting Bits",
                      link: "https://leetcode.com/problems/counting-bits/",
                      difficulty: "Medium"
                    },
                    {
                      id: "191",
                      name: "Number of 1 Bits",
                      link: "https://leetcode.com/problems/number-of-1-bits/",
                      difficulty: "Easy"
                    },
                    {
                      id: "190",
                      name: "Reverse Bits",
                      link: "https://leetcode.com/problems/reverse-bits/",
                      difficulty: "Easy"
                    },
                    {
                      id: "231",
                      name: "Power of Two",
                      link: "https://leetcode.com/problems/power-of-two/",
                      difficulty: "Easy"
                    },
                    {
                      id: "371",
                      name: "Sum of Two Integers",
                      link: "https://leetcode.com/problems/sum-of-two-integers/",
                      difficulty: "Medium"
                    },
                    {
                      id: "78",
                      name: "Subsets",
                      link: "https://leetcode.com/problems/subsets/",
                      difficulty: "Medium"
                    },
                    {
                      id: "201",
                      name: "Bitwise AND of Numbers Range",
                      link: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
                      difficulty: "Medium"
                    },
                    {
                      id: "1542",
                      name: "Find Longest Awesome Substring",
                      link: "https://leetcode.com/problems/find-longest-awesome-substring/",
                      difficulty: "Hard"
                    },
                    {
                      id: "1255",
                      name: "Maximum Score Words Formed by Letters",
                      link: "https://leetcode.com/problems/maximum-score-words-formed-by-letters/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "Bit manipulation is a powerful technique that involves manipulating individual bits of a number. It's often used to optimize solutions and solve problems efficiently using operations like AND, OR, XOR, shifts, and more.",
                    learningObjectives: [
                      "Understand basic bitwise operations (AND, OR, XOR, NOT)",
                      "Learn bit shifting operations (left shift, right shift)",
                      "Apply bit manipulation to solve common problems",
                      "Recognize patterns where bit manipulation can optimize solutions"
                    ],
                    sections: [
                      {
                        title: "Introduction to Bitwise Operators",
                        content: "In Java and most programming languages, there are six basic bitwise operators:\n\n- AND (&): Sets each bit to 1 if both bits are 1\n- OR (|): Sets each bit to 1 if at least one of the bits is 1\n- XOR (^): Sets each bit to 1 if exactly one of the bits is 1\n- NOT (~): Inverts all the bits\n- Left Shift (<<): Shifts bits to the left by a specified number of positions\n- Right Shift (>>): Shifts bits to the right by a specified number of positions"
                      },
                      {
                        title: "Common Bit Manipulation Tricks",
                        content: "Here are some common operations you can perform with bit manipulation:\n\n- Check if a number is even or odd: `(n & 1) == 0` for even, `(n & 1) == 1` for odd\n- Check if the i-th bit is set: `(n & (1 << i)) != 0`\n- Set the i-th bit: `n = n | (1 << i)`\n- Clear the i-th bit: `n = n & ~(1 << i)`\n- Toggle the i-th bit: `n = n ^ (1 << i)`\n- Count the number of set bits: Use Brian Kernighan's algorithm or built-in functions like `Integer.bitCount()` in Java"
                      },
                      {
                        title: "Practical Examples",
                        content: "Let's look at some practical examples of bit manipulation:",
                        codeExamples: [
                          {
                            language: "java",
                            code: "public class XORExample {\n    public static int findSingleNumber(int[] nums) {\n        int result = 0;\n        for (int num : nums) {\n            // XOR operation cancels out duplicates\n            result ^= num;\n        }\n        return result;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {4, 1, 2, 1, 2};\n        System.out.println(findSingleNumber(nums));  // Output: 4\n    }\n}",
                            explanation: "This is a solution to the 'Single Number' problem. Using XOR, we can find a number that appears exactly once in an array where all other numbers appear twice."
                          },
                          {
                            language: "java",
                            code: "public class CountBitsExample {\n    public static int[] countBits(int n) {\n        int[] result = new int[n + 1];\n        for (int i = 1; i <= n; i++) {\n            // Use previous results to calculate current\n            result[i] = result[i >> 1] + (i & 1);\n        }\n        return result;\n    }\n    \n    public static void main(String[] args) {\n        int[] bits = countBits(5);  // Output: [0,1,1,2,1,2]\n        for (int bit : bits) {\n            System.out.print(bit + \" \");\n        }\n    }\n}",
                            explanation: "This solution counts bits efficiently by using dynamic programming with bit manipulation."
                          }
                        ]
                      },
                      {
                        title: "Bit Manipulation in Competitive Programming",
                        content: "Bit manipulation is frequently used in competitive programming for:\n\n- Representing sets efficiently (bitmasks)\n- Optimizing space complexity\n- Faster arithmetic operations\n- Solving puzzles and pattern recognition problems\n\nBitmasking is particularly useful for problems involving subsets, where each bit can represent the inclusion or exclusion of an element."
                      }
                    ],
                    homework: [
                      {
                        id: "hw2-1",
                        question: "Write a function to check if a number is a power of 2 using bit manipulation.",
                        codeExample: {
                          language: "java",
                          code: "boolean isPowerOfTwo(int n) {\n    // Your code here\n}"
                        },
                        solution: "```java\nboolean isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}\n```\n\nExplanation: A power of 2 in binary has exactly one bit set to 1. The expression `n & (n - 1)` clears the rightmost set bit. If the result is 0, there was only one bit set."
                      },
                      {
                        id: "hw2-2",
                        question: "Implement a function to count the number of set bits (1s) in an integer without using any built-in functions.",
                        codeExample: {
                          language: "java",
                          code: "int countSetBits(int n) {\n    // Your code here\n}"
                        },
                        solution: "```java\nint countSetBits(int n) {\n    int count = 0;\n    while (n > 0) {\n        n = n & (n - 1);  // Clear the least significant set bit\n        count++;\n    }\n    return count;\n}\n```\n\nThis is Brian Kernighan's algorithm, which is more efficient than checking each bit. It works by clearing the rightmost set bit in each iteration."
                      },
                      {
                        id: "hw2-3",
                        question: "Given an array where all numbers appear three times except for one number which appears only once, find the single number using bit manipulation.",
                        codeExample: {
                          language: "java",
                          code: "int singleNumber(int[] nums) {\n    // Your code here\n}"
                        },
                        solution: "```java\nint singleNumber(int[] nums) {\n    int ones = 0, twos = 0;\n    for (int num : nums) {\n        ones = (ones ^ num) & ~twos;\n        twos = (twos ^ num) & ~ones;\n    }\n    return ones;\n}\n```\n\nThis solution uses a bit manipulation trick where we keep track of bits that have appeared once and bits that have appeared twice. The result gives us the number that appears only once."
                      }
                    ],
                    quiz: [
                      {
                        id: "q2-1",
                        question: "What is the value of 5 & 3 in Java?",
                        options: [
                          "1",
                          "2",
                          "3",
                          "0"
                        ],
                        correctAnswer: 1,
                        explanation: "5 in binary is 101, 3 is 011. Performing bitwise AND: 101 & 011 = 001, which is 1 in decimal."
                      },
                      {
                        id: "q2-2",
                        question: "Which of the following operations toggles the i-th bit of an integer n?",
                        options: [
                          "n | (1 << i)",
                          "n & (1 << i)",
                          "n ^ (1 << i)",
                          "n & ~(1 << i)"
                        ],
                        correctAnswer: 2,
                        explanation: "XOR (^) toggles a bit - it flips 0 to 1 and 1 to 0 when XORed with 1."
                      },
                      {
                        id: "q2-3",
                        question: "What is the result of 7 >> 1?",
                        options: [
                          "14",
                          "3",
                          "3.5",
                          "4"
                        ],
                        correctAnswer: 1,
                        explanation: "7 in binary is 111. Right shift by 1 gives 011, which is 3 in decimal. Right shift effectively divides by 2."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-3",
              day: 3,
              topics: [
                {
                  id: "arrays-basic",
                  title: "Arrays (Basic)",
                  description: "Fundamental array operations and common patterns",
                  problems: [
                    {
                      id: "53",
                      name: "Maximum Subarray",
                      link: "https://leetcode.com/problems/maximum-subarray/",
                      difficulty: "Easy"
                    },
                    {
                      id: "121",
                      name: "Best Time to Buy and Sell Stock",
                      link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                      difficulty: "Easy"
                    },
                    {
                      id: "1",
                      name: "Two Sum",
                      link: "https://leetcode.com/problems/two-sum/",
                      difficulty: "Easy"
                    },
                    {
                      id: "26",
                      name: "Remove Duplicates from Sorted Array",
                      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
                      difficulty: "Easy"
                    },
                    {
                      id: "11",
                      name: "Container With Most Water",
                      link: "https://leetcode.com/problems/container-with-most-water/",
                      difficulty: "Medium"
                    },
                    {
                      id: "15",
                      name: "3Sum",
                      link: "https://leetcode.com/problems/3sum/",
                      difficulty: "Medium"
                    },
                    {
                      id: "56",
                      name: "Merge Intervals",
                      link: "https://leetcode.com/problems/merge-intervals/",
                      difficulty: "Medium"
                    },
                    {
                      id: "238",
                      name: "Product of Array Except Self",
                      link: "https://leetcode.com/problems/product-of-array-except-self/",
                      difficulty: "Medium"
                    },
                    {
                      id: "42",
                      name: "Trapping Rain Water",
                      link: "https://leetcode.com/problems/trapping-rain-water/",
                      difficulty: "Hard"
                    },
                    {
                      id: "84",
                      name: "Largest Rectangle in Histogram",
                      link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "Arrays are one of the most fundamental data structures in computer science. They store elements of the same type in contiguous memory locations, allowing for constant-time access to individual elements using indices. Understanding array operations and common patterns is essential for solving many algorithmic problems.",
                    learningObjectives: [
                      "Understand basic array operations and their time complexities",
                      "Learn common array manipulation techniques",
                      "Master popular array algorithms like Kadane's algorithm",
                      "Recognize patterns for solving array-based problems"
                    ],
                    sections: [
                      {
                        title: "Array Basics",
                        content: "An array is a collection of elements identified by index or key. In Java, arrays are objects that store multiple variables of the same type.\n\nKey characteristics of arrays:\n\n- Fixed size (in Java)\n- O(1) time complexity for access by index\n- O(n) time complexity for searching an unsorted array\n- O(log n) time complexity for searching a sorted array using binary search\n- Elements are stored in contiguous memory locations\n\nBasic operations:\n- Initialization\n- Insertion\n- Deletion\n- Traversal\n- Searching\n- Sorting"
                      },
                      {
                        title: "Array Techniques and Patterns",
                        content: "Several common techniques are used to solve array problems efficiently:\n\n1. **Two Pointers**: Using two indices to solve problems in a single pass\n2. **Sliding Window**: Maintaining a window of elements to track a subarray\n3. **Prefix Sum**: Precomputing cumulative sums for quick range queries\n4. **Kadane's Algorithm**: Finding the maximum subarray sum\n5. **Binary Search on Arrays**: For sorted arrays\n6. **Dutch National Flag Algorithm**: Three-way partitioning",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Kadane's Algorithm for Maximum Subarray Sum\npublic int maxSubArray(int[] nums) {\n    int currentMax = nums[0];\n    int globalMax = nums[0];\n    \n    for (int i = 1; i < nums.length; i++) {\n        currentMax = Math.max(nums[i], currentMax + nums[i]);\n        globalMax = Math.max(globalMax, currentMax);\n    }\n    \n    return globalMax;\n}",
                            explanation: "Kadane's algorithm finds the maximum sum of a contiguous subarray in O(n) time. It uses dynamic programming by considering at each position whether to start a new subarray or extend the existing one."
                          }
                        ]
                      },
                      {
                        title: "Dynamic Arrays in Java",
                        content: "Java provides dynamic array implementations through the ArrayList class:\n\n```java\nArrayList<Integer> list = new ArrayList<>();\nlist.add(1);    // Add element\nlist.get(0);    // Get element at index 0\nlist.remove(0); // Remove element at index 0\nlist.size();    // Get size\n```\n\nTime complexities:\n- add(): O(1) amortized\n- get(): O(1)\n- remove(): O(n)\n- contains(): O(n)\n- size(): O(1)",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Using ArrayList to solve the merge intervals problem\npublic int[][] merge(int[][] intervals) {\n    if (intervals.length <= 1) {\n        return intervals;\n    }\n    \n    // Sort by start time\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    \n    List<int[]> result = new ArrayList<>();\n    int[] currentInterval = intervals[0];\n    result.add(currentInterval);\n    \n    for (int[] interval : intervals) {\n        int currentEnd = currentInterval[1];\n        int nextStart = interval[0];\n        int nextEnd = interval[1];\n        \n        if (currentEnd >= nextStart) {\n            // Overlapping intervals, update the end if needed\n            currentInterval[1] = Math.max(currentEnd, nextEnd);\n        } else {\n            // Non-overlapping interval, add to result\n            currentInterval = interval;\n            result.add(currentInterval);\n        }\n    }\n    \n    return result.toArray(new int[result.size()][]);\n}",
                            explanation: "This solution for the merge intervals problem uses ArrayList to dynamically store merged intervals. The intervals are first sorted by start time, then merged if they overlap."
                          }
                        ]
                      },
                      {
                        title: "Time and Space Complexity Considerations",
                        content: "When working with arrays, consider the following complexity aspects:\n\n- Space Complexity: Can you solve in-place (O(1) extra space)?\n- Time Complexity: Can you achieve O(n) instead of O(n²)?\n- Access Patterns: Random access vs. sequential access\n\nPractical Tips:\n1. Be careful about off-by-one errors with array indices\n2. Check for empty arrays and handle edge cases\n3. Consider sorting if it simplifies the problem\n4. Use auxiliary data structures like HashMaps to improve time complexity\n5. Look for opportunities to use two pointers, especially for sorted arrays"
                      }
                    ],
                    homework: [
                      {
                        id: "hw3-1",
                        question: "Implement a function to rotate an array to the right by k steps. For example, with nums = [1,2,3,4,5,6,7] and k = 3, the array becomes [5,6,7,1,2,3,4].",
                        codeExample: {
                          language: "java",
                          code: "public void rotate(int[] nums, int k) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic void rotate(int[] nums, int k) {\n    int n = nums.length;\n    k = k % n; // In case k > n\n    \n    // Reverse the entire array\n    reverse(nums, 0, n - 1);\n    // Reverse the first k elements\n    reverse(nums, 0, k - 1);\n    // Reverse the remaining elements\n    reverse(nums, k, n - 1);\n}\n\nprivate void reverse(int[] nums, int start, int end) {\n    while (start < end) {\n        int temp = nums[start];\n        nums[start] = nums[end];\n        nums[end] = temp;\n        start++;\n        end--;\n    }\n}\n```\n\nThis solution uses the property that rotating an array is equivalent to reversing the entire array and then reversing the two parts separately. It operates in O(n) time and O(1) extra space."
                      },
                      {
                        id: "hw3-2",
                        question: "Given an array of integers, find the contiguous subarray with the largest product. Return the product.",
                        codeExample: {
                          language: "java",
                          code: "public int maxProduct(int[] nums) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int maxProduct(int[] nums) {\n    if (nums.length == 0) return 0;\n    \n    int maxSoFar = nums[0];\n    int minSoFar = nums[0];\n    int result = maxSoFar;\n    \n    for (int i = 1; i < nums.length; i++) {\n        int curr = nums[i];\n        int tempMax = Math.max(curr, Math.max(maxSoFar * curr, minSoFar * curr));\n        minSoFar = Math.min(curr, Math.min(maxSoFar * curr, minSoFar * curr));\n        \n        maxSoFar = tempMax;\n        result = Math.max(maxSoFar, result);\n    }\n    \n    return result;\n}\n```\n\nThis solution handles the complex case of negative numbers by tracking both the maximum and minimum products ending at each position. This is necessary because multiplying by a negative number can turn the minimum product into the maximum product."
                      },
                      {
                        id: "hw3-3",
                        question: "Implement a function to find the median of two sorted arrays of different lengths.",
                        codeExample: {
                          language: "java",
                          code: "public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    // Ensure nums1 is the shorter array for simplicity\n    if (nums1.length > nums2.length) {\n        return findMedianSortedArrays(nums2, nums1);\n    }\n    \n    int x = nums1.length;\n    int y = nums2.length;\n    int low = 0;\n    int high = x;\n    \n    while (low <= high) {\n        int partitionX = (low + high) / 2;\n        int partitionY = (x + y + 1) / 2 - partitionX;\n        \n        int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];\n        int minX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];\n        \n        int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];\n        int minY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];\n        \n        if (maxX <= minY && maxY <= minX) {\n            // Found the correct partition\n            if ((x + y) % 2 == 0) {\n                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2.0;\n            } else {\n                return Math.max(maxX, maxY);\n            }\n        } else if (maxX > minY) {\n            high = partitionX - 1;\n        } else {\n            low = partitionX + 1;\n        }\n    }\n    \n    throw new IllegalArgumentException(\"Input arrays are not sorted\");\n}\n```\n\nThis is a binary search solution that efficiently finds the median by partitioning the arrays. It has a time complexity of O(log(min(m,n)))."
                      }
                    ],
                    quiz: [
                      {
                        id: "q3-1",
                        question: "What is the time complexity of accessing an element in an array by its index?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n log n)"
                        ],
                        correctAnswer: 0,
                        explanation: "Accessing an element by index in an array is a constant time operation (O(1)) because it involves a simple calculation to locate the memory address."
                      },
                      {
                        id: "q3-2",
                        question: "Which algorithm is commonly used to find the maximum sum of a contiguous subarray?",
                        options: [
                          "Quick Sort",
                          "Kadane's Algorithm",
                          "Dijkstra's Algorithm",
                          "Bellman-Ford Algorithm"
                        ],
                        correctAnswer: 1,
                        explanation: "Kadane's Algorithm is specifically designed to find the maximum sum of a contiguous subarray in O(n) time using dynamic programming."
                      },
                      {
                        id: "q3-3",
                        question: "What is the space complexity of solving an array problem 'in-place'?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        correctAnswer: 0,
                        explanation: "An 'in-place' algorithm uses only a constant amount of extra space, so the space complexity is O(1)."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-4",
              day: 4,
              topics: [
                {
                  id: "stacks-queues",
                  title: "Stacks & Queues",
                  description: "Learn about stack and queue data structures and their applications",
                  problems: [
                    {
                      id: "20",
                      name: "Valid Parentheses",
                      link: "https://leetcode.com/problems/valid-parentheses/",
                      difficulty: "Easy"
                    },
                    {
                      id: "155",
                      name: "Min Stack",
                      link: "https://leetcode.com/problems/min-stack/",
                      difficulty: "Easy"
                    },
                    {
                      id: "225",
                      name: "Implement Stack using Queues",
                      link: "https://leetcode.com/problems/implement-stack-using-queues/",
                      difficulty: "Easy"
                    },
                    {
                      id: "232",
                      name: "Implement Queue using Stacks",
                      link: "https://leetcode.com/problems/implement-queue-using-stacks/",
                      difficulty: "Easy"
                    },
                    {
                      id: "150",
                      name: "Evaluate Reverse Polish Notation",
                      link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
                      difficulty: "Medium"
                    },
                    {
                      id: "739",
                      name: "Daily Temperatures",
                      link: "https://leetcode.com/problems/daily-temperatures/",
                      difficulty: "Medium"
                    },
                    {
                      id: "503",
                      name: "Next Greater Element II",
                      link: "https://leetcode.com/problems/next-greater-element-ii/",
                      difficulty: "Medium"
                    },
                    {
                      id: "901",
                      name: "Online Stock Span",
                      link: "https://leetcode.com/problems/online-stock-span/",
                      difficulty: "Medium"
                    },
                    {
                      id: "84",
                      name: "Largest Rectangle in Histogram",
                      link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                      difficulty: "Hard"
                    },
                    {
                      id: "32",
                      name: "Longest Valid Parentheses",
                      link: "https://leetcode.com/problems/longest-valid-parentheses/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "Stacks and queues are fundamental linear data structures that limit how data can be accessed. Stacks follow Last-In-First-Out (LIFO) behavior, while queues follow First-In-First-Out (FIFO) behavior. These simple but powerful abstractions are widely used in algorithms, system design, and programming language implementations.",
                    learningObjectives: [
                      "Understand the core principles of stack and queue data structures",
                      "Implement stacks and queues using arrays and linked lists",
                      "Apply stacks to solve problems like bracket matching and expression evaluation",
                      "Recognize problems where stacks and queues provide elegant solutions",
                      "Understand time and space complexity considerations for different implementations"
                    ],
                    sections: [
                      {
                        title: "Stack Fundamentals",
                        content: "A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. The last element added to the stack will be the first element removed.\n\nPrimary operations:\n- push(item): Add an item to the top of the stack\n- pop(): Remove and return the top item from the stack\n- peek()/top(): Return the top item without removing it\n- isEmpty(): Check if the stack is empty\n\nTime complexity for all operations: O(1)\n\nStacks can be implemented using arrays or linked lists:\n\n```java\n// Using ArrayList\nclass Stack<T> {\n    private ArrayList<T> stack = new ArrayList<>();\n    \n    public void push(T item) {\n        stack.add(item);\n    }\n    \n    public T pop() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        return stack.remove(stack.size() - 1);\n    }\n    \n    public T peek() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        return stack.get(stack.size() - 1);\n    }\n    \n    public boolean isEmpty() {\n        return stack.isEmpty();\n    }\n}\n```"
                      },
                      {
                        title: "Stack Applications",
                        content: "Stacks are used in numerous applications:\n\n1. **Function Call Management**: The call stack tracks function calls in program execution\n2. **Expression Evaluation**: Conversion between infix, prefix, and postfix notation\n3. **Parentheses Checking**: Validating balanced brackets in expressions\n4. **Backtracking Algorithms**: Storing states for maze solving, game tree analysis\n5. **Undo/Redo Operations**: Maintaining history of operations\n6. **Syntax Parsing**: Compilers and interpreters use stacks for parsing\n\nCommon stack patterns in algorithms:\n- Monotonic Stack: Used for problems like finding the next greater/smaller element\n- Using two stacks to simulate a queue",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Validating balanced parentheses\npublic boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    \n    for (char c : s.toCharArray()) {\n        if (c == '(' || c == '{' || c == '[') {\n            stack.push(c);\n        } else {\n            if (stack.isEmpty()) {\n                return false;\n            }\n            \n            char top = stack.pop();\n            if ((c == ')' && top != '(') || \n                (c == '}' && top != '{') || \n                (c == ']' && top != '[')) {\n                return false;\n            }\n        }\n    }\n    \n    return stack.isEmpty();\n}",
                            explanation: "This function uses a stack to check if a string has balanced parentheses. It pushes opening brackets onto the stack and pops them when matching closing brackets are encountered. If the stack is empty at the end, the string has balanced brackets."
                          }
                        ]
                      },
                      {
                        title: "Queue Fundamentals",
                        content: "A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. The first element added to the queue will be the first element removed.\n\nPrimary operations:\n- enqueue(item)/offer(item): Add an item to the end of the queue\n- dequeue()/poll(): Remove and return the front item from the queue\n- peek()/front(): Return the front item without removing it\n- isEmpty(): Check if the queue is empty\n\nTime complexity for all operations: O(1)\n\nQueues can be implemented using arrays, linked lists, or two stacks:\n\n```java\n// Using LinkedList\nclass Queue<T> {\n    private LinkedList<T> queue = new LinkedList<>();\n    \n    public void enqueue(T item) {\n        queue.addLast(item);\n    }\n    \n    public T dequeue() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        return queue.removeFirst();\n    }\n    \n    public T peek() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        return queue.getFirst();\n    }\n    \n    public boolean isEmpty() {\n        return queue.isEmpty();\n    }\n}\n```"
                      },
                      {
                        title: "Queue Applications",
                        content: "Queues are used in many applications:\n\n1. **Breadth-First Search (BFS)**: Exploring nodes level by level in graphs/trees\n2. **Task Scheduling**: Managing tasks in operating systems\n3. **Buffering**: Managing data flow between processes\n4. **Print Spooling**: Managing print jobs\n5. **Handling of Requests**: Web servers use queues to handle client requests\n\nSpecialized queue variations:\n- **Priority Queue**: Elements are dequeued based on priority, not insertion order\n- **Circular Queue/Ring Buffer**: Fixed-size queue with wrapped-around connections\n- **Deque (Double-Ended Queue)**: Insertion and deletion from both ends",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Breadth-First Search of a binary tree\npublic List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        List<Integer> currentLevel = new ArrayList<>();\n        \n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            currentLevel.add(node.val);\n            \n            if (node.left != null) {\n                queue.offer(node.left);\n            }\n            if (node.right != null) {\n                queue.offer(node.right);\n            }\n        }\n        \n        result.add(currentLevel);\n    }\n    \n    return result;\n}",
                            explanation: "This function uses a queue to perform level-order traversal (BFS) of a binary tree. Nodes at each level are processed in the order they were added, and new nodes are added to the queue for later processing."
                          }
                        ]
                      },
                      {
                        title: "Advanced Applications and Techniques",
                        content: "**Monotonic Stack/Queue Patterns**\n\nA monotonic stack/queue maintains elements in a strictly increasing or decreasing order. Elements are popped when they violate this property. This pattern is useful for problems like:\n- Next greater/smaller element\n- Largest rectangle in histogram\n- Daily temperatures\n\n**Queue with Priority**\n\nPriority queues modify the standard queue to dequeue items based on priority rather than insertion order. In Java, it's implemented using a heap:\n\n```java\nPriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Min heap by default\nPriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // Max heap\n```\n\n**Implementing a Queue Using Stacks**\n\nA queue can be implemented using two stacks:\n\n```java\nclass MyQueue {\n    private Stack<Integer> stack1; // For enqueue\n    private Stack<Integer> stack2; // For dequeue\n    \n    public MyQueue() {\n        stack1 = new Stack<>();\n        stack2 = new Stack<>();\n    }\n    \n    public void push(int x) {\n        stack1.push(x);\n    }\n    \n    public int pop() {\n        if (stack2.isEmpty()) {\n            while (!stack1.isEmpty()) {\n                stack2.push(stack1.pop());\n            }\n        }\n        return stack2.pop();\n    }\n    \n    public int peek() {\n        if (stack2.isEmpty()) {\n            while (!stack1.isEmpty()) {\n                stack2.push(stack1.pop());\n            }\n        }\n        return stack2.peek();\n    }\n    \n    public boolean empty() {\n        return stack1.isEmpty() && stack2.isEmpty();\n    }\n}\n```\n\nThis implementation has amortized O(1) time complexity for all operations."
                      }
                    ],
                    homework: [
                      {
                        id: "hw4-1",
                        question: "Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
                        codeExample: {
                          language: "java",
                          code: "class MinStack {\n    // Your code here\n    \n    public MinStack() {\n        \n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        \n    }\n    \n    public int getMin() {\n        \n    }\n}"
                        },
                        solution: "```java\nclass MinStack {\n    private Stack<Integer> stack;\n    private Stack<Integer> minStack;\n    \n    public MinStack() {\n        stack = new Stack<>();\n        minStack = new Stack<>();\n    }\n    \n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n    \n    public void pop() {\n        if (!stack.isEmpty()) {\n            int popped = stack.pop();\n            if (!minStack.isEmpty() && popped == minStack.peek()) {\n                minStack.pop();\n            }\n        }\n    }\n    \n    public int top() {\n        if (!stack.isEmpty()) {\n            return stack.peek();\n        }\n        throw new EmptyStackException();\n    }\n    \n    public int getMin() {\n        if (!minStack.isEmpty()) {\n            return minStack.peek();\n        }\n        throw new EmptyStackException();\n    }\n}\n```\n\nThis solution uses two stacks: one for the main data and another to track minimum values. When pushing, we add to the min stack if the value is less than or equal to the current minimum. When popping, we check if the popped value equals the current minimum and update the min stack accordingly."
                      },
                      {
                        id: "hw4-2",
                        question: "Implement a function to evaluate a Reverse Polish Notation (postfix) expression. The operators are +, -, *, and /.",
                        codeExample: {
                          language: "java",
                          code: "public int evalRPN(String[] tokens) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int evalRPN(String[] tokens) {\n    Stack<Integer> stack = new Stack<>();\n    \n    for (String token : tokens) {\n        if (token.equals(\"+\") || token.equals(\"-\") || \n            token.equals(\"*\") || token.equals(\"/\")) {\n            \n            int b = stack.pop();\n            int a = stack.pop();\n            \n            switch (token) {\n                case \"+\":\n                    stack.push(a + b);\n                    break;\n                case \"-\":\n                    stack.push(a - b);\n                    break;\n                case \"*\":\n                    stack.push(a * b);\n                    break;\n                case \"/\":\n                    stack.push(a / b);\n                    break;\n            }\n        } else {\n            stack.push(Integer.parseInt(token));\n        }\n    }\n    \n    return stack.pop();\n}\n```\n\nThis solution uses a stack to evaluate the expression. Numbers are pushed onto the stack. When an operator is encountered, two numbers are popped, the operation is performed, and the result is pushed back onto the stack. The final value in the stack is the result of the expression."
                      },
                      {
                        id: "hw4-3",
                        question: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods.",
                        codeExample: {
                          language: "java",
                          code: "class LRUCache {\n    // Your code here\n    \n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        \n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}"
                        },
                        solution: "```java\nclass LRUCache {\n    private HashMap<Integer, Node> cache;\n    private int capacity;\n    private Node head;\n    private Node tail;\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        cache = new HashMap<>();\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    public int get(int key) {\n        if (cache.containsKey(key)) {\n            Node node = cache.get(key);\n            removeNode(node);\n            addToHead(node);\n            return node.value;\n        }\n        return -1;\n    }\n    \n    public void put(int key, int value) {\n        if (cache.containsKey(key)) {\n            Node node = cache.get(key);\n            node.value = value;\n            removeNode(node);\n            addToHead(node);\n        } else {\n            if (cache.size() == capacity) {\n                cache.remove(tail.prev.key);\n                removeNode(tail.prev);\n            }\n            Node newNode = new Node(key, value);\n            cache.put(key, newNode);\n            addToHead(newNode);\n        }\n    }\n    \n    private void addToHead(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n    \n    private void removeNode(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    \n    class Node {\n        int key;\n        int value;\n        Node prev;\n        Node next;\n        \n        public Node(int key, int value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n}\n```\n\nThis solution implements an LRU cache using a HashMap for O(1) lookups and a doubly linked list to maintain the order of usage. When an item is accessed or added, it's moved to the front of the list. When the cache reaches capacity, the least recently used item (at the end of the list) is removed."
                      }
                    ],
                    quiz: [
                      {
                        id: "q4-1",
                        question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
                        options: [
                          "Queue",
                          "Stack",
                          "Heap",
                          "Linked List"
                        ],
                        correctAnswer: 1,
                        explanation: "A stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed."
                      },
                      {
                        id: "q4-2",
                        question: "What is the time complexity of push and pop operations in a properly implemented stack?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n log n)"
                        ],
                        correctAnswer: 0,
                        explanation: "Both push and pop operations in a stack have O(1) time complexity, meaning they take constant time regardless of the size of the stack."
                      },
                      {
                        id: "q4-3",
                        question: "Which algorithm typically uses a queue for its implementation?",
                        options: [
                          "Depth-First Search",
                          "Binary Search",
                          "Breadth-First Search",
                          "Quick Sort"
                        ],
                        correctAnswer: 2,
                        explanation: "Breadth-First Search (BFS) typically uses a queue to visit nodes level by level, exploring neighbors of all nodes at the current depth before moving to the next level."
                      },
                      {
                        id: "q4-4",
                        question: "What is a monotonic stack?",
                        options: [
                          "A stack that can only hold monotonically increasing values",
                          "A stack whose elements are either all increasing or all decreasing",
                          "A stack that automatically sorts elements as they are pushed",
                          "A stack with fixed capacity"
                        ],
                        correctAnswer: 1,
                        explanation: "A monotonic stack is one whose elements maintain either a strictly increasing or strictly decreasing order. Elements that would violate this property are popped off."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-5",
              day: 5,
              topics: [
                {
                  id: "sliding-window",
                  title: "Sliding Window",
                  description: "Efficient technique for processing subarrays/substrings",
                  problems: [
                    {
                      id: "3",
                      name: "Longest Substring Without Repeating Characters",
                      link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                      difficulty: "Medium"
                    },
                    {
                      id: "643",
                      name: "Maximum Average Subarray I",
                      link: "https://leetcode.com/problems/maximum-average-subarray-i/",
                      difficulty: "Easy"
                    },
                    {
                      id: "1343",
                      name: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold",
                      link: "https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/",
                      difficulty: "Medium"
                    },
                    {
                      id: "209",
                      name: "Minimum Size Subarray Sum",
                      link: "https://leetcode.com/problems/minimum-size-subarray-sum/",
                      difficulty: "Medium"
                    },
                    {
                      id: "1876",
                      name: "Substrings of Size Three with Distinct Characters",
                      link: "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/",
                      difficulty: "Easy"
                    },
                    {
                      id: "219",
                      name: "Contains Duplicate II",
                      link: "https://leetcode.com/problems/contains-duplicate-ii/",
                      difficulty: "Easy"
                    },
                    {
                      id: "438",
                      name: "Find All Anagrams in a String",
                      link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
                      difficulty: "Medium"
                    },
                    {
                      id: "567",
                      name: "Permutation in String",
                      link: "https://leetcode.com/problems/permutation-in-string/",
                      difficulty: "Easy"
                    },
                    {
                      id: "76",
                      name: "Minimum Window Substring",
                      link: "https://leetcode.com/problems/minimum-window-substring/",
                      difficulty: "Hard"
                    },
                    {
                      id: "992",
                      name: "Subarrays with K Different Integers",
                      link: "https://leetcode.com/problems/subarrays-with-k-different-integers/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "The sliding window technique is a powerful algorithmic approach for solving problems involving subarrays or substrings in a linear time complexity. It involves maintaining a 'window' that slides through the array/string, expanding or contracting as needed to satisfy certain conditions. This technique is particularly efficient for problems that require finding continuous substructures with specific properties.",
                    learningObjectives: [
                      "Understand the basic principle of the sliding window technique",
                      "Differentiate between fixed-size and variable-size sliding windows",
                      "Apply sliding windows to solve array and string problems efficiently",
                      "Optimize space and time complexity using the sliding window approach",
                      "Recognize when a problem can be solved using a sliding window"
                    ],
                    sections: [
                      {
                        title: "Sliding Window Fundamentals",
                        content: "The sliding window technique uses two pointers (often called left and right) to create a window that defines a subarray or substring. As the pointers move, the window 'slides' through the data.\n\nThere are two main types of sliding windows:\n\n1. **Fixed-Size Window**: The window size remains constant (k elements)\n2. **Variable-Size Window**: The window size changes based on certain conditions\n\nThe general approach:\n- Initialize window bounds (left and right pointers)\n- Expand/contract the window by moving the pointers\n- Process elements within the window to solve the problem\n- Maintain relevant data structures to track information about the window\n\nTime Complexity: Usually O(n), where n is the array/string length\nSpace Complexity: Often O(1) or O(k), where k is the size of the auxiliary data structure"
                      },
                      {
                        title: "Fixed-Size Sliding Window",
                        content: "In a fixed-size sliding window, we maintain a window of exactly k elements. This approach is useful for problems like:\n- Finding the maximum sum of k consecutive elements\n- Computing a moving average\n- Finding subarrays of size k with specific properties\n\nThe general algorithm for fixed-size windows:\n\n1. Process the first k elements to initialize the window\n2. For each subsequent position:\n   - Remove the element leaving the window (at position i-k)\n   - Add the new element entering the window (at position i)\n   - Update any calculations or results based on the current window",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Finding maximum sum of k consecutive elements\npublic int maxSumSubarray(int[] nums, int k) {\n    if (nums.length < k) {\n        return -1; // Invalid input\n    }\n    \n    // Sum of first k elements\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) {\n        windowSum += nums[i];\n    }\n    \n    int maxSum = windowSum;\n    \n    // Slide the window from left to right\n    for (int i = k; i < nums.length; i++) {\n        // Remove element going out of window\n        // Add element coming into the window\n        windowSum = windowSum - nums[i - k] + nums[i];\n        maxSum = Math.max(maxSum, windowSum);\n    }\n    \n    return maxSum;\n}",
                            explanation: "This algorithm computes the maximum sum of any k consecutive elements in an array with O(n) time complexity. It initializes the window with the first k elements, then slides the window one element at a time, updating the sum and tracking the maximum value found."
                          }
                        ]
                      },
                      {
                        title: "Variable-Size Sliding Window",
                        content: "In a variable-size sliding window, the window size changes dynamically based on certain conditions. This approach is useful for problems like:\n- Finding the smallest subarray with a sum greater than a given value\n- Finding the longest substring with no repeating characters\n- Finding the minimum window containing a set of characters\n\nThe general algorithm for variable-size windows:\n\n1. Initialize window bounds (left = 0, right = 0)\n2. Expand the window by moving right pointer until the window satisfies the condition\n3. Once the condition is met, contract the window by moving left pointer until the condition is no longer satisfied\n4. Update the result during this process\n5. Repeat steps 2-4 until the right pointer reaches the end",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Finding smallest subarray with sum >= target\npublic int minSubArrayLen(int target, int[] nums) {\n    int n = nums.length;\n    int left = 0;\n    int sum = 0;\n    int minLength = Integer.MAX_VALUE;\n    \n    for (int right = 0; right < n; right++) {\n        // Add current element to window sum\n        sum += nums[right];\n        \n        // Contract window from left while sum >= target\n        while (sum >= target) {\n            // Update minimum length\n            minLength = Math.min(minLength, right - left + 1);\n            \n            // Remove leftmost element from sum\n            sum -= nums[left];\n            \n            // Contract window from left\n            left++;\n        }\n    }\n    \n    return minLength == Integer.MAX_VALUE ? 0 : minLength;\n}",
                            explanation: "This algorithm finds the smallest subarray with a sum greater than or equal to a target value. It expands the window by adding elements from the right, then contracts it from the left whenever the sum exceeds the target, keeping track of the minimum length found."
                          }
                        ]
                      },
                      {
                        title: "Using Auxiliary Data Structures",
                        content: "Many sliding window problems require tracking additional information about the window contents. Common auxiliary data structures include:\n\n1. **HashSet/HashMap**: To track element frequency or presence\n2. **Frequency Counter**: Array or map to count occurrences\n3. **Deque**: For problems requiring access to both ends of the window\n\nExample scenarios:\n- Finding longest substring with at most k distinct characters\n- Finding all anagrams in a string\n- Finding permutation of one string in another",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Longest substring without repeating characters\npublic int lengthOfLongestSubstring(String s) {\n    int n = s.length();\n    Set<Character> charSet = new HashSet<>();\n    int maxLength = 0;\n    int left = 0;\n    \n    for (int right = 0; right < n; right++) {\n        char currentChar = s.charAt(right);\n        \n        // If character already in window, remove chars from left\n        // until we remove the duplicate\n        while (charSet.contains(currentChar)) {\n            charSet.remove(s.charAt(left));\n            left++;\n        }\n        \n        // Add current character to window\n        charSet.add(currentChar);\n        \n        // Update maximum length\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    \n    return maxLength;\n}",
                            explanation: "This algorithm finds the longest substring without repeating characters. It uses a HashSet to track characters in the current window. When a duplicate is encountered, the window contracts from the left until the duplicate is removed, maintaining uniqueness within the window."
                          }
                        ]
                      },
                      {
                        title: "Common Patterns and Optimization Techniques",
                        content: "When working with sliding windows, several patterns and optimizations can help:\n\n1. **Two-Pointer Technique**: Using left and right pointers to define the window bounds\n2. **Precomputation**: Calculating prefix sums or counts for faster window updates\n3. **Early Termination**: Exiting early when certain conditions are met\n4. **Window Reduction**: Minimizing window size when possible for better efficiency\n\nOptimization tips:\n- Use a single loop iteration when possible\n- Reuse computations between windows (avoid redundant work)\n- Consider preprocessing the data for faster queries\n- Be careful about edge cases (empty arrays, single elements)\n\nPractical Advice:\n- Draw out examples on paper, tracing the window movement\n- Verify window boundaries (inclusive or exclusive)\n- Double-check window update logic to avoid off-by-one errors\n- Ensure window properties are properly maintained throughout"
                      }
                    ],
                    homework: [
                      {
                        id: "hw5-1",
                        question: "Implement a function to find the longest substring with at most k distinct characters.",
                        codeExample: {
                          language: "java",
                          code: "public int lengthOfLongestSubstringKDistinct(String s, int k) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int lengthOfLongestSubstringKDistinct(String s, int k) {\n    if (s == null || s.length() == 0 || k == 0) {\n        return 0;\n    }\n    \n    int n = s.length();\n    Map<Character, Integer> charFrequency = new HashMap<>();\n    int maxLength = 0;\n    int left = 0;\n    \n    for (int right = 0; right < n; right++) {\n        char rightChar = s.charAt(right);\n        \n        // Add current character to frequency map\n        charFrequency.put(rightChar, charFrequency.getOrDefault(rightChar, 0) + 1);\n        \n        // Shrink window if we have more than k distinct characters\n        while (charFrequency.size() > k) {\n            char leftChar = s.charAt(left);\n            charFrequency.put(leftChar, charFrequency.get(leftChar) - 1);\n            \n            if (charFrequency.get(leftChar) == 0) {\n                charFrequency.remove(leftChar);\n            }\n            \n            left++;\n        }\n        \n        // Update maximum length\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    \n    return maxLength;\n}\n```\n\nThis solution uses a HashMap to track the frequency of characters in the current window. If the number of distinct characters exceeds k, we shrink the window from the left until we have at most k distinct characters again. Throughout this process, we keep track of the maximum window size found."
                      },
                      {
                        id: "hw5-2",
                        question: "Implement a function to find all anagrams of string p in string s.",
                        codeExample: {
                          language: "java",
                          code: "public List<Integer> findAnagrams(String s, String p) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic List<Integer> findAnagrams(String s, String p) {\n    List<Integer> result = new ArrayList<>();\n    if (s == null || p == null || s.length() < p.length()) {\n        return result;\n    }\n    \n    int[] pCount = new int[26];\n    int[] sCount = new int[26];\n    \n    // Initialize pattern character count\n    for (char c : p.toCharArray()) {\n        pCount[c - 'a']++;\n    }\n    \n    int pLength = p.length();\n    \n    // Iterate through string s\n    for (int i = 0; i < s.length(); i++) {\n        // Add current character to window\n        sCount[s.charAt(i) - 'a']++;\n        \n        // Remove character leaving the window\n        if (i >= pLength) {\n            sCount[s.charAt(i - pLength) - 'a']--;\n        }\n        \n        // Check if current window is an anagram\n        if (i >= pLength - 1 && Arrays.equals(pCount, sCount)) {\n            result.add(i - pLength + 1);\n        }\n    }\n    \n    return result;\n}\n```\n\nThis solution uses a fixed-size sliding window of length equal to the pattern string p. We maintain two arrays to count character frequencies: one for the pattern and one for the current window in s. As we slide the window, we add and remove characters from the frequency count and check if the current window's character count matches the pattern's."
                      },
                      {
                        id: "hw5-3",
                        question: "Implement a function to find the minimum window substring containing all characters from a given pattern.",
                        codeExample: {
                          language: "java",
                          code: "public String minWindow(String s, String t) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic String minWindow(String s, String t) {\n    if (s == null || t == null || s.length() == 0 || t.length() == 0 || s.length() < t.length()) {\n        return \"\";\n    }\n    \n    // Character frequency map for pattern t\n    Map<Character, Integer> targetFreq = new HashMap<>();\n    for (char c : t.toCharArray()) {\n        targetFreq.put(c, targetFreq.getOrDefault(c, 0) + 1);\n    }\n    \n    int requiredChars = targetFreq.size();\n    int formedChars = 0;\n    \n    // Character frequency map for current window\n    Map<Character, Integer> windowFreq = new HashMap<>();\n    \n    // Result variables\n    int minLength = Integer.MAX_VALUE;\n    int resultStart = 0;\n    \n    int left = 0;\n    \n    for (int right = 0; right < s.length(); right++) {\n        char rightChar = s.charAt(right);\n        \n        // Add current character to window frequency\n        windowFreq.put(rightChar, windowFreq.getOrDefault(rightChar, 0) + 1);\n        \n        // Check if this character contributes to forming the required pattern\n        if (targetFreq.containsKey(rightChar) && \n            windowFreq.get(rightChar).intValue() == targetFreq.get(rightChar).intValue()) {\n            formedChars++;\n        }\n        \n        // Try to minimize the window by moving left pointer\n        while (left <= right && formedChars == requiredChars) {\n            char leftChar = s.charAt(left);\n            \n            // Update the result if current window is smaller\n            if (right - left + 1 < minLength) {\n                minLength = right - left + 1;\n                resultStart = left;\n            }\n            \n            // Remove the leftmost character\n            windowFreq.put(leftChar, windowFreq.get(leftChar) - 1);\n            \n            // If removing this character breaks the required pattern\n            if (targetFreq.containsKey(leftChar) && \n                windowFreq.get(leftChar).intValue() < targetFreq.get(leftChar).intValue()) {\n                formedChars--;\n            }\n            \n            left++;\n        }\n    }\n    \n    return minLength == Integer.MAX_VALUE ? \"\" : s.substring(resultStart, resultStart + minLength);\n}\n```\n\nThis solution implements the minimum window substring problem using a variable-size sliding window. We use two HashMaps to track character frequencies in the target pattern and the current window. The algorithm expands the window until all required characters are included, then contracts it from the left to find the minimum length. Throughout this process, we keep track of how many character requirements are satisfied."
                      }
                    ],
                    quiz: [
                      {
                        id: "q5-1",
                        question: "What is the time complexity of the sliding window technique for processing an array of length n?",
                        options: [
                          "O(n²)",
                          "O(n log n)",
                          "O(n)",
                          "O(log n)"
                        ],
                        correctAnswer: 2,
                        explanation: "The sliding window technique typically processes each element at most twice (once when it enters the window and once when it exits), making the time complexity O(n) for an array of length n."
                      },
                      {
                        id: "q5-2",
                        question: "Which of the following problems is NOT suitable for the sliding window technique?",
                        options: [
                          "Finding the maximum sum of a fixed-size subarray",
                          "Finding the longest substring with unique characters",
                          "Finding all permutations of a string",
                          "Finding the minimum size subarray with a sum greater than a threshold"
                        ],
                        correctAnswer: 2,
                        explanation: "Finding all permutations of a string requires generating all possible arrangements, which is an O(n!) operation and doesn't fit the sliding window pattern. The other problems are well-suited for sliding window solutions."
                      },
                      {
                        id: "q5-3",
                        question: "What is the key difference between fixed-size and variable-size sliding windows?",
                        options: [
                          "Fixed-size windows always use arrays, while variable-size windows use linked lists",
                          "Fixed-size windows maintain a consistent window length, while variable-size windows adjust the window size based on conditions",
                          "Fixed-size windows have O(1) time complexity, while variable-size windows have O(n) time complexity",
                          "Fixed-size windows can only be used for numeric data, while variable-size windows work with any data type"
                        ],
                        correctAnswer: 1,
                        explanation: "In fixed-size sliding windows, the window length remains constant throughout the algorithm. In variable-size sliding windows, the window expands and contracts based on certain conditions that need to be satisfied."
                      },
                      {
                        id: "q5-4",
                        question: "Which data structure is commonly used to optimize the sliding window technique when tracking character frequencies?",
                        options: [
                          "Stack",
                          "Queue",
                          "HashMap/HashSet",
                          "Binary Search Tree"
                        ],
                        correctAnswer: 2,
                        explanation: "HashMap or HashSet is commonly used in sliding window techniques to efficiently track the frequency or presence of elements within the current window, especially for string problems."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-6",
              day: 6,
              topics: [
                {
                  id: "prefix-sum",
                  title: "Prefix Sum",
                  description: "Pre-computation technique for efficient range sum queries",
                  problems: [
                    {
                      id: "560",
                      name: "Subarray Sum Equals K",
                      link: "https://leetcode.com/problems/subarray-sum-equals-k/",
                      difficulty: "Medium"
                    },
                    {
                      id: "303",
                      name: "Range Sum Query - Immutable",
                      link: "https://leetcode.com/problems/range-sum-query-immutable/",
                      difficulty: "Easy"
                    },
                    {
                      id: "1480",
                      name: "Running Sum of 1d Array",
                      link: "https://leetcode.com/problems/running-sum-of-1d-array/",
                      difficulty: "Easy"
                    },
                    {
                      id: "724",
                      name: "Find Pivot Index",
                      link: "https://leetcode.com/problems/find-pivot-index/",
                      difficulty: "Easy"
                    },
                    {
                      id: "238",
                      name: "Product of Array Except Self",
                      link: "https://leetcode.com/problems/product-of-array-except-self/",
                      difficulty: "Medium"
                    },
                    {
                      id: "304",
                      name: "Range Sum Query 2D - Immutable",
                      link: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
                      difficulty: "Medium"
                    },
                    {
                      id: "523",
                      name: "Continuous Subarray Sum",
                      link: "https://leetcode.com/problems/continuous-subarray-sum/",
                      difficulty: "Medium"
                    },
                    {
                      id: "525",
                      name: "Contiguous Array",
                      link: "https://leetcode.com/problems/contiguous-array/",
                      difficulty: "Medium"
                    },
                    {
                      id: "1074",
                      name: "Number of Submatrices That Sum to Target",
                      link: "https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/",
                      difficulty: "Hard"
                    },
                    {
                      id: "862",
                      name: "Shortest Subarray with Sum at Least K",
                      link: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "Prefix Sum is a fundamental pre-computation technique that transforms an array into its cumulative sum representation. This allows for highly efficient range sum queries in constant time, making it an essential tool for solving a variety of array-based problems. The concept is simple yet powerful: by precomputing the sum of all elements up to each position, we can quickly determine the sum of any subarray without having to iterate through the elements again.",
                    learningObjectives: [
                      "Understand the concept and implementation of prefix sums in 1D arrays",
                      "Learn how to extend prefix sums to 2D arrays (prefix sum matrices)",
                      "Apply prefix sum technique to solve range query problems efficiently",
                      "Recognize patterns where prefix sums can be combined with hashmaps for additional optimizations",
                      "Master the application of prefix sums in solving subarray sum problems"
                    ],
                    sections: [
                      {
                        title: "Basic Prefix Sum Concept",
                        content: "A prefix sum (also called a cumulative sum or running total) is an array where each element is the sum of all elements up to that position in the original array.\n\nGiven an array `A` of size `n`, the prefix sum array `prefixSum` is defined as:\n- `prefixSum[0] = A[0]`\n- `prefixSum[i] = prefixSum[i-1] + A[i]` for `i > 0`\n\nOnce we have the prefix sum array, we can calculate the sum of elements from index `i` to index `j` (inclusive) in O(1) time using:\n\n`sum(i, j) = prefixSum[j] - (i > 0 ? prefixSum[i-1] : 0)`\n\nThis approach transforms an O(n) range sum query to an O(1) operation, making it extremely efficient for problems involving multiple range queries.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Computing prefix sum array\npublic int[] buildPrefixSum(int[] nums) {\n    int n = nums.length;\n    int[] prefixSum = new int[n];\n    prefixSum[0] = nums[0];\n    \n    for (int i = 1; i < n; i++) {\n        prefixSum[i] = prefixSum[i-1] + nums[i];\n    }\n    \n    return prefixSum;\n}\n\n// Computing sum of subarray from index start to end (inclusive)\npublic int rangeSum(int[] prefixSum, int start, int end) {\n    if (start == 0) {\n        return prefixSum[end];\n    } else {\n        return prefixSum[end] - prefixSum[start-1];\n    }\n}",
                            explanation: "The first function builds a prefix sum array from the input array in O(n) time. The second function demonstrates how to use the prefix sum array to calculate the sum of any subarray in O(1) time."
                          }
                        ]
                      },
                      {
                        title: "2D Prefix Sums (Prefix Sum Matrix)",
                        content: "The prefix sum concept can be extended to 2D arrays, creating a prefix sum matrix. This allows for efficient computation of the sum of elements in any rectangular region of the original matrix.\n\nFor a matrix `M` of size `n × m`, the prefix sum matrix `prefixSum` is defined as:\n- `prefixSum[i][j]` = sum of all elements in the rectangle from `(0,0)` to `(i,j)`\n\nTo compute this efficiently:\n```\nprefixSum[i][j] = M[i][j] + prefixSum[i-1][j] + prefixSum[i][j-1] - prefixSum[i-1][j-1]\n```\n\nTo calculate the sum of elements in a rectangle with top-left corner `(r1,c1)` and bottom-right corner `(r2,c2)`:\n```\nsum = prefixSum[r2][c2] - prefixSum[r1-1][c2] - prefixSum[r2][c1-1] + prefixSum[r1-1][c1-1]\n```\n\nThis is particularly useful for problems involving range sum queries on matrices.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Computing 2D prefix sum matrix\npublic int[][] build2DPrefixSum(int[][] matrix) {\n    if (matrix.length == 0 || matrix[0].length == 0) {\n        return new int[0][0];\n    }\n    \n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    int[][] prefixSum = new int[rows][cols];\n    \n    // Initialize the top-left corner\n    prefixSum[0][0] = matrix[0][0];\n    \n    // Initialize first row\n    for (int j = 1; j < cols; j++) {\n        prefixSum[0][j] = prefixSum[0][j-1] + matrix[0][j];\n    }\n    \n    // Initialize first column\n    for (int i = 1; i < rows; i++) {\n        prefixSum[i][0] = prefixSum[i-1][0] + matrix[i][0];\n    }\n    \n    // Fill the rest of the matrix\n    for (int i = 1; i < rows; i++) {\n        for (int j = 1; j < cols; j++) {\n            prefixSum[i][j] = matrix[i][j] + prefixSum[i-1][j] + \n                               prefixSum[i][j-1] - prefixSum[i-1][j-1];\n        }\n    }\n    \n    return prefixSum;\n}\n\n// Calculating sum of a rectangular region\npublic int getRegionSum(int[][] prefixSum, int row1, int col1, int row2, int col2) {\n    int sum = prefixSum[row2][col2];\n    \n    if (row1 > 0) {\n        sum -= prefixSum[row1-1][col2];\n    }\n    \n    if (col1 > 0) {\n        sum -= prefixSum[row2][col1-1];\n    }\n    \n    if (row1 > 0 && col1 > 0) {\n        sum += prefixSum[row1-1][col1-1];\n    }\n    \n    return sum;\n}",
                            explanation: "The first function builds a 2D prefix sum matrix from the input matrix in O(rows × cols) time. The second function demonstrates how to use the prefix sum matrix to calculate the sum of elements in any rectangular region in O(1) time."
                          }
                        ]
                      },
                      {
                        title: "Prefix Sums with Hash Maps",
                        content: "A powerful extension of the prefix sum technique involves combining it with hash maps to solve problems like:\n- Finding the number of subarrays with a specific sum\n- Identifying if there's a subarray with a sum divisible by K\n- Calculating the longest subarray with a given sum\n\nThe key idea is to track prefix sums and their frequencies or positions as we iterate through the array. This allows us to identify when we've encountered complementary prefix sums that create subarrays with desired properties.\n\nFor example, to find the number of subarrays with sum K:\n1. Initialize `count = 0` and `prefixSum = 0`\n2. Create a hash map to store the frequency of each prefix sum\n3. Insert `(0, 1)` into the map (representing an empty subarray)\n4. For each element in the array:\n   - Update the running prefix sum\n   - Check if `(prefixSum - K)` exists in the map\n   - If yes, add its frequency to `count`\n   - Update the frequency of the current `prefixSum` in the map\n5. Return `count`",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Finding number of subarrays with sum K\npublic int subarraySum(int[] nums, int k) {\n    int count = 0;\n    int prefixSum = 0;\n    Map<Integer, Integer> prefixSumCount = new HashMap<>();\n    prefixSumCount.put(0, 1);  // Empty subarray has sum 0\n    \n    for (int num : nums) {\n        prefixSum += num;\n        \n        // If there's a prefix sum such that (prefixSum - k) exists,\n        // it means there's a subarray with sum k ending at the current position\n        if (prefixSumCount.containsKey(prefixSum - k)) {\n            count += prefixSumCount.get(prefixSum - k);\n        }\n        \n        // Update prefix sum frequency\n        prefixSumCount.put(prefixSum, prefixSumCount.getOrDefault(prefixSum, 0) + 1);\n    }\n    \n    return count;\n}",
                            explanation: "This algorithm finds the number of subarrays with sum equal to k. By using a hash map to store the frequency of each prefix sum, we can quickly check if there are previous prefix sums that, when subtracted from the current prefix sum, equal k. This indicates the presence of a subarray with sum k ending at the current position."
                          }
                        ]
                      },
                      {
                        title: "Advanced Applications and Variations",
                        content: "Prefix sums can be extended to solve a variety of problems:\n\n1. **Prefix XOR**: Similar to prefix sum but using XOR operation instead of addition\n2. **Prefix Product**: Computing the product of elements instead of the sum (useful for problems like 'Product of Array Except Self')\n3. **Prefix Min/Max**: Tracking the minimum or maximum value seen so far\n4. **Cumulative Frequency Arrays**: Similar to prefix sums but for counting occurrences\n\nSome advanced applications include:\n- Finding the maximum subarray sum (Kadane's algorithm is related to prefix sums)\n- Calculating the number of subarrays with sum divisible by k\n- Identifying balanced subarrays (equal number of 0s and 1s)\n- Computing range XOR queries efficiently\n\nPrefix sums are also foundational to more complex techniques like Fenwick Trees (Binary Indexed Trees) and Segment Trees, which allow for dynamic range queries and updates.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Finding longest subarray with sum divisible by k\npublic int longestSubarrayDivisibleByK(int[] nums, int k) {\n    int prefixSum = 0;\n    Map<Integer, Integer> remainderToIndex = new HashMap<>();\n    remainderToIndex.put(0, -1);  // Empty subarray\n    int maxLength = 0;\n    \n    for (int i = 0; i < nums.length; i++) {\n        prefixSum += nums[i];\n        int remainder = ((prefixSum % k) + k) % k;  // Handle negative numbers\n        \n        if (remainderToIndex.containsKey(remainder)) {\n            maxLength = Math.max(maxLength, i - remainderToIndex.get(remainder));\n        } else {\n            remainderToIndex.put(remainder, i);\n        }\n    }\n    \n    return maxLength;\n}",
                            explanation: "This algorithm finds the longest subarray with a sum divisible by k. The key insight is that if two prefix sums have the same remainder when divided by k, the subarray between those positions has a sum divisible by k. We use a hash map to store the first occurrence of each remainder, allowing us to find the longest such subarray."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw6-1",
                        question: "Implement a class that calculates the sum of a range of elements in an array efficiently after preprocessing.",
                        codeExample: {
                          language: "java",
                          code: "class NumArray {\n    // Your code here\n\n    public NumArray(int[] nums) {\n        \n    }\n    \n    public int sumRange(int left, int right) {\n        \n    }\n}"
                        },
                        solution: "```java\nclass NumArray {\n    private int[] prefixSum;\n\n    public NumArray(int[] nums) {\n        prefixSum = new int[nums.length];\n        if (nums.length > 0) {\n            prefixSum[0] = nums[0];\n            for (int i = 1; i < nums.length; i++) {\n                prefixSum[i] = prefixSum[i-1] + nums[i];\n            }\n        }\n    }\n    \n    public int sumRange(int left, int right) {\n        if (left == 0) {\n            return prefixSum[right];\n        } else {\n            return prefixSum[right] - prefixSum[left-1];\n        }\n    }\n}\n```\n\nThis solution implements the Range Sum Query problem using the prefix sum technique. We precompute the prefix sum array in the constructor, which allows us to calculate the sum of any range in O(1) time using a simple subtraction operation."
                      },
                      {
                        id: "hw6-2",
                        question: "Implement a solution to find the pivot index in an array where the sum of all numbers to its left equals the sum of all numbers to its right.",
                        codeExample: {
                          language: "java",
                          code: "public int pivotIndex(int[] nums) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int pivotIndex(int[] nums) {\n    int totalSum = 0;\n    for (int num : nums) {\n        totalSum += num;\n    }\n    \n    int leftSum = 0;\n    \n    for (int i = 0; i < nums.length; i++) {\n        // Right sum is total sum minus left sum and current element\n        int rightSum = totalSum - leftSum - nums[i];\n        \n        if (leftSum == rightSum) {\n            return i; // Found pivot index\n        }\n        \n        leftSum += nums[i];\n    }\n    \n    return -1; // No pivot index found\n}\n```\n\nThis solution calculates the total sum first, then iterates through the array, maintaining a running sum of elements to the left. For each position, it computes the sum of elements to the right by subtracting the left sum and current element from the total sum. When the left and right sums are equal, we've found the pivot index."
                      },
                      {
                        id: "hw6-3",
                        question: "Implement a solution to find the number of subarrays where the product of all elements is less than a given threshold.",
                        codeExample: {
                          language: "java",
                          code: "public int numSubarrayProductLessThanK(int[] nums, int k) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int numSubarrayProductLessThanK(int[] nums, int k) {\n    if (k <= 1) return 0; // No subarrays if k is 0 or 1\n    \n    int count = 0;\n    int product = 1;\n    int left = 0;\n    \n    for (int right = 0; right < nums.length; right++) {\n        product *= nums[right];\n        \n        // Shrink window from left while product >= k\n        while (product >= k && left <= right) {\n            product /= nums[left];\n            left++;\n        }\n        \n        // All subarrays ending at right and starting from left to right\n        count += right - left + 1;\n    }\n    \n    return count;\n}\n```\n\nThis solution uses a sliding window approach combined with the concept of prefix products. We maintain a running product of elements in the current window. When the product exceeds or equals k, we shrink the window from the left until the product is less than k again. For each valid right pointer position, we add the number of valid subarrays ending at that position (which is right - left + 1)."
                      }
                    ],
                    quiz: [
                      {
                        id: "q6-1",
                        question: "What is the time complexity of computing a prefix sum array for an array of size n?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        correctAnswer: 2,
                        explanation: "Computing a prefix sum array requires iterating through each element of the original array once, which takes O(n) time."
                      },
                      {
                        id: "q6-2",
                        question: "After computing a prefix sum array, what is the time complexity of calculating the sum of elements in a subarray?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(length of subarray)"
                        ],
                        correctAnswer: 0,
                        explanation: "With a prefix sum array, calculating the sum of any subarray requires only a simple subtraction operation: prefixSum[right] - prefixSum[left-1], which takes O(1) time regardless of the subarray length."
                      },
                      {
                        id: "q6-3",
                        question: "What additional data structure is commonly used with prefix sums to solve problems involving counting subarrays with a specific sum?",
                        options: [
                          "Stack",
                          "Queue",
                          "Hash Map",
                          "Priority Queue"
                        ],
                        correctAnswer: 2,
                        explanation: "Hash Maps are commonly used with prefix sums to track the frequency or position of each prefix sum, which helps in efficiently counting subarrays with specific properties."
                      },
                      {
                        id: "q6-4",
                        question: "What is the space complexity of a 2D prefix sum matrix for an n x m matrix?",
                        options: [
                          "O(1)",
                          "O(n + m)",
                          "O(n * m)",
                          "O(n * m * log(n * m))"
                        ],
                        correctAnswer: 2,
                        explanation: "A 2D prefix sum matrix has the same dimensions as the original matrix, requiring O(n * m) space to store all the prefix sums."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-7",
              day: 7,
              topics: [
                {
                  id: "mock-test",
                  title: "Mock Test (LeetCode Contest)",
                  description: "Practice under time constraints",
                  problems: [
                    {
                      id: "mock-1",
                      name: "Solve 3 problems"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "week-2",
          title: "Linked List, Stack, Queue",
          days: [
            {
              id: "day-8",
              day: 8,
              topics: [
                {
                  id: "singly-linked-list",
                  title: "Singly Linked List",
                  description: "Understanding the basics of linked list data structure",
                  problems: [
                    {
                      id: "206",
                      name: "Reverse Linked List",
                      link: "https://leetcode.com/problems/reverse-linked-list/",
                      difficulty: "Easy"
                    },
                    {
                      id: "141",
                      name: "Linked List Cycle",
                      link: "https://leetcode.com/problems/linked-list-cycle/",
                      difficulty: "Easy"
                    },
                    {
                      id: "21",
                      name: "Merge Two Sorted Lists",
                      link: "https://leetcode.com/problems/merge-two-sorted-lists/",
                      difficulty: "Easy"
                    },
                    {
                      id: "83",
                      name: "Remove Duplicates from Sorted List",
                      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
                      difficulty: "Easy"
                    },
                    {
                      id: "19",
                      name: "Remove Nth Node From End of List",
                      link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                      difficulty: "Medium"
                    },
                    {
                      id: "2",
                      name: "Add Two Numbers",
                      link: "https://leetcode.com/problems/add-two-numbers/",
                      difficulty: "Medium"
                    },
                    {
                      id: "143",
                      name: "Reorder List",
                      link: "https://leetcode.com/problems/reorder-list/",
                      difficulty: "Medium"
                    },
                    {
                      id: "82",
                      name: "Remove Duplicates from Sorted List II",
                      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
                      difficulty: "Medium"
                    },
                    {
                      id: "25",
                      name: "Reverse Nodes in k-Group",
                      link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                      difficulty: "Hard"
                    },
                    {
                      id: "23",
                      name: "Merge k Sorted Lists",
                      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "A singly linked list is a linear data structure composed of nodes, where each node contains a value and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations, which provides advantages for certain operations like insertions and deletions. Understanding linked lists is fundamental to mastering more complex data structures and algorithms.",
                    learningObjectives: [
                      "Understand the structure and implementation of singly linked lists",
                      "Learn basic operations: traversal, insertion, deletion, and searching",
                      "Recognize common linked list patterns and techniques",
                      "Apply linked list algorithms to solve problems efficiently",
                      "Compare the trade-offs between linked lists and arrays"
                    ],
                    sections: [
                      {
                        title: "Linked List Structure",
                        content: "A singly linked list consists of nodes where each node has:\n\n1. **Data**: The value stored in the node\n2. **Next Pointer**: A reference to the next node in the sequence\n\nThe list is typically accessed through a 'head' pointer, which points to the first node. The last node in the list points to null, indicating the end of the list.\n\n```java\nclass ListNode {\n    int val;\n    ListNode next;\n    \n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n```\n\nKey characteristics of singly linked lists:\n- Dynamic size (can grow or shrink during execution)\n- No random access (must traverse from the head to reach a specific position)\n- Efficient insertions and deletions (when the position is known)\n- More memory usage than arrays (due to storing next pointers)"
                      },
                      {
                        title: "Basic Operations",
                        content: "Here are the fundamental operations for a singly linked list:\n\n**1. Traversal**\nTo visit each node in the list, we start from the head and follow the next pointers until we reach the end (null).\n\n**2. Insertion**\nWe can insert a new node at the beginning, end, or at a specific position in the list.\n- Beginning: Make the new node point to the current head, then update the head.\n- End: Traverse to the last node and update its next pointer.\n- Middle: Traverse to the position before the insertion point, then update pointers.\n\n**3. Deletion**\nWe can remove a node from the beginning, end, or a specific position.\n- Beginning: Update the head to point to the second node.\n- End: Traverse to the second-to-last node and set its next to null.\n- Middle: Traverse to the node before the one to be deleted, then update pointers.\n\n**4. Searching**\nTo find a node with a specific value, we traverse the list and check each node's value.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Traversal of a linked list\npublic void traverseLinkedList(ListNode head) {\n    ListNode current = head;\n    \n    while (current != null) {\n        System.out.print(current.val + \" -> \");\n        current = current.next;\n    }\n    System.out.println(\"null\");\n}\n\n// Insertion at the beginning\npublic ListNode insertAtBeginning(ListNode head, int val) {\n    ListNode newNode = new ListNode(val);\n    newNode.next = head;\n    return newNode;\n}\n\n// Insertion at the end\npublic ListNode insertAtEnd(ListNode head, int val) {\n    ListNode newNode = new ListNode(val);\n    \n    if (head == null) {\n        return newNode;\n    }\n    \n    ListNode current = head;\n    while (current.next != null) {\n        current = current.next;\n    }\n    \n    current.next = newNode;\n    return head;\n}\n\n// Deletion of a node with a specific value\npublic ListNode deleteNode(ListNode head, int val) {\n    if (head == null) {\n        return null;\n    }\n    \n    // If head is the node to be deleted\n    if (head.val == val) {\n        return head.next;\n    }\n    \n    ListNode current = head;\n    \n    // Find the node before the one to be deleted\n    while (current.next != null && current.next.val != val) {\n        current = current.next;\n    }\n    \n    // If the value was found, update the pointer\n    if (current.next != null) {\n        current.next = current.next.next;\n    }\n    \n    return head;\n}",
                            explanation: "These examples demonstrate the basic operations on a singly linked list. The traversal function visits each node in sequence. The insertion functions add new nodes at the beginning or end. The deletion function removes a node with a specific value by updating the pointers around it."
                          }
                        ]
                      },
                      {
                        title: "Common Linked List Techniques",
                        content: "Several important techniques are commonly used to solve linked list problems:\n\n**1. Two-Pointer Technique**\nThis approach uses two pointers that traverse the list at different speeds or starting points:\n- Fast and slow pointers (Floyd's Cycle-Finding Algorithm)\n- Runner technique (one pointer moves twice as fast as the other)\n- Left and right pointers (for operations like reversing a list)\n\n**2. Dummy Node**\nA dummy node (or sentinel node) is a temporary node placed at the beginning of the list to simplify edge cases and avoid null pointer checks.\n\n**3. Recursion**\nMany linked list operations can be implemented recursively, which can lead to elegant solutions for problems like reversing a list or merging sorted lists.\n\n**4. Iterative In-place Manipulation**\nModifying pointers iteratively to rearrange the list without using extra space.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Detecting a cycle using Floyd's Cycle-Finding Algorithm\npublic boolean hasCycle(ListNode head) {\n    if (head == null || head.next == null) {\n        return false;\n    }\n    \n    ListNode slow = head;\n    ListNode fast = head;\n    \n    while (fast != null && fast.next != null) {\n        slow = slow.next;          // Move one step\n        fast = fast.next.next;      // Move two steps\n        \n        if (slow == fast) {         // Cycle detected\n            return true;\n        }\n    }\n    \n    return false;  // Reached the end, no cycle\n}\n\n// Reversing a linked list (iterative approach)\npublic ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode current = head;\n    \n    while (current != null) {\n        ListNode nextTemp = current.next;  // Store next node\n        current.next = prev;              // Reverse the pointer\n        prev = current;                   // Move prev forward\n        current = nextTemp;               // Move current forward\n    }\n    \n    return prev;  // New head of the reversed list\n}\n\n// Finding the middle node using the runner technique\npublic ListNode middleNode(ListNode head) {\n    ListNode slow = head;\n    ListNode fast = head;\n    \n    while (fast != null && fast.next != null) {\n        slow = slow.next;          // Move one step\n        fast = fast.next.next;      // Move two steps\n    }\n    \n    return slow;  // Middle node (or second middle node if even length)\n}",
                            explanation: "These examples demonstrate common linked list techniques. Floyd's Cycle-Finding Algorithm uses fast and slow pointers to detect cycles. The list reversal example shows how to reverse a linked list in-place by changing pointer directions. The middle node function uses the runner technique, where one pointer moves twice as fast as the other."
                          }
                        ]
                      },
                      {
                        title: "Advanced Linked List Problems",
                        content: "Advanced linked list problems often combine multiple techniques. Here are some common patterns:\n\n**1. List Manipulation**\n- Reversing parts of a list\n- Reordering elements\n- Rotating a list\n- Partitioning a list based on certain criteria\n\n**2. Multiple Lists**\n- Merging two or more sorted lists\n- Finding intersection points between lists\n- Adding numbers represented by linked lists\n\n**3. Specialized Algorithms**\n- Detecting and finding the start of a cycle\n- Deep copying a list with random pointers\n- Sorting a linked list\n\nWhen approaching complex problems, consider these strategies:\n- Use a drawing to visualize the pointers and their manipulation\n- Consider edge cases: empty list, single node, cycle present\n- Use dummy nodes to simplify handling of edge cases\n- Break down complex operations into simpler steps",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Merging two sorted linked lists\npublic ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    // Create a dummy node to simplify the merging process\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    \n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) {\n            tail.next = l1;\n            l1 = l1.next;\n        } else {\n            tail.next = l2;\n            l2 = l2.next;\n        }\n        tail = tail.next;\n    }\n    \n    // Attach remaining nodes\n    tail.next = (l1 != null) ? l1 : l2;\n    \n    return dummy.next;\n}\n\n// Finding the intersection point of two linked lists\npublic ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    if (headA == null || headB == null) {\n        return null;\n    }\n    \n    ListNode ptrA = headA;\n    ListNode ptrB = headB;\n    \n    // If the lists have different lengths, this approach will align the pointers\n    while (ptrA != ptrB) {\n        ptrA = (ptrA == null) ? headB : ptrA.next;\n        ptrB = (ptrB == null) ? headA : ptrB.next;\n    }\n    \n    return ptrA;  // Either the intersection point or null\n}",
                            explanation: "These examples demonstrate more advanced linked list operations. The merge function takes two sorted lists and combines them into a single sorted list, using a dummy node to simplify the process. The intersection function finds where two linked lists join, using a clever two-pointer approach that equalizes differences in list lengths."
                          }
                        ]
                      },
                      {
                        title: "Linked Lists vs. Arrays",
                        content: "Understanding the trade-offs between linked lists and arrays is essential for choosing the right data structure:\n\n**Linked Lists Advantages:**\n- Dynamic size (no need to pre-allocate memory)\n- Efficient insertions and deletions at any position (O(1) if position is known)\n- No wasted memory for unused elements\n- Easy implementation of other data structures (stacks, queues, etc.)\n\n**Linked Lists Disadvantages:**\n- No random access (O(n) time to access arbitrary elements)\n- Extra memory overhead for storing pointers\n- Poor cache locality due to non-contiguous memory allocation\n- Reverse traversal is not possible in singly linked lists\n\n**When to Use Linked Lists:**\n- When the size of the data is unknown or frequently changing\n- When insertions/deletions are more common than accesses\n- When implementing certain data structures (LRU cache, etc.)\n- When memory allocation is a concern\n\n**When to Use Arrays:**\n- When random access is frequent\n- When memory usage needs to be minimized\n- When cache performance is important\n- When the size is known and relatively stable"
                      }
                    ],
                    homework: [
                      {
                        id: "hw8-1",
                        question: "Implement a function to remove all elements from a linked list with a value equal to a given value.",
                        codeExample: {
                          language: "java",
                          code: "public ListNode removeElements(ListNode head, int val) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic ListNode removeElements(ListNode head, int val) {\n    // Use a dummy node to handle the case where the head needs to be removed\n    ListNode dummy = new ListNode(0);\n    dummy.next = head;\n    \n    ListNode current = dummy;\n    \n    while (current.next != null) {\n        if (current.next.val == val) {\n            // Skip the node with the target value\n            current.next = current.next.next;\n        } else {\n            // Move to the next node\n            current = current.next;\n        }\n    }\n    \n    return dummy.next;\n}\n```\n\nThis solution uses a dummy node to simplify handling the case where the head needs to be removed. It then iterates through the list and skips any nodes with the target value by updating the next pointers accordingly."
                      },
                      {
                        id: "hw8-2",
                        question: "Implement a function to determine if a linked list is a palindrome (reads the same forward and backward).",
                        codeExample: {
                          language: "java",
                          code: "public boolean isPalindrome(ListNode head) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic boolean isPalindrome(ListNode head) {\n    if (head == null || head.next == null) {\n        return true;  // Empty list or single node is a palindrome\n    }\n    \n    // Find the middle of the linked list\n    ListNode slow = head;\n    ListNode fast = head;\n    \n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    \n    // Reverse the second half\n    ListNode secondHalf = reverseList(slow);\n    ListNode firstHalf = head;\n    \n    // Compare the first and second halves\n    while (secondHalf != null) {\n        if (firstHalf.val != secondHalf.val) {\n            return false;\n        }\n        firstHalf = firstHalf.next;\n        secondHalf = secondHalf.next;\n    }\n    \n    return true;\n}\n\nprivate ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode current = head;\n    \n    while (current != null) {\n        ListNode nextTemp = current.next;\n        current.next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    \n    return prev;\n}\n```\n\nThis solution has three steps: find the middle of the list using the runner technique, reverse the second half of the list, and then compare the first half with the reversed second half."
                      },
                      {
                        id: "hw8-3",
                        question: "Implement a function to create a deep copy of a linked list where each node contains a next pointer and a random pointer that can point to any node in the list or null.",
                        codeExample: {
                          language: "java",
                          code: "class Node {\n    int val;\n    Node next;\n    Node random;\n\n    public Node(int val) {\n        this.val = val;\n        this.next = null;\n        this.random = null;\n    }\n}\n\npublic Node copyRandomList(Node head) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic Node copyRandomList(Node head) {\n    if (head == null) {\n        return null;\n    }\n    \n    // Step 1: Create a copy of each node and insert it after the original node\n    Node current = head;\n    while (current != null) {\n        Node copy = new Node(current.val);\n        copy.next = current.next;\n        current.next = copy;\n        current = copy.next;\n    }\n    \n    // Step 2: Assign random pointers for the copied nodes\n    current = head;\n    while (current != null) {\n        if (current.random != null) {\n            current.next.random = current.random.next;\n        }\n        current = current.next.next;\n    }\n    \n    // Step 3: Separate the original and copied lists\n    current = head;\n    Node copyHead = head.next;\n    Node copyCurrentNode = copyHead;\n    \n    while (current != null) {\n        current.next = current.next.next;\n        if (copyCurrentNode.next != null) {\n            copyCurrentNode.next = copyCurrentNode.next.next;\n        }\n        current = current.next;\n        copyCurrentNode = copyCurrentNode.next;\n    }\n    \n    return copyHead;\n}\n```\n\nThis solution uses a three-step approach: first, it creates a copy of each node and places it right after the original node. Second, it assigns the random pointers for the copied nodes using the interleaved structure. Finally, it separates the original and copied lists."
                      }
                    ],
                    quiz: [
                      {
                        id: "q8-1",
                        question: "What is the time complexity of accessing the nth element in a singly linked list?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        correctAnswer: 2,
                        explanation: "In a singly linked list, to access the nth element, we have to traverse from the head node one by one until we reach the nth position. This takes O(n) time in the worst case."
                      },
                      {
                        id: "q8-2",
                        question: "Which of the following operations is more efficient with a singly linked list compared to an array?",
                        options: [
                          "Random access of elements",
                          "Insertion at the beginning",
                          "Binary search",
                          "Checking if an element exists"
                        ],
                        correctAnswer: 1,
                        explanation: "Insertion at the beginning of a linked list is an O(1) operation because we only need to update a few pointers. In contrast, inserting at the beginning of an array requires shifting all elements, which is an O(n) operation."
                      },
                      {
                        id: "q8-3",
                        question: "Which technique is commonly used to detect cycles in a linked list?",
                        options: [
                          "Depth-First Search",
                          "Binary Search",
                          "Hash Table Lookup",
                          "Floyd's Cycle-Finding Algorithm (Tortoise and Hare)"
                        ],
                        correctAnswer: 3,
                        explanation: "Floyd's Cycle-Finding Algorithm, also known as the Tortoise and Hare algorithm, uses two pointers moving at different speeds to detect cycles in a linked list. If there is a cycle, the fast pointer will eventually catch up to the slow pointer."
                      },
                      {
                        id: "q8-4",
                        question: "What is the time complexity of reversing a singly linked list?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n log n)"
                        ],
                        correctAnswer: 2,
                        explanation: "Reversing a singly linked list requires visiting each node once to update its next pointer, resulting in a time complexity of O(n), where n is the number of nodes in the list."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-9",
              day: 9,
              topics: [
                {
                  id: "doubly-linked-list",
                  title: "Doubly Linked List",
                  description: "Implementing and using doubly linked lists",
                  problems: [
                    {
                      id: "dll-1",
                      name: "Design your own DLL"
                    },
                    {
                      id: "146",
                      name: "LRU Cache",
                      link: "https://leetcode.com/problems/lru-cache/",
                      difficulty: "Medium"
                    },
                    {
                      id: "460",
                      name: "LFU Cache",
                      link: "https://leetcode.com/problems/lfu-cache/",
                      difficulty: "Hard"
                    },
                    {
                      id: "1472",
                      name: "Design Browser History",
                      link: "https://leetcode.com/problems/design-browser-history/",
                      difficulty: "Medium"
                    },
                    {
                      id: "430",
                      name: "Flatten a Multilevel Doubly Linked List",
                      link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
                      difficulty: "Medium"
                    },
                    {
                      id: "707",
                      name: "Design Linked List",
                      link: "https://leetcode.com/problems/design-linked-list/",
                      difficulty: "Medium"
                    }
                  ],
                  content: {
                    introduction: "A doubly linked list is an enhanced version of the linked list data structure where each node contains two pointers: one pointing to the next node and another pointing to the previous node. This bidirectional linkage provides more flexibility than singly linked lists, allowing for efficient traversal in both directions and simplifying certain operations like deletion. Doubly linked lists are widely used in applications requiring frequent navigation in both directions, such as browser history, text editors, and various cache implementations.",
                    learningObjectives: [
                      "Understand the structure and implementation of doubly linked lists",
                      "Compare doubly linked lists with singly linked lists",
                      "Implement basic operations: insertion, deletion, traversal in both directions",
                      "Apply doubly linked lists to solve real-world problems",
                      "Recognize scenarios where doubly linked lists are the optimal choice"
                    ],
                    sections: [
                      {
                        title: "Doubly Linked List Structure",
                        content: "A doubly linked list node contains three components:\n\n1. **Data**: The value stored in the node\n2. **Next Pointer**: Reference to the next node in the sequence\n3. **Previous Pointer**: Reference to the previous node in the sequence\n\nThe list is typically accessed through both 'head' and 'tail' pointers, which point to the first and last nodes respectively. The previous pointer of the head node and the next pointer of the tail node are typically null.\n\n```java\nclass DoublyListNode {\n    int val;\n    DoublyListNode next;\n    DoublyListNode prev;\n    \n    DoublyListNode() {}\n    DoublyListNode(int val) { this.val = val; }\n    DoublyListNode(int val, DoublyListNode prev, DoublyListNode next) {\n        this.val = val;\n        this.prev = prev;\n        this.next = next;\n    }\n}\n```\n\nKey characteristics of doubly linked lists:\n- Bidirectional traversal\n- More memory usage than singly linked lists (due to extra pointer)\n- Simplified deletion operations (no need to track the previous node)\n- Efficient insertions and deletions at any position with O(1) time complexity once the position is known",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Basic doubly linked list implementation\npublic class DoublyLinkedList {\n    private DoublyListNode head;\n    private DoublyListNode tail;\n    private int size;\n    \n    public DoublyLinkedList() {\n        this.head = null;\n        this.tail = null;\n        this.size = 0;\n    }\n    \n    // Get the size of the list\n    public int size() {\n        return size;\n    }\n    \n    // Check if the list is empty\n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    // Get the first element\n    public int getFirst() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"List is empty\");\n        }\n        return head.val;\n    }\n    \n    // Get the last element\n    public int getLast() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"List is empty\");\n        }\n        return tail.val;\n    }\n}",
                            explanation: "This example shows a basic doubly linked list class with head and tail pointers. The class includes methods to get the size of the list, check if it's empty, and retrieve the first and last elements."
                          }
                        ]
                      },
                      {
                        title: "Basic Operations on Doubly Linked Lists",
                        content: "Here are the fundamental operations for a doubly linked list:\n\n**1. Insertion**\nNodes can be inserted at various positions:\n- Beginning: Update the prev pointer of the current head and the next pointer of the new node\n- End: Update the next pointer of the current tail and the prev pointer of the new node\n- Middle: Update the prev and next pointers of adjacent nodes and the new node\n\n**2. Deletion**\nNodes can be removed from different positions:\n- Beginning: Update the head and its prev pointer\n- End: Update the tail and its next pointer\n- Middle: Update the prev and next pointers of adjacent nodes\n\n**3. Traversal**\nThe list can be traversed in both directions:\n- Forward: Start from head and follow next pointers\n- Backward: Start from tail and follow prev pointers\n\n**4. Search**\nFind a node with a specific value by traversing the list in either direction.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Adding elements to a doubly linked list\npublic void addFirst(int val) {\n    DoublyListNode newNode = new DoublyListNode(val);\n    \n    if (isEmpty()) {\n        head = newNode;\n        tail = newNode;\n    } else {\n        newNode.next = head;\n        head.prev = newNode;\n        head = newNode;\n    }\n    \n    size++;\n}\n\npublic void addLast(int val) {\n    DoublyListNode newNode = new DoublyListNode(val);\n    \n    if (isEmpty()) {\n        head = newNode;\n        tail = newNode;\n    } else {\n        tail.next = newNode;\n        newNode.prev = tail;\n        tail = newNode;\n    }\n    \n    size++;\n}\n\n// Removing elements from a doubly linked list\npublic int removeFirst() {\n    if (isEmpty()) {\n        throw new NoSuchElementException(\"List is empty\");\n    }\n    \n    int val = head.val;\n    \n    if (head == tail) {\n        head = null;\n        tail = null;\n    } else {\n        head = head.next;\n        head.prev = null;\n    }\n    \n    size--;\n    return val;\n}\n\npublic int removeLast() {\n    if (isEmpty()) {\n        throw new NoSuchElementException(\"List is empty\");\n    }\n    \n    int val = tail.val;\n    \n    if (head == tail) {\n        head = null;\n        tail = null;\n    } else {\n        tail = tail.prev;\n        tail.next = null;\n    }\n    \n    size--;\n    return val;\n}\n\n// Traversing forward and backward\npublic void printForward() {\n    DoublyListNode current = head;\n    while (current != null) {\n        System.out.print(current.val + \" <-> \");\n        current = current.next;\n    }\n    System.out.println(\"null\");\n}\n\npublic void printBackward() {\n    DoublyListNode current = tail;\n    while (current != null) {\n        System.out.print(current.val + \" <-> \");\n        current = current.prev;\n    }\n    System.out.println(\"null\");\n}",
                            explanation: "These examples demonstrate the basic operations on a doubly linked list. The addFirst and addLast methods insert nodes at the beginning and end of the list, respectively. The removeFirst and removeLast methods remove nodes from the beginning and end. The printForward and printBackward methods show how to traverse the list in both directions."
                          }
                        ]
                      },
                      {
                        title: "Comparing Singly and Doubly Linked Lists",
                        content: "Understanding the differences between singly and doubly linked lists is important for choosing the right structure for your needs:\n\n**Doubly Linked List Advantages:**\n- Bidirectional traversal\n- Simplified deletion operations (no need to track previous nodes)\n- Efficient implementation of certain data structures (e.g., deque)\n- Fast removal of nodes when direct access is available (no need to find previous node)\n- Quick access to both ends of the list\n\n**Doubly Linked List Disadvantages:**\n- Higher memory overhead (extra pointer per node)\n- More complex implementation\n- More pointer manipulations required for insertions and deletions\n\n**When to Choose Doubly Linked List:**\n- When backward traversal is required\n- When quick deletions from arbitrary positions are needed\n- When implementing data structures like LRU cache or browser history\n- When implementing a deque (double-ended queue)\n\n**When to Choose Singly Linked List:**\n- When memory usage is a concern\n- When simpler implementation is preferred\n- When forward-only traversal is sufficient\n- When most operations occur at the beginning of the list"
                      },
                      {
                        title: "Advanced Applications",
                        content: "Doubly linked lists are used in various practical applications:\n\n**1. LRU (Least Recently Used) Cache**\nA doubly linked list is combined with a hash map to implement an efficient LRU cache. The list maintains the order of usage, and the hash map provides O(1) lookups.\n\n**2. Browser History**\nWeb browsers often use doubly linked lists to implement navigation history, allowing users to go backward and forward through visited pages.\n\n**3. Text Editors**\nText editors use specialized linked lists for efficient cursor movement, insertion, and deletion of characters in both directions.\n\n**4. Music Players**\nPlayback applications use doubly linked lists to navigate through playlists, supporting both next and previous operations.\n\n**5. Undo-Redo Functionality**\nApplications implement undo-redo features using doubly linked lists to track operation history.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Simplified LRU Cache implementation using a doubly linked list\nclass LRUCache {\n    private class Node {\n        int key, value;\n        Node prev, next;\n        Node(int key, int value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n    \n    private int capacity;\n    private Map<Integer, Node> cache;\n    private Node head, tail; // Dummy head and tail\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.cache = new HashMap<>();\n        \n        // Initialize dummy nodes\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    public int get(int key) {\n        if (!cache.containsKey(key)) {\n            return -1;\n        }\n        \n        // Move node to front (most recently used)\n        Node node = cache.get(key);\n        moveToFront(node);\n        return node.value;\n    }\n    \n    public void put(int key, int value) {\n        // If key exists, update and move to front\n        if (cache.containsKey(key)) {\n            Node node = cache.get(key);\n            node.value = value;\n            moveToFront(node);\n            return;\n        }\n        \n        // If at capacity, remove least recently used (from end)\n        if (cache.size() == capacity) {\n            Node lru = tail.prev;\n            removeNode(lru);\n            cache.remove(lru.key);\n        }\n        \n        // Add new node to front\n        Node newNode = new Node(key, value);\n        cache.put(key, newNode);\n        addToFront(newNode);\n    }\n    \n    private void addToFront(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n    \n    private void removeNode(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    \n    private void moveToFront(Node node) {\n        removeNode(node);\n        addToFront(node);\n    }\n}",
                            explanation: "This example demonstrates a simplified implementation of an LRU Cache using a doubly linked list and a hash map. The doubly linked list maintains the order of usage, with the most recently used items at the front and least recently used at the back. The hash map provides O(1) lookup of nodes by key. When a node is accessed or updated, it's moved to the front of the list. When the cache reaches capacity, the least recently used item (at the back of the list) is removed."
                          }
                        ]
                      },
                      {
                        title: "Implementing a Doubly Linked List in Java",
                        content: "When implementing a doubly linked list, it's important to consider:\n\n**1. Edge Cases**\n- Empty list operations\n- Single node operations\n- Operations on the first or last node\n\n**2. Maintaining Both Pointers**\n- Always update both prev and next pointers when modifying the list\n- Ensure head and tail are correctly updated\n\n**3. Memory Management**\n- In languages with manual memory management, ensure proper cleanup of removed nodes\n- In Java, removed nodes will be garbage collected if there are no other references\n\n**4. Design Considerations**\n- Consider using dummy/sentinel nodes to simplify edge cases\n- Decide whether to implement a circular doubly linked list for certain applications\n- Ensure thread safety if the list will be accessed concurrently\n\nA well-implemented doubly linked list provides a versatile foundation for more complex data structures and applications.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Complete Doubly Linked List implementation\npublic class DoublyLinkedList<E> {\n    private static class Node<E> {\n        E data;\n        Node<E> prev;\n        Node<E> next;\n        \n        Node(E data) {\n            this.data = data;\n        }\n        \n        Node(E data, Node<E> prev, Node<E> next) {\n            this.data = data;\n            this.prev = prev;\n            this.next = next;\n        }\n    }\n    \n    private Node<E> head;\n    private Node<E> tail;\n    private int size;\n    \n    public DoublyLinkedList() {\n        head = null;\n        tail = null;\n        size = 0;\n    }\n    \n    public int size() {\n        return size;\n    }\n    \n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    // Add element at a specific index\n    public void add(int index, E element) {\n        if (index < 0 || index > size) {\n            throw new IndexOutOfBoundsException();\n        }\n        \n        if (index == 0) {\n            addFirst(element);\n        } else if (index == size) {\n            addLast(element);\n        } else {\n            Node<E> current = getNodeAt(index);\n            Node<E> newNode = new Node<>(element, current.prev, current);\n            current.prev.next = newNode;\n            current.prev = newNode;\n            size++;\n        }\n    }\n    \n    // Add element at the beginning\n    public void addFirst(E element) {\n        Node<E> newNode = new Node<>(element);\n        \n        if (isEmpty()) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            newNode.next = head;\n            head.prev = newNode;\n            head = newNode;\n        }\n        \n        size++;\n    }\n    \n    // Add element at the end\n    public void addLast(E element) {\n        Node<E> newNode = new Node<>(element);\n        \n        if (isEmpty()) {\n            head = newNode;\n            tail = newNode;\n        } else {\n            newNode.prev = tail;\n            tail.next = newNode;\n            tail = newNode;\n        }\n        \n        size++;\n    }\n    \n    // Get element at specific index\n    public E get(int index) {\n        if (index < 0 || index >= size) {\n            throw new IndexOutOfBoundsException();\n        }\n        \n        return getNodeAt(index).data;\n    }\n    \n    // Helper method to get node at index\n    private Node<E> getNodeAt(int index) {\n        Node<E> current;\n        \n        // Choose traversal direction based on index position\n        if (index < size / 2) {\n            // Start from head if closer to beginning\n            current = head;\n            for (int i = 0; i < index; i++) {\n                current = current.next;\n            }\n        } else {\n            // Start from tail if closer to end\n            current = tail;\n            for (int i = size - 1; i > index; i--) {\n                current = current.prev;\n            }\n        }\n        \n        return current;\n    }\n    \n    // Remove element at specific index\n    public E remove(int index) {\n        if (index < 0 || index >= size) {\n            throw new IndexOutOfBoundsException();\n        }\n        \n        if (index == 0) {\n            return removeFirst();\n        } else if (index == size - 1) {\n            return removeLast();\n        } else {\n            Node<E> current = getNodeAt(index);\n            E data = current.data;\n            \n            current.prev.next = current.next;\n            current.next.prev = current.prev;\n            \n            // Help garbage collection\n            current.prev = null;\n            current.next = null;\n            \n            size--;\n            return data;\n        }\n    }\n    \n    // Remove first element\n    public E removeFirst() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        E data = head.data;\n        \n        if (head == tail) {\n            head = null;\n            tail = null;\n        } else {\n            head = head.next;\n            head.prev.next = null;  // Help garbage collection\n            head.prev = null;\n        }\n        \n        size--;\n        return data;\n    }\n    \n    // Remove last element\n    public E removeLast() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        E data = tail.data;\n        \n        if (head == tail) {\n            head = null;\n            tail = null;\n        } else {\n            tail = tail.prev;\n            tail.next.prev = null;  // Help garbage collection\n            tail.next = null;\n        }\n        \n        size--;\n        return data;\n    }\n}",
                            explanation: "This example shows a complete generic implementation of a doubly linked list in Java. The implementation includes methods for adding and removing elements at the beginning, end, and arbitrary positions, as well as accessing elements. It also demonstrates how to efficiently traverse the list by choosing the direction based on the target index's proximity to the head or tail."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw9-1",
                        question: "Implement a function to design an LRU (Least Recently Used) Cache with a specified capacity that supports get and put operations in O(1) time.",
                        codeExample: {
                          language: "java",
                          code: "class LRUCache {\n    // Your code here\n    \n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        \n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}"
                        },
                        solution: "```java\nclass LRUCache {\n    class Node {\n        int key, value;\n        Node prev, next;\n        \n        Node(int key, int value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n    \n    private Map<Integer, Node> cache;\n    private int capacity;\n    private Node head, tail; // Dummy head and tail nodes\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        cache = new HashMap<>();\n        \n        // Initialize dummy nodes\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    public int get(int key) {\n        if (!cache.containsKey(key)) {\n            return -1; // Key not found\n        }\n        \n        // Move accessed node to front (most recently used)\n        Node node = cache.get(key);\n        moveToFront(node);\n        return node.value;\n    }\n    \n    public void put(int key, int value) {\n        // If key exists, update value and move to front\n        if (cache.containsKey(key)) {\n            Node node = cache.get(key);\n            node.value = value;\n            moveToFront(node);\n            return;\n        }\n        \n        // If at capacity, remove least recently used item (from end)\n        if (cache.size() == capacity) {\n            Node lru = tail.prev;\n            removeNode(lru);\n            cache.remove(lru.key);\n        }\n        \n        // Add new node to front (most recently used)\n        Node newNode = new Node(key, value);\n        cache.put(key, newNode);\n        addToFront(newNode);\n    }\n    \n    private void addToFront(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n    \n    private void removeNode(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    \n    private void moveToFront(Node node) {\n        removeNode(node);\n        addToFront(node);\n    }\n}\n```\n\nThis solution implements an LRU Cache using a combination of a HashMap for O(1) lookups and a doubly linked list to maintain the order of usage. The least recently used items are kept at the end of the list, while the most recently used items are at the front. When the cache reaches capacity, the least recently used item is removed."
                      },
                      {
                        id: "hw9-2",
                        question: "Implement a circular doubly linked list with operations to insert at the beginning, insert at the end, delete a node, and display the list.",
                        codeExample: {
                          language: "java",
                          code: "class CircularDoublyLinkedList {\n    // Your code here\n}"
                        },
                        solution: "```java\nclass CircularDoublyLinkedList {\n    private class Node {\n        int data;\n        Node prev;\n        Node next;\n        \n        Node(int data) {\n            this.data = data;\n        }\n    }\n    \n    private Node head;\n    private int size;\n    \n    public CircularDoublyLinkedList() {\n        head = null;\n        size = 0;\n    }\n    \n    public boolean isEmpty() {\n        return head == null;\n    }\n    \n    public int size() {\n        return size;\n    }\n    \n    public void insertAtBeginning(int data) {\n        Node newNode = new Node(data);\n        \n        if (isEmpty()) {\n            head = newNode;\n            head.next = head;\n            head.prev = head;\n        } else {\n            Node tail = head.prev;\n            \n            newNode.next = head;\n            newNode.prev = tail;\n            head.prev = newNode;\n            tail.next = newNode;\n            \n            head = newNode; // Update head to new node\n        }\n        \n        size++;\n    }\n    \n    public void insertAtEnd(int data) {\n        Node newNode = new Node(data);\n        \n        if (isEmpty()) {\n            head = newNode;\n            head.next = head;\n            head.prev = head;\n        } else {\n            Node tail = head.prev;\n            \n            newNode.next = head;\n            newNode.prev = tail;\n            head.prev = newNode;\n            tail.next = newNode;\n        }\n        \n        size++;\n    }\n    \n    public boolean delete(int data) {\n        if (isEmpty()) {\n            return false;\n        }\n        \n        Node current = head;\n        \n        // Find the node with the data\n        do {\n            if (current.data == data) {\n                // If it's the only node\n                if (current.next == current) {\n                    head = null;\n                } else {\n                    current.prev.next = current.next;\n                    current.next.prev = current.prev;\n                    \n                    // If deleting the head, update head\n                    if (current == head) {\n                        head = current.next;\n                    }\n                }\n                \n                size--;\n                return true;\n            }\n            \n            current = current.next;\n        } while (current != head);\n        \n        return false; // Node not found\n    }\n    \n    public void display() {\n        if (isEmpty()) {\n            System.out.println(\"List is empty\");\n            return;\n        }\n        \n        Node current = head;\n        \n        do {\n            System.out.print(current.data + \" <-> \");\n            current = current.next;\n        } while (current != head);\n        \n        System.out.println(\"(back to start)\");\n    }\n}\n```\n\nThis solution implements a circular doubly linked list where the last node points back to the first node and the first node points back to the last node. It includes methods for inserting at the beginning and end, deleting a node with a specific value, and displaying the list. The circular nature of the list is maintained by properly updating the pointers during insertions and deletions."
                      },
                      {
                        id: "hw9-3",
                        question: "Implement a function to flatten a multilevel doubly linked list where nodes can have child pointers to other linked lists. After flattening, all nodes should be in a single-level doubly linked list.",
                        codeExample: {
                          language: "java",
                          code: "class Node {\n    public int val;\n    public Node prev;\n    public Node next;\n    public Node child;\n}\n\npublic Node flatten(Node head) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic Node flatten(Node head) {\n    if (head == null) {\n        return null;\n    }\n    \n    // Use a stack to keep track of next pointers when exploring child nodes\n    Stack<Node> stack = new Stack<>();\n    Node current = head;\n    \n    while (current != null) {\n        // If current node has a child\n        if (current.child != null) {\n            // If current has a next node, push it onto the stack\n            if (current.next != null) {\n                stack.push(current.next);\n            }\n            \n            // Connect current with its child\n            current.next = current.child;\n            current.child.prev = current;\n            current.child = null; // Remove child pointer\n        }\n        // If current has no next but stack is not empty, connect to the top of stack\n        else if (current.next == null && !stack.isEmpty()) {\n            Node nextNode = stack.pop();\n            current.next = nextNode;\n            nextNode.prev = current;\n        }\n        \n        // Move to the next node\n        current = current.next;\n    }\n    \n    return head;\n}\n```\n\nThis solution uses a stack to keep track of the next pointers when exploring child lists. It processes the list level by level, connecting child lists with the main list, and ensures that the prev and next pointers are correctly set to maintain the doubly linked list property. The child pointers are set to null after the child lists are connected to the main list."
                      }
                    ],
                    quiz: [
                      {
                        id: "q9-1",
                        question: "What is the primary advantage of a doubly linked list over a singly linked list?",
                        options: [
                          "Lower memory usage",
                          "Faster traversal to the end",
                          "Bidirectional traversal",
                          "Simpler implementation"
                        ],
                        correctAnswer: 2,
                        explanation: "The primary advantage of a doubly linked list is bidirectional traversal, as it allows movement in both forward and backward directions. This is made possible by each node having both next and previous pointers."
                      },
                      {
                        id: "q9-2",
                        question: "What is the time complexity of removing a node from a doubly linked list when you have direct access to that node?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        correctAnswer: 0,
                        explanation: "When you have direct access to a node in a doubly linked list, removal is an O(1) operation. You simply update the next pointer of the previous node and the prev pointer of the next node to bypass the node being removed."
                      },
                      {
                        id: "q9-3",
                        question: "Which of the following applications is BEST suited for a doubly linked list?",
                        options: [
                          "A stack data structure",
                          "A simple counter",
                          "A browser's forward/backward navigation history",
                          "A read-only list of items"
                        ],
                        correctAnswer: 2,
                        explanation: "A browser's forward/backward navigation history is best suited for a doubly linked list because it requires traversal in both directions, which is exactly what a doubly linked list excels at. Users need to move both forward and backward through their browsing history."
                      },
                      {
                        id: "q9-4",
                        question: "What is the space complexity overhead of a doubly linked list compared to a singly linked list with n elements?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "No additional overhead"
                        ],
                        correctAnswer: 2,
                        explanation: "The space complexity overhead of a doubly linked list compared to a singly linked list is O(n) because each of the n nodes requires an additional pointer (the prev pointer) to the previous node."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-10",
              day: 10,
              topics: [
                {
                  id: "stack-basics",
                  title: "Stack Basics",
                  description: "LIFO data structure fundamentals",
                  problems: [
                    {
                      id: "20",
                      name: "Valid Parentheses",
                      link: "https://leetcode.com/problems/valid-parentheses/",
                      difficulty: "Easy"
                    },
                    {
                      id: "155",
                      name: "Min Stack",
                      link: "https://leetcode.com/problems/min-stack/",
                      difficulty: "Easy"
                    },
                    {
                      id: "225",
                      name: "Implement Stack using Queues",
                      link: "https://leetcode.com/problems/implement-stack-using-queues/",
                      difficulty: "Easy"
                    },
                    {
                      id: "682",
                      name: "Baseball Game",
                      link: "https://leetcode.com/problems/baseball-game/",
                      difficulty: "Easy"
                    },
                    {
                      id: "150",
                      name: "Evaluate Reverse Polish Notation",
                      link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
                      difficulty: "Medium"
                    },
                    {
                      id: "71",
                      name: "Simplify Path",
                      link: "https://leetcode.com/problems/simplify-path/",
                      difficulty: "Medium"
                    },
                    {
                      id: "946",
                      name: "Validate Stack Sequences",
                      link: "https://leetcode.com/problems/validate-stack-sequences/",
                      difficulty: "Medium"
                    },
                    {
                      id: "1249",
                      name: "Minimum Remove to Make Valid Parentheses",
                      link: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
                      difficulty: "Medium"
                    },
                    {
                      id: "85",
                      name: "Maximal Rectangle",
                      link: "https://leetcode.com/problems/maximal-rectangle/",
                      difficulty: "Hard"
                    },
                    {
                      id: "32",
                      name: "Longest Valid Parentheses",
                      link: "https://leetcode.com/problems/longest-valid-parentheses/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "A stack is a fundamental data structure that follows the Last-In-First-Out (LIFO) principle, meaning the last element added to the stack is the first one to be removed. Think of it like a stack of plates: you can only add or remove plates from the top. This simple but powerful concept is used extensively in algorithm design, language parsing, expression evaluation, and many other applications. Understanding stacks is crucial for solving a wide range of programming problems efficiently.",
                    learningObjectives: [
                      "Understand the core concept of stack data structure and LIFO principle",
                      "Learn how to implement a stack using arrays and linked lists",
                      "Master fundamental stack operations: push, pop, peek, and isEmpty",
                      "Recognize problems where stacks provide efficient solutions",
                      "Apply stack-based algorithms to solve common programming challenges"
                    ],
                    sections: [
                      {
                        title: "Stack Fundamentals",
                        content: "A stack is a collection that is based on the Last-In-First-Out (LIFO) principle. This means that the last element added to the stack will be the first one to be removed.\n\n**Core Operations:**\n\n1. **push(element)**: Adds an element to the top of the stack\n2. **pop()**: Removes and returns the top element of the stack\n3. **peek()/top()**: Returns the top element without removing it\n4. **isEmpty()**: Returns true if the stack contains no elements\n5. **size()**: Returns the number of elements in the stack\n\nAll these operations run in O(1) time complexity, making stacks very efficient for operations that need to access only the most recently added items.\n\n**Common Applications:**\n\n- Function call management (call stack)\n- Expression evaluation and conversion\n- Backtracking algorithms\n- Undo mechanisms in text editors\n- Browser history (back button)\n- Syntax parsing (e.g., matching parentheses)",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Array-based stack implementation\npublic class ArrayStack<E> {\n    private static final int DEFAULT_CAPACITY = 10;\n    private Object[] elements;\n    private int size;\n    \n    public ArrayStack() {\n        elements = new Object[DEFAULT_CAPACITY];\n        size = 0;\n    }\n    \n    // Add element to the top of the stack\n    public void push(E element) {\n        ensureCapacity();\n        elements[size++] = element;\n    }\n    \n    // Remove and return the top element\n    @SuppressWarnings(\"unchecked\")\n    public E pop() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        E element = (E) elements[--size];\n        elements[size] = null; // Help garbage collection\n        return element;\n    }\n    \n    // Return the top element without removing it\n    @SuppressWarnings(\"unchecked\")\n    public E peek() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        return (E) elements[size - 1];\n    }\n    \n    // Check if stack is empty\n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    // Return number of elements in stack\n    public int size() {\n        return size;\n    }\n    \n    // Ensure the array has enough capacity\n    private void ensureCapacity() {\n        if (size == elements.length) {\n            int newCapacity = elements.length * 2;\n            elements = Arrays.copyOf(elements, newCapacity);\n        }\n    }\n}",
                            explanation: "This code shows an array-based implementation of a stack. The array automatically resizes when it reaches capacity. All operations (push, pop, peek, isEmpty, size) have O(1) time complexity."
                          },
                          {
                            language: "java",
                            code: "// Linked list-based stack implementation\npublic class LinkedStack<E> {\n    private static class Node<E> {\n        E data;\n        Node<E> next;\n        \n        Node(E data) {\n            this.data = data;\n        }\n    }\n    \n    private Node<E> top;\n    private int size;\n    \n    public LinkedStack() {\n        top = null;\n        size = 0;\n    }\n    \n    // Add element to the top of the stack\n    public void push(E element) {\n        Node<E> newNode = new Node<>(element);\n        newNode.next = top;\n        top = newNode;\n        size++;\n    }\n    \n    // Remove and return the top element\n    public E pop() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        E element = top.data;\n        top = top.next;\n        size--;\n        return element;\n    }\n    \n    // Return the top element without removing it\n    public E peek() {\n        if (isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        return top.data;\n    }\n    \n    // Check if stack is empty\n    public boolean isEmpty() {\n        return top == null;\n    }\n    \n    // Return number of elements in stack\n    public int size() {\n        return size;\n    }\n}",
                            explanation: "This code demonstrates a linked list-based implementation of a stack. New elements are added to the beginning of the linked list, which serves as the top of the stack. Like the array implementation, all operations have O(1) time complexity."
                          }
                        ]
                      },
                      {
                        title: "Stack vs. Other Data Structures",
                        content: "**Stack vs. Queue:**\n- Stack: Last-In-First-Out (LIFO)\n- Queue: First-In-First-Out (FIFO)\n\n**Stack vs. Array:**\n- Arrays provide random access to any element\n- Stacks only allow access to the top element\n- Stacks have a more restricted API, which can prevent errors\n\n**Stack vs. LinkedList:**\n- LinkedList can be traversed in both directions\n- Stack can only be accessed from the top\n- Both can be used to implement each other\n\n**Choosing Between Implementations:**\n- **Array-based Stack**:\n  - More memory-efficient (no pointers)\n  - Better cache locality\n  - Fixed size or needs to resize\n  \n- **Linked List-based Stack**:\n  - Dynamic size without resizing\n  - Slightly more memory overhead\n  - No maximum capacity concerns\n\nIn Java, the `java.util.Stack` class extends `Vector` and is synchronized, which can lead to performance overhead. For better performance, consider using `ArrayDeque` as a stack by only using its `push()`, `pop()`, and `peek()` methods.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Using Java's built-in Stack class\nimport java.util.Stack;\n\npublic class StackExample {\n    public static void main(String[] args) {\n        Stack<Integer> stack = new Stack<>();\n        \n        // Push elements\n        stack.push(10);\n        stack.push(20);\n        stack.push(30);\n        \n        System.out.println(\"Top element: \" + stack.peek());  // 30\n        System.out.println(\"Popped element: \" + stack.pop());  // 30\n        System.out.println(\"Size: \" + stack.size());  // 2\n        System.out.println(\"Is empty: \" + stack.isEmpty());  // false\n    }\n}\n\n// Using ArrayDeque as a stack (preferred)\nimport java.util.ArrayDeque;\n\npublic class ArrayDequeAsStack {\n    public static void main(String[] args) {\n        ArrayDeque<Integer> stack = new ArrayDeque<>();\n        \n        // Push elements\n        stack.push(10);\n        stack.push(20);\n        stack.push(30);\n        \n        System.out.println(\"Top element: \" + stack.peek());  // 30\n        System.out.println(\"Popped element: \" + stack.pop());  // 30\n        System.out.println(\"Size: \" + stack.size());  // 2\n        System.out.println(\"Is empty: \" + stack.isEmpty());  // false\n    }\n}",
                            explanation: "This example shows how to use Java's built-in Stack class and compares it to using ArrayDeque as a stack. ArrayDeque is generally preferred for better performance as it's not synchronized and doesn't have the overhead of extending Vector like the Stack class does."
                          }
                        ]
                      },
                      {
                        title: "Common Stack Applications",
                        content: "**1. Parentheses Matching**\nStacks are perfect for checking balanced parentheses in expressions. Push opening brackets onto the stack, and pop when matching closing brackets are encountered.\n\n**2. Expression Evaluation**\nStacks can evaluate postfix (Reverse Polish Notation) expressions efficiently. They can also be used to convert between infix, postfix, and prefix notations.\n\n**3. Function Call Management**\nProgramming languages use a call stack to manage function calls, storing local variables and return addresses.\n\n**4. Undo Functionality**\nStacks can track operations for implementing undo features in applications.\n\n**5. Depth-First Search (DFS)**\nStacks are used to implement iterative versions of DFS for graph and tree traversal.\n\n**6. Backtracking Algorithms**\nStacks help track states in backtracking algorithms like maze solving or N-Queens problem.\n\n**7. Browser History**\nWeb browsers use stacks to implement the back button functionality, storing previously visited pages.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Checking for balanced parentheses\npublic boolean isBalanced(String expression) {\n    Stack<Character> stack = new Stack<>();\n    \n    for (char c : expression.toCharArray()) {\n        if (c == '(' || c == '[' || c == '{') {\n            stack.push(c);\n        } else if (c == ')' || c == ']' || c == '}') {\n            if (stack.isEmpty()) {\n                return false; // Closing bracket with no matching opening bracket\n            }\n            \n            char top = stack.pop();\n            \n            if ((c == ')' && top != '(') ||\n                (c == ']' && top != '[') ||\n                (c == '}' && top != '{')) {\n                return false; // Mismatched brackets\n            }\n        }\n    }\n    \n    return stack.isEmpty(); // Stack should be empty if all brackets are matched\n}",
                            explanation: "This example demonstrates how to use a stack to check for balanced parentheses in an expression. The algorithm pushes opening brackets onto the stack and pops them when matching closing brackets are encountered. If the stack is empty at the end, all brackets are properly balanced."
                          },
                          {
                            language: "java",
                            code: "// Evaluating a postfix expression\npublic int evaluatePostfix(String[] tokens) {\n    Stack<Integer> stack = new Stack<>();\n    \n    for (String token : tokens) {\n        if (token.equals(\"+\") || token.equals(\"-\") || \n            token.equals(\"*\") || token.equals(\"/\")) {\n            // Pop operands for operation\n            int b = stack.pop();\n            int a = stack.pop();\n            int result = 0;\n            \n            // Perform operation\n            switch (token) {\n                case \"+\":\n                    result = a + b;\n                    break;\n                case \"-\":\n                    result = a - b;\n                    break;\n                case \"*\":\n                    result = a * b;\n                    break;\n                case \"/\":\n                    result = a / b;\n                    break;\n            }\n            \n            // Push result back to stack\n            stack.push(result);\n        } else {\n            // If token is a number, push it to stack\n            stack.push(Integer.parseInt(token));\n        }\n    }\n    \n    return stack.pop(); // Final result is on top of stack\n}",
                            explanation: "This example shows how to evaluate a postfix (Reverse Polish Notation) expression using a stack. It processes each token from left to right. When an operand is encountered, it's pushed onto the stack. When an operator is encountered, the top two operands are popped, the operation is performed, and the result is pushed back onto the stack."
                          }
                        ]
                      },
                      {
                        title: "Stack-Based Algorithms",
                        content: "**1. Depth-First Search (DFS) with Stack**\nWhile recursion is often used for DFS, an explicit stack can also be used to implement it iteratively, which can be more efficient and avoids potential stack overflow errors for deep trees or graphs.\n\n**2. Infix to Postfix Conversion**\nStacks can convert infix expressions (the normal way we write expressions, e.g., A+B) to postfix notation (AB+) to simplify evaluation.\n\n**3. Monotonic Stack Pattern**\nA monotonic stack (increasing or decreasing) is useful for problems like finding the next greater/smaller element, calculating areas (like in the \"largest rectangle in histogram\" problem), or solving stock span problems.\n\n**4. Backtracking with Stack**\nStacks can track states in backtracking algorithms, allowing you to restore previous states when needed.\n\nWhen approaching stack problems, consider these strategies:\n- Ask yourself if the problem involves processing elements in reverse order of their arrival\n- Look for opportunities to match or pair elements (like brackets)\n- Consider whether you need to track previous states or calculations\n- Check if you need the 'most recent' element frequently",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Iterative DFS using stack\npublic void dfsIterative(GraphNode start) {\n    Set<GraphNode> visited = new HashSet<>();\n    Stack<GraphNode> stack = new Stack<>();\n    \n    stack.push(start);\n    \n    while (!stack.isEmpty()) {\n        GraphNode current = stack.pop();\n        \n        if (!visited.contains(current)) {\n            visited.add(current);\n            System.out.println(current.value); // Process node\n            \n            // Add all unvisited neighbors to stack\n            for (GraphNode neighbor : current.getNeighbors()) {\n                if (!visited.contains(neighbor)) {\n                    stack.push(neighbor);\n                }\n            }\n        }\n    }\n}",
                            explanation: "This example demonstrates an iterative implementation of Depth-First Search using a stack. It starts with the initial node and explores as far as possible along each branch before backtracking. The stack stores nodes to be processed, ensuring that nodes discovered later are processed first (LIFO)."
                          },
                          {
                            language: "java",
                            code: "// Next Greater Element using monotonic stack\npublic int[] nextGreaterElement(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);  // Default to -1 (no greater element)\n    \n    Stack<Integer> stack = new Stack<>();  // Stack of indices\n    \n    for (int i = 0; i < n; i++) {\n        // While stack is not empty and current element is greater than element at stack top\n        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n            int idx = stack.pop();\n            result[idx] = nums[i];  // Found next greater element\n        }\n        \n        stack.push(i);  // Push current index to stack\n    }\n    \n    return result;\n}",
                            explanation: "This example demonstrates the monotonic stack pattern to find the next greater element for each element in an array. The stack maintains indices in decreasing order of their corresponding values. When a larger element is encountered, it becomes the next greater element for all smaller elements currently in the stack."
                          }
                        ]
                      },
                      {
                        title: "Stack Implementation Considerations",
                        content: "When implementing or using stacks, consider these important aspects:\n\n**1. Error Handling**\n- Check for stack underflow (popping from an empty stack)\n- Define error behavior (throw exception or return special value)\n\n**2. Performance Optimization**\n- Choose the right underlying data structure (array or linked list)\n- Consider memory usage vs. performance trade-offs\n- Resize strategies for array-based stacks\n\n**3. Thread Safety**\n- Decide if concurrent access is needed\n- Use synchronized implementations or locks if necessary\n- Consider thread-local stacks for performance\n\n**4. Special Stack Types**\n- Min/Max Stack: Efficiently tracks minimum or maximum element\n- Double Stack: Uses a single array to implement two stacks\n- Randomized Stack: Supports O(1) random sampling in addition to standard operations\n\n**5. API Design**\n- Keep the interface simple and focused on LIFO operations\n- Consider additional helper methods for specific use cases\n- Document behavior clearly, especially for edge cases",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Min Stack implementation - efficiently tracks minimum element\npublic class MinStack {\n    private Stack<Integer> stack;\n    private Stack<Integer> minStack;\n    \n    public MinStack() {\n        stack = new Stack<>();\n        minStack = new Stack<>();\n    }\n    \n    public void push(int val) {\n        stack.push(val);\n        \n        // If minStack is empty or val is less than or equal to current min,\n        // push to minStack\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n    \n    public void pop() {\n        if (stack.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        int popped = stack.pop();\n        \n        // If popped value is the current minimum, remove from minStack too\n        if (!minStack.isEmpty() && popped == minStack.peek()) {\n            minStack.pop();\n        }\n    }\n    \n    public int top() {\n        if (stack.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        return stack.peek();\n    }\n    \n    public int getMin() {\n        if (minStack.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        \n        return minStack.peek();\n    }\n}",
                            explanation: "This example demonstrates a Min Stack implementation that efficiently tracks the minimum element in the stack in O(1) time. It uses an auxiliary stack (minStack) to keep track of the minimum values at each state of the main stack. The minStack only pushes values that are less than or equal to the current minimum."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw10-1",
                        question: "Implement a function to convert an infix expression to postfix notation. Assume the expression contains only single-digit numbers and operators +, -, *, /, and parentheses.",
                        codeExample: {
                          language: "java",
                          code: "public String infixToPostfix(String infix) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic String infixToPostfix(String infix) {\n    StringBuilder postfix = new StringBuilder();\n    Stack<Character> stack = new Stack<>();\n    \n    for (char c : infix.toCharArray()) {\n        // If the character is an operand, add it to the output\n        if (Character.isDigit(c)) {\n            postfix.append(c);\n        }\n        // If the character is an opening parenthesis, push it to the stack\n        else if (c == '(') {\n            stack.push(c);\n        }\n        // If the character is a closing parenthesis, pop and output from the stack\n        // until an opening parenthesis is encountered\n        else if (c == ')') {\n            while (!stack.isEmpty() && stack.peek() != '(') {\n                postfix.append(stack.pop());\n            }\n            \n            if (!stack.isEmpty() && stack.peek() == '(') {\n                stack.pop(); // Discard the opening parenthesis\n            }\n        }\n        // If the character is an operator\n        else if (c == '+' || c == '-' || c == '*' || c == '/') {\n            // Pop operators with higher or equal precedence and add to output\n            while (!stack.isEmpty() && precedence(stack.peek()) >= precedence(c)) {\n                postfix.append(stack.pop());\n            }\n            // Push the current operator to the stack\n            stack.push(c);\n        }\n    }\n    \n    // Pop any remaining operators from the stack and add to output\n    while (!stack.isEmpty()) {\n        postfix.append(stack.pop());\n    }\n    \n    return postfix.toString();\n}\n\nprivate int precedence(char operator) {\n    switch (operator) {\n        case '+': case '-':\n            return 1;\n        case '*': case '/':\n            return 2;\n    }\n    return -1; // For '(' or other characters\n}\n```\n\nThis solution converts an infix expression to postfix notation using a stack to keep track of operators. It processes the input from left to right, building the postfix expression by following these rules: operands are immediately added to the output, operators are pushed to the stack based on precedence, and parentheses help control the order of operations."
                      },
                      {
                        id: "hw10-2",
                        question: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
                        codeExample: {
                          language: "java",
                          code: "class MinStack {\n    // Your code here\n    \n    public MinStack() {\n        \n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        \n    }\n    \n    public int getMin() {\n        \n    }\n}"
                        },
                        solution: "```java\nclass MinStack {\n    private Stack<Integer> stack;\n    private Stack<Integer> minStack;\n    \n    public MinStack() {\n        stack = new Stack<>();\n        minStack = new Stack<>();\n    }\n    \n    public void push(int val) {\n        stack.push(val);\n        \n        // If minStack is empty or val is less than or equal to current min,\n        // push to minStack\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n    \n    public void pop() {\n        if (!stack.isEmpty()) {\n            int popped = stack.pop();\n            \n            // If popped value is the current minimum, remove from minStack too\n            if (!minStack.isEmpty() && popped == minStack.peek()) {\n                minStack.pop();\n            }\n        }\n    }\n    \n    public int top() {\n        if (stack.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        return stack.peek();\n    }\n    \n    public int getMin() {\n        if (minStack.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        return minStack.peek();\n    }\n}\n```\n\nThis solution implements a MinStack that efficiently keeps track of the minimum element. It uses two stacks: one for the actual values and another to track minimum values. The minimum stack only stores values that are less than or equal to the current minimum, ensuring that the current minimum is always at the top of the minStack. All operations (push, pop, top, getMin) run in O(1) time."
                      },
                      {
                        id: "hw10-3",
                        question: "Implement a function to evaluate a mathematical expression in Reverse Polish Notation (postfix notation). The expression contains only integers and operators +, -, *, /.",
                        codeExample: {
                          language: "java",
                          code: "public int evalRPN(String[] tokens) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int evalRPN(String[] tokens) {\n    Stack<Integer> stack = new Stack<>();\n    \n    for (String token : tokens) {\n        // If token is an operator, perform operation on top two elements\n        if (token.equals(\"+\") || token.equals(\"-\") || \n            token.equals(\"*\") || token.equals(\"/\")) {\n            \n            // Ensure there are at least two operands\n            if (stack.size() < 2) {\n                throw new IllegalArgumentException(\"Invalid expression\");\n            }\n            \n            int b = stack.pop(); // Second operand\n            int a = stack.pop(); // First operand\n            int result;\n            \n            switch (token) {\n                case \"+\":\n                    result = a + b;\n                    break;\n                case \"-\":\n                    result = a - b;\n                    break;\n                case \"*\":\n                    result = a * b;\n                    break;\n                case \"/\":\n                    // Check for division by zero\n                    if (b == 0) {\n                        throw new ArithmeticException(\"Division by zero\");\n                    }\n                    result = a / b;\n                    break;\n                default:\n                    throw new IllegalArgumentException(\"Invalid operator: \" + token);\n            }\n            \n            stack.push(result);\n        } else {\n            // If token is a number, push it to the stack\n            try {\n                stack.push(Integer.parseInt(token));\n            } catch (NumberFormatException e) {\n                throw new IllegalArgumentException(\"Invalid token: \" + token);\n            }\n        }\n    }\n    \n    // The final result should be the only item left in the stack\n    if (stack.size() != 1) {\n        throw new IllegalArgumentException(\"Invalid expression\");\n    }\n    \n    return stack.pop();\n}\n```\n\nThis solution evaluates a postfix expression using a stack. It processes tokens from left to right, pushing operands onto the stack and performing operations when operators are encountered. When an operator is processed, it pops the top two values from the stack, applies the operation, and pushes the result back. The final result is the only value left in the stack at the end."
                      }
                    ],
                    quiz: [
                      {
                        id: "q10-1",
                        question: "What principle does a stack data structure follow?",
                        options: [
                          "First-In-First-Out (FIFO)",
                          "Last-In-First-Out (LIFO)",
                          "Random Access",
                          "Priority-based access"
                        ],
                        correctAnswer: 1,
                        explanation: "A stack follows the Last-In-First-Out (LIFO) principle, meaning the most recently added element is the first one to be removed. This is similar to a stack of plates, where you can only add or remove plates from the top."
                      },
                      {
                        id: "q10-2",
                        question: "What is the time complexity of push and pop operations in a properly implemented stack?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n log n)"
                        ],
                        correctAnswer: 0,
                        explanation: "Both push and pop operations in a stack have O(1) time complexity (constant time). This is because these operations only affect the top of the stack and don't require traversing or searching through the elements."
                      },
                      {
                        id: "q10-3",
                        question: "Which of the following applications is NOT typically implemented using a stack?",
                        options: [
                          "Function call management in programming languages",
                          "Undo mechanism in text editors",
                          "Breadth-first search in graph algorithms",
                          "Evaluating postfix expressions"
                        ],
                        correctAnswer: 2,
                        explanation: "Breadth-first search is typically implemented using a queue (FIFO), not a stack. A queue ensures that nodes are processed in the order they are discovered, which is essential for level-by-level traversal. The other options are common applications of stacks."
                      },
                      {
                        id: "q10-4",
                        question: "Which data structure would you use to efficiently implement a stack in Java that needs to support constant-time operations?",
                        options: [
                          "LinkedList",
                          "ArrayList",
                          "ArrayDeque",
                          "All of the above"
                        ],
                        correctAnswer: 3,
                        explanation: "All of these data structures can efficiently implement a stack with constant-time operations. LinkedList has O(1) operations at the beginning, ArrayList has amortized O(1) operations at the end, and ArrayDeque is specifically designed for efficient stack and queue operations."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-11",
              day: 11,
              topics: [
                {
                  id: "monotonic-stack",
                  title: "Monotonic Stack",
                  description: "Stack with elements in increasing/decreasing order",
                  problems: [
                    {
                      id: "739",
                      name: "Daily Temperatures",
                      link: "https://leetcode.com/problems/daily-temperatures/",
                      difficulty: "Medium"
                    },
                    {
                      id: "901",
                      name: "Online Stock Span",
                      link: "https://leetcode.com/problems/online-stock-span/",
                      difficulty: "Medium"
                    },
                    {
                      id: "496",
                      name: "Next Greater Element I",
                      link: "https://leetcode.com/problems/next-greater-element-i/",
                      difficulty: "Easy"
                    },
                    {
                      id: "503",
                      name: "Next Greater Element II",
                      link: "https://leetcode.com/problems/next-greater-element-ii/",
                      difficulty: "Medium"
                    },
                    {
                      id: "84",
                      name: "Largest Rectangle in Histogram",
                      link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                      difficulty: "Hard"
                    },
                    {
                      id: "42",
                      name: "Trapping Rain Water",
                      link: "https://leetcode.com/problems/trapping-rain-water/",
                      difficulty: "Hard"
                    },
                    {
                      id: "1762",
                      name: "Buildings With an Ocean View",
                      link: "https://leetcode.com/problems/buildings-with-an-ocean-view/",
                      difficulty: "Medium"
                    },
                    {
                      id: "402",
                      name: "Remove K Digits",
                      link: "https://leetcode.com/problems/remove-k-digits/",
                      difficulty: "Medium"
                    },
                    {
                      id: "2454",
                      name: "Next Greater Element IV",
                      link: "https://leetcode.com/problems/next-greater-element-iv/",
                      difficulty: "Hard"
                    },
                    {
                      id: "2289",
                      name: "Steps to Make Array Non-decreasing",
                      link: "https://leetcode.com/problems/steps-to-make-array-non-decreasing/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "A monotonic stack is a specialized stack data structure that maintains elements in a strictly increasing or decreasing order. This powerful pattern is particularly useful in solving problems that involve finding the next greater/smaller element, calculating spans, or determining areas based on heights. Unlike regular stacks, a monotonic stack enforces an order property that makes it extremely efficient for a specific class of problems that would otherwise require more complex approaches.",
                    learningObjectives: [
                      "Understand the concept and properties of monotonic stacks",
                      "Learn how to implement and use monotonic increasing and decreasing stacks",
                      "Recognize problem patterns where monotonic stacks provide optimal solutions",
                      "Apply monotonic stack techniques to solve next greater/smaller element problems",
                      "Use monotonic stacks for calculating spans and ranges in arrays"
                    ],
                    sections: [
                      {
                        title: "Understanding Monotonic Stacks",
                        content: "A monotonic stack is a stack that maintains its elements in a strictly increasing or strictly decreasing order. When inserting a new element, we may need to pop elements that violate the monotonic property before adding the new element.\n\n**Types of Monotonic Stacks:**\n\n1. **Monotonic Increasing Stack**: Elements maintain a strictly increasing order from bottom to top. When a smaller element needs to be pushed, we first pop larger elements from the top.\n\n2. **Monotonic Decreasing Stack**: Elements maintain a strictly decreasing order from bottom to top. When a larger element needs to be pushed, we first pop smaller elements from the top.\n\n**Key Properties:**\n\n- When an element is popped, we've found a boundary where the monotonic property would be violated\n- The element at the top of the stack is always the most recently seen element that satisfies the monotonic property\n- For any element being popped, the new element being pushed becomes its \"next greater/smaller element\"\n\n**Common Applications:**\n\n- Finding the next greater/smaller element for each element in an array\n- Finding the previous greater/smaller element for each element\n- Calculating spans (number of consecutive elements with a property)\n- Solving problems involving histograms, buildings, or temperatures\n- Computing areas or volumes with constraints",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Basic implementation of a monotonic increasing stack\npublic void demonstrateMonotonicIncreasingStack(int[] nums) {\n    Stack<Integer> stack = new Stack<>();\n    \n    System.out.println(\"Processing array: \" + Arrays.toString(nums));\n    \n    for (int i = 0; i < nums.length; i++) {\n        // While stack is not empty and current element is less than or equal to the top element\n        // Pop elements to maintain monotonic increasing property\n        while (!stack.isEmpty() && nums[i] <= nums[stack.peek()]) {\n            int poppedIndex = stack.pop();\n            System.out.println(\"Popped element at index \" + poppedIndex + \n                               \" (value \" + nums[poppedIndex] + \") because \" + \n                               nums[i] + \" is smaller or equal\");\n        }\n        \n        // Push current index to stack\n        stack.push(i);\n        System.out.println(\"Pushed element at index \" + i + \" (value \" + nums[i] + \")\");\n        \n        // Print current stack state\n        System.out.print(\"Current stack (bottom to top): \");\n        for (int idx : stack) {\n            System.out.print(nums[idx] + \" \");\n        }\n        System.out.println();\n    }\n}\n\n// Basic implementation of a monotonic decreasing stack\npublic void demonstrateMonotonicDecreasingStack(int[] nums) {\n    Stack<Integer> stack = new Stack<>();\n    \n    System.out.println(\"Processing array: \" + Arrays.toString(nums));\n    \n    for (int i = 0; i < nums.length; i++) {\n        // While stack is not empty and current element is greater than or equal to the top element\n        // Pop elements to maintain monotonic decreasing property\n        while (!stack.isEmpty() && nums[i] >= nums[stack.peek()]) {\n            int poppedIndex = stack.pop();\n            System.out.println(\"Popped element at index \" + poppedIndex + \n                               \" (value \" + nums[poppedIndex] + \") because \" + \n                               nums[i] + \" is larger or equal\");\n        }\n        \n        // Push current index to stack\n        stack.push(i);\n        System.out.println(\"Pushed element at index \" + i + \" (value \" + nums[i] + \")\");\n        \n        // Print current stack state\n        System.out.print(\"Current stack (bottom to top): \");\n        for (int idx : stack) {\n            System.out.print(nums[idx] + \" \");\n        }\n        System.out.println();\n    }\n}",
                            explanation: "This example demonstrates the core operations of monotonic stacks. The first method implements a monotonic increasing stack, where we pop elements that are greater than or equal to the current element before pushing it. The second method implements a monotonic decreasing stack, where we pop elements that are less than or equal to the current element before pushing it. Both implementations store indices rather than values, which is a common pattern in monotonic stack problems as it allows us to access the original array values when needed."
                          }
                        ]
                      },
                      {
                        title: "Finding Next Greater/Smaller Elements",
                        content: "One of the most common applications of monotonic stacks is finding the next greater or smaller element for each element in an array. This pattern appears in many variations and forms the basis for solving more complex problems.\n\n**Next Greater Element:**\nFor each element in an array, find the first element to its right that is greater than itself.\n\n**Next Smaller Element:**\nFor each element in an array, find the first element to its right that is smaller than itself.\n\n**Previous Greater/Smaller Element:**\nSimilar to the above, but looking to the left instead of the right.\n\n**Circular Arrays:**\nIn some variations, we need to consider the array as circular, wrapping around from the end to the beginning.\n\n**Time Complexity:**\nThese problems can be solved in O(n) time using monotonic stacks, where n is the size of the array. This is because each element is pushed and popped at most once.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Finding next greater element for each element in an array\npublic int[] nextGreaterElement(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);  // Default if no greater element exists\n    \n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    \n    for (int i = 0; i < n; i++) {\n        // While stack is not empty and current element is greater than element at stack top\n        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n            int idx = stack.pop();\n            result[idx] = nums[i];  // Current element is the next greater element\n        }\n        \n        stack.push(i);  // Push current index to stack\n    }\n    \n    return result;\n}\n\n// Finding next smaller element for each element in an array\npublic int[] nextSmallerElement(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);  // Default if no smaller element exists\n    \n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    \n    for (int i = 0; i < n; i++) {\n        // While stack is not empty and current element is smaller than element at stack top\n        while (!stack.isEmpty() && nums[i] < nums[stack.peek()]) {\n            int idx = stack.pop();\n            result[idx] = nums[i];  // Current element is the next smaller element\n        }\n        \n        stack.push(i);  // Push current index to stack\n    }\n    \n    return result;\n}\n\n// Finding next greater element in a circular array\npublic int[] nextGreaterElementCircular(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);  // Default if no greater element exists\n    \n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    \n    // Process the array twice to handle circular property\n    for (int i = 0; i < n * 2; i++) {\n        int idx = i % n;  // Get actual index in the original array\n        \n        // While stack is not empty and current element is greater than element at stack top\n        while (!stack.isEmpty() && nums[idx] > nums[stack.peek()]) {\n            int prevIdx = stack.pop();\n            result[prevIdx] = nums[idx];  // Current element is the next greater element\n        }\n        \n        // Only push indices from the first pass\n        if (i < n) {\n            stack.push(idx);\n        }\n    }\n    \n    return result;\n}",
                            explanation: "These examples demonstrate common applications of monotonic stacks for finding the next greater or smaller elements. The first method finds the next greater element for each element in an array using a monotonic decreasing stack. The second method finds the next smaller element using a monotonic increasing stack. The third method handles a circular array by processing it twice, allowing elements from the beginning to be considered as potential next greater elements for elements near the end."
                          }
                        ]
                      },
                      {
                        title: "Calculating Spans and Ranges",
                        content: "Another important application of monotonic stacks is calculating spans or ranges - counting consecutive elements that satisfy certain conditions.\n\n**Stock Span Problem:**\nFor each day, find the number of consecutive days (including the current day) where the stock price is less than or equal to the current day's price.\n\n**Temperature Span:**\nFor each day, find how many days until a warmer temperature occurs.\n\n**Visible Buildings:**\nImagine buildings of different heights; a building is visible if all buildings to its left are shorter. Count visible buildings or find buildings with an ocean view.\n\n**Consecutive Range Calculation:**\nFind the distance to the first element that breaks a specific property (like being smaller or larger).\n\nThese problems involve finding boundaries where a property changes, which is exactly what monotonic stacks excel at tracking.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Stock Span Problem\npublic int[] calculateStockSpan(int[] prices) {\n    int n = prices.length;\n    int[] spans = new int[n];\n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    \n    for (int i = 0; i < n; i++) {\n        // Pop until we find a day with a higher price\n        while (!stack.isEmpty() && prices[i] >= prices[stack.peek()]) {\n            stack.pop();\n        }\n        \n        // Calculate span: current index minus the index of the previous highest price\n        // If stack is empty, then all previous prices are smaller\n        spans[i] = stack.isEmpty() ? (i + 1) : (i - stack.peek());\n        \n        // Push current day's index\n        stack.push(i);\n    }\n    \n    return spans;\n}\n\n// Daily Temperatures Problem (time until warmer temperature)\npublic int[] dailyTemperatures(int[] temperatures) {\n    int n = temperatures.length;\n    int[] result = new int[n];\n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    \n    for (int i = 0; i < n; i++) {\n        // While current temperature is higher than temperature at stack top\n        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n            int prevIdx = stack.pop();\n            result[prevIdx] = i - prevIdx;  // Number of days to wait\n        }\n        \n        stack.push(i);  // Push current day's index\n    }\n    \n    return result;  // Remaining positions will have default value 0\n}\n\n// Find buildings with ocean view\npublic int[] findBuildingsWithOceanView(int[] heights) {\n    int n = heights.length;\n    Stack<Integer> stack = new Stack<>();  // Stack to store indices of buildings with ocean view\n    \n    for (int i = 0; i < n; i++) {\n        // While the stack is not empty and the current building is taller or equal\n        // to the building at the top of the stack\n        while (!stack.isEmpty() && heights[i] >= heights[stack.peek()]) {\n            stack.pop();  // The building on top no longer has an ocean view\n        }\n        \n        stack.push(i);  // Current building potentially has an ocean view\n    }\n    \n    // Convert stack to array in ascending order\n    int[] result = new int[stack.size()];\n    for (int i = result.length - 1; i >= 0; i--) {\n        result[i] = stack.pop();\n    }\n    \n    return result;\n}",
                            explanation: "These examples demonstrate calculating spans and ranges using monotonic stacks. The stock span problem computes the number of consecutive days with prices less than or equal to the current day's price. The daily temperatures problem calculates how many days until a warmer temperature occurs. The buildings with ocean view problem finds buildings that can see the ocean (all buildings to their right are shorter). Each of these problems uses a monotonic stack to efficiently track where properties change, avoiding the need for nested loops."
                          }
                        ]
                      },
                      {
                        title: "Area and Volume Calculation",
                        content: "Monotonic stacks are remarkably effective in solving problems that involve calculating areas or volumes with constraints on heights or boundaries.\n\n**Largest Rectangle in Histogram:**\nGiven n non-negative bars representing a histogram, find the area of the largest rectangle that can be formed.\n\n**Maximal Rectangle:**\nGiven a binary matrix, find the area of the largest rectangle containing only 1's.\n\n**Trapping Rain Water:**\nGiven n non-negative integers representing an elevation map, compute how much water can be trapped after raining.\n\n**Container With Most Water:**\nFind two lines that, together with the x-axis, form a container that holds the most water.\n\nThese problems often require finding the nearest smaller/greater element on both sides of each element, which can be efficiently solved using monotonic stacks.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Largest Rectangle in Histogram\npublic int largestRectangleArea(int[] heights) {\n    int n = heights.length;\n    Stack<Integer> stack = new Stack<>();  // Stack to store indices\n    int maxArea = 0;\n    \n    for (int i = 0; i <= n; i++) {\n        // When we reach the end or when current height is less than height at stack top\n        // we need to calculate areas with heights from the stack\n        int currHeight = (i == n) ? 0 : heights[i];\n        \n        while (!stack.isEmpty() && currHeight < heights[stack.peek()]) {\n            int height = heights[stack.pop()];\n            int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n            maxArea = Math.max(maxArea, height * width);\n        }\n        \n        stack.push(i);\n    }\n    \n    return maxArea;\n}\n\n// Trapping Rain Water\npublic int trap(int[] height) {\n    int n = height.length;\n    if (n <= 2) return 0;  // Need at least 3 bars to trap water\n    \n    Stack<Integer> stack = new Stack<>();\n    int water = 0;\n    \n    for (int i = 0; i < n; i++) {\n        // When we find a bar that is higher than the bar at the top of the stack\n        while (!stack.isEmpty() && height[i] > height[stack.peek()]) {\n            int top = stack.pop();\n            \n            // If there is no bar to the left, we cannot trap water\n            if (stack.isEmpty()) {\n                break;\n            }\n            \n            // Calculate the distance and bounded height\n            int distance = i - stack.peek() - 1;\n            int boundedHeight = Math.min(height[i], height[stack.peek()]) - height[top];\n            \n            // Add the trapped water (area = width * height)\n            water += distance * boundedHeight;\n        }\n        \n        stack.push(i);\n    }\n    \n    return water;\n}",
                            explanation: "These examples demonstrate using monotonic stacks to solve area and volume calculation problems. The largest rectangle in histogram problem uses a monotonic increasing stack to find the left and right boundaries for each height, then calculates the maximum possible rectangle area. The trapping rain water problem uses a monotonic decreasing stack to identify \"valleys\" where water can be trapped between higher elevations. In both cases, the monotonic stack helps efficiently identify the relevant boundaries that constrain the areas or volumes we're calculating."
                          }
                        ]
                      },
                      {
                        title: "Advanced Monotonic Stack Techniques",
                        content: "Beyond the basic patterns, there are several advanced techniques that can be combined with monotonic stacks to solve more complex problems.\n\n**Using Two Monotonic Stacks:**\nSome problems require maintaining both a monotonic increasing and decreasing stack simultaneously.\n\n**Parallel Monotonic Stacks:**\nMaintaining multiple monotonic stacks that track different properties or operate on different parts of the data.\n\n**Monotonic Stack with Binary Search:**\nCombining the efficiency of monotonic stacks with binary search for specific lookup operations.\n\n**Delayed Processing:**\nInstead of immediately calculating results when popping from the stack, sometimes we delay the calculation until a certain condition is met.\n\n**Multi-Pass Approaches:**\nSome problems require multiple passes over the data with different monotonic stacks.\n\n**Dynamic Programming with Monotonic Stacks:**\nCombining dynamic programming with monotonic stacks to solve optimization problems with constraints.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Example: Remove K Digits (To create the smallest number by removing k digits)\npublic String removeKdigits(String num, int k) {\n    if (k >= num.length()) return \"0\";\n    \n    Stack<Character> stack = new Stack<>();\n    int digitsToRemove = k;\n    \n    // Use monotonic increasing stack to keep the smallest digits\n    for (char digit : num.toCharArray()) {\n        // Remove larger digits as long as we still need to remove digits\n        // and the stack is not empty and the top digit is larger than current\n        while (digitsToRemove > 0 && !stack.isEmpty() && stack.peek() > digit) {\n            stack.pop();\n            digitsToRemove--;\n        }\n        \n        stack.push(digit);\n    }\n    \n    // If we still need to remove digits, remove from the end\n    while (digitsToRemove > 0 && !stack.isEmpty()) {\n        stack.pop();\n        digitsToRemove--;\n    }\n    \n    // Build the result string\n    StringBuilder result = new StringBuilder();\n    while (!stack.isEmpty()) {\n        result.insert(0, stack.pop());\n    }\n    \n    // Remove leading zeros\n    while (result.length() > 1 && result.charAt(0) == '0') {\n        result.deleteCharAt(0);\n    }\n    \n    return result.length() == 0 ? \"0\" : result.toString();\n}\n\n// Example: Sum of Subarray Minimums (using two passes with monotonic stacks)\npublic int sumSubarrayMins(int[] arr) {\n    int MOD = 1_000_000_007;\n    int n = arr.length;\n    long result = 0;\n    \n    // Arrays to store the distance to previous and next smaller element\n    int[] left = new int[n];\n    int[] right = new int[n];\n    \n    // Initialize\n    Arrays.fill(left, -1);\n    Arrays.fill(right, n);\n    \n    // Find previous smaller element\n    Stack<Integer> stack = new Stack<>();\n    for (int i = 0; i < n; i++) {\n        while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {\n            stack.pop();\n        }\n        if (!stack.isEmpty()) {\n            left[i] = stack.peek();\n        }\n        stack.push(i);\n    }\n    \n    // Clear the stack for reuse\n    stack.clear();\n    \n    // Find next smaller element\n    for (int i = n - 1; i >= 0; i--) {\n        while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {\n            stack.pop();\n        }\n        if (!stack.isEmpty()) {\n            right[i] = stack.peek();\n        }\n        stack.push(i);\n    }\n    \n    // Calculate contribution of each element\n    for (int i = 0; i < n; i++) {\n        long leftDistance = i - left[i];\n        long rightDistance = right[i] - i;\n        \n        // Number of subarrays where arr[i] is the minimum\n        long count = (leftDistance * rightDistance) % MOD;\n        \n        // Add contribution to result\n        result = (result + (count * arr[i]) % MOD) % MOD;\n    }\n    \n    return (int) result;\n}",
                            explanation: "These examples demonstrate advanced monotonic stack techniques. The 'Remove K Digits' problem uses a monotonic increasing stack with a constraint on the number of removals to build the smallest possible number. The 'Sum of Subarray Minimums' problem uses two separate monotonic stack passes to find the range of influence (left and right boundaries) for each element, then calculates the total contribution of each element to the final sum. These problems showcase how monotonic stacks can be combined with other techniques to solve complex optimization problems efficiently."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw11-1",
                        question: "Implement a function to find the maximum span of temperatures. For each temperature, the span is defined as the maximum number of consecutive days (including the current day) where the temperature is less than or equal to the current temperature.",
                        codeExample: {
                          language: "java",
                          code: "public int[] maxTemperatureSpan(int[] temperatures) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int[] maxTemperatureSpan(int[] temperatures) {\n    int n = temperatures.length;\n    int[] spans = new int[n];\n    Stack<Integer> stack = new Stack<>(); // Stack to store indices\n    \n    for (int i = 0; i < n; i++) {\n        // Pop all indices where temperature is greater than current temperature\n        while (!stack.isEmpty() && temperatures[stack.peek()] > temperatures[i]) {\n            stack.pop();\n        }\n        \n        // Calculate span: current index minus the index of previous smaller/equal temperature\n        spans[i] = stack.isEmpty() ? (i + 1) : (i - stack.peek());\n        \n        // Push current index\n        stack.push(i);\n    }\n    \n    return spans;\n}\n```\n\nThis solution uses a monotonic non-decreasing stack to find the maximum span for each temperature. For each day, it pops elements from the stack until finding a day with temperature less than or equal to the current day. The span is then calculated as the difference between the current index and the index at the top of the stack (or the current index + 1, if the stack is empty). This approach ensures O(n) time complexity as each element is pushed and popped at most once."
                      },
                      {
                        id: "hw11-2",
                        question: "Implement a function that, given an array of integers representing the height of bars in a histogram, returns the area of the largest rectangle that can be formed using only adjacent bars.",
                        codeExample: {
                          language: "java",
                          code: "public int largestRectangleArea(int[] heights) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic int largestRectangleArea(int[] heights) {\n    int n = heights.length;\n    Stack<Integer> stack = new Stack<>(); // Stack to store indices\n    int maxArea = 0;\n    \n    for (int i = 0; i <= n; i++) {\n        // When we reach the end or when current height is less than height at stack top\n        int currHeight = (i == n) ? 0 : heights[i];\n        \n        while (!stack.isEmpty() && currHeight < heights[stack.peek()]) {\n            int height = heights[stack.pop()];\n            int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n            int area = height * width;\n            maxArea = Math.max(maxArea, area);\n        }\n        \n        stack.push(i);\n    }\n    \n    return maxArea;\n}\n```\n\nThis solution uses a monotonic increasing stack to keep track of indices of bars in ascending order of their heights. When we encounter a bar shorter than the bar at the top of the stack, we pop bars from the stack and calculate the area of the rectangle that can be formed using the popped bar's height. The width of this rectangle extends from the current index back to the previous bar in the stack (or all the way to the beginning if the stack is empty). By iterating one position beyond the end of the array (with a virtual height of 0), we ensure all remaining bars in the stack are processed."
                      },
                      {
                        id: "hw11-3",
                        question: "Design an algorithm to remove the minimum number of parentheses to make a string of parentheses valid. Return the valid string.",
                        codeExample: {
                          language: "java",
                          code: "public String minRemoveToMakeValid(String s) {\n    // Your code here\n}"
                        },
                        solution: "```java\npublic String minRemoveToMakeValid(String s) {\n    StringBuilder result = new StringBuilder(s);\n    Stack<Integer> stack = new Stack<>();\n    \n    // First pass: mark invalid parentheses\n    for (int i = 0; i < s.length(); i++) {\n        char c = s.charAt(i);\n        \n        if (c == '(') {\n            stack.push(i); // Push index of opening parenthesis\n        } else if (c == ')') {\n            if (!stack.isEmpty()) {\n                stack.pop(); // Matching pair found\n            }\n        }\n    }\n    \n    // Mark any remaining unmatched opening parentheses\n    while (!stack.isEmpty()) {\n        result.setCharAt(stack.pop(), '*');\n    }\n    \n    // Second pass: build result without marked characters\n    StringBuilder finalResult = new StringBuilder();\n    for (int i = 0; i < result.length(); i++) {\n        if (result.charAt(i) != '*') {\n            finalResult.append(result.charAt(i));\n        }\n    }\n    \n    return finalResult.toString();\n}\n```\n\nThis solution uses a stack to keep track of the indices of opening parentheses. When a closing parenthesis is encountered, if there's a matching opening parenthesis, we pop it from the stack. Otherwise, we mark the unmatched closing parenthesis for removal. After processing the string, any remaining indices in the stack represent unmatched opening parentheses that also need to be removed. We then build the final string by omitting all marked characters. This approach ensures that we remove the minimum number of parentheses to make the string valid."
                      }
                    ],
                    quiz: [
                      {
                        id: "q11-1",
                        question: "What is the key characteristic of a monotonic stack?",
                        options: [
                          "It maintains elements in sorted order",
                          "It only allows push operations, not pop",
                          "It maintains elements in strictly increasing or decreasing order",
                          "It has O(log n) time complexity for all operations"
                        ],
                        correctAnswer: 2,
                        explanation: "A monotonic stack maintains its elements in a strictly increasing (monotonic increasing stack) or strictly decreasing (monotonic decreasing stack) order. When a new element would violate this property, elements are popped from the stack until the property is restored before the new element is pushed."
                      },
                      {
                        id: "q11-2",
                        question: "Which of the following problems is BEST suited to be solved using a monotonic stack?",
                        options: [
                          "Finding the median of a sliding window",
                          "Finding the next greater element for each element in an array",
                          "Implementing a priority queue",
                          "Finding the shortest path in a graph"
                        ],
                        correctAnswer: 1,
                        explanation: "Finding the next greater element for each element in an array is a classic problem that is efficiently solved using a monotonic stack. The stack helps track potential 'next greater' candidates and processes elements in a way that achieves O(n) time complexity, whereas the other problems typically use different data structures and algorithms."
                      },
                      {
                        id: "q11-3",
                        question: "What is the time complexity of solving the 'Next Greater Element' problem using a monotonic stack?",
                        options: [
                          "O(n²)",
                          "O(n log n)",
                          "O(n)",
                          "O(log n)"
                        ],
                        correctAnswer: 2,
                        explanation: "The time complexity of solving the 'Next Greater Element' problem using a monotonic stack is O(n), where n is the number of elements in the array. This is because each element is pushed and popped at most once, leading to a total of O(n) operations."
                      },
                      {
                        id: "q11-4",
                        question: "In the context of monotonic stacks, what happens when an element that violates the monotonic property is encountered?",
                        options: [
                          "The new element is rejected and not added to the stack",
                          "The monotonic property is temporarily relaxed to accommodate the new element",
                          "Elements are popped from the stack until adding the new element would no longer violate the property",
                          "The entire stack is cleared and rebuilt from scratch"
                        ],
                        correctAnswer: 2,
                        explanation: "When an element that would violate the monotonic property is encountered, elements are popped from the stack until adding the new element would no longer violate the property. This is the key mechanism that makes monotonic stacks useful for finding next greater/smaller elements and similar problems."
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: "day-12",
              day: 12,
              topics: [
                {
                  id: "queue-fifo",
                  title: "Queue (FIFO)",
                  description: "First-in-first-out data structure",
                  problems: [
                    {
                      id: "621",
                      name: "Task Scheduler",
                      link: "https://leetcode.com/problems/task-scheduler/",
                      difficulty: "Medium"
                    },
                    {
                      id: "622",
                      name: "Design Circular Queue",
                      link: "https://leetcode.com/problems/design-circular-queue/",
                      difficulty: "Medium"
                    },
                    {
                      id: "346",
                      name: "Moving Average from Data Stream",
                      link: "https://leetcode.com/problems/moving-average-from-data-stream/",
                      difficulty: "Easy"
                    },
                    {
                      id: "933",
                      name: "Number of Recent Calls",
                      link: "https://leetcode.com/problems/number-of-recent-calls/",
                      difficulty: "Easy"
                    },
                    {
                      id: "3362",
                      name: "Queue Operations",
                      link: "https://leetcode.com/problems/implement-queue-using-stacks/",
                      difficulty: "Easy"
                    },
                    {
                      id: "950",
                      name: "Reveal Cards In Increasing Order",
                      link: "https://leetcode.com/problems/reveal-cards-in-increasing-order/",
                      difficulty: "Medium"
                    },
                    {
                      id: "649",
                      name: "Dota2 Senate",
                      link: "https://leetcode.com/problems/dota2-senate/",
                      difficulty: "Medium"
                    },
                    {
                      id: "353",
                      name: "Design Snake Game",
                      link: "https://leetcode.com/problems/design-snake-game/",
                      difficulty: "Medium"
                    },
                    {
                      id: "862",
                      name: "Shortest Subarray with Sum at Least K",
                      link: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
                      difficulty: "Hard"
                    },
                    {
                      id: "1499",
                      name: "Max Value of Equation",
                      link: "https://leetcode.com/problems/max-value-of-equation/",
                      difficulty: "Hard"
                    }
                  ],
                  content: {
                    introduction: "A queue is a fundamental data structure that follows the First-In-First-Out (FIFO) principle, meaning the first element added to the queue is the first one to be removed. Think of it like a line of people waiting at a checkout counter: the person who arrives first gets served first. Queues are used extensively in algorithms, operating systems, and real-time systems for tasks like managing processes, handling requests, and implementing breadth-first search.",
                    learningObjectives: [
                      "Understand the core concept of queue data structure and FIFO principle",
                      "Learn how to implement a queue using arrays and linked lists",
                      "Master fundamental queue operations: enqueue, dequeue, peek, and isEmpty",
                      "Explore variations like circular queues, double-ended queues (deques), and priority queues",
                      "Apply queue-based algorithms to solve common programming challenges"
                    ],
                    sections: [
                      {
                        title: "Queue Fundamentals",
                        content: "A queue is a collection that is based on the First-In-First-Out (FIFO) principle. This means that the first element added to the queue will be the first one to be removed.\n\n**Core Operations:**\n\n1. **enqueue(element)**: Adds an element to the back (rear) of the queue\n2. **dequeue()**: Removes and returns the element at the front of the queue\n3. **peek()/front()**: Returns the front element without removing it\n4. **isEmpty()**: Returns true if the queue contains no elements\n5. **size()**: Returns the number of elements in the queue\n\nAll these operations ideally run in O(1) time complexity, making queues very efficient for operations that need to preserve order of arrival.\n\n**Common Applications:**\n\n- Process scheduling in operating systems\n- Request handling in web servers\n- Breadth-first search in graphs and trees\n- Print job scheduling\n- Message queues in distributed systems\n- Handling of interrupt requests in real-time systems",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Array-based queue implementation (using circular array)\npublic class ArrayQueue<E> {\n    private static final int DEFAULT_CAPACITY = 10;\n    private Object[] elements;\n    private int front;\n    private int rear;\n    private int size;\n    \n    public ArrayQueue() {\n        elements = new Object[DEFAULT_CAPACITY];\n        front = 0;\n        rear = -1;\n        size = 0;\n    }\n    \n    // Add element to the rear of the queue\n    public void enqueue(E element) {\n        if (size == elements.length) {\n            resize();\n        }\n        \n        rear = (rear + 1) % elements.length;\n        elements[rear] = element;\n        size++;\n    }\n    \n    // Remove and return the front element\n    @SuppressWarnings(\"unchecked\")\n    public E dequeue() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        E element = (E) elements[front];\n        elements[front] = null; // Help garbage collection\n        front = (front + 1) % elements.length;\n        size--;\n        return element;\n    }\n    \n    // Return the front element without removing it\n    @SuppressWarnings(\"unchecked\")\n    public E peek() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        return (E) elements[front];\n    }\n    \n    // Check if queue is empty\n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    // Return number of elements in queue\n    public int size() {\n        return size;\n    }\n    \n    // Resize the array when it reaches capacity\n    private void resize() {\n        Object[] newElements = new Object[elements.length * 2];\n        \n        for (int i = 0; i < size; i++) {\n            newElements[i] = elements[(front + i) % elements.length];\n        }\n        \n        elements = newElements;\n        front = 0;\n        rear = size - 1;\n    }\n}",
                            explanation: "This implementation uses a circular array to efficiently implement a queue. The circular design avoids the need to shift elements when dequeuing, making both enqueue and dequeue operations O(1) time complexity. The array automatically resizes when it reaches capacity."
                          },
                          {
                            language: "java",
                            code: "// Linked list-based queue implementation\npublic class LinkedQueue<E> {\n    private static class Node<E> {\n        E data;\n        Node<E> next;\n        \n        Node(E data) {\n            this.data = data;\n        }\n    }\n    \n    private Node<E> front;\n    private Node<E> rear;\n    private int size;\n    \n    public LinkedQueue() {\n        front = null;\n        rear = null;\n        size = 0;\n    }\n    \n    // Add element to the rear of the queue\n    public void enqueue(E element) {\n        Node<E> newNode = new Node<>(element);\n        \n        if (isEmpty()) {\n            front = newNode;\n        } else {\n            rear.next = newNode;\n        }\n        \n        rear = newNode;\n        size++;\n    }\n    \n    // Remove and return the front element\n    public E dequeue() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        E element = front.data;\n        front = front.next;\n        \n        if (front == null) {\n            rear = null;  // Queue is now empty\n        }\n        \n        size--;\n        return element;\n    }\n    \n    // Return the front element without removing it\n    public E peek() {\n        if (isEmpty()) {\n            throw new NoSuchElementException();\n        }\n        \n        return front.data;\n    }\n    \n    // Check if queue is empty\n    public boolean isEmpty() {\n        return front == null;\n    }\n    \n    // Return number of elements in queue\n    public int size() {\n        return size;\n    }\n}",
                            explanation: "This implementation uses a linked list to implement a queue. It maintains references to both the front and rear nodes, allowing O(1) time complexity for both enqueue and dequeue operations. The linked list approach avoids the need for resizing and can grow dynamically."
                          }
                        ]
                      },
                      {
                        title: "Queue Variants",
                        content: "Several variations of queues exist for different use cases:\n\n**1. Circular Queue**\nA circular queue is a fixed-size queue that wraps around when it reaches the end of its underlying array. This efficient implementation avoids wasting space and maintains O(1) time complexity for all operations.\n\n**2. Double-Ended Queue (Deque)**\nA deque allows insertion and removal of elements from both ends, combining the features of stacks and queues. This versatility makes it useful for various algorithms.\n\n**3. Priority Queue**\nA priority queue serves elements based on their priority rather than their arrival order. Higher priority elements are dequeued before lower priority ones, regardless of when they were added.\n\n**4. Blocking Queue**\nA blocking queue is designed for concurrent applications. It blocks or waits when trying to dequeue from an empty queue or enqueue to a full queue.\n\n**5. Delay Queue**\nA delay queue only releases elements after a specified delay has expired, useful for scheduling tasks at future times.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Circular Queue Implementation\npublic class CircularQueue<E> {\n    private Object[] elements;\n    private int front;\n    private int rear;\n    private int capacity;\n    private int count;\n    \n    public CircularQueue(int capacity) {\n        this.capacity = capacity;\n        elements = new Object[capacity];\n        front = 0;\n        rear = -1;\n        count = 0;\n    }\n    \n    public boolean isEmpty() {\n        return count == 0;\n    }\n    \n    public boolean isFull() {\n        return count == capacity;\n    }\n    \n    public int size() {\n        return count;\n    }\n    \n    public void enqueue(E item) {\n        if (isFull()) {\n            throw new IllegalStateException(\"Queue is full\");\n        }\n        \n        rear = (rear + 1) % capacity;\n        elements[rear] = item;\n        count++;\n    }\n    \n    @SuppressWarnings(\"unchecked\")\n    public E dequeue() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"Queue is empty\");\n        }\n        \n        E item = (E) elements[front];\n        elements[front] = null;\n        front = (front + 1) % capacity;\n        count--;\n        \n        return item;\n    }\n    \n    @SuppressWarnings(\"unchecked\")\n    public E peek() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"Queue is empty\");\n        }\n        \n        return (E) elements[front];\n    }\n}\n\n// Using Java's built-in Deque\nimport java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class DequeExample {\n    public static void main(String[] args) {\n        Deque<Integer> deque = new ArrayDeque<>();\n        \n        // Using as a queue\n        deque.offer(1);      // Add to rear\n        deque.offer(2);\n        deque.offer(3);\n        System.out.println(deque.poll());  // Remove from front (1)\n        \n        // Using as a stack\n        deque.push(4);       // Add to front\n        System.out.println(deque.pop());   // Remove from front (4)\n        \n        // Using both ends\n        deque.offerFirst(5);  // Add to front\n        deque.offerLast(6);   // Add to rear\n        System.out.println(deque.peekFirst()); // Look at front (5)\n        System.out.println(deque.peekLast());  // Look at rear (6)\n    }\n}",
                            explanation: "The first example shows a circular queue implementation with a fixed capacity. It efficiently manages the circular buffer to ensure O(1) operations. The second example demonstrates using Java's built-in ArrayDeque as both a queue and a stack, showing the versatility of the deque data structure in handling operations from both ends."
                          }
                        ]
                      },
                      {
                        title: "Implementing a Queue using Stacks",
                        content: "One interesting exercise is to implement a queue using only stack operations. This reinforces understanding of both data structures and demonstrates how to adapt one ADT (Abstract Data Type) into another.\n\nThere are two main approaches to implement a queue using stacks:\n\n**1. Making enqueue operation costly:**\n- Use two stacks: `stack1` for enqueue and `stack2` for dequeue\n- For enqueue: pop all elements from `stack1` to `stack2`, push the new element to `stack1`, then pop all elements back from `stack2` to `stack1`\n- For dequeue: simply pop from `stack1`\n\n**2. Making dequeue operation costly:**\n- Use two stacks: `stack1` for enqueue and `stack2` for dequeue\n- For enqueue: simply push to `stack1`\n- For dequeue: if `stack2` is empty, pop all elements from `stack1` and push them to `stack2`, then pop from `stack2`\n\nThe second approach is usually more efficient in practice because it amortizes the cost of moving elements across multiple operations.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Implementing a queue using two stacks (making dequeue costly)\npublic class QueueUsingStacks<E> {\n    private Stack<E> stack1; // For enqueue\n    private Stack<E> stack2; // For dequeue\n    \n    public QueueUsingStacks() {\n        stack1 = new Stack<>();\n        stack2 = new Stack<>();\n    }\n    \n    // Add element to the queue (O(1))\n    public void enqueue(E item) {\n        stack1.push(item);\n    }\n    \n    // Remove element from the queue (amortized O(1))\n    public E dequeue() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"Queue is empty\");\n        }\n        \n        // If stack2 is empty, transfer all elements from stack1\n        if (stack2.isEmpty()) {\n            while (!stack1.isEmpty()) {\n                stack2.push(stack1.pop());\n            }\n        }\n        \n        // Pop from stack2\n        return stack2.pop();\n    }\n    \n    // Peek at the front element\n    public E peek() {\n        if (isEmpty()) {\n            throw new NoSuchElementException(\"Queue is empty\");\n        }\n        \n        // If stack2 is empty, transfer all elements from stack1\n        if (stack2.isEmpty()) {\n            while (!stack1.isEmpty()) {\n                stack2.push(stack1.pop());\n            }\n        }\n        \n        // Peek from stack2\n        return stack2.peek();\n    }\n    \n    // Check if queue is empty\n    public boolean isEmpty() {\n        return stack1.isEmpty() && stack2.isEmpty();\n    }\n    \n    // Get size of the queue\n    public int size() {\n        return stack1.size() + stack2.size();\n    }\n}",
                            explanation: "This implementation uses two stacks to simulate a queue. The enqueue operation is efficient (O(1)) as it simply pushes to stack1. The dequeue operation only needs to move elements from stack1 to stack2 when stack2 is empty, making it amortized O(1) time complexity. This approach is more efficient in practice because it spreads out the cost of moving elements across multiple operations."
                          }
                        ]
                      },
                      {
                        title: "Queue Applications",
                        content: "Queues are used in numerous applications across computer science and software engineering:\n\n**1. Breadth-First Search (BFS)**\nQueues are essential for BFS traversal of graphs and trees, exploring all neighbors at the present depth before moving to nodes at the next depth level.\n\n**2. Level Order Traversal**\nA specific application of BFS for trees, visiting nodes level by level from top to bottom.\n\n**3. CPU Scheduling**\nOperating systems use queues to manage processes waiting for CPU time, often implementing different scheduling algorithms.\n\n**4. Asynchronous Data Transfer**\nBuffers in data transfers between processes or over networks often use queues to handle different processing rates.\n\n**5. Handling of Requests**\nWeb servers use queues to manage incoming client requests, ensuring they're processed in order of arrival.\n\n**6. Simulation Systems**\nQueues model waiting lines in simulation systems, such as customer service scenarios or traffic flow.\n\n**7. Print Spooling**\nPrint jobs are queued and processed in order of submission.",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Breadth-First Search using a queue\npublic void bfs(Node startNode) {\n    if (startNode == null) return;\n    \n    Queue<Node> queue = new LinkedList<>();\n    Set<Node> visited = new HashSet<>();\n    \n    // Add the start node to the queue and mark it as visited\n    queue.offer(startNode);\n    visited.add(startNode);\n    \n    while (!queue.isEmpty()) {\n        // Remove the front node from the queue\n        Node currentNode = queue.poll();\n        \n        // Process the current node\n        System.out.println(\"Visiting: \" + currentNode.value);\n        \n        // Add all unvisited neighbors to the queue\n        for (Node neighbor : currentNode.getNeighbors()) {\n            if (!visited.contains(neighbor)) {\n                queue.offer(neighbor);\n                visited.add(neighbor);\n            }\n        }\n    }\n}\n\n// Level Order Traversal of a binary tree\npublic List<List<Integer>> levelOrderTraversal(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    \n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        List<Integer> currentLevel = new ArrayList<>();\n        \n        // Process all nodes at the current level\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            currentLevel.add(node.val);\n            \n            // Add children to the queue for the next level\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        \n        result.add(currentLevel);\n    }\n    \n    return result;\n}",
                            explanation: "These examples demonstrate two common applications of queues. The first example shows Breadth-First Search (BFS) traversal of a graph, which uses a queue to visit nodes level by level. The second example shows level order traversal of a binary tree, which is a specific application of BFS for trees. In both cases, the queue ensures that nodes are processed in the order they are discovered, which is essential for these algorithms."
                          }
                        ]
                      },
                      {
                        title: "Queue Performance and Optimization",
                        content: "When working with queues, consider these performance aspects and optimizations:\n\n**1. Implementation Choice**\n- Array-based queues provide better cache locality but may require resizing\n- Linked list-based queues have dynamic sizing but more memory overhead\n- Choose based on your usage pattern and constraints\n\n**2. Memory Efficiency**\n- Circular queues avoid memory waste in array implementations\n- Custom sizing can reduce overhead for known workloads\n\n**3. Thread Safety**\n- Use concurrent queue implementations for multi-threaded applications\n- Lock-free queues can provide better performance in high-contention scenarios\n\n**4. Batching Operations**\n- Processing items in batches can improve throughput in some applications\n- Consider bulk enqueue/dequeue operations when available\n\n**5. Monitoring and Tuning**\n- Track queue size and processing latency in performance-critical applications\n- Set appropriate capacity limits to prevent resource exhaustion\n- Consider backpressure mechanisms for producer-consumer scenarios\n\n**6. Specialized Queue Variants**\n- Priority queues for prioritized processing\n- Delay queues for scheduling\n- Bounded queues to limit resource usage",
                        codeExamples: [
                          {
                            language: "java",
                            code: "// Using a concurrent queue for thread safety\nimport java.util.concurrent.ConcurrentLinkedQueue;\n\npublic class ConcurrentQueueExample {\n    public static void main(String[] args) {\n        // Thread-safe queue implementation\n        ConcurrentLinkedQueue<String> concurrentQueue = new ConcurrentLinkedQueue<>();\n        \n        // Producer thread\n        Thread producer = new Thread(() -> {\n            for (int i = 0; i < 10; i++) {\n                String item = \"Item-\" + i;\n                concurrentQueue.offer(item);\n                System.out.println(\"Produced: \" + item);\n                try {\n                    Thread.sleep(100); // Simulate work\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                }\n            }\n        });\n        \n        // Consumer thread\n        Thread consumer = new Thread(() -> {\n            while (true) {\n                String item = concurrentQueue.poll();\n                if (item != null) {\n                    System.out.println(\"Consumed: \" + item);\n                }\n                try {\n                    Thread.sleep(200); // Simulate work (slower than producer)\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                    break;\n                }\n            }\n        });\n        \n        producer.start();\n        consumer.start();\n        \n        try {\n            producer.join();\n            Thread.sleep(2000); // Give consumer time to process\n            consumer.interrupt(); // Stop consumer\n            consumer.join();\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n        }\n    }\n}\n\n// Using a bounded blocking queue with capacity control\nimport java.util.concurrent.ArrayBlockingQueue;\nimport java.util.concurrent.BlockingQueue;\nimport java.util.concurrent.TimeUnit;\n\npublic class BoundedBlockingQueueExample {\n    public static void main(String[] args) {\n        // Bounded blocking queue with capacity of 5\n        BlockingQueue<String> boundedQueue = new ArrayBlockingQueue<>(5);\n        \n        // Fast producer thread that will hit capacity limit\n        Thread producer = new Thread(() -> {\n            for (int i = 0; i < 20; i++) {\n                try {\n                    String item = \"Item-\" + i;\n                    System.out.println(\"Attempting to produce: \" + item);\n                    \n                    // Will block if queue is full (backpressure)\n                    boundedQueue.put(item);\n                    \n                    System.out.println(\"Produced: \" + item + \", Queue size: \" + boundedQueue.size());\n                    Thread.sleep(100); // Simulate work\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                    break;\n                }\n            }\n        });\n        \n        // Slow consumer thread\n        Thread consumer = new Thread(() -> {\n            while (true) {\n                try {\n                    // Timeout to check for interruption\n                    String item = boundedQueue.poll(1, TimeUnit.SECONDS);\n                    if (item != null) {\n                        System.out.println(\"Consumed: \" + item + \", Queue size: \" + boundedQueue.size());\n                    }\n                    Thread.sleep(500); // Simulate work (slower than producer)\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                    break;\n                }\n            }\n        });\n        \n        producer.start();\n        consumer.start();\n        \n        try {\n            producer.join();\n            Thread.sleep(5000); // Give consumer time to process\n            consumer.interrupt(); // Stop consumer\n            consumer.join();\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n        }\n    }\n}",
                            explanation: "These examples demonstrate performance considerations for queues in concurrent environments. The first example uses a ConcurrentLinkedQueue for thread-safe operations without blocking. The second example uses an ArrayBlockingQueue with a fixed capacity, which implements backpressure by blocking the producer when the queue is full. This prevents resource exhaustion and helps balance producer and consumer speeds. Both examples show how different queue implementations can be chosen based on specific requirements."
                          }
                        ]
                      }
                    ],
                    homework: [
                      {
                        id: "hw12-1",
                        question: "Implement a circular queue with a fixed size using an array. The implementation should include enqueue, dequeue, front, rear, and isFull operations.",
                        codeExample: {
                          language: "java",
                          code: "class MyCircularQueue {\n    // Your code here\n    \n    public MyCircularQueue(int k) {\n        \n    }\n    \n    public boolean enQueue(int value) {\n        \n    }\n    \n    public boolean deQueue() {\n        \n    }\n    \n    public int Front() {\n        \n    }\n    \n    public int Rear() {\n        \n    }\n    \n    public boolean isEmpty() {\n        \n    }\n    \n    public boolean isFull() {\n        \n    }\n}"
                        },
                        solution: "```java\nclass MyCircularQueue {\n    private int[] array;\n    private int front;\n    private int rear;\n    private int size;\n    private int capacity;\n    \n    public MyCircularQueue(int k) {\n        this.capacity = k;\n        this.array = new int[k];\n        this.front = 0;\n        this.rear = -1;\n        this.size = 0;\n    }\n    \n    public boolean enQueue(int value) {\n        if (isFull()) {\n            return false;\n        }\n        \n        rear = (rear + 1) % capacity;\n        array[rear] = value;\n        size++;\n        return true;\n    }\n    \n    public boolean deQueue() {\n        if (isEmpty()) {\n            return false;\n        }\n        \n        front = (front + 1) % capacity;\n        size--;\n        return true;\n    }\n    \n    public int Front() {\n        if (isEmpty()) {\n            return -1;\n        }\n        \n        return array[front];\n    }\n    \n    public int Rear() {\n        if (isEmpty()) {\n            return -1;\n        }\n        \n        return array[rear];\n    }\n    \n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    public boolean isFull() {\n        return size == capacity;\n    }\n}\n```\n\nThis solution implements a circular queue using an array with a fixed capacity. It efficiently manages the circular nature by using modulo arithmetic for the front and rear indices. The size variable helps track the current number of elements, making isEmpty and isFull operations straightforward. The enQueue and deQueue operations properly update the indices and handle the circular wraparound."
                      },
                      {
                        id: "hw12-2",
                        question: "Implement a queue using two stacks. The implemented queue should support all standard queue operations (enqueue, dequeue, peek, and empty).",
                        codeExample: {
                          language: "java",
                          code: "class MyQueue {\n    // Your code here\n    \n    public MyQueue() {\n        \n    }\n    \n    public void push(int x) {\n        \n    }\n    \n    public int pop() {\n        \n    }\n    \n    public int peek() {\n        \n    }\n    \n    public boolean empty() {\n        \n    }\n}"
                        },
                        solution: "```java\nclass MyQueue {\n    private Stack<Integer> stack1; // for push operation\n    private Stack<Integer> stack2; // for pop and peek operations\n    \n    public MyQueue() {\n        stack1 = new Stack<>();\n        stack2 = new Stack<>();\n    }\n    \n    public void push(int x) {\n        stack1.push(x);\n    }\n    \n    public int pop() {\n        if (stack2.isEmpty()) {\n            transferElements();\n        }\n        \n        return stack2.pop();\n    }\n    \n    public int peek() {\n        if (stack2.isEmpty()) {\n            transferElements();\n        }\n        \n        return stack2.peek();\n    }\n    \n    public boolean empty() {\n        return stack1.isEmpty() && stack2.isEmpty();\n    }\n    \n    // Helper method to transfer elements from stack1 to stack2\n    private void transferElements() {\n        while (!stack1.isEmpty()) {\n            stack2.push(stack1.pop());\n        }\n    }\n}\n```\n\nThis solution implements a queue using two stacks. Stack1 is used for the push (enqueue) operation, while stack2 is used for pop (dequeue) and peek operations. When stack2 is empty and a pop or peek operation is requested, all elements from stack1 are transferred to stack2, reversing their order. This amortized approach ensures that each element is moved at most twice (once into stack1, once into stack2), resulting in an amortized O(1) time complexity for each operation."
                      },
                      {
                        id: "hw12-3",
                        question: "Implement a moving average data structure that supports calculating the average of the last k elements.",
                        codeExample: {
                          language: "java",
                          code: "class MovingAverage {\n    // Your code here\n    \n    public MovingAverage(int size) {\n        \n    }\n    \n    public double next(int val) {\n        \n    }\n}"
                        },
                        solution: "```java\nclass MovingAverage {\n    private Queue<Integer> queue;\n    private int maxSize;\n    private double sum;\n    \n    public MovingAverage(int size) {\n        this.queue = new LinkedList<>();\n        this.maxSize = size;\n        this.sum = 0.0;\n    }\n    \n    public double next(int val) {\n        // Add the new value\n        queue.offer(val);\n        sum += val;\n        \n        // Remove the oldest value if the queue exceeds maxSize\n        if (queue.size() > maxSize) {\n            sum -= queue.poll();\n        }\n        \n        // Calculate and return the average\n        return sum / queue.size();\n    }\n}\n```\n\nThis solution implements a moving average data structure using a queue to maintain the last k elements. When a new value is added, it's enqueued and added to the running sum. If the queue exceeds the maximum size, the oldest value is dequeued and subtracted from the sum. This approach maintains O(1) time complexity for the next operation by keeping a running sum instead of recalculating it each time."
                      }
                    ],
                    quiz: [
                      {
                        id: "q12-1",
                        question: "What principle does a queue data structure follow?",
                        options: [
                          "Last-In-First-Out (LIFO)",
                          "First-In-First-Out (FIFO)",
                          "Highest-Priority-First",
                          "Random Access"
                        ],
                        correctAnswer: 1,
                        explanation: "A queue follows the First-In-First-Out (FIFO) principle, meaning the first element added to the queue is the first one to be removed. This is similar to a line of people waiting: the person who arrives first gets served first."
                      },
                      {
                        id: "q12-2",
                        question: "In a circular queue implementation using an array, what is the formula to enqueue an element at the rear?",
                        options: [
                          "rear = rear + 1",
                          "rear = (rear + 1) % capacity",
                          "rear = (rear - 1) % capacity",
                          "rear = rear % capacity + 1"
                        ],
                        correctAnswer: 1,
                        explanation: "In a circular queue, the formula to enqueue an element at the rear is rear = (rear + 1) % capacity. This formula ensures that when the rear index reaches the end of the array, it wraps around to the beginning, implementing the circular behavior efficiently."
                      },
                      {
                        id: "q12-3",
                        question: "Which of the following algorithms typically uses a queue as its underlying data structure?",
                        options: [
                          "Depth-First Search (DFS)",
                          "Binary Search",
                          "Breadth-First Search (BFS)",
                          "Quick Sort"
                        ],
                        correctAnswer: 2,
                        explanation: "Breadth-First Search (BFS) typically uses a queue as its underlying data structure. BFS explores all neighbors at the current depth level before moving to nodes at the next depth level, which aligns perfectly with the FIFO nature of queues."
                      },
                      {
                        id: "q12-4",
                        question: "What is the space complexity of implementing a queue using two stacks?",
                        options: [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        correctAnswer: 2,
                        explanation: "The space complexity of implementing a queue using two stacks is O(n), where n is the number of elements in the queue. This is because each element needs to be stored in one of the two stacks, requiring space proportional to the number of elements."
                      }
                    ]
                  }
                }
              ]
            },
          ]
        }
      ]
    }
  ]
};