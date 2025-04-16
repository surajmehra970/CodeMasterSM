import { Content } from '@/types/course';

const graphRepresentationContent: Content = {
  introduction: "Graph representation is fundamental to working with graph algorithms. A graph consists of vertices (nodes) connected by edges, and choosing the right representation is crucial for the efficiency of graph operations. In this lesson, we'll explore different ways to represent graphs in computer memory, their advantages, disadvantages, and when to use each.",
  
  learningObjectives: [
    "Understand the concept of graphs and their components",
    "Learn different ways to represent graphs: adjacency matrix, adjacency list, edge list",
    "Analyze time and space complexity of different graph representations",
    "Implement various graph representations in code",
    "Choose the appropriate representation for different graph problems"
  ],
  
  sections: [
    {
      title: "Graph Basics",
      content: "A graph G = (V, E) consists of a set of vertices V and a set of edges E. Edges can be directed (one-way) or undirected (two-way). Graphs can also be weighted (edges have values) or unweighted. Understanding these properties is essential for choosing the right representation.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic graph types
// 1. Undirected Graph: edges have no direction
// 2. Directed Graph (Digraph): edges have direction
// 3. Weighted Graph: edges have weights/values
// 4. Unweighted Graph: edges have no weights
// 5. Cyclic Graph: contains at least one cycle
// 6. Acyclic Graph: contains no cycles
// 7. Connected Graph: there is a path between every pair of vertices
// 8. Disconnected Graph: there are vertices with no path between them

// Example: A simple graph class
class Graph {
    private int V; // Number of vertices
    private boolean isDirected;
    private boolean isWeighted;
    
    public Graph(int v, boolean isDirected, boolean isWeighted) {
        this.V = v;
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        // The actual representation (adjacency list/matrix) will be defined later
    }
    
    // Graph operations will go here
}`,
          explanation: "This code outlines different types of graphs and provides a basic Graph class skeleton that we'll expand with different representations."
        }
      ]
    },
    {
      title: "Adjacency Matrix Representation",
      content: "An adjacency matrix is a 2D array of size V×V where V is the number of vertices. Matrix[i][j] = 1 (or the weight) if there is an edge from vertex i to vertex j, and 0 otherwise. It's simple to implement and provides O(1) edge lookup, but uses O(V²) space regardless of the number of edges.",
      codeExamples: [
        {
          language: "java",
          code: `// Adjacency Matrix implementation
class GraphAdjMatrix {
    private int V;
    private int[][] adjMatrix;
    private boolean isDirected;
    
    public GraphAdjMatrix(int v, boolean isDirected) {
        this.V = v;
        this.isDirected = isDirected;
        adjMatrix = new int[v][v];
    }
    
    // Add edge from source to destination
    public void addEdge(int src, int dest, int weight) {
        adjMatrix[src][dest] = weight; // For weighted graphs, store the weight instead of 1
        
        if (!isDirected) {
            adjMatrix[dest][src] = weight; // For undirected graphs, add edge in both directions
        }
    }
    
    // Check if there is an edge from src to dest
    public boolean hasEdge(int src, int dest) {
        return adjMatrix[src][dest] != 0;
    }
    
    // Get the weight of edge from src to dest
    public int getWeight(int src, int dest) {
        return adjMatrix[src][dest];
    }
    
    // Get all adjacent vertices of a vertex
    public List<Integer> getAdjacentVertices(int vertex) {
        List<Integer> adjacentVertices = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (adjMatrix[vertex][i] != 0) {
                adjacentVertices.add(i);
            }
        }
        return adjacentVertices;
    }
    
    // Print the matrix
    public void printGraph() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                System.out.print(adjMatrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
          explanation: "This implementation uses a 2D array to represent the graph. For unweighted graphs, we can use 1 to indicate an edge; for weighted graphs, we store the weight. The adjacency matrix provides constant time edge lookup but requires O(V²) space."
        }
      ]
    },
    {
      title: "Adjacency List Representation",
      content: "An adjacency list uses an array (or list) of linked lists. Each entry in the array represents a vertex, and the corresponding linked list contains the vertices that are adjacent to it. This representation is space-efficient for sparse graphs (where |E| << |V|²) but less efficient for dense graphs.",
      codeExamples: [
        {
          language: "java",
          code: `// Adjacency List implementation
class GraphAdjList {
    private int V;
    private List<List<Edge>> adjList;
    private boolean isDirected;
    
    // Edge class to store destination vertex and weight
    static class Edge {
        int dest;
        int weight;
        
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public GraphAdjList(int v, boolean isDirected) {
        this.V = v;
        this.isDirected = isDirected;
        adjList = new ArrayList<>(v);
        
        for (int i = 0; i < v; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    // Add edge from source to destination
    public void addEdge(int src, int dest, int weight) {
        adjList.get(src).add(new Edge(dest, weight));
        
        if (!isDirected) {
            adjList.get(dest).add(new Edge(src, weight)); // For undirected graphs
        }
    }
    
    // Check if there is an edge from src to dest
    public boolean hasEdge(int src, int dest) {
        for (Edge edge : adjList.get(src)) {
            if (edge.dest == dest) {
                return true;
            }
        }
        return false;
    }
    
    // Get the weight of edge from src to dest
    public int getWeight(int src, int dest) {
        for (Edge edge : adjList.get(src)) {
            if (edge.dest == dest) {
                return edge.weight;
            }
        }
        return -1; // Edge not found
    }
    
    // Get all adjacent vertices of a vertex
    public List<Integer> getAdjacentVertices(int vertex) {
        List<Integer> adjacentVertices = new ArrayList<>();
        for (Edge edge : adjList.get(vertex)) {
            adjacentVertices.add(edge.dest);
        }
        return adjacentVertices;
    }
    
    // Print the adjacency list
    public void printGraph() {
        for (int i = 0; i < V; i++) {
            System.out.print("Vertex " + i + " -> ");
            for (Edge edge : adjList.get(i)) {
                System.out.print(edge.dest + "(weight: " + edge.weight + ") ");
            }
            System.out.println();
        }
    }
}`,
          explanation: "This implementation uses a list of lists to represent the graph. Each vertex has a list of its adjacent vertices (with weights for weighted graphs). The adjacency list is space-efficient for sparse graphs and provides fast iteration over all edges of a vertex."
        }
      ]
    },
    {
      title: "Edge List Representation",
      content: "An edge list is a collection of all edges in the graph. Each edge is represented by a tuple (src, dest, weight). This representation is simple and useful for algorithms that process all edges (like Kruskal's MST algorithm), but it's inefficient for querying if a specific edge exists or finding all edges of a vertex.",
      codeExamples: [
        {
          language: "java",
          code: `// Edge List implementation
class GraphEdgeList {
    private int V;
    private List<Edge> edges;
    private boolean isDirected;
    
    static class Edge {
        int src;
        int dest;
        int weight;
        
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public GraphEdgeList(int v, boolean isDirected) {
        this.V = v;
        this.isDirected = isDirected;
        edges = new ArrayList<>();
    }
    
    // Add edge from source to destination
    public void addEdge(int src, int dest, int weight) {
        edges.add(new Edge(src, dest, weight));
        
        if (!isDirected) {
            edges.add(new Edge(dest, src, weight)); // For undirected graphs
        }
    }
    
    // Check if there is an edge from src to dest
    public boolean hasEdge(int src, int dest) {
        for (Edge edge : edges) {
            if (edge.src == src && edge.dest == dest) {
                return true;
            }
        }
        return false;
    }
    
    // Get the weight of edge from src to dest
    public int getWeight(int src, int dest) {
        for (Edge edge : edges) {
            if (edge.src == src && edge.dest == dest) {
                return edge.weight;
            }
        }
        return -1; // Edge not found
    }
    
    // Get all adjacent vertices of a vertex
    public List<Integer> getAdjacentVertices(int vertex) {
        List<Integer> adjacentVertices = new ArrayList<>();
        for (Edge edge : edges) {
            if (edge.src == vertex) {
                adjacentVertices.add(edge.dest);
            }
        }
        return adjacentVertices;
    }
    
    // Print the edge list
    public void printGraph() {
        for (Edge edge : edges) {
            System.out.println("Edge: " + edge.src + " -> " + edge.dest + 
                              " (weight: " + edge.weight + ")");
        }
    }
}`,
          explanation: "The edge list representation stores all edges in a single list. It's useful for algorithms that need to process all edges of the graph (like minimum spanning tree algorithms), but inefficient for finding adjacent vertices of a given vertex."
        }
      ]
    },
    {
      title: "Comparison and Use Cases",
      content: "Each representation has its strengths and weaknesses. Adjacency matrices are good for dense graphs and when you need fast edge lookup. Adjacency lists are efficient for sparse graphs and when you need to iterate over all edges of a vertex. Edge lists are useful for algorithms that process all edges but inefficient for other operations.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time and Space Complexity Comparison:

1. Adjacency Matrix:
   - Space: O(V²)
   - Add Edge: O(1)
   - Remove Edge: O(1)
   - Check if edge exists: O(1)
   - Find all adjacent vertices: O(V)
   - Find degree of a vertex: O(V)

2. Adjacency List:
   - Space: O(V + E)
   - Add Edge: O(1)
   - Remove Edge: O(E) worst case
   - Check if edge exists: O(E) worst case
   - Find all adjacent vertices: O(1) to access the list, then O(degree) to iterate
   - Find degree of a vertex: O(1)

3. Edge List:
   - Space: O(E)
   - Add Edge: O(1)
   - Remove Edge: O(E)
   - Check if edge exists: O(E)
   - Find all adjacent vertices: O(E)
   - Find degree of a vertex: O(E)

Use Cases:

- Adjacency Matrix:
  * Dense graphs (|E| ≈ |V|²)
  * Weighted graphs with many edges
  * When quick edge lookup is required
  * Small graphs (to avoid excessive space usage)

- Adjacency List:
  * Sparse graphs (|E| << |V|²)
  * Most graph algorithms (BFS, DFS, etc.)
  * Social networks (people have limited connections)
  * Web page links (most pages link to few others)

- Edge List:
  * When running algorithms that process all edges (Kruskal's MST)
  * When the graph structure is frequently changing
  * When memory is a major concern
  * When edge-specific data needs to be stored
*/

// Example: Choosing representation based on graph type
public static Graph createOptimalGraph(int vertices, int edges, boolean isDirected) {
    // If the graph is dense (edges > 0.4 * vertices²)
    if (edges > 0.4 * vertices * vertices) {
        return new GraphAdjMatrix(vertices, isDirected);
    } else {
        // For sparse graphs, use adjacency list
        return new GraphAdjList(vertices, isDirected);
    }
}`,
          explanation: "This code provides a detailed comparison of the time and space complexities of different graph representations, along with guidance on when to use each one. Understanding these trade-offs is crucial for selecting the right representation for a specific problem."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "gr-hw1",
      question: "Implement a graph class that can switch between different representations (adjacency matrix, adjacency list, edge list) based on runtime parameters. Include methods to convert between representations.",
      solution: "Create an abstract Graph interface with concrete implementations for each representation type. Include methods to convert between different representations by iterating through all edges."
    },
    {
      id: "gr-hw2",
      question: "Implement a method to find the shortest path between two vertices in a graph using BFS (for unweighted graphs) or Dijkstra's algorithm (for weighted graphs). Test the implementation on different graph representations and analyze their performance differences.",
      solution: "Implement both BFS and Dijkstra's algorithm for each representation, measure their performance on various graph types, and analyze the results to understand how representation affects algorithm efficiency."
    },
    {
      id: "gr-hw3",
      question: "Given a real-world scenario (e.g., a social network, a road network, a computer network), design an appropriate graph representation and justify your choice. Implement the representation and basic operations required for the scenario.",
      solution: "Choose a representation based on the characteristics of the real-world problem (e.g., adjacency list for social networks due to their sparsity). Implement required operations such as finding friends of friends or shortest paths between locations."
    }
  ],
  
  quiz: [
    {
      id: "gr-q1",
      question: "What is the space complexity of an adjacency matrix for a graph with V vertices?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V²)"],
      correctAnswer: 3,
      explanation: "An adjacency matrix uses a V×V 2D array, resulting in O(V²) space complexity regardless of the number of edges."
    },
    {
      id: "gr-q2",
      question: "Which graph representation is most space-efficient for a sparse graph?",
      options: [
        "Adjacency Matrix",
        "Adjacency List",
        "Edge List",
        "All have the same space efficiency"
      ],
      correctAnswer: 1,
      explanation: "Adjacency List is most space-efficient for sparse graphs with O(V + E) space complexity, compared to O(V²) for adjacency matrix and O(E) for edge list (which lacks vertex information)."
    },
    {
      id: "gr-q3",
      question: "Which operation is fastest (lowest time complexity) with an adjacency matrix representation?",
      options: [
        "Adding an edge",
        "Removing an edge",
        "Checking if an edge exists between two vertices",
        "Finding all edges in the graph"
      ],
      correctAnswer: 2,
      explanation: "Checking if an edge exists between two vertices takes O(1) time with an adjacency matrix since it's a simple array lookup: matrix[src][dest]."
    },
    {
      id: "gr-q4",
      question: "For a complete graph with V vertices, what is the approximate space comparison between an adjacency list and an adjacency matrix?",
      options: [
        "Adjacency list uses less space",
        "Adjacency matrix uses less space",
        "Both use approximately the same space",
        "It depends on the implementation"
      ],
      correctAnswer: 2,
      explanation: "For a complete graph, |E| = V(V-1)/2 for undirected or V(V-1) for directed. The adjacency list space complexity is O(V + E) ≈ O(V²), which is similar to the adjacency matrix's O(V²)."
    },
    {
      id: "gr-q5",
      question: "Which graph representation would be most appropriate for implementing Kruskal's Minimum Spanning Tree algorithm?",
      options: [
        "Adjacency Matrix",
        "Adjacency List",
        "Edge List",
        "All are equally appropriate"
      ],
      correctAnswer: 2,
      explanation: "Kruskal's algorithm processes edges in ascending order of weight and checks for cycles. An edge list is most appropriate as it directly provides all edges, which can be sorted by weight."
    }
  ],
  
  practice: {
    introduction: "Practice these LeetCode problems to reinforce your understanding of graph representations and basic graph operations. These problems will help you apply the concepts learned in this lesson to real-world coding scenarios and understand the importance of choosing the right representation for different graph problems.",
    questions: {
      easy: [
        {
          id: "graph-rep-practice-1",
          title: "Find the Town Judge",
          link: "https://leetcode.com/problems/find-the-town-judge/",
          description: "In a town, there is a judge trusted by everyone else but trusts nobody. Given trust relationships between people, find the judge. This problem helps practice creating and analyzing directed graphs."
        },
        {
          id: "graph-rep-practice-2",
          title: "Find Center of Star Graph",
          link: "https://leetcode.com/problems/find-center-of-star-graph/",
          description: "Find the center of a star graph where there is one node that is connected to all other nodes. This problem demonstrates how different graph representations affect solution efficiency."
        },
        {
          id: "graph-rep-practice-3",
          title: "Maximum Number of Edges to Remove",
          link: "https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/",
          description: "Practice distinguishing between different types of edges in a graph while maintaining connectivity properties."
        }
      ],
      medium: [
        {
          id: "graph-rep-practice-4",
          title: "Course Schedule",
          link: "https://leetcode.com/problems/course-schedule/",
          description: "Determine if it's possible to finish all courses given prerequisites. This problem helps practice representing and traversing a directed graph to detect cycles."
        },
        {
          id: "graph-rep-practice-5",
          title: "Redundant Connection",
          link: "https://leetcode.com/problems/redundant-connection/",
          description: "Find an edge that can be removed to make a graph a tree. This problem requires understanding different ways to track connections in an undirected graph."
        },
        {
          id: "graph-rep-practice-6",
          title: "Evaluate Division",
          link: "https://leetcode.com/problems/evaluate-division/",
          description: "Evaluate equations and return the corresponding values. This problem involves building and querying a weighted directed graph."
        },
        {
          id: "graph-rep-practice-7",
          title: "Graph Valid Tree",
          link: "https://leetcode.com/problems/graph-valid-tree/",
          description: "Determine if an undirected graph is a valid tree. This problem tests your ability to check for cycles and connectivity in a graph."
        }
      ],
      hard: [
        {
          id: "graph-rep-practice-8",
          title: "Reconstruct Itinerary",
          link: "https://leetcode.com/problems/reconstruct-itinerary/",
          description: "Given a list of airline tickets, reconstruct the itinerary in order. This problem requires efficient graph traversal through adjacency lists."
        },
        {
          id: "graph-rep-practice-9",
          title: "Alien Dictionary",
          link: "https://leetcode.com/problems/alien-dictionary/",
          description: "Given a sorted dictionary of an alien language, find the order of characters. This problem involves building a directed graph from character ordering constraints."
        }
      ]
    }
  }
};

export default graphRepresentationContent; 