import { Content } from '@/types/course';

const diameterOfTreeContent: Content = {
  introduction: "The diameter (or width) of a tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. Understanding how to calculate the diameter is crucial for analyzing tree structures in various domains, including network design, phylogenetics, and computational geometry. In this lesson, we'll explore efficient algorithms to find the diameter of different types of trees.",
  
  learningObjectives: [
    "Understand the concept of tree diameter and its significance",
    "Implement efficient algorithms to find the diameter of binary trees",
    "Extend diameter calculations to N-ary trees and specialized tree structures",
    "Apply diameter algorithms to solve related tree problems",
    "Optimize diameter calculations for large trees"
  ],
  
  sections: [
    {
      title: "Understanding Tree Diameter",
      content: "The diameter of a tree is the length of the longest path between any two nodes in the tree. This path is unique in any tree due to the tree property that there is exactly one simple path between any two nodes. The diameter represents the 'widest' span of the tree and is an important metric for analyzing tree structures.",
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

// Example tree:
//        1
//       / \\
//      2   3
//     / \\
//    4   5
//       / \\
//      6   7

// The diameter of this tree is the path from node 4 to node 7, which has length 4
// (counting the number of edges: 4-2-5-6-7)`,
          explanation: "This example illustrates the concept of diameter in a binary tree. The diameter is the length of the longest path between any two nodes, which may or may not pass through the root. In this case, the path goes from leaf node 4 to leaf node 7, traversing 4 edges."
        }
      ]
    },
    {
      title: "Finding Diameter of Binary Trees",
      content: "The most efficient approach to find the diameter of a binary tree uses a recursive depth-first search strategy. For each node, we calculate the height of its left and right subtrees. The diameter passing through that node is the sum of these heights plus 1 (for the node itself). We maintain a global maximum to track the largest diameter found during the traversal.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding the diameter of a binary tree
public int diameterOfBinaryTree(TreeNode root) {
    // Global variable to track the maximum diameter found
    int[] diameter = new int[1];
    
    // Calculate height and update diameter
    calculateHeight(root, diameter);
    
    return diameter[0];
}

// Helper function that calculates height and updates diameter
private int calculateHeight(TreeNode node, int[] diameter) {
    // Base case: null node has height -1 to account for edge counting
    if (node == null) {
        return -1;
    }
    
    // Calculate heights of left and right subtrees
    int leftHeight = calculateHeight(node.left, diameter);
    int rightHeight = calculateHeight(node.right, diameter);
    
    // Update the maximum diameter
    // The current diameter is leftHeight + rightHeight + 2
    // +2 accounts for the edges connecting current node to left and right subtrees
    diameter[0] = Math.max(diameter[0], leftHeight + rightHeight + 2);
    
    // Return the height of the current subtree
    return Math.max(leftHeight, rightHeight) + 1;
}

// Alternative implementation that counts nodes instead of edges
public int diameterOfBinaryTreeCountingNodes(TreeNode root) {
    int[] diameter = new int[1];
    calculateHeightNodes(root, diameter);
    return diameter[0] - 1; // Convert to number of edges
}

private int calculateHeightNodes(TreeNode node, int[] diameter) {
    if (node == null) {
        return 0;
    }
    
    int leftHeight = calculateHeightNodes(node.left, diameter);
    int rightHeight = calculateHeightNodes(node.right, diameter);
    
    diameter[0] = Math.max(diameter[0], leftHeight + rightHeight + 1);
    
    return Math.max(leftHeight, rightHeight) + 1;
}`,
          explanation: "These implementations find the diameter using post-order traversal (calculating left and right heights before processing the current node). The key insight is that for any node, the longest path passing through it is the sum of the heights of its left and right subtrees. We track the maximum such path while traversing the tree. The first implementation counts edges, while the second counts nodes and then converts to edges."
        },
        {
          language: "java",
          code: `// Tracking the nodes on the diameter path
public List<TreeNode> findDiameterPath(TreeNode root) {
    DiameterResult result = new DiameterResult();
    findDiameterAndPath(root, result);
    
    return result.path;
}

private static class DiameterResult {
    int maxDiameter = 0;
    List<TreeNode> path = new ArrayList<>();
    TreeNode start = null;
    TreeNode end = null;
}

private int findDiameterAndPath(TreeNode node, DiameterResult result) {
    if (node == null) {
        return -1;
    }
    
    int leftHeight = findDiameterAndPath(node.left, result);
    int rightHeight = findDiameterAndPath(node.right, result);
    
    int currentDiameter = leftHeight + rightHeight + 2;
    
    // If this path is longer than current max, update result
    if (currentDiameter > result.maxDiameter) {
        result.maxDiameter = currentDiameter;
        
        // Build the path for the new diameter
        result.path.clear();
        
        // Add the left path in reverse
        TreeNode current = node.left;
        List<TreeNode> leftPath = new ArrayList<>();
        buildPathFromRoot(current, leftPath, leftHeight);
        Collections.reverse(leftPath);
        
        // Add the current node
        result.path.addAll(leftPath);
        result.path.add(node);
        
        // Add the right path
        current = node.right;
        List<TreeNode> rightPath = new ArrayList<>();
        buildPathFromRoot(current, rightPath, rightHeight);
        result.path.addAll(rightPath);
        
        // Update start and end nodes
        if (!result.path.isEmpty()) {
            result.start = result.path.get(0);
            result.end = result.path.get(result.path.size() - 1);
        }
    }
    
    return Math.max(leftHeight, rightHeight) + 1;
}

// Helper method to build path from root to a node at specified height
private void buildPathFromRoot(TreeNode node, List<TreeNode> path, int height) {
    if (node == null || height < 0) {
        return;
    }
    
    path.add(node);
    
    if (height > 0) {
        int leftHeight = getHeight(node.left);
        int rightHeight = getHeight(node.right);
        
        if (leftHeight == height - 1) {
            buildPathFromRoot(node.left, path, height - 1);
        } else if (rightHeight == height - 1) {
            buildPathFromRoot(node.right, path, height - 1);
        }
    }
}

// Helper method to get height of a subtree
private int getHeight(TreeNode node) {
    if (node == null) {
        return -1;
    }
    
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}`,
          explanation: "This more complex implementation not only calculates the diameter but also tracks the actual path that forms the diameter. This is useful for applications where you need to know the specific nodes that make up the longest path, not just its length. The approach builds the path by finding the deepest nodes in the left and right subtrees of the node where the diameter passes through."
        }
      ]
    },
    {
      title: "Diameter of N-ary Trees",
      content: "The concept of diameter extends to N-ary trees (trees where nodes can have more than two children). The approach is similar but needs to consider multiple children per node rather than just left and right children.",
      codeExamples: [
        {
          language: "java",
          code: `// N-ary TreeNode definition
class NaryTreeNode {
    int val;
    List<NaryTreeNode> children;
    
    NaryTreeNode(int val) {
        this.val = val;
        this.children = new ArrayList<>();
    }
}

// Finding the diameter of an N-ary tree
public int diameterOfNaryTree(NaryTreeNode root) {
    int[] diameter = new int[1];
    calculateHeightNary(root, diameter);
    return diameter[0];
}

private int calculateHeightNary(NaryTreeNode node, int[] diameter) {
    if (node == null) {
        return -1;
    }
    
    // Find the two tallest children
    int maxHeight1 = -1; // Tallest
    int maxHeight2 = -1; // Second tallest
    
    for (NaryTreeNode child : node.children) {
        int childHeight = calculateHeightNary(child, diameter);
        
        if (childHeight > maxHeight1) {
            maxHeight2 = maxHeight1;
            maxHeight1 = childHeight;
        } else if (childHeight > maxHeight2) {
            maxHeight2 = childHeight;
        }
    }
    
    // Update diameter - the longest path through this node uses the two tallest children
    diameter[0] = Math.max(diameter[0], maxHeight1 + maxHeight2 + 2);
    
    // Return height of this subtree
    return maxHeight1 + 1;
}

// Version for N-ary trees represented as arrays of children
// (commonly used in competitive programming)
public int diameterOfNaryTree(List<List<Integer>> tree, int root) {
    int[] diameter = new int[1];
    calculateHeightNary(tree, root, diameter);
    return diameter[0];
}

private int calculateHeightNary(List<List<Integer>> tree, int node, int[] diameter) {
    // Find the two tallest children
    int maxHeight1 = -1; // Tallest
    int maxHeight2 = -1; // Second tallest
    
    for (int child : tree.get(node)) {
        int childHeight = calculateHeightNary(tree, child, diameter);
        
        if (childHeight > maxHeight1) {
            maxHeight2 = maxHeight1;
            maxHeight1 = childHeight;
        } else if (childHeight > maxHeight2) {
            maxHeight2 = childHeight;
        }
    }
    
    // Update diameter
    diameter[0] = Math.max(diameter[0], maxHeight1 + maxHeight2 + 2);
    
    // Return height of this subtree
    return maxHeight1 + 1;
}`,
          explanation: "These implementations find the diameter of an N-ary tree. For each node, we need to find the two tallest subtrees (not just left and right), as the longest path through a node will use these two subtrees. The first implementation works with an object-oriented tree representation, while the second uses an adjacency list representation common in competitive programming."
        }
      ]
    },
    {
      title: "Diameter of Special Tree Structures",
      content: "Certain special tree structures, such as binary search trees, balanced trees, or perfect binary trees, have specific properties that can simplify or change the approach to finding their diameter. Understanding these special cases can lead to more efficient algorithms for specific types of trees.",
      codeExamples: [
        {
          language: "java",
          code: `// For a perfect binary tree of height h, the diameter is 2^h - 1
public int diameterOfPerfectBinaryTree(int height) {
    return (1 << height) - 1;
}

// For a balanced binary tree, we can optimize by pruning subtrees that can't contain the diameter
public int diameterOfBalancedTree(TreeNode root) {
    if (root == null) return 0;
    
    int[] diameter = new int[1];
    calculateHeightBalanced(root, diameter);
    return diameter[0];
}

private int calculateHeightBalanced(TreeNode node, int[] diameter) {
    if (node == null) return -1;
    
    int leftHeight = calculateHeightBalanced(node.left, diameter);
    
    // Early pruning: if the current diameter is already greater than what could
    // be achieved through this node, skip the right subtree calculation
    if (diameter[0] > leftHeight * 2 + 2) {
        return Math.max(leftHeight, getHeight(node.right)) + 1;
    }
    
    int rightHeight = calculateHeightBalanced(node.right, diameter);
    
    diameter[0] = Math.max(diameter[0], leftHeight + rightHeight + 2);
    
    return Math.max(leftHeight, rightHeight) + 1;
}

// For a skewed tree (essentially a linked list), the diameter is just the height
public int diameterOfSkewedTree(TreeNode root) {
    return getHeight(root);
}

// Helper method to get height of a subtree
private int getHeight(TreeNode node) {
    if (node == null) return -1;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

// For a binary search tree, the diameter is still calculated the same way,
// but we can use the BST property for other optimizations if needed
public int diameterOfBST(TreeNode root) {
    int[] diameter = new int[1];
    calculateHeight(root, diameter);
    return diameter[0];
}`,
          explanation: "These examples show special case optimizations for different types of trees. For perfect binary trees, we can directly calculate the diameter from the height. For balanced trees, we can potentially prune calculations in subtrees that won't affect the final result. For skewed trees (essentially linked lists), the diameter is simply the height of the tree. For BSTs, the standard approach applies but the ordered property could enable other optimizations if needed."
        }
      ]
    },
    {
      title: "Applications and Related Problems",
      content: "The diameter calculation can be applied to solve various tree-related problems. Some common applications include finding the maximum path sum in a binary tree, detecting tree bottlenecks, and analyzing network topologies. The techniques used for diameter calculation can be adapted for these related problems.",
      codeExamples: [
        {
          language: "java",
          code: `// Find the maximum path sum in a binary tree
// Similar to diameter, but considering node values instead of edge counts
public int maxPathSum(TreeNode root) {
    int[] maxSum = new int[1];
    maxSum[0] = Integer.MIN_VALUE; // Initialize to smallest possible value
    
    maxPathSumHelper(root, maxSum);
    
    return maxSum[0];
}

private int maxPathSumHelper(TreeNode node, int[] maxSum) {
    if (node == null) return 0;
    
    // Calculate maximum path sum from left and right subtrees
    // Use 0 if the sum is negative (we can choose not to include that subtree)
    int leftSum = Math.max(0, maxPathSumHelper(node.left, maxSum));
    int rightSum = Math.max(0, maxPathSumHelper(node.right, maxSum));
    
    // Update the maximum path sum that passes through current node
    maxSum[0] = Math.max(maxSum[0], leftSum + rightSum + node.val);
    
    // Return the maximum sum of a path starting from this node
    return Math.max(leftSum, rightSum) + node.val;
}

// Find the longest path with same values in a binary tree
public int longestUnivaluePath(TreeNode root) {
    int[] result = new int[1];
    longestUnivaluePathHelper(root, result);
    return result[0];
}

private int longestUnivaluePathHelper(TreeNode node, int[] result) {
    if (node == null) return 0;
    
    int left = longestUnivaluePathHelper(node.left, result);
    int right = longestUnivaluePathHelper(node.right, result);
    
    int leftPath = 0, rightPath = 0;
    
    // Extend path if values match
    if (node.left != null && node.val == node.left.val) {
        leftPath = left + 1;
    }
    
    if (node.right != null && node.val == node.right.val) {
        rightPath = right + 1;
    }
    
    // Update the maximum path
    result[0] = Math.max(result[0], leftPath + rightPath);
    
    // Return the longer path that can be extended by parent
    return Math.max(leftPath, rightPath);
}

// Find the farthest node from a given node in a tree
public int farthestNodeDistance(TreeNode root, TreeNode target) {
    // First, find the target node and calculate distances
    Map<TreeNode, Integer> distances = new HashMap<>();
    findNodeAndCalculateDistances(root, target, distances);
    
    // Find the maximum distance
    int maxDistance = 0;
    for (int distance : distances.values()) {
        maxDistance = Math.max(maxDistance, distance);
    }
    
    return maxDistance;
}

private int findNodeAndCalculateDistances(TreeNode node, TreeNode target, 
                                         Map<TreeNode, Integer> distances) {
    if (node == null) return -1;
    
    if (node == target) {
        calculateDistancesFromNode(node, 0, distances);
        return 0;
    }
    
    int leftDistance = findNodeAndCalculateDistances(node.left, target, distances);
    if (leftDistance >= 0) {
        calculateDistancesFromNode(node.right, leftDistance + 2, distances);
        return leftDistance + 1;
    }
    
    int rightDistance = findNodeAndCalculateDistances(node.right, target, distances);
    if (rightDistance >= 0) {
        calculateDistancesFromNode(node.left, rightDistance + 2, distances);
        return rightDistance + 1;
    }
    
    return -1;
}

private void calculateDistancesFromNode(TreeNode node, int distance, 
                                        Map<TreeNode, Integer> distances) {
    if (node == null) return;
    
    distances.put(node, distance);
    calculateDistancesFromNode(node.left, distance + 1, distances);
    calculateDistancesFromNode(node.right, distance + 1, distances);
}`,
          explanation: "These examples demonstrate problems related to tree diameter. The maxPathSum problem finds the maximum sum along any path in a tree, similar to diameter but with node values. The longestUnivaluePath problem finds the longest path where all nodes have the same value. The farthestNodeDistance problem finds the maximum distance from a specific target node to any other node in the tree."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement an algorithm to find the diameter of a binary tree where each edge has a different weight. The diameter should be the path with the maximum sum of edge weights.",
      solution: "Modify the standard diameter algorithm to consider edge weights instead of just counting edges. When calculating the height of subtrees, add the edge weight to the returned height. The diameter will be the path with the maximum sum of weights."
    },
    {
      id: "hw-2",
      question: "Find the second longest path in a binary tree. This path should not overlap with the diameter path (the longest path).",
      solution: "First, find the diameter path and mark all nodes on this path. Then, find the longest path that doesn't use any of the marked nodes. Alternatively, find all paths and sort them by length to identify the second longest."
    },
    {
      id: "hw-3",
      question: "Given a binary tree where nodes represent cities and edge weights represent distances, find the most remote pair of cities (the pair with the maximum distance between them).",
      solution: "This is equivalent to finding the diameter of a weighted tree. Use the standard diameter algorithm but incorporate edge weights when calculating distances."
    },
    {
      id: "hw-4",
      question: "Implement an algorithm to find the 'center' of a tree, defined as the node that minimizes the maximum distance to any other node in the tree. This is equivalent to finding the node that would be the 'middle' of the diameter path.",
      solution: "First find the diameter of the tree and the nodes on the diameter path. The center will be the middle node of this path. If the diameter has an even number of edges, either of the two middle nodes can be considered the center."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "What is the diameter of a binary tree with only one node?",
      options: ["0", "1", "2", "It depends on the value of the node"],
      correctAnswer: 0,
      explanation: "The diameter of a tree with a single node is 0 when counting edges, as there is no path between different nodes. When counting nodes, the diameter would be 1, but the standard definition of tree diameter counts edges."
    },
    {
      id: "quiz-2",
      question: "Which of the following tree structures would have the largest diameter for the same number of nodes?",
      options: ["A balanced binary tree", "A skewed binary tree (essentially a linked list)", "A perfect binary tree", "A star-shaped tree (one central node with all others connected directly to it)"],
      correctAnswer: 1,
      explanation: "A skewed binary tree (like a linked list) would have the largest diameter. For n nodes, the diameter would be n-1 edges, which is the maximum possible. In contrast, a balanced tree with n nodes has a diameter of approximately 2*log(n)."
    },
    {
      id: "quiz-3",
      question: "What is the time complexity of the standard algorithm to find the diameter of a binary tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "The standard algorithm to find the diameter of a binary tree has O(n) time complexity, where n is the number of nodes. It requires a single depth-first traversal of the tree, calculating heights and updating the diameter at each node."
    },
    {
      id: "quiz-4",
      question: "If we know that the height of a binary tree is h, what is the maximum possible diameter of the tree?",
      options: ["h", "h+1", "2h", "2h+1"],
      correctAnswer: 2,
      explanation: "The maximum diameter of a binary tree with height h is 2h, which occurs when the diameter path passes through the root, going from a node at maximum depth in one subtree to a node at maximum depth in the other subtree."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to strengthen your understanding of tree diameter concepts and related tree algorithms. These problems will help you apply the techniques learned in this lesson to various tree-based challenges, improving your ability to analyze and manipulate tree structures.",
    questions: {
      easy: [
        {
          id: "tree-diameter-practice-1",
          title: "Maximum Depth of Binary Tree",
          link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
          description: "Find the maximum depth of a binary tree. This problem helps understand the height calculation, which is a component of diameter computation."
        },
        {
          id: "tree-diameter-practice-2",
          title: "Balanced Binary Tree",
          link: "https://leetcode.com/problems/balanced-binary-tree/",
          description: "Determine if a binary tree is height-balanced (the depth of the subtrees of every node never differs by more than 1). This involves calculating and comparing heights similar to diameter computation."
        },
        {
          id: "tree-diameter-practice-3",
          title: "Path Sum",
          link: "https://leetcode.com/problems/path-sum/",
          description: "Determine if the tree has a root-to-leaf path that sums to a given value. This introduces the concept of path traversal in trees."
        },
        {
          id: "tree-diameter-practice-4",
          title: "Same Tree",
          link: "https://leetcode.com/problems/same-tree/",
          description: "Check if two binary trees are identical. This reinforces tree traversal techniques and structural comparison."
        }
      ],
      medium: [
        {
          id: "tree-diameter-practice-5",
          title: "Diameter of Binary Tree",
          link: "https://leetcode.com/problems/diameter-of-binary-tree/",
          description: "Calculate the diameter of a binary tree. This is a direct application of the diameter algorithm covered in this lesson."
        },
        {
          id: "tree-diameter-practice-6",
          title: "Path Sum II",
          link: "https://leetcode.com/problems/path-sum-ii/",
          description: "Find all root-to-leaf paths that sum to a target value. This builds on path traversal and requires tracking complete paths."
        },
        {
          id: "tree-diameter-practice-7",
          title: "Binary Tree Right Side View",
          link: "https://leetcode.com/problems/binary-tree-right-side-view/",
          description: "Return the values visible from the right side of a binary tree. This involves level-order traversal and understanding tree structure."
        },
        {
          id: "tree-diameter-practice-8",
          title: "All Nodes Distance K in Binary Tree",
          link: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
          description: "Find all nodes at distance K from a target node. This problem combines tree traversal with distance calculation in trees."
        }
      ],
      hard: [
        {
          id: "tree-diameter-practice-9",
          title: "Binary Tree Maximum Path Sum",
          link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
          description: "Find the maximum path sum in a binary tree. This is closely related to diameter calculation but with node values influencing the path selection."
        },
        {
          id: "tree-diameter-practice-10",
          title: "Vertical Order Traversal of a Binary Tree",
          link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
          description: "Return the vertical order traversal of a binary tree. This advanced traversal problem requires careful tracking of node positions."
        }
      ]
    }
  }
};

export default diameterOfTreeContent; 