import { Content } from '@/types/course';

const twoPointersContent: Content = {
  introduction: "The Two Pointers technique is a simple yet powerful approach for solving problems involving arrays or linked lists. This method utilizes two pointers (or indices) that traverse through the data structure, often in different directions or at different speeds. It's particularly effective for problems involving searching, sorting, or when we need to find pairs of elements that satisfy certain conditions.",
  
  learningObjectives: [
    "Understand the fundamental concept of the Two Pointers technique",
    "Identify problem patterns suitable for Two Pointers approach",
    "Apply the technique to solve common coding interview problems",
    "Analyze the time and space complexity benefits of Two Pointers over brute force approaches",
    "Master various Two Pointers patterns: opposite directions, fast and slow, sliding window initialization"
  ],
  
  sections: [
    {
      title: "Basic Two Pointers Patterns",
      content: "There are several common patterns when applying the Two Pointers technique. The most widely used are: opposite-direction pointers (starting from both ends), same-direction pointers (moving at different speeds), and sliding window initialization (where two pointers form a window).",
      codeExamples: [
        {
          language: "java",
          code: `// Pattern 1: Opposite-Direction Pointers
// Example: Two Sum II (sorted array)
// Given a sorted array and a target, find two numbers that add up to the target
public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        
        if (sum == target) {
            return new int[] {left + 1, right + 1}; // 1-indexed result
        } else if (sum < target) {
            left++; // Need a larger sum, so move left pointer right
        } else {
            right--; // Need a smaller sum, so move right pointer left
        }
    }
    
    return new int[] {-1, -1}; // No solution found
}

// Pattern 2: Same-Direction Pointers (Fast and Slow)
// Example: Remove Duplicates from Sorted Array
// Remove duplicates in-place and return the length of the new array
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    
    int slow = 0; // Points to the position to place the next unique element
    
    // Fast pointer scans through the array
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++; // Move slow pointer ahead
            nums[slow] = nums[fast]; // Place unique element at slow pointer
        }
    }
    
    return slow + 1; // Length is one more than the last index
}

// Pattern 3: Sliding Window Initialization
// Example: Find all pairs with a given sum
public List<int[]> findPairsWithSum(int[] nums, int target) {
    Arrays.sort(nums); // Sort the array first
    
    List<int[]> result = new ArrayList<>();
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            result.add(new int[] {nums[left], nums[right]});
            
            // Skip duplicates for both pointers
            while (left < right && nums[left] == nums[left + 1]) left++;
            while (left < right && nums[right] == nums[right - 1]) right--;
            
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;
}`,
          explanation: "These examples demonstrate three common patterns of the Two Pointers technique. In the opposite-direction pattern, we start from both ends of the array and move towards the middle. In the same-direction pattern, we have a slow and fast pointer moving at different speeds. The sliding window initialization sets up a window using two pointers that can later be expanded or contracted."
        }
      ]
    },
    {
      title: "Two Pointers for Finding Pairs",
      content: "One of the most common applications of the Two Pointers technique is finding pairs of elements that satisfy certain conditions. This approach is particularly effective when the input array is sorted, as it allows us to efficiently navigate the search space.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: 3Sum Problem
// Find all unique triplets in the array which give the sum of zero
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(nums); // Sort the array first
    
    for (int i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1;
        int right = nums.length - 1;
        int target = -nums[i]; // We need to find pairs that sum to -nums[i]
        
        while (left < right) {
            int sum = nums[left] + nums[right];
            
            if (sum == target) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                
                // Skip duplicates for both pointers
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Example 2: 4Sum Problem
// Find all unique quadruplets in the array which give the sum equal to target
public List<List<Integer>> fourSum(int[] nums, int target) {
    List<List<Integer>> result = new ArrayList<>();
    if (nums.length < 4) return result;
    
    Arrays.sort(nums); // Sort the array first
    
    for (int i = 0; i < nums.length - 3; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        for (int j = i + 1; j < nums.length - 2; j++) {
            // Skip duplicates for the second element
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            
            int left = j + 1;
            int right = nums.length - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum == target) {
                    result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                    
                    // Skip duplicates for both pointers
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

// Example 3: Pair with Closest Sum
// Find the pair with sum closest to a target value
public int[] closestPair(int[] nums, int target) {
    Arrays.sort(nums); // Sort the array first
    
    int left = 0;
    int right = nums.length - 1;
    int minDiff = Integer.MAX_VALUE;
    int[] result = new int[2];
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        int diff = Math.abs(sum - target);
        
        if (diff < minDiff) {
            minDiff = diff;
            result[0] = nums[left];
            result[1] = nums[right];
        }
        
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;
}`,
          explanation: "These examples show how the Two Pointers technique can be applied to various 'finding pairs' problems. The 3Sum problem reduces to finding pairs by fixing one element and using two pointers to find pairs that sum to the negative of that element. The 4Sum problem extends this by fixing two elements and using two pointers to find pairs for the remaining sum. The Closest Pair problem demonstrates how to track the closest pair to a target while scanning through the array."
        }
      ]
    },
    {
      title: "Fast and Slow Pointers",
      content: "The Fast and Slow Pointers pattern (also known as the Hare and Tortoise algorithm) is particularly useful for cycle detection in linked lists, arrays, or strings. In this pattern, one pointer moves faster than the other, allowing us to detect patterns or find specific elements.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: Detect Cycle in a Linked List
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    // Fast pointer moves two steps at a time
    // Slow pointer moves one step at a time
    while (fast != null && fast.next != null) {
        slow = slow.next;          // Move slow pointer one step
        fast = fast.next.next;     // Move fast pointer two steps
        
        // If there is a cycle, the fast pointer will eventually catch up to the slow pointer
        if (slow == fast) {
            return true;
        }
    }
    
    return false; // Fast pointer reached the end, so no cycle
}

// Example 2: Find the Middle of a Linked List
public ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    
    // When fast reaches the end, slow will be at the middle
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Example 3: Find the Start of the Cycle in a Linked List
public ListNode detectCycle(ListNode head) {
    if (head == null || head.next == null) {
        return null;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    boolean hasCycle = false;
    
    // Phase 1: Detect if there is a cycle
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow == fast) {
            hasCycle = true;
            break;
        }
    }
    
    if (!hasCycle) {
        return null;
    }
    
    // Phase 2: Find the start of the cycle
    // Reset slow to head, keep fast at meeting point
    // Both pointers move at the same pace now
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow; // This is the start of the cycle
}

// Example 4: Find if a number is a happy number
public boolean isHappy(int n) {
    int slow = n;
    int fast = getNext(n); // Start fast one step ahead
    
    while (fast != 1 && slow != fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast)); // Fast moves two steps
    }
    
    return fast == 1; // If fast reaches 1, it's a happy number
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}`,
          explanation: "These examples demonstrate the Fast and Slow Pointers pattern. For cycle detection in a linked list, the fast pointer moves twice as fast as the slow pointer. If there's a cycle, the fast pointer will eventually catch up to the slow pointer. For finding the middle of a linked list, by the time the fast pointer reaches the end, the slow pointer will be at the middle. The third example shows how to find the start of a cycle in a linked list using a two-phase approach. The Happy Number problem applies the same technique to detect cycles in number sequences."
        }
      ]
    },
    {
      title: "Two Pointers with Strings and Palindromes",
      content: "The Two Pointers technique is also effective for string manipulation, especially for problems involving palindromes or string validation. In these cases, pointers often start from both ends of the string and move towards the center, comparing characters along the way.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: Check if a String is a Palindrome
public boolean isPalindrome(String s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
    
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return false; // Characters don't match, not a palindrome
        }
        left++;
        right--;
    }
    
    return true; // All characters matched, it's a palindrome
}

// Example 2: Palindrome with Character Skipping
// Check if a string is a palindrome, considering only alphanumeric characters
// and ignoring case (without using regex or extra space)
public boolean isPalindromeWithSkipping(String s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from the left
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        
        // Skip non-alphanumeric characters from the right
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }
        
        // Compare characters (ignoring case)
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// Example 3: Valid Palindrome II
// Check if a string can become a palindrome by removing at most one character
public boolean validPalindrome(String s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            // Try skipping character at left or right
            return isPalindromeRange(s, left + 1, right) || 
                   isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }
    
    return true; // Already a palindrome
}

private boolean isPalindromeRange(String s, int start, int end) {
    while (start < end) {
        if (s.charAt(start) != s.charAt(end)) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}

// Example 4: Reverse Vowels of a String
public String reverseVowels(String s) {
    char[] chars = s.toCharArray();
    int left = 0;
    int right = s.length() - 1;
    String vowels = "aeiouAEIOU";
    
    while (left < right) {
        // Find the leftmost vowel
        while (left < right && vowels.indexOf(chars[left]) == -1) {
            left++;
        }
        
        // Find the rightmost vowel
        while (left < right && vowels.indexOf(chars[right]) == -1) {
            right--;
        }
        
        // Swap the vowels
        if (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
    }
    
    return new String(chars);
}`,
          explanation: "These examples demonstrate how the Two Pointers technique can be applied to string problems. The first two examples check if a string is a palindrome, using variations to handle different requirements. The Valid Palindrome II problem allows skipping one character and still forming a palindrome, which is handled by creating two possible scenarios when a mismatch is found. The Reverse Vowels problem shows how to use two pointers to find and swap specific characters in a string."
        }
      ]
    },
    {
      title: "Two Pointers with Sorted Arrays or Partitioning",
      content: "The Two Pointers technique is particularly powerful for problems that involve sorted arrays or require partitioning elements based on certain conditions. This approach allows for efficient in-place modifications and often achieves optimal time complexity.",
      codeExamples: [
        {
          language: "java",
          code: `// Example 1: Partition Array according to a given pivot
// Rearrange the array such that all elements less than pivot come before
// all elements greater than or equal to pivot
public int[] partitionArray(int[] nums, int pivot) {
    int left = 0; // Pointer for elements < pivot
    int right = nums.length - 1; // Pointer for elements ≥ pivot
    
    while (left <= right) {
        if (nums[left] < pivot) {
            left++; // Element is already in the correct position
        } else {
            // Swap with the element at the right pointer
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            right--; // Move right pointer left
        }
    }
    
    return nums;
}

// Example 2: Dutch National Flag problem (Sort Colors)
// Sort an array of 0's, 1's, and 2's in-place
public void sortColors(int[] nums) {
    // Three pointers approach
    int low = 0; // Boundary for 0's (everything before low is 0)
    int mid = 0; // Current element to examine
    int high = nums.length - 1; // Boundary for 2's (everything after high is 2)
    
    while (mid <= high) {
        if (nums[mid] == 0) {
            // Swap with the low pointer
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            // 1 is already in the correct position
            mid++;
        } else { // nums[mid] == 2
            // Swap with the high pointer
            swap(nums, mid, high);
            high--;
            // Don't increment mid yet, as the swapped element needs to be examined
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// Example 3: Move Zeros to the End
// Move all zeros to the end of the array while maintaining the relative order of non-zero elements
public void moveZeroes(int[] nums) {
    int nonZeroIndex = 0; // Pointer for placing non-zero elements
    
    // First pass: place all non-zero elements
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[nonZeroIndex++] = nums[i];
        }
    }
    
    // Second pass: fill the remaining positions with zeros
    while (nonZeroIndex < nums.length) {
        nums[nonZeroIndex++] = 0;
    }
}

// Example 4: Merge Two Sorted Arrays
// Merge nums1 and nums2 into nums1 as one sorted array
// nums1 has enough space at the end to hold nums2
public void merge(int[] nums1, int m, int[] nums2, int n) {
    // Start from the end of both arrays
    int p1 = m - 1; // Pointer for nums1
    int p2 = n - 1; // Pointer for nums2
    int p = m + n - 1; // Pointer for the merged array
    
    // While there are elements in both arrays
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p--] = nums1[p1--];
        } else {
            nums1[p--] = nums2[p2--];
        }
    }
    
    // If there are remaining elements in nums2
    while (p2 >= 0) {
        nums1[p--] = nums2[p2--];
    }
}`,
          explanation: "These examples demonstrate how the Two Pointers technique can be used for partitioning arrays or working with sorted arrays. The partition array example shows how to arrange elements around a pivot. The Dutch National Flag problem (sort colors) uses three pointers to sort an array with only three distinct values. The Move Zeros example maintains the order of non-zero elements while moving all zeros to the end. The Merge Two Sorted Arrays example efficiently merges two arrays by starting from the end and working backwards, which avoids overwriting elements that haven't been processed yet."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "tp-hw1",
      question: "Implement a solution to the Container With Most Water problem: Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
      solution: "Use two pointers approach starting from both ends of the array. Calculate the area between the two pointers and update the maximum area seen so far. Move the pointer pointing to the shorter line inward (since moving the pointer pointing to the taller line would only result in a smaller area)."
    },
    {
      id: "tp-hw2",
      question: "Implement a solution to the Remove Element problem: Given an array nums and a value val, remove all instances of that value in-place and return the new length. The order of elements can be changed. It doesn't matter what you leave beyond the new length.",
      solution: "Use two pointers: one to iterate through the array and another to keep track of the position where the next non-val element should be placed. Iterate through the array, and whenever you find an element that is not equal to val, place it at the position indicated by the second pointer and increment that pointer. Return the final position of the second pointer as the new length."
    },
    {
      id: "tp-hw3",
      question: "Implement a solution to the Trapping Rain Water problem: Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      solution: "Use a two-pointer approach with additional variables to track the maximum height seen from the left and right. Start with pointers at both ends of the array. Compare the heights at the two pointers. Move the pointer with the smaller height inward while updating the trapped water and maximum height seen from that side. Continue until the two pointers meet."
    }
  ],
  
  quiz: [
    {
      id: "tp-q1",
      question: "What is the time complexity of the Two Pointers approach for finding a pair with a given sum in a sorted array?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation: "The Two Pointers approach for finding a pair with a given sum in a sorted array has a time complexity of O(n), where n is the size of the array. The algorithm makes a single pass through the array, adjusting the two pointers based on the sum of the elements they point to."
    },
    {
      id: "tp-q2",
      question: "Which of the following problems is NOT typically solved using the Two Pointers technique?",
      options: [
        "Finding a pair with a given sum in a sorted array",
        "Detecting a cycle in a linked list",
        "Binary search in a sorted array",
        "Checking if a string is a palindrome"
      ],
      correctAnswer: 2,
      explanation: "Binary search in a sorted array typically uses a single pointer (or two pointers that define a range) rather than two pointers moving independently. The other options are classic problems that can be efficiently solved using the Two Pointers technique."
    },
    {
      id: "tp-q3",
      question: "In the 'Fast and Slow Pointers' pattern, what is the relationship between the two pointers?",
      options: [
        "They start from opposite ends of the data structure",
        "One moves twice as fast as the other",
        "They move in opposite directions",
        "They always point to adjacent elements"
      ],
      correctAnswer: 1,
      explanation: "In the Fast and Slow Pointers pattern (also known as the Hare and Tortoise algorithm), one pointer (the fast pointer) moves twice as fast as the other (the slow pointer). This property is useful for detecting cycles and finding the middle of linked lists."
    },
    {
      id: "tp-q4",
      question: "What is the main advantage of using the Two Pointers technique over a brute force approach?",
      options: [
        "It always guarantees the correct answer",
        "It is easier to implement",
        "It typically reduces the time complexity",
        "It always requires less memory"
      ],
      correctAnswer: 2,
      explanation: "The main advantage of using the Two Pointers technique over a brute force approach is that it typically reduces the time complexity. For example, finding a pair with a given sum in a sorted array has O(n) time complexity with Two Pointers, compared to O(n²) with brute force."
    },
    {
      id: "tp-q5",
      question: "Which of the following is a prerequisite for using the Two Pointers technique in the 'opposite-direction' pattern?",
      options: [
        "The array must be unsorted",
        "The array must contain only positive integers",
        "The array must have an even number of elements",
        "The array is often (but not always) sorted"
      ],
      correctAnswer: 3,
      explanation: "For the opposite-direction pattern, where pointers start from both ends of the array and move towards the middle, the array is often (but not always) sorted. This property allows for efficient navigation of the search space based on the relationship between elements at the two pointers."
    }
  ]
};

export default twoPointersContent; 