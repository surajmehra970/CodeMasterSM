import { Content } from '@/types/course';

const dijkstraAlgorithmContent: Content = {
  introduction: "Dijkstra's algorithm is a fundamental graph algorithm used to find the shortest path between nodes in a graph with non-negative edge weights. Named after its creator, Dutch computer scientist Edsger W. Dijkstra, this algorithm efficiently determines the shortest path from a source node to all other nodes in a weighted graph.",
  
  learningObjectives: [
    "Understand the principle behind Dijkstra's algorithm and its greedy approach",
    "Implement Dijkstra's algorithm using different priority queue structures",
    "Analyze the time and space complexity of different implementations",
    "Apply optimizations to improve performance in specific scenarios",
    "Solve real-world problems using Dijkstra's algorithm"
  ],
  
  sections: [
    {
      title: "Dijkstra's Algorithm Fundamentals",
      content: "Dijkstra's algorithm works by maintaining a set of nodes whose shortest distance from the source has been determined. It repeatedly selects the node with the smallest distance, updates the distances to its adjacent nodes, and adds it to the set of processed nodes. This greedy approach ensures that the shortest paths are found in order of increasing distance from the source.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic implementation of Dijkstra's algorithm using an array
public void dijkstra(int[][] graph, int source) {
    int vertices = graph.length;
    
    // Distance array to store shortest distance from source to each vertex
    int[] distance = new int[vertices];
    
    // Boolean array to mark vertices as processed
    boolean[] processed = new boolean[vertices];
    
    // Initialize distances to all vertices as INFINITE and processed[] as false
    for (int i = 0; i < vertices; i++) {
        distance[i] = Integer.MAX_VALUE;
        processed[i] = false;
    }
    
    // Distance from source to itself is 0
    distance[source] = 0;
    
    // Find shortest path for all vertices
    for (int count = 0; count < vertices - 1; count++) {
        // Pick the minimum distance vertex from the set of vertices not yet processed
        int u = minDistanceVertex(distance, processed, vertices);
        
        // Mark the picked vertex as processed
        processed[u] = true;
        
        // Update distance value of adjacent vertices of the picked vertex
        for (int v = 0; v < vertices; v++) {
            // Update distance[v] only if:
            // 1. There is an edge from u to v
            // 2. v is not processed yet
            // 3. Distance from source to v through u is smaller than current value of distance[v]
            if (!processed[v] && graph[u][v] != 0 && 
                distance[u] != Integer.MAX_VALUE && 
                distance[u] + graph[u][v] < distance[v]) {
                
                distance[v] = distance[u] + graph[u][v];
            }
        }
    }
    
    // Print the shortest distance from source to all vertices
    printSolution(distance, vertices, source);
}

// Function to find the vertex with minimum distance value from the set of vertices not yet processed
private int minDistanceVertex(int[] distance, boolean[] processed, int vertices) {
    // Initialize min value
    int min = Integer.MAX_VALUE;
    int minIndex = -1;
    
    for (int v = 0; v < vertices; v++) {
        if (!processed[v] && distance[v] <= min) {
            min = distance[v];
            minIndex = v;
        }
    }
    
    return minIndex;
}

// Function to print the shortest distances
private void printSolution(int[] distance, int vertices, int source) {
    System.out.println("Shortest distances from source vertex " + source + ":");
    for (int i = 0; i < vertices; i++) {
        System.out.println("Vertex " + i + ": " + 
            (distance[i] == Integer.MAX_VALUE ? "INFINITY" : distance[i]));
    }
}`,
          explanation: "This basic implementation uses an adjacency matrix to represent the graph and a simple array to track distances. The algorithm iteratively selects the node with the minimum distance, marks it as processed, and updates the distances to its neighbors."
        }
      ]
    },
    {
      title: "Optimized Implementation with Priority Queue",
      content: "While the basic implementation works well for small graphs, it becomes inefficient for larger graphs due to the O(V²) time complexity. Using a priority queue (min-heap) to extract the node with the minimum distance improves the time complexity to O((V+E)log V), where V is the number of vertices and E is the number of edges.",
      codeExamples: [
        {
          language: "java",
          code: `// Dijkstra's algorithm using a Priority Queue (Min Heap)
public void dijkstraPriorityQueue(List<List<Node>> adjacencyList, int source, int vertices) {
    // Distance array to store shortest distance from source to each vertex
    int[] distance = new int[vertices];
    
    // Initialize distances to all vertices as INFINITE
    Arrays.fill(distance, Integer.MAX_VALUE);
    
    // Distance from source to itself is 0
    distance[source] = 0;
    
    // Priority queue to get the vertex with minimum distance
    PriorityQueue<Node> pq = new PriorityQueue<>(vertices, new Node());
    
    // Add source to the priority queue
    pq.add(new Node(source, 0));
    
    // Process vertices using priority queue
    while (!pq.isEmpty()) {
        // Remove the minimum distance vertex from priority queue
        int u = pq.poll().vertex;
        
        // Process all neighboring vertices of u
        for (Node neighbor : adjacencyList.get(u)) {
            int v = neighbor.vertex;
            int weight = neighbor.weight;
            
            // If there is a shorter path to v through u
            if (distance[u] != Integer.MAX_VALUE && 
                distance[u] + weight < distance[v]) {
                
                // Update distance of v
                distance[v] = distance[u] + weight;
                
                // Add v to the priority queue
                pq.add(new Node(v, distance[v]));
            }
        }
    }
    
    // Print the shortest distance from source to all vertices
    printSolution(distance, vertices, source);
}

// Node class for the adjacency list and priority queue
class Node implements Comparator<Node> {
    int vertex;
    int weight;
    
    Node() {}
    
    Node(int vertex, int weight) {
        this.vertex = vertex;
        this.weight = weight;
    }
    
    @Override
    public int compare(Node node1, Node node2) {
        return Integer.compare(node1.weight, node2.weight);
    }
}

// Function to create an adjacency list representation of a graph
public List<List<Node>> createAdjacencyList(int[][] graph, int vertices) {
    List<List<Node>> adjacencyList = new ArrayList<>(vertices);
    
    for (int i = 0; i < vertices; i++) {
        List<Node> neighbors = new ArrayList<>();
        for (int j = 0; j < vertices; j++) {
            if (graph[i][j] != 0) {
                neighbors.add(new Node(j, graph[i][j]));
            }
        }
        adjacencyList.add(neighbors);
    }
    
    return adjacencyList;
}`,
          explanation: "This optimized implementation uses an adjacency list representation of the graph and a priority queue to efficiently extract the node with the minimum distance. This significantly improves performance for sparse graphs where the number of edges is much less than V²."
        }
      ]
    },
    {
      title: "Path Reconstruction and Optimizations",
      content: "Besides finding the shortest distances, it's often necessary to reconstruct the actual shortest paths. Additionally, various optimizations can be applied to Dijkstra's algorithm for specific use cases, such as bidirectional search or early termination when finding the shortest path to a specific target.",
      codeExamples: [
        {
          language: "java",
          code: `// Dijkstra's algorithm with path reconstruction
public void dijkstraWithPath(List<List<Node>> adjacencyList, int source, int target, int vertices) {
    // Distance array to store shortest distance from source to each vertex
    int[] distance = new int[vertices];
    
    // Previous node in the shortest path
    int[] previous = new int[vertices];
    
    // Initialize distances to all vertices as INFINITE and previous as -1
    Arrays.fill(distance, Integer.MAX_VALUE);
    Arrays.fill(previous, -1);
    
    // Distance from source to itself is 0
    distance[source] = 0;
    
    // Priority queue to get the vertex with minimum distance
    PriorityQueue<Node> pq = new PriorityQueue<>(vertices, new Node());
    
    // Add source to the priority queue
    pq.add(new Node(source, 0));
    
    // Flag to check if target is reached
    boolean targetReached = false;
    
    // Process vertices using priority queue
    while (!pq.isEmpty() && !targetReached) {
        // Remove the minimum distance vertex from priority queue
        int u = pq.poll().vertex;
        
        // If we've reached the target, we can stop
        if (u == target) {
            targetReached = true;
            break;
        }
        
        // If the current distance is greater than the known shortest distance, skip
        if (distance[u] < pq.peek().weight) {
            continue;
        }
        
        // Process all neighboring vertices of u
        for (Node neighbor : adjacencyList.get(u)) {
            int v = neighbor.vertex;
            int weight = neighbor.weight;
            
            // If there is a shorter path to v through u
            if (distance[u] != Integer.MAX_VALUE && 
                distance[u] + weight < distance[v]) {
                
                // Update distance and previous node
                distance[v] = distance[u] + weight;
                previous[v] = u;
                
                // Add v to the priority queue
                pq.add(new Node(v, distance[v]));
            }
        }
    }
    
    // Print the shortest distance and path from source to target
    if (distance[target] != Integer.MAX_VALUE) {
        System.out.println("Shortest distance from " + source + " to " + target + ": " + distance[target]);
        printPath(previous, target);
    } else {
        System.out.println("There is no path from " + source + " to " + target);
    }
}

// Utility function to print the shortest path
private void printPath(int[] previous, int target) {
    List<Integer> path = new ArrayList<>();
    int current = target;
    
    // Reconstruct the path from target to source
    while (current != -1) {
        path.add(current);
        current = previous[current];
    }
    
    // Print the path in the correct order (source to target)
    System.out.print("Shortest path: ");
    for (int i = path.size() - 1; i >= 0; i--) {
        System.out.print(path.get(i));
        if (i > 0) {
            System.out.print(" -> ");
        }
    }
    System.out.println();
}

// Bidirectional Dijkstra for finding the shortest path between two nodes
public int bidirectionalDijkstra(List<List<Node>> graph, List<List<Node>> reverseGraph, 
                              int source, int target, int vertices) {
    if (source == target) return 0;
    
    // Forward search from source
    int[] distanceSource = new int[vertices];
    Arrays.fill(distanceSource, Integer.MAX_VALUE);
    distanceSource[source] = 0;
    
    // Backward search from target
    int[] distanceTarget = new int[vertices];
    Arrays.fill(distanceTarget, Integer.MAX_VALUE);
    distanceTarget[target] = 0;
    
    // Priority queues
    PriorityQueue<Node> forwardQueue = new PriorityQueue<>(vertices, new Node());
    PriorityQueue<Node> backwardQueue = new PriorityQueue<>(vertices, new Node());
    
    forwardQueue.add(new Node(source, 0));
    backwardQueue.add(new Node(target, 0));
    
    // Sets of visited vertices
    boolean[] visitedForward = new boolean[vertices];
    boolean[] visitedBackward = new boolean[vertices];
    
    int shortestPath = Integer.MAX_VALUE;
    
    // Alternately explore from source and target
    while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
        // Forward step
        shortestPath = Math.min(shortestPath, processNode(
            graph, forwardQueue, distanceSource, visitedForward, 
            distanceTarget, visitedBackward, vertices));
        
        // Backward step
        shortestPath = Math.min(shortestPath, processNode(
            reverseGraph, backwardQueue, distanceTarget, visitedBackward, 
            distanceSource, visitedForward, vertices));
        
        // If the priority queues' minimum distances sum to more than 
        // the current shortest path, we're done
        if (forwardQueue.peek().weight + backwardQueue.peek().weight >= shortestPath) {
            break;
        }
    }
    
    return shortestPath == Integer.MAX_VALUE ? -1 : shortestPath;
}

// Helper function for bidirectional Dijkstra
private int processNode(List<List<Node>> graph, PriorityQueue<Node> pq, 
                        int[] distance, boolean[] visited, 
                        int[] otherDistance, boolean[] otherVisited, int vertices) {
    int u = pq.poll().vertex;
    
    // If this vertex has been visited from both directions, calculate the path length
    if (visited[u]) {
        return Integer.MAX_VALUE;
    }
    
    visited[u] = true;
    
    int shortestPath = Integer.MAX_VALUE;
    
    // Check if this vertex has been visited from the other direction
    if (otherVisited[u]) {
        shortestPath = distance[u] + otherDistance[u];
    }
    
    // Process all neighbors
    for (Node neighbor : graph.get(u)) {
        int v = neighbor.vertex;
        int weight = neighbor.weight;
        
        if (!visited[v] && distance[u] + weight < distance[v]) {
            distance[v] = distance[u] + weight;
            pq.add(new Node(v, distance[v]));
            
            // If this vertex has been visited from the other direction,
            // update the shortest path
            if (otherVisited[v]) {
                shortestPath = Math.min(shortestPath, distance[v] + otherDistance[v]);
            }
        }
    }
    
    return shortestPath;
}`,
          explanation: "These advanced implementations include path reconstruction and bidirectional search. Path reconstruction tracks the previous node in the shortest path, allowing the full path to be recreated. Bidirectional Dijkstra searches simultaneously from both the source and target, potentially finding the shortest path faster."
        }
      ]
    },
    {
      title: "Applications and Limitations",
      content: "Dijkstra's algorithm has numerous applications in routing, transportation, and network protocols. However, it also has limitations, primarily its inability to handle negative edge weights. Understanding these limitations is crucial for choosing the appropriate algorithm for a given problem.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Applications of Dijkstra's Algorithm:

1. Network Routing Protocols
   - OSPF (Open Shortest Path First): Used in internet routing to determine the best path for packets
   - GPS Navigation Systems: Finding the shortest/fastest route between locations

2. Telecommunication Networks
   - Finding the shortest path for data in telecommunications networks
   - Network planning and optimization

3. Transportation and Logistics
   - Optimal route planning for delivery services
   - Traffic management systems

4. Robotics
   - Path planning for autonomous robots
   - Navigation in unknown environments

Limitations:

1. Negative Edge Weights
   - Dijkstra's algorithm doesn't work with negative edge weights
   - For graphs with negative weights, use the Bellman-Ford algorithm

2. Performance on Dense Graphs
   - For dense graphs, the adjacency matrix implementation might be more efficient
   - For very large graphs, more specialized algorithms may be needed

Time Complexity Analysis:

1. Basic implementation with array:
   - Time complexity: O(V²)
   - Good for dense graphs where E ≈ V²

2. Implementation with binary heap (priority queue):
   - Time complexity: O((V+E)log V)
   - Good for sparse graphs where E << V²

3. Implementation with Fibonacci heap:
   - Time complexity: O(V log V + E)
   - Theoretically more efficient but complex to implement
*/

// Example: Using Dijkstra's algorithm for a simple GPS navigation system
class GPSNavigator {
    private List<List<Road>> roadNetwork; // Adjacency list
    private int numLocations;
    private String[] locationNames;
    
    // Road class representing a directed edge
    static class Road {
        int destination;
        int distance; // in meters
        int time; // in seconds
        
        Road(int destination, int distance, int time) {
            this.destination = destination;
            this.distance = distance;
            this.time = time;
        }
    }
    
    public GPSNavigator(int numLocations, String[] locationNames) {
        this.numLocations = numLocations;
        this.locationNames = locationNames;
        
        // Initialize road network
        roadNetwork = new ArrayList<>(numLocations);
        for (int i = 0; i < numLocations; i++) {
            roadNetwork.add(new ArrayList<>());
        }
    }
    
    // Add a road between two locations
    public void addRoad(int from, int to, int distance, int time) {
        roadNetwork.get(from).add(new Road(to, distance, time));
    }
    
    // Find the fastest route between two locations
    public void findFastestRoute(int start, int end) {
        // Distance and previous arrays
        int[] time = new int[numLocations];
        int[] previous = new int[numLocations];
        
        // Initialize
        Arrays.fill(time, Integer.MAX_VALUE);
        Arrays.fill(previous, -1);
        time[start] = 0;
        
        // Priority queue
        PriorityQueue<Node> pq = new PriorityQueue<>(numLocations, 
            Comparator.comparingInt(n -> n.weight));
        pq.add(new Node(start, 0));
        
        while (!pq.isEmpty()) {
            int current = pq.poll().vertex;
            
            if (current == end) break;
            
            for (Road road : roadNetwork.get(current)) {
                if (time[current] + road.time < time[road.destination]) {
                    time[road.destination] = time[current] + road.time;
                    previous[road.destination] = current;
                    pq.add(new Node(road.destination, time[road.destination]));
                }
            }
        }
        
        // Print the result
        if (time[end] != Integer.MAX_VALUE) {
            System.out.println("Fastest route from " + locationNames[start] + 
                             " to " + locationNames[end] + ":");
            System.out.println("Total time: " + time[end] + " seconds");
            
            // Print the path
            List<Integer> path = new ArrayList<>();
            int current = end;
            while (current != -1) {
                path.add(current);
                current = previous[current];
            }
            
            System.out.print("Route: ");
            for (int i = path.size() - 1; i >= 0; i--) {
                System.out.print(locationNames[path.get(i)]);
                if (i > 0) System.out.print(" -> ");
            }
            System.out.println();
        } else {
            System.out.println("No route found from " + locationNames[start] + 
                             " to " + locationNames[end]);
        }
    }
}`,
          explanation: "This code provides an overview of the applications and limitations of Dijkstra's algorithm, along with a practical example of using it for a GPS navigation system. The example demonstrates how to find the fastest route between two locations considering both distance and time, which is similar to how real-world navigation applications work."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "dj-hw1",
      question: "Implement Dijkstra's algorithm to solve the \"single-source shortest path\" problem in a weighted, directed graph. Your implementation should use a priority queue and handle both distance calculation and path reconstruction.",
      solution: "Use the priority queue implementation shown in the lesson, with an additional array to track the previous node in the shortest path. After running the algorithm, traverse the previous array to reconstruct the path."
    },
    {
      id: "dj-hw2",
      question: "Modify Dijkstra's algorithm to solve the \"multi-source shortest path\" problem, where we need to find the shortest path from any of multiple source nodes to each destination node.",
      solution: "Initialize the distance to 0 for all source nodes and add them all to the priority queue at the start of the algorithm. Then proceed with standard Dijkstra's algorithm."
    },
    {
      id: "dj-hw3",
      question: "Implement a solution to the \"shortest path with constraints\" problem, where certain paths may have restrictions (e.g., avoid highways, height/weight limitations, etc.). Modify Dijkstra's algorithm to handle these constraints.",
      solution: "Modify the relaxation step of Dijkstra's algorithm to check if an edge satisfies all constraints before considering it. Only update the distance if both the path is shorter and all constraints are satisfied."
    }
  ],
  
  quiz: [
    {
      id: "dj-q1",
      question: "What is the time complexity of Dijkstra's algorithm when implemented with a binary heap (priority queue)?",
      options: ["O(V²)", "O(E log V)", "O((V+E) log V)", "O(V + E)"],
      correctAnswer: 2,
      explanation: "The time complexity is O((V+E) log V) where V is the number of vertices and E is the number of edges. We potentially process each vertex and edge once, and each priority queue operation takes O(log V) time."
    },
    {
      id: "dj-q2",
      question: "Which of the following is a limitation of Dijkstra's algorithm?",
      options: [
        "It cannot handle directed graphs",
        "It cannot handle negative edge weights",
        "It cannot find paths between arbitrary vertices",
        "It cannot handle weighted graphs"
      ],
      correctAnswer: 1,
      explanation: "Dijkstra's algorithm cannot handle negative edge weights because it assumes that adding an edge to a path cannot decrease the path's length, which doesn't hold true with negative weights."
    },
    {
      id: "dj-q3",
      question: "Which data structure is most commonly used to optimize Dijkstra's algorithm for sparse graphs?",
      options: [
        "Array",
        "Adjacency Matrix",
        "Priority Queue (Binary Heap)",
        "Queue"
      ],
      correctAnswer: 2,
      explanation: "A priority queue (typically implemented as a binary heap) is commonly used to efficiently extract the node with the minimum distance in each iteration, improving performance for sparse graphs."
    },
    {
      id: "dj-q4",
      question: "In Dijkstra's algorithm, what does the greedy choice property refer to?",
      options: [
        "Always choosing the edge with the lowest weight",
        "Always choosing the shortest path to any vertex",
        "Always choosing the next unvisited vertex with the smallest tentative distance",
        "Always choosing the vertex with the highest degree"
      ],
      correctAnswer: 2,
      explanation: "The greedy choice property in Dijkstra's algorithm refers to always selecting the next unvisited vertex with the smallest tentative distance. This ensures that each vertex is processed in order of increasing distance from the source."
    },
    {
      id: "dj-q5",
      question: "Which algorithm should be used instead of Dijkstra's when a graph may contain negative edge weights?",
      options: [
        "Prim's algorithm",
        "Bellman-Ford algorithm",
        "Kruskal's algorithm",
        "A* search algorithm"
      ],
      correctAnswer: 1,
      explanation: "The Bellman-Ford algorithm should be used instead of Dijkstra's when a graph may contain negative edge weights. Unlike Dijkstra's, Bellman-Ford can handle negative weights and can detect negative cycles."
    }
  ]
};

export default dijkstraAlgorithmContent; 