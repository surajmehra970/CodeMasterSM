import { Content } from '@/types/course';

const binarySearchOnAnswerContent: Content = {
  introduction: "Binary Search on Answer is a powerful problem-solving technique where we apply the binary search algorithm not on the input array itself, but on the possible range of answers. This approach is particularly useful for optimization problems where we need to find the maximum or minimum value that satisfies certain conditions. The key insight is to convert the problem into a decision problem: 'Can we achieve a result of at least/at most X?' By binary searching on the answer space, we can efficiently find the optimal solution.",
  
  learningObjectives: [
    "Understand the concept of binary search on answer and when to apply it",
    "Learn how to transform optimization problems into decision problems",
    "Apply binary search on answer to solve common algorithmic challenges",
    "Analyze the time and space complexity of binary search on answer solutions"
  ],
  
  sections: [
    {
      title: "Understanding Binary Search on Answer",
      content: "Binary Search on Answer is a technique where we don't directly search for a value in an array, but instead search through a range of possible answers. For this technique to work, we need to be able to verify if a particular solution is valid, and there should be a clear monotonicity in the solution space (e.g., if X is a valid solution, then all values less than X are also valid for a minimization problem).",
      codeExamples: [
        {
          language: "java",
          code: `// General template for Binary Search on Answer
public int binarySearchOnAnswer(int[] array) {
    // Define the search space
    int left = /* minimum possible answer */;
    int right = /* maximum possible answer */;
    
    int result = -1; // Default value if no valid answer is found
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (isValidSolution(mid, array)) {
            // If mid is a valid solution, update result and search for a better solution
            result = mid;
            
            // For a minimization problem:
            right = mid - 1;
            
            // For a maximization problem:
            // left = mid + 1;
        } else {
            // If mid is not a valid solution, adjust the search space
            
            // For a minimization problem:
            left = mid + 1;
            
            // For a maximization problem:
            // right = mid - 1;
        }
    }
    
    return result;
}

private boolean isValidSolution(int potentialSolution, int[] array) {
    // Implement logic to check if potentialSolution is valid
    // Return true if valid, false otherwise
    
    // This is problem-specific and is the key part of the algorithm
    // For each problem, you need to define what makes a solution valid
    
    return true; // placeholder
}`,
          explanation: "This template illustrates the general structure of a binary search on answer solution. We define a range of possible answers and search within it. The key is implementing the 'isValidSolution' function, which checks if a potential solution satisfies the problem requirements. For minimization problems, when we find a valid solution, we try to find a smaller valid solution; for maximization problems, we try to find a larger valid solution."
        }
      ]
    },
    {
      title: "Example: Split Array Largest Sum",
      content: "The 'Split Array Largest Sum' problem asks us to split an array into m non-empty continuous subarrays such that the largest sum of any subarray is minimized. This is a classic example where binary search on answer can be applied effectively.",
      codeExamples: [
        {
          language: "java",
          code: `public class SplitArrayLargestSum {
    public int splitArray(int[] nums, int m) {
        // Define the search space
        // Lower bound: max element in the array (at minimum, each element must be in a subarray)
        // Upper bound: sum of all elements (all elements in a single subarray)
        int left = 0;
        int right = 0;
        
        for (int num : nums) {
            left = Math.max(left, num); // Maximum element
            right += num; // Sum of all elements
        }
        
        // Binary search on the answer
        int result = right; // Start with the maximum possible sum
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Potential largest subarray sum
            
            if (canSplit(nums, m, mid)) {
                // If we can split the array with a maximum subarray sum of mid,
                // try to find a smaller valid sum
                result = mid;
                right = mid - 1;
            } else {
                // If we can't split with a maximum subarray sum of mid,
                // we need a larger sum
                left = mid + 1;
            }
        }
        
        return result;
    }
    
    // Check if we can split the array into m or fewer subarrays
    // such that the largest subarray sum is at most maxSum
    private boolean canSplit(int[] nums, int m, int maxSum) {
        int subarrayCount = 1;
        int currentSum = 0;
        
        for (int num : nums) {
            // If adding the current element would exceed maxSum,
            // start a new subarray
            if (currentSum + num > maxSum) {
                subarrayCount++;
                currentSum = num;
                
                // If we need more than m subarrays, this maxSum is too small
                if (subarrayCount > m) {
                    return false;
                }
            } else {
                currentSum += num;
            }
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        SplitArrayLargestSum solution = new SplitArrayLargestSum();
        
        int[] nums = {7, 2, 5, 10, 8};
        int m = 2;
        
        System.out.println(solution.splitArray(nums, m)); // Output: 18
    }
}`,
          explanation: "In this example, we're trying to minimize the largest subarray sum. We use binary search to find this minimum. The 'canSplit' function checks if we can split the array into at most m subarrays such that no subarray has a sum greater than the given maximum sum. If we can, we try to find a smaller valid maximum sum; otherwise, we increase the maximum sum. The time complexity is O(n * log(sum)), where n is the size of the array and sum is the sum of all elements."
        }
      ]
    },
    {
      title: "Example: Koko Eating Bananas",
      content: "In the 'Koko Eating Bananas' problem, Koko can eat K bananas per hour and wants to finish all piles within H hours. We need to find the minimum value of K that allows Koko to finish eating all bananas within H hours.",
      codeExamples: [
        {
          language: "java",
          code: `public class KokoEatingBananas {
    public int minEatingSpeed(int[] piles, int h) {
        // Define the search space
        // Lower bound: 1 (eat at least 1 banana per hour)
        // Upper bound: maximum number of bananas in any pile
        int left = 1;
        int right = 0;
        
        for (int pile : piles) {
            right = Math.max(right, pile);
        }
        
        // Binary search on the eating speed
        int result = right; // Start with the maximum possible speed
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Potential eating speed
            
            if (canFinish(piles, h, mid)) {
                // If Koko can finish with this speed, try a slower speed
                result = mid;
                right = mid - 1;
            } else {
                // If Koko can't finish with this speed, try a faster speed
                left = mid + 1;
            }
        }
        
        return result;
    }
    
    // Check if Koko can finish all piles in h hours with a speed of k
    private boolean canFinish(int[] piles, int h, int k) {
        int hoursNeeded = 0;
        
        for (int pile : piles) {
            // Math.ceil(pile / (double) k) gives the hours needed for this pile
            // We can also use (pile - 1) / k + 1 to avoid floating-point arithmetic
            hoursNeeded += (pile - 1) / k + 1;
            
            if (hoursNeeded > h) {
                return false;
            }
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        KokoEatingBananas solution = new KokoEatingBananas();
        
        int[] piles = {3, 6, 7, 11};
        int h = 8;
        
        System.out.println(solution.minEatingSpeed(piles, h)); // Output: 4
    }
}`,
          explanation: "In this problem, we use binary search to find the minimum eating speed K that allows Koko to finish all bananas within H hours. The 'canFinish' function checks if Koko can finish all piles with a given eating speed. If she can, we try a slower speed; otherwise, we try a faster speed. The time complexity is O(n * log(max_pile)), where n is the number of piles and max_pile is the maximum number of bananas in any pile."
        }
      ]
    },
    {
      title: "Example: Capacity To Ship Packages Within D Days",
      content: "In this problem, we need to find the minimum capacity of a ship that can ship all packages within D days, given the weights of the packages. Packages must be shipped in order, and a package can't be split across ships.",
      codeExamples: [
        {
          language: "java",
          code: `public class ShipWithinDays {
    public int shipWithinDays(int[] weights, int days) {
        // Define the search space
        // Lower bound: maximum weight of any package (can't split packages)
        // Upper bound: sum of all weights (ship all packages in one day)
        int left = 0;
        int right = 0;
        
        for (int weight : weights) {
            left = Math.max(left, weight);
            right += weight;
        }
        
        // Binary search on the ship capacity
        int result = right; // Start with the maximum possible capacity
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Potential ship capacity
            
            if (canShipWithinDays(weights, days, mid)) {
                // If we can ship with this capacity, try a smaller capacity
                result = mid;
                right = mid - 1;
            } else {
                // If we can't ship with this capacity, try a larger capacity
                left = mid + 1;
            }
        }
        
        return result;
    }
    
    // Check if we can ship all packages within 'days' days with a capacity of 'capacity'
    private boolean canShipWithinDays(int[] weights, int days, int capacity) {
        int daysNeeded = 1;
        int currentWeight = 0;
        
        for (int weight : weights) {
            // If adding the current package would exceed capacity,
            // start a new day
            if (currentWeight + weight > capacity) {
                daysNeeded++;
                currentWeight = weight;
                
                // If we need more than the allowed days, this capacity is too small
                if (daysNeeded > days) {
                    return false;
                }
            } else {
                currentWeight += weight;
            }
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        ShipWithinDays solution = new ShipWithinDays();
        
        int[] weights = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int days = 5;
        
        System.out.println(solution.shipWithinDays(weights, days)); // Output: 15
    }
}`,
          explanation: "In this problem, we use binary search to find the minimum ship capacity that allows us to ship all packages within D days. The 'canShipWithinDays' function checks if we can ship all packages with a given capacity. If we can, we try a smaller capacity; otherwise, we try a larger capacity. The time complexity is O(n * log(sum)), where n is the number of packages and sum is the sum of all weights."
        }
      ]
    },
    {
      title: "When to Use Binary Search on Answer",
      content: "Binary Search on Answer is particularly useful for optimization problems with a monotonic answer space. Here are some indicators that a problem might be solvable using this technique:",
      codeExamples: [
        {
          language: "java",
          code: `/*
Characteristics of problems suitable for Binary Search on Answer:

1. The problem asks for a maximum or minimum value that satisfies certain conditions.
   Examples: "Find the minimum capacity...", "Find the maximum value such that..."

2. You can determine if a value is valid by checking some condition.
   This is the basis for the 'isValidSolution' function.

3. There's monotonicity in the solution space:
   - For minimization: If X is valid, all values > X are also valid.
   - For maximization: If X is valid, all values < X are also valid.

4. The range of possible answers is large but can be bounded.
   - Usually within the range of integers or can be determined from the problem.

Examples of problem types:
- Minimizing the maximum value (like Split Array Largest Sum)
- Maximizing the minimum value (like Max Distance to Closest Person)
- Finding the kth element that satisfies some property
- Determining the minimum resources needed to complete a task within constraints
*/`,
          explanation: "This code comment outlines the key characteristics of problems that can be effectively solved using Binary Search on Answer. The technique is particularly powerful for optimization problems where a direct solution would be inefficient, but we can efficiently check if a potential solution is valid."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "bs-answer-hw-1",
      question: "Magnetic Force Between Two Balls: In a universe of n positions on a line, we place m balls such that the minimum magnetic force between any two balls is maximized. The magnetic force between two balls at positions x and y is |x - y|. Given the positions of n possible placement points and the number of balls m, find the maximum possible minimum magnetic force.",
      solution: "```java\nimport java.util.Arrays;\n\npublic int maxDistance(int[] positions, int m) {\n    // Sort the positions\n    Arrays.sort(positions);\n    \n    // Define the search space\n    // Lower bound: 1 (minimum distance possible)\n    // Upper bound: maximum distance possible (rightmost - leftmost position)\n    int left = 1;\n    int right = positions[positions.length - 1] - positions[0];\n    \n    int result = 0;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2; // Potential minimum distance\n        \n        if (canPlaceBalls(positions, m, mid)) {\n            // If we can place m balls with a minimum distance of mid,\n            // try to increase the minimum distance\n            result = mid;\n            left = mid + 1;\n        } else {\n            // If we can't place m balls with a minimum distance of mid,\n            // try a smaller minimum distance\n            right = mid - 1;\n        }\n    }\n    \n    return result;\n}\n\n// Check if we can place m balls with a minimum distance of minDist\nprivate boolean canPlaceBalls(int[] positions, int m, int minDist) {\n    // Place the first ball at the leftmost position\n    int count = 1;\n    int prev = positions[0];\n    \n    // Try to place the rest of the balls\n    for (int i = 1; i < positions.length; i++) {\n        if (positions[i] - prev >= minDist) {\n            // If the current position is at least minDist away from the previous ball,\n            // place a ball here\n            count++;\n            prev = positions[i];\n            \n            if (count >= m) {\n                // If we've placed all m balls, we're done\n                return true;\n            }\n        }\n    }\n    \n    return false;\n}\n```\nThis solution uses binary search to find the maximum possible minimum distance between balls. We define a search space and check if it's possible to place m balls such that no two balls are closer than a given minimum distance. If we can, we try to increase this minimum distance; otherwise, we decrease it. The time complexity is O(n * log(range)), where range is the difference between the rightmost and leftmost positions."
    },
    {
      id: "bs-answer-hw-2",
      question: "Minimum Time to Complete All Tasks: You have n tasks, and you need to complete all of them within a given time frame. Each task takes time[i] to complete, but you can reduce the time by up to reduce[i]. The catch is, the time you reduce for one task can't be more than half the original time. What's the minimum time needed to complete all tasks?",
      solution: "```java\npublic int minTimeToFinish(int[] time, int[] reduce) {\n    // Define the search space\n    // Lower bound: minimum possible completion time (all tasks reduced to their maximum)\n    // Upper bound: maximum possible completion time (no reduction)\n    int left = 0;\n    int right = 0;\n    \n    for (int t : time) {\n        left = Math.max(left, t / 2); // At least half of the maximum task time\n        right = Math.max(right, t);  // Maximum task time\n    }\n    \n    int result = right; // Start with the maximum possible time\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2; // Potential completion time\n        \n        if (canCompleteInTime(time, reduce, mid)) {\n            // If we can complete all tasks in 'mid' time, try less time\n            result = mid;\n            right = mid - 1;\n        } else {\n            // If we can't complete all tasks in 'mid' time, try more time\n            left = mid + 1;\n        }\n    }\n    \n    return result;\n}\n\n// Check if we can complete all tasks in 'totalTime'\nprivate boolean canCompleteInTime(int[] time, int[] reduce, int totalTime) {\n    int n = time.length;\n    int[] reducedTime = new int[n];\n    \n    // Calculate the reduced time for each task\n    for (int i = 0; i < n; i++) {\n        reducedTime[i] = Math.max(time[i] - reduce[i], time[i] / 2); // Can't reduce more than half\n    }\n    \n    // Check if we can complete all tasks in 'totalTime'\n    for (int i = 0; i < n; i++) {\n        if (reducedTime[i] > totalTime) {\n            return false; // Can't complete this task in time\n        }\n    }\n    \n    return true;\n}\n```\nThis solution uses binary search to find the minimum time needed to complete all tasks. We define a search space and check if it's possible to complete all tasks within a given time. If we can, we try to reduce this time; otherwise, we increase it. The time complexity is O(n * log(max_time)), where max_time is the maximum time among all tasks."
    }
  ],
  
  quiz: [
    {
      id: "bs-answer-quiz-1",
      question: "What is the key characteristic that makes a problem suitable for the Binary Search on Answer technique?",
      options: [
        "The input is already sorted",
        "The answer space has monotonicity (if X is valid, then all values greater or less than X are also valid)",
        "The problem requires finding an exact value in a dataset",
        "The problem can only be solved using binary search"
      ],
      correctAnswer: 1,
      explanation: "The key characteristic that makes a problem suitable for Binary Search on Answer is monotonicity in the answer space. This means that for a minimization problem, if X is a valid solution, then all values greater than X are also valid. For a maximization problem, if X is a valid solution, then all values less than X are also valid. This property allows us to efficiently eliminate half of the remaining search space in each step."
    },
    {
      id: "bs-answer-quiz-2",
      question: "In the context of Binary Search on Answer, what does the isValidSolution() function typically do?",
      options: [
        "It returns the final solution to the problem",
        "It checks if a particular value is a valid solution to the problem",
        "It sorts the input data",
        "It calculates the midpoint of the search range"
      ],
      correctAnswer: 1,
      explanation: "The isValidSolution() function typically checks if a particular value is a valid solution to the problem. This function is the core of the Binary Search on Answer technique and is used to decide whether to search for a better solution in the lower or upper half of the current search range. Implementing this function correctly is crucial for the success of the algorithm."
    },
    {
      id: "bs-answer-quiz-3",
      question: "What is the time complexity of a typical Binary Search on Answer solution, where the range of possible answers is R and the time to check if a solution is valid is O(n)?",
      options: [
        "O(n)",
        "O(log R)",
        "O(n * log R)",
        "O(n * R)"
      ],
      correctAnswer: 2,
      explanation: "The time complexity is typically O(n * log R), where n is the time to check if a solution is valid, and log R is the number of iterations in the binary search. In each iteration, we check if a potential solution is valid, which takes O(n) time. Since binary search reduces the search space by half in each iteration, we need log R iterations, resulting in a total time complexity of O(n * log R)."
    },
    {
      id: "bs-answer-quiz-4",
      question: "Which of the following problems is LEAST suitable for Binary Search on Answer?",
      options: [
        "Finding the minimum capacity to ship packages within D days",
        "Finding the minimum eating speed to finish all bananas within H hours",
        "Finding the median of two sorted arrays",
        "Finding the maximum minimum distance to place k elements"
      ],
      correctAnswer: 2,
      explanation: "Finding the median of two sorted arrays is the least suitable for Binary Search on Answer because it doesn't involve optimizing a value subject to a constraint with monotonicity. While binary search can be used to solve this problem, it's not a traditional 'binary search on answer' problem. The other options all involve finding the maximum or minimum value that satisfies certain conditions, which is the hallmark of problems suitable for Binary Search on Answer."
    }
  ]
};

export default binarySearchOnAnswerContent; 