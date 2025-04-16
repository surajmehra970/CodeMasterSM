import { Content } from '@/types/course';

const doublyLinkedListContent: Content = {
  introduction: "A Doubly Linked List is a variation of the linked list data structure where each node contains references to both the next and previous nodes. This bidirectional linking gives doubly linked lists advantages over singly linked lists, such as efficient traversal in both directions and O(1) deletion with a reference to the node. Understanding doubly linked lists is important for implementing more complex data structures like deques, certain types of caches, and for solving problems that require bidirectional traversal.",
  
  learningObjectives: [
    "Understand the structure and properties of doubly linked lists",
    "Implement basic doubly linked list operations (insertion, deletion, traversal)",
    "Compare doubly linked lists with singly linked lists",
    "Recognize when to use doubly linked lists in problem-solving"
  ],
  
  sections: [
    {
      title: "Doubly Linked List Basics",
      content: "A doubly linked list consists of nodes that contain three components: data (the value stored in the node), a reference to the next node, and a reference to the previous node. The first node's previous reference and the last node's next reference typically point to null. The list is often accessed through both 'head' and 'tail' pointers for optimal operations at both ends.",
      codeExamples: [
        {
          language: "java",
          code: `// Node class for Doubly Linked List
class Node {
    int data;
    Node next;
    Node prev;
    
    // Constructor
    public Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Doubly Linked List class
class DoublyLinkedList {
    Node head;
    Node tail;
    
    // Constructor for empty list
    public DoublyLinkedList() {
        this.head = null;
        this.tail = null;
    }
    
    // Check if the list is empty
    public boolean isEmpty() {
        return head == null;
    }
}`,
          explanation: "Basic structure of a doubly linked list with a Node class that has both next and prev pointers, and a DoublyLinkedList class with head and tail pointers."
        }
      ]
    },
    {
      title: "Basic Operations on Doubly Linked Lists",
      content: "Doubly linked lists support various operations similar to singly linked lists but with additional capabilities due to the bidirectional linking. These operations include insertion (at the beginning, end, or at a specific position), deletion, forward traversal, and backward traversal.",
      codeExamples: [
        {
          language: "java",
          code: `// Insert at the beginning - O(1)
public void insertAtBeginning(int data) {
    Node newNode = new Node(data);
    
    // If list is empty, both head and tail point to new node
    if (isEmpty()) {
        head = newNode;
        tail = newNode;
        return;
    }
    
    // Make new node point to current head
    newNode.next = head;
    
    // Make head's prev point to new node
    head.prev = newNode;
    
    // Update head to point to new node
    head = newNode;
}

// Insert at the end - O(1) with tail pointer
public void insertAtEnd(int data) {
    Node newNode = new Node(data);
    
    // If list is empty, both head and tail point to new node
    if (isEmpty()) {
        head = newNode;
        tail = newNode;
        return;
    }
    
    // Make tail's next point to new node
    tail.next = newNode;
    
    // Make new node's prev point to tail
    newNode.prev = tail;
    
    // Update tail to point to new node
    tail = newNode;
}

// Insert after a specific node - O(1)
public void insertAfter(Node prevNode, int data) {
    if (prevNode == null) {
        System.out.println("Previous node cannot be null");
        return;
    }
    
    Node newNode = new Node(data);
    
    // Set new node's next to prevNode's next
    newNode.next = prevNode.next;
    
    // Set new node's prev to prevNode
    newNode.prev = prevNode;
    
    // If prevNode is not the last node, set the previous of next node to new node
    if (prevNode.next != null) {
        prevNode.next.prev = newNode;
    } else {
        // If inserting after the tail, update tail
        tail = newNode;
    }
    
    // Set prevNode's next to new node
    prevNode.next = newNode;
}

// Delete a node - O(1) if node reference is given
public void deleteNode(Node nodeToDelete) {
    if (head == null || nodeToDelete == null) {
        return;
    }
    
    // If node to delete is head node
    if (head == nodeToDelete) {
        head = nodeToDelete.next;
    }
    
    // If node to delete is not the last node
    if (nodeToDelete.next != null) {
        nodeToDelete.next.prev = nodeToDelete.prev;
    } else {
        // If deleting the tail, update tail
        tail = nodeToDelete.prev;
    }
    
    // If node to delete is not the first node
    if (nodeToDelete.prev != null) {
        nodeToDelete.prev.next = nodeToDelete.next;
    }
}

// Forward traversal (head to tail) - O(n)
public void printForward() {
    Node current = head;
    System.out.print("NULL <-> ");
    
    while (current != null) {
        System.out.print(current.data + " <-> ");
        current = current.next;
    }
    
    System.out.println("NULL");
}

// Backward traversal (tail to head) - O(n)
public void printBackward() {
    Node current = tail;
    System.out.print("NULL <-> ");
    
    while (current != null) {
        System.out.print(current.data + " <-> ");
        current = current.prev;
    }
    
    System.out.println("NULL");
}`,
          explanation: "Implementation of basic operations on a doubly linked list including insertion at both ends, deletion, and traversal in both directions."
        }
      ]
    },
    {
      title: "Advantages of Doubly Linked Lists",
      content: "Doubly linked lists have several advantages over singly linked lists, particularly for certain operations. Let's explore these advantages and when doubly linked lists are preferable.",
      codeExamples: [
        {
          language: "java",
          code: `// Example: Efficient deletion with node reference
// In a singly linked list, we need the previous node or must traverse from head
// In a doubly linked list, we can delete directly with O(1) time

// Implementation of a Deque (Double-ended queue) using Doubly Linked List
class Deque {
    DoublyLinkedList list;
    
    public Deque() {
        list = new DoublyLinkedList();
    }
    
    // Add to front - O(1)
    public void addFirst(int item) {
        list.insertAtBeginning(item);
    }
    
    // Add to back - O(1)
    public void addLast(int item) {
        list.insertAtEnd(item);
    }
    
    // Remove from front - O(1)
    public int removeFirst() {
        if (list.isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        
        int data = list.head.data;
        list.deleteNode(list.head);
        return data;
    }
    
    // Remove from back - O(1)
    public int removeLast() {
        if (list.isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        
        int data = list.tail.data;
        list.deleteNode(list.tail);
        return data;
    }
    
    // Peek at front - O(1)
    public int peekFirst() {
        if (list.isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        
        return list.head.data;
    }
    
    // Peek at back - O(1)
    public int peekLast() {
        if (list.isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        
        return list.tail.data;
    }
}`,
          explanation: "This example demonstrates the advantage of doubly linked lists for implementing a deque (double-ended queue) with O(1) operations at both ends, which would be less efficient with a singly linked list."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "dll-hw-1",
      question: "Implement a method to find the kth node from the end of a doubly linked list. Compare the approach you'd use for a singly linked list vs. a doubly linked list.",
      solution: "```java\n// For a doubly linked list, we can start from the tail\npublic Node findKthFromEnd(int k) {\n    if (head == null || k <= 0) return null;\n    \n    Node current = tail;\n    int count = 1;\n    \n    while (current != null && count < k) {\n        current = current.prev;\n        count++;\n    }\n    \n    return current;\n}\n\n// For comparison: in a singly linked list, we'd typically use the two-pointer approach\npublic Node findKthFromEndSinglyLinkedList(int k) {\n    if (head == null || k <= 0) return null;\n    \n    Node fast = head;\n    Node slow = head;\n    \n    // Move fast k nodes ahead\n    for (int i = 0; i < k; i++) {\n        if (fast == null) return null; // k is larger than list size\n        fast = fast.next;\n    }\n    \n    // Move both pointers until fast reaches the end\n    while (fast != null) {\n        slow = slow.next;\n        fast = fast.next;\n    }\n    \n    return slow;\n}\n```\nIn a doubly linked list, we can directly start from the tail and move backward, making the solution more intuitive and potentially more efficient for large lists. The time complexity is O(k) for the doubly linked list approach and O(n) for the singly linked list approach (where n is the list length)."
    },
    {
      id: "dll-hw-2",
      question: "Implement a function to merge two sorted doubly linked lists into a single sorted doubly linked list.",
      solution: "```java\npublic DoublyLinkedList mergeSortedLists(DoublyLinkedList list1, DoublyLinkedList list2) {\n    // Handle edge cases\n    if (list1.isEmpty()) return list2;\n    if (list2.isEmpty()) return list1;\n    \n    DoublyLinkedList result = new DoublyLinkedList();\n    Node current1 = list1.head;\n    Node current2 = list2.head;\n    \n    // Merge the lists by comparing elements\n    while (current1 != null && current2 != null) {\n        if (current1.data <= current2.data) {\n            result.insertAtEnd(current1.data);\n            current1 = current1.next;\n        } else {\n            result.insertAtEnd(current2.data);\n            current2 = current2.next;\n        }\n    }\n    \n    // Add remaining elements from list1, if any\n    while (current1 != null) {\n        result.insertAtEnd(current1.data);\n        current1 = current1.next;\n    }\n    \n    // Add remaining elements from list2, if any\n    while (current2 != null) {\n        result.insertAtEnd(current2.data);\n        current2 = current2.next;\n    }\n    \n    return result;\n}\n```\nThis solution has O(n + m) time complexity where n and m are the lengths of the input lists."
    }
  ],
  
  quiz: [
    {
      id: "dll-quiz-1",
      question: "What is the primary advantage of a doubly linked list over a singly linked list?",
      options: ["Less memory usage", "Bidirectional traversal", "Faster insertion at the beginning", "Better cache locality"],
      correctAnswer: 1,
      explanation: "Doubly linked lists allow traversal in both directions (forward and backward) because each node has references to both next and previous nodes, unlike singly linked lists which can only be traversed forward."
    },
    {
      id: "dll-quiz-2",
      question: "What is the space complexity overhead of a doubly linked list compared to a singly linked list?",
      options: ["No additional overhead", "One extra pointer per node", "Two extra pointers per node", "Depends on the data type"],
      correctAnswer: 1,
      explanation: "A doubly linked list requires one extra pointer per node (the previous pointer) compared to a singly linked list, which only has a next pointer."
    },
    {
      id: "dll-quiz-3",
      question: "Which operation is more efficient in a doubly linked list compared to a singly linked list?",
      options: ["Insertion at beginning", "Finding the middle element", "Deletion at a specific position given the node", "Forward traversal"],
      correctAnswer: 2,
      explanation: "Deletion at a specific position given the node reference is more efficient in a doubly linked list (O(1)) because you can directly access both previous and next nodes. In a singly linked list, you would need to traverse from the head to find the previous node, making it O(n)."
    }
  ],
  
  // Added practice section for Doubly Linked List
  practice: {
    introduction: "Practice these LeetCode problems to strengthen your understanding of doubly linked lists. While some problems don't explicitly require doubly linked lists, they can be more efficiently solved using them.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Design Linked List",
          link: "https://leetcode.com/problems/design-linked-list/",
          description: "Implement a doubly linked list with basic operations like get, addAtHead, addAtTail, addAtIndex, and deleteAtIndex."
        },
        {
          id: "e2",
          title: "Design Browser History",
          link: "https://leetcode.com/problems/design-browser-history/",
          description: "Design a browser history which can navigate back and forward—perfect for implementing with a doubly linked list."
        },
        {
          id: "e3",
          title: "Palindrome Linked List",
          link: "https://leetcode.com/problems/palindrome-linked-list/",
          description: "Check if a linked list is a palindrome. A doubly linked list makes this problem simpler to solve."
        },
        {
          id: "e4",
          title: "Flatten a Multilevel Doubly Linked List",
          link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
          description: "Flatten a multilevel doubly linked list, where nodes can have child lists."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Design a Text Editor",
          link: "https://leetcode.com/problems/design-a-text-editor/",
          description: "Design a text editor with cursor movement and text operations—an excellent application of doubly linked lists."
        },
        {
          id: "m2",
          title: "LRU Cache",
          link: "https://leetcode.com/problems/lru-cache/",
          description: "Implement a Least Recently Used (LRU) cache using a doubly linked list for efficient element removal and reordering."
        },
        {
          id: "m3",
          title: "All O`one Data Structure",
          link: "https://leetcode.com/problems/all-oone-data-structure/",
          description: "Design a data structure to store keys with their values and retrieve min/max values in O(1) time."
        },
        {
          id: "m4",
          title: "Linked List Components",
          link: "https://leetcode.com/problems/linked-list-components/",
          description: "Find the number of connected components in a linked list—easier to navigate using a doubly linked list."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "LFU Cache",
          link: "https://leetcode.com/problems/lfu-cache/",
          description: "Implement a Least Frequently Used (LFU) cache. A doubly linked list helps maintain frequency ordering efficiently."
        },
        {
          id: "h2",
          title: "Design Skiplist",
          link: "https://leetcode.com/problems/design-skiplist/",
          description: "Design a Skiplist without using any built-in libraries. Uses multiple layers of doubly linked lists."
        }
      ]
    }
  }
};

export default doublyLinkedListContent; 