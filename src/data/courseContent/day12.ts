import { Content } from '@/types/course';

const queueFIFOContent: Content = {
  introduction: "A queue is a fundamental data structure that follows the First-In-First-Out (FIFO) principle. Unlike stacks where the last element added is the first one to be removed, in queues, the first element added is the first one to be removed. Queues are analogous to real-life queues or lines, where people join at the end and leave from the front. Queues are widely used in various applications such as task scheduling, breadth-first search, handling requests in web servers, and implementing buffers in hardware and software.",
  
  learningObjectives: [
    "Understand the queue data structure and its FIFO (First-In-First-Out) principle",
    "Implement a queue using arrays and linked lists",
    "Apply queues to solve common algorithmic problems",
    "Recognize scenarios where queues provide optimal solutions"
  ],
  
  sections: [
    {
      title: "Queue Implementation",
      content: "A queue can be implemented using arrays or linked lists. While arrays provide better cache locality, linked lists allow for easier resizing. Here, we'll explore both implementations along with their strengths and weaknesses.",
      codeExamples: [
        {
          language: "java",
          code: `// Array-based Queue implementation
class ArrayQueue {
    private int[] array;
    private int front;  // Index of the front element
    private int rear;   // Index where the next element will be inserted
    private int size;   // Current number of elements
    private int capacity;  // Maximum capacity
    
    // Constructor
    public ArrayQueue(int capacity) {
        this.array = new int[capacity];
        this.capacity = capacity;
        this.front = 0;
        this.rear = 0;
        this.size = 0;
    }
    
    // Add an element to the rear of the queue
    public void enqueue(int item) {
        if (isFull()) {
            throw new RuntimeException("Queue is full");
        }
        
        array[rear] = item;
        rear = (rear + 1) % capacity;  // Circular increment
        size++;
    }
    
    // Remove and return the element from the front of the queue
    public int dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        
        int item = array[front];
        front = (front + 1) % capacity;  // Circular increment
        size--;
        return item;
    }
    
    // Return the front element without removing it
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        
        return array[front];
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Check if queue is full
    public boolean isFull() {
        return size == capacity;
    }
    
    // Get the current size of the queue
    public int size() {
        return size;
    }
}`,
          explanation: "This is an array-based implementation of a queue using a circular array. We maintain front and rear pointers and use modulo arithmetic to wrap around the array, effectively reusing the space. This avoids the issue of running out of space when items are dequeued from the front."
        },
        {
          language: "java",
          code: `// Linked list-based Queue implementation
class Node {
    int data;
    Node next;
    
    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    private Node front;  // Front of the queue
    private Node rear;   // Rear of the queue
    private int size;    // Current number of elements
    
    // Constructor
    public LinkedListQueue() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }
    
    // Add an element to the rear of the queue
    public void enqueue(int data) {
        Node newNode = new Node(data);
        
        // If queue is empty, both front and rear point to new node
        if (isEmpty()) {
            front = newNode;
        } else {
            // Otherwise, add new node at the rear and update rear
            rear.next = newNode;
        }
        
        rear = newNode;
        size++;
    }
    
    // Remove and return the element from the front of the queue
    public int dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        
        int data = front.data;
        front = front.next;
        
        // If front becomes null, the queue is empty, so set rear to null as well
        if (front == null) {
            rear = null;
        }
        
        size--;
        return data;
    }
    
    // Return the front element without removing it
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        
        return front.data;
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return front == null;
    }
    
    // Get the current size of the queue
    public int size() {
        return size;
    }
}`,
          explanation: "This is a linked list-based implementation of a queue. We maintain references to both the front and rear of the queue for O(1) enqueue and dequeue operations. The linked list implementation doesn't have a fixed size limit like the array-based one."
        }
      ]
    },
    {
      title: "Using Java's Queue Interface",
      content: "Java provides several implementations of the Queue interface, such as LinkedList, ArrayDeque, and PriorityQueue. Here, we'll focus on LinkedList and ArrayDeque for standard FIFO queue operations.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Queue;
import java.util.LinkedList;
import java.util.ArrayDeque;

public class QueueDemo {
    public static void main(String[] args) {
        // Using LinkedList as a Queue
        Queue<Integer> queue1 = new LinkedList<>();
        
        // Adding elements (enqueue)
        queue1.add(10);  // Throws exception if queue is full
        queue1.offer(20); // Returns false if queue is full
        queue1.add(30);
        
        System.out.println("Queue 1: " + queue1);
        
        // Removing elements (dequeue)
        int removed = queue1.remove(); // Throws exception if queue is empty
        System.out.println("Removed: " + removed);
        
        Integer polled = queue1.poll(); // Returns null if queue is empty
        System.out.println("Polled: " + polled);
        
        // Examining the front element
        int element = queue1.element(); // Throws exception if queue is empty
        System.out.println("Front element: " + element);
        
        // Using ArrayDeque as a Queue (more efficient)
        Queue<Integer> queue2 = new ArrayDeque<>();
        queue2.offer(10);
        queue2.offer(20);
        queue2.offer(30);
        
        System.out.println("Queue 2: " + queue2);
        System.out.println("Size of Queue 2: " + queue2.size());
        
        // Processing a queue
        while (!queue2.isEmpty()) {
            System.out.println("Processing: " + queue2.poll());
        }
    }
}`,
          explanation: "This example demonstrates how to use Java's Queue interface with LinkedList and ArrayDeque implementations. The Queue interface provides methods for adding (add, offer), removing (remove, poll), and examining (element, peek) elements. ArrayDeque is generally more efficient than LinkedList for queue operations."
        }
      ]
    },
    {
      title: "Applications of Queues",
      content: "Queues have numerous applications in computer science and software engineering. One of the most common applications is in breadth-first search (BFS) for traversing graphs or trees. Other applications include task scheduling, handling requests in servers, and implementing buffers.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.LinkedList;
import java.util.Queue;

// Example: Level Order Traversal of a Binary Tree using a Queue
class TreeNode {
    int data;
    TreeNode left;
    TreeNode right;
    
    public TreeNode(int data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

public class LevelOrderTraversal {
    public static void levelOrder(TreeNode root) {
        if (root == null) return;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            // Process the current level
            int levelSize = queue.size();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                System.out.print(current.data + " ");
                
                // Add the next level nodes to the queue
                if (current.left != null) {
                    queue.add(current.left);
                }
                if (current.right != null) {
                    queue.add(current.right);
                }
            }
            
            // Print a new line after each level
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(7);
        
        System.out.println("Level Order Traversal:");
        levelOrder(root);
        /* Output:
           1 
           2 3 
           4 5 6 7 
        */
    }
}`,
          explanation: "This example demonstrates how to use a queue for level order traversal (breadth-first traversal) of a binary tree. We start by adding the root to the queue and then process nodes level by level. For each node, we print its value and add its children to the queue for future processing."
        },
        {
          language: "java",
          code: `import java.util.LinkedList;
import java.util.Queue;

// Example: Implementing a simple task scheduler with a queue
class Task {
    private String name;
    private int priority;
    
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
    public String toString() {
        return name + " (priority: " + priority + ")";
    }
}

public class TaskScheduler {
    private Queue<Task> taskQueue;
    
    public TaskScheduler() {
        taskQueue = new LinkedList<>();
    }
    
    // Add a task to the scheduler
    public void scheduleTask(Task task) {
        taskQueue.offer(task);
        System.out.println("Task scheduled: " + task);
    }
    
    // Execute the next task
    public void executeNextTask() {
        if (taskQueue.isEmpty()) {
            System.out.println("No tasks to execute");
            return;
        }
        
        Task task = taskQueue.poll();
        System.out.println("Executing task: " + task);
        // Simulate task execution
        try {
            Thread.sleep(1000); // Simulate work for 1 second
            System.out.println("Task completed: " + task.getName());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    // Get the number of pending tasks
    public int getPendingTaskCount() {
        return taskQueue.size();
    }
    
    public static void main(String[] args) {
        TaskScheduler scheduler = new TaskScheduler();
        
        // Schedule some tasks
        scheduler.scheduleTask(new Task("Parse log file", 3));
        scheduler.scheduleTask(new Task("Send email notifications", 2));
        scheduler.scheduleTask(new Task("Generate report", 1));
        
        System.out.println("Pending tasks: " + scheduler.getPendingTaskCount());
        
        // Execute all tasks
        while (scheduler.getPendingTaskCount() > 0) {
            scheduler.executeNextTask();
        }
    }
}`,
          explanation: "This example shows how to implement a simple task scheduler using a queue. Tasks are added to the queue and executed in FIFO order. This is a simplified version of how many real-world job scheduling systems work."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "queue-hw-1",
      question: "Implement a Circular Queue using an array. It should support enqueue, dequeue, isEmpty, isFull, and size operations.",
      solution: "```java\npublic class CircularQueue {\n    private int[] array;\n    private int front;\n    private int rear;\n    private int size;\n    private int capacity;\n    \n    public CircularQueue(int capacity) {\n        this.array = new int[capacity];\n        this.capacity = capacity;\n        this.front = 0;\n        this.rear = 0;\n        this.size = 0;\n    }\n    \n    public boolean enqueue(int item) {\n        if (isFull()) {\n            return false; // Queue is full\n        }\n        \n        array[rear] = item;\n        rear = (rear + 1) % capacity;\n        size++;\n        return true;\n    }\n    \n    public Integer dequeue() {\n        if (isEmpty()) {\n            return null; // Queue is empty\n        }\n        \n        int item = array[front];\n        front = (front + 1) % capacity;\n        size--;\n        return item;\n    }\n    \n    public Integer peek() {\n        if (isEmpty()) {\n            return null; // Queue is empty\n        }\n        \n        return array[front];\n    }\n    \n    public boolean isEmpty() {\n        return size == 0;\n    }\n    \n    public boolean isFull() {\n        return size == capacity;\n    }\n    \n    public int size() {\n        return size;\n    }\n    \n    public static void main(String[] args) {\n        CircularQueue queue = new CircularQueue(5);\n        \n        // Test enqueue\n        queue.enqueue(1);\n        queue.enqueue(2);\n        queue.enqueue(3);\n        \n        // Test peek and size\n        System.out.println(\"Front element: \" + queue.peek());  // Expected: 1\n        System.out.println(\"Queue size: \" + queue.size());    // Expected: 3\n        \n        // Test dequeue\n        System.out.println(\"Dequeued: \" + queue.dequeue());   // Expected: 1\n        System.out.println(\"Dequeued: \" + queue.dequeue());   // Expected: 2\n        \n        // Test circular behavior\n        queue.enqueue(4);\n        queue.enqueue(5);\n        queue.enqueue(6);\n        queue.enqueue(7);  // This should fail as queue is full\n        \n        System.out.println(\"Queue size after circular enqueue: \" + queue.size()); // Expected: 5\n        \n        // Dequeue all remaining elements\n        while (!queue.isEmpty()) {\n            System.out.println(\"Dequeued: \" + queue.dequeue());\n        }\n        \n        // Test dequeue on empty queue\n        System.out.println(\"Dequeued from empty queue: \" + queue.dequeue()); // Expected: null\n    }\n}\n```\nThis implementation uses a circular array to efficiently implement a queue. The front and rear indices wrap around when they reach the end of the array, allowing us to reuse space. The time complexity for both enqueue and dequeue operations is O(1)."
    },
    {
      id: "queue-hw-2",
      question: "Implement a function to reverse the first K elements of a queue while keeping the order of remaining elements the same. For example, if a queue contains [1, 2, 3, 4, 5, 6, 7, 8] and K=5, the result should be [5, 4, 3, 2, 1, 6, 7, 8].",
      solution: "```java\nimport java.util.Queue;\nimport java.util.LinkedList;\nimport java.util.Stack;\n\npublic class ReverseFirstKElements {\n    public static void reverseFirstK(Queue<Integer> queue, int k) {\n        if (queue == null || queue.isEmpty() || k <= 0 || k > queue.size()) {\n            return; // Invalid input\n        }\n        \n        // Step 1: Dequeue the first K elements and push them onto a stack\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < k; i++) {\n            stack.push(queue.poll());\n        }\n        \n        // Step 2: Pop elements from the stack and enqueue them back to the queue\n        while (!stack.isEmpty()) {\n            queue.offer(stack.pop());\n        }\n        \n        // Step 3: Dequeue the remaining (size-k) elements and enqueue them back\n        for (int i = 0; i < queue.size() - k; i++) {\n            queue.offer(queue.poll());\n        }\n    }\n    \n    public static void main(String[] args) {\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 1; i <= 8; i++) {\n            queue.offer(i);\n        }\n        \n        System.out.println(\"Original queue: \" + queue);\n        \n        int k = 5;\n        reverseFirstK(queue, k);\n        \n        System.out.println(\"After reversing first \" + k + \" elements: \" + queue);\n        // Expected output: [5, 4, 3, 2, 1, 6, 7, 8]\n    }\n}\n```\nThis solution uses a stack to reverse the first K elements of the queue. We first dequeue the first K elements and push them onto a stack, which reverses their order. Then, we pop the elements from the stack and enqueue them back into the queue. Finally, we move the remaining elements to their correct positions. The time complexity is O(n) where n is the size of the queue, and the space complexity is O(k) for the stack."
    }
  ],
  
  quiz: [
    {
      id: "queue-quiz-1",
      question: "What is the key characteristic of a queue data structure?",
      options: ["Last-In-First-Out (LIFO)", "First-In-First-Out (FIFO)", "Random access of elements", "Priority-based access"],
      correctAnswer: 1,
      explanation: "A queue follows the First-In-First-Out (FIFO) principle, where the first element added is the first one to be removed, similar to people waiting in a real-life queue."
    },
    {
      id: "queue-quiz-2",
      question: "Which of the following is NOT an application of queues?",
      options: ["Breadth-first search", "CPU task scheduling", "Undo-redo functionality", "Print job spooling"],
      correctAnswer: 2,
      explanation: "Undo-redo functionality typically uses stacks (LIFO) rather than queues, as the most recent action is the first to be undone. The other options—breadth-first search, CPU task scheduling, and print job spooling—are common applications of queues."
    },
    {
      id: "queue-quiz-3",
      question: "In Java's Queue interface, which method is used to add an element without throwing an exception if the queue is full?",
      options: ["add()", "put()", "offer()", "push()"],
      correctAnswer: 2,
      explanation: "The offer() method is used to add an element to a queue without throwing an exception if the queue is full. It returns false if the element cannot be added. In contrast, add() throws an exception if the queue is full."
    },
    {
      id: "queue-quiz-4",
      question: "What is the time complexity of enqueue and dequeue operations in a well-implemented queue?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "In a well-implemented queue (using either a linked list or a circular array), both enqueue and dequeue operations have O(1) time complexity, meaning they take constant time regardless of the size of the queue."
    },
    {
      id: "queue-quiz-5",
      question: "What problem can occur in a simple array-based queue implementation without using a circular array?",
      options: ["Overflow", "Underflow", "Memory leak", "Queue overflow even when there is empty space at the front"],
      correctAnswer: 3,
      explanation: "In a simple array-based queue without circular implementation, after several dequeue operations, the front of the queue shifts toward the end of the array. Even if elements are removed from the front, new elements cannot be added once the rear reaches the end of the array, causing 'queue overflow' despite having empty spaces at the front of the array."
    }
  ]
};

export default queueFIFOContent; 