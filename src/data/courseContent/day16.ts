import { Content } from '@/types/course';

const quickSortContent: Content = {
  introduction: "Quick Sort is an efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. Quick Sort is widely used due to its average-case efficiency and good cache locality, making it often faster in practice than other O(n log n) algorithms like Merge Sort.",
  
  learningObjectives: [
    "Understand the Quick Sort algorithm and its divide-and-conquer approach",
    "Implement Quick Sort with different pivot selection strategies",
    "Analyze the time and space complexity of Quick Sort",
    "Compare Quick Sort with other sorting algorithms",
    "Apply Quick Sort to solve various algorithmic problems"
  ],
  
  sections: [
    {
      title: "Quick Sort Algorithm",
      content: `Quick Sort works through the following steps:
1. Choose a pivot element from the array
2. Partition the array: rearrange elements so that elements less than the pivot are on the left, and elements greater than the pivot are on the right
3. Recursively apply the above steps to the sub-arrays on the left and right of the pivot

The partitioning process is the key operation in Quick Sort, and the choice of pivot can significantly affect performance.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Quick Sort Visualization</h4>
    <div class="flex justify-center">
      <img src="/images/quick-sort-animation.svg" alt="Quick Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation demonstrates how Quick Sort partitions the array around pivot elements recursively</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// Basic Quick Sort implementation
public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort the sub-arrays
        quickSort(arr, low, pivotIndex - 1);  // Sort left sub-array
        quickSort(arr, pivotIndex + 1, high); // Sort right sub-array
    }
}

// Lomuto partition scheme
private int partition(int[] arr, int low, int high) {
    // Choose the rightmost element as pivot
    int pivot = arr[high];
    
    // Index of smaller element
    int i = low - 1;
    
    // Traverse through all elements
    // compare each element with pivot
    for (int j = low; j < high; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            // Increment index of smaller element
            i++;
            
            // Swap arr[i] and arr[j]
            swap(arr, i, j);
        }
    }
    
    // Swap arr[i+1] and arr[high] (or pivot)
    swap(arr, i + 1, high);
    
    // Return the pivot index
    return i + 1;
}

// Swap function
private void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
          explanation: "This implementation uses the Lomuto partition scheme where the last element is chosen as the pivot. The partition function rearranges the array such that all elements less than the pivot are to the left, and all elements greater are to the right. It then returns the position of the pivot element."
        }
      ]
    },
    {
      title: "Pivot Selection Strategies",
      content: "The choice of pivot can significantly impact the performance of Quick Sort. In the worst case, if we consistently choose the smallest or largest element as the pivot, Quick Sort degenerates to O(n²) time complexity. Various pivot selection strategies have been developed to mitigate this risk.",
      codeExamples: [
        {
          language: "java",
          code: `// Quick Sort with different pivot selection strategies

// 1. First element as pivot
private int partitionFirst(int[] arr, int low, int high) {
    int pivot = arr[low]; // First element as pivot
    int i = low + 1;
    
    for (int j = low + 1; j <= high; j++) {
        if (arr[j] < pivot) {
            swap(arr, i, j);
            i++;
        }
    }
    
    swap(arr, low, i - 1); // Place pivot at its correct position
    return i - 1;
}

// 2. Random element as pivot
private int partitionRandom(int[] arr, int low, int high) {
    // Generate a random index between low and high
    int randomIndex = low + (int)(Math.random() * (high - low + 1));
    
    // Swap the random element with the high element
    swap(arr, randomIndex, high);
    
    // Then use the Lomuto scheme with the high element as pivot
    return partition(arr, low, high);
}

// 3. Median of three as pivot (first, middle, last)
private int partitionMedianOfThree(int[] arr, int low, int high) {
    int mid = low + (high - low) / 2;
    
    // Sort low, mid, high
    if (arr[mid] < arr[low])
        swap(arr, low, mid);
    if (arr[high] < arr[low])
        swap(arr, low, high);
    if (arr[high] < arr[mid])
        swap(arr, mid, high);
    
    // Place pivot (median) at high-1 position
    swap(arr, mid, high - 1);
    
    // Use high-1 as pivot
    int pivot = arr[high - 1];
    int i = low;
    
    // Partition
    for (int j = low; j < high - 1; j++) {
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            i++;
        }
    }
    
    swap(arr, i, high - 1);
    return i;
}`,
          explanation: "This code demonstrates three different pivot selection strategies: first element, random element, and median-of-three. Random pivoting helps avoid the worst-case scenario by making it unlikely to consistently choose bad pivots. The median-of-three approach (choosing the median of the first, middle, and last elements) is a practical compromise that works well for many datasets."
        }
      ]
    },
    {
      title: "Time and Space Complexity Analysis",
      content: "Quick Sort's performance varies based on the pivot selection and the nature of the input data. In the best and average cases, it has O(n log n) time complexity, but in the worst case, it can degrade to O(n²). Despite this, Quick Sort is often faster in practice than other O(n log n) algorithms due to its good cache locality and low constant factors.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity:
- Best case: O(n log n) - when the pivot divides the array into roughly equal halves
- Average case: O(n log n) - with random pivot selection
- Worst case: O(n²) - when the pivot is always the smallest or largest element

Space Complexity:
- O(log n) average case for the recursion stack
- O(n) worst case for the recursion stack

Comparison with other algorithms:
- Merge Sort: Always O(n log n) time, but requires O(n) extra space
- Heap Sort: Always O(n log n) time, in-place, but not cache-friendly
- Insertion Sort: O(n²) time generally, but O(n) for nearly sorted data and efficient for small arrays

Practical considerations:
- Quick Sort is often faster in practice due to:
  * Better cache locality than Merge Sort
  * Fewer comparisons than Heap Sort
  * In-place partitioning (minimal extra space needed)
- Many library implementations use a hybrid approach:
  * Quick Sort for large arrays
  * Insertion Sort for small sub-arrays (typically below 10-20 elements)
*/`,
          explanation: "This analysis highlights the time and space complexity of Quick Sort and compares it with other sorting algorithms. It also discusses the practical considerations that make Quick Sort efficient in real-world scenarios, despite its worst-case time complexity."
        }
      ]
    },
    {
      title: "Quick Sort Optimizations",
      content: "There are several ways to optimize Quick Sort for better performance. These include using insertion sort for small subarrays, implementing tail recursion elimination, and improving the handling of arrays with many duplicates through techniques like three-way partitioning.",
      codeExamples: [
        {
          language: "java",
          code: `// Optimized Quick Sort implementation

// Quick Sort with Insertion Sort for small arrays
public void optimizedQuickSort(int[] arr, int low, int high) {
    // Use insertion sort for small arrays
        if (high - low < 10) {
            insertionSort(arr, low, high);
        return;
    }
    
    if (low < high) {
        int pivotIndex = partitionRandom(arr, low, high);
        
        // Recursive calls
        optimizedQuickSort(arr, low, pivotIndex - 1);
        optimizedQuickSort(arr, pivotIndex + 1, high);
    }
}

// Insertion Sort for small subarrays
private void insertionSort(int[] arr, int low, int high) {
    for (int i = low + 1; i <= high; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Three-way partitioning for arrays with duplicates
public void quickSortThreeWay(int[] arr, int low, int high) {
    if (high <= low) return;
    
    // Three-way partition
    int lt = low, gt = high;
    int pivot = arr[low];
    int i = low + 1;
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            swap(arr, lt, i);
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            swap(arr, i, gt);
            gt--;
        } else {
            i++;
        }
    }
    
    // Recursive calls for less than and greater than partitions
    quickSortThreeWay(arr, low, lt - 1);
    quickSortThreeWay(arr, gt + 1, high);
}

// Tail recursion elimination to reduce stack space
public void quickSortWithTailRecursion(int[] arr, int low, int high) {
    while (low < high) {
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort the smaller subarray
        if (pivotIndex - low < high - pivotIndex) {
            quickSortWithTailRecursion(arr, low, pivotIndex - 1);
            low = pivotIndex + 1; // Tail call optimization for the larger subarray
        } else {
            quickSortWithTailRecursion(arr, pivotIndex + 1, high);
            high = pivotIndex - 1; // Tail call optimization for the larger subarray
        }
    }
}`,
          explanation: "These optimizations improve Quick Sort's performance. Using insertion sort for small subarrays reduces overhead. Three-way partitioning handles duplicates efficiently by creating three partitions: less than, equal to, and greater than the pivot. Tail recursion elimination reduces stack space by avoiding recursion for the larger subarray."
        }
      ]
    },
    {
      title: "Applications of Quick Sort",
      content: "Quick Sort is widely used in various applications due to its efficiency and practical advantages. It's the sorting algorithm of choice in many standard library implementations, including the Arrays.sort() method in Java for primitive types and the std::sort() function in C++.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Arrays;

public class QuickSortApplications {
    // Using Java's built-in sort (which uses a variant of Quick Sort for primitives)
    public void usingJavaSort(int[] arr) {
        Arrays.sort(arr);
    }
    
    // Quick select algorithm to find the kth smallest element
    // Based on the partition scheme from Quick Sort
    public int quickSelect(int[] arr, int low, int high, int k) {
        // If k is smaller than number of elements in array
        if (k > 0 && k <= high - low + 1) {
            // Partition the array around a pivot
            int pivotIndex = partition(arr, low, high);
            
            // If pivot is the answer
            if (pivotIndex - low == k - 1) {
                return arr[pivotIndex];
            }
            
            // If pivot is greater than k, recur for left subarray
            if (pivotIndex - low > k - 1) {
                return quickSelect(arr, low, pivotIndex - 1, k);
            }
            
            // Else recur for right subarray
            return quickSelect(arr, pivotIndex + 1, high, k - (pivotIndex - low + 1));
        }
        
        return Integer.MAX_VALUE; // If k is out of bounds
    }
    
    // Standard partition function
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        QuickSortApplications app = new QuickSortApplications();
        
        // Example of Quick Select
        int[] arr = {10, 7, 8, 9, 1, 5};
        int k = 3;
        int kthSmallest = app.quickSelect(arr, 0, arr.length - 1, k);
        
        System.out.println("K'th smallest element is: " + kthSmallest);
    }
}`,
          explanation: "This example demonstrates practical applications of Quick Sort. It shows how to use Java's built-in sort method (which uses a dual-pivot Quick Sort variant) and implements the Quick Select algorithm, which uses the partitioning concept from Quick Sort to efficiently find the kth smallest element in an array with an average time complexity of O(n)."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "qs-hw-1",
      question: "Implement a version of Quick Sort that uses both median-of-three pivot selection and switches to insertion sort for small subarrays (less than 10 elements). Analyze how these optimizations affect performance.",
      solution: "```java\npublic class OptimizedQuickSort {\n    public void sort(int[] arr) {\n        quickSort(arr, 0, arr.length - 1);\n    }\n    \n    private void quickSort(int[] arr, int low, int high) {\n        // Use insertion sort for small subarrays\n        if (high - low < 10) {\n            insertionSort(arr, low, high);\n            return;\n        }\n        \n        if (low < high) {\n            // Use median-of-three pivot selection\n            int pivotIndex = medianOfThree(arr, low, high);\n            \n            // Recursive calls\n            quickSort(arr, low, pivotIndex - 1);\n            quickSort(arr, pivotIndex + 1, high);\n        }\n    }\n    \n    private int medianOfThree(int[] arr, int low, int high) {\n        int mid = low + (high - low) / 2;\n        \n        // Sort low, mid, high\n        if (arr[mid] < arr[low]) swap(arr, low, mid);\n        if (arr[high] < arr[low]) swap(arr, low, high);\n        if (arr[high] < arr[mid]) swap(arr, mid, high);\n        \n        // Place pivot at position high-1\n        swap(arr, mid, high - 1);\n        int pivot = arr[high - 1];\n        \n        // Partition\n        int i = low;\n        for (int j = low; j < high - 1; j++) {\n            if (arr[j] <= pivot) {\n                swap(arr, i, j);\n                i++;\n            }\n        }\n        \n        swap(arr, i, high - 1);\n        return i;\n    }\n    \n    private void insertionSort(int[] arr, int low, int high) {\n        for (int i = low + 1; i <= high; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            \n            while (j >= low && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n    \n    private void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n}\n```\nThe median-of-three pivot selection reduces the chance of encountering the worst-case O(n²) performance by choosing a better pivot. Switching to insertion sort for small subarrays (less than 10 elements) improves performance because insertion sort has less overhead than quick sort for small arrays and performs well when arrays are nearly sorted, which is often the case for small subarrays. Together, these optimizations typically improve the average performance by reducing the constant factors, though the asymptotic time complexity remains O(n log n)."
    },
    {
      id: "qs-hw-2",
      question: "Implement Quick Select algorithm to find the kth smallest element in an unsorted array. Compare its efficiency with sorting the entire array and then selecting the kth element.",
      solution: "```java\npublic class QuickSelectVsSorting {\n    // Quick Select implementation\n    public int quickSelect(int[] arr, int k) {\n        if (k < 1 || k > arr.length) {\n            throw new IllegalArgumentException(\"K is out of bounds\");\n        }\n        return quickSelect(arr, 0, arr.length - 1, k);\n    }\n    \n    private int quickSelect(int[] arr, int low, int high, int k) {\n        if (low == high) return arr[low];\n        \n        // Use random pivot\n        int pivotIndex = randomPartition(arr, low, high);\n        int rank = pivotIndex - low + 1; // Position of pivot\n        \n        if (rank == k) {\n            return arr[pivotIndex];\n        } else if (rank > k) {\n            return quickSelect(arr, low, pivotIndex - 1, k);\n        } else {\n            return quickSelect(arr, pivotIndex + 1, high, k - rank);\n        }\n    }\n    \n    private int randomPartition(int[] arr, int low, int high) {\n        int randomIndex = low + (int)(Math.random() * (high - low + 1));\n        swap(arr, randomIndex, high);\n        return partition(arr, low, high);\n    }\n    \n    private int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        \n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                swap(arr, i, j);\n            }\n        }\n        \n        swap(arr, i + 1, high);\n        return i + 1;\n    }\n    \n    private void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    \n    // Approach using sorting\n    public int findKthSmallestUsingSorting(int[] arr, int k) {\n        if (k < 1 || k > arr.length) {\n            throw new IllegalArgumentException(\"K is out of bounds\");\n        }\n        \n        int[] arrCopy = arr.clone(); // Create a copy to not modify original\n        Arrays.sort(arrCopy);\n        return arrCopy[k - 1];\n    }\n    \n    // Performance comparison\n    public void comparePerformance(int size, int k) {\n        int[] arr = new int[size];\n        for (int i = 0; i < size; i++) {\n            arr[i] = (int)(Math.random() * size * 10);\n        }\n        \n        long startTime, endTime;\n        \n        // Measure Quick Select\n        startTime = System.nanoTime();\n        int result1 = quickSelect(arr.clone(), k);\n        endTime = System.nanoTime();\n        System.out.println(\"Quick Select time: \" + (endTime - startTime) / 1000000.0 + \" ms\");\n        \n        // Measure Sorting approach\n        startTime = System.nanoTime();\n        int result2 = findKthSmallestUsingSorting(arr.clone(), k);\n        endTime = System.nanoTime();\n        System.out.println(\"Sorting approach time: \" + (endTime - startTime) / 1000000.0 + \" ms\");\n        \n        System.out.println(\"Results match: \" + (result1 == result2));\n    }\n}\n```\nQuick Select is generally more efficient than sorting the entire array when you only need to find a single element. This is because Quick Select has an average time complexity of O(n), compared to O(n log n) for sorting. The difference becomes more significant for large arrays. However, if you need to find multiple elements or if k is close to n, sorting might be more efficient due to lower constant factors and better cache locality of optimized sorting implementations."
    }
  ],
  
  quiz: [
    {
      id: "qs-quiz-1",
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 2,
      explanation: "The worst-case time complexity of Quick Sort is O(n²). This occurs when the partitioning results in highly unbalanced subarrays, such as when the pivot is consistently the smallest or largest element in the subarray."
    },
    {
      id: "qs-quiz-2",
      question: "Which of the following is NOT a common pivot selection strategy in Quick Sort?",
      options: ["First element", "Last element", "Median of three", "Binary search midpoint"],
      correctAnswer: 3,
      explanation: "Binary search midpoint is not a common pivot selection strategy for Quick Sort. The common strategies are first element, last element, random element, and median of three (first, middle, last). Binary search midpoint would only be meaningful in a sorted array, which is not the context for Quick Sort."
    },
    {
      id: "qs-quiz-3",
      question: "What is the space complexity of Quick Sort in the average case?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "The average-case space complexity of Quick Sort is O(log n) due to the recursion stack. This is because the recursion depth is O(log n) on average when the partitioning is balanced or near-balanced."
    },
    {
      id: "qs-quiz-4",
      question: "How does Quick Sort compare to Merge Sort in terms of space usage?",
      options: ["Quick Sort always uses less space", "Merge Sort always uses less space", "Both use the same amount of space", "It depends on the implementation"],
      correctAnswer: 0,
      explanation: "Quick Sort typically uses less space than Merge Sort. Quick Sort has an average space complexity of O(log n) for the recursion stack, while Merge Sort requires O(n) additional space for merging operations. This makes Quick Sort more space-efficient for large arrays."
    },
    {
      id: "qs-quiz-5",
      question: "Which of the following algorithms is based on the partitioning idea from Quick Sort?",
      options: ["Heap Sort", "Insertion Sort", "Radix Sort", "Quick Select"],
      correctAnswer: 3,
      explanation: "Quick Select is based on the partitioning idea from Quick Sort. It uses the same partitioning process to find the kth smallest element in an array but only recurses into one partition (the one containing the kth element) rather than both."
    }
  ],
  
  practice: {
    introduction: "Practice is crucial for mastering Quick Sort and its applications. The following LeetCode problems will help you apply your understanding of partitioning and the divide-and-conquer approach used in Quick Sort.",
    questions: {
      easy: [
        {
          id: "sort-array-by-parity",
          title: "Sort Array By Parity",
          link: "https://leetcode.com/problems/sort-array-by-parity/",
          description: "Rearrange array so even elements come first, which can be done using a partitioning approach similar to Quick Sort."
        },
        {
          id: "move-zeroes",
          title: "Move Zeroes",
          link: "https://leetcode.com/problems/move-zeroes/",
          description: "Move all zeroes to the end while maintaining the relative order of non-zero elements, using partitioning techniques."
        },
        {
          id: "sort-colors",
          title: "Sort Colors",
          link: "https://leetcode.com/problems/sort-colors/",
          description: "Sort an array with only three distinct values, which can be solved using the Dutch national flag algorithm (a form of three-way partitioning)."
        },
        {
          id: "squares-of-a-sorted-array",
          title: "Squares of a Sorted Array",
          link: "https://leetcode.com/problems/squares-of-a-sorted-array/",
          description: "Return an array of squares in sorted order, which can be efficiently implemented using techniques from sorting algorithms."
        }
      ],
      medium: [
        {
          id: "kth-largest-element",
          title: "Kth Largest Element in an Array",
          link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          description: "Find the kth largest element in an unsorted array, which can be efficiently solved using Quick Select."
        },
        {
          id: "find-k-closest-elements",
          title: "Find K Closest Elements",
          link: "https://leetcode.com/problems/find-k-closest-elements/",
          description: "Find k closest elements to a given value in a sorted array, using partitioning or binary search techniques."
        },
        {
          id: "top-k-frequent-elements",
          title: "Top K Frequent Elements",
          link: "https://leetcode.com/problems/top-k-frequent-elements/",
          description: "Find the k most frequent elements in an array, which can be solved using a variation of Quick Select."
        },
        {
          id: "3sum",
          title: "3Sum",
          link: "https://leetcode.com/problems/3sum/",
          description: "Find all unique triplets that sum to zero, which uses sorting and two-pointer technique (related to partitioning)."
        }
      ],
      hard: [
        {
          id: "median-of-two-sorted-arrays",
          title: "Median of Two Sorted Arrays",
          link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
          description: "Find the median of two sorted arrays, which can be solved using a divide-and-conquer approach similar to partitioning."
        },
        {
          id: "sliding-window-median",
          title: "Sliding Window Median",
          link: "https://leetcode.com/problems/sliding-window-median/",
          description: "Find the median in a sliding window of size k, which requires efficient insertion and removal of elements."
        }
      ]
    }
  }
};

export default quickSortContent; 