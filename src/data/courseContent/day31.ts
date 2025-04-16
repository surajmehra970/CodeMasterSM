import { Content } from '@/types/course';

const dpIntroductionContent: Content = {
  introduction: "Dynamic Programming (DP) is a powerful algorithmic technique for solving optimization problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations. It's particularly effective for problems with overlapping subproblems and optimal substructure. This introduction will cover the fundamental concepts of DP and demonstrate its application to classic problems.",
  
  learningObjectives: [
    "Understand the core principles of Dynamic Programming",
    "Identify problems with overlapping subproblems and optimal substructure",
    "Master the top-down (memoization) and bottom-up (tabulation) approaches",
    "Apply DP techniques to solve classic optimization problems",
    "Analyze time and space complexity of DP solutions"
  ],
  
  sections: [
    {
      title: "Core Principles of Dynamic Programming",
      content: "Dynamic Programming works by breaking down a complex problem into simpler subproblems, solving each subproblem once, and storing the solutions to avoid redundant calculations. It relies on two key properties: overlapping subproblems and optimal substructure.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Key Principles:

1. Overlapping Subproblems:
   - The same subproblems are solved multiple times
   - Solutions can be cached to avoid redundant calculations
   
2. Optimal Substructure:
   - The optimal solution to the problem contains optimal solutions to its subproblems
   - Allows building the solution from solutions to smaller subproblems

Two Main Approaches:

1. Top-Down Approach (Memoization):
   - Start with the original problem and break it down
   - Use recursion with a cache (memo) to store results
   - Solve only the necessary subproblems
   
2. Bottom-Up Approach (Tabulation):
   - Start with the smallest subproblems and build up
   - Typically uses iteration to fill a table
   - Generally more efficient as it avoids recursion overhead

When to Use DP:
   - Optimization problems (finding minimum, maximum, etc.)
   - Counting problems (how many ways to...)
   - Problems with recursive solutions with overlapping subproblems
*/

// Example: Comparing recursive vs. DP approaches for Fibonacci numbers

// Naive recursive approach - exponential time complexity O(2^n)
public int fibRecursive(int n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// Top-down DP approach (memoization) - linear time complexity O(n)
public int fibMemoization(int n) {
    int[] memo = new int[n + 1];
    Arrays.fill(memo, -1);
    return fibMemoHelper(n, memo);
}

private int fibMemoHelper(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = fibMemoHelper(n - 1, memo) + fibMemoHelper(n - 2, memo);
    return memo[n];
}

// Bottom-up DP approach (tabulation) - linear time complexity O(n)
public int fibTabulation(int n) {
    if (n <= 1) return n;
    
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space-optimized bottom-up approach - O(1) space complexity
public int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev = 0, curr = 1;
    
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}`,
          explanation: "This code illustrates the core principles of Dynamic Programming by comparing different approaches to computing Fibonacci numbers. The naive recursive approach recomputes the same values multiple times, leading to exponential time complexity. Both the top-down (memoization) and bottom-up (tabulation) DP approaches achieve linear time complexity by storing and reusing results. The space-optimized version further reduces space complexity to constant."
        }
      ]
    },
    {
      title: "Top-Down Approach: Memoization",
      content: "The top-down approach, also known as memoization, starts with the original problem and recursively breaks it down into smaller subproblems. It uses a cache (memo) to store the results of subproblems to avoid redundant calculations. This approach is intuitive and often easier to implement initially.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: Climbing Stairs Problem
// You are climbing a staircase. Each time you can climb 1 or 2 steps.
// How many distinct ways can you climb to the top?

// Top-down approach (memoization)
public int climbStairs(int n) {
    int[] memo = new int[n + 1];
    Arrays.fill(memo, -1);
    return climbStairsHelper(n, memo);
}

private int climbStairsHelper(int n, int[] memo) {
    if (n <= 2) return n;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = climbStairsHelper(n - 1, memo) + climbStairsHelper(n - 2, memo);
    return memo[n];
}

// Example 2: Coin Change Problem
// Given coins of different denominations and a total amount of money,
// find the minimum number of coins needed to make up that amount.

// Top-down approach (memoization)
public int coinChange(int[] coins, int amount) {
    int[] memo = new int[amount + 1];
    Arrays.fill(memo, -1);
    return coinChangeHelper(coins, amount, memo);
}

private int coinChangeHelper(int[] coins, int amount, int[] memo) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;
    if (memo[amount] != -1) return memo[amount];
    
    int minCoins = Integer.MAX_VALUE;
    
    for (int coin : coins) {
        int result = coinChangeHelper(coins, amount - coin, memo);
        if (result >= 0) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }
    
    memo[amount] = (minCoins == Integer.MAX_VALUE) ? -1 : minCoins;
    return memo[amount];
}

// Example 3: Longest Common Subsequence
// Given two strings, find the length of their longest common subsequence.

// Top-down approach (memoization)
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int[][] memo = new int[m + 1][n + 1];
    
    // Initialize memo array with -1
    for (int[] row : memo) {
        Arrays.fill(row, -1);
    }
    
    return lcsHelper(text1, text2, m, n, memo);
}

private int lcsHelper(String text1, String text2, int i, int j, int[][] memo) {
    if (i == 0 || j == 0) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    
    if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
        memo[i][j] = 1 + lcsHelper(text1, text2, i - 1, j - 1, memo);
    } else {
        memo[i][j] = Math.max(
            lcsHelper(text1, text2, i - 1, j, memo),
            lcsHelper(text1, text2, i, j - 1, memo)
        );
    }
    
    return memo[i][j];
}`,
          explanation: "These examples demonstrate the top-down (memoization) approach to Dynamic Programming across three classic problems. In each case, we use recursion with a memo array to cache results. The climbing stairs problem has a simple recursive structure with two options at each step. The coin change problem requires finding the minimum number of coins, showcasing optimization in DP. The longest common subsequence problem illustrates using a 2D memo array for problems with multiple input sequences."
        }
      ]
    },
    {
      title: "Bottom-Up Approach: Tabulation",
      content: "The bottom-up approach, also known as tabulation, starts by solving the smallest subproblems first and builds up to the original problem. It typically uses iteration to fill a table of results. This approach is generally more efficient as it avoids the overhead of recursion and function calls.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: Climbing Stairs Problem (Bottom-up approach)
public int climbStairsTabulation(int n) {
    if (n <= 2) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space-optimized version
public int climbStairsOptimized(int n) {
    if (n <= 2) return n;
    
    int prev = 1;  // Ways to climb 1 step
    int curr = 2;  // Ways to climb 2 steps
    
    for (int i = 3; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

// Example 2: Coin Change Problem (Bottom-up approach)
public int coinChangeTabulation(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);  // Fill with a value larger than any possible result
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

// Example 3: Longest Common Subsequence (Bottom-up approach)
public int lcsTabulation(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Space-optimized version of LCS
public int lcsOptimized(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Make sure text1 is the shorter string to optimize space
    if (m > n) {
        return lcsOptimized(text2, text1);
    }
    
    int[] dp = new int[n + 1];
    
    for (int i = 1; i <= m; i++) {
        int prev = 0;  // equivalent to dp[i-1][j-1]
        
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];  // Save the value before it's updated
            
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[j] = prev + 1;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }
            
            prev = temp;  // Update prev for the next iteration
        }
    }
    
    return dp[n];
}`,
          explanation: "These examples demonstrate the bottom-up (tabulation) approach to Dynamic Programming for the same three classic problems. In each case, we use iteration to fill a table (array or matrix) with results for subproblems, starting from the smallest and building up to the original problem. Space-optimized versions are also provided for each problem, showing how to reduce the space complexity by only keeping track of the necessary previous results."
        }
      ]
    },
    {
      title: "State Transition and DP Table Design",
      content: "A crucial step in designing DP solutions is formulating the state representation and the state transition equation. The state represents the parameters that uniquely define a subproblem, while the transition equation describes how to calculate the solution to a state from previously solved states.",
      codeExamples: [
        {
          language: "java",
          code: `/*
State Design Guidelines:

1. Identify the states (variables) needed to uniquely define a subproblem
   - What information is required to calculate the solution?
   - What decisions need to be made at each step?

2. Define the state transition equation
   - How does the solution to the current state relate to solutions of previous states?
   - What operations/decisions connect the states?

3. Define base cases
   - What are the simplest subproblems that can be solved directly?
   - These form the starting point for the DP algorithm

4. Implement the solution (either top-down or bottom-up)
   - Ensure the correct ordering of computation
   - Consider space optimizations if possible
*/

// Example: Knapsack Problem
// Given weights and values of n items, put these items in a knapsack of capacity W
// to get the maximum total value in the knapsack.

// State: dp[i][w] = maximum value that can be obtained using first i items and with weight capacity w
// Transition: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1]) if w >= weights[i-1]
//                      = dp[i-1][w] otherwise

public int knapsack(int[] weights, int[] values, int n, int capacity) {
    // Create a 2D array to store the maximum value for each state
    int[][] dp = new int[n + 1][capacity + 1];
    
    // Fill the dp table in bottom-up manner
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            // Current item's index in the original arrays
            int currentItem = i - 1;
            
            // If current item's weight exceeds current capacity, we can't include it
            if (weights[currentItem] > w) {
                dp[i][w] = dp[i - 1][w];  // Skip the current item
            } else {
                // Choose the maximum of two cases:
                // 1. Include the current item
                // 2. Exclude the current item
                dp[i][w] = Math.max(
                    values[currentItem] + dp[i - 1][w - weights[currentItem]],
                    dp[i - 1][w]
                );
            }
        }
    }
    
    return dp[n][capacity];
}

// Example: Edit Distance Problem
// Given two strings str1 and str2, find the minimum number of operations
// (insert, delete, replace) required to convert str1 to str2.

// State: dp[i][j] = minimum edit distance between str1[0...i-1] and str2[0...j-1]
// Transition:
//   If str1[i-1] == str2[j-1]: dp[i][j] = dp[i-1][j-1]
//   Else: dp[i][j] = 1 + min(dp[i-1][j],     // Delete
//                            dp[i][j-1],     // Insert
//                            dp[i-1][j-1])   // Replace

public int editDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    // Create a 2D array to store the minimum edit distance for each state
    int[][] dp = new int[m + 1][n + 1];
    
    // Initialize the base cases
    // dp[i][0] = i (cost to convert a string of length i to empty string)
    for (int i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    
    // dp[0][j] = j (cost to convert empty string to a string of length j)
    for (int j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    // Fill the dp table in bottom-up manner
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            // If the characters are the same, no operation needed
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Take the minimum of the three operations
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // Delete
                    Math.min(
                        dp[i][j - 1],  // Insert
                        dp[i - 1][j - 1] // Replace
                    )
                );
            }
        }
    }
    
    return dp[m][n];
}`,
          explanation: "These examples illustrate how to design the state representation and transition equations for Dynamic Programming problems. The Knapsack problem uses a 2D array where dp[i][w] represents the maximum value using the first i items with weight capacity w. The Edit Distance problem also uses a 2D array where dp[i][j] represents the minimum operations to convert the first i characters of word1 to the first j characters of word2. Each problem's solution clearly formulates the state transitions that build from the base cases to the final result."
        }
      ]
    },
    {
      title: "Time and Space Complexity Analysis",
      content: "Analyzing the time and space complexity of DP solutions is important for understanding their efficiency. The time complexity typically depends on the number of states and the time to compute each state, while the space complexity depends on the storage needed for the DP table or memoization array.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity Analysis:
- Number of states × time to compute each state

Space Complexity Analysis:
- Storage for memoization/DP table
- Can often be optimized for bottom-up solutions

Common Optimizations:
1. Space optimization (using only necessary previous states)
2. State reduction (removing redundant dimensions)
3. Prefix sums for range queries
*/

// Example 1: Fibonacci - Time & Space Analysis
// - Time: O(n) - We compute each Fibonacci number once
// - Space: O(n) - We store all Fibonacci numbers from 0 to n

// Space-optimized version:
// - Time: O(n) - Still need to compute each number
// - Space: O(1) - Only store the last two Fibonacci numbers
public int fibSpaceOptimized(int n) {
    if (n <= 1) return n;
    
    int prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

// Example 2: Knapsack Problem - Time & Space Analysis
// - Time: O(n × W) - We fill a table of size n × W
// - Space: O(n × W) - We store the dp table of size n × W

// Space-optimized version (using only two rows):
// - Time: O(n × W) - Still need to compute each state
// - Space: O(W) - Only store two rows at a time
public int knapsackSpaceOptimized(int[] weights, int[] values, int n, int capacity) {
    // Create arrays for current and previous rows
    int[] prev = new int[capacity + 1];
    int[] curr = new int[capacity + 1];
    
    // Fill the first row (base case)
    for (int w = 0; w <= capacity; w++) {
        if (weights[0] <= w) {
            prev[w] = values[0];
        }
    }
    
    // Fill the dp table in bottom-up manner
    for (int i = 1; i < n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i] <= w) {
                curr[w] = Math.max(
                    values[i] + prev[w - weights[i]],
                    prev[w]
                );
            } else {
                curr[w] = prev[w];
            }
        }
        
        // Copy current row to previous row for next iteration
        for (int w = 0; w <= capacity; w++) {
            prev[w] = curr[w];
        }
    }
    
    return prev[capacity];
}

// Further optimized version (using only one row):
// - Time: O(n × W) - Same computation
// - Space: O(W) - Only store one row
public int knapsackSpaceOptimizedFurther(int[] weights, int[] values, int n, int capacity) {
    // Create a single array for the dp values
    int[] dp = new int[capacity + 1];
    
    // Fill the dp array (note the reverse direction within each iteration)
    for (int i = 0; i < n; i++) {
        // We need to iterate from right to left to avoid using the updated values
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    
    return dp[capacity];
}

// Example 3: Longest Common Subsequence - Time & Space Analysis
// - Time: O(m × n) - We fill a table of size m × n
// - Space: O(m × n) - We store the dp table of size m × n

// Space-optimized version:
// - Time: O(m × n) - Same computation
// - Space: O(min(m, n)) - Only store two rows
public int lcsSpaceOptimized(String text1, String text2) {
    // Ensure text1 is the shorter string for space optimization
    if (text1.length() > text2.length()) {
        return lcsSpaceOptimized(text2, text1);
    }
    
    int m = text1.length();
    int n = text2.length();
    
    // Create arrays for current and previous rows
    int[] prev = new int[n + 1];
    int[] curr = new int[n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        
        // Copy current row to previous row for next iteration
        for (int j = 0; j <= n; j++) {
            prev[j] = curr[j];
        }
    }
    
    return prev[n];
}`,
          explanation: "This code analyzes the time and space complexity of various Dynamic Programming problems and demonstrates space optimization techniques. For the Fibonacci example, we reduce space complexity from O(n) to O(1) by only storing the two most recent numbers. For the Knapsack problem, we reduce space from O(n×W) to O(W) by using only one or two rows of the DP table. For the Longest Common Subsequence problem, we reduce space from O(m×n) to O(min(m,n)) by ensuring we store only data for the shorter string. These optimizations maintain the original time complexity while significantly reducing space requirements."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "dp-hw1",
      question: "Implement both top-down (memoization) and bottom-up (tabulation) approaches to solve the Maximum Subarray problem: Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      solution: "For top-down: Define a recursive function maxSubArrayHelper(nums, i) that returns the maximum subarray sum ending at index i. Use memoization to avoid redundant calculations. For bottom-up: Use a 1D array dp where dp[i] represents the maximum subarray sum ending at index i, with the recurrence relation dp[i] = max(nums[i], dp[i-1] + nums[i])."
    },
    {
      id: "dp-hw2",
      question: "Solve the House Robber problem using dynamic programming: A professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
      solution: "Since houses are in a circle, we need to handle two cases: either rob the first house and not the last, or rob the last house and not the first. For each case, use a 1D DP array where dp[i] represents the maximum amount that can be robbed up to house i. The recurrence relation is dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Return the maximum of the two cases."
    },
    {
      id: "dp-hw3",
      question: "Implement a dynamic programming solution to the 'Minimum Path Sum' problem: Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.",
      solution: "Create a 2D DP array of the same size as the grid, where dp[i][j] represents the minimum path sum to reach position (i,j). The recurrence relation is dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize the first row and column appropriately, and fill the dp array. The result is dp[m-1][n-1]. Consider space optimization by using only one row or column of storage."
    }
  ],
  
  quiz: [
    {
      id: "dp-q1",
      question: "What are the two key properties that a problem should have to be suitable for dynamic programming?",
      options: [
        "Greedy choice property and optimal substructure",
        "Overlapping subproblems and optimal substructure",
        "Overlapping subproblems and greedy choice property",
        "Recursion and memoization"
      ],
      correctAnswer: 1,
      explanation: "A problem is suitable for dynamic programming if it has overlapping subproblems (same subproblems are solved multiple times) and optimal substructure (the optimal solution to the problem contains optimal solutions to its subproblems)."
    },
    {
      id: "dp-q2",
      question: "What is the main difference between the top-down and bottom-up approaches in dynamic programming?",
      options: [
        "Top-down uses iteration while bottom-up uses recursion",
        "Top-down has better space complexity than bottom-up",
        "Top-down starts with the original problem and recursively breaks it down, while bottom-up starts with the simplest subproblems and builds up",
        "Top-down always leads to a more efficient solution than bottom-up"
      ],
      correctAnswer: 2,
      explanation: "The top-down approach (memoization) starts with the original problem and recursively breaks it down, using a cache to store results. The bottom-up approach (tabulation) starts by solving the simplest subproblems first and iteratively builds up to solve larger subproblems."
    },
    {
      id: "dp-q3",
      question: "What is the time complexity of the dynamic programming solution to the Fibonacci sequence?",
      options: [
        "O(2^n)",
        "O(n^2)",
        "O(n)",
        "O(log n)"
      ],
      correctAnswer: 2,
      explanation: "The dynamic programming solution to the Fibonacci sequence has a time complexity of O(n) because each Fibonacci number is calculated exactly once and stored in a table, avoiding redundant calculations."
    },
    {
      id: "dp-q4",
      question: "Which of the following problems is NOT typically solved using dynamic programming?",
      options: [
        "Longest Common Subsequence",
        "Minimum Spanning Tree",
        "Knapsack Problem",
        "Edit Distance"
      ],
      correctAnswer: 1,
      explanation: "Minimum Spanning Tree is typically solved using greedy algorithms like Prim's or Kruskal's algorithm, not dynamic programming. The other problems (Longest Common Subsequence, Knapsack, Edit Distance) are classic dynamic programming problems."
    },
    {
      id: "dp-q5",
      question: "In the context of the Knapsack problem, what does the state dp[i][w] represent?",
      options: [
        "The weight of the first i items",
        "The value of the first i items",
        "The maximum value that can be obtained using the first i items with a weight limit of w",
        "The minimum weight needed to achieve a value of at least i with at most w items"
      ],
      correctAnswer: 2,
      explanation: "In the Knapsack problem, the state dp[i][w] represents the maximum value that can be obtained using the first i items with a weight limit of w. This state definition enables us to build the solution incrementally."
    }
  ],
  
  practice: {
    introduction: "These practice problems will help reinforce your understanding of Dynamic Programming fundamentals. Start with the easier problems to build confidence, then move on to the more challenging ones. Pay special attention to identifying overlapping subproblems and optimal substructure in each problem, and consider implementing both top-down and bottom-up approaches for deeper understanding.",
    questions: {
      easy: [
        {
          id: "dp-easy-1",
          title: "Climbing Stairs",
          link: "https://leetcode.com/problems/climbing-stairs/",
          description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?"
        },
        {
          id: "dp-easy-2",
          title: "Min Cost Climbing Stairs",
          link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
          description: "You are given an integer array cost where cost[i] is the cost of ith step. Once you pay the cost, you can either climb one or two steps. Find the minimum cost to reach the top of the floor."
        },
        {
          id: "dp-easy-3",
          title: "Divisor Game",
          link: "https://leetcode.com/problems/divisor-game/",
          description: "Alice and Bob take turns playing a game, with Alice starting first. They choose a number between 1 and n-1 that divides n, then subtract it from n. Whoever cannot make a move loses. Determine if Alice wins if both play optimally."
        },
        {
          id: "dp-easy-4",
          title: "Counting Bits",
          link: "https://leetcode.com/problems/counting-bits/",
          description: "Given an integer n, return an array where ans[i] is the number of 1's in the binary representation of i. This can be solved elegantly using DP."
        }
      ],
      medium: [
        {
          id: "dp-medium-1",
          title: "House Robber",
          link: "https://leetcode.com/problems/house-robber/",
          description: "A professional robber plans to rob houses along a street. Adjacent houses have a security system that will alert the police if both are robbed. Find the maximum amount of money the robber can rob without alerting the police."
        },
        {
          id: "dp-medium-2",
          title: "Coin Change",
          link: "https://leetcode.com/problems/coin-change/",
          description: "You are given coins of different denominations and a total amount of money. Find the fewest number of coins needed to make up that amount."
        },
        {
          id: "dp-medium-3",
          title: "Maximum Product Subarray",
          link: "https://leetcode.com/problems/maximum-product-subarray/",
          description: "Given an integer array nums, find a contiguous non-empty subarray whose product is the largest, and return the product."
        },
        {
          id: "dp-medium-4",
          title: "Decode Ways",
          link: "https://leetcode.com/problems/decode-ways/",
          description: "A message containing digits can be decoded in multiple ways. Given a string s containing only digits, return the number of ways to decode it."
        }
      ],
      hard: [
        {
          id: "dp-hard-1",
          title: "Regular Expression Matching",
          link: "https://leetcode.com/problems/regular-expression-matching/",
          description: "Implement regular expression matching with support for '.' and '*', where '.' matches any single character and '*' matches zero or more of the preceding element."
        },
        {
          id: "dp-hard-2",
          title: "Wildcard Matching",
          link: "https://leetcode.com/problems/wildcard-matching/",
          description: "Implement wildcard pattern matching with support for '?' and '*', where '?' matches any single character and '*' matches any sequence of characters (including the empty sequence)."
        },
        {
          id: "dp-hard-3",
          title: "Burst Balloons",
          link: "https://leetcode.com/problems/burst-balloons/",
          description: "You are given n balloons, each with a number painted on it. You can burst them one by one to collect coins. Find the maximum coins you can collect."
        }
      ]
    }
  }
};

export default dpIntroductionContent; 