import { Content } from '@/types/course';

const bellmanFordContent: Content = {
  introduction: "The Bellman-Ford algorithm is a versatile graph algorithm used to find the shortest paths from a source vertex to all other vertices in a weighted graph. Unlike Dijkstra's algorithm, Bellman-Ford can handle graphs with negative edge weights and can detect negative weight cycles. In this lesson, we'll explore how the algorithm works, analyze its complexity, and implement it to solve various graph problems.",
  
  learningObjectives: [
    "Understand the principles behind the Bellman-Ford algorithm and its advantages over Dijkstra's algorithm",
    "Implement the Bellman-Ford algorithm to find shortest paths in weighted graphs",
    "Detect negative weight cycles in graphs",
    "Apply optimizations to improve the algorithm's performance",
    "Solve real-world problems using the Bellman-Ford algorithm"
  ],
  
  sections: [
    {
      title: "Understanding the Bellman-Ford Algorithm",
      content: "The Bellman-Ford algorithm finds the shortest paths from a source vertex to all other vertices in a weighted graph. It works by repeatedly relaxing all edges in the graph, gradually decreasing the estimated distance to each vertex until it converges to the optimal solution. The key insight is that in a graph with V vertices, the shortest path between any two vertices can contain at most V-1 edges (otherwise it would contain a cycle).",
      codeExamples: [
        {
          language: "java",
          code: `// Basic structure of a graph for Bellman-Ford
class Edge {
    int source;
    int destination;
    int weight;
    
    public Edge(int source, int destination, int weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
}

class Graph {
    int vertices;
    List<Edge> edges;
    
    public Graph(int vertices) {
        this.vertices = vertices;
        this.edges = new ArrayList<>();
    }
    
    public void addEdge(int source, int destination, int weight) {
        edges.add(new Edge(source, destination, weight));
    }
}

// Example graph for illustration
// 0 -- 1 -- 2
// |    |    |
// 3 -- 4 -- 5

// Edges: (0,1,5), (0,3,7), (1,2,9), (1,4,3), (2,5,2), (3,4,4), (4,5,6)

Graph createExampleGraph() {
    Graph graph = new Graph(6);
    graph.addEdge(0, 1, 5);
    graph.addEdge(0, 3, 7);
    graph.addEdge(1, 0, 5);
    graph.addEdge(1, 2, 9);
    graph.addEdge(1, 4, 3);
    graph.addEdge(2, 1, 9);
    graph.addEdge(2, 5, 2);
    graph.addEdge(3, 0, 7);
    graph.addEdge(3, 4, 4);
    graph.addEdge(4, 1, 3);
    graph.addEdge(4, 3, 4);
    graph.addEdge(4, 5, 6);
    graph.addEdge(5, 2, 2);
    graph.addEdge(5, 4, 6);
    return graph;
}`,
          explanation: "This code sets up the basic structure for implementing the Bellman-Ford algorithm. We define an Edge class to represent the weighted edges in the graph and a Graph class to hold the collection of edges. The example graph is a simple undirected weighted graph with 6 vertices. For the Bellman-Ford algorithm, we represent even undirected graphs as directed by adding edges in both directions."
        }
      ]
    },
    {
      title: "The Bellman-Ford Algorithm Implementation",
      content: "The core of the Bellman-Ford algorithm involves initializing distances, then relaxing all edges V-1 times (where V is the number of vertices). After relaxation, we can check for negative cycles by attempting one more round of relaxation—if any distances decrease further, it indicates a negative cycle.",
      codeExamples: [
        {
          language: "java",
          code: `// Bellman-Ford algorithm to find shortest paths from a source vertex
int[] bellmanFord(Graph graph, int source) {
    int V = graph.vertices;
    int E = graph.edges.size();
    
    // Step 1: Initialize distances
    int[] distance = new int[V];
    Arrays.fill(distance, Integer.MAX_VALUE);
    distance[source] = 0;
    
    // Step 2: Relax all edges V-1 times
    for (int i = 1; i < V; i++) {
        for (int j = 0; j < E; j++) {
            Edge edge = graph.edges.get(j);
            int u = edge.source;
            int v = edge.destination;
            int weight = edge.weight;
            
            if (distance[u] != Integer.MAX_VALUE && 
                distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
            }
        }
    }
    
    // Step 3: Check for negative weight cycles
    for (int j = 0; j < E; j++) {
        Edge edge = graph.edges.get(j);
        int u = edge.source;
        int v = edge.destination;
        int weight = edge.weight;
        
        if (distance[u] != Integer.MAX_VALUE && 
            distance[u] + weight < distance[v]) {
            System.out.println("Graph contains negative weight cycle");
            // In a real implementation, you might want to handle this differently
            return null;
        }
    }
    
    return distance;
}

// Usage example
void main() {
    Graph graph = createExampleGraph();
    int source = 0;
    
    int[] distances = bellmanFord(graph, source);
    
    if (distances != null) {
        System.out.println("Shortest distances from vertex " + source + ":");
        for (int i = 0; i < graph.vertices; i++) {
            System.out.println("To vertex " + i + ": " + distances[i]);
        }
    }
}`,
          explanation: "This implementation of the Bellman-Ford algorithm follows the three main steps: initialization, edge relaxation, and negative cycle detection. In the initialization step, we set the distance to the source vertex as 0 and all other distances as infinity. In the relaxation step, we iterate through all edges V-1 times, updating the distance to each vertex if a shorter path is found. Finally, we check for negative cycles by attempting one more round of relaxation—if any distances decrease further, it indicates a negative cycle exists in the graph."
        }
      ]
    },
    {
      title: "Handling Negative Weight Cycles",
      content: "One of the key advantages of the Bellman-Ford algorithm is its ability to detect negative weight cycles. A negative weight cycle is a cycle in the graph where the sum of the edge weights is negative. Such cycles are problematic for shortest path algorithms because you could traverse the cycle repeatedly to keep reducing the path length indefinitely.",
      codeExamples: [
        {
          language: "java",
          code: `// Enhanced Bellman-Ford with detailed negative cycle detection
class BellmanFordResult {
    int[] distance;
    boolean hasNegativeCycle;
    List<Integer> negativeCycle;
    
    public BellmanFordResult(int[] distance, boolean hasNegativeCycle, List<Integer> negativeCycle) {
        this.distance = distance;
        this.hasNegativeCycle = hasNegativeCycle;
        this.negativeCycle = negativeCycle;
    }
}

BellmanFordResult bellmanFordWithCycleDetection(Graph graph, int source) {
    int V = graph.vertices;
    int E = graph.edges.size();
    
    // Step 1: Initialize distances and predecessors
    int[] distance = new int[V];
    int[] predecessor = new int[V];
    Arrays.fill(distance, Integer.MAX_VALUE);
    Arrays.fill(predecessor, -1);
    distance[source] = 0;
    
    // Step 2: Relax all edges V-1 times
    for (int i = 1; i < V; i++) {
        for (int j = 0; j < E; j++) {
            Edge edge = graph.edges.get(j);
            int u = edge.source;
            int v = edge.destination;
            int weight = edge.weight;
            
            if (distance[u] != Integer.MAX_VALUE && 
                distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
                predecessor[v] = u;
            }
        }
    }
    
    // Step 3: Check for negative weight cycles
    boolean hasNegativeCycle = false;
    List<Integer> negativeCycle = new ArrayList<>();
    
    // Keep track of which vertex got relaxed in the Vth pass
    int relaxedVertex = -1;
    
    for (int j = 0; j < E; j++) {
        Edge edge = graph.edges.get(j);
        int u = edge.source;
        int v = edge.destination;
        int weight = edge.weight;
        
        if (distance[u] != Integer.MAX_VALUE && 
            distance[u] + weight < distance[v]) {
            hasNegativeCycle = true;
            relaxedVertex = v;
            break;
        }
    }
    
    // If there's a negative cycle, find one
    if (hasNegativeCycle && relaxedVertex != -1) {
        // To find a vertex that is part of a negative cycle,
        // we start from the relaxed vertex and follow predecessors
        // for V steps to ensure we're inside a cycle
        int current = relaxedVertex;
        for (int i = 0; i < V; i++) {
            current = predecessor[current];
            // Handle case where we might not reach a cycle due to disconnected graph
            if (current == -1) {
                break;
            }
        }
        
        // If we found a vertex in the cycle, reconstruct the cycle
        if (current != -1) {
            // Start from the current vertex and follow predecessors
            // until we return to the same vertex
            int cycleStart = current;
            do {
                negativeCycle.add(current);
                current = predecessor[current];
            } while (current != cycleStart && current != -1);
            
            // Add the start vertex again to complete the cycle
            negativeCycle.add(cycleStart);
            // Reverse to get the cycle in the right order
            Collections.reverse(negativeCycle);
        }
    }
    
    return new BellmanFordResult(hasNegativeCycle ? null : distance, 
                                 hasNegativeCycle, 
                                 negativeCycle);
}

// Usage example with negative cycle detection
void main() {
    // Create a graph with a negative cycle
    Graph graph = new Graph(4);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1, 2, 2);
    graph.addEdge(2, 3, 3);
    graph.addEdge(3, 1, -7); // Creates a negative cycle: 1->2->3->1
    
    int source = 0;
    BellmanFordResult result = bellmanFordWithCycleDetection(graph, source);
    
    if (result.hasNegativeCycle) {
        System.out.println("Graph contains a negative weight cycle:");
        for (int i = 0; i < result.negativeCycle.size(); i++) {
            System.out.print(result.negativeCycle.get(i));
            if (i < result.negativeCycle.size() - 1) {
                System.out.print(" -> ");
            }
        }
        System.out.println();
    } else {
        System.out.println("No negative weight cycles found.");
        System.out.println("Shortest distances from vertex " + source + ":");
        for (int i = 0; i < graph.vertices; i++) {
            System.out.println("To vertex " + i + ": " + result.distance[i]);
        }
    }
}`,
          explanation: "This enhanced version of the Bellman-Ford algorithm not only detects the presence of negative weight cycles but also identifies the vertices that form such a cycle. It uses a predecessor array to track the shortest path tree, which allows us to trace back and find the cycle. When a negative cycle is detected, the algorithm follows the predecessors to find vertices that are part of the cycle, then reconstructs the cycle in the correct order. This information can be crucial for debugging and understanding the structure of the graph."
        }
      ]
    },
    {
      title: "Optimizations and Variations",
      content: "The basic Bellman-Ford algorithm has a time complexity of O(V * E), which can be slow for large graphs. Several optimizations can improve its performance in practice. One common optimization is early termination: if no relaxations occur in a pass, we can terminate the algorithm early.",
      codeExamples: [
        {
          language: "java",
          code: `// Optimized Bellman-Ford algorithm with early termination
int[] bellmanFordOptimized(Graph graph, int source) {
    int V = graph.vertices;
    int E = graph.edges.size();
    
    // Initialize distances
    int[] distance = new int[V];
    Arrays.fill(distance, Integer.MAX_VALUE);
    distance[source] = 0;
    
    // Relax all edges V-1 times
    boolean relaxed;
    for (int i = 1; i < V; i++) {
        relaxed = false;
        for (int j = 0; j < E; j++) {
            Edge edge = graph.edges.get(j);
            int u = edge.source;
            int v = edge.destination;
            int weight = edge.weight;
            
            if (distance[u] != Integer.MAX_VALUE && 
                distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
                relaxed = true;
            }
        }
        
        // If no relaxation occurred in this pass, we can terminate early
        if (!relaxed) {
            System.out.println("Early termination at iteration " + i);
            break;
        }
    }
    
    // Check for negative cycles
    for (int j = 0; j < E; j++) {
        Edge edge = graph.edges.get(j);
        int u = edge.source;
        int v = edge.destination;
        int weight = edge.weight;
        
        if (distance[u] != Integer.MAX_VALUE && 
            distance[u] + weight < distance[v]) {
            System.out.println("Graph contains negative weight cycle");
            return null;
        }
    }
    
    return distance;
}

// SPFA (Shortest Path Faster Algorithm) - An optimized variant of Bellman-Ford
int[] spfa(Graph graph, int source) {
    int V = graph.vertices;
    
    // Initialize distances
    int[] distance = new int[V];
    Arrays.fill(distance, Integer.MAX_VALUE);
    distance[source] = 0;
    
    // Keep track of which vertices are in the queue
    boolean[] inQueue = new boolean[V];
    // Keep track of how many times each vertex has been processed
    int[] count = new int[V];
    
    // Queue for vertices to process
    Queue<Integer> queue = new LinkedList<>();
    queue.add(source);
    inQueue[source] = true;
    count[source] = 1;
    
    while (!queue.isEmpty()) {
        int u = queue.poll();
        inQueue[u] = false;
        
        // Process all edges from u
        for (Edge edge : graph.edges) {
            if (edge.source == u) {
                int v = edge.destination;
                int weight = edge.weight;
                
                if (distance[u] != Integer.MAX_VALUE && 
                    distance[u] + weight < distance[v]) {
                    distance[v] = distance[u] + weight;
                    
                    // If v is not in queue, add it
                    if (!inQueue[v]) {
                        queue.add(v);
                        inQueue[v] = true;
                        count[v]++;
                        
                        // If v has been processed too many times, there's a negative cycle
                        if (count[v] > V) {
                            System.out.println("Graph contains negative weight cycle");
                            return null;
                        }
                    }
                }
            }
        }
    }
    
    return distance;
}

// Usage example for optimized algorithms
void main() {
    Graph graph = createExampleGraph();
    int source = 0;
    
    System.out.println("Running optimized Bellman-Ford:");
    int[] distances1 = bellmanFordOptimized(graph, source);
    if (distances1 != null) {
        for (int i = 0; i < graph.vertices; i++) {
            System.out.println("Distance to vertex " + i + ": " + distances1[i]);
        }
    }
    
    System.out.println("\nRunning SPFA:");
    int[] distances2 = spfa(graph, source);
    if (distances2 != null) {
        for (int i = 0; i < graph.vertices; i++) {
            System.out.println("Distance to vertex " + i + ": " + distances2[i]);
        }
    }
}`,
          explanation: "This section presents two optimized versions of the Bellman-Ford algorithm. The first optimization is early termination: if no edge relaxations occur in a pass, we can terminate the algorithm since no further improvements are possible. The second version is the Shortest Path Faster Algorithm (SPFA), which is a significant optimization that uses a queue to process only vertices whose distances have changed in the previous iteration, rather than processing all edges in each iteration. SPFA can be much faster in practice, especially for sparse graphs, though its worst-case complexity remains O(V * E)."
        }
      ]
    },
    {
      title: "Real-world Applications",
      content: "The Bellman-Ford algorithm has numerous practical applications in various domains, especially where negative weights or the detection of negative cycles is important.",
      codeExamples: [
        {
          language: "java",
          code: `// Currency arbitrage detection using Bellman-Ford
class CurrencyArbitrage {
    // Detect arbitrage opportunities in currency exchange rates
    static List<String> detectArbitrage(String[] currencies, double[][] exchangeRates) {
        int n = currencies.length;
        
        // Convert exchange rates to negative log to use Bellman-Ford for finding negative cycles
        // log(a*b) = log(a) + log(b), so we can add log(exchange rates) instead of multiplying rates
        // And we negate to find negative cycles (which represent arbitrage opportunities)
        double[][] rates = new double[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rates[i][j] = -Math.log(exchangeRates[i][j]);
            }
        }
        
        // Build graph
        Graph graph = new Graph(n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    graph.addEdge(i, j, rates[i][j]);
                }
            }
        }
        
        // Run Bellman-Ford to detect negative cycles
        int source = 0; // We can start from any vertex
        BellmanFordResult result = bellmanFordWithCycleDetection(graph, source);
        
        List<String> arbitragePath = new ArrayList<>();
        if (result.hasNegativeCycle && !result.negativeCycle.isEmpty()) {
            for (int vertex : result.negativeCycle) {
                arbitragePath.add(currencies[vertex]);
            }
        }
        
        return arbitragePath;
    }
    
    public static void main(String[] args) {
        // Example currency exchange rates
        // rate[i][j] = how many units of currency j you get for 1 unit of currency i
        String[] currencies = {"USD", "EUR", "GBP", "JPY"};
        double[][] exchangeRates = {
            {1.0, 0.85, 0.77, 110.0},
            {1.18, 1.0, 0.91, 129.5},
            {1.30, 1.10, 1.0, 142.0},
            {0.0091, 0.0077, 0.0070, 1.0}
        };
        
        // Create a small arbitrage opportunity for demonstration
        // USD -> EUR -> GBP -> USD would give more USD than started with
        exchangeRates[0][1] = 0.9;  // 1 USD = 0.9 EUR
        exchangeRates[1][2] = 0.95; // 1 EUR = 0.95 GBP
        exchangeRates[2][0] = 1.2;  // 1 GBP = 1.2 USD
        // This creates a cycle: 1 USD -> 0.9 EUR -> 0.855 GBP -> 1.026 USD (a 2.6% profit)
        
        List<String> arbitragePath = detectArbitrage(currencies, exchangeRates);
        
        if (arbitragePath.isEmpty()) {
            System.out.println("No arbitrage opportunities found.");
        } else {
            System.out.println("Arbitrage opportunity detected:");
            System.out.println(String.join(" -> ", arbitragePath));
            
            // Calculate the profit from following this arbitrage path
            double amount = 1.0; // Start with 1 unit of the first currency
            String startCurrency = arbitragePath.get(0);
            
            for (int i = 0; i < arbitragePath.size() - 1; i++) {
                String fromCurrency = arbitragePath.get(i);
                String toCurrency = arbitragePath.get(i + 1);
                
                int fromIdx = -1, toIdx = -1;
                for (int j = 0; j < currencies.length; j++) {
                    if (currencies[j].equals(fromCurrency)) fromIdx = j;
                    if (currencies[j].equals(toCurrency)) toIdx = j;
                }
                
                amount *= exchangeRates[fromIdx][toIdx];
            }
            
            System.out.printf("Starting with 1 %s and following the arbitrage path returns %.4f %s%n",
                              startCurrency, amount, startCurrency);
            System.out.printf("Profit: %.2f%%%n", (amount - 1) * 100);
        }
    }
}

// Network routing with Bellman-Ford
class NetworkRouting {
    static void findOptimalRoutes(Graph graph, int source) {
        int[] distances = bellmanFord(graph, source);
        
        if (distances == null) {
            System.out.println("Network contains negative cycles. Routing not possible.");
            return;
        }
        
        System.out.println("Optimal routes from router " + source + ":");
        for (int i = 0; i < graph.vertices; i++) {
            if (i != source) {
                System.out.println("To router " + i + ": Cost = " + distances[i]);
            }
        }
    }
}`,
          explanation: "This section demonstrates two real-world applications of the Bellman-Ford algorithm. The first is currency arbitrage detection, where we can use the algorithm's ability to find negative cycles to detect profitable trading opportunities in currency markets. By representing exchange rates as edge weights and taking their negative logarithm, we transform the multiplicative problem into an additive one suitable for Bellman-Ford. The second application is network routing, where Bellman-Ford is used to find the lowest-cost paths in a network, which is crucial for protocols like RIP (Routing Information Protocol) that can handle negative edge weights (though in practice, most modern routing protocols use Dijkstra's algorithm with non-negative weights)."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "bellman-ford-hw1",
      question: "Implement a function to find the shortest paths between all pairs of vertices in a graph with potential negative edges but no negative cycles.",
      solution: "You can run the Bellman-Ford algorithm from each vertex as a source. This would result in an O(V²E) algorithm, which is usually less efficient than the Floyd-Warshall algorithm (O(V³)) for dense graphs but may be better for sparse graphs. For each source vertex, run Bellman-Ford to get distances to all other vertices and store them in a 2D array."
    },
    {
      id: "bellman-ford-hw2",
      question: "Modify the Bellman-Ford algorithm to print the actual shortest path (sequence of vertices) from the source to every other vertex, not just the distances.",
      solution: "During edge relaxation, maintain a predecessor array where predecessor[v] stores the vertex that comes before v in the shortest path from the source. After running the algorithm, you can reconstruct the path from source to any vertex v by following the predecessors backward from v until you reach the source."
    },
    {
      id: "bellman-ford-hw3",
      question: "Implement a solution for the 'Cheapest Flights Within K Stops' problem: given a graph of flights with prices, find the cheapest price from source to destination with at most K stops.",
      solution: "Modify the Bellman-Ford algorithm to perform at most K+1 relaxation passes (since K stops means at most K+1 edges). In each pass, use the distances from the previous pass to avoid using more than K+1 edges in the path. After K+1 passes, the distance to the destination will be the cheapest price with at most K stops."
    },
    {
      id: "bellman-ford-hw4",
      question: "Given a graph with edges having different costs for different types of vehicles, find the shortest path where you can switch vehicle types at any vertex but incur a switching cost.",
      solution: "Create a multi-layered graph where each layer represents a vehicle type. Connect vertices within the same layer using the costs for that vehicle type, and add edges between the same vertex in different layers with the switching cost. Run Bellman-Ford on this expanded graph to find the shortest path."
    }
  ],
  
  quiz: [
    {
      id: "bellman-ford-q1",
      question: "What is the primary advantage of the Bellman-Ford algorithm over Dijkstra's algorithm?",
      options: [
        "It has a better time complexity",
        "It can handle negative edge weights",
        "It always finds paths with fewer edges",
        "It uses less memory"
      ],
      correctAnswer: 1,
      explanation: "The primary advantage of Bellman-Ford over Dijkstra's algorithm is that it can handle graphs with negative edge weights. Dijkstra's algorithm assumes all edge weights are non-negative and can give incorrect results if negative weights are present. Bellman-Ford not only works with negative weights but can also detect negative weight cycles."
    },
    {
      id: "bellman-ford-q2",
      question: "What is the time complexity of the standard Bellman-Ford algorithm?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
      correctAnswer: 3,
      explanation: "The time complexity of the standard Bellman-Ford algorithm is O(V * E), where V is the number of vertices and E is the number of edges in the graph. This comes from the algorithm's two main parts: relaxing all E edges, and doing so V-1 times."
    },
    {
      id: "bellman-ford-q3",
      question: "Why does the Bellman-Ford algorithm perform exactly V-1 iterations of edge relaxation?",
      options: [
        "To ensure all vertices are visited",
        "Because the maximum number of edges in a shortest path is V-1",
        "To detect negative cycles",
        "To minimize the running time"
      ],
      correctAnswer: 1,
      explanation: "The Bellman-Ford algorithm performs V-1 iterations because in a graph with V vertices, the longest possible shortest path (without cycles) can contain at most V-1 edges. After V-1 iterations, all shortest paths should have been found if there are no negative weight cycles."
    },
    {
      id: "bellman-ford-q4",
      question: "How does the Bellman-Ford algorithm detect negative weight cycles?",
      options: [
        "By counting the number of relaxations",
        "By checking if any distance becomes negative",
        "By performing an additional Vth iteration and checking if any distances decrease further",
        "By using a separate depth-first search"
      ],
      correctAnswer: 2,
      explanation: "The Bellman-Ford algorithm detects negative weight cycles by performing an additional (Vth) iteration of edge relaxation after the main V-1 iterations. If any distances decrease during this additional iteration, it indicates the presence of a negative weight cycle accessible from the source vertex."
    },
    {
      id: "bellman-ford-q5",
      question: "What is the SPFA (Shortest Path Faster Algorithm) optimization of Bellman-Ford based on?",
      options: [
        "Using a priority queue to always process the vertex with the minimum distance",
        "Using a queue to only process vertices whose distances have changed in the previous iteration",
        "Using dynamic programming to avoid recomputing distances",
        "Using a different graph representation to speed up edge relaxation"
      ],
      correctAnswer: 1,
      explanation: "The SPFA optimization is based on using a queue to only process vertices whose distances have changed in the previous iteration, rather than blindly processing all edges in each iteration. This can significantly reduce the number of relaxation operations, especially in sparse graphs, making SPFA much faster in practice though its worst-case complexity remains O(V * E)."
    }
  ]
};

export default bellmanFordContent; 