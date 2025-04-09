import { Content } from '@/types/course';

const lisContent: Content = {
  introduction: "The Longest Increasing Subsequence (LIS) is a classic problem in dynamic programming that involves finding the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order. Unlike contiguous subarrays, subsequences allow for elements to be skipped, but the relative order must be maintained. This problem has numerous applications in fields like bioinformatics for sequence alignment, text analysis for finding patterns, and in optimization problems where order relationships must be preserved.",
  
  learningObjectives: [
    "Understand the concept of subsequences and increasing subsequences",
    "Implement a quadratic time dynamic programming solution for LIS",
    "Optimize the solution to O(n log n) using binary search",
    "Apply LIS concepts to solve related problems",
    "Analyze space and time complexity tradeoffs in LIS algorithms"
  ],
  
  sections: [
    {
      title: "Understanding the LIS Problem",
      content: "A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. An increasing subsequence is a subsequence where each element is greater than the previous one. The Longest Increasing Subsequence (LIS) is the increasing subsequence with the maximum length. Unlike subarray problems, LIS does not require the elements to be contiguous.",
      codeExamples: [
        {
          language: "java",
          code: `// Example of identifying subsequences
int[] arr = {10, 22, 9, 33, 21, 50, 41, 60, 80};

/*
Some increasing subsequences:
- [10, 22, 33, 50, 60, 80] (length 6)
- [10, 22, 33, 41, 60, 80] (length 6)
- [10, 22, 33, 50, 60] (length 5)
- [9, 21, 41, 60, 80] (length 5)

The LIS is either [10, 22, 33, 50, 60, 80] or [10, 22, 33, 41, 60, 80] with length 6.
*/`,
          explanation: "This example illustrates the concept of subsequences and specifically increasing subsequences. Note that elements like 9 and 21 can be part of some increasing subsequences but not necessarily the longest one. Also, multiple LIS of the same length can exist."
        }
      ]
    },
    {
      title: "Dynamic Programming Approach - O(n²)",
      content: "The standard dynamic programming approach to the LIS problem involves creating an array dp[], where dp[i] represents the length of the longest increasing subsequence ending at index i. For each position, we look back at all previous positions to find values smaller than the current one and update our dp[i] accordingly.",
      codeExamples: [
        {
          language: "java",
          code: `// O(n²) Dynamic Programming solution for LIS
public int lengthOfLIS(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int n = nums.length;
    int[] dp = new int[n];
    
    // Initialize with 1 as minimum LIS length is 1
    Arrays.fill(dp, 1);
    
    int maxLength = 1;
    
    // Fill dp[] in bottom-up manner
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            // If current element is greater than previous element
            if (nums[i] > nums[j]) {
                // Update dp[i] if including nums[j] gives a longer subsequence
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // Update the maximum LIS length seen so far
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}`,
          explanation: "This implementation uses a bottom-up DP approach. For each element nums[i], we compare it with all previous elements nums[j] where j < i. If nums[i] > nums[j], we can potentially extend the LIS ending at j by including nums[i]. We take the maximum of all such possibilities to determine dp[i]. The time complexity is O(n²) and space complexity is O(n)."
        },
        {
          language: "java",
          code: `// Printing the actual Longest Increasing Subsequence
public List<Integer> printLIS(int[] nums) {
    if (nums == null || nums.length == 0) {
        return new ArrayList<>();
    }
    
    int n = nums.length;
    int[] dp = new int[n];
    int[] prevIndex = new int[n]; // To track previous index in the LIS
    
    Arrays.fill(dp, 1);
    Arrays.fill(prevIndex, -1);
    
    int maxLength = 1;
    int endIndex = 0;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prevIndex[i] = j;
            }
        }
        
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct the LIS
    List<Integer> lis = new ArrayList<>();
    while (endIndex != -1) {
        lis.add(0, nums[endIndex]); // Add to front to maintain order
        endIndex = prevIndex[endIndex];
    }
    
    return lis;
}`,
          explanation: "This extension of the basic DP approach not only calculates the length of the LIS but also reconstructs the actual subsequence. We use an additional array prevIndex[] to keep track of the previous index in the LIS for each position. When we update dp[i], we also update prevIndex[i]. After finding the maximum length, we trace back through prevIndex[] to reconstruct the LIS."
        }
      ]
    },
    {
      title: "Optimized Approach - O(n log n)",
      content: "The O(n²) approach can be optimized to O(n log n) using a more efficient algorithm that maintains an array of the smallest possible values for each position in the subsequence. The key insight is that we want to keep the sequence as small as possible at each step to maximize our ability to add more elements.",
      codeExamples: [
        {
          language: "java",
          code: `// O(n log n) solution for LIS using binary search
public int lengthOfLIS_Optimized(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int n = nums.length;
    // tails[i] stores the smallest tail of all increasing subsequences of length i+1
    int[] tails = new int[n];
    int length = 0;
    
    for (int num : nums) {
        // Binary search to find the position to insert the current element
        int left = 0, right = length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        // Update tails if position is found
        tails[left] = num;
        
        // If we're appending to the end, update length
        if (left == length) {
            length++;
        }
    }
    
    return length;
}`,
          explanation: "This algorithm maintains an array 'tails' where tails[i] is the smallest value that concludes an increasing subsequence of length i+1. For each number in the array, we use binary search to find the suitable position to insert it. If the number is greater than all tails values, we extend the length. Otherwise, we update the appropriate tail. The time complexity is O(n log n) due to the binary search, and space complexity is O(n)."
        }
      ]
    },
    {
      title: "Variations and Extensions",
      content: "The LIS problem has several important variations and extensions that build upon the core concept. These include finding the longest non-decreasing subsequence (allowing equal elements), finding the longest bitonic subsequence (increasing then decreasing), and the 2D version of LIS. Understanding these variations broadens the applicability of the algorithm to more complex problems.",
      codeExamples: [
        {
          language: "java",
          code: `// Longest Non-decreasing Subsequence (allows equal elements)
public int lengthOfLNDS(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    
    int maxLength = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            // Change is here: >= instead of >
            if (nums[i] >= nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}`,
          explanation: "This variation allows for equal elements in the subsequence, making it a non-decreasing sequence rather than strictly increasing. The implementation is almost identical to the standard LIS algorithm, with the only change being the comparison operator (>= instead of >)."
        },
        {
          language: "java",
          code: `// Longest Bitonic Subsequence
// A bitonic sequence increases first, then decreases
public int longestBitonicSubsequence(int[] nums) {
    int n = nums.length;
    if (n == 0) return 0;
    
    // lis[i] = length of longest increasing subsequence ending at index i
    int[] lis = new int[n];
    
    // lds[i] = length of longest decreasing subsequence starting at index i
    int[] lds = new int[n];
    
    // Fill LIS array
    Arrays.fill(lis, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                lis[i] = Math.max(lis[i], lis[j] + 1);
            }
        }
    }
    
    // Fill LDS array
    Arrays.fill(lds, 1);
    for (int i = n - 2; i >= 0; i--) {
        for (int j = n - 1; j > i; j--) {
            if (nums[i] > nums[j]) {
                lds[i] = Math.max(lds[i], lds[j] + 1);
            }
        }
    }
    
    // Find the maximum length of lis[i] + lds[i] - 1
    int maxLength = 0;
    for (int i = 0; i < n; i++) {
        maxLength = Math.max(maxLength, lis[i] + lds[i] - 1);
    }
    
    return maxLength;
}`,
          explanation: "A bitonic subsequence increases first and then decreases. To find the longest such subsequence, we compute both the longest increasing subsequence (LIS) ending at each position and the longest decreasing subsequence (LDS) starting from each position. Then, for each position i, the length of the longest bitonic subsequence with peak at i is LIS[i] + LDS[i] - 1 (we subtract 1 because the peak element is counted twice). The maximum of these values gives us the longest bitonic subsequence."
        },
        {
          language: "java",
          code: `// Longest Chain of Pairs (LIS variation)
// Given pairs (a,b), sort by first element and find LIS based on second element
public int findLongestChain(int[][] pairs) {
    if (pairs == null || pairs.length == 0) return 0;
    
    // Sort pairs by first element
    Arrays.sort(pairs, (a, b) -> a[0] - b[0]);
    
    int n = pairs.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    
    int maxLength = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            // Chain can be formed if pairs[i][0] > pairs[j][1]
            if (pairs[i][0] > pairs[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}`,
          explanation: "This is a variation of LIS where we're working with pairs of integers. We sort the pairs by their first element and then find the longest increasing subsequence based on the second element. The condition for chaining pairs (a,b) and (c,d) is that c > b. This approach is useful in problems involving intervals or ranges."
        }
      ]
    },
    {
      title: "Applications and Real-world Problems",
      content: "The LIS problem has numerous applications in real-world scenarios. These include sequence alignment in bioinformatics, optimization problems in resource allocation, and pattern recognition in time-series data. Understanding how to apply LIS concepts can help solve complex real-world problems efficiently.",
      codeExamples: [
        {
          language: "java",
          code: `// Application: Building Bridges Problem
// Given positions of cities on two sides of a river, find the maximum
// number of bridges that can be built without crossing
public int maxBridges(int[] north, int[] south) {
    int n = north.length;
    
    // Create pairs of matching cities
    int[][] bridges = new int[n][2];
    for (int i = 0; i < n; i++) {
        bridges[i][0] = north[i];
        bridges[i][1] = south[i];
    }
    
    // Sort by north side positions
    Arrays.sort(bridges, (a, b) -> a[0] - b[0]);
    
    // Apply LIS on south side positions
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    
    int maxBridges = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (bridges[i][1] > bridges[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxBridges = Math.max(maxBridges, dp[i]);
    }
    
    return maxBridges;
}`,
          explanation: "The Building Bridges problem involves finding the maximum number of bridges that can be built between cities on opposite sides of a river without crossing. After sorting cities by their positions on one bank, the problem reduces to finding the LIS based on their positions on the other bank. This ensures bridges don't cross each other."
        },
        {
          language: "java",
          code: `// Application: Box Stacking Problem
// Stack boxes on top of each other where box i can be placed on box j
// if both width and depth of box i are smaller than box j
class Box {
    int height, width, depth;
    
    Box(int h, int w, int d) {
        height = h;
        width = w;
        depth = d;
    }
}

public int maxHeight(Box[] boxes) {
    int n = boxes.length;
    
    // Generate all rotations of boxes
    Box[] rotations = new Box[3 * n];
    for (int i = 0; i < n; i++) {
        Box box = boxes[i];
        // Original orientation
        rotations[3 * i] = new Box(box.height, Math.max(box.width, box.depth), 
                                  Math.min(box.width, box.depth));
        // First rotation
        rotations[3 * i + 1] = new Box(box.width, Math.max(box.height, box.depth), 
                                     Math.min(box.height, box.depth));
        // Second rotation
        rotations[3 * i + 2] = new Box(box.depth, Math.max(box.height, box.width), 
                                     Math.min(box.height, box.width));
    }
    
    // Sort by base area in decreasing order
    Arrays.sort(rotations, (a, b) -> (b.width * b.depth) - (a.width * a.depth));
    
    int m = rotations.length;
    int[] dp = new int[m];
    
    // Initialize dp values with box heights
    for (int i = 0; i < m; i++) {
        dp[i] = rotations[i].height;
    }
    
    // Fill dp using LIS concept
    for (int i = 1; i < m; i++) {
        for (int j = 0; j < i; j++) {
            if (rotations[i].width < rotations[j].width && 
                rotations[i].depth < rotations[j].depth) {
                dp[i] = Math.max(dp[i], dp[j] + rotations[i].height);
            }
        }
    }
    
    // Find maximum height
    int maxHeight = 0;
    for (int height : dp) {
        maxHeight = Math.max(maxHeight, height);
    }
    
    return maxHeight;
}`,
          explanation: "The Box Stacking problem involves stacking boxes on top of each other to maximize the total height, where a box can only be placed on top of another if both its width and depth are smaller. We generate all possible rotations of each box, sort them by base area, and then apply a variation of the LIS algorithm to find the maximum stackable height."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "lis-hw1",
      question: "Implement an algorithm to find the Longest Alternating Subsequence (a subsequence in which elements alternate between increasing and decreasing order).",
      solution: "Create two DP arrays: inc[i] for the length of alternating subsequence ending at index i with a higher element, and dec[i] for the length ending with a lower element. For each element nums[i], compare with all previous elements nums[j]. If nums[i] > nums[j], update inc[i] = max(inc[i], dec[j] + 1). If nums[i] < nums[j], update dec[i] = max(dec[i], inc[j] + 1). Return the maximum of all inc[i] and dec[i]."
    },
    {
      id: "lis-hw2",
      question: "Given an array of integers representing job difficulties and an integer k for the maximum number of days, find the minimum difficulty schedule by partitioning the jobs into k days such that each day contains at least one job. The difficulty of a day is the maximum difficulty of all jobs done that day.",
      solution: "Create a 2D DP array where dp[i][j] represents the minimum difficulty to complete the first i jobs in j days. For each day j, try different partitions of the remaining jobs and update dp[i][j] as the minimum of the current day's maximum difficulty plus the optimal solution for the previous jobs in j-1 days."
    },
    {
      id: "lis-hw3",
      question: "Given a matrix of integers, find the length of the longest increasing path in the matrix. You can move in four directions: up, down, left, and right.",
      solution: "Use a memoization approach combined with DFS. Create a memo array of the same size as the matrix. For each cell (i,j), perform DFS to explore all four directions, updating the memo array with the longest path length starting from that cell. Use the condition that the next cell's value must be greater than the current cell's value."
    },
    {
      id: "lis-hw4",
      question: "Implement an algorithm to find the length of the Longest Palyndromic Subsequence (LPS) in a given string. A palyndromic subsequence reads the same backward as forward.",
      solution: "Create a 2D DP array dp[i][j] representing the length of the LPS from index i to j. The base cases are dp[i][i] = 1 for single characters. For each subproblem, if characters at indices i and j match, dp[i][j] = dp[i+1][j-1] + 2. Otherwise, dp[i][j] = max(dp[i+1][j], dp[i][j-1]). Fill the DP table in a bottom-up manner considering all possible lengths."
    }
  ],
  
  quiz: [
    {
      id: "lis-q1",
      question: "What is the time complexity of the standard dynamic programming solution for the Longest Increasing Subsequence problem?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 2,
      explanation: "The standard DP solution for LIS has a time complexity of O(n²) where n is the length of the array. This is because for each position i in the array, we need to look back at all previous positions j from 0 to i-1 to find elements smaller than the current one, resulting in nested loops."
    },
    {
      id: "lis-q2",
      question: "Which of the following is NOT a valid application of the Longest Increasing Subsequence algorithm?",
      options: [
        "Finding the maximum number of bridges that can be built without crossing",
        "Finding the shortest path in a weighted graph",
        "Box stacking to maximize height",
        "Finding the longest chain of pairs"
      ],
      correctAnswer: 1,
      explanation: "Finding the shortest path in a weighted graph is not an application of the LIS algorithm. It requires algorithms like Dijkstra's, Bellman-Ford, or Floyd-Warshall depending on the graph properties. The other options are valid applications of LIS, involving finding optimal sequences with specific ordering constraints."
    },
    {
      id: "lis-q3",
      question: "How does the optimized O(n log n) approach for LIS work?",
      options: [
        "It uses a greedy algorithm that always selects the smallest possible value",
        "It maintains an array of the smallest values that end subsequences of each length",
        "It uses a divide-and-conquer approach to split the problem into smaller subproblems",
        "It applies a sliding window technique to find increasing subsequences"
      ],
      correctAnswer: 1,
      explanation: "The optimized O(n log n) approach for LIS maintains an array where tails[i] represents the smallest value that ends an increasing subsequence of length i+1. When processing each element in the array, binary search is used to find the correct position to update, achieving the O(n log n) time complexity."
    },
    {
      id: "lis-q4",
      question: "What is the key difference between finding the Longest Increasing Subsequence and the Longest Non-decreasing Subsequence?",
      options: [
        "LIS requires subsequence elements to be contiguous, while LNDS doesn't",
        "LIS only allows strictly increasing elements, while LNDS allows equal elements",
        "LIS works on arrays, while LNDS works on strings",
        "LIS has O(n²) complexity, while LNDS has O(n log n) complexity"
      ],
      correctAnswer: 1,
      explanation: "The key difference between LIS and LNDS is that LIS only allows strictly increasing elements (each element must be greater than the previous one), while LNDS allows equal elements (each element must be greater than or equal to the previous one). The implementation differs only in the comparison operator used (> for LIS vs >= for LNDS)."
    },
    {
      id: "lis-q5",
      question: "In the context of the Longest Bitonic Subsequence problem, what is a bitonic sequence?",
      options: [
        "A sequence that alternates between increasing and decreasing elements",
        "A sequence that is monotonically increasing",
        "A sequence that increases first and then decreases",
        "A sequence that forms a palindrome"
      ],
      correctAnswer: 2,
      explanation: "A bitonic sequence is one that increases first and then decreases. For example, [1, 3, 5, 4, 2] is bitonic. To find the longest bitonic subsequence, we typically compute both the longest increasing subsequence ending at each position and the longest decreasing subsequence starting from each position."
    }
  ]
};

export default lisContent; 