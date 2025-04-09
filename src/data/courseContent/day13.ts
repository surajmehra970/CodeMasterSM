import { Content } from '@/types/course';

const priorityQueueContent: Content = {
  introduction: "A Priority Queue is an abstract data type similar to a regular queue, but where each element has a priority associated with it. Elements with higher priorities are dequeued before elements with lower priorities. In case of equal priorities, elements are served according to their order in the queue. Priority queues are commonly implemented using a data structure called a Heap, specifically a Binary Heap, which provides efficient operations for inserting elements and retrieving the highest (or lowest) priority element.",
  
  learningObjectives: [
    "Understand the concept of priority queues and their applications",
    "Learn the implementation of binary heaps (min-heap and max-heap)",
    "Master operations like insertion, deletion, and peek in priority queues",
    "Apply priority queues to solve common algorithmic problems"
  ],
  
  sections: [
    {
      title: "Priority Queue Basics",
      content: "A priority queue is a queue where each element has an associated priority, and elements are served based on their priority rather than insertion order. The two most common types are min-priority queues (the element with the smallest priority value is dequeued first) and max-priority queues (the element with the largest priority value is dequeued first).",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.PriorityQueue;
import java.util.Collections;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        // Min Priority Queue (default in Java)
        PriorityQueue<Integer> minPQ = new PriorityQueue<>();
        
        // Add elements
        minPQ.add(5);
        minPQ.add(2);
        minPQ.add(8);
        minPQ.add(1);
        
        System.out.println("Min Priority Queue: " + minPQ); // Not necessarily sorted in output
        
        // Poll elements (will come out in ascending order)
        System.out.println("Polling from Min PQ:");
        while (!minPQ.isEmpty()) {
            System.out.println(minPQ.poll());
        }
        
        // Max Priority Queue (using Collections.reverseOrder())
        PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
        
        // Add elements
        maxPQ.add(5);
        maxPQ.add(2);
        maxPQ.add(8);
        maxPQ.add(1);
        
        System.out.println("Max Priority Queue: " + maxPQ); // Not necessarily sorted in output
        
        // Poll elements (will come out in descending order)
        System.out.println("Polling from Max PQ:");
        while (!maxPQ.isEmpty()) {
            System.out.println(maxPQ.poll());
        }
    }
}`,
          explanation: "This example demonstrates how to create and use both min-priority queues and max-priority queues in Java. The PriorityQueue class in Java implements a min-priority queue by default, meaning the smallest element has the highest priority. To create a max-priority queue, we use Collections.reverseOrder() as the comparator."
        }
      ]
    },
    {
      title: "Binary Heap Implementation",
      content: "A binary heap is a complete binary tree that satisfies the heap property. In a max heap, for any given node, the value of the node is greater than or equal to the values of its children. In a min heap, the value of the node is less than or equal to the values of its children. Binary heaps can be efficiently implemented using arrays, where for a node at index i, its left child is at index 2i+1, its right child is at index 2i+2, and its parent is at index (i-1)/2.",
      codeExamples: [
        {
          language: "java",
          code: `// Binary Min Heap implementation
class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;
    
    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }
    
    // Helper methods to get parent, left child, and right child indices
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    // Helper method to swap two elements
    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    // Insert a new element into the heap
    public void insert(int key) {
        if (size == capacity) {
            System.out.println("Heap is full");
            return;
        }
        
        // Insert the new key at the end
        size++;
        int i = size - 1;
        heap[i] = key;
        
        // Fix the min heap property if it is violated
        // by moving the element up as needed
        while (i != 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    // Extract (remove and return) the minimum element
    public int extractMin() {
        if (size <= 0) {
            return Integer.MAX_VALUE;
        }
        
        if (size == 1) {
            size--;
            return heap[0];
        }
        
        // Store the minimum value, and remove it from heap
        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        
        // Restore the heap property
        heapify(0);
        
        return root;
    }
    
    // A recursive method to heapify a subtree with the root at given index
    private void heapify(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        // Find the smallest among root, left child, and right child
        if (left < size && heap[left] < heap[smallest])
            smallest = left;
        
        if (right < size && heap[right] < heap[smallest])
            smallest = right;
        
        // If the smallest is not the root
        if (smallest != i) {
            swap(i, smallest);
            // Recursively heapify the affected sub-tree
            heapify(smallest);
        }
    }
    
    // Get the minimum element without removing it
    public int getMin() {
        if (size <= 0) {
            return Integer.MAX_VALUE;
        }
        return heap[0];
    }
    
    // Print the heap
    public void printHeap() {
        System.out.print("Heap: ");
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }
}

public class MinHeapDemo {
    public static void main(String[] args) {
        MinHeap minHeap = new MinHeap(10);
        
        minHeap.insert(3);
        minHeap.insert(2);
        minHeap.insert(15);
        minHeap.insert(5);
        minHeap.insert(4);
        minHeap.insert(45);
        
        minHeap.printHeap(); // Should print the array representation of the heap
        
        System.out.println("Min element: " + minHeap.getMin());
        
        System.out.println("Extracting elements from the heap:");
        while (minHeap.getMin() != Integer.MAX_VALUE) {
            System.out.println(minHeap.extractMin());
        }
    }
}`,
          explanation: "This example demonstrates how to implement a binary min heap from scratch using an array. The key operations include insertion (adding an element to the heap while maintaining the heap property) and extraction (removing and returning the minimum element). The heapify operation is used to restore the heap property after removal. Time complexity for insertion and extraction is O(log n)."
        }
      ]
    },
    {
      title: "Priority Queue with Custom Objects",
      content: "Priority queues can also be used with custom objects by implementing a comparable interface or providing a custom comparator. This is particularly useful in real-world applications where we need to prioritize complex objects.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.PriorityQueue;
import java.util.Comparator;

// Task class for scheduling tasks based on priority
class Task implements Comparable<Task> {
    private String name;
    private int priority;  // Lower number means higher priority
    
    public Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
    
    public String getName() {
        return name;
    }
    
    public int getPriority() {
        return priority;
    }
    
    @Override
    public int compareTo(Task other) {
        // Compare based on priority (ascending order)
        return this.priority - other.priority;
    }
    
    @Override
    public String toString() {
        return name + " (priority: " + priority + ")";
    }
}

// Patient class for a hospital waiting room
class Patient {
    private String name;
    private int emergencyLevel;  // 1 (critical) to 5 (non-urgent)
    
    public Patient(String name, int emergencyLevel) {
        this.name = name;
        this.emergencyLevel = emergencyLevel;
    }
    
    public String getName() {
        return name;
    }
    
    public int getEmergencyLevel() {
        return emergencyLevel;
    }
    
    @Override
    public String toString() {
        return name + " (emergency level: " + emergencyLevel + ")";
    }
}

public class CustomPriorityQueueDemo {
    public static void main(String[] args) {
        // Task priority queue using Comparable
        PriorityQueue<Task> taskQueue = new PriorityQueue<>();
        
        taskQueue.add(new Task("Update database", 2));
        taskQueue.add(new Task("Fix critical bug", 1));
        taskQueue.add(new Task("Write documentation", 3));
        
        System.out.println("Task Queue: ");
        while (!taskQueue.isEmpty()) {
            System.out.println(taskQueue.poll());
        }
        
        // Patient priority queue using a custom Comparator
        PriorityQueue<Patient> emergencyRoom = new PriorityQueue<>(
            new Comparator<Patient>() {
                @Override
                public int compare(Patient p1, Patient p2) {
                    // Sort by emergency level (ascending)
                    return p1.getEmergencyLevel() - p2.getEmergencyLevel();
                }
            }
        );
        
        // Using lambda expression for the comparator (Java 8+)
        // PriorityQueue<Patient> emergencyRoom = new PriorityQueue<>(
        //     (p1, p2) -> p1.getEmergencyLevel() - p2.getEmergencyLevel()
        // );
        
        emergencyRoom.add(new Patient("John", 3));
        emergencyRoom.add(new Patient("Sarah", 1));
        emergencyRoom.add(new Patient("Mike", 4));
        emergencyRoom.add(new Patient("Emily", 2));
        
        System.out.println("\nEmergency Room Queue: ");
        while (!emergencyRoom.isEmpty()) {
            System.out.println(emergencyRoom.poll());
        }
    }
}`,
          explanation: "This example shows how to use priority queues with custom objects. The Task class implements the Comparable interface to define its natural ordering based on priority. For the Patient class, we provide a custom Comparator to the PriorityQueue constructor to define how patients should be ordered based on their emergency level. Both approaches allow us to prioritize elements according to our specific requirements."
        }
      ]
    },
    {
      title: "Applications of Priority Queues",
      content: "Priority queues are used in many algorithms and applications, including Dijkstra's shortest path algorithm, Prim's minimum spanning tree algorithm, Huffman coding for data compression, and operating system task scheduling. They're also used in event-driven simulations, where events need to be processed in order of their scheduled time.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.PriorityQueue;
import java.util.Arrays;

public class PriorityQueueApplications {
    
    // Dijkstra's algorithm for finding the shortest path
    // This is a simplified version that only computes the shortest distances
    public static int[] dijkstra(int[][] graph, int source) {
        int n = graph.length;
        
        // Distances from source to each vertex
        int[] dist = new int[n];
        // Initialize all distances as INFINITE
        Arrays.fill(dist, Integer.MAX_VALUE);
        // Distance to source is 0
        dist[source] = 0;
        
        // Priority queue to store vertices that need to be processed
        // The comparator orders vertices by their distance values
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (v1, v2) -> dist[v1] - dist[v2]
        );
        
        // Add source to pq
        pq.add(source);
        
        while (!pq.isEmpty()) {
            // Extract the vertex with minimum distance
            int u = pq.poll();
            
            // For all adjacent vertices of u
            for (int v = 0; v < n; v++) {
                // If there's an edge from u to v
                if (graph[u][v] != 0) {
                    // If there's a shorter path to v through u
                    if (dist[u] != Integer.MAX_VALUE && 
                        dist[u] + graph[u][v] < dist[v]) {
                        // Update distance of v
                        dist[v] = dist[u] + graph[u][v];
                        // Add v to the priority queue
                        pq.add(v);
                    }
                }
            }
        }
        
        return dist;
    }
    
    // K closest points to origin
    public static int[][] kClosest(int[][] points, int k) {
        // Priority queue with custom comparator based on distance to origin
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (p1, p2) -> p2[0] * p2[0] + p2[1] * p2[1] - p1[0] * p1[0] - p1[1] * p1[1]
        );
        
        // Add points to the queue, keeping only the k closest
        for (int[] point : points) {
            pq.add(point);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        
        // Convert queue to array
        int[][] result = new int[k][2];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = pq.poll();
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        // Example graph represented as an adjacency matrix
        // graph[i][j] represents the weight of the edge from i to j
        int[][] graph = {
            {0, 4, 0, 0, 0, 0, 0, 8, 0},
            {4, 0, 8, 0, 0, 0, 0, 11, 0},
            {0, 8, 0, 7, 0, 4, 0, 0, 2},
            {0, 0, 7, 0, 9, 14, 0, 0, 0},
            {0, 0, 0, 9, 0, 10, 0, 0, 0},
            {0, 0, 4, 14, 10, 0, 2, 0, 0},
            {0, 0, 0, 0, 0, 2, 0, 1, 6},
            {8, 11, 0, 0, 0, 0, 1, 0, 7},
            {0, 0, 2, 0, 0, 0, 6, 7, 0}
        };
        
        int source = 0;
        int[] shortestDistances = dijkstra(graph, source);
        
        System.out.println("Shortest distances from vertex " + source + ":");
        for (int i = 0; i < shortestDistances.length; i++) {
            System.out.println("To vertex " + i + ": " + shortestDistances[i]);
        }
        
        // Example: Finding k closest points to origin
        int[][] points = {{1, 3}, {-2, 2}, {5, 8}, {0, 1}, {-1, -1}, {3, -3}};
        int k = 3;
        
        int[][] closest = kClosest(points, k);
        
        System.out.println("\n" + k + " closest points to origin:");
        for (int[] point : closest) {
            System.out.println("(" + point[0] + ", " + point[1] + ")");
        }
    }
}`,
          explanation: "This example demonstrates two common applications of priority queues. First, Dijkstra's algorithm for finding the shortest paths in a graph, where the priority queue helps us always process the vertex with the smallest distance first. Second, finding the k closest points to the origin, where we use a max heap to maintain the k closest points we've seen so far."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "pq-hw-1",
      question: "Implement a binary max heap from scratch. Your implementation should support the following operations: insert, extractMax, getMax, and heapify.",
      solution: "```java\npublic class MaxHeap {\n    private int[] heap;\n    private int size;\n    private int capacity;\n    \n    public MaxHeap(int capacity) {\n        this.capacity = capacity;\n        this.size = 0;\n        this.heap = new int[capacity];\n    }\n    \n    // Helper methods\n    private int parent(int i) { return (i - 1) / 2; }\n    private int leftChild(int i) { return 2 * i + 1; }\n    private int rightChild(int i) { return 2 * i + 2; }\n    \n    private void swap(int i, int j) {\n        int temp = heap[i];\n        heap[i] = heap[j];\n        heap[j] = temp;\n    }\n    \n    // Insert a new element into the heap\n    public void insert(int key) {\n        if (size == capacity) {\n            System.out.println(\"Heap is full\");\n            return;\n        }\n        \n        // Insert the new key at the end\n        size++;\n        int i = size - 1;\n        heap[i] = key;\n        \n        // Fix the max heap property if it is violated\n        // by moving the element up as needed\n        while (i != 0 && heap[parent(i)] < heap[i]) {\n            swap(i, parent(i));\n            i = parent(i);\n        }\n    }\n    \n    // Extract (remove and return) the maximum element\n    public int extractMax() {\n        if (size <= 0) {\n            return Integer.MIN_VALUE;\n        }\n        \n        if (size == 1) {\n            size--;\n            return heap[0];\n        }\n        \n        // Store the maximum value, and remove it from heap\n        int root = heap[0];\n        heap[0] = heap[size - 1];\n        size--;\n        \n        // Restore the heap property\n        heapify(0);\n        \n        return root;\n    }\n    \n    // A recursive method to heapify a subtree with the root at given index\n    public void heapify(int i) {\n        int largest = i;\n        int left = leftChild(i);\n        int right = rightChild(i);\n        \n        // Find the largest among root, left child, and right child\n        if (left < size && heap[left] > heap[largest])\n            largest = left;\n        \n        if (right < size && heap[right] > heap[largest])\n            largest = right;\n        \n        // If the largest is not the root\n        if (largest != i) {\n            swap(i, largest);\n            // Recursively heapify the affected sub-tree\n            heapify(largest);\n        }\n    }\n    \n    // Get the maximum element without removing it\n    public int getMax() {\n        if (size <= 0) {\n            return Integer.MIN_VALUE;\n        }\n        return heap[0];\n    }\n    \n    // Print the heap\n    public void printHeap() {\n        System.out.print(\"Heap: \");\n        for (int i = 0; i < size; i++) {\n            System.out.print(heap[i] + \" \");\n        }\n        System.out.println();\n    }\n    \n    public static void main(String[] args) {\n        MaxHeap maxHeap = new MaxHeap(10);\n        \n        maxHeap.insert(3);\n        maxHeap.insert(2);\n        maxHeap.insert(15);\n        maxHeap.insert(5);\n        maxHeap.insert(4);\n        maxHeap.insert(45);\n        \n        maxHeap.printHeap();\n        \n        System.out.println(\"Max element: \" + maxHeap.getMax());\n        \n        System.out.println(\"Extracting elements from the heap:\");\n        while (maxHeap.getMax() != Integer.MIN_VALUE) {\n            System.out.println(maxHeap.extractMax());\n        }\n    }\n}\n```\nThis implementation of a max heap has the following time complexities:\n- insert: O(log n)\n- extractMax: O(log n)\n- getMax: O(1)\n- heapify: O(log n)"
    },
    {
      id: "pq-hw-2",
      question: "Implement a solution to find the kth largest element in an unsorted array using a priority queue. For example, in the array [3, 2, 1, 5, 6, 4] and k = 2, the kth largest element is 5.",
      solution: "```java\nimport java.util.PriorityQueue;\n\npublic class KthLargestElement {\n    public static int findKthLargest(int[] nums, int k) {\n        // Min heap approach - maintain a heap of size k\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        \n        for (int num : nums) {\n            // Add current element to the heap\n            minHeap.offer(num);\n            \n            // If heap size exceeds k, remove the smallest element\n            if (minHeap.size() > k) {\n                minHeap.poll();\n            }\n        }\n        \n        // The root of the heap is the kth largest element\n        return minHeap.peek();\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {3, 2, 1, 5, 6, 4};\n        int k = 2;\n        \n        int kthLargest = findKthLargest(nums, k);\n        System.out.println(\"The \" + k + \"th largest element is: \" + kthLargest);\n        \n        // Test with another example\n        int[] nums2 = {7, 6, 5, 4, 3, 2, 1};\n        k = 3;\n        kthLargest = findKthLargest(nums2, k);\n        System.out.println(\"The \" + k + \"th largest element is: \" + kthLargest);\n    }\n}\n```\nThis solution uses a min heap to find the kth largest element with O(n log k) time complexity and O(k) space complexity. The approach is to maintain a min heap of size k. As we process each element, we add it to the heap. If the heap size exceeds k, we remove the smallest element. After processing all elements, the heap will contain the k largest elements, with the kth largest at the root."
    }
  ],
  
  quiz: [
    {
      id: "pq-quiz-1",
      question: "What is the time complexity of extracting the minimum (or maximum) element from a binary heap-based priority queue?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "The time complexity for extracting the minimum (or maximum) element from a binary heap is O(log n). This is because after removing the root element, we need to restore the heap property, which requires at most the height of the tree operations, and the height of a complete binary tree with n nodes is log n."
    },
    {
      id: "pq-quiz-2",
      question: "In Java's PriorityQueue class, what is the default ordering?",
      options: ["Maximum element first", "Minimum element first", "Elements ordered by insertion time", "Random order"],
      correctAnswer: 1,
      explanation: "The default ordering in Java's PriorityQueue is minimum element first (a min-priority queue). This means that when you poll() from the queue, you get the smallest element according to the natural ordering of the elements or the provided comparator."
    },
    {
      id: "pq-quiz-3",
      question: "Which of the following is NOT an application of priority queues?",
      options: ["Dijkstra's shortest path algorithm", "Task scheduling in operating systems", "Binary search algorithm", "Huffman coding for data compression"],
      correctAnswer: 2,
      explanation: "Binary search does not use priority queues; it operates on sorted arrays by repeatedly dividing the search interval in half. The other options—Dijkstra's algorithm, task scheduling, and Huffman coding—all commonly utilize priority queues."
    },
    {
      id: "pq-quiz-4",
      question: "What data structure is typically used to implement efficient priority queues?",
      options: ["Linked List", "Hash Table", "Binary Heap", "Balanced Binary Search Tree"],
      correctAnswer: 2,
      explanation: "Binary Heaps are most commonly used to implement efficient priority queues because they provide O(log n) time complexity for insertion and deletion operations, and O(1) for finding the minimum/maximum element. While balanced binary search trees can also be used, heaps are simpler and usually more efficient for priority queue operations."
    },
    {
      id: "pq-quiz-5",
      question: "If you want to create a max-priority queue in Java using the PriorityQueue class, what would you need to do?",
      options: ["Set a flag in the constructor", "Use a different class called MaxPriorityQueue", "Provide a custom comparator that reverses the natural ordering", "It's not possible; you need to implement your own class"],
      correctAnswer: 2,
      explanation: "To create a max-priority queue in Java, you need to provide a custom comparator that reverses the natural ordering. This can be done using Collections.reverseOrder() as the comparator when creating the PriorityQueue, e.g., new PriorityQueue<>(Collections.reverseOrder())."
    }
  ]
};

export default priorityQueueContent; 