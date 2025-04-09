import { Content } from '@/types/course';

const search2DMatrixContent: Content = {
  introduction: "Searching in a 2D matrix is a common interview problem that extends the concept of binary search to two dimensions. It involves efficiently finding a target value in a matrix with certain ordering properties. The key insight is to exploit the sorted structure of the matrix to reduce the search space, allowing us to achieve better time complexity than a naive linear search. This topic builds upon our knowledge of binary search and demonstrates how to apply search algorithms in multi-dimensional data structures.",
  
  learningObjectives: [
    "Understand different types of ordered 2D matrices and their properties",
    "Apply binary search algorithms in 2D matrices efficiently",
    "Analyze time and space complexity of 2D search algorithms",
    "Identify optimal search strategies based on matrix properties"
  ],
  
  sections: [
    {
      title: "Types of Ordered 2D Matrices",
      content: "There are different types of ordered 2D matrices that we commonly encounter in coding problems. Understanding their properties is crucial for selecting the appropriate search algorithm.",
      codeExamples: [
        {
          language: "java",
          code: `// Type 1: Row-wise and column-wise sorted matrix
/*
  Example:
  [
    [10, 20, 30, 40],
    [15, 25, 35, 45],
    [27, 29, 37, 48],
    [32, 33, 39, 50]
  ]
  
  Properties:
  - Each row is sorted in ascending order from left to right
  - Each column is sorted in ascending order from top to bottom
  - Elements in different rows/columns don't necessarily follow any relationship
*/

// Type 2: Sorted matrix (like a sorted 1D array shaped into 2D)
/*
  Example:
  [
    [1,  3,  5,  7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
  ]
  
  Properties:
  - The entire matrix can be viewed as a sorted 1D array shaped into 2D
  - The last element of a row is smaller than the first element of the next row
  - Every element is greater than the elements before it (in row-major order)
*/`,
          explanation: "Understanding the ordering properties of the matrix is crucial for selecting the right search algorithm. Type 1 matrices are row-wise and column-wise sorted, while Type 2 matrices can be viewed as sorted 1D arrays shaped into 2D form. Different search approaches are optimal for these different matrix types."
        }
      ]
    },
    {
      title: "Search in a Sorted Matrix (Type 2)",
      content: "For a matrix where all elements are sorted as if the entire matrix is a sorted 1D array, we can use a modified binary search that maps 1D indices to 2D coordinates.",
      codeExamples: [
        {
          language: "java",
          code: `public class SearchSortedMatrix {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        // Treat the matrix as a sorted array and perform binary search
        int left = 0;
        int right = rows * cols - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Convert 1D index to 2D coordinates
            int midRow = mid / cols;
            int midCol = mid % cols;
            
            int midValue = matrix[midRow][midCol];
            
            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        SearchSortedMatrix solution = new SearchSortedMatrix();
        int[][] matrix = {
            {1,  3,  5,  7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
        };
        
        System.out.println(solution.searchMatrix(matrix, 3));  // true
        System.out.println(solution.searchMatrix(matrix, 13)); // false
    }
}`,
          explanation: "This algorithm treats the 2D matrix as a sorted 1D array and performs a standard binary search. The key insight is mapping between 1D indices and 2D coordinates using division and modulo operations. The time complexity is O(log(m*n)) where m and n are the dimensions of the matrix, and the space complexity is O(1)."
        }
      ]
    },
    {
      title: "Search in a Row-wise and Column-wise Sorted Matrix (Type 1)",
      content: "For a matrix where each row and each column is sorted, we can use a more efficient search method by starting from the top-right (or bottom-left) corner and eliminating one row or column at each step.",
      codeExamples: [
        {
          language: "java",
          code: `public class SearchRowColSortedMatrix {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        // Start from top-right corner
        int row = 0;
        int col = cols - 1;
        
        while (row < rows && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                // Target is smaller, move left
                col--;
            } else {
                // Target is larger, move down
                row++;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        SearchRowColSortedMatrix solution = new SearchRowColSortedMatrix();
        int[][] matrix = {
            {10, 20, 30, 40},
            {15, 25, 35, 45},
            {27, 29, 37, 48},
            {32, 33, 39, 50}
        };
        
        System.out.println(solution.searchMatrix(matrix, 29));  // true
        System.out.println(solution.searchMatrix(matrix, 26));  // false
    }
}`,
          explanation: "This algorithm leverages the row-wise and column-wise sorted property of the matrix. Starting from the top-right corner, we can eliminate either a row or a column in each step: if the current element is greater than the target, we move left (eliminating a column); if it's smaller, we move down (eliminating a row). The time complexity is O(m + n) where m and n are the dimensions of the matrix, and the space complexity is O(1)."
        }
      ]
    },
    {
      title: "Binary Search in Each Row",
      content: "Another approach for searching in a matrix is to perform binary search on each row. This approach is particularly useful when rows are sorted but there's no specific ordering between rows.",
      codeExamples: [
        {
          language: "java",
          code: `public class SearchEachRow {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        for (int[] row : matrix) {
            if (binarySearch(row, target)) {
                return true;
            }
        }
        
        return false;
    }
    
    private boolean binarySearch(int[] array, int target) {
        int left = 0;
        int right = array.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (array[mid] == target) {
                return true;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        SearchEachRow solution = new SearchEachRow();
        int[][] matrix = {
            {1, 3, 5, 7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
        };
        
        System.out.println(solution.searchMatrix(matrix, 3));  // true
        System.out.println(solution.searchMatrix(matrix, 13)); // false
    }
}`,
          explanation: "This approach performs binary search on each row of the matrix. While it doesn't fully exploit the 2D structure of the matrix, it's simple to implement and effective when only rows are sorted. The time complexity is O(m * log(n)) where m is the number of rows and n is the number of columns, and the space complexity is O(1)."
        }
      ]
    },
    {
      title: "Finding Row Range Before Binary Search",
      content: "When the first element of each row maintains some ordering (e.g., the first element of each row is greater than the last element of the previous row), we can first identify which row might contain the target before performing binary search on that row.",
      codeExamples: [
        {
          language: "java",
          code: `public class SearchWithRowIdentification {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        // First identify which row might contain the target
        int row = 0;
        while (row < rows && matrix[row][0] <= target) {
            if (matrix[row][0] == target) {
                return true;
            }
            
            // Check if target might be in this row
            if (row < rows - 1 && matrix[row + 1][0] > target) {
                break;
            }
            
            row++;
        }
        
        // If we've gone beyond the last row, target is not in the matrix
        if (row >= rows) {
            return false;
        }
        
        // Now perform binary search on the identified row
        return binarySearch(matrix[row], target);
    }
    
    private boolean binarySearch(int[] array, int target) {
        int left = 0;
        int right = array.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (array[mid] == target) {
                return true;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        SearchWithRowIdentification solution = new SearchWithRowIdentification();
        int[][] matrix = {
            {1, 3, 5, 7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
        };
        
        System.out.println(solution.searchMatrix(matrix, 3));  // true
        System.out.println(solution.searchMatrix(matrix, 13)); // false
    }
}`,
          explanation: "This approach first identifies which row might contain the target by checking the first element of each row, and then performs binary search on the identified row. This is particularly efficient when there's an ordering relationship between rows. The time complexity is O(m + log(n)) where m is the number of rows and n is the number of columns, and the space complexity is O(1)."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "search-2d-hw-1",
      question: "Search a 2D Matrix II: Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties: 1) Integers in each row are sorted in ascending order from left to right. 2) Integers in each column are sorted in ascending order from top to bottom.",
      solution: "```java\npublic boolean searchMatrix(int[][] matrix, int target) {\n    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\n        return false;\n    }\n    \n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    \n    // Start from top-right corner\n    int row = 0;\n    int col = cols - 1;\n    \n    while (row < rows && col >= 0) {\n        if (matrix[row][col] == target) {\n            return true;\n        } else if (matrix[row][col] > target) {\n            // Target is smaller, move left\n            col--;\n        } else {\n            // Target is larger, move down\n            row++;\n        }\n    }\n    \n    return false;\n}\n```\nThis solution uses the approach of starting from the top-right corner of the matrix and moving either left or down based on the comparison with the target. This is efficient for row-wise and column-wise sorted matrices (Type 1). The time complexity is O(m + n) where m and n are the dimensions of the matrix, and the space complexity is O(1)."
    },
    {
      id: "search-2d-hw-2",
      question: "Kth Smallest Element in a Sorted Matrix: Given an n x n matrix where each row and column is sorted in ascending order, find the kth smallest element in the matrix. Note that it's the kth smallest element in the sorted order, not the kth distinct element.",
      solution: "```java\nimport java.util.PriorityQueue;\n\npublic int kthSmallest(int[][] matrix, int k) {\n    int n = matrix.length;\n    \n    // Use a min heap to keep track of the smallest elements\n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);\n    \n    // Add the first element of each row to the min heap\n    // Each element in the heap is [value, row, col]\n    for (int i = 0; i < Math.min(n, k); i++) {\n        minHeap.offer(new int[]{matrix[i][0], i, 0});\n    }\n    \n    // Extract the kth smallest element\n    int count = 0;\n    int result = 0;\n    \n    while (!minHeap.isEmpty() && count < k) {\n        int[] current = minHeap.poll();\n        result = current[0]; // value\n        int row = current[1];\n        int col = current[2];\n        \n        count++;\n        \n        // Add the next element from the same row\n        if (col + 1 < n) {\n            minHeap.offer(new int[]{matrix[row][col + 1], row, col + 1});\n        }\n    }\n    \n    return result;\n}\n```\nThis solution uses a min heap to efficiently track the smallest elements in the matrix. We start by adding the first element of each row to the heap, then repeatedly extract the smallest element and add the next element from the same row. The time complexity is O(k * log(min(n, k))), and the space complexity is O(min(n, k)) for the heap."
    }
  ],
  
  quiz: [
    {
      id: "search-2d-quiz-1",
      question: "What is the time complexity of searching in a sorted matrix (Type 2) using the binary search approach?",
      options: ["O(m + n)", "O(m * n)", "O(log(m * n))", "O(m * log n)"],
      correctAnswer: 2,
      explanation: "The time complexity is O(log(m * n)) because we're treating the m×n matrix as a sorted array of length m*n and performing binary search on it. Since binary search has a logarithmic time complexity, the result is log(m*n)."
    },
    {
      id: "search-2d-quiz-2",
      question: "When searching in a row-wise and column-wise sorted matrix (Type 1), which starting position is NOT optimal?",
      options: ["Top-right corner", "Bottom-left corner", "Top-left corner", "Bottom-right corner"],
      correctAnswer: 2,
      explanation: "Starting from the top-left corner or bottom-right corner is not optimal because we might need to move in two directions (right or down from top-left, left or up from bottom-right). Starting from top-right or bottom-left allows us to make a decision to move in exactly one direction based on the comparison, eliminating one row or column in each step."
    },
    {
      id: "search-2d-quiz-3",
      question: "What is the time complexity of searching in a row-wise and column-wise sorted matrix (Type 1) starting from the top-right corner?",
      options: ["O(log(m * n))", "O(m + n)", "O(m * log n)", "O(m * n)"],
      correctAnswer: 1,
      explanation: "The time complexity is O(m + n) because in the worst case, we might need to traverse m rows and n columns before determining if the target exists. Each step eliminates either one row or one column, so we never examine the same element twice."
    },
    {
      id: "search-2d-quiz-4",
      question: "Which approach would be MOST efficient for searching in a matrix where only rows are sorted, but there's no ordering between rows?",
      options: ["Single binary search treating matrix as 1D array", "Starting from top-right corner", "Binary search on each row", "Linear search"],
      correctAnswer: 2,
      explanation: "Binary search on each row would be most efficient because we can leverage the sorted property of each row. Single binary search won't work because the matrix can't be viewed as a sorted 1D array. The top-right corner approach requires both row-wise and column-wise sorting. Linear search would be inefficient compared to binary search."
    }
  ]
};

export default search2DMatrixContent; 