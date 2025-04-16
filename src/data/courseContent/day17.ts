import { Content } from '@/types/course';

const heapSortContent: Content = {
  introduction: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and adding it to the sorted region. The improvement over Selection Sort is the use of a heap data structure rather than a linear-time search to find the maximum element. Heap Sort is an in-place algorithm with O(n log n) time complexity, making it optimal from an asymptotic perspective.",
  
  learningObjectives: [
    "Understand the heap data structure and heapify process",
    "Implement the Heap Sort algorithm",
    "Analyze the time and space complexity of Heap Sort",
    "Compare Heap Sort with other sorting algorithms",
    "Recognize scenarios where Heap Sort is particularly effective"
  ],
  
  sections: [
    {
      title: "Understanding the Heap Data Structure",
      content: `A binary heap is a complete binary tree where each node satisfies the heap property. In a max-heap, for any given node, the value of the node is greater than or equal to the values of its children. In a min-heap, the value of the node is less than or equal to the values of its children.

Heap Sort uses a max-heap to sort elements in ascending order (or a min-heap for descending order). The heap data structure is efficiently represented as an array, where for a node at index i:
- Its left child is at index 2i + 1
- Its right child is at index 2i + 2
- Its parent is at index ⌊(i-1)/2⌋

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Binary Heap Visualization</h4>
    <div class="flex justify-center">
      <img src="/images/binary-heap.svg" alt="Binary Heap" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">A binary max-heap and its array representation</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// Max Heap implementation
public class MaxHeap {
    private int[] heap;
    private int size;
    private int maxSize;
    
    // Constructor to initialize an empty heap with a maximum size
    public MaxHeap(int maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
        heap = new int[maxSize];
    }
    
    // Helper methods to get indices of parent, left child, and right child
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    // Helper method to swap two elements in the heap
    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    // Method to insert a new element into the heap
    public void insert(int element) {
        if (size >= maxSize) {
            return; // Heap is full
        }
        
        // Insert the new element at the end
        heap[size] = element;
        int current = size;
        size++;
        
        // Sift up: compare with parent and swap if needed
        while (current > 0 && heap[current] > heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }
    
    // Method to extract the maximum element (root)
    public int extractMax() {
        if (size <= 0) {
            return Integer.MIN_VALUE;
        }
        
        if (size == 1) {
            size--;
            return heap[0];
        }
        
        // Store the max value to return
        int max = heap[0];
        
        // Replace root with the last element
        heap[0] = heap[size - 1];
        size--;
        
        // Heapify down to maintain the heap property
        heapify(0);
        
        return max;
    }
    
    // Heapify (sift down) a subtree with the root at given index
    private void heapify(int i) {
        int largest = i; // Initialize largest as root
        int left = leftChild(i);
        int right = rightChild(i);
        
        // If left child is larger than root
        if (left < size && heap[left] > heap[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < size && heap[right] > heap[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest != i) {
            swap(i, largest);
            // Recursively heapify the affected sub-tree
            heapify(largest);
        }
    }
    
    // Method to print the heap
    public void printHeap() {
        for (int i = 0; i < size / 2; i++) {
            System.out.print("Parent: " + heap[i]);
            
            if (leftChild(i) < size) {
                System.out.print(", Left Child: " + heap[leftChild(i)]);
            }
            
            if (rightChild(i) < size) {
                System.out.print(", Right Child: " + heap[rightChild(i)]);
            }
            
            System.out.println();
        }
    }
}`,
          explanation: "This implementation shows a basic Max Heap data structure with methods for insertion, extraction of the maximum element, and heapification. The heapify method is particularly important for Heap Sort, as it ensures that the max-heap property is maintained after removing the maximum element."
        }
      ]
    },
    {
      title: "Heap Sort Algorithm",
      content: "Heap Sort works by first building a max-heap from the input array, then repeatedly extracting the maximum element (the root) and placing it at the end of the array. After each extraction, the heap is reduced by one element and the algorithm maintains the heap property by heapifying the root. This process continues until the heap is empty, resulting in a sorted array.",
      codeExamples: [
        {
          language: "java",
          code: `public class HeapSort {
    public void sort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (maximum element) to the end
            swap(arr, 0, i);
            
            // Call heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
    
    // Heapify a subtree rooted with node i
    private void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest != i) {
            swap(arr, i, largest);
            
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    // Utility method to print array
    public void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        HeapSort heapSort = new HeapSort();
        
        System.out.println("Original array:");
        heapSort.printArray(arr);
        
        heapSort.sort(arr);
        
        System.out.println("Sorted array:");
        heapSort.printArray(arr);
    }
}`,
          explanation: "This implementation demonstrates the Heap Sort algorithm. The sort method first builds a max-heap from the unsorted array, then repeatedly extracts the maximum element and places it at the end of the array. The heapify method ensures that the max-heap property is maintained during this process."
        }
      ]
    },
    {
      title: "Building a Heap: Bottom-up Approach",
      content: "A key part of Heap Sort is efficiently building the initial heap. While we could insert elements one by one (taking O(n log n) time), we can be more efficient by using a bottom-up approach that takes only O(n) time. This approach starts from the lowest non-leaf nodes and works up to the root, applying heapify at each step.",
      codeExamples: [
        {
          language: "java",
          code: `// Bottom-up heap construction
public void buildMaxHeap(int[] arr) {
    int n = arr.length;
    
    // Start from the lowest non-leaf node and heapify all nodes in reverse order
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}

/*
 * Why is bottom-up heap construction O(n) rather than O(n log n)?
 *
 * - Naively, we might think: n/2 nodes, each taking O(log n) time to heapify
 *   => O(n log n) total
 *
 * - But not all nodes are at the same level, and heapify time is proportional to height
 *
 * - Mathematical analysis shows that:
 *   - There are approximately n/2 nodes at height 0
 *   - n/4 nodes at height 1
 *   - n/8 nodes at height 2
 *   - ...and so on
 *
 * - The work at each level is:
 *   - n/2 * O(1) for height 0
 *   - n/4 * O(2) for height 1
 *   - n/8 * O(3) for height 2
 *   - ...
 *
 * - This sum works out to O(n), not O(n log n)
 *
 * This is why bottom-up heap construction is more efficient than 
 * inserting elements one by one.
 */`,
          explanation: "This code shows the bottom-up approach to heap construction, which is more efficient than inserting elements one by one. The key insight is that we start from the lowest non-leaf nodes and work our way up, applying heapify at each step. The detailed comment explains why this approach has O(n) time complexity rather than the O(n log n) you might initially expect."
        }
      ]
    },
    {
      title: "Time and Space Complexity Analysis",
      content: "Heap Sort has consistent performance characteristics with a time complexity of O(n log n) in all cases. While it's generally outperformed by Quick Sort in practice, it has advantages in specific scenarios and guarantees a worst-case O(n log n) performance.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity:
- Building the initial heap: O(n)
- Extracting the max element n times: O(n log n)
- Overall time complexity: O(n log n) for all cases (best, average, worst)

Space Complexity:
- O(1) auxiliary space (in-place algorithm)

Advantages:
- Consistent O(n log n) performance regardless of input data
- In-place algorithm (constant extra space)
- No need for recursion (unlike Quick Sort and Merge Sort)
- Useful when guaranteed worst-case performance is required

Disadvantages:
- Usually slower than Well-implemented Quick Sort in practice
- Not stable (relative order of equal elements may change)
- Poor cache performance due to non-local memory references

Comparison with other O(n log n) algorithms:
- Quick Sort: Better average-case performance due to better constant factors,
  but O(n²) worst case
- Merge Sort: Stable, but requires O(n) extra space
- Heap Sort: In-place and O(n log n) worst case, but typically slower than
  Quick Sort due to cache behavior
*/`,
          explanation: "This analysis breaks down the time and space complexity of Heap Sort and compares it with other popular sorting algorithms. It highlights Heap Sort's advantages, such as consistent performance and in-place sorting, as well as its disadvantages, including poorer cache performance compared to Quick Sort."
        }
      ]
    },
    {
      title: "Heap Sort Variations",
      content: "There are several variations and optimizations of Heap Sort, including bottom-up Heap Sort, adaptive Heap Sort, and smooth sort. Each offers different trade-offs in terms of performance, stability, or other characteristics.",
      codeExamples: [
        {
          language: "java",
          code: `// Heap Sort in descending order (using min-heap)
public void heapSortDescending(int[] arr) {
    int n = arr.length;
    
    // Build min heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        minHeapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root (minimum element) to the end
        swap(arr, 0, i);
        
        // Call minHeapify on the reduced heap
        minHeapify(arr, i, 0);
    }
}

private void minHeapify(int[] arr, int n, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }
    
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }
    
    if (smallest != i) {
        swap(arr, i, smallest);
        minHeapify(arr, n, smallest);
    }
}

// Iterative Heap Sort (non-recursive)
public void iterativeHeapSort(int[] arr) {
    int n = arr.length;
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        iterativeHeapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        
        // Call iterative heapify on the reduced heap
        iterativeHeapify(arr, i, 0);
    }
}

private void iterativeHeapify(int[] arr, int n, int i) {
    int parent = i;
    
    while (true) {
        int largest = parent;
        int left = 2 * parent + 1;
        int right = 2 * parent + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest == parent) {
            break;
        }
        
        swap(arr, parent, largest);
        parent = largest;
    }
}`,
          explanation: "This code demonstrates two variations of Heap Sort. The first is a Heap Sort to sort in descending order using a min-heap instead of a max-heap. The second is an iterative implementation of Heap Sort that avoids recursion, which can be beneficial in environments with limited stack space or where function call overhead is significant."
        }
      ]
    },
    {
      title: "Applications of Heap Sort",
      content: "Heap Sort and the underlying heap data structure have numerous applications beyond just sorting arrays. They're used in graph algorithms like Dijkstra's shortest path algorithm, in priority queues, and in selection algorithms like finding the kth largest element.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.PriorityQueue;

public class HeapSortApplications {
    // Finding the k largest elements using a min-heap
    public int[] findKLargest(int[] arr, int k) {
        if (k <= 0 || k > arr.length) {
            throw new IllegalArgumentException("Invalid k value");
        }
        
        // Use a min-heap of size k
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        
        // Add first k elements to the heap
        for (int i = 0; i < k; i++) {
            minHeap.offer(arr[i]);
        }
        
        // For remaining elements, if element is larger than the smallest in heap,
        // remove smallest and add this element
        for (int i = k; i < arr.length; i++) {
            if (arr[i] > minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(arr[i]);
            }
        }
        
        // Extract all elements from the heap
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll();
        }
        
        return result;
    }
    
    // Sort approximately sorted array efficiently
    // (where each element is at most k positions away from its sorted position)
    public void sortKSortedArray(int[] arr, int k) {
        int n = arr.length;
        
        // Create a min-heap of size k+1
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k + 1);
        
        int index = 0;
        
        // Add first k+1 elements to the min heap
        for (int i = 0; i < Math.min(n, k + 1); i++) {
            minHeap.offer(arr[i]);
        }
        
        // Extract the minimum element and add a new element from the array
        for (int i = k + 1; i < n; i++) {
            arr[index++] = minHeap.poll();
            minHeap.offer(arr[i]);
        }
        
        // Extract all remaining elements from the min heap
        while (!minHeap.isEmpty()) {
            arr[index++] = minHeap.poll();
        }
    }
    
    // Demonstration
    public static void main(String[] args) {
        HeapSortApplications app = new HeapSortApplications();
        
        // Example 1: Find 3 largest elements
        int[] arr1 = {10, 7, 11, 30, 8, 38, 2, 45};
        int[] largest = app.findKLargest(arr1, 3);
        
        System.out.println("3 largest elements:");
        for (int val : largest) {
            System.out.print(val + " ");
        }
        System.out.println();
        
        // Example 2: Sort a nearly sorted array
        int[] arr2 = {6, 5, 3, 2, 8, 10, 9};
        app.sortKSortedArray(arr2, 3);
        
        System.out.println("Sorted k-sorted array:");
        for (int val : arr2) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
          explanation: "This code demonstrates practical applications of heaps and priority queues (which are typically implemented using heaps). The first method finds the k largest elements in an array using a min-heap of size k. The second method efficiently sorts a k-sorted array (where each element is at most k positions away from its sorted position) using a min-heap of size k+1, which is more efficient than a general sorting algorithm for this specific case."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hs-hw-1",
      question: "Implement a variation of Heap Sort that sorts an array in descending order using a max-heap. Analyze its time and space complexity.",
      solution: "```java\npublic class DescendingHeapSort {\n    public void sort(int[] arr) {\n        int n = arr.length;\n        \n        // Build max heap\n        for (int i = n / 2 - 1; i >= 0; i--) {\n            heapify(arr, n, i);\n        }\n        \n        // Extract elements from heap one by one in descending order\n        for (int i = 0; i < n - 1; i++) {\n            // Move current root (maximum element) to the beginning\n            swap(arr, 0, n - 1 - i);\n            \n            // Call heapify on the reduced heap\n            heapify(arr, n - 1 - i, 0);\n        }\n    }\n    \n    private void heapify(int[] arr, int n, int i) {\n        int largest = i;\n        int left = 2 * i + 1;\n        int right = 2 * i + 2;\n        \n        if (left < n && arr[left] > arr[largest]) {\n            largest = left;\n        }\n        \n        if (right < n && arr[right] > arr[largest]) {\n            largest = right;\n        }\n        \n        if (largest != i) {\n            swap(arr, i, largest);\n            heapify(arr, n, largest);\n        }\n    }\n    \n    private void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n}\n```\nTime Complexity: O(n log n) - identical to standard Heap Sort\n- Building the max heap: O(n)\n- Extracting the max element n times: O(n log n)\n\nSpace Complexity: O(1) - This is an in-place sorting algorithm that requires only a constant amount of additional space.\n\nThe key difference from standard Heap Sort is that we place the maximum elements at the beginning of the array rather than at the end, resulting in a descending order sort."
    },
    {
      id: "hs-hw-2",
      question: "Implement a method to find the kth largest element in an array using a heap. Compare solutions using a max-heap and a min-heap. Which is more efficient when k is much smaller than n?",
      solution: "```java\nimport java.util.PriorityQueue;\nimport java.util.Collections;\n\npublic class KthLargestElement {\n    // Solution using a max-heap\n    public int findKthLargestWithMaxHeap(int[] nums, int k) {\n        if (k < 1 || k > nums.length) {\n            throw new IllegalArgumentException(\"Invalid k value\");\n        }\n        \n        // Create a max heap\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n        \n        // Add all elements to the heap\n        for (int num : nums) {\n            maxHeap.offer(num);\n        }\n        \n        // Remove the k-1 largest elements\n        for (int i = 0; i < k - 1; i++) {\n            maxHeap.poll();\n        }\n        \n        // The root is the kth largest element\n        return maxHeap.peek();\n    }\n    \n    // Solution using a min-heap\n    public int findKthLargestWithMinHeap(int[] nums, int k) {\n        if (k < 1 || k > nums.length) {\n            throw new IllegalArgumentException(\"Invalid k value\");\n        }\n        \n        // Create a min heap of size k\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);\n        \n        // Process the first k elements\n        for (int i = 0; i < k; i++) {\n            minHeap.offer(nums[i]);\n        }\n        \n        // Process the remaining elements\n        for (int i = k; i < nums.length; i++) {\n            if (nums[i] > minHeap.peek()) {\n                minHeap.poll();\n                minHeap.offer(nums[i]);\n            }\n        }\n        \n        // The root is the kth largest element\n        return minHeap.peek();\n    }\n}\n```\nTime Complexity:\n- Max-heap approach: O(n + k log n) - O(n) to build the heap, then O(k log n) to extract k elements\n- Min-heap approach: O(k + (n-k) log k) - O(k) to build initial heap of size k, then O((n-k) log k) to process remaining elements\n\nSpace Complexity:\n- Max-heap approach: O(n) - stores all elements\n- Min-heap approach: O(k) - only stores k elements\n\nWhen k is much smaller than n, the min-heap approach is more efficient in both time and space. The min-heap solution only keeps track of the k largest elements seen so far, requiring just O(k) space instead of O(n), and the time complexity becomes dominated by the O(n log k) term, which is better than O(n log n) when k is small."
    }
  ],
  
  quiz: [
    {
      id: "hs-quiz-1",
      question: "What is the time complexity of building a heap from an array using the bottom-up approach?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Building a heap from an array using the bottom-up approach has a time complexity of O(n), not O(n log n) as might be expected. This is because the heapify operation takes less time for nodes close to the leaves, and a mathematical analysis shows that the total work sums to linear time."
    },
    {
      id: "hs-quiz-2",
      question: "Which of the following sorting algorithms has the same worst-case time complexity as Heap Sort?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort has the same worst-case time complexity as Heap Sort, which is O(n log n). Quick Sort can degrade to O(n²) in the worst case, while Bubble Sort and Insertion Sort are O(n²) algorithms for both average and worst cases."
    },
    {
      id: "hs-quiz-3",
      question: "What is the space complexity of Heap Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 0,
      explanation: "Heap Sort has a space complexity of O(1) because it is an in-place sorting algorithm. It doesn't require any extra space proportional to the input size, unlike Merge Sort which requires O(n) additional space."
    },
    {
      id: "hs-quiz-4",
      question: "Is Heap Sort a stable sorting algorithm?",
      options: ["Yes", "No", "It depends on the implementation", "Only for positive numbers"],
      correctAnswer: 1,
      explanation: "No, Heap Sort is not a stable sorting algorithm. It does not preserve the relative order of equal elements because the heapify process can change the order of equal elements based on their position in the array."
    },
    {
      id: "hs-quiz-5",
      question: "Which data structure is primarily used in the implementation of Heap Sort?",
      options: ["Linked List", "Binary Heap", "Hash Table", "Binary Search Tree"],
      correctAnswer: 1,
      explanation: "Heap Sort primarily uses a Binary Heap data structure. Specifically, it uses a max-heap for sorting in ascending order or a min-heap for sorting in descending order."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to deepen your understanding of heaps and Heap Sort. These exercises will help you apply heap operations to solve various algorithmic challenges efficiently.",
    questions: {
      easy: [
        {
          id: "last-stone-weight",
          title: "Last Stone Weight",
          link: "https://leetcode.com/problems/last-stone-weight/",
          description: "Smash stones together according to weight, using a max heap to always select the heaviest stones."
        },
        {
          id: "kth-largest-element-in-a-stream",
          title: "Kth Largest Element in a Stream",
          link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
          description: "Maintain a min heap of size k to efficiently track the kth largest element in a stream."
        },
        {
          id: "relative-ranks",
          title: "Relative Ranks",
          link: "https://leetcode.com/problems/relative-ranks/",
          description: "Assign ranks to athletes based on their scores, which can be efficiently solved using a heap."
        },
        {
          id: "sort-array-by-increasing-frequency",
          title: "Sort Array by Increasing Frequency",
          link: "https://leetcode.com/problems/sort-array-by-increasing-frequency/",
          description: "Sort elements by frequency and value, which can be accomplished using a heap with custom comparator."
        }
      ],
      medium: [
        {
          id: "k-closest-points-to-origin",
          title: "K Closest Points to Origin",
          link: "https://leetcode.com/problems/k-closest-points-to-origin/",
          description: "Find the k points closest to the origin using a max heap to maintain the k closest points."
        },
        {
          id: "kth-largest-element-in-an-array",
          title: "Kth Largest Element in an Array",
          link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          description: "Find the kth largest element in an unsorted array, which can be solved efficiently using a heap."
        },
        {
          id: "top-k-frequent-elements",
          title: "Top K Frequent Elements",
          link: "https://leetcode.com/problems/top-k-frequent-elements/",
          description: "Find the k most frequent elements in an array using a heap to track frequencies."
        },
        {
          id: "sort-characters-by-frequency",
          title: "Sort Characters By Frequency",
          link: "https://leetcode.com/problems/sort-characters-by-frequency/",
          description: "Sort characters in a string by decreasing frequency, efficiently implemented using a heap."
        }
      ],
      hard: [
        {
          id: "find-median-from-data-stream",
          title: "Find Median from Data Stream",
          link: "https://leetcode.com/problems/find-median-from-data-stream/",
          description: "Design a data structure that supports finding the median of a stream of numbers using two heaps."
        },
        {
          id: "sliding-window-median",
          title: "Sliding Window Median",
          link: "https://leetcode.com/problems/sliding-window-median/",
          description: "Find the median in a sliding window of a specified size, using two heaps to track elements efficiently."
        }
      ]
    }
  }
};

export default heapSortContent; 