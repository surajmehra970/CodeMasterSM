import { Content } from '@/types/course';

const mockTestTreesContent: Content = {
  introduction: "This mock test is designed to assess your understanding of tree algorithms and concepts covered in the previous lessons. You'll be challenged with problems related to tree traversals, BFS, DFS, lowest common ancestor, and tree diameter calculations. These questions test both your theoretical knowledge and practical implementation skills for tree algorithms.",
  
  learningObjectives: [
    "Test your understanding of different tree traversal techniques",
    "Apply BFS and DFS to solve complex tree problems",
    "Implement algorithms for finding the lowest common ancestor",
    "Calculate tree diameter and other tree metrics",
    "Analyze time and space complexity of tree algorithms"
  ],
  
  sections: [
    {
      title: "Instructions for the Mock Test",
      content: "This mock test consists of 5 coding challenges and 5 theoretical questions. For coding challenges, implement the solution in your preferred programming language. The problems increase in difficulty, so manage your time accordingly. You have 2 hours to complete the test. Review your solutions for correctness and efficiency before submission.",
      codeExamples: []
    },
    {
      title: "Coding Problems",
      content: "Solve the following coding problems related to tree algorithms. Focus on both correctness and efficiency in your solutions.",
      codeExamples: [
        {
          language: "java",
          code: `// Problem 1: Validate Binary Search Tree
// Determine if a binary tree is a valid binary search tree (BST).
// A valid BST is defined as follows:
// - The left subtree of a node contains only nodes with keys less than the node's key.
// - The right subtree of a node contains only nodes with keys greater than the node's key.
// - Both the left and right subtrees must also be binary search trees.

public boolean isValidBST(TreeNode root) {
    // Implement your solution here
    return isValidBSTHelper(root, null, null);
}

private boolean isValidBSTHelper(TreeNode node, Integer lower, Integer upper) {
    if (node == null) return true;
    
    int val = node.val;
    
    // Check if the current node's value is within bounds
    if (lower != null && val <= lower) return false;
    if (upper != null && val >= upper) return false;
    
    // Check right subtree with the current node's value as the lower bound
    if (!isValidBSTHelper(node.right, val, upper)) return false;
    
    // Check left subtree with the current node's value as the upper bound
    if (!isValidBSTHelper(node.left, lower, val)) return false;
    
    return true;
}

// Problem 2: Maximum Path Sum in Binary Tree
// Find the maximum path sum in a binary tree. The path may start and end at any node.
// A path is defined as any sequence of nodes from some starting node to any node
// such that no node is visited more than once.

public int maxPathSum(TreeNode root) {
    // Implement your solution here
    int[] maxSum = new int[1];
    maxSum[0] = Integer.MIN_VALUE;
    
    maxPathSumHelper(root, maxSum);
    
    return maxSum[0];
}

private int maxPathSumHelper(TreeNode node, int[] maxSum) {
    if (node == null) return 0;
    
    // Calculate the maximum path sum for left and right subtrees
    int leftSum = Math.max(0, maxPathSumHelper(node.left, maxSum));
    int rightSum = Math.max(0, maxPathSumHelper(node.right, maxSum));
    
    // Update the maximum path sum that passes through the current node
    maxSum[0] = Math.max(maxSum[0], leftSum + rightSum + node.val);
    
    // Return the maximum path sum that starts at the current node and extends in one direction
    return Math.max(leftSum, rightSum) + node.val;
}

// Problem 3: Serialize and Deserialize Binary Tree
// Design an algorithm to serialize and deserialize a binary tree.
// Serialization is the process of converting a data structure into a sequence of bytes
// so that it can be stored or transmitted.
// Deserialization is the reverse process.

// Serialize a binary tree to a string
public String serialize(TreeNode root) {
    // Implement your solution here
    if (root == null) return "null";
    
    StringBuilder sb = new StringBuilder();
    // Use level order traversal (BFS)
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        
        if (node == null) {
            sb.append("null,");
            continue;
        }
        
        sb.append(node.val).append(",");
        queue.offer(node.left);
        queue.offer(node.right);
    }
    
    return sb.toString();
}

// Deserialize a string to a binary tree
public TreeNode deserialize(String data) {
    // Implement your solution here
    if (data.equals("null")) return null;
    
    String[] values = data.split(",");
    TreeNode root = new TreeNode(Integer.parseInt(values[0]));
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    int i = 1;
    while (!queue.isEmpty() && i < values.length) {
        TreeNode node = queue.poll();
        
        // Process left child
        if (!values[i].equals("null")) {
            node.left = new TreeNode(Integer.parseInt(values[i]));
            queue.offer(node.left);
        }
        i++;
        
        // Process right child
        if (i < values.length && !values[i].equals("null")) {
            node.right = new TreeNode(Integer.parseInt(values[i]));
            queue.offer(node.right);
        }
        i++;
    }
    
    return root;
}

// Problem 4: Count Complete Tree Nodes
// Given a complete binary tree, count the number of nodes.
// A complete binary tree is a binary tree in which every level, except possibly the last,
// is completely filled, and all nodes are as far left as possible.

public int countNodes(TreeNode root) {
    // Implement your solution here
    if (root == null) return 0;
    
    int leftHeight = leftHeight(root);
    int rightHeight = rightHeight(root);
    
    // If the tree is perfect, use the formula 2^h - 1
    if (leftHeight == rightHeight) {
        return (1 << leftHeight) - 1;
    }
    
    // Otherwise, recursively count nodes in left and right subtrees
    return 1 + countNodes(root.left) + countNodes(root.right);
}

private int leftHeight(TreeNode node) {
    int height = 0;
    while (node != null) {
        height++;
        node = node.left;
    }
    return height;
}

private int rightHeight(TreeNode node) {
    int height = 0;
    while (node != null) {
        height++;
        node = node.right;
    }
    return height;
}

// Problem 5: Binary Tree Cameras
// Given a binary tree, place cameras on nodes such that every node is monitored.
// A node is monitored if there is a camera at the node, or if the node's parent or
// any of its children has a camera.
// Return the minimum number of cameras needed to monitor all nodes in the tree.

public int minCameraCover(TreeNode root) {
    // Implement your solution here
    int[] cameras = new int[1];
    int status = dfs(root, cameras);
    
    // If the root is not monitored, we need one more camera
    return status == 0 ? cameras[0] + 1 : cameras[0];
}

// 0: not monitored, 1: monitored, 2: has camera
private int dfs(TreeNode node, int[] cameras) {
    if (node == null) return 1; // Null nodes are considered monitored
    
    int left = dfs(node.left, cameras);
    int right = dfs(node.right, cameras);
    
    // If either child is not monitored, we need a camera here
    if (left == 0 || right == 0) {
        cameras[0]++;
        return 2;
    }
    
    // If either child has a camera, this node is monitored
    if (left == 2 || right == 2) {
        return 1;
    }
    
    // Both children are monitored, but neither has a camera
    return 0;
}`,
          explanation: "These coding problems cover a range of tree algorithms, including BST validation, maximum path sum calculation, tree serialization, node counting in complete trees, and optimal camera placement. Each problem requires a deep understanding of tree properties and traversal techniques."
        }
      ]
    },
    {
      title: "Theoretical Questions",
      content: "Answer the following theoretical questions about tree algorithms. Be specific and concise in your explanations.",
      codeExamples: [
        {
          language: "text",
          code: `// Question 1: Explain the difference between a binary tree and a binary search tree.
// What additional property makes a binary tree a binary search tree?

Binary Tree: A tree data structure where each node has at most two children, referred to as the left child and right child.

Binary Search Tree (BST): A binary tree with the additional property that for each node, all elements in its left subtree have values less than the node's value, and all elements in its right subtree have values greater than the node's value.

// Question 2: Compare and contrast BFS and DFS tree traversal techniques.
// When would you prefer one over the other?

BFS (Breadth-First Search):
- Explores all nodes at the current depth before moving to nodes at the next depth
- Uses a queue data structure
- Finds the shortest path in unweighted trees
- Good for finding nodes closest to the root
- Uses more memory for wide trees (O(w) where w is the maximum width)

DFS (Depth-First Search):
- Explores as far as possible along each branch before backtracking
- Uses a stack (or recursion) data structure
- Better for exhaustive searches and certain problems like topological sorting
- Uses less memory for deep trees (O(h) where h is the height)
- Can be implemented as preorder, inorder, or postorder traversal

Prefer BFS when:
- Finding the shortest path in unweighted trees
- Working with trees where the solution is likely near the root
- Doing level-order operations

Prefer DFS when:
- Exploring all possible paths
- The tree is very deep and solutions are likely at the bottom
- Memory usage is a concern
- Implementing operations that naturally align with recursion

// Question 3: Describe the concept of Lowest Common Ancestor (LCA) in a binary tree.
// How does the algorithm for finding LCA differ between a binary tree and a binary search tree?

Lowest Common Ancestor (LCA) is the deepest node in a tree that has both target nodes as descendants (where a node can be a descendant of itself).

For a general binary tree:
- The algorithm typically uses a recursive approach
- It requires a post-order traversal (checking left and right subtrees before processing the current node)
- Time complexity is O(n) as it may need to search the entire tree
- It checks if each node is one of the targets or has a path to one of the targets

For a binary search tree:
- The algorithm can leverage the ordered property of the BST
- If both target nodes are less than the current node, the LCA is in the left subtree
- If both are greater, the LCA is in the right subtree
- If they're on different sides (or one of them is the current node), the current node is the LCA
- Time complexity is O(h) where h is the height of the tree (O(log n) for balanced BSTs)

// Question 4: Explain the diameter of a binary tree. How would you calculate it efficiently?

The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root and represents the number of edges on the path.

Efficient calculation:
1. Use a depth-first (post-order) traversal approach
2. For each node, calculate the height of its left and right subtrees
3. The potential diameter passing through this node is the sum of these heights plus 2 (for the edges connecting to the node)
4. Keep track of the maximum diameter found during the traversal
5. Time complexity is O(n) as we visit each node once

// Question 5: What are the time and space complexities of common tree operations?
// How do these complexities change for different types of trees?

Common tree operations complexities:

For a general binary tree:
- Search: O(n) time, O(h) space
- Insertion: O(n) time to find location, O(1) to insert
- Deletion: O(n) time to find node, O(1) to delete
- Traversal: O(n) time, O(h) space for recursion/stack

For a balanced binary search tree:
- Search: O(log n) time, O(1) space
- Insertion: O(log n) time, O(1) space
- Deletion: O(log n) time, O(1) space
- Traversal: O(n) time, O(log n) space

For a skewed tree (worst case):
- Search: O(n) time, O(1) space
- Insertion: O(n) time, O(1) space
- Deletion: O(n) time, O(1) space
- Traversal: O(n) time, O(n) space

For an N-ary tree with maximum branching factor b:
- Search: O(b^h) time, O(h) space
- Insertion: O(b^h) time to find location, O(1) to insert
- Deletion: O(b^h) time to find node, O(1) to delete
- Traversal: O(n) time, O(h) space

Height h is O(log n) for balanced trees but can be O(n) in the worst case.`,
          explanation: "These theoretical questions test your understanding of core tree concepts and algorithms, including the differences between tree types, traversal methods, lowest common ancestor calculations, tree diameter, and algorithmic complexity analysis."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement a solution to find the kth smallest element in a BST. Your solution should leverage the properties of binary search trees for efficiency.",
      solution: "Perform an inorder traversal of the BST, which visits nodes in ascending order. Keep a counter of visited nodes and return the kth node visited. This gives O(h + k) time complexity where h is the height of the tree."
    },
    {
      id: "hw-2",
      question: "Design an algorithm to construct a binary tree from its given inorder and preorder traversal arrays.",
      solution: "Use the first element of preorder as the root. Find this element's position in the inorder array to determine the left and right subtrees. Recursively build the left subtree using the left portion of the inorder array and the corresponding portion of the preorder array. Then build the right subtree similarly."
    },
    {
      id: "hw-3",
      question: "Implement a TreeIterator class that allows you to iterate through a binary tree in inorder traversal order. The class should have hasNext() and next() methods.",
      solution: "Use a stack to keep track of nodes to visit. Initialize by pushing all left children of the root onto the stack. For each next() call, pop a node, return its value, and push all left children of its right child onto the stack."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "Which traversal method would print a binary search tree's values in sorted (ascending) order?",
      options: ["Preorder traversal", "Inorder traversal", "Postorder traversal", "Level-order traversal"],
      correctAnswer: 1,
      explanation: "Inorder traversal of a binary search tree visits nodes in the order: left subtree, root, right subtree. Since in a BST, left children have smaller values and right children have larger values, this produces a sorted sequence."
    },
    {
      id: "quiz-2",
      question: "What is the height of a perfect binary tree with 15 nodes?",
      options: ["2", "3", "4", "7"],
      correctAnswer: 1,
      explanation: "A perfect binary tree of height h has 2^(h+1) - 1 nodes. With 15 nodes, we solve for h: 15 = 2^(h+1) - 1, which gives us h = 3."
    },
    {
      id: "quiz-3",
      question: "Which of the following is NOT a valid binary search tree?",
      options: [
        "Root: 5, Left: 3, Right: 8", 
        "Root: 10, Left: 5, Right: 15, Left's right: 7", 
        "Root: 7, Left: 3, Right: 10, Left's right: 8", 
        "Root: 6, Left: 2, Right: 8, Right's left: 7"
      ],
      correctAnswer: 2,
      explanation: "In option 3, the left subtree of 7 contains an 8, which violates the BST property since 8 > 7. In a BST, all nodes in the left subtree must have values less than the root's value."
    },
    {
      id: "quiz-4",
      question: "What is the time complexity to find the diameter of a binary tree with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "The efficient algorithm to find the diameter of a binary tree has O(n) time complexity. It uses a single depth-first traversal to calculate the height of subtrees and update the maximum diameter at each node."
    },
    {
      id: "quiz-5",
      question: "Which of these tree traversal methods uses a queue data structure in its iterative implementation?",
      options: ["Depth-First Search", "Preorder Traversal", "Inorder Traversal", "Breadth-First Search"],
      correctAnswer: 3,
      explanation: "Breadth-First Search (BFS) uses a queue data structure to keep track of nodes to be processed. This ensures that nodes are processed level by level, which is the defining characteristic of BFS."
    }
  ]
};

export default mockTestTreesContent; 