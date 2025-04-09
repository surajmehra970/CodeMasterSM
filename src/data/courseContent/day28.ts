import { Content } from '@/types/course';

const dfsContent: Content = {
  introduction: "Depth-First Search (DFS) is a fundamental graph traversal algorithm that explores as far as possible along each branch before backtracking. Unlike BFS which explores breadth-wise, DFS dives deep into a path before exploring alternatives. DFS is particularly useful for detecting cycles, finding paths with specific constraints, topological sorting, and solving mazes.",
  
  learningObjectives: [
    "Understand the core principles of Depth-First Search",
    "Implement DFS using both recursive and iterative approaches",
    "Apply DFS to solve common graph problems",
    "Recognize when DFS is more suitable than BFS",
    "Analyze the time and space complexity of DFS implementations"
  ],
  
  sections: [
    {
      title: "DFS Fundamentals",
      content: "Depth-First Search explores a graph by going as deep as possible before backtracking. Starting from a source vertex, DFS visits a neighbor, then a neighbor of that neighbor, and so on until it reaches a dead end. Then it backtracks to explore unexplored paths. This property makes DFS well-suited for problems requiring exhaustive exploration of all possibilities.",
      codeExamples: [
        {
          language: "java",
          code: `// Recursive DFS implementation for an unweighted graph
public void dfsRecursive(List<List<Integer>> graph, int startVertex) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    System.out.println("DFS traversal starting from vertex " + startVertex + ":");
    
    // Call the recursive helper function
    dfsUtil(graph, startVertex, visited);
}

// Recursive utility function for DFS
private void dfsUtil(List<List<Integer>> graph, int vertex, boolean[] visited) {
    // Mark the current node as visited and print it
    visited[vertex] = true;
    System.out.print(vertex + " ");
    
    // Recur for all the adjacent vertices
    for (int adjacentVertex : graph.get(vertex)) {
        if (!visited[adjacentVertex]) {
            dfsUtil(graph, adjacentVertex, visited);
        }
    }
}`,
          explanation: "This implementation demonstrates a recursive DFS traversal of a graph. It uses a boolean array to track visited vertices and a recursive function that explores each unvisited neighbor before returning. The recursion naturally implements the stack-based behavior of DFS."
        }
      ]
    },
    {
      title: "Iterative DFS Implementation",
      content: "While recursive DFS is elegant and intuitive, it can lead to stack overflow for large graphs due to the call stack size limitation. An iterative implementation using an explicit stack data structure overcomes this limitation and is often preferred in practice.",
      codeExamples: [
        {
          language: "java",
          code: `// Iterative DFS implementation using stack
public void dfsIterative(List<List<Integer>> graph, int startVertex) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // Create a stack for DFS
    Stack<Integer> stack = new Stack<>();
    
    // Push the current source node
    stack.push(startVertex);
    
    System.out.println("Iterative DFS traversal starting from vertex " + startVertex + ":");
    
    while (!stack.isEmpty()) {
        // Pop a vertex from stack
        int currentVertex = stack.pop();
        
        // Skip if already visited
        if (visited[currentVertex])
            continue;
        
        // Print the current vertex
        System.out.print(currentVertex + " ");
        
        // Mark the current node as visited
        visited[currentVertex] = true;
        
        // Get all adjacent vertices of the popped vertex
        // If an adjacent vertex has not been visited, push it to the stack
        // Process in reverse order to maintain the same order as recursive version
        List<Integer> neighbors = graph.get(currentVertex);
        for (int i = neighbors.size() - 1; i >= 0; i--) {
            int adjacentVertex = neighbors.get(i);
            if (!visited[adjacentVertex]) {
                stack.push(adjacentVertex);
            }
        }
    }
}`,
          explanation: "This implementation uses an explicit stack to mimic the recursive call stack. It iteratively pops vertices from the stack, processes them, and pushes their unvisited neighbors. Note that neighbors are pushed in reverse order to maintain the same traversal order as the recursive version."
        }
      ]
    },
    {
      title: "Cycle Detection using DFS",
      content: "One of the important applications of DFS is detecting cycles in a graph. A cycle exists in a directed graph if we encounter a vertex that is part of the current recursion stack. For undirected graphs, a cycle exists if we find a vertex that is already visited and is not the parent of the current vertex.",
      codeExamples: [
        {
          language: "java",
          code: `// Detect cycle in a directed graph using DFS
public boolean hasCycleDirected(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited and not part of recursion stack
    boolean[] visited = new boolean[vertices];
    boolean[] recursionStack = new boolean[vertices];
    
    // Check for cycle starting from each vertex
    for (int i = 0; i < vertices; i++) {
        if (hasCycleDirectedUtil(graph, i, visited, recursionStack)) {
            return true;
        }
    }
    
    return false;
}

// Recursive function to detect cycle in directed graph
private boolean hasCycleDirectedUtil(List<List<Integer>> graph, int vertex, 
                                     boolean[] visited, boolean[] recursionStack) {
    // Mark the current node as visited and part of recursion stack
    if (recursionStack[vertex])
        return true;
    
    if (visited[vertex])
        return false;
    
    visited[vertex] = true;
    recursionStack[vertex] = true;
    
    // Recur for all the adjacent vertices
    for (int adjacentVertex : graph.get(vertex)) {
        if (hasCycleDirectedUtil(graph, adjacentVertex, visited, recursionStack)) {
            return true;
        }
    }
    
    // Remove the vertex from recursion stack
    recursionStack[vertex] = false;
    return false;
}

// Detect cycle in an undirected graph using DFS
public boolean hasCycleUndirected(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // Check for cycle starting from each vertex
    for (int i = 0; i < vertices; i++) {
        if (!visited[i]) {
            if (hasCycleUndirectedUtil(graph, i, visited, -1)) {
                return true;
            }
        }
    }
    
    return false;
}

// Recursive function to detect cycle in undirected graph
private boolean hasCycleUndirectedUtil(List<List<Integer>> graph, int vertex, 
                                      boolean[] visited, int parent) {
    // Mark the current node as visited
    visited[vertex] = true;
    
    // Recur for all the adjacent vertices
    for (int adjacentVertex : graph.get(vertex)) {
        // If adjacent vertex is not visited, then recur for that adjacent
        if (!visited[adjacentVertex]) {
            if (hasCycleUndirectedUtil(graph, adjacentVertex, visited, vertex)) {
                return true;
            }
        } 
        // If an adjacent is visited and not parent of current vertex, then there is a cycle
        else if (adjacentVertex != parent) {
            return true;
        }
    }
    return false;
}`,
          explanation: "For directed graphs, we use an additional recursionStack array to track vertices in the current recursion path. If we encounter a vertex that's already in the recursion stack, we've found a cycle. For undirected graphs, we keep track of the parent vertex to avoid detecting false cycles due to the bidirectional nature of edges."
        }
      ]
    },
    {
      title: "Topological Sorting",
      content: "Topological sorting is a linear ordering of the vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. Topological sorting is possible only for DAGs and is commonly used in task scheduling, build dependency resolution, and course prerequisite planning.",
      codeExamples: [
        {
          language: "java",
          code: `// Topological sorting using DFS
public List<Integer> topologicalSort(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // Stack to store result (processed vertices)
    Stack<Integer> stack = new Stack<>();
    
    // Call the recursive helper function to store topological sort
    // starting from all vertices one by one
    for (int i = 0; i < vertices; i++) {
        if (!visited[i]) {
            topologicalSortUtil(graph, i, visited, stack);
        }
    }
    
    // Convert stack to list in reverse order (to maintain correct ordering)
    List<Integer> result = new ArrayList<>();
    while (!stack.isEmpty()) {
        result.add(stack.pop());
    }
    
    return result;
}

// Recursive utility function for topological sort
private void topologicalSortUtil(List<List<Integer>> graph, int vertex, 
                                boolean[] visited, Stack<Integer> stack) {
    // Mark the current node as visited
    visited[vertex] = true;
    
    // Recur for all the adjacent vertices
    for (int adjacentVertex : graph.get(vertex)) {
        if (!visited[adjacentVertex]) {
            topologicalSortUtil(graph, adjacentVertex, visited, stack);
        }
    }
    
    // Push current vertex to stack which stores result
    // (added after all its descendants)
    stack.push(vertex);
}`,
          explanation: "Topological sorting is implemented using DFS. We visit all adjacents of a vertex before adding it to the result stack, ensuring that all dependencies of a vertex are processed before the vertex itself. The final result is obtained by popping elements from the stack, which gives vertices in topological order."
        }
      ]
    },
    {
      title: "DFS in a Grid/Matrix",
      content: "Similar to BFS, DFS can also be applied to 2D grids/matrices. It's particularly useful for problems like maze solving, flood fill, and finding connected components in a grid. The key difference is that DFS explores paths deeply before exploring alternatives.",
      codeExamples: [
        {
          language: "java",
          code: `// DFS in a 2D grid to solve a maze
public boolean solveMaze(int[][] maze, int[] start, int[] end) {
    int rows = maze.length;
    int cols = maze[0].length;
    
    // Matrix to track visited cells
    boolean[][] visited = new boolean[rows][cols];
    
    // Call the recursive helper function
    return solveMazeUtil(maze, start[0], start[1], end[0], end[1], visited);
}

// Recursive function to find a path in the maze
private boolean solveMazeUtil(int[][] maze, int row, int col, 
                             int endRow, int endCol, boolean[][] visited) {
    // Base case: if we've reached the destination
    if (row == endRow && col == endCol) {
        return true;
    }
    
    // Check if the current cell is valid
    if (row < 0 || row >= maze.length || col < 0 || col >= maze[0].length || 
        maze[row][col] == 1 || visited[row][col]) {
        return false;
    }
    
    // Mark the current cell as visited
    visited[row][col] = true;
    
    // Directions: up, right, down, left
    int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
    // Try all four directions
    for (int[] dir : directions) {
        int newRow = row + dir[0];
        int newCol = col + dir[1];
        
        if (solveMazeUtil(maze, newRow, newCol, endRow, endCol, visited)) {
            return true;
        }
    }
    
    // If no direction leads to the destination, backtrack
    visited[row][col] = false;
    return false;
}`,
          explanation: "This implementation uses DFS to find a path in a maze from a start cell to an end cell. It explores one direction deeply before trying alternatives, which is characteristic of DFS. The algorithm backtracks if a path leads to a dead end, marking the cell as unvisited again."
        }
      ]
    },
    {
      title: "DFS Applications and Variations",
      content: "DFS has numerous applications in computer science and real-world problem-solving. It can be used for connected component analysis, articulation point detection, bridge finding in graphs, and solving puzzles like Sudoku or the n-Queens problem. Various variations and optimizations of DFS exist for specific scenarios.",
      codeExamples: [
        {
          language: "java",
          code: `// Finding connected components in an undirected graph using DFS
public List<List<Integer>> findConnectedComponents(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // List to store all connected components
    List<List<Integer>> connectedComponents = new ArrayList<>();
    
    // Find connected components
    for (int i = 0; i < vertices; i++) {
        if (!visited[i]) {
            // New component found
            List<Integer> component = new ArrayList<>();
            
            // Perform DFS to find all vertices in this component
            findComponentDFS(graph, i, visited, component);
            
            // Add the component to the result
            connectedComponents.add(component);
        }
    }
    
    return connectedComponents;
}

// Recursive function to find all vertices in a connected component
private void findComponentDFS(List<List<Integer>> graph, int vertex, 
                             boolean[] visited, List<Integer> component) {
    // Mark the current node as visited and add to component
    visited[vertex] = true;
    component.add(vertex);
    
    // Recur for all the adjacent vertices
    for (int adjacentVertex : graph.get(vertex)) {
        if (!visited[adjacentVertex]) {
            findComponentDFS(graph, adjacentVertex, visited, component);
        }
    }
}

// Finding articulation points in an undirected graph using DFS
public List<Integer> findArticulationPoints(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Discovery time for each vertex
    int[] disc = new int[vertices];
    
    // Earliest visited vertex reachable from subtree rooted with current vertex
    int[] low = new int[vertices];
    
    // Parent of vertex in DFS tree
    int[] parent = new int[vertices];
    
    // Is vertex an articulation point
    boolean[] isArticulation = new boolean[vertices];
    
    // Initialize arrays
    Arrays.fill(disc, -1);
    Arrays.fill(low, -1);
    Arrays.fill(parent, -1);
    
    // Time counter for discovery time
    int[] time = {0};
    
    // Run DFS from each vertex if not already visited
    for (int i = 0; i < vertices; i++) {
        if (disc[i] == -1) {
            articulationPointDFS(graph, i, disc, low, parent, isArticulation, time);
        }
    }
    
    // Collect articulation points
    List<Integer> articulationPoints = new ArrayList<>();
    for (int i = 0; i < vertices; i++) {
        if (isArticulation[i]) {
            articulationPoints.add(i);
        }
    }
    
    return articulationPoints;
}

// Recursive function to find articulation points
private void articulationPointDFS(List<List<Integer>> graph, int u, int[] disc, int[] low, 
                                 int[] parent, boolean[] isArticulation, int[] time) {
    // Count of children in DFS tree
    int children = 0;
    
    // Initialize discovery time and low value
    disc[u] = low[u] = ++time[0];
    
    // Go through all neighbors
    for (int v : graph.get(u)) {
        // If v is not visited yet, make it a child of u in DFS tree
        if (disc[v] == -1) {
            children++;
            parent[v] = u;
            
            articulationPointDFS(graph, v, disc, low, parent, isArticulation, time);
            
            // Check if subtree rooted with v has a connection to
            // one of the ancestors of u
            low[u] = Math.min(low[u], low[v]);
            
            // u is an articulation point in following cases:
            // 1) u is root of DFS tree and has two or more children
            if (parent[u] == -1 && children > 1) {
                isArticulation[u] = true;
            }
            
            // 2) If u is not root and low value of one of its children
            // is more than or equal to discovery value of u
            if (parent[u] != -1 && low[v] >= disc[u]) {
                isArticulation[u] = true;
            }
        }
        // Update low value of u for parent function calls
        else if (v != parent[u]) {
            low[u] = Math.min(low[u], disc[v]);
        }
    }
}`,
          explanation: "The first part demonstrates finding connected components in an undirected graph using DFS. The second part shows a more advanced application: finding articulation points (cut vertices) in a graph, which are vertices that, when removed, increase the number of connected components. This uses a single DFS traversal with additional tracking of discovery times and lowest reachable vertex."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement a DFS algorithm to find all possible paths between two vertices in a directed graph.",
      solution: "Start DFS from the source vertex. For each neighbor, recursively explore all paths. Keep track of the current path during the traversal. When reaching the destination vertex, add the current path to the result list. Use backtracking to explore all possible paths."
    },
    {
      id: "hw-2",
      question: "Given a 2D grid representing a maze, find if there exists any path from the top-left corner to the bottom-right corner using DFS. The maze contains walls (1) and empty cells (0), and you can only move in four directions.",
      solution: "Use DFS starting from the top-left cell. For each valid cell (within bounds and not a wall), recursively explore all four directions. If any direction leads to the bottom-right cell, return true. Use a visited array to avoid cycles."
    },
    {
      id: "hw-3",
      question: "Implement a function to check if a given directed graph is a Directed Acyclic Graph (DAG).",
      solution: "A graph is a DAG if it has no cycles. Use the cycle detection algorithm for directed graphs (using DFS with a recursion stack). If no cycle is found, the graph is a DAG."
    },
    {
      id: "hw-4",
      question: "Given a directed graph representing prerequisites between courses (edge from course A to course B means A is a prerequisite of B), find a valid order to take all courses.",
      solution: "This is a topological sorting problem. Use DFS-based topological sort. If the graph contains a cycle, there is no valid ordering (impossible to satisfy all prerequisites)."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "What data structure is implicitly used in recursive DFS implementation?",
      options: ["Queue", "Stack", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "Recursive DFS implicitly uses the system's call stack to keep track of vertices to explore, effectively implementing a stack-based depth-first exploration."
    },
    {
      id: "quiz-2",
      question: "Which of the following problems is best solved using DFS rather than BFS?",
      options: ["Finding shortest path in unweighted graph", "Level-order traversal of a tree", "Finding all possible paths between two vertices", "Finding the nearest unvisited node"],
      correctAnswer: 2,
      explanation: "DFS is particularly well-suited for finding all possible paths between two vertices because it exhaustively explores each path to its end before backtracking, which is exactly what's needed to enumerate all paths."
    },
    {
      id: "quiz-3",
      question: "What is the time complexity of DFS on a graph with V vertices and E edges?",
      options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"],
      correctAnswer: 2,
      explanation: "The time complexity of DFS is O(V+E) because in the worst case, we need to visit all vertices and traverse all edges exactly once."
    },
    {
      id: "quiz-4",
      question: "Which of the following applications typically uses Depth-First Search?",
      options: ["Finding shortest path in unweighted graph", "Breadth-first traversal", "Topological sorting of a directed acyclic graph", "Multi-source shortest path"],
      correctAnswer: 2,
      explanation: "Topological sorting is typically implemented using DFS because it naturally processes vertices in the required order, where a vertex is processed only after all its dependencies are processed."
    }
  ]
};

export default dfsContent; 