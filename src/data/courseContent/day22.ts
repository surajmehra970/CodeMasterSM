import { Content } from '@/types/course';

const bfsDfsTreeContent: Content = {
  introduction: "Trees are hierarchical data structures that naturally lend themselves to traversal algorithms. Breadth-First Search (BFS) and Depth-First Search (DFS) represent two fundamental approaches to exploring tree structures. While we've explored tree traversal techniques previously, this lesson focuses specifically on the application of BFS and DFS to tree problems and how they help us solve different types of challenges efficiently.",
  
  learningObjectives: [
    "Understand the practical applications of BFS and DFS in tree algorithms",
    "Learn how to choose between BFS and DFS for different tree problems",
    "Implement BFS and DFS for specific tree-related tasks",
    "Apply BFS and DFS to solve various tree problems",
    "Optimize tree traversal algorithms for time and space efficiency"
  ],
  
  sections: [
    {
      title: "BFS vs DFS for Trees: When to Use Which",
      content: "BFS and DFS offer distinct advantages depending on the problem at hand. BFS processes nodes level by level and is ideal for finding the shortest path or the minimum number of steps in unweighted trees. DFS explores all the way down a branch before backtracking and is excellent for exhaustive searches, detecting cycles, or when the solution is likely far from the root.",
      codeExamples: [
        {
          language: "java",
          code: `// BFS is ideal for these tree problems:
// 1. Finding the minimum depth of a binary tree
// 2. Level order traversal
// 3. Finding nodes at k distance from root
// 4. Finding the shortest path between two nodes
// 5. Checking if a binary tree is complete

// DFS is better for these tree problems:
// 1. Finding the maximum depth of a binary tree
// 2. Detecting cycles in a tree
// 3. Binary tree path sum problems
// 4. Checking if a binary tree is balanced
// 5. Finding the diameter of a binary tree

// Example: Choosing between BFS and DFS for finding a value
public boolean findValueInTree(TreeNode root, int target) {
    // If we expect the value to be near the root, use BFS
    if (isLikelyNearRoot(target)) {
        return findValueBFS(root, target);
    }
    // Otherwise, use DFS for a more memory-efficient search
    else {
        return findValueDFS(root, target);
    }
}

// Helper method to decide search strategy
private boolean isLikelyNearRoot(int target) {
    // This is application-specific logic that would determine
    // if the target value is likely close to the root
    return target < 100; // Simplified example
}`,
          explanation: "This code illustrates how to make a strategic choice between BFS and DFS based on the nature of the problem and the expected location of the solution in the tree."
        }
      ]
    },
    {
      title: "BFS for Tree Problems",
      content: "BFS is particularly useful for tree problems where level-by-level processing is important. It uses a queue data structure to keep track of nodes to visit next and processes all nodes at the current depth before moving to the next level. This makes it perfect for finding the shortest path, level order traversal, and finding nodes at a specific depth.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding the minimum depth of a binary tree using BFS
public int minDepthBFS(TreeNode root) {
    if (root == null) return 0;
    
    Queue<TreeNode> queue = new LinkedList<>();
    Queue<Integer> depths = new LinkedList<>();
    queue.offer(root);
    depths.offer(1);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        int depth = depths.poll();
        
        // If we found a leaf node, return its depth
        if (node.left == null && node.right == null) {
            return depth;
        }
        
        if (node.left != null) {
            queue.offer(node.left);
            depths.offer(depth + 1);
        }
        
        if (node.right != null) {
            queue.offer(node.right);
            depths.offer(depth + 1);
        }
    }
    
    return 0; // This should never happen for a valid tree
}

// Finding nodes at k distance from the root
public List<Integer> nodesAtDistanceK(TreeNode root, int k) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int level = 0;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            
            // If we're at level k, add values to result
            if (level == k) {
                result.add(node.val);
            }
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        level++;
        
        // If we've passed level k, we can stop
        if (level > k) break;
    }
    
    return result;
}

// Check if a binary tree is complete
public boolean isCompleteTree(TreeNode root) {
    if (root == null) return true;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    boolean foundNull = false;
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        
        // If we find a node after seeing a null, the tree is not complete
        if (node == null) {
            foundNull = true;
        } else {
            if (foundNull) return false;
            
            queue.offer(node.left);
            queue.offer(node.right);
        }
    }
    
    return true;
}`,
          explanation: "These examples demonstrate practical BFS applications for tree problems. The minimum depth problem showcases how BFS finds the shortest path to a leaf node. The 'nodes at distance k' problem illustrates level-based processing. The 'complete tree' check uses BFS's level-order nature to verify that there are no gaps in the tree structure."
        }
      ]
    },
    {
      title: "DFS for Tree Problems",
      content: "DFS excels at exploring paths to their full depth before backtracking. In trees, DFS can be implemented using recursion or an explicit stack. It's particularly useful for problems requiring exhaustive path exploration, finding the maximum depth, or checking structural properties like balance.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding the maximum depth of a binary tree using DFS
public int maxDepthDFS(TreeNode root) {
    if (root == null) return 0;
    
    int leftDepth = maxDepthDFS(root.left);
    int rightDepth = maxDepthDFS(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}

// Path sum problem: check if there's a root-to-leaf path that sums to target
public boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) return false;
    
    // If it's a leaf node, check if the value matches the remaining sum
    if (root.left == null && root.right == null) {
        return root.val == targetSum;
    }
    
    // Recursively check left and right subtrees with reduced target
    return hasPathSum(root.left, targetSum - root.val) || 
           hasPathSum(root.right, targetSum - root.val);
}

// Finding all root-to-leaf paths in a binary tree
public List<List<Integer>> findAllPaths(TreeNode root) {
    List<List<Integer>> paths = new ArrayList<>();
    findPathsDFS(root, new ArrayList<>(), paths);
    return paths;
}

private void findPathsDFS(TreeNode node, List<Integer> currentPath, 
                         List<List<Integer>> paths) {
    if (node == null) return;
    
    // Add current node to the path
    currentPath.add(node.val);
    
    // If it's a leaf node, we've found a complete path
    if (node.left == null && node.right == null) {
        paths.add(new ArrayList<>(currentPath));
    } else {
        // Continue DFS on left and right children
        findPathsDFS(node.left, currentPath, paths);
        findPathsDFS(node.right, currentPath, paths);
    }
    
    // Backtrack by removing the current node
    currentPath.remove(currentPath.size() - 1);
}

// Check if a binary tree is balanced
public boolean isBalanced(TreeNode root) {
    return checkHeight(root) != -1;
}

private int checkHeight(TreeNode node) {
    if (node == null) return 0;
    
    // Check left subtree height
    int leftHeight = checkHeight(node.left);
    if (leftHeight == -1) return -1; // Left subtree is unbalanced
    
    // Check right subtree height
    int rightHeight = checkHeight(node.right);
    if (rightHeight == -1) return -1; // Right subtree is unbalanced
    
    // Check if current node is balanced
    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Unbalanced
    
    // Return height of current subtree
    return Math.max(leftHeight, rightHeight) + 1;
}`,
          explanation: "These DFS examples showcase how depth-first search is effectively applied to tree problems. The maximum depth calculation leverages DFS's natural exploration pattern. The path sum and all paths problems demonstrate how DFS can track paths from root to leaf. The balanced tree check shows how DFS can efficiently verify structural properties by processing nodes in post-order."
        }
      ]
    },
    {
      title: "Hybrid BFS-DFS Approaches",
      content: "Some complex tree problems benefit from combining aspects of both BFS and DFS. These hybrid approaches leverage the strengths of each traversal method to solve problems that would be difficult with either approach alone.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding the right side view of a binary tree (rightmost node at each level)
public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    
    // Use BFS for level traversal
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            
            // If it's the last node in the level, add to result
            if (i == size - 1) {
                result.add(node.val);
            }
            
            // Add children to queue
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    
    return result;
}

// Alternative right side view using DFS
public List<Integer> rightSideViewDFS(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    rightViewDFS(root, 0, result);
    return result;
}

private void rightViewDFS(TreeNode node, int level, List<Integer> result) {
    if (node == null) return;
    
    // If this is the first node we've seen at this level
    if (level == result.size()) {
        result.add(node.val);
    }
    
    // Visit right first, then left (reversed DFS order)
    rightViewDFS(node.right, level + 1, result);
    rightViewDFS(node.left, level + 1, result);
}

// Finding the vertical order traversal of a binary tree
public List<List<Integer>> verticalOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    // Map to store nodes at each column
    Map<Integer, List<Integer>> columnMap = new TreeMap<>();
    
    // Use BFS with a queue that stores nodes and their column positions
    Queue<TreeNode> nodeQueue = new LinkedList<>();
    Queue<Integer> colQueue = new LinkedList<>();
    
    nodeQueue.offer(root);
    colQueue.offer(0);
    
    while (!nodeQueue.isEmpty()) {
        TreeNode node = nodeQueue.poll();
        int col = colQueue.poll();
        
        // Add node to its column list
        columnMap.putIfAbsent(col, new ArrayList<>());
        columnMap.get(col).add(node.val);
        
        // Process left child (column - 1)
        if (node.left != null) {
            nodeQueue.offer(node.left);
            colQueue.offer(col - 1);
        }
        
        // Process right child (column + 1)
        if (node.right != null) {
            nodeQueue.offer(node.right);
            colQueue.offer(col + 1);
        }
    }
    
    // Add all column lists to result in order
    result.addAll(columnMap.values());
    
    return result;
}`,
          explanation: "These examples show hybrid approaches combining aspects of BFS and DFS. The right side view can be solved with either BFS (level by level) or a modified DFS (right before left). The vertical order traversal uses BFS for level order processing but tracks column positions to organize nodes vertically."
        }
      ]
    },
    {
      title: "Space-Time Tradeoffs in Tree Traversals",
      content: "When working with trees, there are important space-time tradeoffs to consider between BFS and DFS. BFS generally requires more space (proportional to the maximum width of the tree) but can find level-based solutions faster. DFS typically uses less memory (proportional to the height of the tree) but may explore unnecessary paths in certain problems.",
      codeExamples: [
        {
          language: "java",
          code: `// Memory-efficient DFS (O(h) space where h is the height)
public boolean findTargetDFS(TreeNode root, int target) {
    if (root == null) return false;
    
    // Found the target
    if (root.val == target) return true;
    
    // Try left and right subtrees
    return findTargetDFS(root.left, target) || findTargetDFS(root.right, target);
}

// BFS approach (O(w) space where w is the max width)
public boolean findTargetBFS(TreeNode root, int target) {
    if (root == null) return false;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        
        // Found the target
        if (node.val == target) return true;
        
        // Add children to queue
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
    
    return false;
}

// Space-optimized iterative DFS (using stack)
public boolean findTargetDFSIterative(TreeNode root, int target) {
    if (root == null) return false;
    
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        
        if (node.val == target) return true;
        
        // Push right first so left is processed first
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
    }
    
    return false;
}

// Morris Traversal for constant space inorder traversal
public List<Integer> morrisInorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    TreeNode current = root;
    
    while (current != null) {
        // If left is null, visit current and move right
        if (current.left == null) {
            result.add(current.val);
            current = current.right;
        } else {
            // Find the inorder predecessor
            TreeNode predecessor = current.left;
            while (predecessor.right != null && predecessor.right != current) {
                predecessor = predecessor.right;
            }
            
            // If right is null, go left after creating link
            if (predecessor.right == null) {
                predecessor.right = current;
                current = current.left;
            } 
            // Restore the tree and visit current node
            else {
                predecessor.right = null;
                result.add(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}`,
          explanation: "These examples illustrate the space-time tradeoffs between different traversal approaches. The recursive DFS uses O(h) space for the call stack, while BFS uses O(w) space for the queue. The Morris traversal demonstrates an advanced technique to achieve constant space complexity by temporarily modifying the tree structure."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Given a binary tree, find the average value of nodes at each level. Return the result as an array where result[i] is the average value of all nodes at level i (0-indexed).",
      solution: "Use BFS to process the tree level by level. For each level, calculate the sum of all node values and divide by the number of nodes at that level. This approach ensures we process each level completely before moving to the next."
    },
    {
      id: "hw-2",
      question: "Check if a binary tree is a mirror of itself (i.e., symmetric around its center).",
      solution: "A tree is symmetric if the left subtree is a mirror reflection of the right subtree. Use a recursive DFS approach that compares the left child of the left subtree with the right child of the right subtree, and the right child of the left subtree with the left child of the right subtree."
    },
    {
      id: "hw-3",
      question: "Given a binary tree, find the largest value in each level. Return the results as a list where result[i] is the largest value at level i.",
      solution: "Use BFS to traverse the tree level by level. For each level, keep track of the maximum value encountered. After processing each level completely, add the maximum value to the result list."
    },
    {
      id: "hw-4",
      question: "Find the closest leaf node to a given node in a binary tree. The distance is the number of edges required to go from the start node to the leaf node.",
      solution: "This requires a two-step approach: 1) Convert the tree to an undirected graph by adding parent pointers, 2) Use BFS starting from the given node to find the closest leaf. Since BFS explores all nodes at a given distance before moving further, the first leaf node encountered will be the closest."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "Which traversal method would be most efficient for finding the minimum depth of a binary tree?",
      options: ["Preorder DFS traversal", "Inorder DFS traversal", "Postorder DFS traversal", "BFS traversal"],
      correctAnswer: 3,
      explanation: "BFS traversal is most efficient for finding the minimum depth because it processes nodes level by level. As soon as the first leaf node is encountered, we've found the minimum depth, without needing to explore deeper paths."
    },
    {
      id: "quiz-2",
      question: "What is the space complexity of BFS for a binary tree with n nodes in the worst case?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "In the worst case (a complete binary tree), the maximum number of nodes at any level is n/2 (the last level). Therefore, the queue in BFS could contain up to n/2 nodes, giving a space complexity of O(n)."
    },
    {
      id: "quiz-3",
      question: "When is DFS preferred over BFS for tree traversal?",
      options: ["When finding the shortest path", "When memory usage is a concern", "When processing nodes level by level", "When finding the closest node to the root"],
      correctAnswer: 1,
      explanation: "DFS is preferred when memory usage is a concern because its space complexity is O(h) where h is the height of the tree, which is often much smaller than the width of the tree (especially in balanced trees where h ≈ log n)."
    },
    {
      id: "quiz-4",
      question: "Which traversal approach would be most suitable for detecting if a binary tree is balanced?",
      options: ["BFS", "Iterative preorder DFS", "Recursive postorder DFS", "Morris traversal"],
      correctAnswer: 2,
      explanation: "Recursive postorder DFS is most suitable for checking if a tree is balanced because we need to know the heights of the left and right subtrees before we can determine if the current node is balanced. Postorder traversal (left, right, root) provides this information in the correct order."
    }
  ]
};

export default bfsDfsTreeContent; 