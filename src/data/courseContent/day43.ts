import { Content } from '@/types/course';

const hardDPContent: Content = {
  introduction: "Advanced or 'Hard' Dynamic Programming problems represent the pinnacle of algorithmic challenge, requiring sophisticated state definitions, complex transitions, and often multiple dimensions in the DP table. These problems push the boundaries of standard DP paradigms and frequently appear in competitive programming contests and challenging technical interviews. In this module, we'll explore complex DP problems including state compression, interval DP, digit DP, and DP with bitmasks, equipping you with the tools to tackle the most demanding algorithmic challenges.",
  
  learningObjectives: [
    "Master advanced state definitions and transitions in multi-dimensional DP problems",
    "Implement state compression techniques to optimize memory usage",
    "Solve problems using interval DP and understand its applications",
    "Apply DP with bitmasks for handling combinatorial optimization problems",
    "Analyze and implement digit DP for counting problems with digit constraints"
  ],
  
  sections: [
    {
      title: "State Compression DP",
      content: "State compression is a technique used to reduce the memory requirements of DP algorithms by efficiently encoding states. This is particularly useful when dealing with problems that have a large state space but exhibit patterns that allow for compression. Common methods include using bitmasks, hashing, or representing states implicitly.",
      codeExamples: [
        {
          language: "java",
          code: `// Travelling Salesman Problem using DP with bitmask state compression
public int tsp(int[][] distances) {
    int n = distances.length;
    
    // dp[mask][last] = minimum distance to visit all cities in mask and end at city 'last'
    int[][] dp = new int[1 << n][n];
    
    // Initialize with infinity
    for (int[] row : dp) {
        Arrays.fill(row, Integer.MAX_VALUE / 2);
    }
    
    // Base case: start from city 0
    dp[1][0] = 0; // 1 = binary 0001, representing only city 0 is visited
    
    // Consider all possible city subsets
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int end = 0; end < n; end++) {
            // Skip if end city is not in the current mask
            if ((mask & (1 << end)) == 0) continue;
            
            // Previous mask without the end city
            int prevMask = mask ^ (1 << end);
            
            // Skip if prevMask is empty and end is not the starting city
            if (prevMask == 0 && end != 0) continue;
            
            // Try all possible previous cities
            for (int prev = 0; prev < n; prev++) {
                if ((prevMask & (1 << prev)) == 0) continue;
                
                // Update minimum distance
                dp[mask][end] = Math.min(dp[mask][end], 
                                       dp[prevMask][prev] + distances[prev][end]);
            }
        }
    }
    
    // Find minimum cost to visit all cities and return to the starting city
    int allVisited = (1 << n) - 1;
    int minCost = Integer.MAX_VALUE;
    
    for (int end = 0; end < n; end++) {
        minCost = Math.min(minCost, dp[allVisited][end] + distances[end][0]);
    }
    
    return minCost;
}`,
          explanation: "This implementation solves the Travelling Salesman Problem (TSP) using dynamic programming with bitmask state compression. The state dp[mask][end] represents the minimum distance needed to visit all cities in the mask and end at the city 'end'. The mask is a binary representation where each bit indicates whether a city has been visited. This approach reduces an O(n!) problem to O(n²·2ⁿ) by eliminating redundant calculations and efficiently encoding the visited state."
        }
      ]
    },
    {
      title: "Interval DP",
      content: "Interval DP is a technique for solving problems that involve operations on intervals. In this approach, the state typically depends on the results of smaller intervals. The key characteristic is that we process intervals of increasing length, from smallest to largest, until we cover the entire problem space.",
      codeExamples: [
        {
          language: "java",
          code: `// Matrix Chain Multiplication using Interval DP
public int matrixChainMultiplication(int[] dimensions) {
    int n = dimensions.length - 1; // Number of matrices
    
    // dp[i][j] = minimum cost to multiply matrices from i to j
    int[][] dp = new int[n][n];
    
    // Fill the dp table for all possible lengths of matrix chains
    for (int len = 1; len < n; len++) {
        for (int i = 0; i < n - len; i++) {
            int j = i + len;
            dp[i][j] = Integer.MAX_VALUE;
            
            // Try all possible split points
            for (int k = i; k < j; k++) {
                // Cost = cost of multiplying left subchain + right subchain + cost of multiplying the results
                int cost = dp[i][k] + dp[k+1][j] + dimensions[i] * dimensions[k+1] * dimensions[j+1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n-1];
}`,
          explanation: "This code implements the Matrix Chain Multiplication problem using interval DP. The goal is to determine the optimal way to parenthesize the matrix multiplication to minimize the total number of scalar multiplications. We build solutions for increasingly larger intervals until we have the solution for the entire chain. For each interval [i,j], we consider all possible split points k and choose the one that minimizes the total cost."
        },
        {
          language: "java",
          code: `// Optimal Binary Search Tree using Interval DP
public int optimalBST(int[] keys, int[] freq) {
    int n = keys.length;
    
    // dp[i][j] = minimum cost of a BST containing keys from i to j
    int[][] dp = new int[n][n];
    
    // Initialize for single-key trees
    for (int i = 0; i < n; i++) {
        dp[i][i] = freq[i];
    }
    
    // Fill the dp table for all possible interval lengths
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE;
            
            // Sum of frequencies in the interval [i,j]
            int sumFreq = 0;
            for (int k = i; k <= j; k++) {
                sumFreq += freq[k];
            }
            
            // Try all keys as the root
            for (int r = i; r <= j; r++) {
                // Cost with root r = cost of left subtree + cost of right subtree + sum of frequencies
                int cost = (r > i ? dp[i][r-1] : 0) + 
                           (r < j ? dp[r+1][j] : 0) + 
                           sumFreq;
                           
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n-1];
}`,
          explanation: "This algorithm solves the Optimal Binary Search Tree problem using interval DP. Given a sorted array of keys and their frequencies, we want to construct a BST that minimizes the total search cost. For each interval of keys [i,j], we try each key as the root and recursively compute the best arrangement for the left and right subtrees. The total cost includes the cost of the subtrees plus the sum of frequencies (representing the search cost)."
        }
      ]
    },
    {
      title: "DP with Bitmasks",
      content: "DP with bitmasks is a powerful technique for solving problems with small sets of elements where we need to consider various combinations. Bitmasks are used to represent subsets efficiently, with each bit indicating inclusion or exclusion of an element.",
      codeExamples: [
        {
          language: "java",
          code: `// Minimum Cost to Visit All Nodes (Hamiltonian Path) using DP with Bitmasks
public int minCostPath(int[][] graph) {
    int n = graph.length;
    
    // dp[mask][node] = min cost to visit all nodes in mask and end at 'node'
    int[][] dp = new int[1 << n][n];
    
    // Initialize with a large value
    for (int[] row : dp) {
        Arrays.fill(row, Integer.MAX_VALUE / 2);
    }
    
    // Base case: start at node 0 with just that node visited
    dp[1][0] = 0;
    
    // Consider all possible subsets of nodes
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            // Skip if node u is not in the current subset
            if ((mask & (1 << u)) == 0) continue;
            
            // Previous mask without node u
            int prevMask = mask ^ (1 << u);
            
            // Skip if prevMask is empty (only happens for u=0 and mask=1)
            if (prevMask == 0) continue;
            
            // Try all possible previous nodes
            for (int v = 0; v < n; v++) {
                if ((prevMask & (1 << v)) == 0) continue;
                
                // Update minimum cost to reach node u
                dp[mask][u] = Math.min(dp[mask][u], dp[prevMask][v] + graph[v][u]);
            }
        }
    }
    
    // Find minimum cost to visit all nodes
    int allVisited = (1 << n) - 1;
    int minCost = Integer.MAX_VALUE;
    
    for (int u = 0; u < n; u++) {
        minCost = Math.min(minCost, dp[allVisited][u]);
    }
    
    return minCost;
}`,
          explanation: "This implementation solves the minimum cost Hamiltonian Path problem using DP with bitmasks. The state dp[mask][node] represents the minimum cost to visit all nodes in the mask and end at the specified node. We use bitwise operations to efficiently manipulate the sets of visited nodes. The approach systematically builds solutions for larger subsets based on solutions for smaller subsets."
        },
        {
          language: "java",
          code: `// Subset Sum Problem using DP with Bitmasks
public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    
    // If total sum is odd, we can't partition into equal subsets
    if (sum % 2 != 0) {
        return false;
    }
    
    int target = sum / 2;
    int n = nums.length;
    
    // Use bit manipulation to track all possible sums
    // possible[i] = 1 means we can create a sum of i
    long possible = 1; // Initially, we can make a sum of 0
    
    for (int num : nums) {
        // Update all possible sums by including the current number
        possible |= (possible << num);
        
        // Check if we can make the target sum
        if ((possible & (1L << target)) != 0) {
            return true;
        }
    }
    
    return false;
}`,
          explanation: "This code solves the Subset Sum Problem using DP with bitmasks. Instead of a traditional 2D DP array, we use a single long value where each bit represents whether a specific sum can be achieved. When processing each number, we update all possible sums by shifting the bitmask left by the value of the number. This approach is not only space-efficient but also leverages fast bitwise operations for calculation."
        }
      ]
    },
    {
      title: "Digit DP",
      content: "Digit DP is a specialized technique for solving problems that involve counting numbers with certain digit-related constraints. These problems typically ask for the count of numbers within a range that satisfy specific properties related to their digits.",
      codeExamples: [
        {
          language: "java",
          code: `// Count numbers in range [low, high] with non-decreasing digits
public int countNonDecreasingNumbers(int low, int high) {
    return countNonDecreasing(high) - countNonDecreasing(low - 1);
}

// Count non-decreasing numbers from 1 to limit
private int countNonDecreasing(int limit) {
    // Convert limit to string for digit processing
    String s = Integer.toString(limit);
    int n = s.length();
    
    // dp[pos][last][tight] = count of valid numbers when we are at position 'pos',
    // the last digit used is 'last', and 'tight' indicates if we are bounded by the limit
    int[][][] dp = new int[n + 1][10][2];
    
    // Initialize with -1 to indicate uncomputed states
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j < 10; j++) {
            Arrays.fill(dp[i][j], -1);
        }
    }
    
    return digitDpHelper(0, 0, 1, s, dp);
}

private int digitDpHelper(int pos, int last, int tight, String s, int[][][] dp) {
    // Base case: we've processed all digits
    if (pos == s.length()) {
        return 1;
    }
    
    // If this state has been computed before, return the result
    if (dp[pos][last][tight] != -1) {
        return dp[pos][last][tight];
    }
    
    int result = 0;
    int limit = (tight == 1) ? s.charAt(pos) - '0' : 9;
    
    // Try all possible digits for the current position
    for (int digit = 0; digit <= limit; digit++) {
        // Skip if this would make the number invalid (digits decreasing)
        if (pos > 0 && digit < last) {
            continue;
        }
        
        // Calculate new tight flag
        int newTight = (tight == 1 && digit == limit) ? 1 : 0;
        
        // Recursively count numbers
        result += digitDpHelper(pos + 1, digit, newTight, s, dp);
    }
    
    // Memoize and return
    return dp[pos][last][tight] = result;
}`,
          explanation: "This implementation demonstrates Digit DP to count numbers with non-decreasing digits within a given range. The key aspects are: (1) processing digits from left to right, (2) using a 'tight' flag to indicate if we're constrained by the upper bound, and (3) keeping track of the last digit to enforce the non-decreasing property. The memoization prevents redundant calculations, making this approach efficient for large ranges."
        }
      ]
    },
    {
      title: "DP on Trees",
      content: "Tree DP problems involve applying dynamic programming principles to tree structures. The key insight is that a solution for a subtree can be built from solutions for its child subtrees. This is typically implemented using a post-order traversal approach.",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Independent Set in a Tree (tree DP problem)
class TreeNode {
    int val;
    List<TreeNode> children;
    
    TreeNode(int val) {
        this.val = val;
        this.children = new ArrayList<>();
    }
}

public int maxIndependentSet(TreeNode root) {
    if (root == null) return 0;
    
    // Map to store DP results
    Map<TreeNode, Integer> includedMap = new HashMap<>();
    Map<TreeNode, Integer> excludedMap = new HashMap<>();
    
    return Math.max(
        maxIndependentSetHelper(root, true, includedMap, excludedMap),
        maxIndependentSetHelper(root, false, includedMap, excludedMap)
    );
}

private int maxIndependentSetHelper(TreeNode node, boolean included,
                                  Map<TreeNode, Integer> includedMap,
                                  Map<TreeNode, Integer> excludedMap) {
    if (node == null) return 0;
    
    // Check if result is already memoized
    if (included && includedMap.containsKey(node)) {
        return includedMap.get(node);
    }
    if (!included && excludedMap.containsKey(node)) {
        return excludedMap.get(node);
    }
    
    int result = 0;
    
    if (included) {
        // If current node is included, its children must be excluded
        result = node.val;
        for (TreeNode child : node.children) {
            result += maxIndependentSetHelper(child, false, includedMap, excludedMap);
        }
        includedMap.put(node, result);
    } else {
        // If current node is excluded, its children can be either included or excluded
        for (TreeNode child : node.children) {
            result += Math.max(
                maxIndependentSetHelper(child, true, includedMap, excludedMap),
                maxIndependentSetHelper(child, false, includedMap, excludedMap)
            );
        }
        excludedMap.put(node, result);
    }
    
    return result;
}`,
          explanation: "This code solves the Maximum Independent Set problem on a tree using DP. An independent set is a set of vertices where no two vertices share an edge. For each node, we consider two states: including the node in the set or excluding it. If a node is included, all its children must be excluded. If it's excluded, its children can be either included or excluded. We memoize results to avoid recalculating the same subtree problems."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hard-dp-hw1",
      question: "Longest Palindromic Subsequence in a Tree: Given a tree where each node has a character value, find the longest palindromic path (not necessarily passing through the root). A path is palindromic if the sequence of node values reads the same from both ends.",
      solution: "Use tree DP with a post-order traversal. For each node, compute (1) the longest palindromic path passing through this node as a turning point, and (2) the longest path ending at this node for each possible character. When processing a node, combine the information from its children to find paths that form palindromes. The longest palindromic path through a node combines two branches with matching ending characters."
    },
    {
      id: "hard-dp-hw2",
      question: "Burst Balloons: Given n balloons, each with a number written on it. Burst one balloon at a time to earn coins. The coins earned equals the product of the numbers on the left, the burst balloon, and the right. Find the maximum coins you can collect.",
      solution: "Use interval DP. Define dp[i][j] as the maximum coins obtained by bursting all balloons between indices i and j. The key insight is to consider the last balloon to burst in this interval. For each possible last balloon k, the coins earned will be nums[i-1] * nums[k] * nums[j+1] plus the maximum coins from bursting all balloons in intervals [i,k-1] and [k+1,j]."
    },
    {
      id: "hard-dp-hw3",
      question: "Count digit sequences of length n where adjacent digits differ by at most 2. For example, 1234 is valid but 1235 is not because |5-2|>2.",
      solution: "Use digit DP. Define dp[pos][last] as the number of valid sequences of length pos where the last digit used is 'last'. For each position, try digits 0-9, and only count those where the absolute difference from the last digit is at most 2. Start with any digit for the first position, then build sequences by adding valid digits one by one."
    },
    {
      id: "hard-dp-hw4",
      question: "Partition to K Equal Sum Subsets: Given an array of integers and an integer k, determine if it's possible to divide the array into k non-empty subsets with equal sums.",
      solution: "Use DP with bitmasks. Define dp[mask] as a boolean indicating whether the elements in the subset represented by mask can be divided into groups with the target sum. Process elements in the array and update the DP table for all subsets. For each subset, check if it can form a complete group or contribute to an existing partial group."
    }
  ],
  
  quiz: [
    {
      id: "hard-dp-q1",
      question: "In the Travelling Salesman Problem using bitmask DP, what does the state dp[mask][end] typically represent?",
      options: [
        "The shortest path from city 'end' to all cities in the 'mask'",
        "The minimum cost to visit all cities in the 'mask' ending at city 'end'",
        "The maximum distance between any two cities in the 'mask'",
        "The number of ways to visit all cities in the 'mask' ending at city 'end'"
      ],
      correctAnswer: 1,
      explanation: "In the Travelling Salesman Problem using bitmask DP, the state dp[mask][end] represents the minimum cost to visit all cities in the subset represented by 'mask' and ending at city 'end'. The mask is a binary representation where each bit indicates whether a particular city has been visited."
    },
    {
      id: "hard-dp-q2",
      question: "What is a key characteristic of Interval DP problems?",
      options: [
        "They involve finding optimal solutions by dividing problems into non-overlapping intervals",
        "They require binary search for efficiency",
        "They must always be solved using recursion with memoization",
        "They only work on arrays of even length"
      ],
      correctAnswer: 0,
      explanation: "A key characteristic of Interval DP problems is that they involve finding optimal solutions by dividing problems into non-overlapping intervals. The solution for a larger interval is built from solutions for smaller intervals. Typical examples include matrix chain multiplication, optimal binary search tree, and palindrome partitioning."
    },
    {
      id: "hard-dp-q3",
      question: "In Digit DP problems, what is the purpose of the 'tight' flag?",
      options: [
        "To ensure the solution is space-efficient",
        "To keep track of whether we're processing odd or even digits",
        "To indicate whether we need to match each digit exactly or can use a smaller digit",
        "To detect potential integer overflow issues"
      ],
      correctAnswer: 2,
      explanation: "In Digit DP problems, the 'tight' flag indicates whether we're constrained by the upper bound when building numbers digit by digit. When tight=1, we can only use digits up to the corresponding digit in the upper bound. When tight=0, we can use any digit from 0 to 9, as we've already ensured the number being built will be less than the upper bound."
    },
    {
      id: "hard-dp-q4",
      question: "Which of the following problems is NOT typically solved using bitmask DP?",
      options: [
        "Travelling Salesman Problem",
        "Subset Sum Problem",
        "Matrix Chain Multiplication",
        "Minimum Vertex Cover in a graph"
      ],
      correctAnswer: 2,
      explanation: "Matrix Chain Multiplication is not typically solved using bitmask DP. It's a classic example of Interval DP, where we consider different ways to parenthesize the matrix multiplications. Bitmask DP is more suited for problems involving subsets and combinations, like TSP, Subset Sum, and Minimum Vertex Cover, where the state can be efficiently encoded as a bitmask."
    },
    {
      id: "hard-dp-q5",
      question: "In the Maximum Independent Set problem on trees, why can't a node and its direct child both be included in the solution?",
      options: [
        "It would exceed the maximum allowed nodes in an independent set",
        "It would create a cycle in the resulting graph",
        "Independent sets by definition cannot include adjacent vertices",
        "It would make the dynamic programming solution incorrect"
      ],
      correctAnswer: 2,
      explanation: "In the Maximum Independent Set problem, a node and its direct child cannot both be included because independent sets by definition cannot include adjacent vertices. Since a parent and its child are connected by an edge, including both would violate this constraint. This is why the DP solution for trees considers both cases: including a node (which forces all its children to be excluded) or excluding a node."
    }
  ]
};

export default hardDPContent; 