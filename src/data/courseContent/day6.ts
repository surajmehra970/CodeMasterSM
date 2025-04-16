import { Content } from '@/types/course';

const prefixSumContent: Content = {
  introduction: "Prefix Sum is a simple yet powerful technique used to efficiently perform range sum queries on arrays. The idea is to precompute cumulative sums from the start of the array, which allows for O(1) range sum queries. This technique is widely used in competitive programming and is a building block for more complex algorithms.",
  
  learningObjectives: [
    "Understand the Prefix Sum technique and its applications",
    "Learn how to implement prefix sums for 1D and 2D arrays",
    "Solve range sum query problems using prefix sums",
    "Recognize scenarios where prefix sums can optimize solutions"
  ],
  
  sections: [
    {
      title: "Introduction to Prefix Sums",
      content: "A prefix sum (also called a cumulative sum or scan) of an array is a new array where each element is the sum of all elements up to its position in the original array. For example, if the original array is [1, 2, 3, 4, 5], the prefix sum array would be [1, 3, 6, 10, 15]. This allows us to calculate the sum of any subarray in constant time.",
      codeExamples: [
        {
          language: "java",
          code: `// Computing prefix sum array
int[] computePrefixSum(int[] arr) {
    int n = arr.length;
    int[] prefixSum = new int[n];
    
    prefixSum[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }
    
    return prefixSum;
}

// Using prefix sum to compute sum of subarray arr[l...r]
int rangeSum(int[] prefixSum, int l, int r) {
    if (l == 0) {
        return prefixSum[r];
    } else {
        return prefixSum[r] - prefixSum[l - 1];
    }
}`,
          explanation: "The example shows how to compute a prefix sum array and use it to calculate the sum of any subarray in O(1) time."
        }
      ]
    },
    {
      title: "Applications of Prefix Sums",
      content: "Prefix sums have numerous applications in algorithmic problem-solving. They can be used to solve range queries, find subarrays with a given sum, calculate moving averages, and more. Let's explore some common applications.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding a subarray with a given sum
boolean hasSubarrayWithSum(int[] arr, int targetSum) {
    int n = arr.length;
    int[] prefixSum = new int[n];
    
    // Compute prefix sum
    prefixSum[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }
    
    // Use a HashSet to check for subarray with given sum
    Set<Integer> set = new HashSet<>();
    for (int i = 0; i < n; i++) {
        // If prefix sum equals targetSum, subarray starts from index 0
        if (prefixSum[i] == targetSum) {
            return true;
        }
        
        // If we've seen (prefixSum[i] - targetSum) before,
        // then there's a subarray with sum = targetSum
        if (set.contains(prefixSum[i] - targetSum)) {
            return true;
        }
        
        set.add(prefixSum[i]);
    }
    
    return false;
}

// Finding count of subarrays with sum = k
int countSubarraysWithSum(int[] nums, int k) {
    int count = 0;
    int sum = 0;
    Map<Integer, Integer> map = new HashMap<>();
    
    // Initialize with sum 0 seen once (empty subarray)
    map.put(0, 1);
    
    for (int num : nums) {
        sum += num;
        
        // If (sum - k) has occurred before, add its frequency to result
        if (map.containsKey(sum - k)) {
            count += map.get(sum - k);
        }
        
        // Update frequency of current sum
        map.put(sum, map.getOrDefault(sum, 0) + 1);
    }
    
    return count;
}`,
          explanation: "These examples show how to use prefix sums to find subarrays with a specific sum and count subarrays with a given sum."
        }
      ]
    },
    {
      title: "2D Prefix Sums",
      content: "The prefix sum technique can be extended to 2D arrays (matrices) to perform sum queries over rectangular regions in constant time. This is especially useful for image processing and grid-based problems.",
      codeExamples: [
        {
          language: "java",
          code: `// Computing 2D prefix sum
int[][] compute2DPrefixSum(int[][] matrix) {
    if (matrix.length == 0 || matrix[0].length == 0) {
        return new int[0][0];
    }
    
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] prefixSum = new int[rows + 1][cols + 1];
    
    // Fill the prefix sum matrix
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= cols; j++) {
            prefixSum[i][j] = matrix[i - 1][j - 1] 
                            + prefixSum[i - 1][j] 
                            + prefixSum[i][j - 1] 
                            - prefixSum[i - 1][j - 1];
        }
    }
    
    return prefixSum;
}

// Query sum of rectangle from (row1, col1) to (row2, col2)
int sumRegion(int[][] prefixSum, int row1, int col1, int row2, int col2) {
    // Convert to 1-indexed for prefixSum
    row1++; col1++; row2++; col2++;
    
    return prefixSum[row2][col2] 
         - prefixSum[row1 - 1][col2] 
         - prefixSum[row2][col1 - 1] 
         + prefixSum[row1 - 1][col1 - 1];
}`,
          explanation: "This example demonstrates how to compute a 2D prefix sum matrix and use it to calculate the sum of any rectangular region in constant time."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "prefix-hw-1",
      question: "Given an array, find the number of subarrays with an even sum.",
      solution: "```java\nint countSubarraysWithEvenSum(int[] nums) {\n    int count = 0;\n    int sum = 0;\n    \n    // Initialize counts for even/odd sums\n    // Start with evenCount = 1 for empty subarray (sum 0 is even)\n    int evenCount = 1, oddCount = 0;\n    \n    for (int num : nums) {\n        sum += num;\n        \n        if (sum % 2 == 0) { // Current sum is even\n            count += evenCount;\n            evenCount++;\n        } else { // Current sum is odd\n            count += oddCount;\n            oddCount++;\n        }\n    }\n    \n    return count;\n}\n```"
    },
    {
      id: "prefix-hw-2",
      question: "Given a binary array, find the maximum length of a subarray with equal number of 0s and 1s.",
      solution: "```java\nint findMaxLength(int[] nums) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, -1); // Initialize with sum 0 at index -1\n    \n    int maxLen = 0;\n    int count = 0; // Treat 0 as -1 and 1 as 1 for counting\n    \n    for (int i = 0; i < nums.length; i++) {\n        count += (nums[i] == 0) ? -1 : 1;\n        \n        if (map.containsKey(count)) {\n            maxLen = Math.max(maxLen, i - map.get(count));\n        } else {\n            map.put(count, i);\n        }\n    }\n    \n    return maxLen;\n}\n```"
    }
  ],
  
  quiz: [
    {
      id: "prefix-quiz-1",
      question: "What is the time complexity of computing a prefix sum array for an array of size n?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Computing a prefix sum requires a single pass through the array, resulting in O(n) time complexity."
    },
    {
      id: "prefix-quiz-2",
      question: "After computing a prefix sum array, what is the time complexity of calculating the sum of any subarray?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "With a prefix sum array, calculating the sum of any subarray can be done in O(1) time using the formula: sum(l, r) = prefixSum[r] - prefixSum[l - 1]."
    },
    {
      id: "prefix-quiz-3",
      question: "Which of the following problems CANNOT be solved efficiently using prefix sums?",
      options: ["Finding a subarray with a given sum", "Finding the sum of all subarrays", "Finding the median of each subarray", "Counting subarrays with a sum divisible by k"],
      correctAnswer: 2,
      explanation: "Finding the median of each subarray cannot be efficiently solved with prefix sums because medians don't follow the cumulative property that sums have."
    }
  ],
  
  // Added practice section for Prefix Sum
  practice: {
    introduction: "Practice is essential to master the prefix sum technique. Complete the following LeetCode problems to reinforce your understanding of this efficient approach for range queries and subarrays.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Range Sum Query - Immutable",
          link: "https://leetcode.com/problems/range-sum-query-immutable/",
          description: "Given an integer array, find the sum of elements between indices i and j using prefix sum."
        },
        {
          id: "e2",
          title: "Find Pivot Index",
          link: "https://leetcode.com/problems/find-pivot-index/",
          description: "Find the index where the sum of numbers to the left equals the sum of numbers to the right using prefix sum."
        },
        {
          id: "e3",
          title: "Running Sum of 1d Array",
          link: "https://leetcode.com/problems/running-sum-of-1d-array/",
          description: "Return the running sum of an array, which is the simplest form of a prefix sum."
        },
        {
          id: "e4",
          title: "Minimum Value to Get Positive Step by Step Sum",
          link: "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/",
          description: "Find the minimum starting value needed to keep the step-by-step sum always greater than or equal to 1."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Subarray Sum Equals K",
          link: "https://leetcode.com/problems/subarray-sum-equals-k/",
          description: "Find the number of subarrays with sum equal to k using prefix sum and hash map."
        },
        {
          id: "m2",
          title: "Continuous Subarray Sum",
          link: "https://leetcode.com/problems/continuous-subarray-sum/",
          description: "Determine if there exists a continuous subarray of size at least 2 with a sum divisible by k."
        },
        {
          id: "m3",
          title: "Product of Array Except Self",
          link: "https://leetcode.com/problems/product-of-array-except-self/",
          description: "Calculate the product of all elements except self using a variant of prefix sum (prefix product)."
        },
        {
          id: "m4",
          title: "Range Sum Query 2D - Immutable",
          link: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
          description: "Calculate the sum of elements inside a 2D matrix region using 2D prefix sum."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Maximum Sum of 3 Non-Overlapping Subarrays",
          link: "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/",
          description: "Find three non-overlapping subarrays with maximum sum using prefix sum to efficiently calculate subarray sums."
        },
        {
          id: "h2",
          title: "Count Subarrays With Fixed Bounds",
          link: "https://leetcode.com/problems/count-subarrays-with-fixed-bounds/",
          description: "Count the number of subarrays where the maximum and minimum values are within given bounds."
        }
      ]
    }
  }
};

export default prefixSumContent; 