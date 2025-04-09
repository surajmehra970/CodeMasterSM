import { Content } from '@/types/course';

const treeTraversalContent: Content = {
  introduction: "Tree traversal is a fundamental technique for visiting each node in a tree data structure. Understanding different traversal methods is crucial for solving many tree-based problems. In this lesson, we'll explore various ways to traverse binary trees, including depth-first approaches (preorder, inorder, postorder) and breadth-first traversal (level order).",
  
  learningObjectives: [
    "Understand the concept of binary trees and their properties",
    "Master depth-first traversal techniques: preorder, inorder, and postorder",
    "Implement breadth-first (level order) traversal",
    "Compare recursive and iterative implementations of tree traversals",
    "Apply tree traversal techniques to solve common tree problems"
  ],
  
  sections: [
    {
      title: "Binary Tree Basics",
      content: "A binary tree is a hierarchical data structure where each node has at most two children, referred to as the left child and the right child. Binary trees are widely used in computer science due to their versatility and efficiency in organizing hierarchical data.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic binary tree node structure
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    
    TreeNode(int val) {
        this.val = val;
    }
    
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Example of creating a simple binary tree
//        1
//       / \\
//      2   3
//     / \\   \\
//    4   5   6
TreeNode root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);`,
          explanation: "This code defines a basic TreeNode class for a binary tree and demonstrates how to construct a simple binary tree by connecting nodes."
        }
      ]
    },
    {
      title: "Depth-First Traversals",
      content: "Depth-first traversals explore as far as possible along each branch before backtracking. There are three main types of depth-first traversals for binary trees: preorder (root, left, right), inorder (left, root, right), and postorder (left, right, root). Each traversal provides a different perspective on the tree structure.",
      codeExamples: [
        {
          language: "java",
          code: `// Recursive implementations of depth-first traversals

// 1. Preorder Traversal: Root -> Left -> Right
public void preorderTraversal(TreeNode root) {
    if (root == null) return;
    
    // Process the current node (root)
    System.out.print(root.val + " ");
    
    // Recursively traverse left subtree
    preorderTraversal(root.left);
    
    // Recursively traverse right subtree
    preorderTraversal(root.right);
}

// 2. Inorder Traversal: Left -> Root -> Right
public void inorderTraversal(TreeNode root) {
    if (root == null) return;
    
    // Recursively traverse left subtree
    inorderTraversal(root.left);
    
    // Process the current node (root)
    System.out.print(root.val + " ");
    
    // Recursively traverse right subtree
    inorderTraversal(root.right);
}

// 3. Postorder Traversal: Left -> Right -> Root
public void postorderTraversal(TreeNode root) {
    if (root == null) return;
    
    // Recursively traverse left subtree
    postorderTraversal(root.left);
    
    // Recursively traverse right subtree
    postorderTraversal(root.right);
    
    // Process the current node (root)
    System.out.print(root.val + " ");
}

// For the tree:
//        1
//       / \\
//      2   3
//     / \\   \\
//    4   5   6
// The traversal outputs would be:
// Preorder: 1 2 4 5 3 6
// Inorder: 4 2 5 1 3 6
// Postorder: 4 5 2 6 3 1`,
          explanation: "These recursive implementations demonstrate the three classic depth-first traversal methods. Each algorithm visits the nodes in a different order, which is useful for different scenarios."
        },
        {
          language: "java",
          code: `// Iterative implementations of depth-first traversals (using stack)

// 1. Iterative Preorder Traversal
public List<Integer> preorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    
    while (!stack.isEmpty()) {
        TreeNode current = stack.pop();
        result.add(current.val);
        
        // Push right child first so that left child is processed first (LIFO)
        if (current.right != null) {
            stack.push(current.right);
        }
        if (current.left != null) {
            stack.push(current.left);
        }
    }
    
    return result;
}

// 2. Iterative Inorder Traversal
public List<Integer> inorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    
    while (current != null || !stack.isEmpty()) {
        // Reach the leftmost node of the current subtree
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        
        // Current is now null, so pop the stack
        current = stack.pop();
        result.add(current.val);
        
        // Move to the right subtree
        current = current.right;
    }
    
    return result;
}

// 3. Iterative Postorder Traversal (using two stacks)
public List<Integer> postorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Stack<TreeNode> stack1 = new Stack<>();
    Stack<TreeNode> stack2 = new Stack<>();
    
    stack1.push(root);
    
    // Fill stack2 with postorder traversal in reverse
    while (!stack1.isEmpty()) {
        TreeNode current = stack1.pop();
        stack2.push(current);
        
        if (current.left != null) {
            stack1.push(current.left);
        }
        if (current.right != null) {
            stack1.push(current.right);
        }
    }
    
    // Pop stack2 to get postorder traversal
    while (!stack2.isEmpty()) {
        result.add(stack2.pop().val);
    }
    
    return result;
}`,
          explanation: "These iterative implementations provide non-recursive alternatives to the depth-first traversals. They use stacks to simulate the recursion call stack and can be more efficient for large trees as they don't risk stack overflow."
        }
      ]
    },
    {
      title: "Breadth-First Traversal (Level Order)",
      content: "Breadth-first traversal, also known as level order traversal, visits all nodes on the same level before moving to the next level. This traversal starts at the root and explores all neighbors at the present depth before moving on to nodes at the next depth level.",
      codeExamples: [
        {
          language: "java",
          code: `// Level Order Traversal (Breadth-First)
public List<List<Integer>> levelOrderTraversal(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode current = queue.poll();
            currentLevel.add(current.val);
            
            if (current.left != null) {
                queue.offer(current.left);
            }
            if (current.right != null) {
                queue.offer(current.right);
            }
        }
        
        result.add(currentLevel);
    }
    
    return result;
}

// For the tree:
//        1
//       / \\
//      2   3
//     / \\   \\
//    4   5   6
// The level order traversal would be:
// [[1], [2, 3], [4, 5, 6]]

// Basic level order (not separated by level)
public List<Integer> simpleLevelOrder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        result.add(current.val);
        
        if (current.left != null) {
            queue.offer(current.left);
        }
        if (current.right != null) {
            queue.offer(current.right);
        }
    }
    
    return result;
}
// For the same tree, the simple level order would be:
// [1, 2, 3, 4, 5, 6]`,
          explanation: "This implementation uses a queue to perform breadth-first traversal. The first version groups nodes by level, while the second version gives a flat list of nodes in level order. BFS is particularly useful for finding the shortest path in unweighted graphs and trees."
        }
      ]
    },
    {
      title: "Applications and Special Cases",
      content: "Tree traversals are used in many applications and can be adapted to solve specific problems. Some common applications include validating binary search trees, finding the kth smallest element, and reconstructing a tree from traversal sequences.",
      codeExamples: [
        {
          language: "java",
          code: `// 1. Checking if a binary tree is a valid BST using inorder traversal
public boolean isValidBST(TreeNode root) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    TreeNode prev = null;
    
    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        
        // Check if the current value is less than or equal to the previous value
        if (prev != null && current.val <= prev.val) {
            return false;
        }
        
        prev = current;
        current = current.right;
    }
    
    return true;
}

// 2. Finding the kth smallest element in a BST using inorder traversal
public int kthSmallest(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    int count = 0;
    
    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        count++;
        
        if (count == k) {
            return current.val;
        }
        
        current = current.right;
    }
    
    return -1; // K is larger than the number of elements in the BST
}

// 3. Building a tree from preorder and inorder traversal
public TreeNode buildTree(int[] preorder, int[] inorder) {
    return buildTreeHelper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}

private TreeNode buildTreeHelper(int[] preorder, int preStart, int preEnd, 
                                int[] inorder, int inStart, int inEnd) {
    if (preStart > preEnd || inStart > inEnd) {
        return null;
    }
    
    // The first element in preorder is the root
    int rootValue = preorder[preStart];
    TreeNode root = new TreeNode(rootValue);
    
    // Find the position of the root in inorder traversal
    int rootIndex = 0;
    for (int i = inStart; i <= inEnd; i++) {
        if (inorder[i] == rootValue) {
            rootIndex = i;
            break;
        }
    }
    
    // Calculate the size of left subtree
    int leftSubtreeSize = rootIndex - inStart;
    
    // Recursively build left and right subtrees
    root.left = buildTreeHelper(preorder, preStart + 1, preStart + leftSubtreeSize, 
                               inorder, inStart, rootIndex - 1);
    root.right = buildTreeHelper(preorder, preStart + leftSubtreeSize + 1, preEnd, 
                                inorder, rootIndex + 1, inEnd);
    
    return root;
}`,
          explanation: "These examples show how tree traversals can be applied to solve common problems. The inorder traversal of a binary search tree visits nodes in sorted order, making it useful for validation and finding the kth smallest element. Preorder and inorder traversals together can uniquely determine a binary tree's structure."
        }
      ]
    },
    {
      title: "Morris Traversal - Constant Space Traversal",
      content: "Morris traversal allows for tree traversal without using recursion or a stack, achieving O(1) space complexity. It temporarily modifies the tree structure to create links to successor nodes, but restores the original structure before finishing.",
      codeExamples: [
        {
          language: "java",
          code: `// Morris Inorder Traversal (O(1) space complexity)
public List<Integer> morrisInorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    TreeNode current = root;
    
    while (current != null) {
        // If left child is null, visit the node and move to the right
        if (current.left == null) {
            result.add(current.val);
            current = current.right;
        } else {
            // Find the predecessor of current node in the inorder traversal
            TreeNode predecessor = current.left;
            while (predecessor.right != null && predecessor.right != current) {
                predecessor = predecessor.right;
            }
            
            // If predecessor's right is null, create a link to current
            // and move to the left child
            if (predecessor.right == null) {
                predecessor.right = current;
                current = current.left;
            } 
            // If predecessor's right points to current, we've visited the left subtree
            // Remove the link, visit the current node and move to the right
            else {
                predecessor.right = null;
                result.add(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}

// Morris Preorder Traversal
public List<Integer> morrisPreorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    TreeNode current = root;
    
    while (current != null) {
        // If left child is null, visit the node and move to the right
        if (current.left == null) {
            result.add(current.val);
            current = current.right;
        } else {
            // Find the predecessor of current node in the inorder traversal
            TreeNode predecessor = current.left;
            while (predecessor.right != null && predecessor.right != current) {
                predecessor = predecessor.right;
            }
            
            // If predecessor's right is null, create a link to current
            // Visit the current node, and move to the left child
            if (predecessor.right == null) {
                result.add(current.val); // Preorder: visit before going left
                predecessor.right = current;
                current = current.left;
            } 
            // If predecessor's right points to current, we've visited the left subtree
            // Remove the link and move to the right
            else {
                predecessor.right = null;
                current = current.right;
            }
        }
    }
    
    return result;
}`,
          explanation: "Morris traversal achieves constant space complexity by modifying the tree's structure temporarily. This technique is particularly useful when memory usage is a concern. The key idea is to create a temporary link from the rightmost node in the left subtree to the current node, allowing us to return to the current node after processing the left subtree."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "tt-hw1",
      question: "Implement a function to serialize and deserialize a binary tree. Serialization converts a tree into a string representation, while deserialization reconstructs the tree from the string. Use any traversal method of your choice.",
      solution: "Use preorder traversal with special markers for null nodes to serialize the tree. For deserialization, use a queue or an index to process nodes in the same order."
    },
    {
      id: "tt-hw2",
      question: "Implement a function to find the vertical order traversal of a binary tree. In a vertical traversal, nodes that have the same horizontal distance from the root are printed from top to bottom, starting from the leftmost column and moving to the right.",
      solution: "Assign a horizontal distance value to each node. Use BFS traversal, and for each node, store its value along with its horizontal distance. Group values by horizontal distance, and sort each group by level."
    },
    {
      id: "tt-hw3",
      question: "Implement a function to find the boundary traversal of a binary tree. The boundary consists of nodes on the leftmost edge, leaves, and nodes on the rightmost edge in counter-clockwise order.",
      solution: "Divide the problem into three parts: 1) Traverse the left boundary (excluding leaves), 2) Collect all leaf nodes using inorder traversal, 3) Traverse the right boundary (excluding leaves) in reverse order."
    }
  ],
  
  quiz: [
    {
      id: "tt-q1",
      question: "Which traversal visits the root node first?",
      options: [
        "Inorder traversal",
        "Preorder traversal",
        "Postorder traversal",
        "Level order traversal"
      ],
      correctAnswer: 1,
      explanation: "Preorder traversal follows the Root-Left-Right pattern, visiting the root node before exploring any other nodes."
    },
    {
      id: "tt-q2",
      question: "If a binary search tree is traversed in inorder, what will be the order of the values?",
      options: [
        "Ascending order",
        "Descending order",
        "Level by level",
        "Random order"
      ],
      correctAnswer: 0,
      explanation: "Inorder traversal of a binary search tree visits nodes in ascending order because it follows the Left-Root-Right pattern, and in a BST, left children < root < right children."
    },
    {
      id: "tt-q3",
      question: "Which data structure is used in the iterative implementation of breadth-first traversal?",
      options: [
        "Stack",
        "Queue",
        "Linked List",
        "Hash Table"
      ],
      correctAnswer: 1,
      explanation: "Breadth-first traversal (level order) uses a queue to visit nodes level by level. The First-In-First-Out (FIFO) nature of queues ensures that nodes are processed in the correct order."
    },
    {
      id: "tt-q4",
      question: "What traversal is typically used to delete a binary tree?",
      options: [
        "Preorder",
        "Inorder",
        "Postorder",
        "Level order"
      ],
      correctAnswer: 2,
      explanation: "Postorder traversal (Left-Right-Root) is typically used for deleting a binary tree because it ensures that child nodes are deleted before their parent nodes, preventing memory leaks."
    },
    {
      id: "tt-q5",
      question: "Which traversal technique has a space complexity of O(1) without using recursion or an explicit stack?",
      options: [
        "Standard inorder traversal",
        "Standard preorder traversal",
        "Morris traversal",
        "Level order traversal"
      ],
      correctAnswer: 2,
      explanation: "Morris traversal achieves O(1) space complexity by temporarily modifying the tree structure to create links to successor nodes, eliminating the need for recursion or an explicit stack."
    }
  ]
};

export default treeTraversalContent; 