import { Content } from '@/types/course';

const singlyLinkedListContent: Content = {
  introduction: "A Singly Linked List is a linear data structure consisting of nodes where each node contains data and a reference to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations, which gives them advantages for certain operations like insertions and deletions. Singly linked lists are fundamental to understanding more complex data structures and are frequently asked about in technical interviews.",
  
  learningObjectives: [
    "Understand the structure and properties of singly linked lists",
    "Implement basic linked list operations (insertion, deletion, traversal)",
    "Recognize common linked list patterns and techniques",
    "Solve common linked list problems that appear in interviews"
  ],
  
  sections: [
    {
      title: "Singly Linked List Basics",
      content: "A singly linked list consists of nodes, where each node has two components: data (the value stored in the node) and a reference to the next node. The last node points to null, indicating the end of the list. The list is accessed through a 'head' pointer, which points to the first node in the list.",
      codeExamples: [
        {
          language: "java",
          code: `// Node class definition
class Node {
    int data;
    Node next;
    
    // Constructor
    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// Singly Linked List class
class SinglyLinkedList {
    Node head;
    
    // Constructor for empty list
    public SinglyLinkedList() {
        this.head = null;
    }
    
    // Check if the list is empty
    public boolean isEmpty() {
        return head == null;
    }
}`,
          explanation: "Basic structure of a singly linked list with a Node class and a SinglyLinkedList class that has a head pointer."
        }
      ]
    },
    {
      title: "Basic Operations on Singly Linked Lists",
      content: "There are several fundamental operations you can perform on a singly linked list: insertion (at the beginning, end, or at a specific position), deletion, traversal, and searching. Let's look at how to implement these operations.",
      codeExamples: [
        {
          language: "java",
          code: `// Insert at the beginning - O(1)
public void insertAtBeginning(int data) {
    Node newNode = new Node(data);
    
    // Make new node point to current head
    newNode.next = head;
    
    // Update head to point to new node
    head = newNode;
}

// Insert at the end - O(n)
public void insertAtEnd(int data) {
    Node newNode = new Node(data);
    
    // If list is empty, make new node the head
    if (isEmpty()) {
        head = newNode;
        return;
    }
    
    // Traverse to find the last node
    Node current = head;
    while (current.next != null) {
        current = current.next;
    }
    
    // Make last node point to new node
    current.next = newNode;
}

// Insert after a specific node - O(n)
public void insertAfter(Node prevNode, int data) {
    if (prevNode == null) {
        System.out.println("Previous node cannot be null");
        return;
    }
    
    Node newNode = new Node(data);
    
    // Make new node point to node after prevNode
    newNode.next = prevNode.next;
    
    // Make prevNode point to new node
    prevNode.next = newNode;
}

// Delete a node with given value - O(n)
public void deleteNode(int key) {
    // Store head
    Node temp = head, prev = null;
    
    // If head node itself holds the key to be deleted
    if (temp != null && temp.data == key) {
        head = temp.next; // Change head
        return;
    }
    
    // Search for the key to be deleted, keep track of the
    // previous node as we need to change 'prev.next'
    while (temp != null && temp.data != key) {
        prev = temp;
        temp = temp.next;
    }
    
    // If key was not present in linked list
    if (temp == null) return;
    
    // Unlink the node from linked list
    prev.next = temp.next;
}

// Search for a node with given value - O(n)
public boolean search(int key) {
    Node current = head;
    
    while (current != null) {
        if (current.data == key)
            return true;
        current = current.next;
    }
    
    return false;
}

// Print the linked list - O(n)
public void printList() {
    Node current = head;
    
    while (current != null) {
        System.out.print(current.data + " -> ");
        current = current.next;
    }
    
    System.out.println("NULL");
}`,
          explanation: "Implementation of basic operations on a singly linked list including insertion, deletion, searching, and traversal, with their time complexities."
        }
      ]
    },
    {
      title: "Common Linked List Techniques",
      content: "Several techniques are commonly used when working with linked lists. These include the two-pointer (slow and fast pointers) technique, reversing a linked list, and finding the middle of a linked list. These are fundamental operations that often appear in interview questions.",
      codeExamples: [
        {
          language: "java",
          code: `// Find the middle of a linked list using slow/fast pointers
public Node findMiddle() {
    if (head == null) return null;
    
    Node slow = head;
    Node fast = head;
    
    // Fast pointer moves twice as fast as slow pointer
    // When fast reaches the end, slow will be at the middle
    while (fast != null && fast.next != null) {
        slow = slow.next;       // Move one step
        fast = fast.next.next;  // Move two steps
    }
    
    return slow; // slow is at the middle
}

// Detect a cycle in a linked list
public boolean hasCycle() {
    if (head == null) return false;
    
    Node slow = head;
    Node fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;       // Move one step
        fast = fast.next.next;  // Move two steps
        
        // If there is a cycle, slow and fast will eventually meet
        if (slow == fast) return true;
    }
    
    return false; // No cycle found
}

// Reverse a linked list
public void reverse() {
    Node prev = null;
    Node current = head;
    Node next = null;
    
    while (current != null) {
        // Store next node
        next = current.next;
        
        // Reverse the link
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = next;
    }
    
    // Update head to the new front (which was the last node)
    head = prev;
}`,
          explanation: "Common techniques used with linked lists: finding the middle element using the two-pointer approach, detecting cycles, and reversing a linked list."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "ll-hw-1",
      question: "Implement a method to remove duplicates from an unsorted linked list.",
      solution: "```java\npublic void removeDuplicates() {\n    if (head == null) return;\n    \n    // Use a HashSet to store seen values\n    HashSet<Integer> set = new HashSet<>();\n    Node current = head;\n    Node previous = null;\n    \n    while (current != null) {\n        // If current value is a duplicate\n        if (set.contains(current.data)) {\n            previous.next = current.next;\n        } else {\n            set.add(current.data);\n            previous = current;\n        }\n        current = current.next;\n    }\n}\n```\nTime complexity: O(n), Space complexity: O(n) where n is the number of nodes."
    },
    {
      id: "ll-hw-2",
      question: "Implement a function to check if a linked list is a palindrome (reads the same forward and backward).",
      solution: "```java\npublic boolean isPalindrome() {\n    if (head == null || head.next == null) return true;\n    \n    // Find the middle of the linked list\n    Node slow = head;\n    Node fast = head;\n    \n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    \n    // Reverse the second half\n    Node secondHalfHead = reverse(slow);\n    Node firstHalfHead = head;\n    \n    // Compare first half and reversed second half\n    while (secondHalfHead != null) {\n        if (firstHalfHead.data != secondHalfHead.data) {\n            return false;\n        }\n        firstHalfHead = firstHalfHead.next;\n        secondHalfHead = secondHalfHead.next;\n    }\n    \n    return true;\n}\n\nprivate Node reverse(Node head) {\n    Node prev = null;\n    Node current = head;\n    while (current != null) {\n        Node next = current.next;\n        current.next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}\n```\nThis approach has O(n) time complexity and O(1) space complexity."
    }
  ],
  
  quiz: [
    {
      id: "ll-quiz-1",
      question: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Inserting at the beginning of a singly linked list is O(1) because we only need to update the head pointer and the next pointer of the new node, regardless of the list size."
    },
    {
      id: "ll-quiz-2",
      question: "Which of the following operations is slower (has higher time complexity) in a singly linked list compared to an array?",
      options: ["Inserting at the beginning", "Deleting from the beginning", "Accessing an element by index", "Checking if empty"],
      correctAnswer: 2,
      explanation: "Accessing an element by index in a linked list is O(n) because you must traverse from the head, while in an array it's O(1). The other operations are either O(1) in both or faster in linked lists."
    },
    {
      id: "ll-quiz-3",
      question: "What problem does the 'fast and slow pointer' technique help solve in linked lists?",
      options: ["Deleting a node", "Reversing a list", "Finding the middle element", "Sorting the list"],
      correctAnswer: 2,
      explanation: "The fast and slow pointer technique (where one pointer moves twice as fast as the other) is commonly used to find the middle element of a linked list. It can also be used to detect cycles."
    }
  ],
  
  // Added practice section for Singly Linked List
  practice: {
    introduction: "Practice is essential to master singly linked lists. Complete the following LeetCode problems to reinforce your understanding of linked list operations and algorithms.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Reverse Linked List",
          link: "https://leetcode.com/problems/reverse-linked-list/",
          description: "Reverse a singly linked list iteratively and recursively. A fundamental linked list operation."
        },
        {
          id: "e2",
          title: "Delete Node in a Linked List",
          link: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
          description: "Delete a node in a linked list without having access to the head pointer."
        },
        {
          id: "e3",
          title: "Middle of the Linked List",
          link: "https://leetcode.com/problems/middle-of-the-linked-list/",
          description: "Find the middle node of a linked list using the fast and slow pointer technique."
        },
        {
          id: "e4",
          title: "Linked List Cycle",
          link: "https://leetcode.com/problems/linked-list-cycle/",
          description: "Determine if a linked list has a cycle using Floyd's Cycle-Finding Algorithm."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Remove Nth Node From End of List",
          link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
          description: "Remove the nth node from the end of a linked list using a two-pointer approach."
        },
        {
          id: "m2",
          title: "Reorder List",
          link: "https://leetcode.com/problems/reorder-list/",
          description: "Reorder a linked list by interleaving the first half with the reversed second half."
        },
        {
          id: "m3",
          title: "Odd Even Linked List",
          link: "https://leetcode.com/problems/odd-even-linked-list/",
          description: "Group all odd-indexed nodes together followed by even-indexed nodes."
        },
        {
          id: "m4",
          title: "Sort List",
          link: "https://leetcode.com/problems/sort-list/",
          description: "Sort a linked list in O(n log n) time using constant space complexity."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Merge k Sorted Lists",
          link: "https://leetcode.com/problems/merge-k-sorted-lists/",
          description: "Merge k sorted linked lists into one sorted linked list using a priority queue or divide and conquer."
        },
        {
          id: "h2",
          title: "Reverse Nodes in k-Group",
          link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
          description: "Reverse nodes in k-group in a linked list while maintaining the structure of the remaining nodes."
        }
      ]
    }
  }
};

export default singlyLinkedListContent; 