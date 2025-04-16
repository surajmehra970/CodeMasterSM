import { Content } from '@/types/course';

const dpOnGridContent: Content = {
  introduction: "Dynamic Programming on Grid problems represents a powerful subset of DP applications that operate on 2D matrices or grids. These problems are foundational in algorithm design and appear frequently in competitive programming and technical interviews. In grid-based DP, we typically need to find optimal paths, counts, or values while navigating through the grid under certain constraints. The structured nature of grids makes them perfect candidates for dynamic programming approaches, where solutions to subproblems can be systematically combined to solve the original problem.",
  
  learningObjectives: [
    "Understand the core principles of applying dynamic programming to grid-based problems",
    "Implement efficient solutions for classic grid DP problems including path finding and counting",
    "Apply space optimization techniques to reduce memory usage in grid DP algorithms",
    "Analyze the time and space complexity of grid DP algorithms",
    "Recognize and solve variations of grid DP problems with different constraints and objectives"
  ],
  
  sections: [
    {
      title: "Introduction to Grid-Based DP",
      content: "Grid-based dynamic programming problems typically involve a 2D matrix where each cell represents a state. The goal is often to find an optimal path, count the number of ways to reach a destination, or determine a maximum/minimum value that can be achieved by traversing the grid under certain constraints. The key insight is to define a recurrence relation that expresses how to compute a solution for a cell based on solutions for neighboring cells.",
      codeExamples: [
        {
          language: "java",
          code: `// Example grid representation
int[][] grid = {
    {1, 3, 1},
    {1, 5, 1},
    {4, 2, 1}
};

// Common state definition for DP on grid
// dp[i][j] = some optimal value for reaching or being at position (i,j)

// Typical directions for traversal in a grid
int[][] directions = {
    {0, 1},  // right
    {1, 0},  // down
    {0, -1}, // left
    {-1, 0}  // up
};

// Some problems only allow specific directions, commonly:
int[][] restrictedDirections = {
    {0, 1},  // right
    {1, 0}   // down
};`,
          explanation: "This code illustrates the basic concepts and representations used in grid-based DP problems. We typically represent the grid as a 2D array and define a DP state for each cell. The directions array shows possible movements in the grid, which may be restricted based on problem constraints. For many problems, we're only allowed to move right and down, which simplifies the state transitions."
        }
      ]
    },
    {
      title: "Minimum/Maximum Path Sum",
      content: "A classic grid DP problem involves finding the minimum or maximum path sum from the top-left corner to the bottom-right corner of a grid. In these problems, each cell contains a value, and the goal is to find a path that optimizes the sum of values along the path. Typically, movement is restricted to right and down directions.",
      codeExamples: [
        {
          language: "java",
          code: `// Minimum Path Sum
// Given a grid filled with numbers, find the path from top-left to
// bottom-right with the minimum sum of numbers along the path.
// You can only move right or down.
public int minPathSum(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }
    
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Create DP table
    int[][] dp = new int[rows][cols];
    
    // Initialize the starting point
    dp[0][0] = grid[0][0];
    
    // Initialize first row (can only come from the left)
    for (int j = 1; j < cols; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    
    // Initialize first column (can only come from above)
    for (int i = 1; i < rows; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    
    // Fill the DP table
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            // Choose the minimum of coming from above or from the left
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    
    // The bottom-right cell contains the minimum path sum
    return dp[rows-1][cols-1];
}`,
          explanation: "This algorithm finds the minimum path sum from the top-left to the bottom-right of a grid. We use a DP table where dp[i][j] represents the minimum sum to reach cell (i,j). For each cell, we consider coming from above (dp[i-1][j]) or from the left (dp[i][j-1]) and choose the path with the minimum sum. The time and space complexity are both O(rows × cols)."
        },
        {
          language: "java",
          code: `// Maximum Path Sum
// Similar to minimum path sum, but find the maximum sum path
public int maxPathSum(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }
    
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Create DP table
    int[][] dp = new int[rows][cols];
    
    // Initialize the starting point
    dp[0][0] = grid[0][0];
    
    // Initialize first row
    for (int j = 1; j < cols; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    
    // Initialize first column
    for (int i = 1; i < rows; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    
    // Fill the DP table
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            // Choose the maximum of coming from above or from the left
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    
    // The bottom-right cell contains the maximum path sum
    return dp[rows-1][cols-1];
}`,
          explanation: "This code finds the maximum path sum from the top-left to the bottom-right. The approach is similar to the minimum path sum, but we use Math.max instead of Math.min. This illustrates a common pattern in DP problems where the same framework can be applied to different optimization objectives."
        }
      ]
    },
    {
      title: "Unique Paths",
      content: "Another common grid DP problem involves counting the number of unique paths from the top-left to the bottom-right corner of a grid. In these problems, there are typically constraints on the allowed movements, such as only being able to move right or down.",
      codeExamples: [
        {
          language: "java",
          code: `// Unique Paths
// Count the number of unique paths from top-left to bottom-right
// when you can only move right or down.
public int uniquePaths(int m, int n) {
    // Create DP table
    int[][] dp = new int[m][n];
    
    // Initialize first row (can only come from the left)
    for (int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    
    // Initialize first column (can only come from above)
    for (int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    
    // Fill the DP table
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            // Number of ways to reach (i,j) is the sum of ways to reach
            // the cell above and the cell to the left
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    // The bottom-right cell contains the number of unique paths
    return dp[m-1][n-1];
}`,
          explanation: "This algorithm counts the number of unique paths from the top-left to the bottom-right of an m×n grid when only right and down movements are allowed. We use a DP table where dp[i][j] represents the number of ways to reach cell (i,j). For each cell, the number of ways is the sum of ways to reach the cell above and the cell to the left. The time and space complexity are both O(m×n)."
        },
        {
          language: "java",
          code: `// Unique Paths with Obstacles
// Count the number of unique paths when there are obstacles
// that block certain cells.
public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    if (obstacleGrid == null || obstacleGrid.length == 0 || obstacleGrid[0].length == 0) {
        return 0;
    }
    
    int rows = obstacleGrid.length;
    int cols = obstacleGrid[0].length;
    
    // If starting point or ending point is an obstacle, there's no path
    if (obstacleGrid[0][0] == 1 || obstacleGrid[rows-1][cols-1] == 1) {
        return 0;
    }
    
    // Create DP table
    int[][] dp = new int[rows][cols];
    
    // Initialize starting point
    dp[0][0] = 1;
    
    // Initialize first row
    for (int j = 1; j < cols; j++) {
        if (obstacleGrid[0][j] == 0) {
            dp[0][j] = dp[0][j-1];
        } else {
            dp[0][j] = 0;
        }
    }
    
    // Initialize first column
    for (int i = 1; i < rows; i++) {
        if (obstacleGrid[i][0] == 0) {
            dp[i][0] = dp[i-1][0];
        } else {
            dp[i][0] = 0;
        }
    }
    
    // Fill the DP table
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            if (obstacleGrid[i][j] == 0) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            } else {
                dp[i][j] = 0;
            }
        }
    }
    
    return dp[rows-1][cols-1];
}`,
          explanation: "This is a variation of the unique paths problem where some cells contain obstacles that cannot be traversed. We initialize the DP table similarly, but if a cell contains an obstacle (obstacleGrid[i][j] == 1), we set dp[i][j] = 0 since no paths can pass through that cell. This demonstrates how grid DP problems can incorporate additional constraints while maintaining the same basic approach."
        }
      ]
    },
    {
      title: "2D Range Sum Queries",
      content: "An important application of DP on grids is efficiently computing sums or other properties over rectangular regions of a 2D array. This is particularly useful for answering multiple queries about different regions of the grid without recomputing the entire sum each time.",
      codeExamples: [
        {
          language: "java",
          code: `// 2D Prefix Sum for Range Sum Queries
class NumMatrix {
    private int[][] prefixSum;
    
    public NumMatrix(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        // Create prefix sum matrix (1-indexed for easier calculations)
        prefixSum = new int[rows + 1][cols + 1];
        
        // Fill the prefix sum matrix
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                prefixSum[i][j] = prefixSum[i-1][j] + prefixSum[i][j-1] - 
                                  prefixSum[i-1][j-1] + matrix[i-1][j-1];
            }
        }
    }
    
    // Return sum of rectangle with top-left (row1,col1) and bottom-right (row2,col2)
    public int sumRegion(int row1, int col1, int row2, int col2) {
        // Adjust for 1-indexed prefix sum array
        row1++; col1++; row2++; col2++;
        
        return prefixSum[row2][col2] - prefixSum[row2][col1-1] - 
               prefixSum[row1-1][col2] + prefixSum[row1-1][col1-1];
    }
}`,
          explanation: "This code implements a 2D prefix sum for efficient range sum queries. We precompute a prefix sum matrix where prefixSum[i][j] represents the sum of all elements in the submatrix from (0,0) to (i-1,j-1). To find the sum of a rectangle, we use inclusion-exclusion principle: add the sum of the bottom-right region, subtract the sum of regions to the left and above, and add back the double-subtracted region. The preprocessing takes O(rows×cols) time, but each query is O(1), making this approach very efficient for multiple queries."
        }
      ]
    },
    {
      title: "Maximum Square",
      content: "A more complex grid DP problem involves finding the largest square submatrix consisting entirely of a specific value (typically 1's). This problem demonstrates how DP can be used to identify structures with specific properties within a grid.",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Square
// Find the largest square of 1's in a binary matrix
public int maximalSquare(char[][] matrix) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return 0;
    }
    
    int rows = matrix.length;
    int cols = matrix[0].length;
    
    // Create DP table
    int[][] dp = new int[rows + 1][cols + 1];
    
    int maxSide = 0;
    
    // Fill the DP table
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= cols; j++) {
            if (matrix[i-1][j-1] == '1') {
                // The minimum of the three adjacent cells plus one
                dp[i][j] = Math.min(
                    Math.min(dp[i-1][j], dp[i][j-1]),
                    dp[i-1][j-1]
                ) + 1;
                
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    
    // Return the area of the square
    return maxSide * maxSide;
}`,
          explanation: "This algorithm finds the largest square of 1's in a binary matrix. We use a DP table where dp[i][j] represents the side length of the largest square whose bottom-right corner is at position (i-1,j-1) in the original matrix. The key insight is that if the current cell is 1, the largest square ending at this cell is limited by the minimum of the squares ending at the cell above, to the left, and diagonally above-left, plus 1. The time and space complexity are both O(rows×cols)."
        }
      ]
    },
    {
      title: "Space Optimization Techniques",
      content: "Many grid DP problems can be optimized to use less space. Since each cell typically depends only on adjacent cells that have already been processed, we often only need to keep track of a subset of the DP table, such as the previous row or column.",
      codeExamples: [
        {
          language: "java",
          code: `// Space-optimized Minimum Path Sum
// Uses O(cols) space instead of O(rows * cols)
public int minPathSumOptimized(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }
    
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Use a 1D array to represent the current row
    int[] dp = new int[cols];
    
    // Initialize the first entry
    dp[0] = grid[0][0];
    
    // Initialize first row
    for (int j = 1; j < cols; j++) {
        dp[j] = dp[j-1] + grid[0][j];
    }
    
    // Fill the DP array row by row
    for (int i = 1; i < rows; i++) {
        // Update the first column
        dp[0] += grid[i][0];
        
        for (int j = 1; j < cols; j++) {
            // Choose the minimum of coming from above (dp[j]) or from the left (dp[j-1])
            dp[j] = Math.min(dp[j], dp[j-1]) + grid[i][j];
        }
    }
    
    return dp[cols-1];
}`,
          explanation: "This space-optimized version of the minimum path sum problem reduces the space complexity from O(rows×cols) to O(cols) by using a 1D array instead of a 2D table. The key insight is that when processing row i, we only need the results from row i-1, which are stored in the same 1D array. As we process each cell, we update the array in-place. This approach is common in grid DP problems and can significantly reduce memory usage for large grids."
        },
        {
          language: "java",
          code: `// Space-optimized Unique Paths
// Uses O(min(m,n)) space
public int uniquePathsOptimized(int m, int n) {
    // Ensure that n is the smaller dimension for optimization
    if (m < n) {
        return uniquePathsOptimized(n, m);
    }
    
    // Create a 1D array of size n
    int[] dp = new int[n];
    
    // Initialize all entries to 1 (there's only one way to reach each cell in the first row)
    Arrays.fill(dp, 1);
    
    // Process each row
    for (int i = 1; i < m; i++) {
        // First column always has only one path
        // dp[0] = 1; (already set)
        
        for (int j = 1; j < n; j++) {
            // Number of ways to reach current cell is the sum of
            // ways to reach the cell above (dp[j]) and the cell to the left (dp[j-1])
            dp[j] += dp[j-1];
        }
    }
    
    return dp[n-1];
}`,
          explanation: "This space-optimized version of the unique paths problem reduces space complexity to O(min(m,n)) by using a 1D array representing a single row or column, depending on which dimension is smaller. Since we only need the previous row's results to calculate the current row, we can reuse the same array and update it in-place as we process each row. This is a common space optimization technique for grid DP problems."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "grid-dp-hw1",
      question: "Minimum Falling Path Sum: Given an n x n grid of integers, find the minimum sum path from the first row to the last row, where at each step you can move diagonally one column to the left, directly down, or diagonally one column to the right.",
      solution: "Create a DP table where dp[i][j] represents the minimum path sum to reach position (i,j). Initialize the first row with the values from the grid. For each subsequent position (i,j), consider three possible previous positions: (i-1,j-1), (i-1,j), and (i-1,j+1). Calculate dp[i][j] = grid[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]), handling boundary cases appropriately. The minimum value in the last row of the DP table is the answer."
    },
    {
      id: "grid-dp-hw2",
      question: "Dungeon Game: Given a dungeon with values representing the damage/health gained in each room, find the minimum initial health needed to rescue the princess. The knight loses health when entering a room with a negative value and gains health when entering a room with a positive value. The knight must always have health > 0.",
      solution: "This problem requires working backwards from the bottom-right. Create a DP table where dp[i][j] represents the minimum health needed at position (i,j). Set dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1]) to ensure the knight has at least 1 health after the last room. For each cell, calculate dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]). The value dp[0][0] is the minimum initial health needed."
    },
    {
      id: "grid-dp-hw3",
      question: "Cherry Pickup: Given an n x n grid filled with cherries (1) and thorns (0), collect maximum cherries using two people who start from the top-left and bottom-left corners and both move to the right-top corner. They can move right, up, or diagonally up-right in each step.",
      solution: "Define a 3D DP state dp[r1][c1][c2] representing the maximum cherries that can be collected when person 1 is at (r1,c1) and person 2 is at (r2,c2) where r2 = r1+c1-c2 (they're at the same row level). For each state, consider all possible moves for both people and take the maximum cherries. Handle cases where both people land on the same cell by counting the cherry only once. The final answer is dp[n-1][n-1][n-1]."
    },
    {
      id: "grid-dp-hw4",
      question: "Out of Boundary Paths: Given an m x n grid, a ball starting at position (i,j), and a maximum number of moves, count how many ways the ball can be moved such that it ends up out of bounds.",
      solution: "Define a 3D DP state dp[k][i][j] representing the number of ways to move out of bounds starting from position (i,j) using exactly k moves. Initialize dp[0][i][j] = 0 for all i,j within bounds. For each move k and position (i,j), consider the four possible directions and add the number of ways to move out of bounds from each adjacent cell using k-1 moves. If an adjacent cell is out of bounds, increment the count by 1. The final answer is the sum of dp[k][i][j] for all k from 1 to maxMove."
    }
  ],
  
  quiz: [
    {
      id: "grid-dp-q1",
      question: "In the Minimum Path Sum problem, what value does dp[i][j] represent?",
      options: [
        "The number of unique paths to reach cell (i,j)",
        "The minimum sum of path values to reach cell (i,j) from the top-left",
        "The maximum sum of path values to reach cell (i,j) from the top-left",
        "The minimum number of steps to reach cell (i,j) from the top-left"
      ],
      correctAnswer: 1,
      explanation: "In the Minimum Path Sum problem, dp[i][j] represents the minimum sum of values along any path from the top-left cell (0,0) to the cell (i,j). At each step, we choose the minimum of coming from above or from the left, and add the current cell's value."
    },
    {
      id: "grid-dp-q2",
      question: "What is the time complexity of the space-optimized unique paths algorithm that uses a 1D array?",
      options: ["O(m)", "O(n)", "O(m + n)", "O(m * n)"],
      correctAnswer: 3,
      explanation: "The space-optimized unique paths algorithm still needs to process each cell in the grid exactly once, even though it reuses the same 1D array. Therefore, the time complexity remains O(m * n), where m is the number of rows and n is the number of columns in the grid."
    },
    {
      id: "grid-dp-q3",
      question: "In the Maximal Square problem, what recurrence relation is used to calculate dp[i][j] when the current cell contains a '1'?",
      options: [
        "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
        "dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + 1",
        "dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1",
        "dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + 1"
      ],
      correctAnswer: 2,
      explanation: "In the Maximal Square problem, when the current cell contains a '1', dp[i][j] is calculated as the minimum of the three adjacent cells (above, left, and diagonally above-left) plus 1. This ensures that we only extend a square if all required cells are part of valid squares. The recurrence relation is dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1."
    },
    {
      id: "grid-dp-q4",
      question: "Which of the following grid DP problems typically requires backwards traversal of the grid (from bottom-right to top-left)?",
      options: [
        "Unique Paths",
        "Minimum Path Sum",
        "Dungeon Game",
        "Maximum Square"
      ],
      correctAnswer: 2,
      explanation: "The Dungeon Game problem typically requires backwards traversal of the grid. Since the knight needs to maintain positive health throughout the journey, and the final health requirement is known (at least 1 health after the last room), we work backwards from the bottom-right to determine the minimum initial health needed at the top-left."
    },
    {
      id: "grid-dp-q5",
      question: "What space optimization technique is commonly used in grid DP problems?",
      options: [
        "Using recursion instead of iteration",
        "Reducing the 2D DP table to a 1D array representing the current row or column",
        "Converting the grid to a graph and using graph algorithms",
        "Applying binary search to find the optimal path"
      ],
      correctAnswer: 1,
      explanation: "A common space optimization technique in grid DP problems is reducing the 2D DP table to a 1D array that represents the current row or column being processed. This works because each cell typically only depends on adjacent cells that have already been processed, so we only need to keep track of the relevant portion of the table."
    }
  ],
  practice: {
    introduction: "Practice string matching algorithms with these LeetCode problems. They will help reinforce your understanding of pattern matching techniques, including KMP, Rabin-Karp, and other string manipulation concepts.",
    questions: {
      easy: [
        {
          id: "sm-easy-1",
          title: "Implement strStr()",
          link: "https://leetcode.com/problems/implement-strstr/",
          description: "Implement the strStr() function to find the first occurrence of a needle in a haystack. This is a direct application of string matching algorithms like KMP or Rabin-Karp."
        },
        {
          id: "sm-easy-2",
          title: "Repeated Substring Pattern",
          link: "https://leetcode.com/problems/repeated-substring-pattern/",
          description: "Determine if a string can be constructed by taking a substring and repeating it multiple times, applying string pattern recognition techniques."
        },
        {
          id: "sm-easy-3",
          title: "Long Pressed Name",
          link: "https://leetcode.com/problems/long-pressed-name/",
          description: "Check if one string could be created from another by characters being long-pressed, requiring pattern matching with character repetition handling."
        }
      ],
      medium: [
        {
          id: "sm-medium-1",
          title: "Find All Anagrams in a String",
          link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
          description: "Find all start indices of anagrams of pattern p in string s, combining sliding window technique with character frequency matching."
        },
        {
          id: "sm-medium-2",
          title: "Shortest Palindrome",
          link: "https://leetcode.com/problems/shortest-palindrome/",
          description: "Find the shortest palindrome you can form by adding characters only to the beginning of a given string, applying KMP-based techniques."
        },
        {
          id: "sm-medium-3",
          title: "Rotate String",
          link: "https://leetcode.com/problems/rotate-string/",
          description: "Check if a string can be rotated to become another string, which can be solved using pattern matching approaches."
        },
        {
          id: "sm-medium-4",
          title: "Repeated String Match",
          link: "https://leetcode.com/problems/repeated-string-match/",
          description: "Find the minimum number of times you should repeat string A to make string B a substring of it, requiring careful application of string matching."
        }
      ],
      hard: [
        {
          id: "sm-hard-1",
          title: "Minimum Window Substring",
          link: "https://leetcode.com/problems/minimum-window-substring/",
          description: "Find the minimum window in a string that contains all characters of another string, combining sliding window with pattern matching."
        },
        {
          id: "sm-hard-2",
          title: "Distinct Subsequences",
          link: "https://leetcode.com/problems/distinct-subsequences/",
          description: "Count the number of distinct subsequences of one string that equal another string, requiring advanced pattern matching techniques."
        },
        {
          id: "sm-hard-3",
          title: "String Matching in an Array",
          link: "https://leetcode.com/problems/string-matching-in-an-array/",
          description: "Find all strings that appear as substrings in other strings of an array, applying various string matching algorithms to multiple strings."
        }
      ]
    }
  }
};

export default dpOnGridContent; 