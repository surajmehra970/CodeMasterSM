import { Content } from '@/types/course';

const microsoftProblemsContent: Content = {
  introduction: "This module focuses on algorithmic problems commonly encountered in Microsoft technical interviews. Microsoft values strong problem-solving skills, clean code implementation, and a deep understanding of data structures and algorithms. We'll explore problems that highlight Microsoft's emphasis on scalable design, efficient algorithms, and practical applications.",
  
  learningObjectives: [
    "Solve algorithmic problems frequently asked in Microsoft technical interviews",
    "Implement efficient solutions for tree, string, and array manipulation",
    "Apply dynamic programming and recursion techniques to complex problems",
    "Analyze time and space complexity trade-offs in Microsoft-style problems",
    "Develop the clear thinking and code organization valued by Microsoft interviewers"
  ],
  
  sections: [
    {
      title: "Tree and Graph Problems",
      content: "Microsoft frequently tests candidates on tree and graph algorithms. These problems often require efficient traversals, transformations, and a solid understanding of data structure relationships.",
      codeExamples: [
        {
          language: "java",
          code: `// Clone an Undirected Graph
public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    // Map to store visited nodes: original -> clone
    Map<Node, Node> visited = new HashMap<>();
    
    // Use BFS to traverse the graph
    Queue<Node> queue = new LinkedList<>();
    queue.offer(node);
    
    // Create the first clone node and store in visited map
    visited.put(node, new Node(node.val));
    
    while (!queue.isEmpty()) {
        Node current = queue.poll();
        
        // Process neighbors of current node
        for (Node neighbor : current.neighbors) {
            // If neighbor not visited, create a clone and add to queue
            if (!visited.containsKey(neighbor)) {
                visited.put(neighbor, new Node(neighbor.val));
                queue.offer(neighbor);
            }
            
            // Connect cloned current node with cloned neighbor
            visited.get(current).neighbors.add(visited.get(neighbor));
        }
    }
    
    return visited.get(node);
}`,
          explanation: "This BFS solution for cloning a graph demonstrates thorough traversal while maintaining relationships between nodes. The approach uses a HashMap to track visited nodes and their clones, ensuring we don't process the same node twice. Microsoft interviews often test graph manipulation skills that require careful tracking of object references and relationships."
        },
        {
          language: "java",
          code: `// Binary Tree Level Order Traversal
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        result.add(currentLevel);
    }
    
    return result;
}`,
          explanation: "This level order traversal solution efficiently processes a binary tree level by level using a queue. The approach demonstrates clean handling of tree structures and produces a structured output format. Microsoft frequently asks tree traversal questions that test understanding of tree properties and traversal mechanics."
        }
      ]
    },
    {
      title: "Dynamic Programming Challenges",
      content: "Microsoft technical interviews often include dynamic programming problems that test a candidate's ability to identify subproblems and build optimal solutions incrementally.",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Profit in Stock Trading
public int maxProfit(int[] prices) {
    if (prices == null || prices.length <= 1) return 0;
    
    int n = prices.length;
    
    // dp[i][0] = max profit on day i if not holding stock
    // dp[i][1] = max profit on day i if holding stock
    int[][] dp = new int[n][2];
    
    // Base case: day 0
    dp[0][0] = 0;  // Not holding stock initially
    dp[0][1] = -prices[0];  // Buy stock on day 0
    
    for (int i = 1; i < n; i++) {
        // Not holding stock: either continued from previous day or sold today
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
        
        // Holding stock: either continued from previous day or bought today
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
    }
    
    // Final answer is max profit on last day when not holding stock
    return dp[n-1][0];
}`,
          explanation: "This dynamic programming solution for stock trading optimally determines when to buy and sell stocks. The approach uses a state-based DP formulation tracking two possible states: holding or not holding stock. Microsoft interviews frequently feature these types of state-transition DP problems that test algorithmic thinking."
        },
        {
          language: "java",
          code: `// Longest Palindromic Substring
public String longestPalindrome(String s) {
    if (s == null || s.length() < 2) return s;
    
    int n = s.length();
    int start = 0, maxLength = 1;
    
    // dp[i][j] = true if substring s[i..j] is palindromic
    boolean[][] dp = new boolean[n][n];
    
    // All substrings of length 1 are palindromes
    for (int i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check substrings of length 2
    for (int i = 0; i < n - 1; i++) {
        if (s.charAt(i) == s.charAt(i + 1)) {
            dp[i][i+1] = true;
            start = i;
            maxLength = 2;
        }
    }
    
    // Check substrings of length 3 or more
    for (int len = 3; len <= n; len++) {
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;  // ending index
            
            // Check if s[i..j] is palindromic
            if (s.charAt(i) == s.charAt(j) && dp[i+1][j-1]) {
                dp[i][j] = true;
                start = i;
                maxLength = len;
            }
        }
    }
    
    return s.substring(start, start + maxLength);
}`,
          explanation: "This dynamic programming solution efficiently finds the longest palindromic substring by building up from smaller validated palindromes. The approach fills a 2D DP table where dp[i][j] indicates whether substring s[i..j] is a palindrome. Microsoft interviews often feature string manipulation problems with dynamic programming applications."
        }
      ]
    },
    {
      title: "Array and String Manipulation",
      content: "Microsoft interviews frequently include problems involving array and string manipulation, requiring innovative algorithms and careful edge case handling.",
      codeExamples: [
        {
          language: "java",
          code: `// Spiral Matrix Traversal
public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    
    if (matrix == null || matrix.length == 0) {
        return result;
    }
    
    int rows = matrix.length;
    int cols = matrix[0].length;
    
    int top = 0, bottom = rows - 1;
    int left = 0, right = cols - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (int j = left; j <= right; j++) {
            result.add(matrix[top][j]);
        }
        top++;
        
        // Traverse down
        for (int i = top; i <= bottom; i++) {
            result.add(matrix[i][right]);
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (int j = right; j >= left; j--) {
                result.add(matrix[bottom][j]);
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                result.add(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}`,
          explanation: "This spiral matrix traversal solution demonstrates handling complex array operations with clean boundary tracking. The approach uses four pointers to track the boundaries of unprocessed elements. Microsoft interviews often include these types of array traversal problems that test spatial reasoning and boundary condition handling."
        },
        {
          language: "java",
          code: `// Integer to English Words
public String numberToWords(int num) {
    if (num == 0) return "Zero";
    
    String[] ones = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
                     "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
                     "Eighteen", "Nineteen"};
    String[] tens = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    String[] thousands = {"", "Thousand", "Million", "Billion"};
    
    StringBuilder result = new StringBuilder();
    int i = 0;
    
    while (num > 0) {
        if (num % 1000 != 0) {
            StringBuilder sb = new StringBuilder();
            helper(num % 1000, ones, tens, sb);
            sb.append(thousands[i]).append(" ");
            result.insert(0, sb);
        }
        num /= 1000;
        i++;
    }
    
    return result.toString().trim();
}

private void helper(int num, String[] ones, String[] tens, StringBuilder sb) {
    if (num == 0) return;
    
    if (num < 20) {
        sb.append(ones[num]).append(" ");
    } else if (num < 100) {
        sb.append(tens[num / 10]).append(" ");
        helper(num % 10, ones, tens, sb);
    } else {
        sb.append(ones[num / 100]).append(" Hundred ");
        helper(num % 100, ones, tens, sb);
    }
}`,
          explanation: "This solution converts integers to their English word representation, handling the intricacies of the English numbering system. The approach breaks the problem into groups of three digits and processes each group separately. Microsoft interviews often include these string conversion problems that test attention to detail and string manipulation skills."
        }
      ]
    },
    {
      title: "System Design and Optimization",
      content: "Microsoft places significant emphasis on designing efficient algorithms and data structures. These problems test a candidate's ability to optimize solutions for specific constraints.",
      codeExamples: [
        {
          language: "java",
          code: `// LFU (Least Frequently Used) Cache
class LFUCache {
    private final int capacity;
    private int minFreq;
    private final Map<Integer, Integer> keyToVal;  // key -> value
    private final Map<Integer, Integer> keyToFreq;  // key -> frequency
    private final Map<Integer, LinkedHashSet<Integer>> freqToKeys;  // frequency -> keys with that frequency
    
    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToVal = new HashMap<>();
        this.keyToFreq = new HashMap<>();
        this.freqToKeys = new HashMap<>();
    }
    
    public int get(int key) {
        if (!keyToVal.containsKey(key)) {
            return -1;
        }
        
        // Update frequency
        int freq = keyToFreq.get(key);
        freqToKeys.get(freq).remove(key);
        
        // Update minFreq if needed
        if (freqToKeys.get(freq).isEmpty()) {
            freqToKeys.remove(freq);
            if (freq == minFreq) {
                minFreq++;
            }
        }
        
        // Add key to increased frequency group
        int newFreq = freq + 1;
        keyToFreq.put(key, newFreq);
        freqToKeys.computeIfAbsent(newFreq, k -> new LinkedHashSet<>()).add(key);
        
        return keyToVal.get(key);
    }
    
    public void put(int key, int value) {
        if (capacity <= 0) return;
        
        if (keyToVal.containsKey(key)) {
            keyToVal.put(key, value);
            get(key);  // Update frequency
            return;
        }
        
        // Remove least frequently used key when capacity is reached
        if (keyToVal.size() >= capacity) {
            Set<Integer> keys = freqToKeys.get(minFreq);
            int keyToRemove = keys.iterator().next();  // Get first key (least recently used)
            keys.remove(keyToRemove);
            
            if (keys.isEmpty()) {
                freqToKeys.remove(minFreq);
            }
            
            keyToVal.remove(keyToRemove);
            keyToFreq.remove(keyToRemove);
        }
        
        // Add new key
        keyToVal.put(key, value);
        keyToFreq.put(key, 1);
        freqToKeys.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);
        minFreq = 1;
    }
}`,
          explanation: "This LFU Cache implementation efficiently manages data with frequency-based eviction. The approach uses multiple hash maps to track values, frequencies, and sets of keys with the same frequency. Microsoft often asks these data structure design questions to test understanding of complex operations and optimization for multiple constraints."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "microsoft-hw1",
      question: "Implement a solution for the 'Word Break' problem, where you need to determine if a string can be segmented into space-separated words from a dictionary.",
      solution: "Use dynamic programming where dp[i] represents whether the substring s[0...i-1] can be segmented into words from the dictionary. For each position i, check all possible previous positions j where dp[j] is true, and verify if s[j...i-1] is in the dictionary. This approach has O(n²) time complexity where n is the length of the string."
    },
    {
      id: "microsoft-hw2",
      question: "Solve the 'Merge Intervals' problem, where you need to merge overlapping intervals.",
      solution: "First, sort the intervals by their start times. Then, iterate through the sorted intervals, merging overlapping ones by updating the end time of the current interval if the next interval's start time is less than or equal to the current end time. This approach has O(n log n) time complexity due to the sorting step."
    },
    {
      id: "microsoft-hw3",
      question: "Implement a solution for the 'Validate Binary Search Tree' problem, ensuring that a binary tree satisfies the BST property where all nodes in the left subtree have values less than the node's value, and all nodes in the right subtree have values greater than the node's value.",
      solution: "Use a recursive approach with valid range checking. For each node, verify that its value is within the allowed range (lower and upper bounds). When checking the left subtree, update the upper bound to the current node's value. When checking the right subtree, update the lower bound to the current node's value. This ensures the BST property is maintained throughout."
    },
    {
      id: "microsoft-hw4",
      question: "Solve the 'Trapping Rain Water' problem, where you need to compute how much water can be trapped between bars of various heights.",
      solution: "Use a two-pointer approach where left and right pointers start from the ends of the array and move inward. Maintain leftMax and rightMax variables to track the maximum height seen from each side. At each step, determine which pointer to move based on the smaller height, and calculate the water trapped at that position based on the difference between the current height and the corresponding maximum height."
    }
  ],
  
  quiz: [
    {
      id: "microsoft-q1",
      question: "What is the time complexity of the standard solution for the 'Longest Palindromic Substring' problem using dynamic programming?",
      options: [
        "O(n) where n is the length of the string",
        "O(n²) where n is the length of the string",
        "O(n³) where n is the length of the string",
        "O(2ⁿ) where n is the length of the string"
      ],
      correctAnswer: 1,
      explanation: "The standard dynamic programming solution for the 'Longest Palindromic Substring' problem has a time complexity of O(n²) where n is the length of the string. We fill a 2D DP table where each cell requires constant time to compute, and there are n² cells to fill."
    },
    {
      id: "microsoft-q2",
      question: "In the 'Spiral Matrix Traversal' problem, what is the key to handling different sized matrices correctly?",
      options: [
        "Using recursion to solve smaller subproblems",
        "Implementing a breadth-first search approach",
        "Carefully checking boundary conditions after each direction change",
        "Converting the 2D array to a 1D array first"
      ],
      correctAnswer: 2,
      explanation: "The key to handling different sized matrices correctly in the 'Spiral Matrix Traversal' problem is carefully checking boundary conditions after each direction change. For odd-dimensioned matrices, we need to ensure we don't double-count elements. The conditional checks for top<=bottom and left<=right prevent processing the same elements multiple times."
    },
    {
      id: "microsoft-q3",
      question: "Which data structure is most efficient for implementing an LFU (Least Frequently Used) Cache?",
      options: [
        "A single HashMap",
        "A combination of HashMap and Queue",
        "Multiple HashMaps with a LinkedHashSet",
        "A TreeMap sorted by frequency"
      ],
      correctAnswer: 2,
      explanation: "A combination of multiple HashMaps with a LinkedHashSet is most efficient for implementing an LFU Cache. This approach allows O(1) operations for both get and put by using maps to track key-value pairs, key frequencies, and keys with the same frequency. The LinkedHashSet maintains insertion order to handle the 'least recently used' aspect when multiple keys have the same frequency."
    },
    {
      id: "microsoft-q4",
      question: "What is the primary advantage of using BFS over DFS for cloning a graph?",
      options: [
        "BFS uses less memory",
        "BFS is simpler to implement",
        "BFS prevents stack overflow for large graphs",
        "BFS processes nodes in level order, making neighbor references easier to manage"
      ],
      correctAnswer: 3,
      explanation: "The primary advantage of using BFS over DFS for cloning a graph is that BFS processes nodes in level order, making neighbor references easier to manage. Since we process a node only after all its neighbors at lower levels have been discovered, we can ensure that all neighbors will be properly cloned before connecting them to the current node's clone."
    },
    {
      id: "microsoft-q5",
      question: "In the context of Microsoft technical interviews, which approach is most valued when solving algorithmic problems?",
      options: [
        "Finding the most mathematically elegant solution",
        "Writing the shortest possible code",
        "Clearly explaining trade-offs and implementing a clean, efficient solution",
        "Using the most advanced data structures to show expertise"
      ],
      correctAnswer: 2,
      explanation: "Microsoft technical interviews most value clearly explaining trade-offs and implementing a clean, efficient solution. Microsoft interviewers typically look for candidates who can articulate their thought process, analyze multiple approaches, understand the trade-offs involved, and then implement a solution that balances correctness, performance, and code clarity."
    }
  ],
  
  practice: {
    introduction: "These practice problems are commonly encountered in Microsoft technical interviews. They cover a range of topics including data structures, algorithms, and system design that Microsoft particularly values. Work through these problems to prepare for Microsoft's problem-solving focused interview approach.",
    questions: {
      easy: [
        {
          id: "microsoft-easy-1",
          title: "Reverse String",
          link: "https://leetcode.com/problems/reverse-string/",
          description: "Reverse a string in-place. This tests basic array manipulation and understanding of in-place operations, which Microsoft frequently uses as warm-up questions."
        },
        {
          id: "microsoft-easy-2",
          title: "Valid Palindrome",
          link: "https://leetcode.com/problems/valid-palindrome/",
          description: "Determine if a string is a valid palindrome considering only alphanumeric characters. This tests string manipulation and edge case handling, common in Microsoft interviews."
        },
        {
          id: "microsoft-easy-3",
          title: "Linked List Cycle",
          link: "https://leetcode.com/problems/linked-list-cycle/",
          description: "Detect if a linked list has a cycle. Microsoft frequently tests understanding of the Floyd's Tortoise and Hare algorithm and pointer manipulation."
        }
      ],
      medium: [
        {
          id: "microsoft-medium-1",
          title: "Binary Tree Level Order Traversal",
          link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
          description: "Traverse a binary tree level by level. This tests understanding of tree algorithms and queue-based traversals, which are common in Microsoft interviews."
        },
        {
          id: "microsoft-medium-2",
          title: "String to Integer (atoi)",
          link: "https://leetcode.com/problems/string-to-integer-atoi/",
          description: "Implement the atoi function that converts a string to an integer. Microsoft often uses this to test edge case handling and attention to requirements."
        },
        {
          id: "microsoft-medium-3",
          title: "Clone Graph",
          link: "https://leetcode.com/problems/clone-graph/",
          description: "Clone an undirected graph. This tests deep understanding of graph traversal and object creation, skills Microsoft values in their engineers."
        },
        {
          id: "microsoft-medium-4",
          title: "Spiral Matrix",
          link: "https://leetcode.com/problems/spiral-matrix/",
          description: "Return all elements of a matrix in spiral order. This tests array manipulation and directional logic, frequently appearing in Microsoft's algorithmic interviews."
        }
      ],
      hard: [
        {
          id: "microsoft-hard-1",
          title: "Serialize and Deserialize Binary Tree",
          link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
          description: "Design an algorithm to serialize and deserialize a binary tree. This tests system design skills and understanding of tree structures that Microsoft values."
        },
        {
          id: "microsoft-hard-2",
          title: "Merge k Sorted Lists",
          link: "https://leetcode.com/problems/merge-k-sorted-lists/",
          description: "Merge k sorted linked lists into one sorted list. This tests understanding of priority queues and efficient merging algorithms, common in Microsoft interviews."
        },
        {
          id: "microsoft-hard-3",
          title: "LRU Cache",
          link: "https://leetcode.com/problems/lru-cache/",
          description: "Design and implement a data structure for Least Recently Used (LRU) cache. Microsoft frequently tests candidates on design problems that combine data structures with specific operational requirements."
        }
      ]
    }
  }
};

export default microsoftProblemsContent; 