import { Content } from '@/types/course';

const topologicalSortContent: Content = {
  introduction: "Topological sorting is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. This algorithm is essential for scheduling tasks with dependencies, course prerequisites, build systems, and data processing workflows. A topological sort is only possible if the graph has no directed cycles, which is why it's limited to DAGs.",
  
  learningObjectives: [
    "Understand the concept of topological ordering and its properties",
    "Implement topological sort using Depth-First Search (DFS)",
    "Implement topological sort using Kahn's algorithm with BFS",
    "Detect cycles in directed graphs using topological sort",
    "Apply topological sorting to solve real-world scheduling and dependency problems"
  ],
  
  sections: [
    {
      title: "Understanding Topological Sort",
      content: "Topological sorting arranges vertices in a directed acyclic graph (DAG) in a linear order such that all directed edges go from earlier vertices to later ones. In essence, if there's an edge from vertex u to vertex v, then u appears before v in the topological ordering. This concept naturally applies to problems involving dependencies, where certain tasks must be completed before others can begin.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic graph structure for topological sort examples
class Graph {
    private int V;                    // Number of vertices
    private List<List<Integer>> adj;  // Adjacency list representation
    
    // Constructor
    Graph(int v) {
        V = v;
        adj = new ArrayList<>(v);
        for (int i = 0; i < v; i++)
            adj.add(new ArrayList<>());
    }
    
    // Add a directed edge from vertex u to vertex v
    void addEdge(int u, int v) {
        adj.get(u).add(v);
    }
    
    // Get the adjacency list
    List<List<Integer>> getAdjList() {
        return adj;
    }
    
    // Get the number of vertices
    int getV() {
        return V;
    }
    
    // Example graph creation: a simple task dependency graph
    // Task 0: Start project
    // Task 1: Gather requirements
    // Task 2: Design architecture
    // Task 3: Implement core features
    // Task 4: Write tests
    // Task 5: Deploy to production
    static Graph createExampleTaskGraph() {
        Graph g = new Graph(6);
        g.addEdge(0, 1); // Start project -> Gather requirements
        g.addEdge(1, 2); // Gather requirements -> Design architecture
        g.addEdge(2, 3); // Design architecture -> Implement core features
        g.addEdge(2, 4); // Design architecture -> Write tests
        g.addEdge(3, 5); // Implement core features -> Deploy to production
        g.addEdge(4, 5); // Write tests -> Deploy to production
        return g;
    }`,
          explanation: "This code defines a basic graph data structure for representing directed acyclic graphs (DAGs). The Graph class uses an adjacency list representation, which is efficient for sparse graphs typically encountered in topological sorting problems. We also provide a method to create an example task dependency graph, where each vertex represents a task, and each directed edge (u, v) indicates that task u must be completed before task v can begin."
        }
      ]
    },
    {
      title: "DFS-based Topological Sort",
      content: "The most common approach to topological sorting uses Depth-First Search (DFS). The algorithm performs a DFS traversal of the graph while maintaining a stack of finished vertices. When a vertex's exploration is complete (meaning all its descendants have been explored), it is pushed onto the stack. Once the DFS completes, popping the stack gives the topological ordering.",
      codeExamples: [
        {
          language: "java",
          code: `// DFS-based topological sort
class TopologicalSortDFS {
    private Graph graph;
    
    TopologicalSortDFS(Graph g) {
        graph = g;
    }
    
    // Main function to find topological sorting
    List<Integer> sort() {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[graph.getV()];
        
        // Call the recursive helper function for all vertices
        for (int i = 0; i < graph.getV(); i++) {
            if (!visited[i]) {
                sortUtil(i, visited, stack);
            }
        }
        
        // Create the result list by popping the stack
        List<Integer> result = new ArrayList<>();
        while (!stack.empty()) {
            result.add(stack.pop());
        }
        
        return result;
    }
    
    // A recursive function used by topologicalSort
    private void sortUtil(int v, boolean[] visited, Stack<Integer> stack) {
        // Mark the current node as visited
        visited[v] = true;
        
        // Recur for all vertices adjacent to this vertex
        for (Integer neighbor : graph.getAdjList().get(v)) {
            if (!visited[neighbor]) {
                sortUtil(neighbor, visited, stack);
            }
        }
        
        // All descendants processed, push current vertex to stack
        stack.push(v);
    }
    
    // Usage example
    public static void main(String[] args) {
        Graph g = Graph.createExampleTaskGraph();
        TopologicalSortDFS topologicalSort = new TopologicalSortDFS(g);
        List<Integer> result = topologicalSort.sort();
        
        System.out.println("Topological Sort (tasks should be executed in this order):");
        for (Integer task : result) {
            System.out.print(task + " ");
        }
        // Expected output: 0 1 2 4 3 5 or 0 1 2 3 4 5 (both are valid)
    }
}`,
          explanation: "This implementation uses a DFS-based approach for topological sorting. The algorithm performs a modified DFS traversal: it recursively explores all unvisited neighbors of a vertex, and once a vertex's exploration is complete (meaning all its descendants have been visited), it pushes the vertex onto a stack. After all vertices have been processed, popping the stack yields the topological ordering. The time complexity is O(V + E), where V is the number of vertices and E is the number of edges."
        }
      ]
    },
    {
      title: "Kahn's Algorithm (BFS-based Topological Sort)",
      content: "Another approach to topological sorting is Kahn's algorithm, which uses a breadth-first strategy. The algorithm repeatedly finds vertices with no incoming edges (sources), removes them and their outgoing edges from the graph, and adds them to the result. This process continues until all vertices are processed or a cycle is detected.",
      codeExamples: [
        {
          language: "java",
          code: `// Kahn's algorithm for topological sort
class TopologicalSortKahn {
    private Graph graph;
    
    TopologicalSortKahn(Graph g) {
        graph = g;
    }
    
    // Find topological ordering using Kahn's algorithm
    List<Integer> sort() {
        List<Integer> result = new ArrayList<>();
        int V = graph.getV();
        
        // Calculate in-degree for each vertex
        int[] inDegree = new int[V];
        for (int u = 0; u < V; u++) {
            for (int v : graph.getAdjList().get(u)) {
                inDegree[v]++;
            }
        }
        
        // Create a queue and enqueue all vertices with in-degree 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        // Initialize count of visited vertices
        int visited = 0;
        
        // Process vertices with in-degree 0
        while (!queue.isEmpty()) {
            // Dequeue a vertex and add it to result
            int u = queue.poll();
            result.add(u);
            visited++;
            
            // Reduce in-degree of adjacent vertices
            for (int v : graph.getAdjList().get(u)) {
                inDegree[v]--;
                
                // If in-degree becomes 0, add to queue
                if (inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        
        // Check if there was a cycle
        if (visited != V) {
            System.out.println("Graph contains a cycle. Topological sort not possible.");
            return new ArrayList<>();
        }
        
        return result;
    }
    
    // Usage example
    public static void main(String[] args) {
        Graph g = Graph.createExampleTaskGraph();
        TopologicalSortKahn topologicalSort = new TopologicalSortKahn(g);
        List<Integer> result = topologicalSort.sort();
        
        if (!result.isEmpty()) {
            System.out.println("Topological Sort using Kahn's algorithm:");
            for (Integer task : result) {
                System.out.print(task + " ");
            }
            // Expected output: 0 1 2 3 4 5 or 0 1 2 4 3 5 (both are valid)
        }
    }
}`,
          explanation: "Kahn's algorithm provides an alternative approach to topological sorting using BFS. The algorithm first computes the in-degree (number of incoming edges) for each vertex. It then repeatedly finds vertices with zero in-degree, removes them from the graph by decrementing the in-degree of their neighbors, and adds them to the result. If the algorithm processes all vertices, it produces a valid topological ordering. Otherwise, the graph contains a cycle, and no topological ordering is possible. Like the DFS approach, the time complexity is O(V + E)."
        }
      ]
    },
    {
      title: "Cycle Detection Using Topological Sort",
      content: "Topological sorting is only possible for directed acyclic graphs (DAGs). This property makes topological sort algorithms excellent for cycle detection in directed graphs. A graph contains a cycle if a topological ordering cannot be found.",
      codeExamples: [
        {
          language: "java",
          code: `// Cycle detection using DFS
class CycleDetection {
    private Graph graph;
    
    CycleDetection(Graph g) {
        graph = g;
    }
    
    // Function to detect cycle in a directed graph
    boolean hasCycle() {
        int V = graph.getV();
        boolean[] visited = new boolean[V];
        boolean[] recursionStack = new boolean[V];
        
        // Call the recursive helper function for all vertices
        for (int i = 0; i < V; i++) {
            if (isCyclicUtil(i, visited, recursionStack)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Recursive function to detect cycle in subgraph reachable from vertex v
    private boolean isCyclicUtil(int v, boolean[] visited, boolean[] recursionStack) {
        // Mark the current node as visited and add to recursion stack
        if (recursionStack[v])
            return true;
        
        if (visited[v])
            return false;
        
        visited[v] = true;
        recursionStack[v] = true;
        
        // Recur for all adjacent vertices
        for (Integer neighbor : graph.getAdjList().get(v)) {
            if (isCyclicUtil(neighbor, visited, recursionStack)) {
                return true;
            }
        }
        
        // Remove the vertex from recursion stack
        recursionStack[v] = false;
        return false;
    }
    
    // Function to detect cycle using Kahn's algorithm
    boolean hasCycleKahn() {
        int V = graph.getV();
        
        // Calculate in-degree for each vertex
        int[] inDegree = new int[V];
        for (int u = 0; u < V; u++) {
            for (int v : graph.getAdjList().get(u)) {
                inDegree[v]++;
            }
        }
        
        // Create a queue and enqueue all vertices with in-degree 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        // Initialize count of visited vertices
        int visited = 0;
        
        // Process vertices with in-degree 0
        while (!queue.isEmpty()) {
            // Dequeue a vertex
            int u = queue.poll();
            visited++;
            
            // Reduce in-degree of adjacent vertices
            for (int v : graph.getAdjList().get(u)) {
                inDegree[v]--;
                
                // If in-degree becomes 0, add to queue
                if (inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        
        // If visited count is less than total vertices, graph has a cycle
        return visited != V;
    }
    
    // Create a graph with a cycle for testing
    static Graph createCyclicGraph() {
        Graph g = new Graph(4);
        g.addEdge(0, 1);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        g.addEdge(3, 1); // This edge creates a cycle 1->2->3->1
        return g;
    }
    
    // Usage example
    public static void main(String[] args) {
        // Test with acyclic graph
        Graph acyclicGraph = Graph.createExampleTaskGraph();
        CycleDetection detector1 = new CycleDetection(acyclicGraph);
        System.out.println("Acyclic graph has cycle (DFS): " + detector1.hasCycle());
        System.out.println("Acyclic graph has cycle (Kahn): " + detector1.hasCycleKahn());
        
        // Test with cyclic graph
        Graph cyclicGraph = createCyclicGraph();
        CycleDetection detector2 = new CycleDetection(cyclicGraph);
        System.out.println("Cyclic graph has cycle (DFS): " + detector2.hasCycle());
        System.out.println("Cyclic graph has cycle (Kahn): " + detector2.hasCycleKahn());
    }
}`,
          explanation: "This code demonstrates two approaches for cycle detection in directed graphs. The first method uses a modified DFS traversal with a recursion stack to track vertices currently being processed. If we encounter a vertex that's already in the recursion stack, we've found a cycle. The second method utilizes Kahn's algorithm for topological sorting. If the algorithm cannot process all vertices (because no vertices with zero in-degree remain), the graph contains a cycle. Both approaches are effective for cycle detection in directed graphs."
        }
      ]
    },
    {
      title: "Applications of Topological Sort",
      content: "Topological sorting finds applications in various domains where dependencies or precedence relationships must be respected. Common applications include task scheduling, course prerequisite planning, symbol dependency resolution in compilers, and evaluating formulas in spreadsheets.",
      codeExamples: [
        {
          language: "java",
          code: `// Task scheduling with durations
class TaskScheduler {
    private Graph graph;
    private int[] taskDurations;
    
    TaskScheduler(Graph g, int[] durations) {
        graph = g;
        taskDurations = durations;
    }
    
    // Compute earliest completion times for all tasks
    int[] computeEarliestTimes() {
        int V = graph.getV();
        int[] earliestTime = new int[V];
        
        // Get topological order
        TopologicalSortKahn topo = new TopologicalSortKahn(graph);
        List<Integer> order = topo.sort();
        
        if (order.isEmpty()) {
            System.out.println("Cannot schedule tasks due to cyclic dependencies");
            return new int[0];
        }
        
        // Process tasks in topological order
        for (int task : order) {
            // Start time is the maximum of completion times of all prerequisites
            int maxPrerequisiteTime = 0;
            
            for (int i = 0; i < V; i++) {
                for (int j : graph.getAdjList().get(i)) {
                    if (j == task && earliestTime[i] > maxPrerequisiteTime) {
                        maxPrerequisiteTime = earliestTime[i];
                    }
                }
            }
            
            // Earliest completion time = start time + duration
            earliestTime[task] = maxPrerequisiteTime + taskDurations[task];
        }
        
        return earliestTime;
    }
    
    // Course scheduling example
    static class CourseScheduler {
        // Check if it's possible to finish all courses
        static boolean canFinish(int numCourses, int[][] prerequisites) {
            // Build the graph
            Graph g = new Graph(numCourses);
            for (int[] prereq : prerequisites) {
                g.addEdge(prereq[1], prereq[0]); // prereq[1] must be taken before prereq[0]
            }
            
            // Try to find a topological ordering
            TopologicalSortKahn topo = new TopologicalSortKahn(g);
            List<Integer> order = topo.sort();
            
            // If topological sort succeeds, we can finish all courses
            return !order.isEmpty();
        }
        
        // Find order to take courses
        static int[] findOrder(int numCourses, int[][] prerequisites) {
            // Build the graph
            Graph g = new Graph(numCourses);
            for (int[] prereq : prerequisites) {
                g.addEdge(prereq[1], prereq[0]); // prereq[1] must be taken before prereq[0]
            }
            
            // Find topological ordering
            TopologicalSortKahn topo = new TopologicalSortKahn(g);
            List<Integer> order = topo.sort();
            
            if (order.isEmpty()) {
                return new int[0]; // Cannot finish
            }
            
            // Convert list to array
            int[] result = new int[numCourses];
            for (int i = 0; i < numCourses; i++) {
                result[i] = order.get(i);
            }
            
            return result;
        }
    }
    
    // Build system dependency resolution
    static class BuildSystem {
        // Compile modules in correct order
        static List<String> compileOrder(String[] modules, Map<String, List<String>> dependencies) {
            // Map module names to indices
            Map<String, Integer> moduleToIndex = new HashMap<>();
            for (int i = 0; i < modules.length; i++) {
                moduleToIndex.put(modules[i], i);
            }
            
            // Build the dependency graph
            Graph g = new Graph(modules.length);
            for (Map.Entry<String, List<String>> entry : dependencies.entrySet()) {
                int module = moduleToIndex.get(entry.getKey());
                for (String dep : entry.getValue()) {
                    g.addEdge(moduleToIndex.get(dep), module); // dep must be compiled before module
                }
            }
            
            // Find topological ordering
            TopologicalSortDFS topo = new TopologicalSortDFS(g);
            List<Integer> order = topo.sort();
            
            if (order.isEmpty()) {
                return new ArrayList<>(); // Circular dependencies
            }
            
            // Convert indices back to module names
            List<String> result = new ArrayList<>();
            for (int index : order) {
                result.add(modules[index]);
            }
            
            return result;
        }
    }
}`,
          explanation: "This code demonstrates practical applications of topological sorting. The TaskScheduler class computes the earliest completion times for tasks with dependencies and durations. The CourseScheduler class solves the course scheduling problem, determining if it's possible to finish all courses given their prerequisites, and finding a valid order to take the courses. The BuildSystem class resolves dependencies in a build system, determining the correct order to compile modules. All these applications leverage topological sorting to respect the precedence relationships between elements."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "topo-sort-hw1",
      question: "Implement an algorithm to find all possible topological orderings of a given directed acyclic graph (DAG). Your solution should handle the case where multiple valid orderings exist.",
      solution: "Use a backtracking approach: identify all vertices with no incoming edges, add one to the current ordering, temporarily remove it from the graph, and recursively find all orderings for the reduced graph. Then backtrack by restoring the vertex and its edges. Start with an empty ordering and continue until all vertices are included or no valid ordering exists."
    },
    {
      id: "topo-sort-hw2",
      question: "Given a directed graph, modify the topological sort algorithm to identify and list all vertices that are part of a cycle. Your solution should handle multiple separate cycles in the graph.",
      solution: "Run a modified DFS-based topological sort that keeps track of vertices in the current exploration path (using a recursion stack). When a back edge is detected (pointing to a vertex in the recursion stack), identify all vertices in the cycle by tracing from the current vertex back to the target vertex in the recursion stack. Mark these vertices as part of a cycle."
    },
    {
      id: "topo-sort-hw3",
      question: "Implement an algorithm to find the 'critical path' in a project schedule, where each task has a duration and dependencies. The critical path is the sequence of tasks that determines the minimum possible project completion time.",
      solution: "Model the project as a DAG where vertices are tasks and edges represent dependencies. Use topological sort to process tasks in order. For each task, compute the earliest start time (max of completion times of all prerequisites) and earliest finish time (start time + duration). The critical path consists of tasks where the slack time (difference between latest and earliest start times) is zero."
    },
    {
      id: "topo-sort-hw4",
      question: "Design an algorithm that can remove the minimum number of edges from a directed graph to make it acyclic (a minimum feedback arc set problem).",
      solution: "This is an NP-hard problem, but you can use a greedy approach: Compute a topological sort ignoring cycles, then identify edges that go against this ordering. These are potential candidates for removal. Alternatively, assign weights to edges (e.g., based on in-degree and out-degree of vertices) and use a greedy strategy to remove edges with lowest weights until the graph becomes acyclic."
    }
  ],
  
  quiz: [
    {
      id: "topo-sort-q1",
      question: "Which of the following statements about topological sorting is TRUE?",
      options: [
        "A topological sort can be performed on any directed graph",
        "A graph can have at most one valid topological ordering",
        "A graph with a cycle cannot have a valid topological ordering",
        "A topological sort necessarily produces the shortest path between vertices"
      ],
      correctAnswer: 2,
      explanation: "Topological sorting can only be performed on directed acyclic graphs (DAGs). If a graph contains a cycle, then no valid topological ordering exists, as it would create a contradiction where a vertex must come both before and after another vertex in the ordering."
    },
    {
      id: "topo-sort-q2",
      question: "What is the time complexity of both the DFS-based and Kahn's algorithm for topological sorting?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
      correctAnswer: 2,
      explanation: "Both the DFS-based and Kahn's algorithm for topological sorting have a time complexity of O(V + E), where V is the number of vertices and E is the number of edges. This is because both algorithms need to process each vertex and edge exactly once."
    },
    {
      id: "topo-sort-q3",
      question: "In Kahn's algorithm for topological sorting, what vertices are initially added to the queue?",
      options: [
        "Vertices with the highest out-degree",
        "Vertices with the lowest in-degree",
        "Vertices with no incoming edges (in-degree = 0)",
        "Vertices with no outgoing edges (out-degree = 0)"
      ],
      correctAnswer: 2,
      explanation: "In Kahn's algorithm, vertices with no incoming edges (in-degree = 0) are initially added to the queue. These are vertices that have no prerequisites and can be processed immediately. As vertices are processed, their outgoing edges are removed, potentially creating new vertices with in-degree = 0."
    },
    {
      id: "topo-sort-q4",
      question: "Which of the following is NOT a valid application of topological sorting?",
      options: [
        "Determining the order to take courses based on prerequisites",
        "Finding the shortest path between two vertices in a weighted graph",
        "Scheduling tasks with dependencies",
        "Resolving symbol dependencies in a compiler"
      ],
      correctAnswer: 1,
      explanation: "Finding the shortest path between two vertices in a weighted graph is not a direct application of topological sorting. While topological sorting can be used as part of algorithms for the single-source shortest path problem in DAGs, it doesn't solve the general shortest path problem. Algorithms like Dijkstra's or Bellman-Ford are typically used for shortest path problems."
    },
    {
      id: "topo-sort-q5",
      question: "In a DFS-based topological sort, when is a vertex added to the result ordering?",
      options: [
        "When the vertex is first visited",
        "After all its adjacent vertices have been visited",
        "Before exploring any of its adjacent vertices",
        "When the vertex has the lowest in-degree"
      ],
      correctAnswer: 1,
      explanation: "In a DFS-based topological sort, a vertex is added to the result ordering (typically by pushing it onto a stack) after all its adjacent vertices (descendants) have been visited and processed. This ensures that all dependencies of a vertex appear later in the final ordering when the stack is popped."
    }
  ]
};

export default topologicalSortContent; 