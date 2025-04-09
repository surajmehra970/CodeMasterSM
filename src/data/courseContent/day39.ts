import { Content } from '@/types/course';

const mockTestWeek7Content: Content = {
  introduction: "This mock test covers the graph algorithms we've studied during Week 7. The test assesses your understanding of algorithms like Bellman-Ford, Floyd-Warshall, and Topological Sort. You'll be tested on implementing these algorithms, analyzing their time and space complexity, and applying them to solve real-world problems. Remember to carefully read each question and understand the requirements before attempting a solution.",
  
  learningObjectives: [
    "Test your understanding of the Bellman-Ford algorithm and its applications",
    "Evaluate your knowledge of the Floyd-Warshall algorithm for all-pairs shortest paths",
    "Assess your ability to implement and apply Topological Sort",
    "Measure your proficiency in cycle detection in directed graphs",
    "Test your understanding of the time and space complexity of graph algorithms"
  ],
  
  sections: [
    {
      title: "Instructions for the Mock Test",
      content: "This mock test consists of 5 coding problems and 5 theoretical questions. You have 2 hours to complete the test. For coding problems, focus on correctness first, and then optimize for efficiency. Provide clear explanations of your approach and analyze the time and space complexity of your solutions. For theoretical questions, provide concise and accurate answers with appropriate justifications. Good luck!"
    },
    {
      title: "Coding Problems",
      content: "The following coding problems assess your ability to implement graph algorithms and apply them to solve specific problems. Carefully consider edge cases and optimize your solutions where possible.",
      codeExamples: [
        {
          language: "java",
          code: `/**
 * Problem 1: Network Delay Time
 * 
 * You are given a network of n nodes, labeled from 1 to n. You are also given 
 * a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the 
 * source node, vi is the target node, and wi is the time it takes for a signal to 
 * travel from source to target.
 *
 * We will send a signal from node k. Return the minimum time it takes for all the 
 * n nodes to receive the signal. If it is impossible for all the n nodes to receive 
 * the signal, return -1.
 */
public int networkDelayTime(int[][] times, int n, int k) {
    // Initialize distance array
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    
    // Relax all edges |V| - 1 times
    for (int i = 0; i < n - 1; i++) {
        boolean updated = false;
        for (int[] edge : times) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        
        // Early termination if no updates were made
        if (!updated) break;
    }
    
    // Find the maximum distance (time)
    int maxTime = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    
    return maxTime;
}`,
          explanation: "This problem asks for the minimum time it takes for all nodes to receive a signal from a given source node. This is equivalent to finding the maximum of the shortest paths from the source to all other nodes, which can be solved using the Bellman-Ford algorithm. The implementation relaxes all edges n-1 times (or until no more updates are made), then returns the maximum distance. If any node is unreachable (has distance infinity), the function returns -1. The time complexity is O(V*E) where V is the number of vertices and E is the number of edges."
        },
        {
          language: "java",
          code: `/**
 * Problem 2: Find the City With the Smallest Number of Neighbors at a Threshold Distance
 * 
 * There are n cities numbered from 0 to n-1. Given a list of edges edges where 
 * edges[i] = [fromi, toi, weighti] represents a bidirectional edge with weight 
 * from fromi to toi, and a given threshold distanceThreshold.
 *
 * Return the city with the smallest number of cities that are reachable through 
 * some path and whose distance is at most distanceThreshold. If there are multiple 
 * such cities, return the city with the greatest number.
 */
public int findTheCity(int n, int[][] edges, int distanceThreshold) {
    // Initialize distance matrix
    int[][] dist = new int[n][n];
    for (int i = 0; i < n; i++) {
        Arrays.fill(dist[i], Integer.MAX_VALUE);
        dist[i][i] = 0;
    }
    
    // Initialize with direct edges
    for (int[] edge : edges) {
        int from = edge[0];
        int to = edge[1];
        int weight = edge[2];
        dist[from][to] = weight;
        dist[to][from] = weight; // Bidirectional edge
    }
    
    // Floyd-Warshall algorithm
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != Integer.MAX_VALUE && dist[k][j] != Integer.MAX_VALUE) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    int minCities = n;
    int resultCity = -1;
    
    // Find the city with the smallest number of reachable cities
    for (int i = 0; i < n; i++) {
        int reachableCities = 0;
        for (int j = 0; j < n; j++) {
            if (i != j && dist[i][j] <= distanceThreshold) {
                reachableCities++;
            }
        }
        
        if (reachableCities <= minCities) {
            minCities = reachableCities;
            resultCity = i;
        }
    }
    
    return resultCity;
}`,
          explanation: "This problem involves finding the city that has the smallest number of cities reachable within a given distance threshold. We use the Floyd-Warshall algorithm to compute all-pairs shortest paths, then count for each city the number of other cities reachable within the threshold. The city with the smallest count (or the highest-numbered city in case of a tie) is returned. The time complexity is O(n³) due to the Floyd-Warshall algorithm."
        },
        {
          language: "java",
          code: `/**
 * Problem 3: Course Schedule
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to 
 * numCourses - 1. You are given an array prerequisites where 
 * prerequisites[i] = [ai, bi] indicates that you must take course bi first 
 * if you want to take course ai.
 *
 * Return true if you can finish all courses. Otherwise, return false.
 */
public boolean canFinish(int numCourses, int[][] prerequisites) {
    // Build adjacency list representation
    List<List<Integer>> adjList = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) {
        adjList.add(new ArrayList<>());
    }
    
    for (int[] prereq : prerequisites) {
        adjList.get(prereq[1]).add(prereq[0]);
    }
    
    // Calculate in-degree for each vertex
    int[] inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) {
        for (int successor : adjList.get(i)) {
            inDegree[successor]++;
        }
    }
    
    // Initialize queue with vertices that have no prerequisites
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) {
            queue.offer(i);
        }
    }
    
    int removedEdges = 0;
    
    // Process vertices in topological order
    while (!queue.isEmpty()) {
        int curr = queue.poll();
        
        for (int successor : adjList.get(curr)) {
            inDegree[successor]--;
            removedEdges++;
            if (inDegree[successor] == 0) {
                queue.offer(successor);
            }
        }
    }
    
    // If all edges are removed, it's a DAG and all courses can be finished
    return removedEdges == prerequisites.length;
}`,
          explanation: "This problem is a classic application of topological sorting. We need to determine if all courses can be completed, which is possible only if there are no cyclic dependencies (the prerequisite graph is a DAG). The implementation uses Kahn's algorithm to perform topological sorting: we maintain in-degrees for each vertex, start with vertices having no prerequisites, and iteratively process them while updating in-degrees. If we can process all courses, then the courses can be finished. The time complexity is O(V + E) where V is the number of courses and E is the number of prerequisite relationships."
        },
        {
          language: "java",
          code: `/**
 * Problem 4: Critical Connections in a Network
 * 
 * There are n servers numbered from 0 to n-1 connected by undirected server-to-server 
 * connections forming a network where connections[i] = [a, b] represents a connection 
 * between servers a and b. Any server can reach any other server directly or indirectly 
 * through the network.
 *
 * A critical connection is a connection that, if removed, will make some servers unable 
 * to reach some other server.
 *
 * Return all critical connections in the network in any order.
 */
public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
    // Build adjacency list
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    
    for (List<Integer> connection : connections) {
        int u = connection.get(0);
        int v = connection.get(1);
        graph.get(u).add(v);
        graph.get(v).add(u);
    }
    
    List<List<Integer>> result = new ArrayList<>();
    int[] disc = new int[n]; // Discovery time
    int[] low = new int[n];  // Lowest discovery time reachable
    Arrays.fill(disc, -1);   // -1 means not visited
    
    // Tarjan's algorithm to find bridges
    for (int i = 0; i < n; i++) {
        if (disc[i] == -1) {
            dfs(i, 0, -1, disc, low, graph, result);
        }
    }
    
    return result;
}

private void dfs(int u, int time, int parent, int[] disc, int[] low, 
                List<List<Integer>> graph, List<List<Integer>> result) {
    // Initialize discovery time and low value
    disc[u] = low[u] = time++;
    
    for (int v : graph.get(u)) {
        // Skip the parent
        if (v == parent) continue;
        
        // If not visited, recurse
        if (disc[v] == -1) {
            dfs(v, time, u, disc, low, graph, result);
            
            // Update low value of u based on v
            low[u] = Math.min(low[u], low[v]);
            
            // If v cannot reach u's ancestors, (u, v) is a bridge
            if (low[v] > disc[u]) {
                result.add(Arrays.asList(u, v));
            }
        } else {
            // Update low value of u for visited vertices
            low[u] = Math.min(low[u], disc[v]);
        }
    }
}`,
          explanation: "This problem asks us to find all critical connections (bridges) in a network. A bridge is an edge that, if removed, increases the number of connected components in the graph. We use Tarjan's algorithm to find bridges in an undirected graph. The algorithm performs a DFS traversal, keeping track of discovery times and the lowest reachable discovery time for each vertex. If a vertex v cannot reach any ancestor of its parent u, then the edge (u, v) is a bridge. The time complexity is O(V + E) where V is the number of vertices and E is the number of edges."
        },
        {
          language: "java",
          code: `/**
 * Problem 5: Swim in Rising Water
 * 
 * You are given an n x n integer matrix grid where each value grid[i][j] represents the 
 * elevation at that point (i, j). The rain starts to rise. At time t, the depth of the water 
 * everywhere is t. You can swim from a cell to another 4-directionally adjacent cell 
 * if and only if the elevation of both cells is less than or equal to t.
 *
 * Return the least time until you can reach the bottom right cell (n-1, n-1) from the 
 * top left cell (0, 0).
 */
public int swimInWater(int[][] grid) {
    int n = grid.length;
    int left = grid[0][0]; // Minimum possible time
    int right = n * n - 1; // Maximum possible elevation
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (canReach(grid, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

private boolean canReach(int[][] grid, int waterLevel) {
    int n = grid.length;
    boolean[][] visited = new boolean[n][n];
    return dfs(grid, 0, 0, waterLevel, visited);
}

private boolean dfs(int[][] grid, int i, int j, int waterLevel, boolean[][] visited) {
    int n = grid.length;
    
    // Check boundaries and if already visited or height too high
    if (i < 0 || i >= n || j < 0 || j >= n || visited[i][j] || grid[i][j] > waterLevel) {
        return false;
    }
    
    // If reached the bottom right
    if (i == n - 1 && j == n - 1) {
        return true;
    }
    
    visited[i][j] = true;
    
    // Try all four directions
    int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    for (int[] dir : dirs) {
        int newI = i + dir[0];
        int newJ = j + dir[1];
        if (dfs(grid, newI, newJ, waterLevel, visited)) {
            return true;
        }
    }
    
    return false;
}`,
          explanation: "This problem involves finding the minimum water level such that we can swim from the top-left to the bottom-right cell. We use binary search to find this level, combined with DFS to check if it's possible to reach the destination at a given water level. For each potential water level, we perform a DFS from the top-left cell, considering only cells with elevation less than or equal to the current water level. The time complexity is O(n² log n) where n is the grid size, as we perform a binary search (log n) and for each level we potentially visit all cells in the grid (n²)."
        }
      ]
    },
    {
      title: "Theoretical Questions",
      content: "The following questions assess your theoretical understanding of graph algorithms. Provide clear explanations and examples where appropriate.",
      codeExamples: [
        {
          language: "text",
          code: `Question 1: Compare and contrast the Bellman-Ford algorithm with Dijkstra's algorithm. When would you choose one over the other?

The Bellman-Ford algorithm and Dijkstra's algorithm both solve the single-source shortest path problem, but with key differences:

1. **Negative edges**: Bellman-Ford can handle negative edge weights, while Dijkstra's cannot.

2. **Negative cycles**: Bellman-Ford can detect negative cycles, whereas Dijkstra's algorithm may produce incorrect results in graphs with negative edges.

3. **Time complexity**: Dijkstra's algorithm is more efficient with a time complexity of O(E log V) with a binary heap implementation, compared to Bellman-Ford's O(V*E).

4. **Implementation**: Dijkstra's uses a priority queue and is a greedy algorithm, while Bellman-Ford uses dynamic programming through iterative edge relaxation.

Choose Bellman-Ford when:
- The graph may contain negative edge weights
- You need to detect negative cycles
- The graph is relatively small or sparse

Choose Dijkstra's when:
- All edge weights are non-negative
- Performance is important, especially for large or dense graphs
- You need to find shortest paths incrementally (e.g., in real-time navigation)`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 2: Explain the concept of a 'strongly connected component' in a directed graph. How would you find all strongly connected components in a graph?

A strongly connected component (SCC) in a directed graph is a maximal subset of vertices such that for every pair of vertices u and v in the subset, there exists a path from u to v and a path from v to u. In other words, every vertex is reachable from every other vertex within the same SCC.

The two common algorithms to find SCCs are:

1. **Kosaraju's Algorithm**:
   - Perform a DFS traversal of the graph and record the finish times
   - Create the transpose graph (reverse all edges)
   - Perform DFS on the transpose graph in decreasing order of finish times
   - Each DFS tree in the second traversal is a strongly connected component

2. **Tarjan's Algorithm**:
   - Uses a single DFS traversal
   - Keeps track of discovery time and lowest reachable vertex
   - Uses a stack to process vertices in the correct order
   - Identifies SCCs when a vertex cannot reach any vertex with a lower discovery time

Both algorithms have O(V + E) time complexity, but Tarjan's is generally preferred for its simpler implementation requiring only one DFS traversal.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 3: What is the significance of the 'relaxation' step in shortest path algorithms like Bellman-Ford and Dijkstra's? Explain the concept and how it ensures correct results.

The relaxation step is a fundamental operation in shortest path algorithms that progressively improves path distance estimates. It works as follows:

For an edge (u, v) with weight w, if the current estimated distance to v is greater than the distance to u plus the weight of the edge (u, v), then update the distance to v to be the shorter path through u.

Mathematically: If dist[v] > dist[u] + w, then set dist[v] = dist[u] + w.

The significance of relaxation:

1. **Convergence**: Repeated application of relaxation eventually converges to the optimal solution. In Bellman-Ford, we relax all edges |V|-1 times to ensure correct shortest paths in the absence of negative cycles.

2. **Optimality guarantee**: The relaxation property ensures that once all possible relaxations have been applied, the resulting distances represent the shortest paths from the source.

3. **Handling different graph properties**: In Dijkstra's algorithm, relaxation is applied only to the neighbors of the vertex with the current minimum distance, ensuring greedy optimality for non-negative edge weights. In Bellman-Ford, relaxation is applied to all edges in each iteration, allowing it to handle negative edge weights.

4. **Negative cycle detection**: In Bellman-Ford, after |V|-1 iterations of relaxation, any further successful relaxation indicates the presence of a negative cycle.

Relaxation ensures correctness by gradually propagating shorter path information through the graph, always maintaining the invariant that the current distance estimate is an upper bound on the actual shortest path distance.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 4: Explain the concept of a 'bridge' in an undirected graph and how to efficiently identify all bridges. What are the practical applications of finding bridges in a network?

A bridge in an undirected graph is an edge that, if removed, increases the number of connected components in the graph. In other words, it's an edge that is not part of any cycle and whose removal would disconnect the graph.

**Identifying bridges efficiently**:
Bridges can be found using Tarjan's algorithm in O(V + E) time:

1. Perform a DFS traversal of the graph.
2. For each vertex, track two values:
   - Discovery time (disc[v]): when the vertex is first visited
   - Lowest reachable discovery time (low[v]): the earliest discovered vertex reachable from v
3. For each edge (u, v) where u is the parent of v in the DFS tree:
   - If low[v] > disc[u], then (u, v) is a bridge
   - This means v cannot reach any ancestor of u through any back edge

**Practical applications**:

1. **Network reliability**: Identifying critical connections whose failure would partition a network. These are potential points of failure that need redundancy.

2. **Road network analysis**: Finding critical roads or bridges whose closure would disconnect parts of a city.

3. **Social network analysis**: Identifying relationships that connect otherwise separate communities.

4. **Computer network design**: Planning redundant connections to avoid single points of failure.

5. **Articulation point detection**: Bridges help identify articulation points (cut vertices) whose removal would disconnect the graph.

6. **Biconnected component decomposition**: Bridges separate biconnected components, which are maximal subgraphs with no bridges.`,
          explanation: ""
        },
        {
          language: "text",
          code: `Question 5: Floyd-Warshall, Johnson's, and the repeated application of Dijkstra's algorithm are all approaches to the all-pairs shortest path problem. Compare their time complexities and discuss situations where each would be preferred.

Comparing approaches to the all-pairs shortest path problem:

**Floyd-Warshall**:
- Time complexity: O(V³)
- Space complexity: O(V²)
- A dynamic programming approach that works by considering all vertices as potential intermediate points
- Handles negative edge weights (but not negative cycles)
- Simple to implement with just three nested loops

**Johnson's Algorithm**:
- Time complexity: O(V² log V + VE)
- Uses a combination of Bellman-Ford and Dijkstra's algorithms
- Reweights edges to make all weights non-negative, then applies Dijkstra's from each vertex
- Handles negative edge weights (but not negative cycles)
- More complex implementation, but more efficient for sparse graphs

**Repeated Dijkstra's**:
- Time complexity: O(V × (E log V)) = O(VE log V)
- Simply runs Dijkstra's algorithm from each vertex
- Cannot handle negative edge weights
- Easy to implement if Dijkstra's is already available

**Preferred situations**:

- **Floyd-Warshall** is preferred when:
  - The graph is dense (E ≈ V²)
  - The graph is small (< 1000 vertices)
  - Implementation simplicity is important
  - The graph has negative edge weights

- **Johnson's** is preferred when:
  - The graph is sparse (E << V²)
  - The graph is large
  - The graph has negative edge weights
  - Maximum performance is required for large sparse graphs

- **Repeated Dijkstra's** is preferred when:
  - The graph has only non-negative edge weights
  - The graph is sparse
  - Implementation simplicity is important
  - Only a subset of all-pairs distances is needed (can stop early)`,
          explanation: ""
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "mock7-hw1",
      question: "Implement an algorithm to find all articulation points (cut vertices) in an undirected graph. An articulation point is a vertex that, when removed, increases the number of connected components in the graph.",
      solution: "Use Tarjan's algorithm to find articulation points. During DFS traversal, track discovery times and lowest reachable discovery times. A vertex u is an articulation point if either: (1) u is the root of the DFS tree and has at least two children, or (2) u is not the root and there exists a child v such that the lowest reachable discovery time of v is greater than or equal to the discovery time of u."
    },
    {
      id: "mock7-hw2",
      question: "Given a directed graph, implement an algorithm to find all strongly connected components. A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex.",
      solution: "Implement Tarjan's algorithm for strongly connected components. Perform a DFS traversal, keeping track of discovery times and lowest reachable discovery times. Use a stack to store vertices in the order they are visited. When a vertex is found that cannot reach any vertex with a lower discovery time (i.e., low[v] == disc[v]), pop vertices from the stack until v is popped to form a strongly connected component."
    },
    {
      id: "mock7-hw3",
      question: "Implement an algorithm to detect negative cycles in a weighted directed graph. A negative cycle is a cycle whose sum of edge weights is negative.",
      solution: "Use the Bellman-Ford algorithm. Run the standard algorithm for n-1 iterations (where n is the number of vertices) to compute shortest paths. Then, perform one more iteration. If any distance is updated in this additional iteration, the graph contains a negative cycle. To identify the vertices in the cycle, start from a vertex whose distance was updated and follow predecessor pointers until you revisit a vertex."
    },
    {
      id: "mock7-hw4",
      question: "Given a directed acyclic graph (DAG) with weighted edges, find the longest path from a given source vertex to each other vertex. A longest path is one with maximum total weight.",
      solution: "First, negate all edge weights to convert the longest path problem to a shortest path problem. Then, perform a topological sort of the graph. Process vertices in topological order, computing the longest path to each vertex by considering all incoming edges. For each edge (u,v), update the distance to v if dist[u] + weight(u,v) > dist[v]. Initialize dist[source] = 0 and dist[v] = -∞ for all other vertices."
    }
  ],
  
  quiz: [
    {
      id: "mock7-q1",
      question: "What is the time complexity of the Bellman-Ford algorithm?",
      options: ["O(V log V)", "O(V + E)", "O(V * E)", "O(V²)"],
      correctAnswer: 2,
      explanation: "The time complexity of the Bellman-Ford algorithm is O(V * E), where V is the number of vertices and E is the number of edges. This is because the algorithm performs V-1 iterations, and in each iteration, it relaxes all E edges."
    },
    {
      id: "mock7-q2",
      question: "When running the Floyd-Warshall algorithm, what does the value dist[i][j] represent after the kth iteration of the outer loop?",
      options: [
        "The length of the shortest path from i to j using only vertices numbered 0 to k as intermediate vertices",
        "The length of the shortest path from i to j using exactly k intermediate vertices",
        "The length of the shortest path from i to j using at most k edges",
        "The length of the shortest path from i to j going through vertex k"
      ],
      correctAnswer: 0,
      explanation: "After the kth iteration of the outer loop in the Floyd-Warshall algorithm, dist[i][j] represents the length of the shortest path from vertex i to vertex j using only vertices numbered 0 to k as intermediate vertices. This is the key insight behind the dynamic programming approach used in Floyd-Warshall."
    },
    {
      id: "mock7-q3",
      question: "Which of the following statements about topological sort is FALSE?",
      options: [
        "A topological sort is possible if and only if the graph is a directed acyclic graph (DAG)",
        "A graph can have multiple valid topological orderings",
        "Topological sort can be used to detect cycles in a directed graph",
        "The first vertex in any topological ordering must have the highest in-degree"
      ],
      correctAnswer: 3,
      explanation: "The statement 'The first vertex in any topological ordering must have the highest in-degree' is FALSE. In fact, the opposite is true: the first vertex in a topological ordering must have an in-degree of 0, meaning it has no incoming edges (no prerequisites). Vertices with higher in-degrees appear later in the topological ordering."
    },
    {
      id: "mock7-q4",
      question: "In a strongly connected directed graph with n vertices, what is the minimum number of edges that must be present?",
      options: ["n", "n-1", "n+1", "n(n-1)/2"],
      correctAnswer: 0,
      explanation: "In a strongly connected directed graph with n vertices, the minimum number of edges is n. This occurs in a simple cycle where each vertex has exactly one incoming and one outgoing edge, forming a circuit that visits all vertices. With fewer than n edges, at least one vertex would have no incoming or no outgoing edge, making it impossible for the graph to be strongly connected."
    },
    {
      id: "mock7-q5",
      question: "Which of the following algorithms can detect negative cycles in a weighted directed graph?",
      options: [
        "Dijkstra's algorithm",
        "Bellman-Ford algorithm",
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)"
      ],
      correctAnswer: 1,
      explanation: "The Bellman-Ford algorithm can detect negative cycles in a weighted directed graph. After running the standard Bellman-Ford algorithm for V-1 iterations (where V is the number of vertices), if an additional iteration produces any further improvements to the shortest path estimates, it indicates the presence of a negative cycle. Dijkstra's algorithm doesn't work with negative weights, while standard DFS and BFS don't consider edge weights at all."
    }
  ]
};

export default mockTestWeek7Content; 