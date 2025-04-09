import { Content } from '@/types/course';

const googleProblemsContent: Content = {
  introduction: "This module focuses on popular algorithmic problems commonly asked in Google interviews. We'll analyze Google's interview patterns and problem-solving approaches, covering data structures and algorithms that appear frequently in their technical assessments. These problems emphasize strong computer science fundamentals, optimization techniques, and efficient algorithm design.",
  
  learningObjectives: [
    "Identify and solve Google's most frequently asked algorithmic problems",
    "Practice applying optimization techniques to improve algorithm efficiency",
    "Understand Google's emphasis on trade-offs and system design considerations",
    "Master string manipulation, graph algorithms, and dynamic programming problems",
    "Develop the problem-solving approach valued in Google interviews"
  ],
  
  sections: [
    {
      title: "String and Array Problems",
      content: "Google frequently tests candidates on string manipulation and array processing skills. These problems often require efficient data structure usage and creative algorithmic approaches.",
      codeExamples: [
        {
          language: "java",
          code: `// Longest Substring Without Repeating Characters
public int lengthOfLongestSubstring(String s) {
    int n = s.length();
    int maxLength = 0;
    Map<Character, Integer> charIndexMap = new HashMap<>();
    
    // Sliding window approach
    for (int right = 0, left = 0; right < n; right++) {
        char currentChar = s.charAt(right);
        
        // If character is already in current window, move left pointer
        if (charIndexMap.containsKey(currentChar)) {
            left = Math.max(left, charIndexMap.get(currentChar) + 1);
        }
        
        // Update max length and character position
        maxLength = Math.max(maxLength, right - left + 1);
        charIndexMap.put(currentChar, right);
    }
    
    return maxLength;
}`,
          explanation: "This sliding window solution tracks character positions in a HashMap. When a repeated character is found, we move the left pointer to just after the previous occurrence. This provides O(n) time complexity while handling constraints efficiently. Google interviewers look for this kind of optimization in string problems."
        },
        {
          language: "java",
          code: `// Next Permutation
public void nextPermutation(int[] nums) {
    int n = nums.length;
    
    // Find first decreasing element from right
    int i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    
    if (i >= 0) {
        // Find element just larger than nums[i]
        int j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        // Swap
        swap(nums, i, j);
    }
    
    // Reverse the subarray after position i
    reverse(nums, i + 1, n - 1);
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

private void reverse(int[] nums, int start, int end) {
    while (start < end) {
        swap(nums, start++, end--);
    }
}`,
          explanation: "This algorithm finds the lexicographically next greater permutation of numbers in O(n) time. The approach demonstrates pattern recognition and in-place array manipulation—skills Google values. The solution avoids generating all permutations, showing algorithmic efficiency."
        }
      ]
    },
    {
      title: "Graph and Tree Problems",
      content: "Google places significant emphasis on graph and tree problems, often requiring deep understanding of traversal algorithms, path-finding techniques, and tree manipulation.",
      codeExamples: [
        {
          language: "java",
          code: `// Word Ladder - Find shortest transformation sequence
public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;
    
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            String currentWord = queue.poll();
            char[] wordChars = currentWord.toCharArray();
            
            // Try replacing each character
            for (int j = 0; j < wordChars.length; j++) {
                char originalChar = wordChars[j];
                
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == originalChar) continue;
                    
                    wordChars[j] = c;
                    String newWord = new String(wordChars);
                    
                    if (newWord.equals(endWord)) return level + 1;
                    
                    if (wordSet.contains(newWord)) {
                        queue.offer(newWord);
                        wordSet.remove(newWord); // Mark as visited
                    }
                }
                
                // Restore original character
                wordChars[j] = originalChar;
            }
        }
        
        level++;
    }
    
    return 0;
}`,
          explanation: "This solution uses BFS to find the shortest transformation sequence between words. The approach demonstrates graph traversal in an implicit graph where words are nodes and edges connect words that differ by one character. Google values this type of problem-solving that maps real-world problems to graph algorithms."
        },
        {
          language: "java",
          code: `// Serialize and Deserialize Binary Tree
public class Codec {
    // Encodes a tree to a single string
    public String serialize(TreeNode root) {
        if (root == null) return "X";
        
        String leftSerialized = serialize(root.left);
        String rightSerialized = serialize(root.right);
        
        return root.val + "," + leftSerialized + "," + rightSerialized;
    }
    
    // Decodes encoded data to tree
    public TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return deserializeHelper(nodes);
    }
    
    private TreeNode deserializeHelper(Queue<String> nodes) {
        String val = nodes.poll();
        
        if (val.equals("X")) return null;
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(nodes);
        node.right = deserializeHelper(nodes);
        
        return node;
    }
}`,
          explanation: "This tree serialization/deserialization demonstrates handling complex tree operations through preorder traversal. The solution showcases recursive tree manipulation and efficient string parsing. Google interviews often include these types of data structure conversion problems that test systems thinking."
        }
      ]
    },
    {
      title: "Dynamic Programming Challenges",
      content: "Dynamic programming problems are staples in Google interviews, testing a candidate's ability to optimize recursive solutions and identify overlapping subproblems.",
      codeExamples: [
        {
          language: "java",
          code: `// Longest Increasing Path in a Matrix
public int longestIncreasingPath(int[][] matrix) {
    if (matrix == null || matrix.length == 0) return 0;
    
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] memo = new int[rows][cols]; // Memoization
    int maxPath = 0;
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            maxPath = Math.max(maxPath, dfs(matrix, i, j, memo));
        }
    }
    
    return maxPath;
}

private int dfs(int[][] matrix, int row, int col, int[][] memo) {
    // Return cached result if available
    if (memo[row][col] > 0) return memo[row][col];
    
    int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    int maxLength = 1; // Path includes current cell
    
    for (int[] dir : directions) {
        int newRow = row + dir[0];
        int newCol = col + dir[1];
        
        if (newRow >= 0 && newRow < matrix.length && 
            newCol >= 0 && newCol < matrix[0].length && 
            matrix[newRow][newCol] > matrix[row][col]) {
            
            int length = 1 + dfs(matrix, newRow, newCol, memo);
            maxLength = Math.max(maxLength, length);
        }
    }
    
    // Cache the result
    memo[row][col] = maxLength;
    return maxLength;
}`,
          explanation: "This problem combines DFS with memoization to find the longest increasing path in a matrix. The approach demonstrates top-down dynamic programming with state caching, showing how to avoid redundant calculations. Google interviews often feature these grid-based DP problems that test algorithmic optimization skills."
        }
      ]
    },
    {
      title: "System Design Considerations",
      content: "While focusing on algorithms, Google interviewers often ask candidates to discuss design decisions, scalability concerns, and potential optimizations for their solutions.",
      codeExamples: [
        {
          language: "java",
          code: `// LRU Cache Implementation
class LRUCache {
    private int capacity;
    private Map<Integer, Node> cache;
    private DoublyLinkedList list;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.list = new DoublyLinkedList();
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        
        // Move to front (most recently used)
        Node node = cache.get(key);
        list.moveToFront(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            // Update existing and move to front
            Node node = cache.get(key);
            node.value = value;
            list.moveToFront(node);
            return;
        }
        
        // Check capacity and remove least recently used if needed
        if (cache.size() >= capacity) {
            Node removed = list.removeLast();
            cache.remove(removed.key);
        }
        
        // Add new node to front
        Node newNode = new Node(key, value);
        list.addToFront(newNode);
        cache.put(key, newNode);
    }
    
    // Node for doubly linked list
    private class Node {
        int key;
        int value;
        Node prev;
        Node next;
        
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    // Custom doubly linked list
    private class DoublyLinkedList {
        Node head;
        Node tail;
        
        DoublyLinkedList() {
            head = new Node(0, 0); // Dummy
            tail = new Node(0, 0); // Dummy
            head.next = tail;
            tail.prev = head;
        }
        
        void addToFront(Node node) {
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
        }
        
        void moveToFront(Node node) {
            // Remove
            node.prev.next = node.next;
            node.next.prev = node.prev;
            // Add to front
            addToFront(node);
        }
        
        Node removeLast() {
            Node lastNode = tail.prev;
            if (lastNode != head) {
                lastNode.prev.next = tail;
                tail.prev = lastNode.prev;
            }
            return lastNode;
        }
    }
}`,
          explanation: "This LRU Cache implementation demonstrates designing a system with specific time complexity requirements (O(1) operations). The solution combines a HashMap with a doubly linked list to achieve efficient access and eviction. Google interviewers look for this type of data structure composition and performance analysis."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "google-hw1",
      question: "Implement a solution for the 'Snapshot Array' problem. Design a data structure that supports the following operations: 1) set(index, val) sets the value at a given index; 2) snap() takes a snapshot and returns the snap_id; 3) get(index, snap_id) returns the value at the given index in the snapshot with the given id.",
      solution: "Use a list of TreeMaps where each TreeMap corresponds to an index and maps snap_ids to values. For set(index, val), update the latest value at the index. For snap(), increment and return a global snap_id counter. For get(index, snap_id), use the TreeMap's floorEntry to find the most recent value at or before the requested snap_id."
    },
    {
      id: "google-hw2",
      question: "Solve the 'Guess the Word' problem. You need to guess a hidden word by repeatedly guessing words and getting feedback on matches. Design an algorithm that minimizes the number of guesses.",
      solution: "Maintain a set of possible words. For each guess, select a word from the set and eliminate words that wouldn't give the same match count as the feedback received. Prioritize words that would eliminate the most candidates in the worst case, using a minimax approach."
    },
    {
      id: "google-hw3",
      question: "Design a solution for 'Stream of Characters' where you implement a data structure that supports: 1) adding words to a dictionary; 2) querying if a stream of characters forms a suffix of any word in the dictionary.",
      solution: "Use a Trie (prefix tree) but insert words in reverse. When querying, check if the current stream matches any path from the root. Maintain a sliding window of the most recent characters to efficiently check for suffixes."
    },
    {
      id: "google-hw4",
      question: "Implement a solution for 'Text Justification' where you need to format text such that each line has exactly maxWidth characters and is fully justified.",
      solution: "First, determine which words go on each line by greedily fitting as many words as possible. Then, distribute spaces evenly between words. For the last line, left-justify it. Handle edge cases like single-word lines and spaces distribution when there are few words."
    }
  ],
  
  quiz: [
    {
      id: "google-q1",
      question: "Which data structure would be most efficient for implementing an autocomplete feature?",
      options: [
        "HashMap",
        "Trie",
        "Linked List",
        "Binary Search Tree"
      ],
      correctAnswer: 1,
      explanation: "A Trie is ideal for implementing autocomplete because it efficiently stores and retrieves strings with common prefixes. This data structure allows for O(m) lookup time where m is the length of the string being searched, and easily supports prefix matching necessary for autocomplete suggestions."
    },
    {
      id: "google-q2",
      question: "What is the time complexity of the standard solution for finding the longest increasing path in a matrix?",
      options: [
        "O(n²) where n is the number of cells",
        "O(n) where n is the number of cells",
        "O(n·m) where n and m are the dimensions",
        "O(n·m) where n is the number of cells and m is the maximum path length"
      ],
      correctAnswer: 0,
      explanation: "The standard solution using DFS with memoization has a time complexity of O(n²) where n is the number of cells in the matrix. Each cell is visited exactly once, and for each cell, we check up to 4 adjacent cells, which is a constant factor."
    },
    {
      id: "google-q3",
      question: "In Google interviews, which of these algorithmic approaches is most frequently tested?",
      options: [
        "Brute force enumeration",
        "Dynamic programming with optimizations",
        "Randomized algorithms",
        "Machine learning algorithms"
      ],
      correctAnswer: 1,
      explanation: "Dynamic programming with optimizations is frequently tested in Google interviews. Google values efficient solutions to complex problems, and DP with proper optimization demonstrates a candidate's ability to identify patterns, reuse computation, and optimize for both time and space complexity."
    },
    {
      id: "google-q4",
      question: "What is the key insight in efficiently solving the 'Next Permutation' problem?",
      options: [
        "Using sorting to find the next lexicographical permutation",
        "Finding the first decreasing element from the right, then swapping with its successor",
        "Generating all permutations and finding the next one",
        "Applying binary search to locate the next permutation"
      ],
      correctAnswer: 1,
      explanation: "The key insight is finding the first decreasing element from the right, then swapping it with the smallest element to its right that is larger than it, and finally reversing the remaining elements. This gives the next permutation in O(n) time without generating all permutations."
    },
    {
      id: "google-q5",
      question: "Which feature of Google's technical interviews is particularly distinctive compared to other companies?",
      options: [
        "Focus on academic computer science theory",
        "Emphasis on problem-solving approach and trade-off discussions",
        "Requirement to write fully compilable code",
        "Focus on specific programming languages"
      ],
      correctAnswer: 1,
      explanation: "Google's technical interviews distinctively emphasize the problem-solving approach and discussions about trade-offs. While solving the problem correctly is important, Google interviewers place significant value on how candidates approach problems, analyze different solutions, and articulate the trade-offs between alternative approaches."
    }
  ]
};

export default googleProblemsContent; 