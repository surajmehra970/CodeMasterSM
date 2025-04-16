import { Content } from '@/types/course';

const mockTestWeek8Content: Content = {
  introduction: "This mock test evaluates your understanding of dynamic programming concepts covered in Week 8, including Longest Increasing Subsequence, Edit Distance, DP on Grid problems, and advanced DP techniques. The test consists of coding problems and theoretical questions designed to assess your ability to apply DP principles to solve complex problems, analyze algorithm efficiency, and implement optimized solutions.",
  
  learningObjectives: [
    "Test your ability to implement and optimize solutions for LIS and its variations",
    "Evaluate your understanding of Edit Distance algorithms and applications",
    "Assess your skill in applying DP approaches to grid-based problems",
    "Measure your proficiency with advanced DP techniques including state compression",
    "Practice identifying the appropriate DP approach for diverse problem types"
  ],
  
  sections: [
    {
      title: "Coding Problems",
      content: "These problems will assess your ability to implement efficient dynamic programming solutions to challenging algorithmic tasks. Focus on designing appropriate state variables, defining clear recurrence relations, and optimizing your implementation when possible.",
      codeExamples: [
        {
          language: "java",
          code: `/**
 * Problem 1: Russian Doll Envelopes
 *
 * You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the 
 * width and height of an envelope. One envelope can fit inside another if and only if both the 
 * width and height of one envelope are greater than the other envelope's width and height.
 *
 * Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).
 */
public int maxEnvelopes(int[][] envelopes) {
    if (envelopes == null || envelopes.length == 0) {
        return 0;
    }
    
    // Sort envelopes by width (ascending) and if widths are equal, 
    // by height (descending)
    Arrays.sort(envelopes, (a, b) -> {
        if (a[0] == b[0]) {
            return b[1] - a[1]; // Descending height if width is the same
        }
        return a[0] - b[0];     // Ascending width
    });
    
    // Apply LIS on heights
    int n = envelopes.length;
    int[] heights = new int[n];
    for (int i = 0; i < n; i++) {
        heights[i] = envelopes[i][1];
    }
    
    return lengthOfLIS(heights);
}

// O(n log n) LIS implementation
private int lengthOfLIS(int[] nums) {
    int[] tails = new int[nums.length];
    int size = 0;
    
    for (int num : nums) {
        int left = 0, right = size;
        
        // Binary search to find position
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        tails[left] = num;
        if (left == size) {
            size++;
        }
    }
    
    return size;
}`,
          explanation: "This problem is a 2D extension of the Longest Increasing Subsequence (LIS). The key insight is to sort the envelopes by width in ascending order, and for envelopes with the same width, sort by height in descending order. This ensures that we can't include multiple envelopes of the same width in our solution. After sorting, we apply the standard LIS algorithm on the heights array. The time complexity is O(n log n) where n is the number of envelopes."
        },
        {
          language: "java",
          code: `/**
 * Problem 2: Distinct Subsequences
 *
 * Given two strings s and t, return the number of distinct subsequences of s
 * which equals t.
 *
 * A subsequence of a string is a new string which is formed from the original 
 * string by deleting some (or none) of the characters without disturbing the 
 * relative positions of the remaining characters.
 */
public int numDistinct(String s, String t) {
    int m = s.length();
    int n = t.length();
    
    // dp[i][j] = number of ways to form t[0...j-1] from s[0...i-1]
    int[][] dp = new int[m + 1][n + 1];
    
    // Empty string t is a subsequence of any string s in exactly one way
    for (int i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }
    
    // Fill the dp table
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            // If current characters match, we have two choices:
            // 1. Use s[i-1] to match t[j-1]: dp[i-1][j-1]
            // 2. Don't use s[i-1], find t[j] in s[0...i-2]: dp[i-1][j]
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            } else {
                // Current characters don't match, so we can only skip s[i-1]
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    return dp[m][n];
}`,
          explanation: "This problem asks for the number of ways to form string t as a subsequence of string s. We use a 2D DP approach where dp[i][j] represents the number of ways to form t[0...j-1] from s[0...i-1]. When characters match, we have two options: either use the current character of s to match with t, or skip it. When they don't match, we can only skip the current character of s. The final answer is dp[m][n]. The time complexity is O(m×n) and space complexity is O(m×n), where m and n are the lengths of s and t respectively."
        },
        {
          language: "java",
          code: `/**
 * Problem 3: Minimum Falling Path Sum II
 *
 * Given an n x n integer matrix grid, return the minimum sum of a falling path 
 * with non-zero shifts.
 *
 * A falling path with non-zero shifts is a choice of exactly one element from 
 * each row of grid, such that no two elements chosen in adjacent rows are in the 
 * same column.
 */
public int minFallingPathSum(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }
    
    int n = grid.length;
    
    // If it's a 1x1 grid, return the only element
    if (n == 1) {
        return grid[0][0];
    }
    
    // Find minimum and second minimum in each row
    for (int i = 1; i < n; i++) {
        // Find min and second min from previous row
        int minIndex = -1;
        int min = Integer.MAX_VALUE;
        int secondMin = Integer.MAX_VALUE;
        
        for (int j = 0; j < n; j++) {
            if (grid[i - 1][j] < min) {
                secondMin = min;
                min = grid[i - 1][j];
                minIndex = j;
            } else if (grid[i - 1][j] < secondMin) {
                secondMin = grid[i - 1][j];
            }
        }
        
        // Update current row
        for (int j = 0; j < n; j++) {
            if (j != minIndex) {
                grid[i][j] += min;
            } else {
                grid[i][j] += secondMin;
            }
        }
    }
    
    // Find minimum value in the last row
    int result = Integer.MAX_VALUE;
    for (int j = 0; j < n; j++) {
        result = Math.min(result, grid[n - 1][j]);
    }
    
    return result;
}`,
          explanation: "This problem involves finding a path through a grid where we must choose one element from each row, and elements chosen in adjacent rows can't be in the same column. The key optimization is recognizing that for each element in the current row, we only need to know the minimum value from the previous row that isn't in the same column. We can track the minimum and second minimum values from the previous row to make this efficient. The time complexity is O(n²) where n is the grid size."
        },
        {
          language: "java",
          code: `/**
 * Problem 4: Partition Equal Subset Sum
 *
 * Given an array nums, return true if you can partition the array into two subsets 
 * such that the sum of elements in both subsets is equal.
 */
public boolean canPartition(int[] nums) {
    if (nums == null || nums.length < 2) {
        return false;
    }
    
    int totalSum = 0;
    for (int num : nums) {
        totalSum += num;
    }
    
    // If the total sum is odd, it cannot be partitioned into equal subsets
    if (totalSum % 2 != 0) {
        return false;
    }
    
    int target = totalSum / 2;
    int n = nums.length;
    
    // dp[i] = whether a subset of nums can sum up to i
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;  // Empty subset sums to 0
    
    for (int num : nums) {
        // Update dp array from right to left to avoid counting num multiple times
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}`,
          explanation: "This problem asks if we can divide an array into two subsets with equal sums. It can be transformed into finding if there's a subset that sums to half of the total sum. We use a 1D DP approach where dp[i] represents whether it's possible to form a subset with sum i. For each number, we update the possible sums by either including or excluding it. The optimization here is using a 1D array and iterating backwards to avoid counting elements multiple times. The time complexity is O(n×target) and space complexity is O(target)."
        },
        {
          language: "java",
          code: `/**
 * Problem 5: Best Time to Buy and Sell Stock with Cooldown
 *
 * You are given an array prices where prices[i] is the price of a given stock 
 * on the ith day. Find the maximum profit you can achieve.
 *
 * You may complete as many transactions as you like with the following restrictions:
 * - After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
 */
public int maxProfit(int[] prices) {
    if (prices == null || prices.length <= 1) {
        return 0;
    }
    
    int n = prices.length;
    
    // hold[i] = max profit on day i if holding stock
    // sold[i] = max profit on day i if just sold stock
    // rest[i] = max profit on day i if in cooldown/rest state
    int[] hold = new int[n];
    int[] sold = new int[n];
    int[] rest = new int[n];
    
    // Initialize state for day 0
    hold[0] = -prices[0];  // Buy stock on day 0
    sold[0] = 0;           // Cannot sell on day 0
    rest[0] = 0;           // Rest on day 0
    
    for (int i = 1; i < n; i++) {
        // For hold state: either continue holding or buy after resting
        hold[i] = Math.max(hold[i - 1], rest[i - 1] - prices[i]);
        
        // For sold state: sell the stock we are holding
        sold[i] = hold[i - 1] + prices[i];
        
        // For rest state: either continue resting or cool down after selling
        rest[i] = Math.max(rest[i - 1], sold[i - 1]);
    }
    
    // Final answer is the maximum of sold and rest states
    return Math.max(sold[n - 1], rest[n - 1]);
}`,
          explanation: "This problem involves stock trading with a cooldown period after selling. We use a state machine approach with three possible states: holding stock, just sold stock, or in a rest/cooldown state. The transitions between states follow the problem's rules, and we compute the maximum profit for each state on each day. The final answer is the maximum of the sold and rest states on the last day. The time complexity is O(n) and space complexity is O(n), where n is the number of days."
        }
      ]
    },
    {
      title: "Theoretical Questions",
      content: "These questions assess your understanding of dynamic programming concepts, techniques, and applications. They focus on recognizing problem patterns, analyzing algorithm efficiency, and comparing different DP approaches.",
      codeExamples: [
        {
          language: "text",
          code: `Question 1: Explain the differences between top-down (memoization) and bottom-up (tabulation) approaches to dynamic programming. What are the advantages and disadvantages of each?

Top-Down (Memoization) approach:
- Starts with the original problem and recursively breaks it down into subproblems
- Uses recursion with a memory structure (usually a hash map or array) to store results of subproblems
- Only computes subproblems that are actually needed
- Generally easier to implement as it follows the natural recursive structure of the problem
- May have higher overhead due to recursion (function call stack)
- May lead to stack overflow for very deep recursion

Bottom-Up (Tabulation) approach:
- Starts with the smallest subproblems and builds up to the original problem
- Uses iteration and typically a table (array) to store results
- Computes all possible subproblems in a specific order
- Usually more efficient in terms of constant factors due to avoiding recursion overhead
- May compute unnecessary subproblems that aren't needed for the final solution
- Sometimes harder to implement as the order of computation must be carefully determined

The choice between the two depends on the problem characteristics, memory constraints, and specific requirements. Top-down is often preferred for problems with many unnecessary subproblems, while bottom-up typically has better performance when all subproblems need to be solved.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 2: Describe the "overlapping subproblems" and "optimal substructure" properties in the context of dynamic programming. Why are these properties essential for a problem to be solvable using DP?

Overlapping Subproblems:
A problem exhibits overlapping subproblems when the same subproblems need to be solved multiple times in the process of solving the original problem. This redundancy creates an opportunity for optimization by storing the results of subproblems and reusing them when needed, rather than recomputing them. For example, in computing Fibonacci numbers, F(n) = F(n-1) + F(n-2), the calculation of F(n-2) would be repeated in both F(n) and F(n-1) using a naive recursive approach.

Optimal Substructure:
A problem has optimal substructure if an optimal solution to the problem contains optimal solutions to its subproblems. This property allows us to build an optimal solution to the original problem from optimal solutions to smaller instances of the same problem. For example, in the shortest path problem, if the shortest path from A to C goes through B, then the segment from A to B must be the shortest path from A to B, and the segment from B to C must be the shortest path from B to C.

These properties are essential for dynamic programming because:
1. Without overlapping subproblems, there would be no redundant calculations to optimize, making DP no more efficient than a divide-and-conquer approach.
2. Without optimal substructure, we couldn't build the optimal solution from optimal subsolutions, which is the fundamental principle of the DP approach.

Together, these properties enable DP to efficiently solve problems by breaking them down into smaller, reusable components and building up the solution incrementally.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 3: Compare and contrast the space optimization techniques used in different types of DP problems (1D, 2D grid, state compression). When would you choose each technique?

Space Optimization Techniques in DP:

1D DP Problems:
- Basic approach: Use an array of size n
- Optimization: If current state depends only on a fixed number of previous states (e.g., dp[i-1], dp[i-2]), can use a rolling array with just those few values
- Example: In Fibonacci calculation, only need to store the last two values
- When to use: When each state depends only on a small, fixed window of previous states

2D Grid DP Problems:
- Basic approach: Use a m×n grid for an m×n problem
- Optimization: If each row only depends on the previous row, can use two arrays (current and previous row)
- Further optimization: If updates can be done in-place, may need just a single array
- Example: In minimum path sum, can use a 1D array and update it row by row
- When to use: When each cell depends only on adjacent cells from previous rows/columns

State Compression DP:
- Basic approach: Use bitmasks to represent sets or states
- Optimization: Encode complex states as integers or bit patterns to reduce memory usage
- Example: In TSP, use a bitmask to represent the set of visited cities
- When to use: When states can be represented as combinations/subsets of a small number of elements

The choice depends on:
1. Memory constraints: For very large problems, aggressive optimization may be necessary
2. Problem structure: The dependency pattern between states determines which technique is applicable
3. Implementation complexity: More optimized versions are often harder to implement correctly
4. Time constraints: Some optimizations may slightly increase the computational complexity

Generally, start with the basic approach to ensure correctness, then optimize based on the specific problem constraints and requirements.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 4: Explain how to identify when a problem can be solved using the Longest Increasing Subsequence (LIS) algorithm or its variations. Provide examples of problems that may not immediately appear to be LIS variants.

Identifying LIS-Solvable Problems:

Key characteristics of LIS problems:
1. The problem involves finding a subsequence (not necessarily contiguous) with specific ordering properties
2. There's a clear comparison criterion between elements (e.g., increasing, decreasing, or custom ordering)
3. The solution requires maximizing the length of the subsequence while maintaining the ordering constraint

Common patterns that suggest LIS:
- Problems involving "longest" or "maximum number" of items that follow some order
- Problems where you need to select elements while maintaining relative positioning
- Problems that involve finding a chain of items where each item must be "greater" than the previous in some sense

Non-obvious LIS variants:

1. Box Stacking Problem:
   Given boxes with dimensions (h,w,d), stack them to maximize height where a box can only be placed on a larger box.
   Solution: Generate all rotations of boxes, sort by base area, then find LIS based on whether one box can be placed on another.

2. Maximum Bridge Connections:
   Given cities on opposite riverbanks, find the maximum number of bridges that don't cross.
   Solution: Sort cities on one bank, then find LIS of corresponding cities on the other bank.

3. Maximum Compatible Activity Scheduling:
   Given activities with start and end times, find the maximum subset of compatible activities.
   Solution: Sort by end time, then find a modified LIS where each element must start after the previous one ends.

4. Longest Chain of Pairs:
   Given pairs [a,b], find the longest chain where each pair's first element is greater than the previous pair's second element.
   Solution: Sort by first element, then find LIS based on second elements.

5. Building Towers with Height Constraints:
   Given heights and constraints on adjacent towers, find the longest sequence of towers that can be built.
   Solution: Sort towers and apply LIS with the given constraints.

The key insight is to look for problems involving ordering or sequencing with constraints, and see if they can be transformed into finding an optimal subsequence that maintains those constraints.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 5: Discuss the time and space complexity trade-offs in the Edit Distance algorithm. How would you optimize the algorithm for very long strings with small differences?

Time and Space Complexity of Edit Distance:

Standard Algorithm:
- Time Complexity: O(m×n) where m and n are the lengths of the two strings
- Space Complexity: O(m×n) for the full DP table

Trade-offs and Optimizations:

1. Space Optimization:
   - Reduce to O(min(m,n)) by only storing two rows of the DP table
   - Further optimize to O(min(m,n)) with a single row by carefully updating in-place
   - Trade-off: Slightly more complex code but significantly reduced memory usage

2. Optimizations for Long Strings with Small Differences:

   a. Band Optimization:
      - If the edit distance is known to be small (k), only compute cells where |i-j| ≤ k
      - Reduces time and space to O(k×(m+n))
      - Trade-off: Works only when k is small relative to string lengths

   b. Divide and Conquer:
      - Split one string in half, find optimal split point in the other string
      - Recursively solve for the two resulting subproblems
      - Can reduce space complexity while maintaining O(m×n) time in worst case
      - Trade-off: More complex implementation for space savings

   c. A* Search Approach:
      - Treat edit distance as a shortest path problem in a graph
      - Use A* search with an admissible heuristic (e.g., remaining length difference)
      - Can be much faster than standard DP for strings with small differences
      - Trade-off: More complex implementation, still O(m×n) worst case but often better in practice

   d. Myers' Algorithm:
      - Bit-vector algorithm specialized for edit distance
      - O((m+n)k) time complexity where k is the edit distance
      - Particularly efficient for comparing long strings with small differences
      - Trade-off: Complex implementation, specialized for edit distance calculation

The best approach depends on:
1. The expected edit distance between strings
2. Memory constraints
3. Whether exact or approximate edit distance is needed
4. Implementation complexity constraints

For production systems comparing very long strings (e.g., DNA sequences, file diff tools), specialized algorithms like Myers' or the A* approach are often preferred despite their implementation complexity.`,
          explanation: ""
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "mock8-hw1",
      question: "Implement a solution for the 'Stone Game' problem: Two players take turns removing stones from one of several piles. On each turn, a player must remove at least one stone and can remove any number of stones provided they all come from the same pile. The player who removes the last stone wins. Given the initial number of stones in each pile, determine if the first player has a winning strategy.",
      solution: "Use the Nim game theory: XOR all pile sizes. If the result is non-zero, the first player can win by removing stones to make the XOR zero. If the result is zero, the second player has a winning strategy. The key insight is maintaining the invariant that after your move, the XOR of all pile sizes should be zero to force the opponent into a losing position."
    },
    {
      id: "mock8-hw2",
      question: "Implement the 'Word Break II' problem: Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.",
      solution: "Use dynamic programming with memoization. Create a recursive function that tries to break the string at different positions. If a prefix is found in the dictionary, recursively solve for the remaining substring. Use memoization to avoid redundant calculations. Build the sentences by concatenating valid words with spaces. Handle edge cases like empty strings or when no valid sentence can be formed."
    },
    {
      id: "mock8-hw3",
      question: "Implement the 'Maximum Vacation Days' problem: Given an n×n matrix flights where flights[i][j] is 1 if you can fly from city i to j, and a schedule of vacation days for each city, find the maximum vacation days you can take. You start in city 0 and can fly at most once per week between cities.",
      solution: "Use dynamic programming where dp[i][j] represents the maximum vacation days you can take if you're in city j in week i. For each week and city, consider all possible cities you could have been in the previous week, and choose the one that maximizes vacation days. Consider both staying in the same city and flying to a different city, ensuring flight connections exist. The answer is the maximum value in the last row of the DP table."
    },
    {
      id: "mock8-hw4",
      question: "Implement a solution for the 'Student Attendance Record II' problem: Given a positive integer n, return the number of all possible attendance records with length n, which contain no more than one 'A' (absent) and no more than two consecutive 'L's (late). The answer may be very large, so return it modulo 10^9 + 7.",
      solution: "Define a state dp[i][a][l] representing the number of valid sequences of length i with 'a' absences and 'l' consecutive lates at the end. The base case is dp[0][0][0] = 1. For each position, consider adding 'P' (present), 'A' (absent if a < 1), or 'L' (late if l < 2). Update states accordingly while maintaining the constraints on absences and consecutive lates. The final answer is the sum of all dp[n][a][l] values."
    }
  ],
  
  quiz: [
    {
      id: "mock8-q1",
      question: "What is the time complexity of the efficient solution to the Longest Increasing Subsequence problem?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 1,
      explanation: "The efficient solution to the Longest Increasing Subsequence problem has a time complexity of O(n log n). This is achieved by using a binary search approach to maintain an array where each element represents the smallest possible value that can end a subsequence of a given length. The binary search takes O(log n) time per element, and we process n elements."
    },
    {
      id: "mock8-q2",
      question: "In the context of the Edit Distance problem, which operation is NOT typically considered in the standard algorithm?",
      options: ["Insertion", "Deletion", "Substitution", "Transposition (swapping adjacent characters)"],
      correctAnswer: 3,
      explanation: "The standard Edit Distance (Levenshtein distance) algorithm considers three operations: insertion, deletion, and substitution. Transposition (swapping adjacent characters) is not part of the standard algorithm but is included in the Damerau-Levenshtein distance, which is a variation of the edit distance algorithm."
    },
    {
      id: "mock8-q3",
      question: "Which of the following problems would NOT typically be solved using a grid-based DP approach?",
      options: [
        "Minimum Path Sum in a 2D grid",
        "Unique Paths with Obstacles",
        "Maximum Square of 1's in a binary matrix",
        "Longest Common Subsequence of two strings"
      ],
      correctAnswer: 3,
      explanation: "While the Longest Common Subsequence (LCS) problem does use a 2D DP table, it's not classified as a grid-based DP problem in the traditional sense. Grid-based DP typically refers to problems where the original input is a 2D grid/matrix, and the DP solution involves traversing this grid in some pattern. LCS operates on two strings/sequences rather than a predefined grid structure."
    },
    {
      id: "mock8-q4",
      question: "What is the space complexity of the space-optimized version of the Minimum Path Sum problem?",
      options: ["O(1)", "O(n)", "O(m+n)", "O(m×n)"],
      correctAnswer: 1,
      explanation: "The space-optimized version of the Minimum Path Sum problem has a space complexity of O(n), where n is the width of the grid. Instead of storing the entire m×n DP table, we only need to keep track of one row at a time, reusing the same array as we process each row of the grid."
    },
    {
      id: "mock8-q5",
      question: "In the context of DP with state compression, what is a bitmask typically used to represent?",
      options: [
        "The numerical values of array elements",
        "The inclusion or exclusion of elements in a subset",
        "The ordering of elements in a sequence",
        "The frequency of occurrence of each element"
      ],
      correctAnswer: 1,
      explanation: "In DP with state compression, a bitmask is typically used to represent the inclusion or exclusion of elements in a subset. Each bit in the mask corresponds to an element, with a 1 indicating the element is included and a 0 indicating it's excluded. This is particularly useful for problems involving subsets, combinations, or states that can be represented as binary choices."
    }
  ],
  practice: {
    introduction: "Practice these problems to reinforce your understanding of suffix arrays and their applications in string processing. These problems will help you apply the concepts learned to solve various algorithmic challenges involving pattern matching, substring queries, and string analysis.",
    questions: {
      easy: [
        {
          id: "sa-easy-1",
          title: "Implement strStr()",
          link: "https://leetcode.com/problems/implement-strstr/",
          description: "Implement a function that finds the index of the first occurrence of a pattern in a string. While this can be solved with various methods, it's good practice for understanding string matching concepts that underlie suffix arrays."
        },
        {
          id: "sa-easy-2",
          title: "Longest Common Prefix",
          link: "https://leetcode.com/problems/longest-common-prefix/",
          description: "Find the longest common prefix among an array of strings. This problem helps understand the concept of common prefixes, which is related to the LCP array computation in suffix arrays."
        },
        {
          id: "sa-easy-3",
          title: "Repeated Substring Pattern",
          link: "https://leetcode.com/problems/repeated-substring-pattern/",
          description: "Determine if a string can be constructed by taking a substring and repeating it multiple times. This problem can be solved using concepts related to string periods and patterns."
        }
      ],
      medium: [
        {
          id: "sa-medium-1",
          title: "Find All Anagrams in a String",
          link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
          description: "Find all the start indices of anagrams of a pattern in a string. This problem can be approached using suffix array concepts for effective string matching."
        },
        {
          id: "sa-medium-2",
          title: "Longest Repeating Substring",
          link: "https://leetcode.com/problems/longest-repeating-substring/",
          description: "Find the longest substring that occurs at least twice in a given string. This is a direct application of suffix arrays and LCP arrays."
        },
        {
          id: "sa-medium-3",
          title: "Longest Duplicate Substring",
          link: "https://leetcode.com/problems/longest-duplicate-substring/",
          description: "Find the longest substring that occurs multiple times in a string. This is an ideal problem for applying suffix array techniques."
        },
        {
          id: "sa-medium-4",
          title: "Distinct Subsequences II",
          link: "https://leetcode.com/problems/distinct-subsequences-ii/",
          description: "Count the number of distinct, non-empty subsequences of a string. This problem requires a good understanding of string patterns and can benefit from suffix array concepts."
        }
      ],
      hard: [
        {
          id: "sa-hard-1",
          title: "Shortest Palindrome",
          link: "https://leetcode.com/problems/shortest-palindrome/",
          description: "Find the shortest palindrome that can be formed by adding characters to the beginning of a string. This can be approached using suffix array techniques combined with palindrome concepts."
        },
        {
          id: "sa-hard-2",
          title: "Substring with Concatenation of All Words",
          link: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
          description: "Find all starting indices of substrings that are a concatenation of words from a given list. This problem tests advanced string matching capabilities."
        },
        {
          id: "sa-hard-3",
          title: "Number of Distinct Substrings in a String",
          link: "https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/",
          description: "Count the number of distinct substrings of a string. This is a classic application of suffix arrays that leverages the LCP array to efficiently count unique substrings."
        }
      ]
    }
  }
};

export default mockTestWeek8Content; 