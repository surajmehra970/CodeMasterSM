import { Content } from '@/types/course';

const knapsackContent: Content = {
  introduction: "The Knapsack Problem is a fundamental dynamic programming challenge where we need to select items with different weights and values to maximize the total value while staying within a weight constraint. This problem has many real-world applications, from resource allocation to financial investment decisions. Today, we'll explore different types of knapsack problems and develop efficient solutions using dynamic programming techniques.",
  
  learningObjectives: [
    "Understand the core 0/1 Knapsack problem and its recursive solution",
    "Develop dynamic programming solutions using both top-down and bottom-up approaches",
    "Analyze space and time complexity of different knapsack problem implementations",
    "Extend the knapsack concept to variations like unbounded knapsack and fractional knapsack",
    "Apply knapsack solutions to real-world optimization problems"
  ],
  
  sections: [
    {
      title: "Understanding the Knapsack Problem",
      content: "The Knapsack Problem is a classic optimization problem: given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. The problem name derives from the problem of filling a knapsack, where you need to choose which items to take on a hike to maximize value without exceeding the weight capacity you can carry.",
      codeExamples: [
        {
          language: "java",
          code: `// Problem Statement:
// Given weights and values of n items, put these items in a knapsack of capacity W
// to get the maximum total value in the knapsack.

class KnapsackProblem {
    
    // Example input:
    // Values: [60, 100, 120]
    // Weights: [10, 20, 30]
    // Knapsack Capacity: 50
    
    // Expected output: 220 (by taking items with values 100 and 120)
    
    public static void main(String[] args) {
        int[] values = {60, 100, 120};
        int[] weights = {10, 20, 30};
        int capacity = 50;
        
        System.out.println("Maximum value: " + knapsackNaive(weights, values, capacity, values.length));
    }
    
    // Naive recursive solution
    static int knapsackNaive(int[] weights, int[] values, int capacity, int n) {
        // Base case: If no items left or no capacity left
        if (n == 0 || capacity == 0) {
            return 0;
        }
        
        // If weight of the nth item is more than the capacity,
        // then this item cannot be included
        if (weights[n-1] > capacity) {
            return knapsackNaive(weights, values, capacity, n-1);
        }
        
        // Return the maximum of two cases:
        // 1) nth item included
        // 2) nth item not included
        int includeItem = values[n-1] + knapsackNaive(weights, values, capacity - weights[n-1], n-1);
        int excludeItem = knapsackNaive(weights, values, capacity, n-1);
        
        return Math.max(includeItem, excludeItem);
    }
}`,
          explanation: "This example illustrates the classic 0/1 Knapsack problem and a naive recursive solution. For each item, we have two choices: include it or exclude it. The recursive function explores both options and returns the maximum value possible. However, this approach suffers from exponential time complexity due to overlapping subproblems."
        }
      ]
    },
    {
      title: "Dynamic Programming Approach: Top-down (Memoization)",
      content: "The naive recursive solution recomputes the same subproblems multiple times, leading to exponential time complexity. We can optimize this using memoization, where we store the results of subproblems in a table to avoid recomputation. This top-down approach starts from the original problem and breaks it down into smaller subproblems, caching results along the way.",
      codeExamples: [
        {
          language: "java",
          code: `// Top-down DP approach using memoization
static int knapsackMemoization(int[] weights, int[] values, int capacity, int n) {
    // Initialize memoization table with -1
    int[][] memo = new int[n+1][capacity+1];
    for (int i = 0; i <= n; i++) {
        Arrays.fill(memo[i], -1);
    }
    
    return knapsackMemoHelper(weights, values, capacity, n, memo);
}

static int knapsackMemoHelper(int[] weights, int[] values, int capacity, int n, int[][] memo) {
    // If already calculated, return the cached result
    if (memo[n][capacity] != -1) {
        return memo[n][capacity];
    }
    
    // Base case
    if (n == 0 || capacity == 0) {
        return 0;
    }
    
    // If weight of the nth item is more than capacity,
    // then this item cannot be included
    if (weights[n-1] > capacity) {
        memo[n][capacity] = knapsackMemoHelper(weights, values, capacity, n-1, memo);
        return memo[n][capacity];
    }
    
    // Return the maximum of two cases:
    // 1) nth item included
    // 2) nth item not included
    int includeItem = values[n-1] + knapsackMemoHelper(weights, values, capacity - weights[n-1], n-1, memo);
    int excludeItem = knapsackMemoHelper(weights, values, capacity, n-1, memo);
    
    // Store the result in memoization table
    memo[n][capacity] = Math.max(includeItem, excludeItem);
    
    return memo[n][capacity];
}

// Usage example
public static void main(String[] args) {
    int[] values = {60, 100, 120};
    int[] weights = {10, 20, 30};
    int capacity = 50;
    
    System.out.println("Maximum value (memoization): " + 
                      knapsackMemoization(weights, values, capacity, values.length));
}`,
          explanation: "This memoization approach improves the time complexity from O(2^n) to O(n*capacity) by storing results of subproblems. When we encounter the same state (defined by n and capacity), we retrieve the cached result instead of recomputing it. The space complexity is O(n*capacity) for the memoization table."
        }
      ]
    },
    {
      title: "Dynamic Programming Approach: Bottom-up (Tabulation)",
      content: "The bottom-up approach builds a table from the simplest subproblems (base cases) up to the original problem. This eliminates the recursive stack overhead and can be more efficient. We fill a 2D table where dp[i][j] represents the maximum value that can be obtained with first i items and capacity j.",
      codeExamples: [
        {
          language: "java",
          code: `// Bottom-up DP approach using tabulation
static int knapsackTabulation(int[] weights, int[] values, int capacity, int n) {
    // Create a 2D DP table
    int[][] dp = new int[n+1][capacity+1];
    
    // Fill the table bottom-up
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            // Base case: no items or no capacity
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            }
            // If current item's weight fits
            else if (weights[i-1] <= w) {
                // Choose maximum of including or excluding current item
                dp[i][w] = Math.max(
                    values[i-1] + dp[i-1][w-weights[i-1]], // Include item
                    dp[i-1][w]                            // Exclude item
                );
            }
            // If current item's weight doesn't fit
            else {
                dp[i][w] = dp[i-1][w]; // Exclude item
            }
        }
    }
    
    // The result is in the bottom-right cell
    return dp[n][capacity];
}

// Space-optimized version that uses only 1D array
static int knapsackTabulationOptimized(int[] weights, int[] values, int capacity, int n) {
    // Create a 1D DP array
    int[] dp = new int[capacity + 1];
    
    // Fill the array
    for (int i = 0; i < n; i++) {
        // Process in reverse to avoid using results from current iteration
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    
    return dp[capacity];
}

// Usage example
public static void main(String[] args) {
    int[] values = {60, 100, 120};
    int[] weights = {10, 20, 30};
    int capacity = 50;
    
    System.out.println("Maximum value (tabulation): " + 
                      knapsackTabulation(weights, values, capacity, values.length));
    
    System.out.println("Maximum value (optimized tabulation): " + 
                      knapsackTabulationOptimized(weights, values, capacity, values.length));
}`,
          explanation: "The tabulation approach avoids recursion and systematically builds the solution from the bottom up. The time complexity is O(n*capacity), and the space complexity is also O(n*capacity) for the 2D table. However, with the space-optimized version, we can reduce the space complexity to O(capacity) by using just a 1D array and processing items in the right order."
        }
      ]
    },
    {
      title: "Knapsack Variations",
      content: "The 0/1 Knapsack is just one variant of the problem. There are several other important variations that have different constraints and applications.",
      codeExamples: [
        {
          language: "java",
          code: `// Unbounded Knapsack (items can be used multiple times)
static int unboundedKnapsack(int[] weights, int[] values, int capacity, int n) {
    // Create a 1D DP array
    int[] dp = new int[capacity + 1];
    
    // Fill the array
    for (int w = 0; w <= capacity; w++) {
        for (int i = 0; i < n; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

// Fractional Knapsack (items can be broken into fractions)
static double fractionalKnapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    
    // Create an array of Item objects
    class Item {
        int weight, value;
        double ratio;
        
        public Item(int weight, int value) {
            this.weight = weight;
            this.value = value;
            this.ratio = (double) value / weight;
        }
    }
    
    Item[] items = new Item[n];
    for (int i = 0; i < n; i++) {
        items[i] = new Item(weights[i], values[i]);
    }
    
    // Sort items by value-to-weight ratio in descending order
    Arrays.sort(items, (a, b) -> Double.compare(b.ratio, a.ratio));
    
    double totalValue = 0;
    int currentWeight = 0;
    
    for (Item item : items) {
        // If adding the whole item doesn't exceed capacity
        if (currentWeight + item.weight <= capacity) {
            currentWeight += item.weight;
            totalValue += item.value;
        } else {
            // Add fractional part of the item
            int remainingCapacity = capacity - currentWeight;
            totalValue += item.value * ((double) remainingCapacity / item.weight);
            break;
        }
    }
    
    return totalValue;
}

// Multiple Knapsack (limited number of each item)
static int multipleKnapsack(int[] weights, int[] values, int[] counts, int capacity, int n) {
    // Convert to 0/1 Knapsack by duplicating items
    List<Integer> expandedWeights = new ArrayList<>();
    List<Integer> expandedValues = new ArrayList<>();
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < counts[i]; j++) {
            expandedWeights.add(weights[i]);
            expandedValues.add(values[i]);
        }
    }
    
    // Now solve as regular 0/1 Knapsack
    int[] wArr = expandedWeights.stream().mapToInt(Integer::intValue).toArray();
    int[] vArr = expandedValues.stream().mapToInt(Integer::intValue).toArray();
    
    return knapsackTabulation(wArr, vArr, capacity, wArr.length);
}

// Usage examples
public static void main(String[] args) {
    int[] values = {60, 100, 120};
    int[] weights = {10, 20, 30};
    int capacity = 50;
    
    System.out.println("Unbounded Knapsack: " + 
                      unboundedKnapsack(weights, values, capacity, values.length));
    
    System.out.println("Fractional Knapsack: " + 
                      fractionalKnapsack(weights, values, capacity));
    
    int[] counts = {2, 3, 1}; // Max count of each item
    System.out.println("Multiple Knapsack: " + 
                      multipleKnapsack(weights, values, counts, capacity, values.length));
}`,
          explanation: "These variations extend the basic Knapsack problem to different constraints. Unbounded Knapsack allows unlimited use of each item, making it more suitable for problems with renewable resources. Fractional Knapsack is solved greedily by taking items with the highest value-to-weight ratio first, making it applicable to divisible resources like liquids. Multiple Knapsack constrains the number of each item that can be used, simulating limited inventory."
        }
      ]
    },
    {
      title: "Real-world Applications",
      content: "The Knapsack Problem has numerous practical applications across various domains, demonstrating the versatility and importance of this classic algorithm.",
      codeExamples: [
        {
          language: "java",
          code: `// Budget Allocation Problem
// Allocate budget to different marketing channels to maximize ROI
static double budgetAllocation(double[] returns, double[] costs, double budget) {
    // Convert to integer knapsack by scaling
    int scale = 10000;
    int[] scaledReturns = new int[returns.length];
    int[] scaledCosts = new int[costs.length];
    
    for (int i = 0; i < returns.length; i++) {
        scaledReturns[i] = (int)(returns[i] * scale);
        scaledCosts[i] = (int)(costs[i] * scale);
    }
    
    int scaledBudget = (int)(budget * scale);
    
    // Solve as unbounded knapsack
    double result = unboundedKnapsack(scaledCosts, scaledReturns, scaledBudget, returns.length);
    return result / scale;
}

// Investment Portfolio Optimization
// Select investments to maximize returns with limited capital
static class Investment {
    String name;
    double expectedReturn;
    double requiredCapital;
    
    public Investment(String name, double expectedReturn, double requiredCapital) {
        this.name = name;
        this.expectedReturn = expectedReturn;
        this.requiredCapital = requiredCapital;
    }
}

static List<Investment> optimizePortfolio(Investment[] investments, double availableCapital) {
    int n = investments.length;
    int scale = 10000;
    
    int[] values = new int[n];
    int[] weights = new int[n];
    
    for (int i = 0; i < n; i++) {
        values[i] = (int)(investments[i].expectedReturn * scale);
        weights[i] = (int)(investments[i].requiredCapital * scale);
    }
    
    int capacity = (int)(availableCapital * scale);
    
    // Create table for keeping track of selected items
    boolean[][] selected = new boolean[n+1][capacity+1];
    int[][] dp = new int[n+1][capacity+1];
    
    // Fill the DP table
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i-1] <= w) {
                if (values[i-1] + dp[i-1][w-weights[i-1]] > dp[i-1][w]) {
                    dp[i][w] = values[i-1] + dp[i-1][w-weights[i-1]];
                    selected[i][w] = true; // Mark this item as selected
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    // Trace back to find selected investments
    List<Investment> selectedInvestments = new ArrayList<>();
    int w = capacity;
    for (int i = n; i > 0; i--) {
        if (selected[i][w]) {
            selectedInvestments.add(investments[i-1]);
            w -= weights[i-1];
        }
    }
    
    return selectedInvestments;
}

// CPU Scheduling with Memory Constraints
static int maxTasksProcessed(int[] executionTimes, int[] memoryRequirements, int totalTime, int totalMemory) {
    int n = executionTimes.length;
    
    // Create a 3D DP table for 2-constraint knapsack
    int[][][] dp = new int[n+1][totalTime+1][totalMemory+1];
    
    for (int i = 1; i <= n; i++) {
        for (int t = 0; t <= totalTime; t++) {
            for (int m = 0; m <= totalMemory; m++) {
                // Skip this task
                dp[i][t][m] = dp[i-1][t][m];
                
                // Take this task if it fits
                if (t >= executionTimes[i-1] && m >= memoryRequirements[i-1]) {
                    dp[i][t][m] = Math.max(
                        dp[i][t][m],
                        1 + dp[i-1][t-executionTimes[i-1]][m-memoryRequirements[i-1]]
                    );
                }
            }
        }
    }
    
    return dp[n][totalTime][totalMemory];
}`,
          explanation: "These examples demonstrate how Knapsack algorithms can be applied to real-world problems. The budget allocation problem shows how to maximize ROI across different marketing channels with a fixed budget. Portfolio optimization helps select the best investments with limited capital. The CPU scheduling example extends the Knapsack concept to multiple constraints (time and memory), showcasing the algorithm's flexibility in handling complex resource allocation problems."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "knapsack-hw1",
      question: "Implement a function to solve the problem of finding the minimum number of coins needed to make a given amount, where you have unlimited supply of each coin denomination.",
      solution: "This is an unbounded knapsack variation with a different objective. Use DP with a table where dp[i] represents the minimum number of coins needed for amount i. Initialize all values to infinity, set dp[0]=0, and for each amount and each coin, update dp[amount] = min(dp[amount], 1 + dp[amount - coin])."
    },
    {
      id: "knapsack-hw2",
      question: "Given n items with weights and values, and k knapsacks with different capacities, distribute the items among knapsacks to maximize the total value. Each item can be placed in at most one knapsack.",
      solution: "Use a multi-dimensional DP approach where dp[i][c1][c2]...[ck] represents the maximum value with first i items and capacities c1, c2, ..., ck for each knapsack. For each item, try placing it in each knapsack, and take the maximum value."
    },
    {
      id: "knapsack-hw3",
      question: "Implement a solution for the subset sum problem: Given a set of non-negative integers and a target sum, determine if there is a subset that sums exactly to the target.",
      solution: "This is a special case of the 0/1 Knapsack where all values are equal to their weights. Use DP with a boolean table where dp[i][j] indicates whether a subset of the first i elements can sum to j. Initialize dp[0][0] = true, and for each element and sum, set dp[i][j] = dp[i-1][j] || dp[i-1][j-arr[i-1]] if j >= arr[i-1]."
    },
    {
      id: "knapsack-hw4",
      question: "Implement a solution to the problem of partitioning a set into two subsets such that the difference between the sum of the two subsets is minimized.",
      solution: "Calculate the total sum of the array. Then use the subset sum approach to find all possible sums that can be achieved with a subset. Finally, find the sum closest to totalSum/2, and calculate the minimum difference as |totalSum - 2*closestSum|."
    }
  ],
  
  quiz: [
    {
      id: "knapsack-q1",
      question: "What is the time complexity of the standard 0/1 Knapsack dynamic programming solution?",
      options: ["O(n)", "O(W)", "O(n*W)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "The standard dynamic programming solution for 0/1 Knapsack has time complexity O(n*W), where n is the number of items and W is the capacity of the knapsack. This comes from filling a 2D DP table of size (n+1)×(W+1)."
    },
    {
      id: "knapsack-q2",
      question: "Which knapsack variation allows items to be broken into fractions?",
      options: ["0/1 Knapsack", "Unbounded Knapsack", "Fractional Knapsack", "Multiple Knapsack"],
      correctAnswer: 2,
      explanation: "Fractional Knapsack allows items to be broken into fractions, meaning you can take a portion of an item. This version can be solved greedily by selecting items with the highest value-to-weight ratio."
    },
    {
      id: "knapsack-q3",
      question: "In the context of the 0/1 Knapsack problem, what does the state dp[i][j] typically represent in a DP solution?",
      options: [
        "The weight of the first i items with total value j",
        "The maximum value achievable with the first i items and capacity j",
        "Whether it's possible to achieve sum j with the first i items",
        "The number of ways to achieve capacity j with the first i items"
      ],
      correctAnswer: 1,
      explanation: "In the standard 0/1 Knapsack DP solution, dp[i][j] represents the maximum value that can be obtained with the first i items and a knapsack capacity of j. This state definition allows us to build the solution incrementally."
    },
    {
      id: "knapsack-q4",
      question: "Which of the following problems is NOT typically solved using Knapsack algorithms?",
      options: [
        "Finding the minimum number of coins to make change",
        "Determining if a set can be partitioned into two equal-sum subsets",
        "Finding the shortest path in a weighted graph",
        "Selecting projects to maximize profit with limited budget"
      ],
      correctAnswer: 2,
      explanation: "Finding the shortest path in a weighted graph is typically solved using algorithms like Dijkstra's or Bellman-Ford, not Knapsack. The other options are variations of Knapsack problems dealing with resource allocation and subset selection."
    },
    {
      id: "knapsack-q5",
      question: "What technique can be used to reduce the space complexity of the 0/1 Knapsack solution from O(n*W) to O(W)?",
      options: [
        "Using recursion instead of iteration",
        "Using a 1D array and processing in reverse order",
        "Using a greedy approach instead of dynamic programming",
        "It's not possible to reduce the space complexity"
      ],
      correctAnswer: 1,
      explanation: "We can optimize the space complexity by using a 1D array instead of a 2D array. To avoid overwriting values that are still needed, we process the capacity in reverse order (from capacity down to the weight of the current item). This approach reduces space complexity to O(W) while maintaining correctness."
    }
  ]
};

export default knapsackContent; 