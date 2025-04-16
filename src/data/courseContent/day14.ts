import { Content } from '@/types/course';

const mockTestWeek2Content: Content = {
  introduction: "Welcome to the Week 2 Mock Test! This test covers the topics we've learned in the second week of our DSA journey, focusing on linked lists, stacks, queues, and priority queues. The problems are designed to test your understanding of these data structures and your ability to apply them to solve algorithmic challenges. Remember to analyze the problems carefully, identify the appropriate data structure, and implement an efficient solution.",
  
  learningObjectives: [
    "Apply linked list operations to solve algorithm problems",
    "Utilize stacks effectively for algorithmic challenges",
    "Demonstrate understanding of queue and priority queue applications",
    "Practice problem-solving under time constraints"
  ],
  
  sections: [
    {
      title: "Mock Test Instructions",
      content: "This mock test consists of 4 problems of varying difficulty levels. You should allocate approximately 30-45 minutes per problem. Try to solve each problem independently before checking the solution. Focus on writing correct, efficient, and well-documented code. After completing the test, review your solutions and compare them with the provided solutions to identify areas for improvement.",
      codeExamples: []
    },
    {
      title: "Problem 1: Merge Two Sorted Linked Lists",
      content: "Implement a function to merge two sorted linked lists into a single sorted linked list. You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      codeExamples: [
        {
          language: "java",
          code: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Create a dummy head to simplify the merging process
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;
        
        // Traverse both lists and compare values
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        // Attach any remaining nodes
        if (list1 != null) {
            current.next = list1;
        } else {
            current.next = list2;
        }
        
        return dummy.next;
    }
}`,
          explanation: "This solution uses a dummy head to simplify the merging process. We iterate through both lists simultaneously, comparing the current nodes and adding the smaller one to our result list. After one list is exhausted, we attach any remaining nodes from the other list. The time complexity is O(n + m) where n and m are the lengths of the input lists, and the space complexity is O(1) as we're reusing the existing nodes."
        }
      ]
    },
    {
      title: "Problem 2: Validate Stack Sequences",
      content: "Given two sequences pushed and popped with distinct values, return true if and only if this could have been the result of a sequence of push and pop operations on an initially empty stack. Both pushed and popped arrays have the same length.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Stack;

public class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        Stack<Integer> stack = new Stack<>();
        int j = 0; // Index for popped array
        
        for (int val : pushed) {
            // Push the current element onto the stack
            stack.push(val);
            
            // Check if we can pop elements according to the popped sequence
            while (!stack.isEmpty() && j < popped.length && stack.peek() == popped[j]) {
                stack.pop();
                j++;
            }
        }
        
        // If the stack is empty, we were able to follow the sequences successfully
        return stack.isEmpty();
    }
}`,
          explanation: "This solution simulates the stack operations. We push elements onto a stack according to the 'pushed' sequence. After each push, we check if the top of our stack matches the next element in the 'popped' sequence. If it does, we pop it from our stack and move to the next element in 'popped'. If after processing all elements in 'pushed', our stack is empty, then the sequences are valid. The time and space complexity are both O(n), where n is the length of the arrays."
        }
      ]
    },
    {
      title: "Problem 3: Implement Queue using Stacks",
      content: "Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Stack;

class MyQueue {
    private Stack<Integer> inputStack;
    private Stack<Integer> outputStack;
    
    public MyQueue() {
        inputStack = new Stack<>();
        outputStack = new Stack<>();
    }
    
    // Push element x to the back of queue
    public void push(int x) {
        inputStack.push(x);
    }
    
    // Remove the element from the front of queue and return it
    public int pop() {
        peek(); // Ensure output stack has elements
        return outputStack.pop();
    }
    
    // Get the front element
    public int peek() {
        if (outputStack.isEmpty()) {
            // Transfer all elements from input stack to output stack
            while (!inputStack.isEmpty()) {
                outputStack.push(inputStack.pop());
            }
        }
        
        if (outputStack.isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        
        return outputStack.peek();
    }
    
    // Return whether the queue is empty
    public boolean empty() {
        return inputStack.isEmpty() && outputStack.isEmpty();
    }
}`,
          explanation: "This solution uses two stacks to implement a queue. The 'inputStack' is used for enqueue operations, and the 'outputStack' is used for dequeue operations. When we need to dequeue an element and the outputStack is empty, we transfer all elements from inputStack to outputStack, which reverses their order and allows us to implement FIFO behavior. The amortized time complexity for all operations is O(1), and the space complexity is O(n)."
        }
      ]
    },
    {
      title: "Problem 4: Top K Frequent Elements",
      content: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.*;

public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Count frequency of each number
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Use a min heap to keep track of the k most frequent elements
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(
            (n1, n2) -> frequencyMap.get(n1) - frequencyMap.get(n2)
        );
        
        // Add elements to the heap
        for (int num : frequencyMap.keySet()) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove the least frequent element
            }
        }
        
        // Build the result array
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll();
        }
        
        return result;
    }
}`,
          explanation: "This solution first counts the frequency of each number using a HashMap. Then, it uses a min heap to keep track of the k most frequent elements. We process each unique number and add it to the heap. If the heap size exceeds k, we remove the element with the lowest frequency. Finally, we build our result array from the heap. The time complexity is O(n log k), where n is the length of the input array, and the space complexity is O(n + k) for the frequency map and the heap."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "mock-test-2-hw-1",
      question: "Solve the 'Design a Stack With Increment Operation' problem: Design a stack which supports the following operations: push, pop, top, increment. increment(k, val) increments the bottom k elements of the stack by val.",
      solution: "```java\nclass CustomStack {\n    private int[] stack;\n    private int top;\n    private int maxSize;\n    \n    public CustomStack(int maxSize) {\n        this.stack = new int[maxSize];\n        this.top = -1;\n        this.maxSize = maxSize;\n    }\n    \n    public void push(int x) {\n        if (top < maxSize - 1) {\n            stack[++top] = x;\n        }\n    }\n    \n    public int pop() {\n        if (top == -1) {\n            return -1;\n        }\n        return stack[top--];\n    }\n    \n    public void increment(int k, int val) {\n        int limit = Math.min(k - 1, top);\n        for (int i = 0; i <= limit; i++) {\n            stack[i] += val;\n        }\n    }\n    \n    public int top() {\n        if (top == -1) {\n            return -1;\n        }\n        return stack[top];\n    }\n}\n```\nThis solution uses an array to implement the stack with a fixed maximum size. The push, pop, and top operations are standard. The increment operation increases the values of the bottom k elements (or all elements if k is greater than the stack size) by the given value. The time complexity for push, pop, and top is O(1), while the increment operation is O(k) in the worst case."
    },
    {
      id: "mock-test-2-hw-2",
      question: "Solve the 'Find K Pairs with Smallest Sums' problem: Given two sorted arrays nums1 and nums2 of size m and n respectively, find the k pairs (u,v) with the smallest sums (nums1[u] + nums2[v]).",
      solution: "```java\nimport java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (nums1.length == 0 || nums2.length == 0 || k == 0) {\n            return result;\n        }\n        \n        // Min heap to store pairs with smallest sums\n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] + a[1] - b[0] - b[1]);\n        \n        // Add the pairs (nums1[0], nums2[0]), (nums1[1], nums2[0]), ...\n        for (int i = 0; i < nums1.length && i < k; i++) {\n            minHeap.offer(new int[]{nums1[i], nums2[0], 0}); // [num1, num2, index of num2]\n        }\n        \n        while (k-- > 0 && !minHeap.isEmpty()) {\n            int[] current = minHeap.poll();\n            result.add(Arrays.asList(current[0], current[1]));\n            \n            // If we can get more pairs with nums2, add the next pair\n            if (current[2] < nums2.length - 1) {\n                minHeap.offer(new int[]{current[0], nums2[current[2] + 1], current[2] + 1});\n            }\n        }\n        \n        return result;\n    }\n}\n```\nThis solution uses a min heap to find the k pairs with the smallest sums. We start by adding the pairs (nums1[0], nums2[0]), (nums1[1], nums2[0]), ..., up to k elements. Then, for each pair (nums1[i], nums2[j]) we remove from the heap, we add (nums1[i], nums2[j+1]) to consider all possible pairs. This ensures we process pairs in order of increasing sum. The time complexity is O(k log k) and the space complexity is O(k)."
    }
  ],
  
  quiz: [
    {
      id: "mock-test-2-quiz-1",
      question: "Which data structure would be most efficient for implementing a browser's back/forward navigation functionality?",
      options: ["Array", "Queue", "Two stacks", "Priority queue"],
      correctAnswer: 2,
      explanation: "Two stacks would be the most efficient approach for implementing browser back/forward navigation. One stack can keep track of the pages visited (for the 'back' functionality), and another stack can keep track of the pages you've navigated backward from (for the 'forward' functionality)."
    },
    {
      id: "mock-test-2-quiz-2",
      question: "When implementing a queue using two stacks, what is the amortized time complexity for the dequeue operation?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Although a single dequeue operation might take O(n) time when we need to transfer all elements from the input stack to the output stack, subsequent dequeue operations take O(1) time until the output stack is empty. This makes the amortized time complexity O(1) per operation."
    },
    {
      id: "mock-test-2-quiz-3",
      question: "What is the time complexity of extracting the minimum element from a min heap-based priority queue?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Extracting the minimum element from a min heap takes O(log n) time. This is because after removing the root (minimum element), we need to restore the heap property, which requires at most the height of the tree operations, and the height of a binary heap with n nodes is log n."
    },
    {
      id: "mock-test-2-quiz-4",
      question: "Which of the following operations can be performed in O(1) time on a doubly linked list but not on a singly linked list?",
      options: ["Insertion at the beginning", "Insertion at the end (with a tail pointer)", "Deletion with a reference to the node", "Finding the middle element"],
      correctAnswer: 2,
      explanation: "Deletion of a node with a given reference can be done in O(1) time in a doubly linked list because we can directly access the previous node. In a singly linked list, we would need to traverse from the head to find the previous node, making it an O(n) operation."
    }
  ]
};

// Add practice section with LeetCode problems
mockTestWeek2Content.practice = {
  introduction: "The following practice problems will help reinforce the concepts covered in Week 2 of our DSA course. These problems focus on linked lists, stacks, queues, and priority queues. Try to solve them independently before looking at solutions to build your problem-solving skills.",
  questions: {
    easy: [
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        link: "https://leetcode.com/problems/reverse-linked-list/",
        description: "Reverse a singly linked list to test your understanding of linked list operations."
      },
      {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        link: "https://leetcode.com/problems/valid-parentheses/",
        description: "Determine if the input string has valid parentheses using a stack."
      },
      {
        id: "implement-stack-using-queues",
        title: "Implement Stack using Queues",
        link: "https://leetcode.com/problems/implement-stack-using-queues/",
        description: "Implement a LIFO stack using FIFO queue data structures."
      },
      {
        id: "min-stack",
        title: "Min Stack",
        link: "https://leetcode.com/problems/min-stack/",
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time."
      }
    ],
    medium: [
      {
        id: "lru-cache",
        title: "LRU Cache",
        link: "https://leetcode.com/problems/lru-cache/",
        description: "Design and implement a data structure for Least Recently Used (LRU) cache."
      },
      {
        id: "reorder-list",
        title: "Reorder List",
        link: "https://leetcode.com/problems/reorder-list/",
        description: "Reorder a linked list to test your understanding of linked list operations."
      },
      {
        id: "k-closest-points-to-origin",
        title: "K Closest Points to Origin",
        link: "https://leetcode.com/problems/k-closest-points-to-origin/",
        description: "Find the k closest points to the origin using a priority queue."
      },
      {
        id: "next-greater-element-ii",
        title: "Next Greater Element II",
        link: "https://leetcode.com/problems/next-greater-element-ii/",
        description: "Find the next greater element for each element in a circular array using a stack."
      }
    ],
    hard: [
      {
        id: "merge-k-sorted-lists",
        title: "Merge k Sorted Lists",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        description: "Merge k sorted linked lists into one sorted list using a priority queue."
      },
      {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        description: "Find the maximum element in each sliding window of size k using a deque."
      }
    ]
  }
};

export default mockTestWeek2Content; 