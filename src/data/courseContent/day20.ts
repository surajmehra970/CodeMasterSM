import { Content } from '@/types/course';

const mockTestWeek3Content: Content = {
  introduction: "Welcome to the Week 3 Mock Test! This test is designed to evaluate your understanding of the concepts covered in the third week of our DSA journey, with a focus on sorting algorithms, binary search, and search techniques for 2D matrices. Through this mock test, you will apply the binary search algorithm and its variations to solve complex problems. This assessment will help you identify areas where you excel and aspects that may require additional practice before advancing to more complex data structures.",
  
  learningObjectives: [
    "Apply merge sort and quick sort techniques to solve complex problems",
    "Utilize binary search and its variations on different data structures",
    "Implement efficient search algorithms for 2D matrices",
    "Analyze and apply binary search on answer to optimization problems",
    "Practice solving problems under time constraints to improve problem-solving speed"
  ],
  
  sections: [
    {
      title: "Problem 1: Merge Sorted Arrays",
      content: "Given two sorted arrays, merge them into a single sorted array without using any built-in sorting functions.",
      codeExamples: [
        {
          language: "java",
          code: `public class MergeSortedArrays {
    public int[] merge(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int[] result = new int[m + n];
        
        int i = 0, j = 0, k = 0;
        
        // Compare elements from both arrays and merge in sorted order
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) {
                result[k++] = nums1[i++];
            } else {
                result[k++] = nums2[j++];
            }
        }
        
        // Copy remaining elements from nums1, if any
        while (i < m) {
            result[k++] = nums1[i++];
        }
        
        // Copy remaining elements from nums2, if any
        while (j < n) {
            result[k++] = nums2[j++];
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        MergeSortedArrays solution = new MergeSortedArrays();
        int[] nums1 = {1, 3, 5, 7};
        int[] nums2 = {2, 4, 6, 8, 10};
        
        int[] result = solution.merge(nums1, nums2);
        
        for (int num : result) {
            System.out.print(num + " ");
        }
        // Output: 1 2 3 4 5 6 7 8 10
    }
}`,
          explanation: "This solution merges two sorted arrays using a two-pointer approach, similar to the merge step in merge sort. The time complexity is O(n + m) where n and m are the lengths of the input arrays, and the space complexity is O(n + m) for the result array. We compare elements from both arrays and add the smaller one to the result array, then advance the pointer for that array. After one array is exhausted, we add the remaining elements from the other array."
        }
      ]
    },
    {
      title: "Problem 2: Find First and Last Position",
      content: "Given a sorted array of integers, find the starting and ending position of a given target value. If the target is not found, return [-1, -1].",
      codeExamples: [
        {
          language: "java",
          code: `public class FindFirstAndLastPosition {
    public int[] searchRange(int[] nums, int target) {
        int[] result = {-1, -1};
        
        if (nums == null || nums.length == 0) {
            return result;
        }
        
        // Find the first occurrence
        result[0] = findFirstOccurrence(nums, target);
        
        // If target is not found, return [-1, -1]
        if (result[0] == -1) {
            return result;
        }
        
        // Find the last occurrence
        result[1] = findLastOccurrence(nums, target);
        
        return result;
    }
    
    private int findFirstOccurrence(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                result = mid;
                // Continue searching in the left half
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    private int findLastOccurrence(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                result = mid;
                // Continue searching in the right half
                left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        FindFirstAndLastPosition solution = new FindFirstAndLastPosition();
        int[] nums = {5, 7, 7, 8, 8, 8, 10};
        int target = 8;
        
        int[] result = solution.searchRange(nums, target);
        System.out.println("[" + result[0] + ", " + result[1] + "]");
        // Output: [3, 5]
    }
}`,
          explanation: "This solution uses binary search to find the first and last occurrences of the target value. We implement two separate binary search functions: one that continues searching in the left half when the target is found (to find the first occurrence), and another that continues searching in the right half (to find the last occurrence). The time complexity is O(log n) where n is the length of the array, and the space complexity is O(1)."
        }
      ]
    },
    {
      title: "Problem 3: Search in Rotated Sorted Array",
      content: "Given a sorted array that has been rotated at some pivot point, find if a target value is in the array. The array may contain duplicates.",
      codeExamples: [
        {
          language: "java",
          code: `public class SearchInRotatedSortedArray {
    public boolean search(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return false;
        }
        
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return true;
            }
            
            // Handle duplicates
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                left++;
                right--;
                continue;
            }
            
            // Check if the left half is sorted
            if (nums[left] <= nums[mid]) {
                // Check if target is in the left half
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } 
            // Right half is sorted
            else {
                // Check if target is in the right half
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        SearchInRotatedSortedArray solution = new SearchInRotatedSortedArray();
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        int target = 0;
        
        System.out.println(solution.search(nums, target));
        // Output: true
    }
}`,
          explanation: "This solution modifies the standard binary search to account for the rotation. In each step, we determine which half of the array is sorted, then check if the target lies within the sorted half. If it does, we search that half; otherwise, we search the other half. We also handle duplicates by incrementing left and decrementing right when left, mid, and right elements are equal. The time complexity is O(log n) in the average case, but could be O(n) in the worst case with many duplicates. The space complexity is O(1)."
        }
      ]
    },
    {
      title: "Problem 4: Median of Two Sorted Arrays",
      content: "Given two sorted arrays, find the median of the two arrays. The overall run time complexity should be O(log(m+n)).",
      codeExamples: [
        {
          language: "java",
          code: `public class MedianOfTwoSortedArrays {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Ensure nums1 is the smaller array for simplicity
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int m = nums1.length;
        int n = nums2.length;
        
        int left = 0;
        int right = m;
        
        while (left <= right) {
            // Get the partition points
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            // Get the elements around the partition
            int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];
            
            // Check if we found the correct partition
            if (maxX <= minY && maxY <= minX) {
                // If the total length is odd
                if ((m + n) % 2 != 0) {
                    return Math.max(maxX, maxY);
                }
                // If the total length is even
                else {
                    return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2.0;
                }
            }
            // Adjust the partition
            else if (maxX > minY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        
        throw new IllegalArgumentException("Arrays are not sorted or valid");
    }
    
    public static void main(String[] args) {
        MedianOfTwoSortedArrays solution = new MedianOfTwoSortedArrays();
        int[] nums1 = {1, 3};
        int[] nums2 = {2};
        
        System.out.println(solution.findMedianSortedArrays(nums1, nums2));
        // Output: 2.0
    }
}`,
          explanation: "This solution uses binary search to find the correct partition of the two arrays. The key insight is to find a partition such that all elements on the left side are smaller than all elements on the right side. We ensure that nums1 is the smaller array and perform binary search on it. For each partition in nums1, we calculate the corresponding partition in nums2. Then we check if we've found the correct partition (maxX <= minY and maxY <= minX). If not, we adjust the partition. The time complexity is O(log(min(m, n))) and the space complexity is O(1)."
        }
      ]
    },
    {
      title: "Problem 5: Koko Eating Bananas",
      content: "Koko loves to eat bananas. There are N piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in H hours. Koko can decide her bananas-per-hour eating speed K. Each hour, she chooses some pile of bananas, and eats K bananas from that pile. If the pile has less than K bananas, she eats all of them instead, and won't eat any more bananas during this hour. Koko likes to eat slowly, but still wants to finish eating all the bananas before the guards come back. Return the minimum integer K such that she can eat all the bananas within H hours.",
      codeExamples: [
        {
          language: "java",
          code: `public class KokoEatingBananas {
    public int minEatingSpeed(int[] piles, int h) {
        // Define the search space
        int left = 1;  // Minimum eating speed
        int right = 0; // Maximum eating speed
        
        // Find the maximum pile size
        for (int pile : piles) {
            right = Math.max(right, pile);
        }
        
        int result = right; // Start with the maximum possible speed
        
        // Binary search on the eating speed
        while (left <= right) {
            int mid = left + (right - left) / 2; // Try this eating speed
            
            if (canEatAll(piles, h, mid)) {
                // If Koko can eat all bananas with this speed, try a slower speed
                result = mid;
                right = mid - 1;
            } else {
                // If Koko can't eat all bananas with this speed, try a faster speed
                left = mid + 1;
            }
        }
        
        return result;
    }
    
    // Check if Koko can eat all piles within h hours at a eating speed of k
    private boolean canEatAll(int[] piles, int h, int k) {
        int hoursNeeded = 0;
        
        for (int pile : piles) {
            // Ceiling division: (pile + k - 1) / k or (pile - 1) / k + 1
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
        
        System.out.println(solution.minEatingSpeed(piles, h));
        // Output: 4
    }
}`,
          explanation: "This solution uses binary search on the answer. We define a range of possible eating speeds (1 to the maximum pile size) and perform binary search to find the minimum eating speed that allows Koko to eat all bananas within H hours. The 'canEatAll' function calculates the total hours needed to eat all piles with a given eating speed. If Koko can eat all bananas with the current speed, we try a slower speed; otherwise, we try a faster speed. The time complexity is O(n * log(max_pile)) where n is the number of piles and max_pile is the maximum pile size. The space complexity is O(1)."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "mock-test-wk3-hw-1",
      question: "Search a 2D Matrix II: Write a function that efficiently searches for a value in an m x n matrix. This matrix has the following properties: 1) Integers in each row are sorted in ascending from left to right. 2) Integers in each column are sorted in ascending from top to bottom.",
      solution: "```java\npublic boolean searchMatrix(int[][] matrix, int target) {\n    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\n        return false;\n    }\n    \n    int rows = matrix.length;\n    int cols = matrix[0].length;\n    \n    // Start from the top-right corner\n    int row = 0;\n    int col = cols - 1;\n    \n    while (row < rows && col >= 0) {\n        if (matrix[row][col] == target) {\n            return true;\n        } else if (matrix[row][col] > target) {\n            // Target is smaller, move left\n            col--;\n        } else {\n            // Target is larger, move down\n            row++;\n        }\n    }\n    \n    return false;\n}\n```\nThis solution uses the property that the matrix is both row-wise and column-wise sorted to efficiently search for the target. Starting from the top-right corner, we compare the current element with the target. If they are equal, we've found the target. If the current element is greater than the target, we move left (all elements to the right are greater). If the current element is less than the target, we move down (all elements above are smaller). This approach ensures that we eliminate either a row or a column in each step. The time complexity is O(m + n) where m and n are the dimensions of the matrix."
    },
    {
      id: "mock-test-wk3-hw-2",
      question: "Find K Closest Elements: Given a sorted array arr, two integers k and x, find the k closest elements to x in the array. The result should also be sorted in ascending order. If there is a tie, the smaller elements are always preferred.",
      solution: "```java\npublic List<Integer> findClosestElements(int[] arr, int k, int x) {\n    // Use binary search to find the position where x would be inserted\n    int left = 0;\n    int right = arr.length - k;\n    \n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        \n        // Compare the distance from x to arr[mid] and arr[mid+k]\n        if (x - arr[mid] > arr[mid+k] - x) {\n            // If the element at mid is further from x than the element at mid+k,\n            // we need to move the window to the right\n            left = mid + 1;\n        } else {\n            // Otherwise, we move the window to the left\n            right = mid;\n        }\n    }\n    \n    // Once we find the starting position, we can extract k elements\n    List<Integer> result = new ArrayList<>();\n    for (int i = left; i < left + k; i++) {\n        result.add(arr[i]);\n    }\n    \n    return result;\n}\n```\nThis solution uses binary search to find the left bound of the k closest elements to x. The key insight is that we're looking for a window of k consecutive elements such that the elements just outside this window are further from x than the elements inside. Once we find this window, we extract the k elements from the array. The time complexity is O(log(n-k) + k) where n is the length of the array. The log(n-k) term comes from the binary search to find the left bound, and the k term comes from extracting the k elements."
    }
  ],
  
  quiz: [
    {
      id: "mock-test-wk3-quiz-1",
      question: "What is the time complexity of binary search on a sorted array of size n?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "The time complexity of binary search on a sorted array is O(log n). In each step, we eliminate half of the remaining elements, resulting in logarithmic time complexity. This is much more efficient than a linear search, which would have O(n) time complexity."
    },
    {
      id: "mock-test-wk3-quiz-2",
      question: "In a rotated sorted array [4, 5, 6, 7, 0, 1, 2], how would you determine which half of the array is sorted when performing a binary search?",
      options: [
        "Compare the first element with the middle element",
        "Compare the middle element with the last element",
        "Always assume the left half is sorted",
        "Compare the left element with the middle element, and then the middle element with the right element"
      ],
      correctAnswer: 3,
      explanation: "To determine which half of a rotated sorted array is sorted, we need to compare the left element with the middle element. If nums[left] <= nums[mid], then the left half is sorted; otherwise, the right half is sorted. This comparison helps us decide which half to search based on whether the target lies within the sorted half."
    },
    {
      id: "mock-test-wk3-quiz-3",
      question: "What approach would be most efficient for finding the median of two sorted arrays?",
      options: [
        "Merge the arrays and find the middle element",
        "Use binary search to find the correct partition",
        "Use two pointers to traverse both arrays",
        "Sort the combined array using quicksort"
      ],
      correctAnswer: 1,
      explanation: "The most efficient approach for finding the median of two sorted arrays is to use binary search to find the correct partition. This achieves O(log(min(m, n))) time complexity, which is more efficient than merging the arrays (O(m+n)) or using two pointers (O(m+n)). The key insight is to find a partition such that all elements on the left side are smaller than all elements on the right side."
    },
    {
      id: "mock-test-wk3-quiz-4",
      question: "Which of the following is NOT a valid approach for searching in a row-wise and column-wise sorted 2D matrix?",
      options: [
        "Start from the top-right corner and eliminate rows or columns",
        "Treat the matrix as a 1D sorted array and perform binary search",
        "Perform binary search on each row",
        "Use a recursive divide-and-conquer approach"
      ],
      correctAnswer: 1,
      explanation: "Treating the matrix as a 1D sorted array and performing binary search is NOT a valid approach for a row-wise and column-wise sorted matrix (where each row and column is sorted, but the last element of a row is not necessarily smaller than the first element of the next row). This approach works only for matrices that can be viewed as a sorted 1D array shaped into 2D form. For row-wise and column-wise sorted matrices, starting from the top-right corner or performing binary search on each row are valid approaches."
    }
  ]
};

export default mockTestWeek3Content; 