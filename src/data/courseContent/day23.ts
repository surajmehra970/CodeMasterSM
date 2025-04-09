import { Content } from '@/types/course';

const lowestCommonAncestorContent: Content = {
  introduction: "The Lowest Common Ancestor (LCA) of two nodes in a tree is the deepest node that has both nodes as descendants. LCA has significant applications in various domains including computational biology (phylogenetic trees), network routing, and social network analysis. In this lesson, we'll explore different approaches to finding the LCA in binary trees, binary search trees, and more complex tree structures.",
  
  learningObjectives: [
    "Understand the concept of Lowest Common Ancestor (LCA) in trees",
    "Implement efficient algorithms for finding LCA in binary trees",
    "Apply optimized LCA algorithms for binary search trees",
    "Learn LCA variations for specialized tree structures",
    "Solve common problems involving LCA"
  ],
  
  sections: [
    {
      title: "Understanding Lowest Common Ancestor",
      content: "The Lowest Common Ancestor (LCA) of two nodes v and w in a tree is the lowest (or deepest) node that has both v and w as descendants. A node can be a descendant of itself, so if either v or w is an ancestor of the other, that node itself is the LCA. The LCA problem has applications in phylogenetic trees, network design, and various graph algorithms.",
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
//        3
//       / \\
//      5   1
//     / \\ / \\
//    6  2 0  8
//      / \\
//     7   4

// For this tree:
// LCA of nodes 5 and 1 is 3
// LCA of nodes 5 and 4 is 5
// LCA of nodes 6 and 4 is 5
// LCA of nodes 7 and 8 is 3`,
          explanation: "This example illustrates the concept of LCA with a basic binary tree structure. The LCA of two nodes varies depending on their positions in the tree. Note that a node can be an ancestor of itself in this definition."
        }
      ]
    },
    {
      title: "Finding LCA in Binary Trees",
      content: "For a general binary tree, we can find the LCA using a recursive approach. The key insight is that if the current node is either of the target nodes, or if one target is in the left subtree and the other in the right subtree, then the current node is the LCA. This approach works in O(n) time complexity where n is the number of nodes in the tree.",
      codeExamples: [
        {
          language: "java",
          code: `// Recursive approach to find LCA in a binary tree
public TreeNode findLCA(TreeNode root, TreeNode p, TreeNode q) {
    // Base case: if root is null, return null
    if (root == null) {
        return null;
    }
    
    // If either p or q is the root, root is the LCA
    if (root == p || root == q) {
        return root;
    }
    
    // Look for keys in left and right subtrees
    TreeNode leftLCA = findLCA(root.left, p, q);
    TreeNode rightLCA = findLCA(root.right, p, q);
    
    // If both nodes are found in different subtrees, root is the LCA
    if (leftLCA != null && rightLCA != null) {
        return root;
    }
    
    // Otherwise, return the non-null value
    return (leftLCA != null) ? leftLCA : rightLCA;
}

// Version with node values instead of node references
public TreeNode findLCAByValue(TreeNode root, int p, int q) {
    // Base case: if root is null, return null
    if (root == null) {
        return null;
    }
    
    // If either p or q matches root's value, root is the LCA
    if (root.val == p || root.val == q) {
        return root;
    }
    
    // Look for values in left and right subtrees
    TreeNode leftLCA = findLCAByValue(root.left, p, q);
    TreeNode rightLCA = findLCAByValue(root.right, p, q);
    
    // If both values are found in different subtrees, root is the LCA
    if (leftLCA != null && rightLCA != null) {
        return root;
    }
    
    // Otherwise, return the non-null value
    return (leftLCA != null) ? leftLCA : rightLCA;
}`,
          explanation: "This recursive algorithm works in O(n) time. It traverses the tree once, searching for the target nodes. If both nodes are found in different subtrees of a node, that node is the LCA. If both are in the same subtree, the LCA is in that subtree. The version with node values is useful when you only have the values of the nodes, not the references."
        }
      ]
    },
    {
      title: "Optimized LCA for Binary Search Trees",
      content: "In Binary Search Trees (BSTs), we can leverage the ordered property of the tree for a more efficient LCA algorithm. If both nodes are smaller than the current node, the LCA is in the left subtree. If both are larger, the LCA is in the right subtree. If they are on different sides of the current node, the current node is the LCA.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding LCA in a Binary Search Tree
public TreeNode findLCAInBST(TreeNode root, TreeNode p, TreeNode q) {
    // Ensure p.val is smaller than q.val to simplify logic
    if (p.val > q.val) {
        TreeNode temp = p;
        p = q;
        q = temp;
    }
    
    // Start from the root and traverse the tree
    while (root != null) {
        // If both nodes are greater than root, LCA is in the right subtree
        if (p.val > root.val && q.val > root.val) {
            root = root.right;
        }
        // If both nodes are less than root, LCA is in the left subtree
        else if (p.val < root.val && q.val < root.val) {
            root = root.left;
        }
        // If one node is less than root and other is greater, or one of them is root
        // then root is the LCA
        else {
            return root;
        }
    }
    
    return null; // This line should not be reached for valid inputs
}

// Recursive version for BST
public TreeNode findLCAInBSTRecursive(TreeNode root, TreeNode p, TreeNode q) {
    // Base case
    if (root == null) {
        return null;
    }
    
    // If both values are less than the root, LCA is in the left subtree
    if (p.val < root.val && q.val < root.val) {
        return findLCAInBSTRecursive(root.left, p, q);
    }
    
    // If both values are greater than the root, LCA is in the right subtree
    if (p.val > root.val && q.val > root.val) {
        return findLCAInBSTRecursive(root.right, p, q);
    }
    
    // If the values are on different sides of the root, or one of them is root
    // then root is the LCA
    return root;
}`,
          explanation: "These algorithms leverage the BST property to achieve O(h) time complexity, where h is the height of the tree. In a balanced BST, this is O(log n), significantly better than the O(n) solution for general binary trees. The iterative approach avoids stack overhead, while the recursive approach may be more intuitive for some."
        }
      ]
    },
    {
      title: "LCA with Parent Pointers",
      content: "If nodes have parent pointers, we can solve the LCA problem by finding the first common node in the paths from both nodes to the root. This approach is similar to finding the intersection point of two linked lists.",
      codeExamples: [
        {
          language: "java",
          code: `// TreeNode with parent pointer
class TreeNodeWithParent {
    int val;
    TreeNodeWithParent left;
    TreeNodeWithParent right;
    TreeNodeWithParent parent;
    
    TreeNodeWithParent(int val) {
        this.val = val;
    }
}

// Finding LCA using parent pointers
public TreeNodeWithParent findLCAWithParents(TreeNodeWithParent p, TreeNodeWithParent q) {
    // Get the depth of both nodes
    int depthP = getDepth(p);
    int depthQ = getDepth(q);
    
    // Adjust the deeper node to be at the same depth as the shallower one
    while (depthP > depthQ) {
        p = p.parent;
        depthP--;
    }
    
    while (depthQ > depthP) {
        q = q.parent;
        depthQ--;
    }
    
    // Move both nodes upward until they meet
    while (p != q) {
        p = p.parent;
        q = q.parent;
    }
    
    return p;
}

// Helper method to get depth from a node to the root
private int getDepth(TreeNodeWithParent node) {
    int depth = 0;
    while (node != null) {
        node = node.parent;
        depth++;
    }
    return depth;
}

// Alternative approach using a set to track ancestors
public TreeNodeWithParent findLCAWithSet(TreeNodeWithParent p, TreeNodeWithParent q) {
    Set<TreeNodeWithParent> ancestors = new HashSet<>();
    
    // Add all ancestors of p to the set
    while (p != null) {
        ancestors.add(p);
        p = p.parent;
    }
    
    // Find the first ancestor of q that's in the set
    while (q != null) {
        if (ancestors.contains(q)) {
            return q;
        }
        q = q.parent;
    }
    
    return null; // No common ancestor (should not happen in a valid tree)
}`,
          explanation: "Both approaches have O(h) time complexity where h is the height of the tree. The first method equalizes the depths of both nodes and then moves upward in tandem until they meet. The second method uses a set to track ancestors of the first node, then finds the first common ancestor of the second node."
        }
      ]
    },
    {
      title: "LCA in N-ary Trees",
      content: "The LCA concept extends to N-ary trees (trees where nodes can have more than two children). The approach is similar to binary trees but needs to account for multiple children per node. We can use a post-order traversal strategy similar to the binary tree solution.",
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

// Finding LCA in an N-ary tree
public NaryTreeNode findLCANaryTree(NaryTreeNode root, NaryTreeNode p, NaryTreeNode q) {
    // Base cases
    if (root == null || root == p || root == q) {
        return root;
    }
    
    int foundCount = 0;
    NaryTreeNode foundNode = null;
    
    // Check all children
    for (NaryTreeNode child : root.children) {
        NaryTreeNode result = findLCANaryTree(child, p, q);
        
        if (result != null) {
            foundCount++;
            foundNode = result;
            
            // If we found both nodes in different subtrees, root is the LCA
            if (foundCount == 2) {
                return root;
            }
        }
    }
    
    // If we found one target node in children, and we're the other target, 
    // then we're the LCA
    if (foundCount == 1 && (root == p || root == q)) {
        return root;
    }
    
    // If we found both targets in the same child's subtree, that subtree's LCA is the answer
    if (foundCount == 1) {
        return foundNode;
    }
    
    // If we didn't find any target in this subtree
    return null;
}`,
          explanation: "This algorithm finds the LCA in an N-ary tree using a post-order traversal approach. It counts how many of the target nodes were found in the subtree rooted at each node. If both targets are found in different children's subtrees, the current node is the LCA. If only one is found, we return that node (which could be the LCA if the other target is an ancestor)."
        }
      ]
    },
    {
      title: "LCA Applications and Optimizations",
      content: "LCA algorithms have various practical applications and can be optimized for specific scenarios. Applications include computing distances between nodes in a tree, finding relationships in hierarchical structures, and supporting range minimum queries. Preprocessing techniques can significantly improve query performance when multiple LCA queries are needed.",
      codeExamples: [
        {
          language: "java",
          code: `// Computing distance between two nodes using LCA
public int distanceBetweenNodes(TreeNode root, TreeNode p, TreeNode q) {
    // Get the LCA of the two nodes
    TreeNode lca = findLCA(root, p, q);
    
    // Calculate distance from LCA to each node
    int distanceToP = getDistance(lca, p, 0);
    int distanceToQ = getDistance(lca, q, 0);
    
    // Total distance is the sum of the distances
    return distanceToP + distanceToQ;
}

// Helper method to find distance from one node to another in its subtree
private int getDistance(TreeNode source, TreeNode target, int distance) {
    if (source == null) return -1; // Target not found
    if (source == target) return distance; // Found the target
    
    // Try to find in left subtree
    int left = getDistance(source.left, target, distance + 1);
    if (left != -1) return left; // Found in left subtree
    
    // Try to find in right subtree
    return getDistance(source.right, target, distance + 1);
}

// Checking if a node is in a given subtree
private boolean isInSubtree(TreeNode root, TreeNode node) {
    if (root == null) return false;
    if (root == node) return true;
    
    return isInSubtree(root.left, node) || isInSubtree(root.right, node);
}

// O(1) LCA queries with O(n log n) preprocessing using sparse table
// (Simplified version of the algorithm)
class LCAPreprocessor {
    private int[] depth;
    private int[][] ancestor; // ancestor[i][j] is the 2^j-th ancestor of node i
    private int logN;
    private int n;
    
    public LCAPreprocessor(int n) {
        this.n = n;
        this.depth = new int[n];
        this.logN = (int) (Math.log(n) / Math.log(2)) + 1;
        this.ancestor = new int[n][logN];
        
        // Initialize ancestor array with -1 (no ancestor)
        for (int i = 0; i < n; i++) {
            Arrays.fill(ancestor[i], -1);
        }
    }
    
    // Preprocess the tree using DFS
    public void preprocess(List<List<Integer>> tree, int root) {
        dfs(tree, root, -1, 0);
        
        // Compute ancestors using dynamic programming
        for (int j = 1; j < logN; j++) {
            for (int i = 0; i < n; i++) {
                if (ancestor[i][j-1] != -1) {
                    ancestor[i][j] = ancestor[ancestor[i][j-1]][j-1];
                }
            }
        }
    }
    
    private void dfs(List<List<Integer>> tree, int node, int parent, int d) {
        depth[node] = d;
        ancestor[node][0] = parent;
        
        for (int child : tree.get(node)) {
            if (child != parent) {
                dfs(tree, child, node, d + 1);
            }
        }
    }
    
    // Query LCA using binary lifting
    public int query(int u, int v) {
        // Ensure u is deeper than v
        if (depth[u] < depth[v]) {
            int temp = u;
            u = v;
            v = temp;
        }
        
        // Bring u to the same depth as v
        int diff = depth[u] - depth[v];
        for (int j = 0; j < logN; j++) {
            if (((diff >> j) & 1) == 1) {
                u = ancestor[u][j];
            }
        }
        
        // If v was an ancestor of u
        if (u == v) return u;
        
        // Find the LCA by moving both u and v upward
        for (int j = logN - 1; j >= 0; j--) {
            if (ancestor[u][j] != ancestor[v][j]) {
                u = ancestor[u][j];
                v = ancestor[v][j];
            }
        }
        
        return ancestor[u][0];
    }
}`,
          explanation: "These examples demonstrate practical applications and optimizations of LCA. The distance calculation uses LCA to find the shortest path between two nodes. The preprocessing approach (binary lifting) enables O(1) LCA queries after O(n log n) preprocessing, which is efficient for multiple queries. The isInSubtree helper is useful for various tree algorithms."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement a function to find the LCA of two nodes in a binary tree, but with a twist: the function should return null if either of the nodes doesn't exist in the tree.",
      solution: "Modify the standard LCA algorithm to first check if both nodes exist in the tree. You can do this by performing a traversal to check for existence before computing the LCA, or by modifying the LCA function to return a special value indicating that one of the nodes wasn't found."
    },
    {
      id: "hw-2",
      question: "Given a binary tree and three nodes p, q, and r, find the lowest common ancestor of all three nodes.",
      solution: "You can solve this by first finding the LCA of any two nodes (e.g., p and q), and then finding the LCA of that result and the third node (r). The final result will be the LCA of all three nodes."
    },
    {
      id: "hw-3",
      question: "In a family tree where each person has two parents, find the most recent common ancestor of two people. Each person node has pointers to their parents rather than their children.",
      solution: "This is similar to the LCA with parent pointers problem. Create sets of ancestors for both people by traversing upward through parent pointers. Then find the lowest (most recent) common ancestor by comparing the sets."
    },
    {
      id: "hw-4",
      question: "Implement an LCA algorithm for a k-ary tree (where each node has up to k children) that is optimized for multiple queries.",
      solution: "Use a preprocessing approach like binary lifting, which stores 2^j-th ancestors for each node. After preprocessing in O(n log n) time, each LCA query can be answered in O(log n) time, making it efficient for multiple queries."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "What is the time complexity of finding the LCA in a binary tree using the recursive approach?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "The recursive approach for finding LCA in a binary tree has O(n) time complexity because in the worst case, we might need to visit all nodes of the tree once."
    },
    {
      id: "quiz-2",
      question: "What is the main advantage of the LCA algorithm optimized for Binary Search Trees compared to the general binary tree algorithm?",
      options: ["It requires less space", "It has O(log n) time complexity for balanced trees", "It is simpler to implement", "It can handle missing nodes better"],
      correctAnswer: 1,
      explanation: "The BST-specific LCA algorithm has O(log n) time complexity for balanced trees, significantly better than the O(n) complexity of the general algorithm. This is possible because the BST property allows us to make decisions based on comparing values without needing to explore entire subtrees."
    },
    {
      id: "quiz-3",
      question: "If nodes p and q in a binary tree are identical (p == q), what will be returned by the standard LCA algorithm?",
      options: ["null", "p (or q, since they're identical)", "The parent of p", "The root of the tree"],
      correctAnswer: 1,
      explanation: "If both nodes are identical, the standard LCA algorithm will return that node itself. This follows from the definition of LCA where a node can be a descendant of itself."
    },
    {
      id: "quiz-4",
      question: "Which of the following applications would benefit most from preprocessing for LCA queries?",
      options: [
        "Finding the LCA once in a static tree", 
        "Finding the LCA in a tree that changes frequently", 
        "Finding the LCA multiple times in a static tree", 
        "Finding the distance between adjacent nodes"
      ],
      correctAnswer: 2,
      explanation: "Preprocessing for LCA queries is most beneficial when you need to find the LCA multiple times in a static tree. The preprocessing has a higher upfront cost but makes each subsequent query much faster, which amortizes well over many queries."
    }
  ]
};

export default lowestCommonAncestorContent; 