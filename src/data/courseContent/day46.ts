import { Content } from '@/types/course';

const amazonProblemsContent: Content = {
  introduction: "This module covers algorithmic problems frequently encountered in Amazon technical interviews. Amazon places strong emphasis on scalable solutions, optimization, and practical problem-solving. We'll analyze interview patterns specific to Amazon and focus on problems that test your abilities in data structures, algorithms, and system design considerations.",
  
  learningObjectives: [
    "Master common Amazon interview problems and their optimal solutions",
    "Apply efficient algorithms for tree, graph, and array manipulation",
    "Develop problem-solving strategies focused on scalability and optimization",
    "Understand Amazon's approach to technical assessment and coding interviews",
    "Practice implementing solutions that balance correctness, efficiency, and robustness"
  ],
  
  sections: [
    {
      title: "Array and String Manipulation",
      content: "Amazon regularly tests candidates on array manipulation and string processing problems. These questions often require optimized approaches and careful consideration of edge cases.",
      codeExamples: [
        {
          language: "java",
          code: `// Trapping Rain Water
public int trap(int[] height) {
    if (height == null || height.length < 3) return 0;
    
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    
    while (left < right) {
        // Water trapped at a position depends on the smaller of leftMax and rightMax
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    
    return totalWater;
}`,
          explanation: "This two-pointer solution for the Trapping Rain Water problem demonstrates handling complex array calculations efficiently. The approach uses O(1) space and processes the array in a single pass with O(n) time complexity. Amazon interviews often feature these types of optimization challenges that test spatial reasoning."
        },
        {
          language: "java",
          code: `// Most Common Word
public String mostCommonWord(String paragraph, String[] banned) {
    // Normalize the paragraph and split into words
    String normalized = paragraph.toLowerCase().replaceAll("[^a-z\\s]", " ");
    String[] words = normalized.split("\\s+");
    
    // Create a set of banned words for O(1) lookup
    Set<String> bannedSet = new HashSet<>(Arrays.asList(banned));
    
    // Count word frequencies
    Map<String, Integer> wordCounts = new HashMap<>();
    for (String word : words) {
        if (word.length() > 0 && !bannedSet.contains(word)) {
            wordCounts.put(word, wordCounts.getOrDefault(word, 0) + 1);
        }
    }
    
    // Find the most frequent word
    String mostCommon = "";
    int maxCount = 0;
    
    for (Map.Entry<String, Integer> entry : wordCounts.entrySet()) {
        if (entry.getValue() > maxCount) {
            maxCount = entry.getValue();
            mostCommon = entry.getKey();
        }
    }
    
    return mostCommon;
}`,
          explanation: "This solution demonstrates string processing with attention to edge cases—a common theme in Amazon interviews. The approach normalizes text, handles punctuation, and efficiently tracks word frequencies using a HashMap while excluding banned words. The solution balances correctness with performance considerations."
        }
      ]
    },
    {
      title: "Tree and Graph Problems",
      content: "Amazon frequently tests candidates on tree traversals, path finding, and complex graph algorithms. These questions often require deep understanding of tree and graph data structures.",
      codeExamples: [
        {
          language: "java",
          code: `// Number of Islands
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    
    int rows = grid.length;
    int cols = grid[0].length;
    int count = 0;
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    
    return count;
}

private void dfs(char[][] grid, int row, int col) {
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Check boundaries and if current cell is land
    if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] != '1') {
        return;
    }
    
    // Mark as visited
    grid[row][col] = '0';
    
    // Check all four directions
    dfs(grid, row + 1, col);
    dfs(grid, row - 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row, col - 1);
}`,
          explanation: "This grid-based DFS solution for counting islands demonstrates the application of graph algorithms to 2D arrays. The approach marks visited cells in-place to avoid using extra space, showing optimization awareness. Amazon frequently asks questions involving connected components and traversals in their interviews."
        },
        {
          language: "java",
          code: `// Lowest Common Ancestor of a Binary Tree
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    // Base case
    if (root == null || root == p || root == q) {
        return root;
    }
    
    // Search in left and right subtrees
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    
    // If both nodes were found in different subtrees
    if (left != null && right != null) {
        return root; // Current node is the LCA
    }
    
    // If one node was found, return it (either p or q is in this subtree)
    return left != null ? left : right;
}`,
          explanation: "This recursive solution for finding the lowest common ancestor in a binary tree showcases handling complex tree relationships. The approach efficiently traverses the tree once, demonstrating a deep understanding of tree properties. Amazon interviews frequently include these types of tree traversal and relationship problems."
        }
      ]
    },
    {
      title: "System Design and Optimization",
      content: "Amazon places significant emphasis on system design and optimization problems that test a candidate's ability to build scalable and efficient solutions.",
      codeExamples: [
        {
          language: "java",
          code: `// Design an efficient Min Stack
class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;
    
    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
        
        // Push the new minimum to minStack
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }
    
    public void pop() {
        // If popped value is the current minimum, remove from minStack too
        if (stack.pop().equals(minStack.peek())) {
            minStack.pop();
        }
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}`,
          explanation: "This MinStack implementation demonstrates designing a data structure with specific operation requirements. The solution uses an auxiliary stack to track minimums, enabling O(1) operations for all methods. Amazon interviews often include these types of data structure design questions that test practical implementation skills."
        },
        {
          language: "java",
          code: `// Design a Logger Rate Limiter
class Logger {
    private Map<String, Integer> messageTimestamps;
    
    public Logger() {
        messageTimestamps = new HashMap<>();
    }
    
    // Returns true if the message should be printed
    public boolean shouldPrintMessage(int timestamp, String message) {
        // If message not seen before or 10 seconds have passed
        if (!messageTimestamps.containsKey(message) || 
            timestamp - messageTimestamps.get(message) >= 10) {
            
            messageTimestamps.put(message, timestamp);
            return true;
        }
        
        return false;
    }
}`,
          explanation: "This Logger rate limiter demonstrates handling time-based operations with efficient lookups. The solution uses a HashMap to track message timestamps, allowing O(1) decisions about whether to print messages. Amazon frequently asks design questions that involve time-based operations or rate limiting, reflecting their focus on scalable systems."
        }
      ]
    },
    {
      title: "Dynamic Programming and Greedy Algorithms",
      content: "Amazon interviews often include optimization problems that can be solved using dynamic programming or greedy approaches. These questions test a candidate's ability to identify and implement efficient algorithms.",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Profit in Job Scheduling
public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    int[][] jobs = new int[n][3];
    
    // Create jobs array with [startTime, endTime, profit]
    for (int i = 0; i < n; i++) {
        jobs[i] = new int[]{startTime[i], endTime[i], profit[i]};
    }
    
    // Sort jobs by end time
    Arrays.sort(jobs, (a, b) -> a[1] - b[1]);
    
    // dp[i] = maximum profit considering jobs 0 to i
    int[] dp = new int[n];
    dp[0] = jobs[0][2]; // Profit of first job
    
    for (int i = 1; i < n; i++) {
        // Profit including current job
        int currentProfit = jobs[i][2];
        
        // Find latest non-overlapping job
        int latestNonOverlap = -1;
        for (int j = i - 1; j >= 0; j--) {
            if (jobs[j][1] <= jobs[i][0]) {
                latestNonOverlap = j;
                break;
            }
        }
        
        // Add profit from non-overlapping jobs
        if (latestNonOverlap != -1) {
            currentProfit += dp[latestNonOverlap];
        }
        
        // Maximum of including or excluding current job
        dp[i] = Math.max(currentProfit, dp[i - 1]);
    }
    
    return dp[n - 1];
}`,
          explanation: "This dynamic programming solution for job scheduling demonstrates optimizing profit with non-overlapping time intervals. The approach sorts jobs by end time and builds optimal solutions incrementally. Amazon interviews frequently feature these scheduling and optimization problems that test algorithmic thinking."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "amazon-hw1",
      question: "Design and implement an LRU (Least Recently Used) Cache that supports get and put operations in O(1) time.",
      solution: "Use a combination of a HashMap and a doubly linked list. The HashMap provides O(1) access to cache items, while the linked list maintains the order of item usage. When accessing an item, move it to the front of the list. When adding a new item to a full cache, remove the item at the end of the list (least recently used)."
    },
    {
      id: "amazon-hw2",
      question: "Implement a solution for the 'Merge K Sorted Lists' problem, where you need to merge k sorted linked lists into one sorted list.",
      solution: "Use a min-heap (priority queue) to efficiently merge the lists. Initialize the heap with the first element from each list. Repeatedly extract the minimum element, add it to the result list, and insert the next element from that list into the heap if available. This approach has O(N log k) time complexity where N is the total number of elements and k is the number of lists."
    },
    {
      id: "amazon-hw3",
      question: "Solve the 'Maximum Subarray' problem using Kadane's algorithm and analyze its time and space complexity.",
      solution: "Use Kadane's algorithm to find the contiguous subarray with the largest sum. Track the current sum and the maximum sum found so far. For each element, decide whether to extend the current subarray or start a new one. This approach has O(n) time complexity and O(1) space complexity."
    },
    {
      id: "amazon-hw4",
      question: "Implement a solution for the 'Word Search II' problem, where you need to find all words from a dictionary that can be formed in a board by connecting adjacent cells.",
      solution: "Use a Trie data structure to efficiently store the dictionary words and perform DFS on the board. For each cell in the board, start DFS if the character matches a prefix in the Trie. During traversal, mark visited cells to avoid using them again in the same word. This approach optimizes the search process by early termination when no valid words can be formed."
    }
  ],
  
  quiz: [
    {
      id: "amazon-q1",
      question: "What is the time complexity of the standard solution for the 'Number of Islands' problem?",
      options: [
        "O(n) where n is the number of cells",
        "O(n log n) where n is the number of cells",
        "O(m×n) where m and n are the dimensions of the grid",
        "O(m×n×log(m×n)) where m and n are the dimensions of the grid"
      ],
      correctAnswer: 2,
      explanation: "The standard DFS solution for the 'Number of Islands' problem has a time complexity of O(m×n) where m and n are the dimensions of the grid. This is because in the worst case, we might need to visit every cell in the grid once during the DFS traversal."
    },
    {
      id: "amazon-q2",
      question: "Which data structure is most appropriate for implementing a rate limiter that throttles requests based on a time window?",
      options: [
        "Array",
        "HashMap with timestamps",
        "Binary Search Tree",
        "Linked List"
      ],
      correctAnswer: 1,
      explanation: "A HashMap with timestamps is most appropriate for implementing a rate limiter. It allows O(1) lookup to check if a request should be throttled based on previous requests. The HashMap can store the message or request ID as the key and the timestamp as the value, enabling efficient rate limiting based on time windows."
    },
    {
      id: "amazon-q3",
      question: "In the 'Trapping Rain Water' problem, why is the two-pointer approach more space-efficient than using arrays to store left and right maximums?",
      options: [
        "The two-pointer approach has better cache locality",
        "The two-pointer approach uses constant extra space instead of linear extra space",
        "The two-pointer approach has a lower time complexity",
        "The two-pointer approach requires fewer comparisons"
      ],
      correctAnswer: 1,
      explanation: "The two-pointer approach is more space-efficient because it uses constant O(1) extra space by tracking left and right maximums on-the-fly, instead of pre-computing and storing them in arrays which would require O(n) extra space. This optimization is important for space-constrained environments."
    },
    {
      id: "amazon-q4",
      question: "What is the key insight in efficiently solving the 'Lowest Common Ancestor' problem in a binary tree?",
      options: [
        "Using level order traversal to find the nodes",
        "Storing node-to-parent mappings in a hash table",
        "Using post-order traversal and returning when either target node is found",
        "Converting the tree to a graph and applying BFS"
      ],
      correctAnswer: 2,
      explanation: "The key insight is using post-order traversal (checking left, then right, then root) and returning a node when either target node is found. If both left and right subtrees return a non-null value, then the current node is the LCA. This approach efficiently handles all cases in a single traversal."
    },
    {
      id: "amazon-q5",
      question: "Which approach is NOT typically used to solve the 'Maximum Profit in Job Scheduling' problem?",
      options: [
        "Dynamic programming with binary search for previous non-overlapping jobs",
        "Greedy algorithm selecting jobs with highest profit/time ratio",
        "Sorting jobs by end time and using DP to track maximum profit",
        "Recursion with memoization based on job index"
      ],
      correctAnswer: 1,
      explanation: "A greedy algorithm selecting jobs with the highest profit/time ratio is NOT typically used to solve the 'Maximum Profit in Job Scheduling' problem. This greedy approach fails because it doesn't account for the constraints of non-overlapping intervals. The optimal solution usually involves dynamic programming, sorting jobs by end time, and finding the latest non-overlapping job for each current job."
    }
  ]
};

export default amazonProblemsContent; 