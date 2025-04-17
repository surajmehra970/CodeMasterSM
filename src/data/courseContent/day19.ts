import { Content } from '@/types/course';

const binarySearchTreeContent: Content = {
  introduction: "Binary Search Trees (BSTs) are fundamental data structures that maintain a sorted collection of data for efficient searching, insertion, and deletion operations. Each node in a BST has at most two children, where all nodes in the left subtree have values less than the node's value, and all nodes in the right subtree have values greater than the node's value. This property enables us to perform binary search, giving BSTs their O(log n) average time complexity for basic operations.",
  
  learningObjectives: [
    "Understand the structure and properties of Binary Search Trees",
    "Implement core BST operations: insertion, deletion, and searching",
    "Traverse BSTs using in-order, pre-order, and post-order methods",
    "Analyze the time and space complexity of BST operations",
    "Recognize the limitations of BSTs and scenarios where they might degenerate"
  ],
  
  sections: [
    {
      title: "BST Structure and Properties",
      content: `A Binary Search Tree is a binary tree where each node contains a key (or value) with the following properties:
- All nodes in the left subtree of a node have keys less than the node's key
- All nodes in the right subtree of a node have keys greater than the node's key
- Both the left and right subtrees must also be binary search trees

These properties enable efficient searching, as at each node, we can discard half of the remaining tree.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-md">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Binary Search Tree</h4>
    <div class="flex justify-center">
      <img src="/images/binary-search-tree.svg" alt="Binary Search Tree" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">A valid BST with the search property preserved at each node</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// Basic structure of a BST node
class TreeNode {
    int key;
    TreeNode left, right;
    
    public TreeNode(int item) {
        key = item;
        left = right = null;
    }
}

// Basic Binary Search Tree implementation
class BinarySearchTree {
    TreeNode root;
    
    public BinarySearchTree() {
        root = null;
    }
    
    // Check if the BST property is maintained
    public boolean isBST() {
        return isBSTUtil(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    
    private boolean isBSTUtil(TreeNode node, int min, int max) {
        // Empty tree is a BST
        if (node == null) {
            return true;
        }
        
        // If this node violates the min/max constraint
        if (node.key < min || node.key > max) {
            return false;
        }
        
        // Check the subtrees recursively
        // tightening the min/max constraints
        return isBSTUtil(node.left, min, node.key - 1) && 
               isBSTUtil(node.right, node.key + 1, max);
    }
}`,
          explanation: "This code defines the basic structure of a Binary Search Tree with a TreeNode class that has a key value and references to left and right children. The BinarySearchTree class includes a method to verify if a tree satisfies the BST property by recursively checking that each node's value is within the valid range defined by its ancestors."
        }
      ]
    },
    {
      title: "BST Operations: Search, Insert, Delete",
      content: "The primary operations of a BST are searching for a key, inserting a new key, and deleting a key. These operations leverage the BST property to achieve O(log n) time complexity in balanced trees.",
      codeExamples: [
        {
          language: "java",
          code: `// Search operation in BST
public TreeNode search(TreeNode root, int key) {
    // Base case: root is null or key is at root
    if (root == null || root.key == key) {
        return root;
    }
    
    // Key is greater than root's key
    if (root.key < key) {
        return search(root.right, key);
    }
    
    // Key is smaller than root's key
    return search(root.left, key);
}

// Insert operation in BST
public TreeNode insert(TreeNode root, int key) {
    // If the tree is empty, create a new node
    if (root == null) {
        root = new TreeNode(key);
        return root;
    }
    
    // Otherwise, recur down the tree
    if (key < root.key) {
        root.left = insert(root.left, key);
    } else if (key > root.key) {
        root.right = insert(root.right, key);
    }
    
    // Return the unchanged node pointer
    return root;
}

// Delete operation in BST
public TreeNode delete(TreeNode root, int key) {
    // Base case
    if (root == null) {
        return root;
    }
    
    // If the key to be deleted is smaller than the root's key,
    // then it lies in left subtree
    if (key < root.key) {
        root.left = delete(root.left, key);
    }
    // If the key to be deleted is greater than the root's key,
    // then it lies in right subtree
    else if (key > root.key) {
        root.right = delete(root.right, key);
    }
    // If key is same as root's key, then this is the node to be deleted
    else {
        // Case 1: Node with only one child or no child
        if (root.left == null) {
            return root.right;
        } else if (root.right == null) {
            return root.left;
        }
        
        // Case 2: Node with two children
        // Get the inorder successor (smallest in the right subtree)
        root.key = minValue(root.right);
        
        // Delete the inorder successor
        root.right = delete(root.right, root.key);
    }
    
    return root;
}

// Helper method to find the minimum value node in a BST
private int minValue(TreeNode root) {
    int minValue = root.key;
    while (root.left != null) {
        minValue = root.left.key;
        root = root.left;
    }
    return minValue;
}`,
          explanation: "These implementations show the three core BST operations: search, insert, and delete. Search and insert are straightforward recursive operations that follow the BST property. Delete is more complex, especially when removing a node with two children, which requires finding the inorder successor (smallest value in the right subtree) to maintain the BST property."
        }
      ]
    },
    {
      title: "BST Traversal Methods",
      content: "There are three common ways to traverse a BST: in-order (left-root-right), pre-order (root-left-right), and post-order (left-right-root). Each traversal method visits nodes in a different order and has specific applications.",
      codeExamples: [
        {
          language: "java",
          code: `// In-order traversal (left, root, right)
// Results in sorted order for a BST
public void inOrder(TreeNode root) {
    if (root != null) {
        inOrder(root.left);      // Visit left subtree
        System.out.print(root.key + " "); // Visit root
        inOrder(root.right);     // Visit right subtree
    }
}

// Pre-order traversal (root, left, right)
// Useful for creating a copy of the tree or prefix expression
public void preOrder(TreeNode root) {
    if (root != null) {
        System.out.print(root.key + " "); // Visit root
        preOrder(root.left);     // Visit left subtree
        preOrder(root.right);    // Visit right subtree
    }
}

// Post-order traversal (left, right, root)
// Useful for deleting the tree or postfix expression
public void postOrder(TreeNode root) {
    if (root != null) {
        postOrder(root.left);    // Visit left subtree
        postOrder(root.right);   // Visit right subtree
        System.out.print(root.key + " "); // Visit root
    }
}

// Level-order traversal (breadth-first)
// Visits nodes level by level
public void levelOrder(TreeNode root) {
    if (root == null) return;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    
    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        System.out.print(current.key + " ");
        
        if (current.left != null) queue.add(current.left);
        if (current.right != null) queue.add(current.right);
    }
}`,
          explanation: "These methods demonstrate different ways to traverse a BST. In-order traversal visits nodes in sorted order (for a BST). Pre-order and post-order traversals are useful for tree copying and deletion, respectively. Level-order traversal (breadth-first) visits nodes level by level, which is useful for visualizing the tree structure."
        }
      ]
    },
    {
      title: "BST Time and Space Complexity",
      content: "The efficiency of BST operations depends on the height of the tree. In a balanced BST, operations have O(log n) time complexity, but in the worst case (degenerate tree), they can degrade to O(n).",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity of BST Operations:

1. Search: 
   - Average case: O(log n) - when tree is balanced
   - Worst case: O(n) - when tree is skewed (degenerate)

2. Insert:
   - Average case: O(log n)
   - Worst case: O(n)

3. Delete:
   - Average case: O(log n)
   - Worst case: O(n)

4. Traversal:
   - Always O(n) as we need to visit every node

Space Complexity:
   - O(h) for recursive implementations, where h is the height of the tree
   - In a balanced tree, h = log n, so space complexity is O(log n)
   - In worst case (skewed tree), h = n, so space complexity is O(n)

Example of a balanced vs. degenerate BST:

Balanced BST (height = log n):      Degenerate BST (height = n):
        10                                   10
      /    \\                                  \\
     5      15                                 15
    / \\    /  \\                                \\
   3   7  12   20                               20
                                                 \\
                                                 25

The efficiency of BST depends heavily on its structure.
A balanced BST provides optimal performance for all operations.
*/`,
          explanation: "This analysis explains the time and space complexity of BST operations. In a balanced tree, operations are efficient with O(log n) time complexity. However, in a degenerate tree (essentially a linked list), performance degrades to O(n). This is why balanced BST variants like AVL and Red-Black trees are often preferred for practical applications."
        }
      ]
    },
    {
      title: "BST Applications and Limitations",
      content: "Binary Search Trees are used in many applications but have limitations that are addressed by self-balancing variants.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Applications of Binary Search Trees:

1. Database Indexing: BSTs (and their balanced variants) are used to implement
   indexes in databases for faster data retrieval.

2. Symbol Tables: Used in compilers and interpreters to store identifiers and
   their attributes.

3. Priority Queues: Though heaps are more common, BSTs can be used.

4. Ordered Maps and Sets: Java's TreeMap and TreeSet use a self-balancing BST
   (Red-Black Tree) to maintain ordered key-value pairs.

Limitations of Standard BSTs:

1. Performance Degradation: If insertions happen in a sorted or nearly-sorted order,
   the tree can degenerate into a linked list, resulting in O(n) operations.

2. No O(1) Operations: Unlike hash tables which offer O(1) average time for
   search, insert, and delete, BSTs always require at least O(log n) time.

3. No Direct Access: Unlike arrays, we cannot directly access the kth element
   efficiently without augmenting the BST.

Example of Standard BST vs. Self-balancing BSTs:

// Using a standard BST
BinarySearchTree bst = new BinarySearchTree();
bst.insert(10);
bst.insert(20);
bst.insert(30); // Tree is becoming skewed
bst.insert(40); // More skewed
bst.insert(50); // Now essentially a linked list

// Using Java's TreeSet (Red-Black Tree, a self-balancing BST)
TreeSet<Integer> balancedSet = new TreeSet<>();
balancedSet.add(10);
balancedSet.add(20);
balancedSet.add(30); // Tree rebalances
balancedSet.add(40); // Tree rebalances
balancedSet.add(50); // Tree remains balanced

// Standard BST: O(n) operations in worst case
// TreeSet: O(log n) operations guaranteed
*/`,
          explanation: "This code explains the applications and limitations of standard Binary Search Trees. While BSTs are useful for maintaining ordered data, they can degenerate into linked lists with sequential insertions. This limitation is addressed by self-balancing BST variants like AVL and Red-Black trees, which guarantee O(log n) operations regardless of the insertion order."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "bst-hw-1",
      question: "Implement a method to find the kth smallest element in a BST. Analyze the time and space complexity of your solution.",
      solution: "```java\npublic class BSTKthSmallest {\n    class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int x) { val = x; }\n    }\n    \n    // Solution using in-order traversal\n    public int kthSmallest(TreeNode root, int k) {\n        List<Integer> inorder = new ArrayList<>();\n        inOrderTraversal(root, inorder);\n        return inorder.get(k - 1);\n    }\n    \n    private void inOrderTraversal(TreeNode node, List<Integer> inorder) {\n        if (node == null) return;\n        inOrderTraversal(node.left, inorder);\n        inorder.add(node.val);\n        inOrderTraversal(node.right, inorder);\n    }\n    \n    // More efficient solution without storing all elements\n    private int count = 0;\n    private int result = 0;\n    \n    public int kthSmallestEfficient(TreeNode root, int k) {\n        count = 0;\n        result = 0;\n        inOrderTraversalWithCount(root, k);\n        return result;\n    }\n    \n    private void inOrderTraversalWithCount(TreeNode node, int k) {\n        if (node == null) return;\n        \n        inOrderTraversalWithCount(node.left, k);\n        \n        count++;\n        if (count == k) {\n            result = node.val;\n            return;\n        }\n        \n        inOrderTraversalWithCount(node.right, k);\n    }\n}\n```\nTime Complexity:\n- First approach: O(n) to traverse all nodes and build the list, where n is the number of nodes in the tree.\n- Second approach: O(k + h) where h is the height of the tree. In the worst case (skewed tree), this is O(n), but in a balanced tree, it's O(k + log n).\n\nSpace Complexity:\n- First approach: O(n) for storing all nodes in the list.\n- Second approach: O(h) for the recursion stack, which is O(log n) for a balanced tree and O(n) for a skewed tree.\n\nThe second approach is more efficient, especially for large trees where k is small, as it stops once the kth element is found."
    },
    {
      id: "bst-hw-2",
      question: "Implement a method to validate if a given binary tree is a valid Binary Search Tree. Your solution should handle edge cases like duplicate values appropriately.",
      solution: "```java\npublic class ValidateBST {\n    class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int x) { val = x; }\n    }\n    \n    // Approach 1: Use the BST property with min and max constraints\n    public boolean isValidBST(TreeNode root) {\n        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);\n    }\n    \n    private boolean isValidBST(TreeNode node, long min, long max) {\n        // Empty trees are valid BSTs\n        if (node == null) {\n            return true;\n        }\n        \n        // Current node's value must be between min and max\n        if (node.val <= min || node.val >= max) {\n            return false;\n        }\n        \n        // Left subtree must be < node.val and right subtree must be > node.val\n        return isValidBST(node.left, min, node.val) && \n               isValidBST(node.right, node.val, max);\n    }\n    \n    // Approach 2: In-order traversal should give sorted list\n    private Integer prev = null;\n    \n    public boolean isValidBSTInOrder(TreeNode root) {\n        prev = null;\n        return inOrderCheck(root);\n    }\n    \n    private boolean inOrderCheck(TreeNode node) {\n        if (node == null) {\n            return true;\n        }\n        \n        // Check left subtree\n        if (!inOrderCheck(node.left)) {\n            return false;\n        }\n        \n        // Check current node: it should be greater than the previous value\n        if (prev != null && node.val <= prev) {\n            return false;\n        }\n        prev = node.val;\n        \n        // Check right subtree\n        return inOrderCheck(node.right);\n    }\n}\n```\nThis solution presents two approaches to validate a BST:\n\n1. Using min/max constraints: We recursively check each node, ensuring it falls within valid bounds based on its position in the tree. This handles the BST property directly.\n\n2. Using in-order traversal: Since an in-order traversal of a BST should produce values in ascending order, we check if each node's value is greater than the previous one.\n\nBoth approaches handle duplicate values properly (considering them invalid in a BST) and have O(n) time complexity and O(h) space complexity, where h is the height of the tree."
    }
  ],
  
  quiz: [
    {
      id: "bst-quiz-1",
      question: "What is the time complexity of searching for a value in a balanced Binary Search Tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "In a balanced Binary Search Tree, search operations have a time complexity of O(log n) because at each step, we eliminate half of the remaining tree. This is equivalent to a binary search on a sorted array."
    },
    {
      id: "bst-quiz-2",
      question: "Which traversal of a Binary Search Tree yields nodes in ascending order?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correctAnswer: 1,
      explanation: "In-order traversal (left-root-right) of a Binary Search Tree visits nodes in ascending order because all nodes in the left subtree are smaller than the root, and all nodes in the right subtree are larger."
    },
    {
      id: "bst-quiz-3",
      question: "What is the worst-case time complexity for insertion in a Binary Search Tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "The worst-case time complexity for insertion in a BST is O(n), which occurs when the tree is completely skewed (essentially a linked list). In a balanced BST, it would be O(log n)."
    },
    {
      id: "bst-quiz-4",
      question: "When deleting a node with two children from a BST, which of the following can replace the deleted node?",
      options: ["Any node from the tree", "The smallest node in the right subtree", "The largest node in the left subtree", "Either the smallest node in the right subtree or the largest node in the left subtree"],
      correctAnswer: 3,
      explanation: "When deleting a node with two children, we can replace it with either the smallest node in the right subtree (in-order successor) or the largest node in the left subtree (in-order predecessor). Both maintain the BST property."
    },
    {
      id: "bst-quiz-5",
      question: "Which of these is NOT an advantage of using a BST over a sorted array?",
      options: ["Faster insertion on average", "Faster deletion on average", "Better memory utilization for dynamic data", "Constant-time access to the kth smallest element"],
      correctAnswer: 3,
      explanation: "BSTs do not provide constant-time access to the kth smallest element unless they are augmented with additional information. In contrast, sorted arrays allow O(1) access to any element by index. BSTs do offer faster insertion and deletion (O(log n) vs O(n) for sorted arrays) and better memory utilization for dynamic data."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to strengthen your understanding of Binary Search Trees and their applications. The problems range from basic BST operations to more complex tree manipulations and optimizations.",
    questions: {
      easy: [
        {
          id: "binary-tree-inorder",
          title: "Binary Tree Inorder Traversal",
          link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
          description: "Implement inorder traversal of a binary tree, which for a BST returns elements in sorted order."
        },
        {
          id: "search-in-bst",
          title: "Search in a Binary Search Tree",
          link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
          description: "Find the node in the BST that matches a given value and return the subtree rooted at that node."
        },
        {
          id: "min-absolute-diff-bst",
          title: "Minimum Absolute Difference in BST",
          link: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
          description: "Find the minimum absolute difference between any two nodes in a BST."
        },
        {
          id: "range-sum-bst",
          title: "Range Sum of BST",
          link: "https://leetcode.com/problems/range-sum-of-bst/",
          description: "Calculate the sum of all nodes in a BST whose values fall within a given range."
        }
      ],
      medium: [
        {
          id: "validate-bst",
          title: "Validate Binary Search Tree",
          link: "https://leetcode.com/problems/validate-binary-search-tree/",
          description: "Determine if a given binary tree is a valid BST according to the BST property."
        },
        {
          id: "kth-smallest-bst",
          title: "Kth Smallest Element in a BST",
          link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
          description: "Find the kth smallest element in a BST efficiently."
        },
        {
          id: "bst-iterator",
          title: "Binary Search Tree Iterator",
          link: "https://leetcode.com/problems/binary-search-tree-iterator/",
          description: "Implement an iterator over a BST with operations next() and hasNext()."
        },
        {
          id: "convert-sorted-array-to-bst",
          title: "Convert Sorted Array to Binary Search Tree",
          link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
          description: "Convert a sorted array to a height-balanced BST."
        }
      ],
      hard: [
        {
          id: "recover-bst",
          title: "Recover Binary Search Tree",
          link: "https://leetcode.com/problems/recover-binary-search-tree/",
          description: "Fix a BST where exactly two nodes have been swapped, violating the BST property."
        },
        {
          id: "count-nodes-equal-average-subtree",
          title: "Count Nodes Equal to Average of Subtree",
          link: "https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/",
          description: "Count nodes in a binary tree where the node value equals the average of all values in its subtree."
        }
      ]
    }
  }
};

export default binarySearchTreeContent; 