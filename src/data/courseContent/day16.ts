import { Content } from '@/types/course';

const quickSortContent: Content = {
  introduction: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm that is widely used in practice. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
  
  learningObjectives: [
    "Understand the divide-and-conquer approach of Quick Sort",
    "Implement Quick Sort with different pivot selection strategies",
    "Analyze the time and space complexity of Quick Sort",
    "Understand when to use Quick Sort vs. other sorting algorithms",
    "Apply optimizations to improve Quick Sort efficiency"
  ],
  
  sections: [
    {
      title: "Quick Sort Fundamentals",
      content: `Quick Sort is based on the divide-and-conquer strategy. It selects a pivot element, partitions the array around the pivot, and then recursively sorts the sub-arrays. The key to its performance is the partitioning process, which rearranges elements efficiently.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Quick Sort Visualization</h4>
    <div class="flex justify-center">
      <img src="/images/quick-sort-animation.svg" alt="Quick Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation demonstrates the pivot selection and partitioning process of Quick Sort</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// Basic Quick Sort implementation
public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot position
        int pivotPos = partition(arr, low, high);
        
        // Sort the left subarray
        quickSort(arr, low, pivotPos - 1);
        
        // Sort the right subarray
        quickSort(arr, pivotPos + 1, high);
    }
}

// Partition function using last element as pivot
public int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; // Choose the last element as pivot
    int i = low - 1;       // Index of smaller element
    
    for (int j = low; j < high; j++) {
        // If current element is smaller than the pivot
        if (arr[j] <= pivot) {
            i++;
            
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    // Swap arr[i+1] and arr[high] (the pivot)
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1; // Return the pivot position
}`,
          explanation: "This implementation selects the last element as the pivot and partitions the array such that elements smaller than the pivot are on the left, and elements greater than the pivot are on the right."
        }
      ]
    },
    {
      title: "Pivot Selection Strategies",
      content: "The choice of pivot can significantly impact Quick Sort's performance. Common strategies include selecting the first element, the last element, a random element, or the median of three elements (first, middle, last). Good pivot selection helps avoid the worst-case performance.",
      codeExamples: [
        {
          language: "java",
          code: `// Random pivot selection for better average performance
public int partition(int[] arr, int low, int high) {
    // Choose a random pivot and swap it with the last element
    int randomIndex = low + (int) (Math.random() * (high - low + 1));
    swap(arr, randomIndex, high);
    
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    
    swap(arr, i + 1, high);
    return i + 1;
}

// Median of three pivot selection
public int medianOfThree(int[] arr, int low, int high) {
    int mid = low + (high - low) / 2;
    
    // Sort low, mid, high
    if (arr[mid] < arr[low])
        swap(arr, mid, low);
    if (arr[high] < arr[low])
        swap(arr, high, low);
    if (arr[high] < arr[mid])
        swap(arr, high, mid);
    
    // Place the median at high-1 position
    swap(arr, mid, high - 1);
    return high - 1;
}

private void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
          explanation: "These implementations show two pivot selection strategies: random pivot and median-of-three. Random pivot selection helps avoid worst-case scenarios on already sorted arrays, while median-of-three is often used in practice for better average performance."
        }
      ]
    },
    {
      title: "Time and Space Complexity Analysis",
      content: "Quick Sort has an average time complexity of O(n log n), making it very efficient for large data sets. However, its worst-case time complexity is O(n²) when the pivot selection consistently results in highly unbalanced partitioning. The space complexity is O(log n) for the recursive call stack in the average case, and O(n) in the worst case.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity:
- Average case: O(n log n)
- Best case: O(n log n)
- Worst case: O(n²) - occurs when the pivot is always the smallest or largest element

Space Complexity:
- O(log n) - for the recursive call stack in the average case
- O(n) - in the worst case

Comparison with other algorithms:
- Merge Sort: Always O(n log n) time, but requires O(n) extra space
- Heap Sort: Always O(n log n) time, constant extra space
- Quick Sort: O(n log n) average time, in-place, but O(n²) worst case
*/`,
          explanation: "This code comment provides a concise analysis of Quick Sort's time and space complexity, along with a comparison to other common sorting algorithms."
        }
      ]
    },
    {
      title: "Quick Sort Optimizations",
      content: "Several optimizations can improve Quick Sort's performance. These include using insertion sort for small subarrays, implementing tail recursion optimization, and using a three-way partitioning scheme for arrays with many duplicate elements.",
      codeExamples: [
        {
          language: "java",
          code: `// Optimized Quick Sort with Insertion Sort for small arrays
public void optimizedQuickSort(int[] arr, int low, int high) {
    while (low < high) {
        // Use insertion sort for small subarrays
        if (high - low < 10) {
            insertionSort(arr, low, high);
            break;
        } else {
            int pivotPos = partition(arr, low, high);
            
            // Tail recursion optimization
            // Recursively sort the smaller subarray
            if (pivotPos - low < high - pivotPos) {
                optimizedQuickSort(arr, low, pivotPos - 1);
                low = pivotPos + 1;
            } else {
                optimizedQuickSort(arr, pivotPos + 1, high);
                high = pivotPos - 1;
            }
        }
    }
}

// Insertion sort for small subarrays
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

// Three-way partitioning for arrays with many duplicates
public void threeWayQuickSort(int[] arr, int low, int high) {
    if (high <= low) return;
    
    int lt = low, gt = high;
    int pivot = arr[low];
    int i = low + 1;
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            swap(arr, lt++, i++);
        } else if (arr[i] > pivot) {
            swap(arr, i, gt--);
        } else {
            i++;
        }
    }
    
    // Now arr[low..lt-1] < pivot = arr[lt..gt] < arr[gt+1..high]
    threeWayQuickSort(arr, low, lt - 1);
    threeWayQuickSort(arr, gt + 1, high);
}`,
          explanation: "These optimizations include using insertion sort for small subarrays (which is more efficient for small n), implementing tail recursion optimization to reduce stack space, and using three-way partitioning to handle duplicate elements efficiently."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "qs-hw1",
      question: "Implement Quick Sort with a median-of-three pivot selection strategy and test its performance on various input arrays including sorted, reverse sorted, and random arrays.",
      solution: "Implement the median-of-three function as shown in the lesson, then modify the partition function to use this pivot selection strategy."
    },
    {
      id: "qs-hw2",
      question: "Modify the Quick Sort algorithm to handle arrays with many duplicate elements efficiently using three-way partitioning (Dutch National Flag partitioning).",
      solution: "Use the three-way partitioning approach that divides the array into three parts: elements less than the pivot, elements equal to the pivot, and elements greater than the pivot."
    },
    {
      id: "qs-hw3",
      question: "Implement a hybrid sorting algorithm that uses Quick Sort for large subarrays and Insertion Sort for small subarrays. Compare its performance with standard Quick Sort.",
      solution: "Use the optimized implementation shown in the lesson, with a threshold (e.g., 10) for switching to insertion sort for small subarrays."
    }
  ],
  
  quiz: [
    {
      id: "qs-q1",
      question: "What is the average time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "The average time complexity of Quick Sort is O(n log n), which makes it efficient for large data sets."
    },
    {
      id: "qs-q2",
      question: "What causes Quick Sort to degrade to its worst-case performance of O(n²)?",
      options: [
        "Having too many duplicate elements",
        "Using random pivot selection",
        "Consistently selecting the smallest or largest element as the pivot",
        "Using three-way partitioning"
      ],
      correctAnswer: 2,
      explanation: "Quick Sort's worst-case occurs when the pivot selection consistently results in highly unbalanced partitioning, such as when the smallest or largest element is always chosen as the pivot in a sorted or reverse-sorted array."
    },
    {
      id: "qs-q3",
      question: "Which optimization is most beneficial for Quick Sort when dealing with arrays that have many duplicate elements?",
      options: [
        "Random pivot selection",
        "Median-of-three pivot selection",
        "Three-way partitioning",
        "Using Insertion Sort for small subarrays"
      ],
      correctAnswer: 2,
      explanation: "Three-way partitioning (Dutch National Flag partitioning) is particularly effective for arrays with many duplicate elements as it separates the array into three parts: elements less than, equal to, and greater than the pivot."
    },
    {
      id: "qs-q4",
      question: "Compared to Merge Sort, Quick Sort has:",
      options: [
        "Better worst-case time complexity",
        "Better average-case space complexity",
        "Always better performance on sorted arrays",
        "Always worse performance on random arrays"
      ],
      correctAnswer: 1,
      explanation: "Quick Sort has better average-case space complexity (O(log n)) compared to Merge Sort (O(n)) because Quick Sort is an in-place sorting algorithm, while Merge Sort requires additional space for merging."
    }
  ]
};

export default quickSortContent; 