import { Content } from '@/types/course';

const mergeSortContent: Content = {
  introduction: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. It's known for its stable sorting, predictable performance, and is particularly efficient for linked lists and external sorting where random access is expensive.",
  
  learningObjectives: [
    "Understand the divide-and-conquer approach of Merge Sort",
    "Implement the Merge Sort algorithm",
    "Analyze time and space complexity of Merge Sort",
    "Recognize scenarios where Merge Sort is preferable over other sorting algorithms",
    "Apply Merge Sort to solve various array and linked list problems"
  ],
  
  sections: [
    {
      title: "Merge Sort Fundamentals",
      content: "Merge Sort follows the divide-and-conquer paradigm. It breaks the problem down into smaller, manageable subproblems, solves each subproblem, and then combines the solutions to create a solution to the original problem. For sorting, this means dividing the array until we have individual elements (which are sorted by definition), then merging them back together in a sorted manner.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic Merge Sort implementation
public void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

// Merge function to merge two sorted subarrays
private void merge(int[] arr, int left, int mid, int right) {
    // Sizes of the temporary arrays
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temporary arrays
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    // Merge the temporary arrays back into arr[left...right]
    int i = 0, j = 0;
    int k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements of L[] if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy remaining elements of R[] if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
          explanation: "This implementation divides the array in half recursively until we have subarrays of size 1, then merges them back together while maintaining the sorted order. The merge function is the key operation, which efficiently combines two sorted subarrays."
        }
      ]
    },
    {
      title: "Time and Space Complexity Analysis",
      content: "Merge Sort has a consistent time complexity of O(n log n) for all cases (best, average, and worst). This makes it very predictable, which is important for time-critical applications. However, it requires O(n) extra space for the merging process, which can be a drawback when memory is limited.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity:
- Best case: O(n log n)
- Average case: O(n log n)
- Worst case: O(n log n)

Space Complexity:
- O(n) - additional space for the merging process

Why O(n log n)?
- The array is divided log n times (until we get subarrays of size 1)
- Each level of recursion requires O(n) work for the merging process
- Total: O(n) * O(log n) = O(n log n)

Comparison with other algorithms:
- Quick Sort: O(n log n) average time, O(n²) worst case, in-place
- Heap Sort: O(n log n) time, in-place, but not stable
- Insertion Sort: O(n²) time, but efficient for small or nearly sorted arrays
*/`,
          explanation: "This analysis breaks down the time and space complexity of Merge Sort and compares it with other sorting algorithms. Understanding these trade-offs helps in choosing the right algorithm for different scenarios."
        }
      ]
    },
    {
      title: "Merge Sort Variations and Optimizations",
      content: "While the basic Merge Sort algorithm is already efficient, several variations and optimizations can further improve its performance in specific scenarios. These include using insertion sort for small subarrays, avoiding the copy to temporary arrays, and bottom-up (iterative) implementation.",
      codeExamples: [
        {
          language: "java",
          code: `// Optimized Merge Sort with Insertion Sort for small subarrays
public void optimizedMergeSort(int[] arr, int left, int right) {
    // Use insertion sort for small subarrays
    if (right - left <= 10) {
        insertionSort(arr, left, right);
        return;
    }
    
    if (left < right) {
        int mid = left + (right - left) / 2;
        optimizedMergeSort(arr, left, mid);
        optimizedMergeSort(arr, mid + 1, right);
        
        // Skip merge if already sorted
        if (arr[mid] <= arr[mid + 1]) {
            return;
        }
        
        merge(arr, left, mid, right);
    }
}

// Insertion sort for small subarrays
private void insertionSort(int[] arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Bottom-up (iterative) Merge Sort
public void bottomUpMergeSort(int[] arr) {
    int n = arr.length;
    int[] temp = new int[n];
    
    // Size of subarrays to be merged
    for (int size = 1; size < n; size *= 2) {
        // Starting index of subarrays
        for (int leftStart = 0; leftStart < n - size; leftStart += 2 * size) {
            int mid = leftStart + size - 1;
            int rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);
            
            // Merge subarrays arr[leftStart...mid] and arr[mid+1...rightEnd]
            bottomUpMerge(arr, temp, leftStart, mid, rightEnd);
        }
    }
}

// Merge function for bottom-up approach
private void bottomUpMerge(int[] arr, int[] temp, int left, int mid, int right) {
    // Copy array to temp
    for (int i = left; i <= right; i++) {
        temp[i] = arr[i];
    }
    
    int i = left;
    int j = mid + 1;
    int k = left;
    
    while (i <= mid && j <= right) {
        if (temp[i] <= temp[j]) {
            arr[k++] = temp[i++];
        } else {
            arr[k++] = temp[j++];
        }
    }
    
    // Copy remaining elements
    while (i <= mid) {
        arr[k++] = temp[i++];
    }
}`,
          explanation: "These optimizations include using insertion sort for small subarrays (more efficient for small n), skipping the merge step if already sorted, and a bottom-up (iterative) approach that avoids the overhead of recursion."
        }
      ]
    },
    {
      title: "Applications of Merge Sort",
      content: "Merge Sort has several practical applications due to its stable sorting property, predictable performance, and efficiency for certain data structures. It's particularly useful for external sorting, linked list sorting, counting inversions, and parallel sorting implementations.",
      codeExamples: [
        {
          language: "java",
          code: `// Merge Sort for Linked Lists
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
    }
}

public ListNode sortLinkedList(ListNode head) {
    // Base case
    if (head == null || head.next == null) {
        return head;
    }
    
    // Find the middle of the linked list
    ListNode middle = findMiddle(head);
    ListNode nextOfMiddle = middle.next;
    middle.next = null; // Split the list
    
    // Apply mergeSort on left and right lists
    ListNode left = sortLinkedList(head);
    ListNode right = sortLinkedList(nextOfMiddle);
    
    // Merge the sorted lists
    return mergeLists(left, right);
}

private ListNode findMiddle(ListNode head) {
    if (head == null) return head;
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

private ListNode mergeLists(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    
    while (a != null && b != null) {
        if (a.val <= b.val) {
            tail.next = a;
            a = a.next;
        } else {
            tail.next = b;
            b = b.next;
        }
        tail = tail.next;
    }
    
    if (a != null) {
        tail.next = a;
    } else {
        tail.next = b;
    }
    
    return dummy.next;
}

// Count Inversions using Merge Sort
public int countInversions(int[] arr) {
    int[] temp = new int[arr.length];
    return mergeSort(arr, temp, 0, arr.length - 1);
}

private int mergeSort(int[] arr, int[] temp, int left, int right) {
    int inversions = 0;
    
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        // Count inversions in left and right subarrays
        inversions += mergeSort(arr, temp, left, mid);
        inversions += mergeSort(arr, temp, mid + 1, right);
        
        // Count split inversions
        inversions += merge(arr, temp, left, mid, right);
    }
    
    return inversions;
}

private int merge(int[] arr, int[] temp, int left, int mid, int right) {
    int inversions = 0;
    
    // Copy to temp array
    for (int i = left; i <= right; i++) {
        temp[i] = arr[i];
    }
    
    int i = left;
    int j = mid + 1;
    int k = left;
    
    while (i <= mid && j <= right) {
        if (temp[i] <= temp[j]) {
            arr[k++] = temp[i++];
        } else {
            // Inversion found
            arr[k++] = temp[j++];
            inversions += (mid - i + 1); // All elements from i to mid are greater than temp[j]
        }
    }
    
    // Copy remaining elements
    while (i <= mid) {
        arr[k++] = temp[i++];
    }
    
    return inversions;
}`,
          explanation: "These examples show how Merge Sort can be applied to sort linked lists (where random access is expensive) and to count inversions in an array (a measure of how out-of-order the array is). These applications leverage Merge Sort's divide-and-conquer approach and stable sorting property."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "ms-hw1",
      question: "Implement an in-place Merge Sort algorithm that does not use additional O(n) space for merging. Compare its performance with the standard Merge Sort algorithm.",
      solution: "In-place Merge Sort can be implemented by using a rotation-based algorithm for merging, although it typically has a higher time complexity. Compare the time-space trade-off with standard Merge Sort."
    },
    {
      id: "ms-hw2",
      question: "Modify the Merge Sort algorithm to detect and handle already-sorted or partially-sorted subarrays efficiently. Test your implementation on various data sets.",
      solution: "Add a check before merging to see if the largest element in the left subarray is less than or equal to the smallest element in the right subarray. If so, skip the merge step."
    },
    {
      id: "ms-hw3",
      question: "Implement the 'External Merge Sort' algorithm for sorting a large file that doesn't fit into memory. Your implementation should divide the file into smaller chunks, sort them, and then merge the sorted chunks.",
      solution: "Divide the file into manageable chunks, sort each chunk using Merge Sort, write them to disk, and then use a multi-way merge to combine the sorted chunks."
    }
  ],
  
  quiz: [
    {
      id: "ms-q1",
      question: "What is the time complexity of Merge Sort for all cases (best, average, worst)?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "Merge Sort consistently has O(n log n) time complexity in all cases, which makes it very predictable."
    },
    {
      id: "ms-q2",
      question: "Which of the following is NOT a characteristic of Merge Sort?",
      options: [
        "It's a stable sorting algorithm",
        "It has an in-place implementation with O(1) space complexity",
        "It's efficient for sorting linked lists",
        "It has a consistent O(n log n) time complexity"
      ],
      correctAnswer: 1,
      explanation: "Merge Sort typically requires O(n) additional space for the merging process. While there are in-place variations, they usually have higher time complexity or other trade-offs."
    },
    {
      id: "ms-q3",
      question: "What is the primary advantage of Merge Sort over Quick Sort?",
      options: [
        "Merge Sort is always faster",
        "Merge Sort uses less memory",
        "Merge Sort has predictable performance regardless of input data",
        "Merge Sort is easier to implement"
      ],
      correctAnswer: 2,
      explanation: "Merge Sort's primary advantage is its predictable O(n log n) performance regardless of the input data, while Quick Sort can degrade to O(n²) in certain cases."
    },
    {
      id: "ms-q4",
      question: "Which optimization technique can significantly improve Merge Sort's performance for partially sorted arrays?",
      options: [
        "Using a random pivot",
        "Three-way partitioning",
        "Checking if subarrays are already sorted before merging",
        "Using a median-of-three pivot selection"
      ],
      correctAnswer: 2,
      explanation: "Checking if subarrays are already sorted (if the largest element in the left is less than or equal to the smallest in the right) can allow us to skip the merge step, significantly improving performance for partially sorted arrays."
    }
  ]
};

export default mergeSortContent; 