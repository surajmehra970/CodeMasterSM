import { Content } from '@/types/course';

const monotonicStackContent: Content = {
  introduction: "A monotonic stack is a specialized stack data structure that maintains elements in either strictly increasing or strictly decreasing order. Unlike regular stacks, which only maintain the LIFO (Last-In-First-Out) property, monotonic stacks enforce an additional ordering constraint. Monotonic stacks are particularly useful for solving problems that involve finding the next greater/smaller element, calculating spans, or handling histogram-related challenges. They enable efficient solutions with O(n) time complexity for problems that might otherwise require O(n²) approaches.",
  
  learningObjectives: [
    "Understand the concept and properties of monotonic stacks",
    "Recognize problems where monotonic stacks provide optimal solutions",
    "Implement monotonic increasing and decreasing stacks",
    "Apply monotonic stacks to solve next greater/smaller element problems"
  ],
  
  sections: [
    {
      title: "Understanding Monotonic Stacks",
      content: "A monotonic stack is a stack that maintains elements in a specific order - either monotonically increasing or monotonically decreasing. When adding a new element to the stack, we first remove elements that would violate the monotonic property. This means that for a monotonically increasing stack, we pop elements that are greater than the new element, and for a monotonically decreasing stack, we pop elements that are smaller than the new element.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Deque;
import java.util.ArrayDeque;

public class MonotonicStack {
    // Implementation of a monotonically increasing stack
    public static void demonstrateMonotonicIncreasingStack(int[] arr) {
        Deque<Integer> stack = new ArrayDeque<>();
        System.out.println("Processing array for monotonically increasing stack:");
        
        for (int i = 0; i < arr.length; i++) {
            // Pop elements from stack while they are greater than or equal to current element
            while (!stack.isEmpty() && stack.peek() >= arr[i]) {
                stack.pop();
            }
            
            // Push current element to stack
            stack.push(arr[i]);
            
            System.out.println("After processing " + arr[i] + ", stack: " + stack);
        }
    }
    
    // Implementation of a monotonically decreasing stack
    public static void demonstrateMonotonicDecreasingStack(int[] arr) {
        Deque<Integer> stack = new ArrayDeque<>();
        System.out.println("Processing array for monotonically decreasing stack:");
        
        for (int i = 0; i < arr.length; i++) {
            // Pop elements from stack while they are less than or equal to current element
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            
            // Push current element to stack
            stack.push(arr[i]);
            
            System.out.println("After processing " + arr[i] + ", stack: " + stack);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 2, 4};
        
        demonstrateMonotonicIncreasingStack(arr.clone());
        System.out.println();
        demonstrateMonotonicDecreasingStack(arr.clone());
    }
}`,
          explanation: "This example demonstrates how monotonic stacks work by processing an array and maintaining both monotonically increasing and decreasing stacks. For the increasing stack, we pop elements that are greater than or equal to the current element before pushing it. For the decreasing stack, we pop elements that are less than or equal to the current element."
        }
      ]
    },
    {
      title: "Next Greater Element Problem",
      content: "One of the classic applications of monotonic stacks is the 'Next Greater Element' problem. Given an array, for each element, we want to find the next element that is greater than it. If there is no greater element, we use a value like -1. This problem can be efficiently solved with a monotonic decreasing stack.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Arrays;
import java.util.Deque;
import java.util.ArrayDeque;

public class NextGreaterElement {
    public static int[] findNextGreaterElements(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Arrays.fill(result, -1); // Default value if no greater element exists
        
        // Using a monotonic decreasing stack (storing indices)
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // While stack is not empty and current element is greater than element at top of stack
            while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {
                int idx = stack.pop(); // Pop the index
                result[idx] = arr[i];  // Current element is the next greater element
            }
            
            stack.push(i); // Push current index to stack
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 10, 8};
        int[] nextGreater = findNextGreaterElements(arr);
        
        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Next greater elements: " + Arrays.toString(nextGreater));
        // Output: Next greater elements: [5, 10, 10, -1, -1]
    }
}`,
          explanation: "This example solves the Next Greater Element problem. We use a monotonic stack to efficiently find the next greater element for each element in the array. The key insight is that when we encounter a larger element, it is the next greater element for all smaller elements in the stack that precede it."
        }
      ]
    },
    {
      title: "Largest Rectangle in Histogram",
      content: "Another classic problem that can be efficiently solved using monotonic stacks is finding the largest rectangle in a histogram. This problem asks for the area of the largest rectangle that can be formed from adjacent bars in a histogram. A monotonic increasing stack helps us efficiently calculate the largest possible rectangle.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Deque;
import java.util.ArrayDeque;

public class LargestRectangleInHistogram {
    public static int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int maxArea = 0;
        Deque<Integer> stack = new ArrayDeque<>(); // Stack to store indices
        
        for (int i = 0; i <= n; i++) {
            // Current height (use 0 for the end boundary case)
            int currentHeight = (i == n) ? 0 : heights[i];
            
            // While stack is not empty and current height is less than height at top of stack
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                
                // Width is calculated based on current position and previous stack element
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                
                // Calculate area and update maxArea
                int area = height * width;
                maxArea = Math.max(maxArea, area);
            }
            
            // Push current index to stack
            stack.push(i);
        }
        
        return maxArea;
    }
    
    public static void main(String[] args) {
        int[] heights = {2, 1, 5, 6, 2, 3};
        int largestArea = largestRectangleArea(heights);
        
        System.out.println("Heights: " + java.util.Arrays.toString(heights));
        System.out.println("Largest rectangle area: " + largestArea);
        // Output: Largest rectangle area: 10 (from the rectangle with heights [5, 6])
    }
}`,
          explanation: "This example solves the Largest Rectangle in Histogram problem using a monotonic stack. By maintaining a monotonic increasing stack of indices, we can efficiently calculate the width of rectangles that can be formed with each bar as the height. When we encounter a smaller bar, we calculate areas for all taller bars in the stack."
        }
      ]
    },
    {
      title: "Stock Span Problem",
      content: "The Stock Span Problem is another classic use case for monotonic stacks. Given a series of daily stock prices, the span of the stock's price on a specific day is defined as the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price on that day. A monotonic decreasing stack of indices helps solve this efficiently.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Arrays;
import java.util.Deque;
import java.util.ArrayDeque;

public class StockSpan {
    public static int[] calculateSpan(int[] prices) {
        int n = prices.length;
        int[] spans = new int[n];
        
        // Using a monotonic decreasing stack (storing indices)
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // Pop elements while current price is greater than or equal to price at top of stack
            while (!stack.isEmpty() && prices[i] >= prices[stack.peek()]) {
                stack.pop();
            }
            
            // If stack is empty, span is i+1, otherwise i - top_index
            spans[i] = stack.isEmpty() ? (i + 1) : (i - stack.peek());
            
            // Push current index to stack
            stack.push(i);
        }
        
        return spans;
    }
    
    public static void main(String[] args) {
        int[] prices = {100, 80, 60, 70, 60, 75, 85};
        int[] spans = calculateSpan(prices);
        
        System.out.println("Stock prices: " + Arrays.toString(prices));
        System.out.println("Stock spans: " + Arrays.toString(spans));
        // Output: Stock spans: [1, 1, 1, 2, 1, 4, 6]
    }
}`,
          explanation: "This example solves the Stock Span Problem using a monotonic stack. We maintain a stack of indices where the corresponding prices are in decreasing order. For each day's price, we pop off days with smaller or equal prices and calculate the span as the difference between current index and the new top of stack."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "monotonic-stack-hw-1",
      question: "Implement a solution to find the next smaller element for each element in an array. For example, given [4, 8, 2, 1, 6], the next smaller elements would be [2, 2, 1, -1, -1].",
      solution: "```java\nimport java.util.Arrays;\nimport java.util.Deque;\nimport java.util.ArrayDeque;\n\npublic class NextSmallerElement {\n    public static int[] findNextSmallerElements(int[] arr) {\n        int n = arr.length;\n        int[] result = new int[n];\n        Arrays.fill(result, -1); // Default value if no smaller element exists\n        \n        // Using a monotonic increasing stack (storing indices)\n        Deque<Integer> stack = new ArrayDeque<>();\n        \n        for (int i = 0; i < n; i++) {\n            // While stack is not empty and current element is smaller than element at top of stack\n            while (!stack.isEmpty() && arr[i] < arr[stack.peek()]) {\n                int idx = stack.pop(); // Pop the index\n                result[idx] = arr[i];  // Current element is the next smaller element\n            }\n            \n            stack.push(i); // Push current index to stack\n        }\n        \n        return result;\n    }\n    \n    public static void main(String[] args) {\n        int[] arr = {4, 8, 2, 1, 6};\n        int[] nextSmaller = findNextSmallerElements(arr);\n        \n        System.out.println(\"Array: \" + Arrays.toString(arr));\n        System.out.println(\"Next smaller elements: \" + Arrays.toString(nextSmaller));\n        // Output: Next smaller elements: [2, 2, 1, -1, -1]\n    }\n}\n```\nThe time complexity of this solution is O(n) where n is the size of the input array. Each element is pushed onto the stack exactly once and can be popped at most once, resulting in amortized O(1) time per element. The space complexity is O(n) for the stack and result array."
    },
    {
      id: "monotonic-stack-hw-2",
      question: "Given a matrix where each entry represents a height, and each column represents a bar in a histogram, find the area of the largest rectangle containing all 1's. Assume bars in the histogram are 1 unit wide.",
      solution: "```java\nimport java.util.Deque;\nimport java.util.ArrayDeque;\n\npublic class MaximalRectangle {\n    public static int maximalRectangle(int[][] matrix) {\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\n            return 0;\n        }\n        \n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        int[] heights = new int[cols];\n        int maxArea = 0;\n        \n        for (int i = 0; i < rows; i++) {\n            // Update heights array for current row\n            for (int j = 0; j < cols; j++) {\n                if (matrix[i][j] == 1) {\n                    heights[j]++;\n                } else {\n                    heights[j] = 0;\n                }\n            }\n            \n            // Calculate largest rectangle using monotonic stack\n            maxArea = Math.max(maxArea, largestRectangleArea(heights));\n        }\n        \n        return maxArea;\n    }\n    \n    private static int largestRectangleArea(int[] heights) {\n        int n = heights.length;\n        int maxArea = 0;\n        Deque<Integer> stack = new ArrayDeque<>();\n        \n        for (int i = 0; i <= n; i++) {\n            int h = (i == n) ? 0 : heights[i];\n            \n            while (!stack.isEmpty() && h < heights[stack.peek()]) {\n                int height = heights[stack.pop()];\n                int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, height * width);\n            }\n            \n            stack.push(i);\n        }\n        \n        return maxArea;\n    }\n    \n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 0, 1, 0, 0},\n            {1, 0, 1, 1, 1},\n            {1, 1, 1, 1, 1},\n            {1, 0, 0, 1, 0}\n        };\n        \n        int area = maximalRectangle(matrix);\n        System.out.println(\"Maximal rectangle area: \" + area);\n        // Output: Maximal rectangle area: 6\n    }\n}\n```\nThis solution converts the 2D problem into multiple 1D histogram problems, one for each row. We build a heights array representing the number of consecutive 1's above and including the current cell. Then, for each row, we calculate the largest rectangle in the histogram using a monotonic stack. The time complexity is O(rows * cols), and the space complexity is O(cols)."
    }
  ],
  
  quiz: [
    {
      id: "monotonic-stack-quiz-1",
      question: "What is the key property of a monotonic increasing stack?",
      options: [
        "Elements are stored in decreasing order from bottom to top",
        "Elements are stored in increasing order from bottom to top",
        "Elements are inserted in the order they appear in the input",
        "Elements are sorted alphabetically"
      ],
      correctAnswer: 1,
      explanation: "In a monotonic increasing stack, elements are stored in increasing order from bottom to top. This means that when adding a new element, we first remove all larger elements from the top of the stack."
    },
    {
      id: "monotonic-stack-quiz-2",
      question: "What is the time complexity of finding the next greater element for all elements in an array using a monotonic stack?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation: "The time complexity is O(n) because each element is pushed and popped at most once. Although there are nested loops (the while loop inside the for loop), the total number of push and pop operations across all iterations is at most 2n, giving an amortized time complexity of O(n)."
    },
    {
      id: "monotonic-stack-quiz-3",
      question: "Which of the following problems would NOT be efficiently solved using a monotonic stack?",
      options: [
        "Finding the next greater element",
        "Calculating stock spans",
        "Finding the largest rectangle in a histogram",
        "Finding the median of a stream of numbers"
      ],
      correctAnswer: 3,
      explanation: "Finding the median of a stream of numbers is typically solved using heaps (priority queues) rather than monotonic stacks. The other problems (next greater element, stock spans, and largest rectangle in histogram) are classic applications where monotonic stacks provide efficient O(n) solutions."
    },
    {
      id: "monotonic-stack-quiz-4",
      question: "For the 'Next Smaller Element' problem, which type of monotonic stack should be used?",
      options: [
        "Monotonic increasing stack",
        "Monotonic decreasing stack",
        "Either type works equally well",
        "Neither, this problem requires a queue"
      ],
      correctAnswer: 0,
      explanation: "A monotonic increasing stack is appropriate for the 'Next Smaller Element' problem. We pop elements when the current element is smaller, maintaining an increasing order in the stack. This allows us to efficiently find the next smaller element for each element in the array."
    }
  ]
};

export default monotonicStackContent; 