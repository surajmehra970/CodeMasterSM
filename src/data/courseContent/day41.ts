import { Content } from '@/types/course';

const editDistanceContent: Content = {
  introduction: "Edit Distance is a fundamental string manipulation problem that measures the minimum number of operations required to transform one string into another. These operations typically include insertion, deletion, and substitution of characters. Also known as the Levenshtein Distance, this algorithm has wide-ranging applications in spell checking, DNA sequence alignment, plagiarism detection, and natural language processing. Understanding edit distance is essential for developing efficient string comparison algorithms.",
  
  learningObjectives: [
    "Understand the concept of edit distance and its applications",
    "Implement the edit distance algorithm using dynamic programming",
    "Analyze the time and space complexity of edit distance calculations",
    "Apply optimizations to the basic algorithm for improved efficiency",
    "Explore variations of the edit distance problem and their solutions"
  ],
  
  sections: [
    {
      title: "Understanding Edit Distance",
      content: "Edit distance quantifies how dissimilar two strings are by counting the minimum number of operations required to transform one string into another. The standard operations allowed are: insertion (adding a character), deletion (removing a character), and substitution (replacing one character with another). In some variations, different costs may be assigned to different operations, or additional operations like transposition (swapping adjacent characters) might be allowed.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Example of transforming "kitten" to "sitting" using the fewest operations:
1. kitten → sitten (substitute 'k' with 's')
2. sitten → sittin (substitute 'e' with 'i')
3. sittin → sitting (insert 'g' at the end)

Total edit distance: 3 operations
*/

// Another example: "sunday" to "saturday"
/*
1. sunday → sunady (insert 'a' after 'n')
2. sunady → satuday (substitute 'n' with 't')
3. satuday → saturday (insert 'r' after 'u')

Total edit distance: 3 operations
*/`,
          explanation: "These examples illustrate how edit distance is calculated between pairs of strings. Each operation (insertion, deletion, or substitution) increments the distance by 1. The goal is to find the sequence of operations that minimizes the total number of changes needed."
        }
      ]
    },
    {
      title: "Dynamic Programming Solution",
      content: "The edit distance problem can be efficiently solved using dynamic programming. We create a 2D table where dp[i][j] represents the minimum number of operations required to transform the first i characters of string1 into the first j characters of string2. The solution builds up from the base cases and fills the table iteratively.",
      codeExamples: [
        {
          language: "java",
          code: `// Bottom-up dynamic programming approach for edit distance
public int editDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    // Create a table to store results of subproblems
    int[][] dp = new int[m + 1][n + 1];
    
    // Fill dp table in bottom-up fashion
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            // If first string is empty, only option is to insert all characters of second string
            if (i == 0) {
                dp[i][j] = j;
            }
            // If second string is empty, only option is to delete all characters of first string
            else if (j == 0) {
                dp[i][j] = i;
            }
            // If last characters are the same, ignore the last character and recur for remaining
            else if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            // If the last characters are different, consider all possibilities and find minimum
            else {
                dp[i][j] = 1 + Math.min(
                    Math.min(
                        dp[i - 1][j],    // Delete
                        dp[i][j - 1]     // Insert
                    ),
                    dp[i - 1][j - 1]     // Replace
                );
            }
        }
    }
    
    return dp[m][n];
}`,
          explanation: "This algorithm uses dynamic programming to solve the edit distance problem. We build a table dp where dp[i][j] represents the minimum number of operations needed to convert the first i characters of word1 to the first j characters of word2. For each cell, we consider three operations: insertion, deletion, and substitution, taking the minimum of these three possibilities. The time complexity is O(m×n) and the space complexity is also O(m×n), where m and n are the lengths of the two strings."
        }
      ]
    },
    {
      title: "Space Optimization",
      content: "The standard dynamic programming solution for edit distance requires O(m×n) space, which can be optimized to O(min(m,n)) since we only need the previous row to calculate the current row's values. This optimization is particularly useful when dealing with very long strings.",
      codeExamples: [
        {
          language: "java",
          code: `// Space-optimized edit distance calculation
public int editDistanceOptimized(String word1, String word2) {
    // Ensure word1 is the shorter string for optimization
    if (word1.length() > word2.length()) {
        String temp = word1;
        word1 = word2;
        word2 = temp;
    }
    
    int m = word1.length();
    int n = word2.length();
    
    // Create two arrays for storing previous and current row
    int[] prevRow = new int[m + 1];
    int[] currRow = new int[m + 1];
    
    // Initialize the previous row (base case)
    for (int i = 0; i <= m; i++) {
        prevRow[i] = i;
    }
    
    // Fill the dp table row by row
    for (int j = 1; j <= n; j++) {
        currRow[0] = j;
        
        for (int i = 1; i <= m; i++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                currRow[i] = prevRow[i - 1];
            } else {
                currRow[i] = 1 + Math.min(
                    Math.min(
                        prevRow[i],      // Delete
                        currRow[i - 1]   // Insert
                    ),
                    prevRow[i - 1]       // Replace
                );
            }
        }
        
        // Swap current and previous rows
        int[] temp = prevRow;
        prevRow = currRow;
        currRow = temp;
    }
    
    return prevRow[m];
}`,
          explanation: "This optimized implementation reduces the space complexity from O(m×n) to O(min(m,n)) by only keeping track of the current and previous rows of the DP table. Since each cell only depends on the current row to the left and the previous row, we don't need to store the entire table. After computing each row, we swap the current and previous rows and reuse the arrays. The time complexity remains O(m×n)."
        }
      ]
    },
    {
      title: "Backtracking and Reconstruction",
      content: "Sometimes it's not enough to know just the edit distance; we need to know the actual sequence of operations that achieves the minimum distance. By backtracking through the DP table, we can reconstruct the optimal sequence of edit operations.",
      codeExamples: [
        {
          language: "java",
          code: `// Edit distance with operation reconstruction
public List<String> getEditOperations(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    // Create a table to store results of subproblems
    int[][] dp = new int[m + 1][n + 1];
    
    // Fill dp table
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    Math.min(dp[i - 1][j], dp[i][j - 1]),
                    dp[i - 1][j - 1]
                );
            }
        }
    }
    
    // Backtrack to find the operations
    List<String> operations = new ArrayList<>();
    int i = m, j = n;
    
    while (i > 0 || j > 0) {
        // If characters are the same, no operation needed
        if (i > 0 && j > 0 && word1.charAt(i - 1) == word2.charAt(j - 1)) {
            i--;
            j--;
        }
        // Substitute
        else if (i > 0 && j > 0 && dp[i][j] == dp[i - 1][j - 1] + 1) {
            operations.add("Replace " + word1.charAt(i - 1) + " with " + word2.charAt(j - 1));
            i--;
            j--;
        }
        // Delete
        else if (i > 0 && dp[i][j] == dp[i - 1][j] + 1) {
            operations.add("Delete " + word1.charAt(i - 1));
            i--;
        }
        // Insert
        else {
            operations.add("Insert " + word2.charAt(j - 1));
            j--;
        }
    }
    
    // Reverse the list to get operations in correct order
    Collections.reverse(operations);
    return operations;
}`,
          explanation: "This code not only calculates the edit distance but also reconstructs the sequence of operations that achieves this minimum distance. After filling the DP table, we backtrack from the bottom-right corner (dp[m][n]) to the top-left corner (dp[0][0]), determining at each step which operation was used to achieve the minimum distance. The result is a list of operations in the order they should be applied to transform word1 into word2."
        }
      ]
    },
    {
      title: "Applications and Variations",
      content: "Edit distance has numerous applications across different domains. Variations of the edit distance problem include assigning different costs to different operations, allowing additional operations like transposition, or restricting the types of operations allowed.",
      codeExamples: [
        {
          language: "java",
          code: `// Damerau-Levenshtein distance (allows transpositions)
public int damerauLevenshteinDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    
    for (int j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            int cost = (word1.charAt(i - 1) == word2.charAt(j - 1)) ? 0 : 1;
            
            dp[i][j] = Math.min(
                Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                dp[i - 1][j - 1] + cost
            );
            
            // Check for transposition (adjacent characters swapped)
            if (i > 1 && j > 1 && 
                word1.charAt(i - 1) == word2.charAt(j - 2) && 
                word1.charAt(i - 2) == word2.charAt(j - 1)) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
            }
        }
    }
    
    return dp[m][n];
}`,
          explanation: "The Damerau-Levenshtein distance extends the standard edit distance by allowing an additional operation: transposition (swapping adjacent characters). This is particularly useful in applications like spell checking, where transposition errors are common typing mistakes. The implementation follows the same dynamic programming approach but includes an additional check for transpositions when filling the DP table."
        },
        {
          language: "java",
          code: `// Spell checker using edit distance
public List<String> suggestCorrections(String misspelledWord, Set<String> dictionary, int maxDistance) {
    List<String> suggestions = new ArrayList<>();
    
    for (String word : dictionary) {
        int distance = editDistance(misspelledWord, word);
        if (distance <= maxDistance) {
            suggestions.add(word);
        }
    }
    
    // Sort suggestions by edit distance
    suggestions.sort((a, b) -> editDistance(misspelledWord, a) - editDistance(misspelledWord, b));
    
    return suggestions;
}`,
          explanation: "This is a practical application of edit distance for spell checking. Given a misspelled word, we compare it against each word in a dictionary and suggest corrections that are within a certain distance threshold. By sorting the suggestions based on their edit distance from the misspelled word, we present the most likely corrections first."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "edit-dist-hw1",
      question: "Implement a function to find the longest common subsequence (LCS) between two strings. The LCS is a sequence of characters that appear in the same order in both strings, but not necessarily consecutively.",
      solution: "Create a 2D DP table where dp[i][j] is the length of LCS of the first i characters of string1 and first j characters of string2. If the current characters match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). The final answer is dp[m][n]. To reconstruct the LCS, backtrack through the table starting from dp[m][n]."
    },
    {
      id: "edit-dist-hw2",
      question: "Modify the edit distance algorithm to assign different costs to different operations: cost of insertion = 1, cost of deletion = 2, and cost of substitution = 3.",
      solution: "Use the same DP approach, but when computing dp[i][j], use the different costs: dp[i][j] = min(dp[i-1][j] + 2 for deletion, dp[i][j-1] + 1 for insertion, dp[i-1][j-1] + 3 for substitution if characters differ). If characters match, dp[i][j] = dp[i-1][j-1] with no additional cost."
    },
    {
      id: "edit-dist-hw3",
      question: "Implement a function to find the minimum edit distance between two strings when only insertion and deletion operations are allowed (no substitutions).",
      solution: "This is equivalent to finding the length of the longest common subsequence (LCS) and then computing: (length of string1 - LCS) + (length of string2 - LCS). The first term represents the number of deletions needed, and the second term represents the number of insertions needed."
    },
    {
      id: "edit-dist-hw4",
      question: "Given a set of strings, find a center string that minimizes the sum of edit distances to all other strings in the set.",
      solution: "This is a variation of the 'median string' problem. For small sets, you can compute the sum of edit distances from each string to all others and pick the one with the minimum sum. For larger sets, heuristic approaches like iteratively improving a candidate string by making edits that reduce the total distance may be more efficient."
    }
  ],
  
  quiz: [
    {
      id: "edit-dist-q1",
      question: "What is the time complexity of the standard dynamic programming solution for calculating edit distance between two strings of lengths m and n?",
      options: ["O(m + n)", "O(m * n)", "O(max(m, n))", "O(m * n * log(n))"],
      correctAnswer: 1,
      explanation: "The standard dynamic programming solution for edit distance requires filling a 2D table of size (m+1) × (n+1), where each cell takes constant time to compute. Therefore, the time complexity is O(m * n)."
    },
    {
      id: "edit-dist-q2",
      question: "Which of the following is NOT a standard operation in the basic edit distance (Levenshtein distance) calculation?",
      options: ["Insertion", "Deletion", "Substitution", "Transposition"],
      correctAnswer: 3,
      explanation: "The basic Levenshtein distance considers three operations: insertion, deletion, and substitution. Transposition (swapping adjacent characters) is not part of the standard edit distance but is included in the Damerau-Levenshtein distance, which is an extension of the basic algorithm."
    },
    {
      id: "edit-dist-q3",
      question: "What is the minimum edit distance between the strings 'horse' and 'ros'?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "The minimum edit distance between 'horse' and 'ros' is 3. One possible sequence of operations is: 1) Delete 'h' -> 'orse', 2) Delete 'e' -> 'ors', 3) Replace 'o' with 'r' -> 'rrs', 4) Delete 's' -> 'ros'."
    },
    {
      id: "edit-dist-q4",
      question: "How can the space complexity of the edit distance algorithm be optimized?",
      options: [
        "It cannot be optimized below O(m*n)",
        "It can be reduced to O(min(m,n)) by only storing two rows",
        "It can be reduced to O(log(m*n)) using divide-and-conquer",
        "It can be reduced to O(1) using a greedy approach"
      ],
      correctAnswer: 1,
      explanation: "The space complexity of the edit distance algorithm can be optimized from O(m*n) to O(min(m,n)) by only storing the current and previous rows of the DP table. Since each cell's computation only depends on the current row to the left and the previous row, we don't need to store the entire table."
    },
    {
      id: "edit-dist-q5",
      question: "Which of the following is a practical application of edit distance?",
      options: [
        "Finding the shortest path in a graph",
        "Spell checking and correction",
        "Sorting an array efficiently",
        "Balancing a binary search tree"
      ],
      correctAnswer: 1,
      explanation: "Spell checking and correction is a practical application of edit distance. By calculating the edit distance between a potentially misspelled word and dictionary words, a spell checker can suggest corrections that are within a certain distance threshold, effectively identifying words that are likely intended by the user."
    }
  ],
  practice: {
    introduction: "Practice the Edit Distance algorithm with these LeetCode problems. They will help reinforce your understanding of dynamic programming for string manipulation and various applications of edit distance concepts.",
    questions: {
      easy: [
        {
          id: "ed-easy-1",
          title: "Student Attendance Record I",
          link: "https://leetcode.com/problems/student-attendance-record-i/",
          description: "Determine if a student can be awarded based on attendance record, checking for absences and consecutive late days. This problem involves string pattern matching similar to edit distance concepts."
        },
        {
          id: "ed-easy-2",
          title: "Delete Characters to Make Fancy String",
          link: "https://leetcode.com/problems/delete-characters-to-make-fancy-string/",
          description: "Transform a string by removing characters to ensure no three identical consecutive characters exist. This involves string transformation similar to edit operations."
        },
        {
          id: "ed-easy-3",
          title: "Longest Uncommon Subsequence I",
          link: "https://leetcode.com/problems/longest-uncommon-subsequence-i/",
          description: "Find the length of the longest string that is a subsequence of one string but not the other, applying concepts related to subsequence identification."
        }
      ],
      medium: [
        {
          id: "ed-medium-1",
          title: "One Edit Distance",
          link: "https://leetcode.com/problems/one-edit-distance/",
          description: "Determine if two strings are exactly one edit operation away from each other, directly applying the edit distance algorithm with a constraint."
        },
        {
          id: "ed-medium-2",
          title: "Delete Operation for Two Strings",
          link: "https://leetcode.com/problems/delete-operation-for-two-strings/",
          description: "Find the minimum number of deletions needed to make two strings equal, which is a variation of the edit distance problem with only deletion operations allowed."
        },
        {
          id: "ed-medium-3",
          title: "Minimum ASCII Delete Sum for Two Strings",
          link: "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/",
          description: "Calculate the lowest ASCII sum of deleted characters to make two strings equal, combining edit distance with character values."
        },
        {
          id: "ed-medium-4",
          title: "Longest Common Subsequence",
          link: "https://leetcode.com/problems/longest-common-subsequence/",
          description: "Find the length of the longest subsequence common to two strings, which is closely related to edit distance as it forms part of the solution approach."
        }
      ],
      hard: [
        {
          id: "ed-hard-1",
          title: "Edit Distance",
          link: "https://leetcode.com/problems/edit-distance/",
          description: "The classic problem of calculating the minimum number of operations required to convert one string to another, implementing the full edit distance algorithm."
        },
        {
          id: "ed-hard-2",
          title: "Minimum Window Subsequence",
          link: "https://leetcode.com/problems/minimum-window-subsequence/",
          description: "Find the minimum contiguous substring of one string that contains all characters of another string as a subsequence, requiring advanced string manipulation concepts."
        },
        {
          id: "ed-hard-3",
          title: "Regular Expression Matching",
          link: "https://leetcode.com/problems/regular-expression-matching/",
          description: "Implement regular expression matching with support for '.' and '*', a complex string matching problem that can be solved using DP approaches similar to edit distance."
        }
      ]
    }
  }
};

export default editDistanceContent; 