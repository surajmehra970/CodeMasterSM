import { Content } from '@/types/course';

const mockTestWeek6Content: Content = {
  introduction: "Welcome to the Week 6 Mock Test! This test is designed to evaluate your understanding of Dynamic Programming concepts covered in the last week, including DP introduction, the Knapsack problem, Longest Common Subsequence, and DP on Trees. The problems in this mock test will challenge your ability to apply DP techniques to solve various algorithmic problems. Remember to analyze each problem carefully, identify optimal substructure and overlapping subproblems, and design efficient solutions using the DP principles we've discussed.",
  
  learningObjectives: [
    "Apply dynamic programming techniques to solve complex algorithmic problems",
    "Recognize problem patterns suitable for dynamic programming approaches",
    "Implement efficient DP solutions using both top-down and bottom-up methods",
    "Optimize space complexity in DP solutions",
    "Tackle real-world problems using appropriate DP patterns"
  ],
  
  sections: [
    {
      title: "Instructions for the Mock Test",
      content: "This mock test consists of 5 coding problems and 5 theoretical questions covering various aspects of dynamic programming. You have 2 hours to complete the test. The problems increase in difficulty, so manage your time wisely. For each coding problem, try to identify the appropriate DP approach, define your state representation clearly, establish the recurrence relation, and implement an efficient solution. Pay attention to the base cases, and consider optimizing the space complexity where possible.",
      codeExamples: []
    },
    {
      title: "Coding Problems",
      content: "Solve the following coding problems using dynamic programming techniques. Focus on correctness and efficiency in your solutions.",
      codeExamples: [
        {
          language: "java",
          code: `// Problem 1: Coin Change
// Given an array of coin denominations and a target amount, find the minimum number 
// of coins needed to make up that amount. If the amount cannot be made, return -1.
//
// Example:
// coins = [1, 2, 5], amount = 11
// Output: 3 (5 + 5 + 1)

public int coinChange(int[] coins, int amount) {
    // Initialize DP array with amount+1 (which is greater than any valid answer)
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    
    // Base case: 0 coins needed to make amount 0
    dp[0] = 0;
    
    // Fill the DP array bottom-up
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    // If dp[amount] is still amount+1, it means no solution exists
    return dp[amount] > amount ? -1 : dp[amount];
}

// Problem 2: Target Sum
// Given an array of integers and a target sum, find the number of ways to assign + and - signs
// to the elements such that the sum of the signed elements equals the target.
//
// Example:
// nums = [1, 1, 1, 1, 1], target = 3
// Output: 5 (the ways are: +1+1+1+1-1, +1+1+1-1+1, +1+1-1+1+1, +1-1+1+1+1, -1+1+1+1+1)

public int findTargetSumWays(int[] nums, int target) {
    // Calculate sum of array
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    
    // Edge cases
    if (sum < Math.abs(target) || (sum + target) % 2 != 0) {
        return 0;
    }
    
    // The problem can be reduced to finding a subset with sum = (target + sum) / 2
    int newTarget = (target + sum) / 2;
    
    // Use DP to solve subset sum problem
    int[] dp = new int[newTarget + 1];
    dp[0] = 1; // There's 1 way to make sum 0 (take no elements)
    
    for (int num : nums) {
        for (int i = newTarget; i >= num; i--) {
            dp[i] += dp[i - num];
        }
    }
    
    return dp[newTarget];
}

// Problem 3: Longest Increasing Subsequence
// Find the length of the longest strictly increasing subsequence in an array of integers.
//
// Example:
// nums = [10, 9, 2, 5, 3, 7, 101, 18]
// Output: 4 (the longest increasing subsequence is [2, 3, 7, 101])

public int lengthOfLIS(int[] nums) {
    if (nums.length == 0) {
        return 0;
    }
    
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1); // Each element by itself is an increasing subsequence of length 1
    
    int maxLength = 1;
    
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// Problem 4: Edit Distance
// Given two strings word1 and word2, return the minimum number of operations required
// to convert word1 to word2. You can perform the following operations:
// 1. Insert a character
// 2. Delete a character
// 3. Replace a character
//
// Example:
// word1 = "horse", word2 = "ros"
// Output: 3
// Explanation: 
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')

public int minDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    // DP table: dp[i][j] represents the minimum edit distance between
    // word1[0...i-1] and word2[0...j-1]
    int[][] dp = new int[m + 1][n + 1];
    
    // Base cases
    for (int i = 0; i <= m; i++) {
        dp[i][0] = i; // If word2 is empty, we need to delete all characters from word1
    }
    
    for (int j = 0; j <= n; j++) {
        dp[0][j] = j; // If word1 is empty, we need to insert all characters from word2
    }
    
    // Fill the DP table
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                // Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Take the minimum of three operations
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j - 1],  // Replace
                    Math.min(
                        dp[i - 1][j],  // Delete
                        dp[i][j - 1]   // Insert
                    )
                );
            }
        }
    }
    
    return dp[m][n];
}

// Problem 5: House Robber III
// A thief is planning to rob houses arranged in a binary tree. The thief cannot rob
// two directly-linked houses. Return the maximum amount the thief can rob.
//
// Example:
//     3
//    / \\
//   2   3
//    \\   \\
//     3   1
// Output: 7 (3 + 3 + 1 = 7)

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     public TreeNode(int x) { val = x; }
 * }
 */
public int rob(TreeNode root) {
    // Use a map to memoize results for each node
    Map<TreeNode, Integer> memo = new HashMap<>();
    return robHelper(root, memo);
}

private int robHelper(TreeNode node, Map<TreeNode, Integer> memo) {
    if (node == null) {
        return 0;
    }
    
    // If we've already computed the result for this node, return it
    if (memo.containsKey(node)) {
        return memo.get(node);
    }
    
    // Option 1: Rob this node
    int robCurrent = node.val;
    
    // If we rob this node, we can't rob its children
    if (node.left != null) {
        robCurrent += robHelper(node.left.left, memo) + robHelper(node.left.right, memo);
    }
    
    if (node.right != null) {
        robCurrent += robHelper(node.right.left, memo) + robHelper(node.right.right, memo);
    }
    
    // Option 2: Don't rob this node, rob its children instead
    int skipCurrent = robHelper(node.left, memo) + robHelper(node.right, memo);
    
    // Take the maximum of the two options
    int result = Math.max(robCurrent, skipCurrent);
    
    // Memoize the result
    memo.put(node, result);
    
    return result;
}`,
          explanation: "This set of problems covers various dynamic programming patterns. The Coin Change problem is a classic unbounded knapsack variant. Target Sum demonstrates how to transform a problem into a subset sum problem. Longest Increasing Subsequence requires determining optimal subproblems and building the solution iteratively. Edit Distance is a string-matching DP problem with multiple operations. House Robber III applies DP on a tree structure with a custom state definition."
        }
      ]
    },
    {
      title: "Theoretical Questions",
      content: "Answer the following theoretical questions about dynamic programming concepts and techniques.",
      codeExamples: [
        {
          language: "text",
          code: `1. When is dynamic programming an appropriate approach to solving a problem? Identify the two key properties that a problem must have for dynamic programming to be applicable, and explain why they are important.

Dynamic programming is appropriate when a problem has:

1. Optimal Substructure: The optimal solution to the problem can be constructed from optimal solutions to its subproblems.
   - Importance: This property allows us to break down the problem into smaller subproblems and solve them independently.
   - Without this property, solving subproblems wouldn't guarantee the optimal solution for the original problem.

2. Overlapping Subproblems: The same subproblems are solved multiple times when using a recursive approach.
   - Importance: This property makes memoization or tabulation useful, as we can store and reuse solutions to subproblems.
   - Without overlapping subproblems, dynamic programming would offer no advantage over a simple recursive approach.

These properties together allow us to solve complex problems efficiently by breaking them down and avoiding redundant calculations.

2. Compare and contrast the top-down (memoization) and bottom-up (tabulation) approaches to dynamic programming. Discuss their advantages, disadvantages, and when you would prefer one over the other.

Top-down (Memoization):
- Approach: Starts with the original problem and recursively breaks it down, storing results in a table.
- Advantages:
  * More intuitive to implement (follows the natural recursive structure)
  * Automatically handles the dependency relationship between states
  * Only computes states that are actually needed
- Disadvantages:
  * Recursive calls may cause stack overflow for large inputs
  * Has slight overhead due to recursive function calls
  * May have issues with cache locality

Bottom-up (Tabulation):
- Approach: Starts from the simplest subproblems and iteratively builds up to the original problem.
- Advantages:
  * No recursion, so no stack overflow risk
  * Generally more efficient (no function call overhead)
  * Better cache locality
  * Often easier to optimize space complexity
- Disadvantages:
  * Sometimes less intuitive to implement
  * Requires careful ordering of subproblem computation
  * May compute unnecessary states that aren't needed for the final result

Preference:
- Use top-down when:
  * The recursive relation is more natural and complex
  * Not all states need to be evaluated
  * The problem has many parameters/dimensions
  * Quick implementation is more important than absolute efficiency

- Use bottom-up when:
  * Efficiency is critical
  * The problem has potential for stack overflow
  * Space optimization is important
  * The ordering of subproblems is clear and simple

3. Explain the concept of "state" in dynamic programming. How do you identify the appropriate state variables for a DP problem, and why is a good state definition critical to developing an efficient solution?

State in dynamic programming:
- A "state" represents a subproblem and contains all the information needed to make optimal decisions at that point.
- The state variables are the parameters that uniquely identify a subproblem.

Identifying appropriate state variables:
1. Identify what needs to be decided at each step
2. Determine what information is needed to make that decision
3. Consider what information needs to be carried forward from previous decisions
4. Keep only the information that affects future decisions

Why a good state definition is critical:
1. Efficiency: Each additional state variable typically multiplies the time and space complexity.
2. Correctness: Insufficient state information can lead to incorrect solutions.
3. Clarity: Clean state definitions lead to cleaner code and recurrence relations.
4. Optimizability: Well-defined states often allow for space optimizations.

Example: In the Knapsack problem, the state (i, w) represents "the maximum value possible using the first i items with a weight limit of w." This captures exactly the information needed at each decision point.

A poor state definition can lead to:
- Exponential instead of polynomial complexity
- Redundant calculations
- Inability to memoize effectively
- Solutions that don't correctly model the problem

4. Explain how space optimization works in dynamic programming. Give an example of a problem where the space complexity can be reduced from O(n²) to O(n) and explain the approach.

Space optimization in dynamic programming works by observing that many DP algorithms only need access to a subset of previously computed states, not the entire DP table.

Example: Longest Common Subsequence (LCS)
- The standard LCS algorithm uses a 2D table dp[i][j] to represent the length of the LCS of the first i characters of string A and first j characters of string B.
- The recurrence relation is:
  * dp[i][j] = dp[i-1][j-1] + 1 if A[i-1] == B[j-1]
  * dp[i][j] = max(dp[i-1][j], dp[i][j-1]) otherwise

Space optimization approach:
1. Observe that each cell dp[i][j] only depends on:
   - The cell directly above it: dp[i-1][j]
   - The cell directly to its left: dp[i][j-1]
   - The cell diagonally above-left: dp[i-1][j-1]

2. Therefore, when computing row i, we only need the values from row i-1.

3. We can use two 1D arrays:
   - current[0...n]: to store the values for the current row
   - previous[0...n]: to store the values for the previous row

4. After computing each row, we copy current to previous before moving to the next row.

Further optimization:
- With careful handling, we can use a single 1D array, updating it in place.
- The trick is to iterate from right to left and keep a temporary variable for the diagonal value.

This reduces space complexity from O(m*n) to O(min(m,n)), where m and n are the lengths of the strings.

5. Discuss the relationship between dynamic programming and greedy algorithms. When would you choose one approach over the other? Provide an example where a greedy approach fails but dynamic programming succeeds.

Relationship between DP and greedy algorithms:
- Both are optimization techniques that build solutions incrementally
- Both make choices at each step to optimize some objective function
- DP considers all possible choices and their future consequences
- Greedy algorithms make locally optimal choices without reconsidering

When to choose each approach:
- Choose greedy when:
  * The problem has optimal substructure AND a greedy choice property
  * The locally optimal choice leads to a globally optimal solution
  * You need maximum efficiency (greedy is typically faster than DP)

- Choose DP when:
  * The problem requires considering all possible choices at each step
  * Past decisions need to be reconsidered based on future outcomes
  * The greedy approach doesn't guarantee an optimal solution

Example where greedy fails but DP succeeds:
Coin Change problem with denominations [1, 3, 4] and target sum 6:
- Greedy approach (take largest possible coin first): 4 + 1 + 1 = 3 coins
- Optimal solution: 3 + 3 = 2 coins

Why greedy fails here:
- The locally optimal choice (taking the largest coin) doesn't lead to a globally optimal solution
- Greedy algorithms don't "look ahead" to see the consequences of current decisions

Why DP succeeds:
- DP considers all possible combinations of coins
- It systematically explores all options and finds the optimal solution by building from smaller denominations
- The DP approach correctly gives 2 coins (3 + 3) as the answer

This demonstrates that greedy approaches don't work when the locally optimal choice doesn't lead to a globally optimal solution.`,
          explanation: "These theoretical questions cover fundamental concepts in dynamic programming, including when to use DP, comparing implementation approaches, understanding state definitions, optimizing space complexity, and comparing DP with other algorithmic techniques. These concepts are essential for mastering dynamic programming across various problem domains."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "dp-mock-hw1",
      question: "Implement a solution for the Palindrome Partitioning problem: given a string s, partition s such that every substring is a palindrome. Return the minimum number of cuts needed.",
      solution: "Use DP with state dp[i] representing the minimum cuts needed for the first i characters. For each i, check all possible palindrome substrings ending at i-1, and update dp[i] = min(dp[i], dp[j] + 1) for all j where s[j...i-1] is a palindrome. You can pre-compute a 2D boolean array isPalindrome[i][j] to efficiently check if a substring is a palindrome."
    },
    {
      id: "dp-mock-hw2",
      question: "Solve the Maximum Profit in Job Scheduling problem: given an array of start times, end times, and profits, find the maximum profit you can get by scheduling non-overlapping jobs.",
      solution: "Sort jobs by end time. Define dp[i] as the maximum profit achievable by considering the first i jobs. For each job i, consider two options: either include the job or exclude it. If including, add its profit to the maximum profit achievable before its start time (which you can find using binary search). The recurrence relation is dp[i] = max(dp[i-1], profit[i] + dp[j]), where j is the latest job that ends before job i starts."
    },
    {
      id: "dp-mock-hw3",
      question: "Implement a solution for the Optimal Binary Search Tree problem: given a sorted array of keys and their frequencies, construct a BST with the minimum expected search cost.",
      solution: "Use 2D DP with state dp[i][j] representing the minimum cost of the optimal BST containing keys from i to j. The recurrence relation is dp[i][j] = min(dp[i][k-1] + dp[k+1][j]) + sum of frequencies from i to j, for all k between i and j. This builds up the solution by considering all possible root nodes for each subarray of keys."
    },
    {
      id: "dp-mock-hw4",
      question: "Solve the Word Break II problem: given a string s and a dictionary of words, find all possible ways to break s into a sequence of dictionary words.",
      solution: "Use DP with memoization to avoid redundant work. Define a function dfs(start) that returns all possible ways to break the substring starting from index 'start'. For each position i from start to the end, check if substring s[start...i] is in the dictionary. If yes, recursively find all ways to break the remaining part s[i+1...end] and combine them. Memoize results to avoid recomputing the same substrings."
    }
  ],
  
  quiz: [
    {
      id: "dp-mock-q1",
      question: "What is the time complexity of the standard dynamic programming solution for the 0/1 Knapsack problem with n items and capacity W?",
      options: ["O(n)", "O(W)", "O(n*W)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "The standard dynamic programming solution for the 0/1 Knapsack problem has a time complexity of O(n*W), where n is the number of items and W is the capacity. This comes from filling a 2D DP table of size (n+1)×(W+1), where each cell takes constant time to compute."
    },
    {
      id: "dp-mock-q2",
      question: "In the context of dynamic programming, what does the term 'memoization' refer to?",
      options: [
        "The process of breaking a problem down into subproblems",
        "Storing the results of expensive function calls to avoid redundant computations",
        "Converting a recursive algorithm to an iterative one",
        "Using memory-efficient data structures in the algorithm"
      ],
      correctAnswer: 1,
      explanation: "Memoization refers to the technique of storing the results of expensive function calls (typically in a hash table or array) to avoid redundant computations when the same inputs occur multiple times. This is a key optimization in the top-down (recursive) approach to dynamic programming."
    },
    {
      id: "dp-mock-q3",
      question: "Which of the following problems CANNOT be efficiently solved using dynamic programming?",
      options: [
        "Finding the longest common subsequence of two strings",
        "Finding the shortest path in a graph with negative weight cycles",
        "Finding the number of ways to make change for a given amount using a set of coins",
        "Finding the maximum sum subarray"
      ],
      correctAnswer: 1,
      explanation: "Finding the shortest path in a graph with negative weight cycles cannot be efficiently solved using dynamic programming because there is no 'shortest' path - you can keep traversing the negative cycle to reduce the path length indefinitely. While DP algorithms like Bellman-Ford can detect negative cycles, they cannot find a shortest path when such cycles exist."
    },
    {
      id: "dp-mock-q4",
      question: "What is the key insight that allows the space complexity of many 1D dynamic programming problems to be optimized from O(n) to O(1)?",
      options: [
        "Using recursion instead of iteration",
        "Recognizing that only the most recent calculated value is needed",
        "Applying a greedy algorithm instead of dynamic programming",
        "Sorting the input data before processing"
      ],
      correctAnswer: 1,
      explanation: "The key insight for optimizing space in many 1D DP problems is recognizing that we often only need the most recently calculated values, not the entire history. For example, in the Fibonacci sequence, we only need the two most recent values to calculate the next one, not all previous values. This allows us to use a constant number of variables instead of an array of size n."
    },
    {
      id: "dp-mock-q5",
      question: "For a problem with two changing parameters, each ranging from 1 to n, what would be the typical space complexity of a dynamic programming solution with space optimization?",
      options: ["O(1)", "O(n)", "O(n²)", "O(2^n)"],
      correctAnswer: 1,
      explanation: "For a problem with two changing parameters, the naive DP solution would use O(n²) space for a 2D table. However, if the recurrence relation only depends on the current row and the previous row (which is common), we can optimize to use just two rows of the table, giving O(n) space complexity. This is a common optimization in problems like the Longest Common Subsequence."
    }
  ],
  
  practice: {
    introduction: "These additional practice problems will help you further develop your dynamic programming skills across the various topics covered in Week 6. Each problem requires applying DP principles in different contexts, from sequence analysis to optimization problems. Work through these exercises methodically, focusing on state representation, recurrence relations, and efficient implementations.",
    questions: {
      easy: [
        {
          id: "mock6-easy-1",
          title: "Maximum Subarray",
          link: "https://leetcode.com/problems/maximum-subarray/",
          description: "Find the contiguous subarray with the largest sum. This is a fundamental DP problem that introduces the concept of local vs. global optima in a sequence."
        },
        {
          id: "mock6-easy-2",
          title: "Range Sum Query - Immutable",
          link: "https://leetcode.com/problems/range-sum-query-immutable/",
          description: "Implement a structure that efficiently handles multiple queries for the sum of elements in a given range. This uses prefix sums, a fundamental technique in DP."
        },
        {
          id: "mock6-easy-3",
          title: "Counting Bits",
          link: "https://leetcode.com/problems/counting-bits/",
          description: "Given an integer n, return an array where ans[i] is the number of 1's in the binary representation of i. This problem can be elegantly solved using DP with bit manipulation."
        }
      ],
      medium: [
        {
          id: "mock6-medium-1",
          title: "Unique Paths",
          link: "https://leetcode.com/problems/unique-paths/",
          description: "Calculate the number of unique paths from the top-left to bottom-right of a grid, moving only right or down. This is a classic grid-based DP problem."
        },
        {
          id: "mock6-medium-2",
          title: "Palindromic Substrings",
          link: "https://leetcode.com/problems/palindromic-substrings/",
          description: "Count how many palindromic substrings are in a string. Apply DP techniques to avoid checking the same substrings multiple times."
        },
        {
          id: "mock6-medium-3",
          title: "Best Time to Buy and Sell Stock with Cooldown",
          link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
          description: "Maximize profit in a stock market with a cooldown constraint. This problem requires careful state representation in your DP approach."
        },
        {
          id: "mock6-medium-4",
          title: "Partition Equal Subset Sum",
          link: "https://leetcode.com/problems/partition-equal-subset-sum/",
          description: "Determine if an array can be partitioned into two subsets with equal sum. This is a variation of the Knapsack problem we studied."
        }
      ],
      hard: [
        {
          id: "mock6-hard-1",
          title: "Word Break II",
          link: "https://leetcode.com/problems/word-break-ii/",
          description: "Given a string and a dictionary, find all possible sentences that can be formed. This combines DP with backtracking for an efficient solution."
        },
        {
          id: "mock6-hard-2",
          title: "Burst Balloons",
          link: "https://leetcode.com/problems/burst-balloons/",
          description: "Given n balloons, each with a number on it, find the maximum coins obtained by bursting them one by one. This problem requires a non-intuitive DP approach."
        },
        {
          id: "mock6-hard-3",
          title: "Best Time to Buy and Sell Stock IV",
          link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
          description: "Maximize profit with at most k transactions. This advanced stock problem combines DP with careful state design to handle the transaction limit."
        }
      ]
    }
  }
};

export default mockTestWeek6Content;