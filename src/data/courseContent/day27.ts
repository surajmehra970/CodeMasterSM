import { Content } from '@/types/course';

const bfsContent: Content = {
  introduction: "Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores all vertices of a graph at the present depth before moving on to vertices at the next depth level. BFS is particularly useful for finding the shortest path on unweighted graphs, level-order traversals, and solving puzzles with the fewest possible moves.",
  
  learningObjectives: [
    "Understand the core principles of Breadth-First Search",
    "Implement BFS for both directed and undirected graphs",
    "Apply BFS to find shortest paths in unweighted graphs",
    "Solve common graph problems using BFS",
    "Analyze the time and space complexity of BFS implementations"
  ],
  
  sections: [
    {
      title: "BFS Fundamentals",
      content: "Breadth-First Search explores a graph layer by layer. Starting from a source vertex, BFS visits all its neighbors before moving to the next level. This property makes BFS perfect for finding shortest paths in unweighted graphs. BFS uses a queue data structure to keep track of vertices to visit next, ensuring the 'first in, first out' order of exploration.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic BFS implementation for an unweighted graph
public void bfs(List<List<Integer>> graph, int startVertex) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // Create a queue for BFS
    Queue<Integer> queue = new LinkedList<>();
    
    // Mark the current node as visited and enqueue it
    visited[startVertex] = true;
    queue.add(startVertex);
    
    System.out.println("BFS traversal starting from vertex " + startVertex + ":");
    
    while (!queue.isEmpty()) {
        // Dequeue a vertex from queue and print it
        int currentVertex = queue.poll();
        System.out.print(currentVertex + " ");
        
        // Get all adjacent vertices of the dequeued vertex
        // If an adjacent vertex has not been visited, mark it as visited and enqueue it
        for (int adjacentVertex : graph.get(currentVertex)) {
            if (!visited[adjacentVertex]) {
                visited[adjacentVertex] = true;
                queue.add(adjacentVertex);
            }
        }
    }
}`,
          explanation: "This implementation demonstrates a basic BFS traversal of a graph. It uses a boolean array to track visited vertices and a queue to process vertices in a FIFO order. The algorithm iteratively dequeues vertices, processes them, and enqueues their unvisited neighbors."
        }
      ]
    },
    {
      title: "Finding Shortest Paths with BFS",
      content: "One of the most important applications of BFS is finding the shortest path between two vertices in an unweighted graph. Since BFS explores vertices level by level, the first time we reach a vertex is guaranteed to be via the shortest path from the source.",
      codeExamples: [
        {
          language: "java",
          code: `// BFS to find shortest path in an unweighted graph
public void shortestPathBFS(List<List<Integer>> graph, int source, int destination) {
    int vertices = graph.size();
    
    // Mark all vertices as not visited
    boolean[] visited = new boolean[vertices];
    
    // Store distances of all vertices from source
    int[] distance = new int[vertices];
    
    // Store path (previous vertex in path)
    int[] predecessor = new int[vertices];
    
    // Initialize all distances as infinite and all predecessors as -1
    for (int i = 0; i < vertices; i++) {
        distance[i] = Integer.MAX_VALUE;
        predecessor[i] = -1;
    }
    
    // Distance of source vertex from itself is 0
    distance[source] = 0;
    visited[source] = true;
    
    // Create a queue for BFS
    Queue<Integer> queue = new LinkedList<>();
    queue.add(source);
    
    while (!queue.isEmpty()) {
        int currentVertex = queue.poll();
        
        // If we've reached the destination, we can stop the BFS
        if (currentVertex == destination) {
            break;
        }
        
        // Process all adjacent vertices
        for (int adjacentVertex : graph.get(currentVertex)) {
            if (!visited[adjacentVertex]) {
                visited[adjacentVertex] = true;
                distance[adjacentVertex] = distance[currentVertex] + 1;
                predecessor[adjacentVertex] = currentVertex;
                queue.add(adjacentVertex);
            }
        }
    }
    
    // Print the shortest path
    if (distance[destination] != Integer.MAX_VALUE) {
        System.out.println("Shortest path length: " + distance[destination]);
        
        // Print path
        List<Integer> path = new ArrayList<>();
        int crawl = destination;
        path.add(crawl);
        
        while (predecessor[crawl] != -1) {
            path.add(predecessor[crawl]);
            crawl = predecessor[crawl];
        }
        
        System.out.print("Path: ");
        for (int i = path.size() - 1; i >= 0; i--) {
            System.out.print(path.get(i) + " ");
        }
    } else {
        System.out.println("There is no path from " + source + " to " + destination);
    }
}`,
          explanation: "This implementation uses BFS to find the shortest path between a source and a destination vertex. It tracks both the distance from the source and the predecessor of each vertex, allowing us to reconstruct the shortest path."
        }
      ]
    },
    {
      title: "BFS in a Grid/Matrix",
      content: "BFS is commonly used to solve problems involving 2D grids, such as maze solving, island counting, or finding the shortest path in a matrix. When applying BFS to a grid, we typically treat each cell as a vertex and define edges between adjacent cells.",
      codeExamples: [
        {
          language: "java",
          code: `// BFS in a 2D grid to find shortest path
public int shortestPathInGrid(int[][] grid, int[] start, int[] end) {
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Directions: up, right, down, left
    int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
    // Queue for BFS
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[]{start[0], start[1], 0}); // {row, col, distance}
    
    // Mark start as visited
    boolean[][] visited = new boolean[rows][cols];
    visited[start[0]][start[1]] = true;
    
    while (!queue.isEmpty()) {
        int[] current = queue.poll();
        int row = current[0];
        int col = current[1];
        int distance = current[2];
        
        // If we've reached the end, return the distance
        if (row == end[0] && col == end[1]) {
            return distance;
        }
        
        // Explore all four directions
        for (int[] dir : directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            // Check if the new position is valid and not visited
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] == 0 && !visited[newRow][newCol]) {
                
                // Mark as visited and enqueue
                visited[newRow][newCol] = true;
                queue.add(new int[]{newRow, newCol, distance + 1});
            }
        }
    }
    
    // No path found
    return -1;
}`,
          explanation: "This implementation applies BFS to find the shortest path in a 2D grid. It represents each cell as a coordinate pair and uses a queue to process cells in order of increasing distance from the start. The grid value 0 represents a passable cell, while any other value represents an obstacle."
        }
      ]
    },
    {
      title: "Multi-source BFS",
      content: "Sometimes, we need to find the shortest distance from multiple sources simultaneously. In such cases, we can initialize the BFS queue with all source vertices and proceed with the standard BFS algorithm. This is often used in problems like finding the distance to the nearest building or computing a distance matrix.",
      codeExamples: [
        {
          language: "java",
          code: `// Multi-source BFS
public int[][] multiSourceBFS(int[][] grid, List<int[]> sources) {
    int rows = grid.length;
    int cols = grid[0].length;
    
    // Directions: up, right, down, left
    int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
    // Distance matrix - initialize with -1 (unreachable)
    int[][] distance = new int[rows][cols];
    for (int i = 0; i < rows; i++) {
        Arrays.fill(distance[i], -1);
    }
    
    // Queue for BFS
    Queue<int[]> queue = new LinkedList<>();
    
    // Initialize with all sources
    for (int[] source : sources) {
        queue.add(new int[]{source[0], source[1]});
        distance[source[0]][source[1]] = 0; // Distance to source is 0
    }
    
    while (!queue.isEmpty()) {
        int[] current = queue.poll();
        int row = current[0];
        int col = current[1];
        
        // Explore all four directions
        for (int[] dir : directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            // Check if the new position is valid and not visited
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] == 0 && distance[newRow][newCol] == -1) {
                
                // Update distance and enqueue
                distance[newRow][newCol] = distance[row][col] + 1;
                queue.add(new int[]{newRow, newCol});
            }
        }
    }
    
    return distance;
}`,
          explanation: "This implementation demonstrates a multi-source BFS, where we initialize the queue with multiple source vertices. The algorithm computes the shortest distance from any source to each reachable vertex in the grid. This is useful for problems like finding the nearest exit or facility."
        }
      ]
    },
    {
      title: "BFS Applications and Optimizations",
      content: "BFS has numerous applications in computer science and real-world problems. It can be used for finding connected components, checking bipartiteness, solving puzzles like sliding puzzles or the 15-puzzle, and in network analysis for finding the shortest communication path. Various optimizations can be applied to standard BFS for specific scenarios.",
      codeExamples: [
        {
          language: "java",
          code: `// BFS to check if a graph is bipartite (can be colored with two colors)
public boolean isBipartite(List<List<Integer>> graph) {
    int vertices = graph.size();
    
    // Color array: 0 = uncolored, 1 = first color, -1 = second color
    int[] colors = new int[vertices];
    
    // Process each connected component
    for (int startVertex = 0; startVertex < vertices; startVertex++) {
        if (colors[startVertex] != 0) {
            continue; // Already processed in a previous component
        }
        
        // Start BFS from this vertex
        Queue<Integer> queue = new LinkedList<>();
        queue.add(startVertex);
        colors[startVertex] = 1; // Assign first color
        
        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();
            
            // Process all adjacent vertices
            for (int adjacentVertex : graph.get(currentVertex)) {
                // If uncolored, assign the opposite color
                if (colors[adjacentVertex] == 0) {
                    colors[adjacentVertex] = -colors[currentVertex];
                    queue.add(adjacentVertex);
                } 
                // If colored with the same color as current, graph is not bipartite
                else if (colors[adjacentVertex] == colors[currentVertex]) {
                    return false;
                }
            }
        }
    }
    
    // If we've successfully colored the graph, it's bipartite
    return true;
}`,
          explanation: "This implementation uses BFS to check if a graph is bipartite, meaning its vertices can be divided into two disjoint sets such that no two vertices within the same set are adjacent. It colors the vertices using two colors and checks if any adjacent vertices have the same color."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "hw-1",
      question: "Implement a BFS algorithm to find all nodes within k distance from a given node in an undirected graph.",
      solution: "Initialize a queue with the starting node and a distance of 0. While processing the queue, keep track of the current distance. When the distance exceeds k, stop adding neighbors to the queue. Return all nodes that were visited with a distance less than or equal to k."
    },
    {
      id: "hw-2",
      question: "Given a 2D grid representing a maze (0 for empty cell, 1 for wall), find the shortest path from the top-left corner to the bottom-right corner, considering that you can only move in four directions (up, down, left, right).",
      solution: "Use BFS starting from the top-left cell. For each cell, try to move in all four directions if the move is valid (within bounds and not a wall). Keep track of the distance and previous cell to reconstruct the path once the destination is reached."
    },
    {
      id: "hw-3",
      question: "You are given an m x n binary matrix grid where each cell is either 0 (land) or 1 (water). An island is a group of 1's connected 4-directionally (horizontal or vertical). Count the number of islands in the grid.",
      solution: "Iterate through each cell of the grid. When you find a land cell (0), use BFS to visit all connected land cells and mark them as visited. Each time you start a new BFS, increment the island count."
    },
    {
      id: "hw-4",
      question: "Given a directed graph, determine if there is a path from vertex A to vertex B.",
      solution: "Run BFS starting from vertex A. If during the traversal you visit vertex B, then there is a path; otherwise, there is no path."
    }
  ],
  
  quiz: [
    {
      id: "quiz-1",
      question: "What data structure is primarily used in BFS implementation?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "BFS uses a Queue to maintain the first-in, first-out (FIFO) order of processing vertices, which ensures that vertices are explored level by level."
    },
    {
      id: "quiz-2",
      question: "Which of the following problems can be efficiently solved using BFS?",
      options: ["Finding the shortest path in a weighted graph", "Finding the shortest path in an unweighted graph", "Finding all paths between two vertices", "Finding the longest path in a graph"],
      correctAnswer: 1,
      explanation: "BFS is ideal for finding the shortest path in an unweighted graph because it explores vertices in order of their distance from the source."
    },
    {
      id: "quiz-3",
      question: "What is the time complexity of BFS on a graph with V vertices and E edges?",
      options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"],
      correctAnswer: 2,
      explanation: "The time complexity of BFS is O(V+E) because in the worst case, we need to visit all vertices and traverse all edges."
    },
    {
      id: "quiz-4",
      question: "How does BFS differ from DFS in terms of exploration strategy?",
      options: ["BFS explores vertices in a random order", "BFS explores all vertices at the current depth before moving to vertices at the next depth", "BFS explores as far as possible along each branch before backtracking", "BFS and DFS are identical in their exploration strategy"],
      correctAnswer: 1,
      explanation: "BFS explores all vertices at the current depth level before moving to vertices at the next depth level, while DFS explores as far as possible along each branch before backtracking."
    }
  ]
};

export default bfsContent; 