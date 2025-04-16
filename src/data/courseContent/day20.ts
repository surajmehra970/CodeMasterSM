import { Content } from '@/types/course';

const avlTreeContent: Content = {
  introduction: "AVL trees are self-balancing binary search trees where the height difference between left and right subtrees (balance factor) of any node is at most 1. This balance guarantee ensures O(log n) operations even in worst cases, addressing the main limitation of regular BSTs which can degenerate into linked lists. AVL trees maintain their balance through rotation operations performed after insertions and deletions.",
  
  learningObjectives: [
    "Understand the concept of balanced trees and balance factors",
    "Implement AVL tree rotations (single and double)",
    "Develop insertion and deletion operations that maintain balance",
    "Compare AVL trees with standard BSTs and other balanced tree structures",
    "Analyze the time complexity improvements of AVL trees"
  ],
  
  sections: [
    {
      title: "Balance Factor and Tree Height",
      content: `The balance factor of a node is defined as the height difference between its left and right subtrees. In AVL trees, this value must be -1, 0, or 1 for every node.

Height of a node = 1 + max(height of left subtree, height of right subtree)
Balance Factor = height of left subtree - height of right subtree

When the balance factor becomes -2 or 2 after an insertion or deletion, rotations are performed to restore balance.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-md">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">AVL Tree Balance Factors</h4>
    <div class="flex justify-center">
      <img src="/images/avl-balance-factors.svg" alt="AVL Tree Balance Factors" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">Balance factors shown for each node in a balanced AVL tree</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// AVL Tree Node
class Node {
    int key, height;
    Node left, right;
    
    Node(int key) {
        this.key = key;
        this.height = 1; // New node is initially at height 1
    }
}

// AVL Tree class
class AVLTree {
    Node root;
    
    // Get height of a node (null nodes have height 0)
    int height(Node node) {
        return (node == null) ? 0 : node.height;
    }
    
    // Calculate balance factor of a node
    int getBalanceFactor(Node node) {
        return (node == null) ? 0 : height(node.left) - height(node.right);
    }
    
    // Update height of a node based on its children
    void updateHeight(Node node) {
        if (node != null) {
            node.height = 1 + Math.max(height(node.left), height(node.right));
        }
    }
}`,
          explanation: "This implementation defines an AVL tree node with a height attribute and methods to calculate and update node heights and balance factors. The height of a null node is 0, and new nodes start with height 1. The balance factor is the difference between the heights of the left and right subtrees."
        }
      ]
    },
    {
      title: "Rotation Operations",
      content: "Rotations are tree transformations that rebalance the tree while preserving the BST property. There are four types of rotations: left rotation, right rotation, left-right rotation (double rotation), and right-left rotation (double rotation).",
      codeExamples: [
        {
          language: "java",
          code: `// Right rotation (for left-heavy imbalance)
Node rightRotate(Node y) {
    Node x = y.left;
    Node T2 = x.right;
    
    // Perform rotation
    x.right = y;
    y.left = T2;
    
    // Update heights
    updateHeight(y);
    updateHeight(x);
    
    // Return new root
    return x;
}

// Left rotation (for right-heavy imbalance)
Node leftRotate(Node x) {
    Node y = x.right;
    Node T2 = y.left;
    
    // Perform rotation
    y.left = x;
    x.right = T2;
    
    // Update heights
    updateHeight(x);
    updateHeight(y);
    
    // Return new root
    return y;
}

// Left-Right rotation (for left-right imbalance)
Node leftRightRotate(Node z) {
    z.left = leftRotate(z.left);
    return rightRotate(z);
}

// Right-Left rotation (for right-left imbalance)
Node rightLeftRotate(Node z) {
    z.right = rightRotate(z.right);
    return leftRotate(z);
}`,
          explanation: "These methods implement the four rotation operations needed to rebalance AVL trees. Single rotations (left or right) handle simple imbalances, while double rotations handle more complex cases. Each rotation preserves the BST property while adjusting the height balance."
        }
      ]
    },
    {
      title: "AVL Tree Insertion",
      content: "Insertion in an AVL tree starts like a regular BST insertion, followed by rebalancing from the insertion point back up to the root.",
      codeExamples: [
        {
          language: "java",
          code: `// Insert a new key in the AVL tree
Node insert(Node node, int key) {
    // 1. Perform standard BST insertion
    if (node == null) {
        return new Node(key);
    }
    
    if (key < node.key) {
        node.left = insert(node.left, key);
    } else if (key > node.key) {
        node.right = insert(node.right, key);
    } else {
        // Duplicate keys not allowed
        return node;
    }
    
    // 2. Update height of this ancestor node
    updateHeight(node);
    
    // 3. Get the balance factor to check if this node became unbalanced
    int balance = getBalanceFactor(node);
    
    // 4. If unbalanced, there are 4 cases
    
    // Left Left Case
    if (balance > 1 && key < node.left.key) {
        return rightRotate(node);
    }
    
    // Right Right Case
    if (balance < -1 && key > node.right.key) {
        return leftRotate(node);
    }
    
    // Left Right Case
    if (balance > 1 && key > node.left.key) {
        return leftRightRotate(node);
    }
    
    // Right Left Case
    if (balance < -1 && key < node.right.key) {
        return rightLeftRotate(node);
    }
    
    // Return the unchanged node pointer
    return node;
}`,
          explanation: "This insert method first performs a standard BST insertion, then rebalances the tree by updating heights and performing rotations as needed. It handles all four imbalance cases: left-left (right rotation), right-right (left rotation), left-right (double rotation), and right-left (double rotation)."
        }
      ]
    },
    {
      title: "AVL Tree Deletion",
      content: "Deletion in an AVL tree follows the BST deletion algorithm, with added steps to rebalance the tree afterward.",
      codeExamples: [
        {
          language: "java",
          code: `// Delete a node with given key and return new root
Node delete(Node root, int key) {
    // 1. Perform standard BST delete
    if (root == null) {
        return root;
    }
    
    // Navigate to the node to be deleted
    if (key < root.key) {
        root.left = delete(root.left, key);
    } else if (key > root.key) {
        root.right = delete(root.right, key);
    } else {
        // Node with only one child or no child
        if (root.left == null) {
            return root.right;
        } else if (root.right == null) {
            return root.left;
        }
        
        // Node with two children: Get the inorder successor
        root.key = minValue(root.right);
        
        // Delete the inorder successor
        root.right = delete(root.right, root.key);
    }
    
    // If the tree had only one node then return
    if (root == null) {
        return root;
    }
    
    // 2. Update height of current node
    updateHeight(root);
    
    // 3. Get the balance factor
    int balance = getBalanceFactor(root);
    
    // 4. Rebalance if needed
    
    // Left Left Case
    if (balance > 1 && getBalanceFactor(root.left) >= 0) {
        return rightRotate(root);
    }
    
    // Left Right Case
    if (balance > 1 && getBalanceFactor(root.left) < 0) {
        return leftRightRotate(root);
    }
    
    // Right Right Case
    if (balance < -1 && getBalanceFactor(root.right) <= 0) {
        return leftRotate(root);
    }
    
    // Right Left Case
    if (balance < -1 && getBalanceFactor(root.right) > 0) {
        return rightLeftRotate(root);
    }
    
    return root;
}

// Find the node with minimum value in a BST
int minValue(Node node) {
    int minValue = node.key;
    while (node.left != null) {
        minValue = node.left.key;
        node = node.left;
    }
    return minValue;
}`,
          explanation: "The delete method handles node removal similarly to a standard BST, including the special case of removing a node with two children. After deletion, it updates heights and rebalances the tree by performing appropriate rotations based on the balance factors."
        }
      ]
    },
    {
      title: "AVL Trees vs. Other Balanced Trees",
      content: "AVL trees are just one type of self-balancing BST. They compare favorably with standard BSTs but have tradeoffs compared to other balanced tree structures.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Comparison of AVL Trees with other data structures:

1. AVL Trees vs. Standard BSTs:
   - AVL Trees guarantee O(log n) operations even in worst cases
   - Regular BSTs can degenerate to O(n) operations
   - AVL Trees require more overhead for balancing
   - AVL Trees are preferred when search operations are frequent

2. AVL Trees vs. Red-Black Trees:
   - AVL Trees are more strictly balanced (heights differ by at most 1)
   - Red-Black Trees allow more imbalance (heights can differ by a factor of 2)
   - AVL Trees provide faster lookups due to better balance
   - Red-Black Trees have faster insertions and deletions due to fewer rotations
   - Red-Black Trees are used in Java's TreeMap and C++'s map implementations

3. AVL Trees vs. B-Trees:
   - B-Trees are more suited for disk-based storage systems
   - B-Trees reduce disk I/O by having more keys per node
   - AVL Trees are typically used for in-memory operations
   - B-Trees form the basis of many database indexes

4. Time Complexity:
   - AVL Search: O(log n) worst case
   - AVL Insert: O(log n) worst case
   - AVL Delete: O(log n) worst case
   
   - Standard BST Search: O(n) worst case, O(log n) average
   - Standard BST Insert: O(n) worst case, O(log n) average
   - Standard BST Delete: O(n) worst case, O(log n) average
*/`,
          explanation: "This comparison highlights the advantages and disadvantages of AVL trees relative to other data structures. AVL trees excel at providing guaranteed logarithmic search times but require more overhead for maintaining stricter balance compared to structures like Red-Black trees."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "avl-hw-1",
      question: "Implement a method in the AVL tree class to find the height of the tree and verify its balance property. The method should return true if the tree is a valid AVL tree (all nodes have a balance factor between -1 and 1) and false otherwise.",
      solution: "```java\npublic class AVLValidator {\n    static class Node {\n        int key, height;\n        Node left, right;\n        \n        Node(int key) {\n            this.key = key;\n            this.height = 1;\n        }\n    }\n    \n    // Get height of a node\n    private int height(Node node) {\n        return (node == null) ? 0 : node.height;\n    }\n    \n    // Calculate balance factor\n    private int getBalanceFactor(Node node) {\n        return (node == null) ? 0 : height(node.left) - height(node.right);\n    }\n    \n    // Verify if tree is a valid AVL tree\n    public boolean isAVLTree(Node root) {\n        // Empty tree is a valid AVL tree\n        if (root == null) {\n            return true;\n        }\n        \n        // Get balance factor\n        int balance = getBalanceFactor(root);\n        \n        // Check if balance factor is valid (-1, 0, or 1)\n        if (balance < -1 || balance > 1) {\n            return false;\n        }\n        \n        // Check if heights are correct\n        int leftHeight = height(root.left);\n        int rightHeight = height(root.right);\n        int expectedHeight = 1 + Math.max(leftHeight, rightHeight);\n        \n        if (root.height != expectedHeight) {\n            return false;\n        }\n        \n        // Recursively check left and right subtrees\n        return isAVLTree(root.left) && isAVLTree(root.right);\n    }\n}\n```\nThis solution verifies if a tree is a valid AVL tree by recursively checking that:\n1. Each node's balance factor is between -1 and 1\n2. Each node's height is correctly calculated\n3. Both the left and right subtrees are valid AVL trees\n\nTime complexity is O(n) where n is the number of nodes, as we need to visit each node once. Space complexity is O(h) where h is the height of the tree, for the recursion stack."
    },
    {
      id: "avl-hw-2",
      question: "Implement a method to convert a sorted array into a balanced AVL tree. The resulting tree should have minimum possible height.",
      solution: "```java\npublic class SortedArrayToAVL {\n    static class Node {\n        int key, height;\n        Node left, right;\n        \n        Node(int key) {\n            this.key = key;\n            this.height = 1;\n        }\n    }\n    \n    // Update height of a node\n    private void updateHeight(Node node) {\n        if (node != null) {\n            node.height = 1 + Math.max(\n                (node.left != null) ? node.left.height : 0,\n                (node.right != null) ? node.right.height : 0\n            );\n        }\n    }\n    \n    // Convert sorted array to AVL tree\n    public Node sortedArrayToAVL(int[] arr) {\n        return sortedArrayToAVL(arr, 0, arr.length - 1);\n    }\n    \n    private Node sortedArrayToAVL(int[] arr, int start, int end) {\n        // Base case\n        if (start > end) {\n            return null;\n        }\n        \n        // Get the middle element and make it root\n        int mid = start + (end - start) / 2;\n        Node node = new Node(arr[mid]);\n        \n        // Recursively construct left and right subtrees\n        node.left = sortedArrayToAVL(arr, start, mid - 1);\n        node.right = sortedArrayToAVL(arr, mid + 1, end);\n        \n        // Update height\n        updateHeight(node);\n        \n        return node;\n    }\n}\n```\nThis solution converts a sorted array to an AVL tree by recursively selecting the middle element as the root and building balanced left and right subtrees. Since the array is already sorted, this approach naturally creates a balanced tree with minimal height.\n\nTime complexity is O(n) where n is the number of elements in the array, as we process each element exactly once. Space complexity is O(log n) for the recursion stack in a balanced tree."
    }
  ],
  
  quiz: [
    {
      id: "avl-quiz-1",
      question: "What is the maximum allowed difference between the heights of left and right subtrees in an AVL tree?",
      options: ["0", "1", "2", "No limit"],
      correctAnswer: 1,
      explanation: "In an AVL tree, the height difference between left and right subtrees (balance factor) of any node must be at most 1. This means the balance factor can be -1, 0, or 1 for the tree to remain balanced."
    },
    {
      id: "avl-quiz-2",
      question: "Which rotation is needed to balance an AVL tree after inserting a node into the right subtree of the right child of a node?",
      options: ["Left rotation", "Right rotation", "Left-Right double rotation", "Right-Left double rotation"],
      correctAnswer: 0,
      explanation: "This scenario creates a right-right imbalance (balance factor of -2 with the right subtree's balance factor being negative). A left rotation is needed to rebalance the tree in this case."
    },
    {
      id: "avl-quiz-3",
      question: "What is the worst-case time complexity for insertion in an AVL tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "The worst-case time complexity for insertion in an AVL tree is O(log n). This includes O(log n) time to find the insertion position and potentially O(log n) time to rebalance the tree by performing rotations up to the root."
    },
    {
      id: "avl-quiz-4",
      question: "How many rotations might be required after a single insertion in an AVL tree?",
      options: ["At most 1", "At most 2", "O(log n)", "O(n)"],
      correctAnswer: 2,
      explanation: "After a single insertion, up to O(log n) rotations might be required in the worst case, as rebalancing may need to propagate all the way up to the root. However, in practice, the number of rotations is typically much smaller."
    },
    {
      id: "avl-quiz-5",
      question: "Which of the following is NOT an advantage of AVL trees over standard BSTs?",
      options: ["Guaranteed O(log n) search time", "Guaranteed O(log n) insertion time", "Simpler implementation with fewer special cases", "Better worst-case performance"],
      correctAnswer: 2,
      explanation: "AVL trees do not have simpler implementation compared to standard BSTs. In fact, they are more complex due to the need for tracking heights and performing rotations to maintain balance. The advantage is in performance guarantees, not simplicity."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to reinforce your understanding of AVL trees and balanced binary search trees in general. These exercises focus on tree balancing, rotations, and applications of balanced BSTs.",
    questions: {
      easy: [
        {
          id: "balanced-binary-tree",
          title: "Balanced Binary Tree",
          link: "https://leetcode.com/problems/balanced-binary-tree/",
          description: "Determine if a binary tree is height-balanced (similar to the AVL balance condition)."
        },
        {
          id: "convert-sorted-array-to-bst",
          title: "Convert Sorted Array to Binary Search Tree",
          link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
          description: "Convert a sorted array to a height-balanced binary search tree."
        },
        {
          id: "maximum-depth-of-binary-tree",
          title: "Maximum Depth of Binary Tree",
          link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
          description: "Find the maximum depth of a binary tree, which is a key operation in AVL trees."
        }
      ],
      medium: [
        {
          id: "balance-a-binary-search-tree",
          title: "Balance a Binary Search Tree",
          link: "https://leetcode.com/problems/balance-a-binary-search-tree/",
          description: "Convert an unbalanced BST to a balanced BST, similar to AVL tree balancing."
        },
        {
          id: "construct-binary-search-tree-from-preorder-traversal",
          title: "Construct Binary Search Tree from Preorder Traversal",
          link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
          description: "Build a balanced BST from a preorder traversal sequence."
        },
        {
          id: "count-complete-tree-nodes",
          title: "Count Complete Tree Nodes",
          link: "https://leetcode.com/problems/count-complete-tree-nodes/",
          description: "Count nodes in a complete binary tree using properties of balanced trees."
        }
      ],
      hard: [
        {
          id: "binary-tree-maximum-path-sum",
          title: "Binary Tree Maximum Path Sum",
          link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
          description: "Find the maximum path sum in a binary tree, applying tree traversal techniques important in AVL operations."
        },
        {
          id: "serialize-and-deserialize-binary-tree",
          title: "Serialize and Deserialize Binary Tree",
          link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
          description: "Design an algorithm to serialize and deserialize a binary tree, which can be applied to AVL trees."
        }
      ]
    }
  }
};

export default avlTreeContent; 