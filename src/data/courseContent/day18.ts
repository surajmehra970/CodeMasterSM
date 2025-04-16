import { Content } from '@/types/course';

const linearSortingContent: Content = {
  introduction: "Linear sorting algorithms achieve O(n) time complexity by not relying on comparisons between elements. Instead, they use the actual values of the elements to determine their position. These algorithms include Counting Sort, Radix Sort, and Bucket Sort, which can outperform comparison-based sorts like Quick Sort and Merge Sort when applicable.",
  
  learningObjectives: [
    "Understand the principles of non-comparison sorting algorithms",
    "Implement Counting Sort, Radix Sort, and Bucket Sort",
    "Analyze the time and space complexity of linear sorting algorithms",
    "Identify scenarios where linear sorting algorithms are most effective"
  ],
  
  sections: [
    {
      title: "Counting Sort",
      content: "Counting Sort works by counting the occurrences of each element, then reconstructing the sorted array from these counts. It's efficient when the range of input values is not significantly larger than the number of elements.",
      codeExamples: [
        {
          language: "java",
          code: `public void countingSort(int[] arr) {
    // Find the maximum value in the array
    int max = Arrays.stream(arr).max().getAsInt();
    
    // Create a count array of size max+1
    int[] count = new int[max + 1];
    
    // Count occurrences of each element
    for (int num : arr) {
        count[num]++;
    }
    
    // Reconstruct the sorted array
    int index = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[index++] = i;
            count[i]--;
        }
    }
}`,
          explanation: "This implementation counts each value's frequency, then rebuilds the array in sorted order. Time complexity is O(n+k) where k is the range of input values."
        }
      ]
    },
    {
      title: "Radix Sort",
      content: "Radix Sort sorts elements digit by digit, starting from the least significant digit (LSD) or most significant digit (MSD). It uses a stable sort (often Counting Sort) for each digit position.",
      codeExamples: [
        {
          language: "java",
          code: `public void radixSort(int[] arr) {
    // Find the maximum number to know the number of digits
    int max = Arrays.stream(arr).max().getAsInt();
    
    // Do counting sort for every digit
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}

private void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10]; // 0-9 digits
    
    // Count occurrences of each digit
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }
    
    // Change count[i] to contain position of digit in output
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    // Copy output array to arr
    System.arraycopy(output, 0, arr, 0, n);
}`,
          explanation: "Radix Sort processes digits from least to most significant. Time complexity is O(d*(n+b)) where d is the number of digits and b is the base (10 for decimal)."
        }
      ]
    },
    {
      title: "Bucket Sort",
      content: "Bucket Sort distributes elements into a fixed number of buckets, sorts each bucket individually, then concatenates the results. It works well when input is uniformly distributed across a range.",
      codeExamples: [
        {
          language: "java",
          code: `public void bucketSort(float[] arr) {
    int n = arr.length;
    
    // Create empty buckets
    @SuppressWarnings("unchecked")
    List<Float>[] buckets = new ArrayList[n];
    for (int i = 0; i < n; i++) {
        buckets[i] = new ArrayList<>();
    }
    
    // Add elements to their respective buckets
    for (float num : arr) {
        int bucketIndex = (int) (num * n);
        buckets[bucketIndex].add(num);
    }
    
    // Sort individual buckets and concatenate
    int index = 0;
    for (List<Float> bucket : buckets) {
        Collections.sort(bucket); // Each bucket is sorted using a comparison sort
        for (float num : bucket) {
            arr[index++] = num;
        }
    }
}`,
          explanation: "Bucket Sort divides the range into equal-sized buckets, distributes elements, sorts each bucket, then combines the results. Average case complexity is O(n+k) where k is the number of buckets."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "ls-hw-1",
      question: "Implement a variation of Counting Sort that handles negative numbers. Test it on an array containing both positive and negative integers.",
      solution: "```java\npublic void countingSortWithNegatives(int[] arr) {\n    // Find min and max values\n    int min = Arrays.stream(arr).min().getAsInt();\n    int max = Arrays.stream(arr).max().getAsInt();\n    \n    // Create count array to cover the range\n    int range = max - min + 1;\n    int[] count = new int[range];\n    \n    // Count occurrences, shifting by min to handle negatives\n    for (int num : arr) {\n        count[num - min]++;\n    }\n    \n    // Reconstruct the sorted array\n    int index = 0;\n    for (int i = 0; i < range; i++) {\n        int value = i + min; // Convert back to original value\n        while (count[i] > 0) {\n            arr[index++] = value;\n            count[i]--;\n        }\n    }\n}\n```\nThis implementation handles negative numbers by finding the minimum value and using it as an offset for the counting array."
    },
    {
      id: "ls-hw-2",
      question: "Compare the performance of Radix Sort and Quick Sort for sorting integers with varying number of digits. Analyze the results and identify conditions where each algorithm performs better.",
      solution: "```java\npublic class SortingComparison {\n    // Test both algorithms with varying inputs\n    public void compare(int size, int maxDigits) {\n        int[] arr1 = generateArray(size, maxDigits);\n        int[] arr2 = arr1.clone();\n        \n        // Time Radix Sort\n        long start = System.nanoTime();\n        radixSort(arr1);\n        long radixTime = System.nanoTime() - start;\n        \n        // Time Quick Sort\n        start = System.nanoTime();\n        quickSort(arr2, 0, arr2.length - 1);\n        long quickTime = System.nanoTime() - start;\n        \n        System.out.printf(\"Size: %d, Max Digits: %d\\n\", size, maxDigits);\n        System.out.printf(\"Radix Sort: %.2f ms\\n\", radixTime / 1_000_000.0);\n        System.out.printf(\"Quick Sort: %.2f ms\\n\", quickTime / 1_000_000.0);\n    }\n}\n```\nRadix Sort tends to outperform Quick Sort when the number of digits is small relative to the array size. Quick Sort performs better when the range of values is large or the distribution has many digits."
    }
  ],
  
  quiz: [
    {
      id: "ls-quiz-1",
      question: "What is the time complexity of Counting Sort?",
      options: ["O(n log n)", "O(n²)", "O(n + k)", "O(n × k)"],
      correctAnswer: 2,
      explanation: "The time complexity of Counting Sort is O(n + k), where n is the number of elements and k is the range of input values (max - min + 1)."
    },
    {
      id: "ls-quiz-2",
      question: "Which of the following is a limitation of Counting Sort?",
      options: ["It can only sort positive integers", "It requires a stable sort as a subroutine", "It performs poorly when the range of values is much larger than the number of elements", "It needs exactly n buckets to work properly"],
      correctAnswer: 2,
      explanation: "Counting Sort's performance degrades when the range of values (k) is much larger than the number of elements (n), as the time complexity becomes dominated by k."
    },
    {
      id: "ls-quiz-3",
      question: "Which sorting algorithm would be most efficient for sorting a large array of integers between 1 and 100?",
      options: ["Quick Sort", "Merge Sort", "Counting Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Counting Sort would be most efficient for this scenario because the range of values (100) is small and fixed, allowing for O(n) time complexity."
    },
    {
      id: "ls-quiz-4",
      question: "What property makes Radix Sort suitable for sorting strings?",
      options: ["Strings can be compared lexicographically", "Strings have fixed maximum length", "Radix Sort processes elements character by character", "Strings are stored as ASCII values"],
      correctAnswer: 2,
      explanation: "Radix Sort processes elements digit by digit (or character by character for strings), making it naturally suitable for sorting strings by comparing characters at each position."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to reinforce your understanding of linear sorting algorithms and their applications.",
    questions: {
      easy: [
        {
          id: "sort-array-by-parity",
          title: "Sort Array By Parity",
          link: "https://leetcode.com/problems/sort-array-by-parity/",
          description: "Rearrange elements so even integers come first, which can be achieved using counting sort principles."
        },
        {
          id: "height-checker",
          title: "Height Checker",
          link: "https://leetcode.com/problems/height-checker/",
          description: "Count mismatches between original and sorted array, effectively using counting sort."
        },
        {
          id: "relative-sort-array",
          title: "Relative Sort Array",
          link: "https://leetcode.com/problems/relative-sort-array/",
          description: "Sort one array relative to another, which can use counting sort for efficient implementation."
        },
        {
          id: "sort-array-by-increasing-frequency",
          title: "Sort Array By Increasing Frequency",
          link: "https://leetcode.com/problems/sort-array-by-increasing-frequency/",
          description: "Sort elements by frequency, which can be solved using counting techniques."
        }
      ],
      medium: [
        {
          id: "maximum-gap",
          title: "Maximum Gap",
          link: "https://leetcode.com/problems/maximum-gap/",
          description: "Find maximum gap between successive elements when sorted, efficiently solvable with bucket sort."
        },
        {
          id: "top-k-frequent-elements",
          title: "Top K Frequent Elements",
          link: "https://leetcode.com/problems/top-k-frequent-elements/",
          description: "Find the k most frequent elements, which can be solved using counting and bucket sort."
        },
        {
          id: "sort-characters-by-frequency",
          title: "Sort Characters By Frequency",
          link: "https://leetcode.com/problems/sort-characters-by-frequency/",
          description: "Sort characters by decreasing frequency, efficiently implemented using counting techniques."
        }
      ],
      hard: [
        {
          id: "first-missing-positive",
          title: "First Missing Positive",
          link: "https://leetcode.com/problems/first-missing-positive/",
          description: "Find the smallest missing positive integer, which can be solved using principles from counting sort."
        },
        {
          id: "max-value-of-equation",
          title: "Max Value of Equation",
          link: "https://leetcode.com/problems/max-value-of-equation/",
          description: "Find maximum value of an equation, which can be approached using bucket-based techniques."
        }
      ]
    }
  }
};

export default linearSortingContent; 