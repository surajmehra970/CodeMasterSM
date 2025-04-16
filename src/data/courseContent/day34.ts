import { Content } from '@/types/course';

const dpOnTreesContent: Content = {
  introduction: "Dynamic Programming on Trees is a powerful approach for solving optimization problems on tree data structures. By leveraging the hierarchical nature of trees, we can use DP to efficiently solve problems like finding the maximum independent set, minimum vertex cover, and tree diameter. In this lesson, we'll explore how to apply dynamic programming techniques to trees and solve several classic tree-based problems.",
  
  learningObjectives: [
    "Understand the concept of dynamic programming on tree structures",
    "Learn different approaches for tree DP, including post-order traversal and re-rooting techniques",
    "Implement solutions for classic tree DP problems like Maximum Independent Set",
    "Apply tree DP to solve complex problems like Tree Coloring and Diameter",
    "Analyze time and space complexity of tree DP algorithms"
  ],
  
  sections: [
    {
      title: "Fundamentals of DP on Trees",
      content: "Dynamic Programming on trees typically involves computing optimal solutions for subtrees and combining them to solve the original problem. The hierarchical structure of trees makes them particularly suitable for DP approaches. Most tree DP problems can be solved using post-order traversal (bottom-up approach), where we compute results for children before computing the result for the parent node.",
      codeExamples: [
        {
          language: "java",
          code: `// TreeNode representation for our examples
class TreeNode {
    int val;
    List<TreeNode> children;
    
    public TreeNode(int val) {
        this.val = val;
        this.children = new ArrayList<>();
    }
}

// Basic template for Tree DP
// This function computes some result for each node in the tree
Map<TreeNode, Integer> computeOnTree(TreeNode root) {
    Map<TreeNode, Integer> dp = new HashMap<>();
    
    // Helper function to do post-order traversal
    dfs(root, dp);
    
    return dp;
}

void dfs(TreeNode node, Map<TreeNode, Integer> dp) {
    // Base case: leaf node
    if (node.children.isEmpty()) {
        dp.put(node, leafNodeValue(node));
        return;
    }
    
    // Process all children first (post-order)
    for (TreeNode child : node.children) {
        dfs(child, dp);
    }
    
    // Compute result for current node based on children's results
    int result = computeNodeValue(node, dp);
    dp.put(node, result);
}

// These functions would be problem-specific
int leafNodeValue(TreeNode node) {
    // Return some value for leaf nodes
    return node.val;
}

int computeNodeValue(TreeNode node, Map<TreeNode, Integer> dp) {
    // Compute value for current node based on children's dp values
    int result = node.val;
    
    for (TreeNode child : node.children) {
        result += someFunction(dp.get(child));
    }
    
    return result;
}

int someFunction(int childValue) {
    // Some function that processes child value
    return childValue;
}`,
          explanation: "This code demonstrates a general approach to apply DP on trees. We use post-order traversal (DFS) to process children before their parent. For each node, we compute a result based on its value and the results of its children. The specific computation depends on the problem. This approach is often called the 'bottom-up' method because we start calculations from the leaf nodes (bottom) and work our way up to the root."
        }
      ]
    },
    {
      title: "Maximum Independent Set on Trees",
      content: "The Maximum Independent Set (MIS) problem involves finding the largest set of vertices in a graph such that no two vertices in the set are adjacent. On trees, this problem can be efficiently solved using dynamic programming. For each node, we consider two possibilities: either include it in the MIS (in which case we can't include any of its children) or exclude it (in which case we can include its children in the optimal way).",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Independent Set on Trees
// Returns the size of the maximum independent set
int maximumIndependentSet(TreeNode root) {
    Map<TreeNode, Integer> include = new HashMap<>();
    Map<TreeNode, Integer> exclude = new HashMap<>();
    
    dfs(root, include, exclude);
    
    return Math.max(include.get(root), exclude.get(root));
}

void dfs(TreeNode node, Map<TreeNode, Integer> include, Map<TreeNode, Integer> exclude) {
    // Base case: leaf node
    if (node.children.isEmpty()) {
        include.put(node, 1); // Include the leaf
        exclude.put(node, 0); // Exclude the leaf
        return;
    }
    
    int includeSum = 1; // Start with 1 for the current node
    int excludeSum = 0;
    
    // Process all children
    for (TreeNode child : node.children) {
        dfs(child, include, exclude);
        
        // If we include the current node, we must exclude all children
        includeSum += exclude.get(child);
        
        // If we exclude the current node, we can either include or exclude each child
        // (take the maximum)
        excludeSum += Math.max(include.get(child), exclude.get(child));
    }
    
    include.put(node, includeSum);
    exclude.put(node, excludeSum);
}

// Usage example
void main() {
    TreeNode root = buildTree(); // Function to build your tree
    int maxIndependentSetSize = maximumIndependentSet(root);
    System.out.println("Maximum Independent Set size: " + maxIndependentSetSize);
}`,
          explanation: "This code solves the Maximum Independent Set problem on a tree. For each node, we compute two values: 'include' (the size of the MIS if we include this node) and 'exclude' (the size if we exclude it). If we include a node, we must exclude all its children. If we exclude a node, each child can be either included or excluded, whichever gives the maximum value. The time complexity is O(n), where n is the number of nodes in the tree."
        }
      ]
    },
    {
      title: "Minimum Vertex Cover on Trees",
      content: "A vertex cover of a graph is a set of vertices such that each edge of the graph is incident to at least one vertex in the set. The Minimum Vertex Cover problem seeks the smallest such set. On trees, we can solve this efficiently using dynamic programming with a similar approach to the Maximum Independent Set problem.",
      codeExamples: [
        {
          language: "java",
          code: `// Minimum Vertex Cover on Trees
// Returns the size of the minimum vertex cover
int minimumVertexCover(TreeNode root) {
    Map<TreeNode, Integer> include = new HashMap<>();
    Map<TreeNode, Integer> exclude = new HashMap<>();
    
    dfs(root, include, exclude);
    
    return Math.min(include.get(root), exclude.get(root));
}

void dfs(TreeNode node, Map<TreeNode, Integer> include, Map<TreeNode, Integer> exclude) {
    // Base case: leaf node
    if (node.children.isEmpty()) {
        include.put(node, 1); // Include the leaf
        exclude.put(node, 0); // Exclude the leaf (no edges to cover)
        return;
    }
    
    int includeSum = 1; // Start with 1 for the current node
    int excludeSum = 0;
    
    // Process all children
    for (TreeNode child : node.children) {
        dfs(child, include, exclude);
        
        // If we include the current node, we can either include or exclude each child
        includeSum += Math.min(include.get(child), exclude.get(child));
        
        // If we exclude the current node, we must include all children
        // (to cover the edges between this node and its children)
        excludeSum += include.get(child);
    }
    
    include.put(node, includeSum);
    exclude.put(node, excludeSum);
}

// Usage example
void main() {
    TreeNode root = buildTree(); // Function to build your tree
    int minVertexCoverSize = minimumVertexCover(root);
    System.out.println("Minimum Vertex Cover size: " + minVertexCoverSize);
}`,
          explanation: "This algorithm computes the minimum vertex cover of a tree. For each node, we maintain two states: 'include' (the size of the minimum vertex cover if we include this node) and 'exclude' (the size if we exclude it). If we exclude a node, we must include all its children to cover the edges. If we include a node, each child can be either included or excluded, whichever gives the minimum value. The solution is calculated in a bottom-up manner, and the time complexity is O(n)."
        }
      ]
    },
    {
      title: "Tree Diameter using DP",
      content: "The diameter of a tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. We can efficiently compute the diameter using dynamic programming and a post-order traversal.",
      codeExamples: [
        {
          language: "java",
          code: `// Diameter of a tree using DP
// The diameter is the longest path between any two nodes
int treeDiameter(TreeNode root) {
    int[] diameter = new int[1]; // Array to hold the result (trick to pass by reference)
    
    // This function returns the height of the tree rooted at 'node'
    // and updates diameter[0] with the maximum diameter found so far
    heightAndUpdateDiameter(root, diameter);
    
    return diameter[0];
}

int heightAndUpdateDiameter(TreeNode node, int[] diameter) {
    if (node == null) {
        return 0;
    }
    
    // If leaf node
    if (node.children.isEmpty()) {
        return 1;
    }
    
    // Find the two children with the maximum heights
    int maxHeight1 = 0;
    int maxHeight2 = 0;
    
    for (TreeNode child : node.children) {
        int childHeight = heightAndUpdateDiameter(child, diameter);
        
        if (childHeight > maxHeight1) {
            maxHeight2 = maxHeight1;
            maxHeight1 = childHeight;
        } else if (childHeight > maxHeight2) {
            maxHeight2 = childHeight;
        }
    }
    
    // Update diameter: the longest path passing through this node
    // is the sum of the two longest paths from this node to leaves
    int pathThroughNode = maxHeight1 + maxHeight2;
    diameter[0] = Math.max(diameter[0], pathThroughNode);
    
    // Return the height of this subtree
    return 1 + maxHeight1;
}

// Usage example
void main() {
    TreeNode root = buildTree(); // Function to build your tree
    int diameter = treeDiameter(root);
    System.out.println("Tree Diameter: " + diameter);
}`,
          explanation: "This code computes the diameter of a tree using dynamic programming. The key insight is that for each node, the diameter is either the longest path passing through the node (the sum of the two longest paths from the node to leaves) or it doesn't pass through the node (in which case it's handled by the recursive calls). We perform a post-order traversal to compute the height of each subtree and update the diameter whenever we find a longer path. The time complexity is O(n)."
        }
      ]
    },
    {
      title: "DP on Trees with Re-rooting",
      content: "Some tree problems require considering each node as a potential root. The 'Re-rooting' technique allows us to efficiently compute results for all possible roots without repeating the entire computation for each root. This approach is useful for problems like finding the sum of distances from each node to all other nodes.",
      codeExamples: [
        {
          language: "java",
          code: `// Sum of distances from each node to all other nodes
// First, build an undirected tree with parent-child relationships
class TreeNode {
    int val;
    List<TreeNode> neighbors; // all connected nodes (parent and children)
    
    public TreeNode(int val) {
        this.val = val;
        this.neighbors = new ArrayList<>();
    }
}

// Returns an array where result[i] is the sum of distances from node i to all other nodes
int[] sumOfDistances(int n, int[][] edges) {
    // Build the tree
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
        graph.get(edge[1]).add(edge[0]);
    }
    
    int[] count = new int[n]; // count[i] = number of nodes in subtree i (including i)
    int[] distance = new int[n]; // distance[i] = sum of distances from i to all nodes in its subtree
    
    // First pass: post-order traversal to compute count and distance arrays
    dfs1(graph, 0, -1, count, distance);
    
    // Second pass: pre-order traversal to re-root and compute final distances
    dfs2(graph, 0, -1, count, distance, n);
    
    return distance;
}

// Post-order traversal (bottom-up)
void dfs1(List<List<Integer>> graph, int node, int parent, int[] count, int[] distance) {
    count[node] = 1; // Start with just the node itself
    
    for (int child : graph.get(node)) {
        if (child != parent) {
            dfs1(graph, child, node, count, distance);
            count[node] += count[child];
            distance[node] += distance[child] + count[child]; // Add child's distance plus the count (for the extra edge)
        }
    }
}

// Pre-order traversal (top-down)
void dfs2(List<List<Integer>> graph, int node, int parent, int[] count, int[] distance, int n) {
    for (int child : graph.get(node)) {
        if (child != parent) {
            // Re-root: parent becomes child, child becomes parent
            // When re-rooting from node to child:
            // 1. Remove child's contribution to node's distance
            // 2. Add node's contribution to child's distance
            
            // Original distance for node includes:
            // - distance[child] (sum of distances from child to its subtree)
            // - count[child] (there are this many nodes, each 1 unit away from node)
            
            // After re-rooting:
            // - There are (n - count[child]) nodes in the part of the tree excluding child's subtree
            // - Each of these nodes is now 1 unit further from child than from node
            
            distance[child] = distance[node] - count[child] + (n - count[child]);
            
            dfs2(graph, child, node, count, distance, n);
        }
    }
}

// Usage example
void main() {
    int n = 6;
    int[][] edges = {{0,1}, {0,2}, {2,3}, {2,4}, {2,5}};
    int[] distances = sumOfDistances(n, edges);
    
    for (int i = 0; i < n; i++) {
        System.out.println("Sum of distances from node " + i + " to all other nodes: " + distances[i]);
    }
}`,
          explanation: "This code computes the sum of distances from each node to all other nodes in a tree. It uses the re-rooting technique to avoid recomputing distances for each potential root. The solution involves two DFS traversals: the first (post-order) computes distances from each node to its subtree, and the second (pre-order) re-roots the tree at each node to compute the total distances. The time complexity is O(n), making it much more efficient than a naive O(n²) approach that would compute distances separately for each node as the root."
        }
      ]
    },
    {
      title: "Tree Coloring Problems",
      content: "Tree coloring problems involve coloring the nodes of a tree such that no two adjacent nodes have the same color, while optimizing some objective function. These problems can be efficiently solved using dynamic programming on trees.",
      codeExamples: [
        {
          language: "java",
          code: `// Minimum Cost Tree Coloring
// Given a tree and costs to color each node with different colors,
// find the minimum cost to color the tree such that no adjacent nodes have the same color.

// Let's consider a specific case: coloring with 3 colors (0, 1, 2)
// costs[i][c] = cost to color node i with color c

int minCostTreeColoring(List<List<Integer>> graph, int[][] costs) {
    int n = graph.size();
    int colors = 3; // Number of colors
    
    // dp[node][color] = min cost to color subtree rooted at 'node' 
    // such that 'node' is colored with 'color'
    int[][] dp = new int[n][colors];
    
    // Start DFS from root (node 0)
    dfs(graph, 0, -1, dp, costs);
    
    // Find the minimum cost color for the root
    int minCost = Integer.MAX_VALUE;
    for (int c = 0; c < colors; c++) {
        minCost = Math.min(minCost, dp[0][c]);
    }
    
    return minCost;
}

void dfs(List<List<Integer>> graph, int node, int parent, int[][] dp, int[][] costs) {
    int colors = dp[0].length;
    
    // Initialize with the color costs for this node
    for (int c = 0; c < colors; c++) {
        dp[node][c] = costs[node][c];
    }
    
    // Process all children
    for (int child : graph.get(node)) {
        if (child != parent) {
            dfs(graph, child, node, dp, costs);
            
            // Update dp values for the current node based on this child
            int[] newDp = new int[colors];
            Arrays.fill(newDp, Integer.MAX_VALUE);
            
            // For each possible color of the current node
            for (int nodeColor = 0; nodeColor < colors; nodeColor++) {
                // For each possible color of the child
                for (int childColor = 0; childColor < colors; childColor++) {
                    // Skip if the colors are the same (adjacent nodes can't have the same color)
                    if (nodeColor == childColor) {
                        continue;
                    }
                    
                    // Update the dp value
                    newDp[nodeColor] = Math.min(newDp[nodeColor], dp[node][nodeColor] + dp[child][childColor] - costs[node][nodeColor]);
                }
            }
            
            // Update dp for the current node
            for (int c = 0; c < colors; c++) {
                dp[node][c] = newDp[c];
            }
        }
    }
}

// Usage example
void main() {
    int n = 4; // Number of nodes
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    
    // Add edges (undirected tree)
    graph.get(0).add(1);
    graph.get(1).add(0);
    graph.get(0).add(2);
    graph.get(2).add(0);
    graph.get(1).add(3);
    graph.get(3).add(1);
    
    // Cost to color each node with each color
    int[][] costs = {
        {1, 2, 3}, // Node 0
        {2, 3, 1}, // Node 1
        {3, 1, 2}, // Node 2
        {1, 3, 2}  // Node 3
    };
    
    int minCost = minCostTreeColoring(graph, costs);
    System.out.println("Minimum cost to color the tree: " + minCost);
}`,
          explanation: "This code solves a tree coloring problem where the objective is to minimize the total coloring cost. For each node and possible color, we compute the minimum cost to color the subtree rooted at that node such that the node itself has the given color. We update these values in a bottom-up manner through post-order traversal. The constraint is that adjacent nodes cannot have the same color. This approach generalizes to various tree coloring problems with different constraints and objectives."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "tree-dp-hw1",
      question: "Implement a function to find the maximum sum of nodes such that no two adjacent nodes are included (similar to maximum independent set, but with values).",
      solution: "Use tree DP similar to the Maximum Independent Set solution. For each node, maintain two values: 'include' (maximum sum if the node is included) and 'exclude' (maximum sum if excluded). For 'include', add the node's value and the sum of 'exclude' values for all children. For 'exclude', take the maximum of 'include' and 'exclude' for each child. The answer is the maximum of 'include' and 'exclude' for the root."
    },
    {
      id: "tree-dp-hw2",
      question: "Implement a solution for the Tree Painting problem: given a tree with some nodes already colored, find the minimum number of additional nodes to color such that every uncolored node is adjacent to at least one colored node.",
      solution: "Use tree DP with two states for each node: 'colored' (minimum nodes to color if this node is colored) and 'uncolored' (minimum if it's uncolored). For 'colored', add 1 to the sum of minimums for each child. For 'uncolored', ensure that all children are either colored or have at least one colored child. Process the tree bottom-up, and the answer is the minimum of the two states for the root."
    },
    {
      id: "tree-dp-hw3",
      question: "Implement the 'Distance to Farthest Leaf' problem: for each node in a tree, find the maximum distance to any leaf node in its subtree.",
      solution: "Use a post-order traversal. For each node, compute the maximum distance to a leaf by finding the maximum distance among its children and adding 1. This approach can be implemented iteratively or recursively. The time complexity is O(n), where n is the number of nodes in the tree."
    },
    {
      id: "tree-dp-hw4",
      question: "Implement a solution to find the number of subtrees with a given sum in a binary tree.",
      solution: "Use post-order traversal with a map to count occurrences of each sum. For each node, compute the sum of its subtree (its value plus the sums of its children's subtrees) and update the count for this sum. At the end, return the count for the target sum. This approach has O(n) time complexity, where n is the number of nodes in the tree."
    }
  ],
  
  quiz: [
    {
      id: "tree-dp-q1",
      question: "In the context of dynamic programming on trees, what traversal is typically used to compute results in a bottom-up manner?",
      options: ["Pre-order traversal", "In-order traversal", "Post-order traversal", "Level-order traversal"],
      correctAnswer: 2,
      explanation: "Post-order traversal (visit children before the parent) is typically used for dynamic programming on trees because it allows us to compute results for subtrees before computing results for the parent node. This bottom-up approach is essential for DP algorithms on trees."
    },
    {
      id: "tree-dp-q2",
      question: "What is the time complexity of the dynamic programming solution for the Maximum Independent Set problem on a tree with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "The dynamic programming solution for the Maximum Independent Set problem on a tree has a time complexity of O(n), where n is the number of nodes. This is because we visit each node exactly once and perform a constant amount of work per node to compute the 'include' and 'exclude' values."
    },
    {
      id: "tree-dp-q3",
      question: "What is the relationship between the Maximum Independent Set and the Minimum Vertex Cover problems on a tree?",
      options: [
        "They are the same problem",
        "The Minimum Vertex Cover is always n minus the Maximum Independent Set size",
        "The Maximum Independent Set is always n minus the Minimum Vertex Cover size",
        "There is no direct relationship"
      ],
      correctAnswer: 2,
      explanation: "In any graph, the Maximum Independent Set size plus the Minimum Vertex Cover size equals the total number of vertices (n). This is because a set is an independent set if and only if its complement is a vertex cover. Therefore, Max Independent Set = n - Min Vertex Cover."
    },
    {
      id: "tree-dp-q4",
      question: "What is the purpose of the 're-rooting' technique in dynamic programming on trees?",
      options: [
        "To convert the tree into a binary tree",
        "To compute results for each node as if it were the root",
        "To detect cycles in the graph",
        "To find the actual root of the tree"
      ],
      correctAnswer: 1,
      explanation: "The re-rooting technique is used to compute results for each node as if it were the root of the tree, without having to perform a separate full traversal for each node. This is often used in problems where we need to consider each node as a potential root, such as finding the sum of distances from each node to all other nodes."
    },
    {
      id: "tree-dp-q5",
      question: "Which of the following statements about tree diameter computation is FALSE?",
      options: [
        "The diameter is the longest path between any two nodes in the tree",
        "The diameter always passes through the root node",
        "The diameter can be computed in O(n) time using DP",
        "The diameter can be computed using a post-order traversal"
      ],
      correctAnswer: 1,
      explanation: "The statement 'The diameter always passes through the root node' is FALSE. The diameter of a tree is the longest path between any two nodes, and this path may or may not pass through the root. A simple example is a chain of 4 nodes where the root is the second node; the diameter is 3, connecting the first and last nodes, and doesn't go through the root."
    }
  ],
  
  practice: {
    introduction: "These practice problems will help you reinforce your understanding of dynamic programming on tree structures. Work through these problems methodically, focusing on identifying state transitions and applying post-order traversal techniques. The problems range from basic tree DP concepts to more complex scenarios that require optimizing subproblems on tree structures.",
    questions: {
      easy: [
        {
          id: "tree-dp-easy-1",
          title: "Diameter of Binary Tree",
          link: "https://leetcode.com/problems/diameter-of-binary-tree/",
          description: "Find the length of the longest path between any two nodes in a binary tree. This path may or may not pass through the root, which is a classic application of tree DP."
        },
        {
          id: "tree-dp-easy-2",
          title: "Maximum Depth of Binary Tree",
          link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
          description: "Find the maximum depth of a binary tree. While this can be solved with a simple recursion, understanding it as a DP problem helps with more complex tree problems."
        },
        {
          id: "tree-dp-easy-3",
          title: "Binary Tree Maximum Path Sum",
          link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
          description: "Find the maximum sum of any non-empty path in a binary tree. This requires a post-order traversal and considering paths that don't necessarily pass through the root."
        }
      ],
      medium: [
        {
          id: "tree-dp-medium-1",
          title: "House Robber III",
          link: "https://leetcode.com/problems/house-robber-iii/",
          description: "A thief plans to rob houses arranged in a binary tree. The thief cannot rob directly-linked houses. Find the maximum amount the thief can rob, which is a tree version of the Maximum Independent Set problem."
        },
        {
          id: "tree-dp-medium-2",
          title: "Delete Nodes And Return Forest",
          link: "https://leetcode.com/problems/delete-nodes-and-return-forest/",
          description: "Given the root of a binary tree and a list of nodes to delete, return the resulting forest of trees. Apply DP concepts to efficiently process subtrees."
        },
        {
          id: "tree-dp-medium-3",
          title: "All Possible Full Binary Trees",
          link: "https://leetcode.com/problems/all-possible-full-binary-trees/",
          description: "Return a list of all possible full binary trees with n nodes. This involves DP to avoid reconstructing the same subtrees multiple times."
        },
        {
          id: "tree-dp-medium-4",
          title: "Distribute Coins in Binary Tree",
          link: "https://leetcode.com/problems/distribute-coins-in-binary-tree/",
          description: "Redistribute coins in a binary tree so each node has one coin. Calculate the minimum number of moves required, applying tree DP principles."
        }
      ],
      hard: [
        {
          id: "tree-dp-hard-1",
          title: "Sum of Distances in Tree",
          link: "https://leetcode.com/problems/sum-of-distances-in-tree/",
          description: "Calculate the sum of distances between all pairs of nodes in an undirected tree. This requires a two-pass algorithm that uses DP on trees with re-rooting techniques."
        },
        {
          id: "tree-dp-hard-2",
          title: "Minimum Height Trees",
          link: "https://leetcode.com/problems/minimum-height-trees/",
          description: "Find all the minimum height trees in a graph, which is equivalent to finding the center(s) of the tree. Apply tree DP concepts to efficiently compute heights."
        },
        {
          id: "tree-dp-hard-3",
          title: "Tree Diameter",
          link: "https://leetcode.com/problems/tree-diameter/",
          description: "Find the diameter of an undirected tree, which is the length of the longest path between any two nodes. This problem tests your understanding of tree traversal and DP on general trees, not just binary trees."
        }
      ]
    }
  }
};

export default dpOnTreesContent; 