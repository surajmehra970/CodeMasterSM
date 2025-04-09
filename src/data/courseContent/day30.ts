import { Content } from '@/types/course';

const mockTestGraphsContent: Content = {
  introduction: "This mock test is designed to assess your understanding of graph algorithms and concepts covered in the previous lessons. You'll be challenged with problems related to graph representation, BFS, DFS, and Dijkstra's algorithm. These questions test both your theoretical knowledge and practical implementation skills for graph algorithms.",
  
  learningObjectives: [
    "Test your understanding of different graph representation techniques",
    "Apply BFS and DFS to solve complex graph problems",
    "Implement Dijkstra's algorithm for shortest path problems",
    "Analyze time and space complexity of graph algorithms",
    "Design efficient solutions for real-world graph problems"
  ],
  
  sections: [
    {
      title: "Instructions for the Mock Test",
      content: "This mock test consists of 5 coding challenges and 5 theoretical questions. For coding challenges, implement the solution in your preferred programming language. The problems increase in difficulty, so manage your time accordingly. You have 2 hours to complete the test. Review your solutions for correctness and efficiency before submission.",
      codeExamples: []
    },
    {
      title: "Coding Problems",
      content: "Solve the following coding problems related to graph algorithms. Focus on both correctness and efficiency in your solutions.",
      codeExamples: [
        {
          language: "java",
          code: `// Problem 1: Number of Islands
// Given an m x n 2D binary grid 'grid' which represents a map of '1's (land) and '0's (water),
// return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.

public int numIslands(char[][] grid) {
    // Implement your solution here
    if (grid == null || grid.length == 0) {
        return 0;
    }
    
    int numRows = grid.length;
    int numCols = grid[0].length;
    int count = 0;
    
    for (int r = 0; r < numRows; r++) {
        for (int c = 0; c < numCols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    int numRows = grid.length;
    int numCols = grid[0].length;
    
    // Check boundaries and if current cell is land
    if (r < 0 || c < 0 || r >= numRows || c >= numCols || grid[r][c] == '0') {
        return;
    }
    
    // Mark current land as visited by changing it to '0'
    grid[r][c] = '0';
    
    // Visit all adjacent lands
    dfs(grid, r - 1, c); // up
    dfs(grid, r + 1, c); // down
    dfs(grid, r, c - 1); // left
    dfs(grid, r, c + 1); // right
}

// Problem 2: Course Schedule
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// Some courses may have prerequisites. For example, if prerequisites[i] = [ai, bi],
// this means you must take the course bi before the course ai.
// Given the total number of courses and a list of prerequisite pairs, 
// determine if it is possible to finish all courses.

public boolean canFinish(int numCourses, int[][] prerequisites) {
    // Implement your solution here
    // Create adjacency list
    List<Integer>[] adjList = new ArrayList[numCourses];
    for (int i = 0; i < numCourses; i++) {
        adjList[i] = new ArrayList<>();
    }
    
    // Fill adjacency list
    for (int[] prereq : prerequisites) {
        adjList[prereq[1]].add(prereq[0]);
    }
    
    // 0 = unvisited, 1 = visiting, 2 = visited
    int[] visited = new int[numCourses];
    
    for (int i = 0; i < numCourses; i++) {
        if (visited[i] == 0) {
            if (hasCycle(adjList, visited, i)) {
                return false;
            }
        }
    }
    
    return true;
}

private boolean hasCycle(List<Integer>[] adjList, int[] visited, int curr) {
    // If node is currently being visited, we found a cycle
    if (visited[curr] == 1) {
        return true;
    }
    
    // If node has been completely visited, no cycle through this path
    if (visited[curr] == 2) {
        return false;
    }
    
    // Mark as currently visiting
    visited[curr] = 1;
    
    // Check all neighbors
    for (int next : adjList[curr]) {
        if (hasCycle(adjList, visited, next)) {
            return true;
        }
    }
    
    // Mark as completely visited
    visited[curr] = 2;
    return false;
}

// Problem 3: Network Delay Time
// You are given a network of n nodes, labeled from 1 to n. You are also given a list of travel times
// as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, 
// and wi is the time it takes for a signal to travel from source to target.
// We will send a signal from a given node k. Return the minimum time it takes for all the n nodes
// to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

public int networkDelayTime(int[][] times, int n, int k) {
    // Implement your solution here
    // Create adjacency list with weights
    Map<Integer, List<int[]>> graph = new HashMap<>();
    for (int i = 1; i <= n; i++) {
        graph.put(i, new ArrayList<>());
    }
    
    for (int[] time : times) {
        int source = time[0];
        int target = time[1];
        int weight = time[2];
        graph.get(source).add(new int[]{target, weight});
    }
    
    // Min heap to get node with minimum distance
    // [node, distance]
    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    minHeap.offer(new int[]{k, 0});
    
    // Keep track of visited nodes and their distances
    Map<Integer, Integer> distances = new HashMap<>();
    
    while (!minHeap.isEmpty()) {
        int[] current = minHeap.poll();
        int node = current[0];
        int distance = current[1];
        
        // If we've already processed this node with a shorter path, skip it
        if (distances.containsKey(node)) {
            continue;
        }
        
        // Mark node as visited with its distance
        distances.put(node, distance);
        
        // Process all neighbors
        for (int[] neighbor : graph.get(node)) {
            int nextNode = neighbor[0];
            int weight = neighbor[1];
            
            // If we haven't visited this node yet
            if (!distances.containsKey(nextNode)) {
                minHeap.offer(new int[]{nextNode, distance + weight});
            }
        }
    }
    
    // Check if all nodes received the signal
    if (distances.size() != n) {
        return -1;
    }
    
    // Find the maximum time
    int maxTime = 0;
    for (int time : distances.values()) {
        maxTime = Math.max(maxTime, time);
    }
    
    return maxTime;
}

// Problem 4: Clone Graph
// Given a reference of a node in a connected undirected graph,
// return a deep copy (clone) of the graph.
// Each node in the graph contains a value (int) and a list of its neighbors.

/*
class Node {
    public int val;
    public List<Node> neighbors;
}
*/

public Node cloneGraph(Node node) {
    // Implement your solution here
    if (node == null) {
        return null;
    }
    
    // Map to keep track of cloned nodes
    Map<Node, Node> cloneMap = new HashMap<>();
    
    // BFS to traverse the graph
    Queue<Node> queue = new LinkedList<>();
    queue.offer(node);
    
    // Clone the first node
    cloneMap.put(node, new Node(node.val));
    
    while (!queue.isEmpty()) {
        Node current = queue.poll();
        
        // Process all neighbors
        for (Node neighbor : current.neighbors) {
            // If neighbor hasn't been cloned yet
            if (!cloneMap.containsKey(neighbor)) {
                // Clone the neighbor
                cloneMap.put(neighbor, new Node(neighbor.val));
                queue.offer(neighbor);
            }
            
            // Connect current clone to neighbor's clone
            cloneMap.get(current).neighbors.add(cloneMap.get(neighbor));
        }
    }
    
    return cloneMap.get(node);
}

// Problem 5: Word Ladder
// Given two words, beginWord and endWord, and a dictionary wordList,
// return the number of words in the shortest transformation sequence 
// from beginWord to endWord, or 0 if no such sequence exists.
// At each step, you can change exactly one letter in the word.
// Each transformed word must exist in the word list.

public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    // Implement your solution here
    // Convert wordList to a set for O(1) lookup
    Set<String> wordSet = new HashSet<>(wordList);
    
    // Check if endWord is in the dictionary
    if (!wordSet.contains(endWord)) {
        return 0;
    }
    
    // BFS queue
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    
    // Mark beginWord as visited
    wordSet.remove(beginWord);
    
    // Track the level (transformation sequence length)
    int level = 1;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            String currentWord = queue.poll();
            
            // Try all possible transformations of currentWord
            char[] wordChars = currentWord.toCharArray();
            
            for (int j = 0; j < wordChars.length; j++) {
                char originalChar = wordChars[j];
                
                // Try replacing the current character with all letters
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == originalChar) {
                        continue;
                    }
                    
                    wordChars[j] = c;
                    String transformedWord = new String(wordChars);
                    
                    // If this is the end word, return the level + 1
                    if (transformedWord.equals(endWord)) {
                        return level + 1;
                    }
                    
                    // If the transformed word is in the dictionary
                    if (wordSet.contains(transformedWord)) {
                        queue.offer(transformedWord);
                        wordSet.remove(transformedWord); // Mark as visited
                    }
                }
                
                // Restore the original character
                wordChars[j] = originalChar;
            }
        }
        
        // Move to the next level
        level++;
    }
    
    // No transformation sequence found
    return 0;
}`,
          explanation: "These coding problems cover a range of graph algorithms, including DFS for finding connected components, detecting cycles in directed graphs, Dijkstra's algorithm for shortest paths, BFS for graph cloning, and BFS for word transformation problems."
        }
      ]
    },
    {
      title: "Theoretical Questions",
      content: "Answer the following theoretical questions about graph algorithms. Be specific and concise in your explanations.",
      codeExamples: [
        {
          language: "text",
          code: `// Question 1: Compare and contrast the adjacency matrix and adjacency list representations of graphs.
// When would you prefer one over the other?

Adjacency Matrix:
- Representation: A 2D array where matrix[i][j] = 1 if there's an edge from i to j, otherwise 0
- Space complexity: O(V²) where V is the number of vertices
- Edge lookup: O(1) time to check if an edge exists
- Adding a vertex: O(V²) time (need to resize the matrix)
- Finding all neighbors: O(V) time (need to scan an entire row)

Adjacency List:
- Representation: An array of lists where each list contains the neighbors of a vertex
- Space complexity: O(V + E) where V is the number of vertices and E is the number of edges
- Edge lookup: O(degree(v)) time to check if an edge exists
- Adding a vertex: O(1) time
- Finding all neighbors: O(degree(v)) time (directly from the list)

Prefer Adjacency Matrix when:
- The graph is dense (many edges)
- We need fast edge lookups
- The graph is small (low memory concern)
- We need to represent weighted edges simply

Prefer Adjacency List when:
- The graph is sparse (few edges)
- We need to find all neighbors efficiently
- Memory usage is a concern
- The graph size may change frequently

// Question 2: Explain the differences between BFS and DFS graph traversals. 
// What are their respective time and space complexities, and when is each approach preferred?

BFS (Breadth-First Search):
- Traverses level by level, visiting all neighbors before moving to the next level
- Uses a queue data structure
- Finds the shortest path in unweighted graphs
- Time complexity: O(V + E)
- Space complexity: O(V) for the queue (can be as large as all vertices at a level)

DFS (Depth-First Search):
- Traverses as far as possible along each branch before backtracking
- Uses a stack (or recursion) data structure
- Good for exploring all possible paths
- Time complexity: O(V + E)
- Space complexity: O(h) where h is the height of the DFS tree (worst case O(V))

Prefer BFS when:
- Finding the shortest path in unweighted graphs
- Searching for nodes closer to the source
- Working with graphs where the solution is likely near the source
- Level-order processing is needed

Prefer DFS when:
- Exploring all possible paths
- Detecting cycles
- Topological sorting
- Solving maze-like problems
- Memory usage is a concern with wide graphs

// Question 3: Explain how Dijkstra's algorithm works and its limitations. 
// What is its time complexity with different implementations?

Dijkstra's Algorithm:
- Finds the shortest path from a source vertex to all other vertices in a weighted graph
- Works by greedily selecting the unvisited vertex with the smallest tentative distance
- Maintains a set of unvisited nodes and distances from the source
- Relaxes edges from the current node and updates distances if shorter paths are found

Limitations:
- Cannot handle graphs with negative edge weights
- May not work correctly in graphs with negative cycles
- Not ideal for dense graphs when implemented with an array

Time Complexity:
- With an adjacency matrix and array for distances: O(V²)
- With an adjacency list and binary heap: O((V + E) log V)
- With an adjacency list and Fibonacci heap: O(E + V log V)

Space Complexity:
- O(V) for storing distances and visited status

Dijkstra's algorithm is preferred for finding shortest paths in weighted graphs without negative edges, while Bellman-Ford is used when negative edges exist.

// Question 4: Describe the cycle detection algorithm in directed graphs using DFS.
// How would you modify the approach for undirected graphs?

Cycle Detection in Directed Graphs using DFS:
1. Maintain three states for each vertex:
   - Unvisited: Node hasn't been processed yet
   - Visiting: Node is currently being processed (in the DFS stack)
   - Visited: Node and all its descendants have been processed
2. For each unvisited vertex, perform DFS
3. During DFS, mark the current vertex as "visiting"
4. For each neighbor:
   - If the neighbor is unvisited, recursively call DFS
   - If the neighbor is "visiting", we've found a back edge, indicating a cycle
   - If the neighbor is "visited", continue to the next neighbor
5. After processing all neighbors, mark the current vertex as "visited"

For Undirected Graphs:
- The main difference is that every edge creates a trivial cycle with its reverse edge
- We need to avoid this by keeping track of the parent node
- Only consider a cycle if an adjacent vertex is visited and is not the parent of the current vertex
- Only need two states (visited/unvisited) since we're explicitly tracking the parent

Time Complexity: O(V + E) for both directed and undirected graph cycle detection
Space Complexity: O(V) for the recursive call stack and visited states

// Question 5: Explain the concept of a topological sort and how it relates to DAGs (Directed Acyclic Graphs).
// Provide an algorithm to perform a topological sort.

Topological Sort:
- A linear ordering of vertices in a directed graph such that for every directed edge (u, v), vertex u comes before vertex v in the ordering
- Only possible on Directed Acyclic Graphs (DAGs) - graphs with no cycles
- Used for scheduling tasks with dependencies, course prerequisites, and build systems

Relation to DAGs:
- Topological sort is only defined for DAGs
- If a graph has a cycle, no valid topological ordering exists
- The presence of a valid topological sort is equivalent to the graph being a DAG

Algorithm (DFS-based):
1. Create a visited array and a result list (or stack)
2. For each unvisited vertex:
   a. Mark it as visited
   b. Recursively visit all its unvisited neighbors
   c. After visiting all neighbors, add the current vertex to the front of the result list
3. The result list contains the topological sort (in reverse order if using a stack)

Alternative Algorithm (Kahn's Algorithm - BFS-based):
1. Calculate in-degree for all vertices
2. Enqueue all vertices with in-degree 0
3. While queue is not empty:
   a. Dequeue a vertex and add it to the result
   b. Reduce in-degree of all its neighbors by 1
   c. If any neighbor's in-degree becomes 0, enqueue it
4. If the result list has fewer than |V| vertices, the graph has a cycle

Time Complexity: O(V + E) for both algorithms
Space Complexity: O(V) for storing the visited status and result`,
          explanation: "These theoretical questions cover fundamental concepts in graph theory and algorithms, including graph representations, traversal methods, shortest path algorithms, cycle detection, and topological sorting."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement an algorithm to find all bridges in an undirected graph. A bridge is an edge whose removal increases the number of connected components.",
      solution: "Use Tarjan's algorithm with DFS. During the DFS traversal, keep track of discovery times and the lowest reachable vertex from each vertex. An edge (u, v) is a bridge if the lowest vertex reachable from v without using the edge (u, v) is higher than the discovery time of u."
    },
    {
      id: "hw-2",
      question: "Design an algorithm to find the shortest path between two vertices in a weighted graph where some edges have negative weights but there are no negative cycles.",
      solution: "Use the Bellman-Ford algorithm, which can handle negative edge weights. Initialize distances to all vertices as infinity except the source (0). Relax all edges V-1 times, where V is the number of vertices. After relaxation, check for negative cycles by attempting one more relaxation."
    },
    {
      id: "hw-3",
      question: "Implement a solution to find all articulation points (cut vertices) in an undirected graph. An articulation point is a vertex whose removal increases the number of connected components.",
      solution: "Use Tarjan's algorithm with DFS. During traversal, keep track of discovery times and the lowest reachable vertex. A vertex is an articulation point if either: (1) it's the root and has more than one child, or (2) it's not the root and there exists a child whose lowest reachable vertex is not less than the discovery time of the current vertex."
    },
    {
      id: "hw-4",
      question: "Given a graph representing a social network, design an algorithm to find the 'friend circle'. A friend circle is a group of people where each person is friends with at least one other person in the group.",
      solution: "This is equivalent to finding connected components in the graph. Use either BFS or DFS to explore each connected component. Start with an unvisited person, explore all their friends using BFS/DFS, mark them as visited, and count this as one friend circle. Repeat until all people are visited."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "What is the maximum number of edges in a directed graph with n vertices?",
      options: ["n-1", "n", "n(n-1)/2", "n(n-1)"],
      correctAnswer: 3,
      explanation: "In a directed graph, each vertex can have at most n-1 outgoing edges (to every other vertex). With n vertices, the maximum number of edges is n(n-1)."
    },
    {
      id: "quiz-2",
      question: "Which algorithm can find the shortest path in a graph with negative edge weights?",
      options: ["Dijkstra's algorithm", "Bellman-Ford algorithm", "Breadth-first search", "Depth-first search"],
      correctAnswer: 1,
      explanation: "Bellman-Ford algorithm can handle negative edge weights, while Dijkstra's algorithm cannot. BFS only works for unweighted graphs, and DFS doesn't guarantee the shortest path."
    },
    {
      id: "quiz-3",
      question: "What is the space complexity of an adjacency list representation for a graph with V vertices and E edges?",
      options: ["O(1)", "O(V)", "O(E)", "O(V + E)"],
      correctAnswer: 3,
      explanation: "In an adjacency list representation, we need O(V) space for the array of lists and O(E) space for storing all the edges across all lists, resulting in a total space complexity of O(V + E)."
    },
    {
      id: "quiz-4",
      question: "Which of the following problems can be solved using topological sort?",
      options: [
        "Finding the shortest path in a weighted graph", 
        "Detecting a cycle in an undirected graph", 
        "Scheduling tasks with dependencies", 
        "Finding the minimum spanning tree"
      ],
      correctAnswer: 2,
      explanation: "Topological sort is ideal for scheduling tasks with dependencies, as it provides an ordering where all dependencies of a task come before the task itself. This is essentially a problem of ordering nodes in a DAG."
    },
    {
      id: "quiz-5",
      question: "What is the worst-case time complexity of Dijkstra's algorithm implemented with a binary heap on a graph with V vertices and E edges?",
      options: ["O(V)", "O(V log V)", "O(E log V)", "O((V + E) log V)"],
      correctAnswer: 3,
      explanation: "With a binary heap implementation, Dijkstra's algorithm takes O(V log V) for heap operations on vertices and O(E log V) for edge relaxation operations. The dominant term is O((V + E) log V), which simplifies to O(E log V) when the graph is connected (E ≥ V-1)."
    }
  ]
};

export default mockTestGraphsContent; 