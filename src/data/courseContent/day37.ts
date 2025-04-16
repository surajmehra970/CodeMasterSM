import { Content } from '@/types/course';

const floydWarshallContent: Content = {
  introduction: "The Floyd-Warshall algorithm is a powerful all-pairs shortest path algorithm that computes the shortest paths between all pairs of vertices in a weighted graph. Unlike Dijkstra's or Bellman-Ford that find shortest paths from a single source, Floyd-Warshall efficiently calculates distances between all vertex pairs in a single execution. It works with positive or negative edge weights and can detect negative cycles.",
  
  learningObjectives: [
    "Understand the principles behind the Floyd-Warshall algorithm",
    "Implement the Floyd-Warshall algorithm to find all-pairs shortest paths",
    "Analyze the time and space complexity of the algorithm",
    "Detect negative cycles using the Floyd-Warshall algorithm",
    "Apply optimizations and variations for practical applications"
  ],
  
  sections: [
    {
      title: "Understanding the Floyd-Warshall Algorithm",
      content: "The Floyd-Warshall algorithm is an elegant dynamic programming solution to the all-pairs shortest paths problem. It works by incrementally improving an estimate on the shortest path between two vertices, considering all vertices as potential intermediate points in the path. The key insight is that if there's a shorter path from i to j that goes through vertex k, we should update our distance matrix.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic structure for Floyd-Warshall algorithm
class Graph {
    private static final int INF = 99999;
    private int V; // Number of vertices
    private int[][] dist; // Distance matrix
    
    public Graph(int v) {
        V = v;
        dist = new int[V][V];
        
        // Initialize the distance matrix
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (i == j)
                    dist[i][j] = 0; // Distance from a vertex to itself is 0
                else
                    dist[i][j] = INF; // Set initial distance to infinity
            }
        }
    }
    
    // Add a directed edge from vertex u to vertex v with weight w
    public void addEdge(int u, int v, int weight) {
        dist[u][v] = weight;
    }
    
    // Example graph for illustration
    // 0 -- 3
    // |    |
    // |    |
    // 1 -- 2
    // Edges: (0,1,5), (0,3,10), (1,2,3), (2,3,1)
    static Graph createExampleGraph() {
        Graph g = new Graph(4);
        g.addEdge(0, 1, 5);
        g.addEdge(0, 3, 10);
        g.addEdge(1, 0, 5);  // For undirected graph
        g.addEdge(1, 2, 3);
        g.addEdge(2, 1, 3);  // For undirected graph
        g.addEdge(2, 3, 1);
        g.addEdge(3, 0, 10); // For undirected graph
        g.addEdge(3, 2, 1);  // For undirected graph
        return g;
    }`,
          explanation: "This code sets up the basic structure for implementing the Floyd-Warshall algorithm. We define a Graph class with an adjacency matrix representation (the distance matrix). Each cell dist[i][j] represents the shortest known distance from vertex i to vertex j. Initially, we set the distance from a vertex to itself as 0 and all other distances as infinity. The example creates a simple undirected weighted graph with 4 vertices."
        }
      ]
    },
    {
      title: "The Floyd-Warshall Algorithm Implementation",
      content: "The core of the Floyd-Warshall algorithm involves a three-nested loop structure. For each vertex k, we check if going from i to j through k gives a shorter path than the current known path from i to j. If it does, we update our distance matrix. After processing all vertices as potential intermediate points, the distance matrix contains the shortest path distances between all pairs of vertices.",
      codeExamples: [
        {
          language: "java",
          code: `// Floyd-Warshall algorithm implementation
void floydWarshall() {
    // The core algorithm - consider each vertex as an intermediate
    for (int k = 0; k < V; k++) {
        // Pick all vertices as source one by one
        for (int i = 0; i < V; i++) {
            // Pick all vertices as destination
            for (int j = 0; j < V; j++) {
                // If vertex k is on the shortest path from i to j,
                // update the value of dist[i][j]
                if (dist[i][k] != INF && dist[k][j] != INF && 
                    dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    // Check for negative cycles
    for (int i = 0; i < V; i++) {
        if (dist[i][i] < 0) {
            System.out.println("Graph contains negative weight cycle");
            return;
        }
    }
}

// Print the solution
void printSolution() {
    System.out.println("Shortest distances between every pair of vertices:");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF)
                System.out.print("INF ");
            else
                System.out.print(dist[i][j] + "   ");
        }
        System.out.println();
    }
}

// Usage example
void main() {
    Graph graph = createExampleGraph();
    graph.floydWarshall();
    graph.printSolution();
}`,
          explanation: "This implementation of the Floyd-Warshall algorithm consists of three nested loops, each iterating over all vertices. The outer loop selects each vertex k as a potential intermediate vertex. The two inner loops consider all possible pairs of vertices (i,j) and check if going from i to j through k gives a shorter path. The time complexity is O(V³), where V is the number of vertices. After running the algorithm, we can check for negative cycles by examining if any vertex has a negative distance to itself."
        }
      ]
    },
    {
      title: "Path Reconstruction",
      content: "The basic Floyd-Warshall algorithm computes the shortest distances between all pairs of vertices but doesn't provide the actual paths. To reconstruct the shortest paths, we need to maintain a predecessor matrix that keeps track of the intermediate vertices in the shortest paths.",
      codeExamples: [
        {
          language: "java",
          code: `// Floyd-Warshall with path reconstruction
class GraphWithPath {
    private static final int INF = 99999;
    private int V;
    private int[][] dist; // Distance matrix
    private int[][] next; // For path reconstruction
    
    public GraphWithPath(int v) {
        V = v;
        dist = new int[V][V];
        next = new int[V][V];
        
        // Initialize the distance and next matrices
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                    next[i][j] = j; // Next vertex is itself
                } else {
                    dist[i][j] = INF;
                    next[i][j] = -1; // No path initially
                }
            }
        }
    }
    
    // Add a directed edge
    public void addEdge(int u, int v, int weight) {
        dist[u][v] = weight;
        next[u][v] = v; // Next vertex to visit from u to v is v
    }
    
    // Floyd-Warshall with path reconstruction
    void floydWarshall() {
        // Initialize the next matrix
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][j] != INF) {
                    next[i][j] = j;
                }
            }
        }
        
        // Main algorithm
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] != INF && dist[k][j] != INF && 
                        dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k]; // Update the next vertex
                    }
                }
            }
        }
        
        // Check for negative cycles
        for (int i = 0; i < V; i++) {
            if (dist[i][i] < 0) {
                System.out.println("Graph contains negative weight cycle");
                return;
            }
        }
    }
    
    // Reconstruct the path from u to v
    List<Integer> getPath(int u, int v) {
        if (next[u][v] == -1) {
            return new ArrayList<>(); // No path exists
        }
        
        List<Integer> path = new ArrayList<>();
        path.add(u);
        
        while (u != v) {
            u = next[u][v];
            path.add(u);
        }
        
        return path;
    }
    
    // Print all shortest paths
    void printAllPaths() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (i != j && dist[i][j] != INF) {
                    List<Integer> path = getPath(i, j);
                    System.out.print("Shortest path from " + i + " to " + j + ": ");
                    for (int k = 0; k < path.size() - 1; k++) {
                        System.out.print(path.get(k) + " -> ");
                    }
                    System.out.println(path.get(path.size() - 1) + 
                                     " (Distance: " + dist[i][j] + ")");
                }
            }
        }
    }
}`,
          explanation: "This implementation extends the basic Floyd-Warshall algorithm to reconstruct the shortest paths. We maintain a 'next' matrix where next[i][j] represents the next vertex to visit on the shortest path from i to j. When we update the distance matrix, we also update the next matrix. To reconstruct a path from vertex u to vertex v, we follow the next pointers from u until we reach v. This gives us the complete shortest path between any two vertices."
        }
      ]
    },
    {
      title: "Optimizations and Applications",
      content: "The Floyd-Warshall algorithm has a time complexity of O(V³), which can be prohibitive for large graphs. However, there are several optimizations and practical applications worth considering.",
      codeExamples: [
        {
          language: "java",
          code: `// Floyd-Warshall with early termination
void floydWarshallOptimized() {
    // Check if the matrix has already converged
    boolean changed;
    
    // Main algorithm
    for (int k = 0; k < V; k++) {
        changed = false;
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF && 
                    dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    changed = true;
                }
            }
        }
        
        // If no changes were made in this iteration, the algorithm has converged
        if (!changed) {
            System.out.println("Early termination at iteration " + k);
            break;
        }
    }
}

// Transitive closure of a graph using Floyd-Warshall
boolean[][] transitiveClosureFloydWarshall(boolean[][] graph) {
    int V = graph.length;
    boolean[][] tc = new boolean[V][V];
    
    // Initialize the transitive closure matrix
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            tc[i][j] = graph[i][j];
        }
    }
    
    // Floyd-Warshall algorithm for transitive closure
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                // If vertex i is connected to k and k is connected to j,
                // then i is also connected to j
                tc[i][j] = tc[i][j] || (tc[i][k] && tc[k][j]);
            }
        }
    }
    
    return tc;
}

// Finding the diameter of a graph using Floyd-Warshall
int findDiameter(Graph graph) {
    graph.floydWarshall();
    
    int diameter = 0;
    for (int i = 0; i < graph.V; i++) {
        for (int j = 0; j < graph.V; j++) {
            if (graph.dist[i][j] != INF && graph.dist[i][j] > diameter) {
                diameter = graph.dist[i][j];
            }
        }
    }
    
    return diameter;
}

// Finding strongly connected components using Floyd-Warshall
List<List<Integer>> findStronglyConnectedComponents(boolean[][] graph) {
    int V = graph.length;
    boolean[][] tc = transitiveClosureFloydWarshall(graph);
    
    // Two vertices are in the same SCC if they can reach each other
    boolean[][] scc = new boolean[V][V];
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            scc[i][j] = tc[i][j] && tc[j][i];
        }
    }
    
    // Find all SCCs
    List<List<Integer>> components = new ArrayList<>();
    boolean[] visited = new boolean[V];
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            List<Integer> component = new ArrayList<>();
            component.add(i);
            visited[i] = true;
            
            for (int j = i + 1; j < V; j++) {
                if (scc[i][j] && !visited[j]) {
                    component.add(j);
                    visited[j] = true;
                }
            }
            
            components.add(component);
        }
    }
    
    return components;
}`,
          explanation: "This section presents several optimizations and applications of the Floyd-Warshall algorithm. First, we show an optimized version with early termination that stops once no more distance updates occur in an iteration. Then, we demonstrate how to use Floyd-Warshall to compute the transitive closure of a graph (i.e., whether there's a path between any two vertices). We also show how to find the diameter of a graph (the longest shortest path) and how to identify strongly connected components in a directed graph. These applications highlight the versatility of the Floyd-Warshall algorithm beyond just finding shortest paths."
        }
      ]
    },
    {
      title: "Practical Applications",
      content: "The Floyd-Warshall algorithm has numerous practical applications in various domains, particularly where you need to compute shortest paths between all pairs of vertices or analyze the overall structure of a graph.",
      codeExamples: [
        {
          language: "java",
          code: `// Network routing table computation
void computeRoutingTables(Graph graph) {
    // Run Floyd-Warshall to get shortest paths
    graph.floydWarshall();
    
    // For each router, compute its routing table
    for (int router = 0; router < graph.V; router++) {
        System.out.println("Routing table for router " + router + ":");
        System.out.println("Destination | Next Hop | Distance");
        
        for (int dest = 0; dest < graph.V; dest++) {
            if (router != dest) {
                List<Integer> path = graph.getPath(router, dest);
                int nextHop = (path.size() > 1) ? path.get(1) : -1;
                
                System.out.println(dest + " | " + 
                                 (nextHop == -1 ? "N/A" : nextHop) + " | " + 
                                 (graph.dist[router][dest] == INF ? "INF" : graph.dist[router][dest]));
            }
        }
        System.out.println();
    }
}

// Finding all-pairs bottleneck paths
int[][] allPairsBottleneckPaths(int[][] capacity) {
    int V = capacity.length;
    int[][] bottleneck = new int[V][V];
    
    // Initialize bottleneck capacities
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            bottleneck[i][j] = capacity[i][j];
        }
    }
    
    // Floyd-Warshall-like algorithm for bottleneck paths
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                // Update if going through k gives a better bottleneck capacity
                bottleneck[i][j] = Math.max(bottleneck[i][j], 
                                         Math.min(bottleneck[i][k], bottleneck[k][j]));
            }
        }
    }
    
    return bottleneck;
}

// Finding centers of a graph (vertices that minimize the maximum distance)
List<Integer> findGraphCenters(Graph graph) {
    graph.floydWarshall();
    
    int minEccentricity = Integer.MAX_VALUE;
    List<Integer> centers = new ArrayList<>();
    
    // Calculate eccentricity for each vertex
    for (int i = 0; i < graph.V; i++) {
        int eccentricity = 0;
        for (int j = 0; j < graph.V; j++) {
            if (graph.dist[i][j] != INF && graph.dist[i][j] > eccentricity) {
                eccentricity = graph.dist[i][j];
            }
        }
        
        if (eccentricity < minEccentricity) {
            minEccentricity = eccentricity;
            centers.clear();
            centers.add(i);
        } else if (eccentricity == minEccentricity) {
            centers.add(i);
        }
    }
    
    return centers;
}`,
          explanation: "This section demonstrates practical applications of the Floyd-Warshall algorithm. First, we show how to compute routing tables for network routers, where each router needs to know the next hop for routing packets to each destination. Next, we present a variation of Floyd-Warshall for finding all-pairs bottleneck paths, which is useful in network flow problems. Finally, we show how to find the centers of a graph—vertices that minimize the maximum distance to any other vertex—which is useful in facility location problems."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "floyd-warshall-hw1",
      question: "Implement a variation of the Floyd-Warshall algorithm to find the number of distinct shortest paths between all pairs of vertices in a graph.",
      solution: "Maintain an additional 2D array `count[i][j]` that stores the number of shortest paths from vertex i to vertex j. When updating distances, if a shorter path is found, reset the count. If an equally short path is found, add to the count. Initialize count[i][i] = 1 for all i, and count[i][j] = 1 if there's a direct edge from i to j."
    },
    {
      id: "floyd-warshall-hw2",
      question: "Modify the Floyd-Warshall algorithm to find the most reliable path between all pairs of vertices in a graph where each edge has a reliability value between 0 and 1.",
      solution: "Instead of minimizing the sum of edge weights, modify the algorithm to maximize the product of edge reliabilities. Initialize the reliability matrix with direct edge reliabilities (1 for i=j, 0 for no edge). In the main loop, update reliability[i][j] if reliability[i][k] * reliability[k][j] > reliability[i][j]."
    },
    {
      id: "floyd-warshall-hw3",
      question: "Implement a solution to find the shortest paths in a graph where each edge has a color, and you can use at most k different colors in any path.",
      solution: "Create a 3D DP array dp[i][j][c] representing the shortest path from i to j using at most c different colors. Initialize with direct edges. In the main algorithm, for each intermediate vertex k and for each color count c, update dp[i][j][c] if going through k with at most c colors gives a shorter path."
    },
    {
      id: "floyd-warshall-hw4",
      question: "Use the Floyd-Warshall algorithm to detect if a graph has a negative cycle that is reachable from a specific vertex s.",
      solution: "Run the standard Floyd-Warshall algorithm. After completion, check if there exists a vertex v such that there is a path from s to v, from v to v (a cycle), and the distance from v to v is negative. This indicates a negative cycle reachable from s."
    }
  ],
  
  quiz: [
    {
      id: "floyd-warshall-q1",
      question: "What is the time complexity of the Floyd-Warshall algorithm?",
      options: ["O(V²)", "O(V³)", "O(E log V)", "O(V * E)"],
      correctAnswer: 1,
      explanation: "The Floyd-Warshall algorithm has a time complexity of O(V³), where V is the number of vertices in the graph. This is because the algorithm consists of three nested loops, each iterating over all vertices."
    },
    {
      id: "floyd-warshall-q2",
      question: "What is the main advantage of the Floyd-Warshall algorithm over Dijkstra's algorithm?",
      options: [
        "Floyd-Warshall has better time complexity for sparse graphs",
        "Floyd-Warshall can handle negative edge weights",
        "Floyd-Warshall finds shortest paths between all pairs of vertices in a single run",
        "Floyd-Warshall uses less memory"
      ],
      correctAnswer: 2,
      explanation: "The main advantage of the Floyd-Warshall algorithm over Dijkstra's algorithm is that it finds shortest paths between all pairs of vertices in a single execution, while Dijkstra's algorithm finds shortest paths from a single source. Additionally, Floyd-Warshall can handle negative edge weights (though not negative cycles), which Dijkstra's algorithm cannot."
    },
    {
      id: "floyd-warshall-q3",
      question: "What happens if a graph has a negative weight cycle and you run the Floyd-Warshall algorithm on it?",
      options: [
        "The algorithm will enter an infinite loop",
        "The algorithm will terminate but give incorrect results for some vertex pairs",
        "The algorithm will correctly identify the negative cycle",
        "The algorithm will crash with an overflow error"
      ],
      correctAnswer: 1,
      explanation: "If a graph has a negative weight cycle, the Floyd-Warshall algorithm will terminate but will give incorrect (too small) distances for paths that can use the negative cycle. However, we can detect the presence of negative cycles by checking if any vertex has a negative distance to itself after running the algorithm."
    },
    {
      id: "floyd-warshall-q4",
      question: "In the Floyd-Warshall algorithm, what does the value dist[i][j] represent after k iterations of the outer loop?",
      options: [
        "The shortest path from i to j using only vertices 0 to k as intermediate vertices",
        "The shortest path from i to j using exactly k intermediate vertices",
        "The shortest path from i to j using vertex k as an intermediate vertex",
        "The shortest path from i to j using at most k edges"
      ],
      correctAnswer: 0,
      explanation: "After k iterations of the outer loop in the Floyd-Warshall algorithm, dist[i][j] represents the shortest path from vertex i to vertex j using only vertices 0, 1, ..., k as intermediate vertices. This is the key insight of the dynamic programming approach used in Floyd-Warshall."
    },
    {
      id: "floyd-warshall-q5",
      question: "Which of the following is NOT a typical application of the Floyd-Warshall algorithm?",
      options: [
        "Finding the transitive closure of a graph",
        "Computing all-pairs shortest paths",
        "Finding a minimum spanning tree",
        "Detecting negative cycles in a graph"
      ],
      correctAnswer: 2,
      explanation: "Finding a minimum spanning tree (MST) is not a typical application of the Floyd-Warshall algorithm. MSTs are typically found using algorithms like Kruskal's or Prim's. The Floyd-Warshall algorithm is used for finding all-pairs shortest paths, computing transitive closure, and detecting negative cycles in a graph."
    }
  ],
  
  practice: {
    introduction: "These practice problems will help you master the Floyd-Warshall algorithm and its applications in finding all-pairs shortest paths. Work through these problems to improve your understanding of graph traversal, path reconstruction, and optimization in different contexts.",
    questions: {
      easy: [
        {
          id: "floyd-warshall-easy-1",
          title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
          link: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
          description: "Find the city that has the smallest number of cities that are reachable through some path and whose distance is at most the given threshold. This problem is perfect for applying the Floyd-Warshall algorithm."
        },
        {
          id: "floyd-warshall-easy-2",
          title: "Network Delay Time",
          link: "https://leetcode.com/problems/network-delay-time/",
          description: "Calculate the time it takes for all nodes to receive a signal. While Dijkstra's algorithm is commonly used, Floyd-Warshall provides a simpler approach if you need all-pairs shortest paths."
        },
        {
          id: "floyd-warshall-easy-3",
          title: "Min Cost to Connect All Points",
          link: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
          description: "Connect a set of points with the minimum total cost. This problem can be viewed as finding a minimum spanning tree, but understanding the all-pairs shortest paths first can provide insights."
        }
      ],
      medium: [
        {
          id: "floyd-warshall-medium-1",
          title: "Evaluate Division",
          link: "https://leetcode.com/problems/evaluate-division/",
          description: "Given equations like a/b=2 and queries like c/d, evaluate the queries. This can be modeled as a graph problem where Floyd-Warshall helps calculate all possible divisions."
        },
        {
          id: "floyd-warshall-medium-2",
          title: "Course Schedule IV",
          link: "https://leetcode.com/problems/course-schedule-iv/",
          description: "Determine if a course is a prerequisite of another. This requires computing transitive closure of the prerequisite graph, which Floyd-Warshall can efficiently solve."
        },
        {
          id: "floyd-warshall-medium-3",
          title: "Graph Connectivity With Threshold",
          link: "https://leetcode.com/problems/graph-connectivity-with-threshold/",
          description: "Determine if two nodes are connected in a graph where edges exist between nodes with a common divisor greater than a threshold. This connectivity problem benefits from all-pairs analysis."
        },
        {
          id: "floyd-warshall-medium-4",
          title: "Find the Longest Valid Obstacle Course at Each Position",
          link: "https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/",
          description: "Find the longest valid obstacle course at each position in an array. While primarily a dynamic programming problem, understanding the connections between positions is similar to path analysis in graphs."
        }
      ],
      hard: [
        {
          id: "floyd-warshall-hard-1",
          title: "Minimum Cost to Make at Least One Valid Path in a Grid",
          link: "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/",
          description: "Find the minimum cost to change signs in a grid to create a valid path. This combines graph algorithms with a unique cost structure that benefits from all-pairs analysis."
        },
        {
          id: "floyd-warshall-hard-2",
          title: "Shortest Path to Get All Keys",
          link: "https://leetcode.com/problems/shortest-path-to-get-all-keys/",
          description: "Find the shortest path to collect all keys and open all locks in a grid. This state-based path problem requires finding optimal routes between key positions."
        },
        {
          id: "floyd-warshall-hard-3",
          title: "Minimum Cost to Reach Destination in Time",
          link: "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/",
          description: "Find the minimum cost path from source to destination within a time constraint. While a modified Dijkstra's is common, understanding all-pairs paths can provide insights for optimization."
        }
      ]
    }
  }
};

export default floydWarshallContent; 