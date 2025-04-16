import { Content } from '@/types/course';

const lcsContent: Content = {
  introduction: "The Longest Common Subsequence (LCS) problem is a classic dynamic programming challenge that finds applications in diverse fields such as bioinformatics, file comparison, and text analysis. LCS involves finding the longest subsequence common to two sequences, where a subsequence is a sequence that appears in the same relative order but not necessarily contiguously. Today, we'll explore efficient algorithms to solve the LCS problem and its variations.",
  
  learningObjectives: [
    "Understand the Longest Common Subsequence problem and its applications",
    "Develop recursive and dynamic programming solutions for LCS",
    "Implement space-optimized algorithms for LCS computation",
    "Analyze time and space complexity of LCS algorithms",
    "Apply LCS to solve related string problems like diff computation and sequence alignment"
  ],
  
  sections: [
    {
      title: "Understanding the LCS Problem",
      content: "The Longest Common Subsequence (LCS) problem asks us to find the longest sequence that is present in two given sequences in the same order (though not necessarily contiguously). For example, the LCS of 'ABCBDAB' and 'BDCABA' is 'BCBA' of length 4. LCS has applications in bioinformatics (DNA sequence alignment), version control systems (diff tools), and plagiarism detection.",
      codeExamples: [
        {
          language: "java",
          code: `// Problem: Find the Longest Common Subsequence of two strings
// Example: LCS of "ABCBDAB" and "BDCABA" is "BCBA" with length 4

class LCSProblem {
    public static void main(String[] args) {
        String text1 = "ABCBDAB";
        String text2 = "BDCABA";
        
        System.out.println("Length of LCS: " + lcsNaive(text1, text2, text1.length(), text2.length()));
    }
    
    // Naive recursive solution
    static int lcsNaive(String text1, String text2, int m, int n) {
        // Base case: if either string is empty
        if (m == 0 || n == 0) {
            return 0;
        }
        
        // If last characters match, include it in LCS
        if (text1.charAt(m-1) == text2.charAt(n-1)) {
            return 1 + lcsNaive(text1, text2, m-1, n-1);
        }
        
        // If last characters don't match, try both possibilities
        // and take the maximum
        return Math.max(
            lcsNaive(text1, text2, m-1, n),
            lcsNaive(text1, text2, m, n-1)
        );
    }
}`,
          explanation: "This code shows a naive recursive approach to solve the LCS problem. When the last characters of both strings match, we include that character in the LCS and recursively solve for the remaining substrings. When they don't match, we try two possibilities: excluding the last character of the first string or excluding the last character of the second string, and take the maximum. This naive approach has exponential time complexity due to recalculating the same subproblems multiple times."
        }
      ]
    },
    {
      title: "Dynamic Programming Approach: Memoization",
      content: "The naive recursive solution recomputes the same subproblems, leading to inefficiency. We can optimize this using memoization, where we store the results of subproblems in a table to avoid redundant calculations. This top-down approach starts with the original problem and breaks it down into smaller subproblems, caching results along the way.",
      codeExamples: [
        {
          language: "java",
          code: `// Top-down DP approach using memoization
static int lcsMemo(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Create memoization table initialized with -1
    int[][] memo = new int[m+1][n+1];
    for (int i = 0; i <= m; i++) {
        Arrays.fill(memo[i], -1);
    }
    
    return lcsMemoHelper(text1, text2, m, n, memo);
}

static int lcsMemoHelper(String text1, String text2, int m, int n, int[][] memo) {
    // If result is already calculated, return it
    if (memo[m][n] != -1) {
        return memo[m][n];
    }
    
    // Base case: if either string is empty
    if (m == 0 || n == 0) {
        memo[m][n] = 0;
        return 0;
    }
    
    // If last characters match
    if (text1.charAt(m-1) == text2.charAt(n-1)) {
        memo[m][n] = 1 + lcsMemoHelper(text1, text2, m-1, n-1, memo);
    } else {
        // If last characters don't match
        memo[m][n] = Math.max(
            lcsMemoHelper(text1, text2, m-1, n, memo),
            lcsMemoHelper(text1, text2, m, n-1, memo)
        );
    }
    
    return memo[m][n];
}

// Usage example
public static void main(String[] args) {
    String text1 = "ABCBDAB";
    String text2 = "BDCABA";
    
    System.out.println("Length of LCS (memoization): " + lcsMemo(text1, text2));
}`,
          explanation: "This memoization approach improves the time complexity from O(2^(m+n)) to O(m*n) by storing results of subproblems. When we encounter the same state (defined by m and n), we retrieve the cached result instead of recomputing it. The space complexity is O(m*n) for the memoization table plus O(m+n) for the recursion stack."
        }
      ]
    },
    {
      title: "Dynamic Programming Approach: Tabulation",
      content: "The tabulation (bottom-up) approach builds solutions to subproblems iteratively, starting from the smallest subproblems and working towards the original problem. This eliminates the recursive call stack overhead and can be more efficient in terms of both time and space.",
      codeExamples: [
        {
          language: "java",
          code: `// Bottom-up DP approach using tabulation
static int lcsTabulation(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Create DP table
    int[][] dp = new int[m+1][n+1];
    
    // Fill the DP table bottom-up
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            // Base case: empty string
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            }
            // If characters match
            else if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i][j] = 1 + dp[i-1][j-1];
            }
            // If characters don't match
            else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    // The result is in the bottom-right cell
    return dp[m][n];
}

// Space-optimized tabulation (uses only two rows)
static int lcsTabulationOptimized(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Create two rows for DP computation
    int[] prev = new int[n+1];
    int[] curr = new int[n+1];
    
    // Fill the rows
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                curr[j] = 0;
            } else if (text1.charAt(i-1) == text2.charAt(j-1)) {
                curr[j] = 1 + prev[j-1];
            } else {
                curr[j] = Math.max(prev[j], curr[j-1]);
            }
        }
        // Update previous row
        System.arraycopy(curr, 0, prev, 0, n+1);
    }
    
    return prev[n];
}

// Further space-optimized version (uses only one row)
static int lcsTabulationHighlyOptimized(String text1, String text2) {
    // Make sure text1 is the shorter string for optimization
    if (text1.length() > text2.length()) {
        String temp = text1;
        text1 = text2;
        text2 = temp;
    }
    
    int m = text1.length();
    int n = text2.length();
    
    // Single row DP array
    int[] dp = new int[m+1];
    
    for (int j = 1; j <= n; j++) {
        int prev = 0; // represents dp[0][j-1]
        for (int i = 1; i <= m; i++) {
            int temp = dp[i]; // Store the value before updating
            if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i] = prev + 1;
            } else {
                dp[i] = Math.max(dp[i], dp[i-1]);
            }
            prev = temp; // Update prev for next iteration
        }
    }
    
    return dp[m];
}

// Usage example
public static void main(String[] args) {
    String text1 = "ABCBDAB";
    String text2 = "BDCABA";
    
    System.out.println("Length of LCS (tabulation): " + 
                      lcsTabulation(text1, text2));
                      
    System.out.println("Length of LCS (optimized tabulation): " + 
                      lcsTabulationOptimized(text1, text2));
                      
    System.out.println("Length of LCS (highly optimized): " + 
                      lcsTabulationHighlyOptimized(text1, text2));
}`,
          explanation: "The tabulation approach builds the solution iteratively from the bottom up. The standard implementation uses an O(m*n) DP table. The space-optimized version reduces this to O(min(m,n)) by only keeping track of the current and previous rows. The highly optimized version further reduces this to use just a single row, but it's more complex to understand and implement correctly."
        }
      ]
    },
    {
      title: "Finding the LCS String",
      content: "So far, we've focused on finding the length of the LCS. Often, we want to find the actual LCS string itself. We can do this by backtracking through the DP table to reconstruct the sequence.",
      codeExamples: [
        {
          language: "java",
          code: `// Function to find the actual LCS string
static String findLCSString(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Create DP table
    int[][] dp = new int[m+1][n+1];
    
    // Fill the DP table using the same logic as before
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    // Backtrack to find the LCS string
    int lcsLength = dp[m][n];
    char[] lcs = new char[lcsLength];
    
    // Start from the bottom-right cell
    int i = m, j = n, index = lcsLength - 1;
    
    while (i > 0 && j > 0) {
        // If current characters match, they are part of LCS
        if (text1.charAt(i-1) == text2.charAt(j-1)) {
            lcs[index] = text1.charAt(i-1);
            i--;
            j--;
            index--;
        }
        // Move in the direction of larger value
        else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return new String(lcs);
}

// Alternative approach using StringBuilder
static String findLCSStringBuilder(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Create and fill DP table (same as before)
    int[][] dp = new int[m+1][n+1];
    // ... (fill dp table)
    
    // Use StringBuilder for efficient string construction
    StringBuilder lcsBuilder = new StringBuilder();
    
    // Start from the bottom-right cell
    int i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (text1.charAt(i-1) == text2.charAt(j-1)) {
            lcsBuilder.append(text1.charAt(i-1));
            i--;
            j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    
    // Reverse the StringBuilder since we built the LCS from end to start
    return lcsBuilder.reverse().toString();
}

// Usage example
public static void main(String[] args) {
    String text1 = "ABCBDAB";
    String text2 = "BDCABA";
    
    System.out.println("LCS string: " + findLCSString(text1, text2));
    // Output: "BCBA"
}`,
          explanation: "To find the actual LCS string, we first compute the DP table as before to find the length. Then, we backtrack from the bottom-right cell, tracing the path that led to the optimal solution. When characters match, we include them in the LCS and move diagonally up-left. Otherwise, we move in the direction of the larger value (up or left). Since we build the string from the end, we either need to construct it in reverse order or reverse it at the end."
        }
      ]
    },
    {
      title: "LCS Variations and Applications",
      content: "The LCS problem has several important variations and applications in real-world scenarios. Let's explore some of these.",
      codeExamples: [
        {
          language: "java",
          code: `// Longest Common Substring (contiguous subsequence)
static int longestCommonSubstring(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int maxLength = 0;
    
    // Create DP table
    int[][] dp = new int[m+1][n+1];
    
    // Fill the DP table
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i][j] = 1 + dp[i-1][j-1];
                maxLength = Math.max(maxLength, dp[i][j]);
            } else {
                dp[i][j] = 0; // Reset when characters don't match
            }
        }
    }
    
    return maxLength;
}

// Longest Palindromic Subsequence (LPS)
// LPS(s) = LCS(s, reverse(s))
static int longestPalindromicSubsequence(String s) {
    StringBuilder sb = new StringBuilder(s);
    String reversed = sb.reverse().toString();
    
    return lcsTabulation(s, reversed);
}

// Shortest Common Supersequence (SCS)
// SCS combines two strings so that both are subsequences
static int shortestCommonSupersequence(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Length of SCS = m + n - LCS
    int lcsLength = lcsTabulation(text1, text2);
    
    return m + n - lcsLength;
}

// Find the SCS string
static String findSCSString(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    
    // Fill the DP table (same as LCS)
    int[][] dp = new int[m+1][n+1];
    // ... (fill dp table as in LCS)
    
    // Backtrack to construct SCS
    StringBuilder scs = new StringBuilder();
    int i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (text1.charAt(i-1) == text2.charAt(j-1)) {
            // Common character, add once
            scs.append(text1.charAt(i-1));
            i--;
            j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            // Move up, add character from text1
            scs.append(text1.charAt(i-1));
            i--;
        } else {
            // Move left, add character from text2
            scs.append(text2.charAt(j-1));
            j--;
        }
    }
    
    // Add remaining characters from either string
    while (i > 0) {
        scs.append(text1.charAt(i-1));
        i--;
    }
    
    while (j > 0) {
        scs.append(text2.charAt(j-1));
        j--;
    }
    
    // Reverse as we built from end to start
    return scs.reverse().toString();
}

// Minimum number of deletions to make a string palindrome
static int minDeletionsToMakePalindrome(String s) {
    // Length of LPS
    int lpsLength = longestPalindromicSubsequence(s);
    
    // Minimum deletions = string length - LPS length
    return s.length() - lpsLength;
}

// Minimum number of insertions to make a string palindrome
static int minInsertionsToMakePalindrome(String s) {
    // Same as minimum deletions
    return minDeletionsToMakePalindrome(s);
}

// Computing diff between two strings (like git diff)
static void printDiff(String text1, String text2) {
    // First, compute LCS
    String lcs = findLCSString(text1, text2);
    
    int i = 0, j = 0, k = 0;
    
    // Traverse both strings and LCS simultaneously
    while (i < text1.length() && j < text2.length() && k < lcs.length()) {
        if (text1.charAt(i) == lcs.charAt(k) && text2.charAt(j) == lcs.charAt(k)) {
            // Common character
            System.out.println(" " + text1.charAt(i));
            i++;
            j++;
            k++;
        } else if (text1.charAt(i) != lcs.charAt(k)) {
            // Character only in text1 (deletion)
            System.out.println("-" + text1.charAt(i));
            i++;
        } else if (text2.charAt(j) != lcs.charAt(k)) {
            // Character only in text2 (addition)
            System.out.println("+" + text2.charAt(j));
            j++;
        }
    }
    
    // Print remaining characters
    while (i < text1.length()) {
        System.out.println("-" + text1.charAt(i++));
    }
    
    while (j < text2.length()) {
        System.out.println("+" + text2.charAt(j++));
    }
}`,
          explanation: "This code showcases various LCS-related problems. Longest Common Substring requires consecutive matches and resets when characters don't match. Longest Palindromic Subsequence is the LCS between a string and its reverse. Shortest Common Supersequence is the smallest string that contains both input strings as subsequences. The diff computation is similar to what version control systems do, showing additions, deletions, and unchanged parts between two strings."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "lcs-hw1",
      question: "Implement a function to find the Longest Increasing Subsequence (LIS) of an array of integers. The LIS is a subsequence that is strictly increasing.",
      solution: "The LIS problem can be solved using DP. Create a table where dp[i] is the length of the LIS ending at index i. For each index i, check all previous indices j and update dp[i] = max(dp[i], dp[j] + 1) if nums[i] > nums[j]. The overall LIS length is the maximum value in the dp array. Time complexity: O(n²)."
    },
    {
      id: "lcs-hw2",
      question: "Given two strings str1 and str2, find the length of the longest common substring. Unlike subsequence, a substring must be contiguous.",
      solution: "Similar to LCS but reset when characters don't match. Use a DP table where dp[i][j] is the length of the longest common suffix for substrings ending at positions i-1 and j-1. If characters match, dp[i][j] = dp[i-1][j-1] + 1, else dp[i][j] = 0. The answer is the maximum value in the DP table."
    },
    {
      id: "lcs-hw3",
      question: "Implement a solution to find the Longest Common Subsequence of three strings (LCS3).",
      solution: "Extend the LCS approach to three dimensions. Create a 3D DP table where dp[i][j][k] represents the LCS length for prefixes of the three strings. Use recurrence relation: if all three characters match, dp[i][j][k] = dp[i-1][j-1][k-1] + 1; otherwise, take the maximum of the three possibilities: excluding one of the strings."
    },
    {
      id: "lcs-hw4",
      question: "Given a string s, find the minimum number of characters to be inserted to convert it to a palindrome.",
      solution: "Find the Longest Palindromic Subsequence (LPS) of the string. The minimum number of insertions needed is the difference between the string length and the LPS length. This works because we need to insert characters to match those not part of the LPS."
    }
  ],
  
  quiz: [
    {
      id: "lcs-q1",
      question: "What is the time complexity of the dynamic programming solution for finding the Longest Common Subsequence of two strings of lengths m and n?",
      options: ["O(m + n)", "O(m * n)", "O(m * n * min(m, n))", "O(2^(m + n))"],
      correctAnswer: 1,
      explanation: "The dynamic programming solution for LCS has a time complexity of O(m * n) because we need to fill a 2D table of size (m+1) × (n+1), where each cell takes constant time to compute."
    },
    {
      id: "lcs-q2",
      question: "Which of the following problems can be solved using the Longest Common Subsequence algorithm?",
      options: [
        "Finding the shortest path in a graph",
        "Finding the minimum edit distance between two strings",
        "Finding the maximum flow in a network",
        "Finding the convex hull of a set of points"
      ],
      correctAnswer: 1,
      explanation: "The minimum edit distance problem (also known as the Levenshtein distance) can be solved using a variation of the LCS algorithm. The edit distance is related to the LCS: edit_distance(s1, s2) = |s1| + |s2| - 2*LCS(s1, s2) when only insertions and deletions are allowed."
    },
    {
      id: "lcs-q3",
      question: "What is the relationship between the Longest Palindromic Subsequence (LPS) of a string s and the Longest Common Subsequence (LCS)?",
      options: [
        "LPS(s) = LCS(s, reverse(s))",
        "LPS(s) = LCS(s, s)",
        "LPS(s) = LCS(s[0...n/2], s[n/2...n])",
        "There is no direct relationship between LPS and LCS"
      ],
      correctAnswer: 0,
      explanation: "The Longest Palindromic Subsequence (LPS) of a string s is equivalent to the Longest Common Subsequence (LCS) of s and its reverse. This is because a palindrome reads the same forward and backward, so any palindromic subsequence must appear in both the original string and its reverse."
    },
    {
      id: "lcs-q4",
      question: "In the context of the LCS problem, what is the recurrence relation for the dynamic programming solution when characters at positions i and j match?",
      options: [
        "dp[i][j] = dp[i-1][j-1] + 1",
        "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
        "dp[i][j] = dp[i-1][j-1]",
        "dp[i][j] = dp[i-1][j-1] + dp[i-1][j] + dp[i][j-1]"
      ],
      correctAnswer: 0,
      explanation: "When characters at positions i-1 and j-1 match (using 0-indexed strings), we can include this character in the LCS and add 1 to the LCS of the prefixes excluding these characters. This gives us the recurrence relation dp[i][j] = dp[i-1][j-1] + 1."
    },
    {
      id: "lcs-q5",
      question: "What is the space-optimized approach to solving the LCS problem?",
      options: [
        "Using a single 1D array of size min(m, n)",
        "Using two 1D arrays of size min(m, n) each",
        "Using a hashmap to store only non-zero entries",
        "The LCS problem cannot be space-optimized below O(m*n)"
      ],
      correctAnswer: 1,
      explanation: "We can optimize the space complexity of the LCS algorithm to O(min(m, n)) by using just two rows of the DP table instead of the entire table. We keep track of the current row and the previous row, as each cell depends only on the current row to the left and the previous row diagonally up-left and directly above."
    }
  ],
  
  practice: {
    introduction: "These practice problems will help you reinforce your understanding of the Longest Common Subsequence and related string matching algorithms. Work through these problems to strengthen your ability to identify optimal substructure in sequence-based problems and implement efficient dynamic programming solutions.",
    questions: {
      easy: [
        {
          id: "lcs-easy-1",
          title: "Longest Common Subsequence",
          link: "https://leetcode.com/problems/longest-common-subsequence/",
          description: "Given two strings text1 and text2, return the length of their longest common subsequence. This is the core LCS problem we studied in the lesson."
        },
        {
          id: "lcs-easy-2",
          title: "Is Subsequence",
          link: "https://leetcode.com/problems/is-subsequence/",
          description: "Given two strings s and t, determine if s is a subsequence of t. This is a simplification of the LCS problem where you only need to verify if one string is a subsequence of another."
        },
        {
          id: "lcs-easy-3",
          title: "Delete Operation for Two Strings",
          link: "https://leetcode.com/problems/delete-operation-for-two-strings/",
          description: "Find the minimum number of characters you need to delete to make two strings equal. This can be solved by finding the LCS and then calculating the deletions needed."
        }
      ],
      medium: [
        {
          id: "lcs-medium-1",
          title: "Longest Palindromic Subsequence",
          link: "https://leetcode.com/problems/longest-palindromic-subsequence/",
          description: "Given a string s, find the longest palindromic subsequence. This can be solved by finding the LCS of the string and its reverse."
        },
        {
          id: "lcs-medium-2",
          title: "Uncrossed Lines",
          link: "https://leetcode.com/problems/uncrossed-lines/",
          description: "You are given two integer arrays. You can draw a line connecting values in each array without crossing lines. The maximum number of such lines is equivalent to finding the LCS."
        },
        {
          id: "lcs-medium-3",
          title: "Minimum ASCII Delete Sum for Two Strings",
          link: "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/",
          description: "Given two strings, find the lowest ASCII sum of deleted characters to make the two strings equal. This requires a variation of the LCS algorithm."
        },
        {
          id: "lcs-medium-4",
          title: "Shortest Common Supersequence",
          link: "https://leetcode.com/problems/shortest-common-supersequence/",
          description: "Find the shortest string that has both strings as subsequences. You'll need to apply LCS knowledge and reconstruct the supersequence."
        }
      ],
      hard: [
        {
          id: "lcs-hard-1",
          title: "Distinct Subsequences",
          link: "https://leetcode.com/problems/distinct-subsequences/",
          description: "Given two strings s and t, count the number of distinct subsequences of s which equals t. This requires a more complex DP approach based on LCS principles."
        },
        {
          id: "lcs-hard-2",
          title: "Edit Distance",
          link: "https://leetcode.com/problems/edit-distance/",
          description: "Given two strings, calculate the minimum number of operations required to convert one string to another. Operations include insertion, deletion, and substitution."
        },
        {
          id: "lcs-hard-3",
          title: "Regular Expression Matching",
          link: "https://leetcode.com/problems/regular-expression-matching/",
          description: "Implement regular expression matching with support for '.' and '*'. While more complex than basic LCS, it uses similar DP concepts for string pattern matching."
        }
      ]
    }
  }
};

export default lcsContent; 