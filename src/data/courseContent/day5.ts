import { Content } from '@/types/course';

const slidingWindowContent: Content = {
  introduction: "The sliding window technique is a powerful algorithmic approach for solving problems involving subarrays or substrings in a linear time complexity. It involves maintaining a 'window' that slides through the data, allowing us to efficiently process consecutive elements without redundant calculations.",
  
  learningObjectives: [
    "Understand the basic principle of the sliding window technique",
    "Differentiate between fixed-size and variable-size sliding windows",
    "Apply sliding windows to solve array and string problems efficiently",
    "Optimize space and time complexity using the sliding window approach",
    "Recognize when a problem can be solved using a sliding window"
  ],
  
  sections: [
    {
      title: "Sliding Window Fundamentals",
      content: "The sliding window technique uses two pointers (often called left and right) to create a window that defines a subarray or substring. As the pointers move, the window 'slides' through the data.\n\nThere are two main types of sliding windows:\n\n1. **Fixed-Size Window**: The window size remains constant (k elements)\n2. **Variable-Size Window**: The window size changes based on certain conditions\n\nThe general approach involves initializing the window boundaries, processing elements within the window, and sliding the window by adjusting the boundaries.",
      codeExamples: [
        {
          language: "java",
          code: `// Basic sliding window template
public void slidingWindow(int[] arr) {
    int left = 0;           // Left boundary of the window
    int right = 0;          // Right boundary of the window
    
    // Some variables to track window state
    int windowSum = 0;      // Example: sum of elements in the window
    
    while (right < arr.length) {
        // 1. Expand the window by including the element at right pointer
        windowSum += arr[right];
        
        // 2. Process the window (e.g., update the result)
        // This could be: finding max sum, checking for a valid window, etc.
        
        // 3. Shrink the window from the left if necessary
        // For fixed-size window: when window size exceeds k
        // For variable-size window: when window violates certain conditions
        while (/* window needs to shrink */) {
            // Remove the element at left pointer from window calculations
            windowSum -= arr[left];
            left++;  // Move left pointer to shrink the window
        }
        
        // 4. Move right pointer to expand the window
        right++;
    }
}`,
          explanation: "This template provides a general framework for implementing sliding window solutions. The key operations include expanding the window, processing its contents, shrinking the window when necessary, and continuing to slide the window through the data structure. The specific conditions for expanding, processing, and shrinking depend on the problem requirements."
        }
      ]
    },
    {
      title: "Fixed-Size Sliding Window",
      content: "In a fixed-size sliding window, we maintain a window of exactly k elements. This approach is useful for problems like:\n- Finding the maximum sum of k consecutive elements\n- Computing a moving average\n- Finding substrings of length k with certain properties\n\nThe key characteristic is that the window size remains constant throughout the algorithm's execution.",
      codeExamples: [
        {
          language: "java",
          code: `// Maximum Sum Subarray of Size K
public int maxSubarraySum(int[] nums, int k) {
    // Edge case: array is smaller than the window size
    if (nums.length < k) {
        return -1;
    }
    
    int maxSum = 0;
    int windowSum = 0;
    
    // Calculate sum of first k elements
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;
    
    // Slide the window and update max sum
    for (int i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];  // Slide the window
        maxSum = Math.max(maxSum, windowSum);           // Update maximum
    }
    
    return maxSum;
}

// Find All Anagrams in a String
public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (s.length() < p.length()) return result;
    
    // Character frequency counts
    int[] pCount = new int[26];
    int[] windowCount = new int[26];
    
    // Initialize frequency counts for pattern and first window
    for (int i = 0; i < p.length(); i++) {
        pCount[p.charAt(i) - 'a']++;
        windowCount[s.charAt(i) - 'a']++;
    }
    
    // Check if first window is an anagram
    if (Arrays.equals(pCount, windowCount)) {
        result.add(0);
    }
    
    // Slide the window
    for (int i = p.length(); i < s.length(); i++) {
        // Add new character to window
        windowCount[s.charAt(i) - 'a']++;
        
        // Remove oldest character from window
        windowCount[s.charAt(i - p.length()) - 'a']--;
        
        // Check if current window is an anagram
        if (Arrays.equals(pCount, windowCount)) {
            result.add(i - p.length() + 1);
        }
    }
    
    return result;
}`,
          explanation: "These examples demonstrate fixed-size sliding window applications. In the maximum sum subarray problem, we maintain a window of exactly k elements and slide it through the array. For each position, we add the new element and remove the oldest one to maintain the fixed size. The find anagrams problem similarly uses a fixed-size window equal to the pattern length, sliding through the string while maintaining character frequency counts."
        }
      ]
    },
    {
      title: "Variable-Size Sliding Window",
      content: "In a variable-size sliding window, the window size changes dynamically based on certain conditions. This approach is useful for problems like:\n- Finding the smallest subarray with a sum greater than a given value\n- Finding the longest substring without repeating characters\n- Finding the longest substring with at most k distinct characters\n\nThe key characteristic is that the window expands and contracts based on specific conditions rather than maintaining a fixed size.",
      codeExamples: [
        {
          language: "java",
          code: `// Smallest Subarray with Sum Greater than or Equal to Target
public int minSubArrayLen(int target, int[] nums) {
    int left = 0;
    int sum = 0;
    int minLength = Integer.MAX_VALUE;
    
    for (int right = 0; right < nums.length; right++) {
        // Expand the window by adding the current element
        sum += nums[right];
        
        // Shrink the window from the left until sum < target
        while (sum >= target) {
            // Update the minimum length
            minLength = Math.min(minLength, right - left + 1);
            
            // Remove the leftmost element and move left pointer
            sum -= nums[left];
            left++;
        }
    }
    
    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}

// Longest Substring Without Repeating Characters
public int lengthOfLongestSubstring(String s) {
    if (s.length() == 0) return 0;
    
    int left = 0;
    int maxLength = 0;
    Map<Character, Integer> charIndexMap = new HashMap<>();
    
    for (int right = 0; right < s.length(); right++) {
        char currentChar = s.charAt(right);
        
        // If the character is already in the window, 
        // move the left pointer to position after the last occurrence
        if (charIndexMap.containsKey(currentChar)) {
            // Math.max ensures we don't move left pointer backwards
            left = Math.max(left, charIndexMap.get(currentChar) + 1);
        }
        
        // Add or update the character's position in the map
        charIndexMap.put(currentChar, right);
        
        // Update the maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Longest Substring with At Most K Distinct Characters
public int lengthOfLongestSubstringKDistinct(String s, int k) {
    if (s.length() == 0 || k == 0) return 0;
    
    int left = 0;
    int maxLength = 0;
    Map<Character, Integer> charFrequency = new HashMap<>();
    
    for (int right = 0; right < s.length(); right++) {
        char rightChar = s.charAt(right);
        
        // Add the current character to the frequency map
        charFrequency.put(rightChar, charFrequency.getOrDefault(rightChar, 0) + 1);
        
        // Shrink the window until we have at most k distinct characters
        while (charFrequency.size() > k) {
            char leftChar = s.charAt(left);
            
            // Decrease the frequency of the left character
            charFrequency.put(leftChar, charFrequency.get(leftChar) - 1);
            
            // If frequency becomes zero, remove the character from the map
            if (charFrequency.get(leftChar) == 0) {
                charFrequency.remove(leftChar);
            }
            
            // Move the left pointer
            left++;
        }
        
        // Update the maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
          explanation: "These examples demonstrate variable-size sliding window applications. In the minimum subarray length problem, we expand the window until the sum exceeds the target, then shrink it from the left to find the minimum length. In the longest substring without repeating characters problem, we adjust the window when we encounter a character already in the window. The longest substring with at most k distinct characters problem maintains a window that expands and contracts to ensure it contains no more than k distinct characters."
        }
      ]
    },
    {
      title: "Auxiliary Data Structures for Sliding Windows",
      content: "Many sliding window problems require tracking additional information about the window contents. Common auxiliary data structures include:\n\n1. **HashSet/HashMap**: To track element frequency or presence\n2. **Arrays**: For fixed character sets (e.g., lowercase English letters)\n3. **Deque**: For problems requiring access to both ends of the window\n4. **Priority Queue**: For problems requiring ordering within the window",
      codeExamples: [
        {
          language: "java",
          code: `// Using HashSet for tracking unique elements
public int lengthOfLongestSubstring(String s) {
    int left = 0;
    int maxLength = 0;
    Set<Character> uniqueChars = new HashSet<>();
    
    for (int right = 0; right < s.length(); right++) {
        char currentChar = s.charAt(right);
        
        // Shrink window until the duplicate is removed
        while (uniqueChars.contains(currentChar)) {
            uniqueChars.remove(s.charAt(left));
            left++;
        }
        
        // Add the current character to the set
        uniqueChars.add(currentChar);
        
        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Using array for character frequency (for lowercase English letters)
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    
    int[] freq = new int[26];
    
    // Count frequencies in the first string
    for (char c : s.toCharArray()) {
        freq[c - 'a']++;
    }
    
    // Decrement frequencies based on the second string
    for (char c : t.toCharArray()) {
        freq[c - 'a']--;
        if (freq[c - 'a'] < 0) {
            return false;  // More occurrences in t than in s
        }
    }
    
    return true;
}

// Using Deque for sliding window maximum
public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums.length == 0 || k == 0) return new int[0];
    
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();  // Stores indices
    
    for (int i = 0; i < nums.length; i++) {
        // Remove elements outside the current window
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }
        
        // Remove smaller elements (they can't be the maximum)
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.pollLast();
        }
        
        // Add the current element's index
        deque.offerLast(i);
        
        // If the window has reached size k, add the maximum to the result
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    
    return result;
}`,
          explanation: "These examples demonstrate how different auxiliary data structures can enhance sliding window solutions. A HashSet efficiently tracks unique characters in a substring. For problems with a fixed character set like lowercase English letters, an array can be more efficient than a HashMap. A deque (double-ended queue) is useful when we need efficient operations at both ends, as shown in the sliding window maximum problem where we maintain a decreasing monotonic queue."
        }
      ]
    },
    {
      title: "Optimizations and Patterns",
      content: "When working with sliding windows, several patterns and optimizations can help:\n\n1. **Two-Pointer Technique**: Using left and right pointers to define the window bounds\n2. **Precomputation**: Calculating prefix sums or other cumulative values\n3. **Early Termination**: Exiting loops early when conditions are met\n4. **Space Optimization**: Minimizing the auxiliary space needed",
      codeExamples: [
        {
          language: "java",
          code: `// Using early termination in sliding window
public int subarraySum(int[] nums, int k) {
    int count = 0;
    int sum = 0;
    Map<Integer, Integer> prefixSumCount = new HashMap<>();
    prefixSumCount.put(0, 1);  // Empty subarray with sum 0
    
    for (int num : nums) {
        sum += num;
        
        // Check if there exists a prefix sum such that (sum - prefixSum = k)
        // This means the subarray between those points sums to k
        count += prefixSumCount.getOrDefault(sum - k, 0);
        
        // Update the prefix sum count
        prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
    }
    
    return count;
}

// Space optimization for fixed window size
public double[] movingAverage(int[] nums, int k) {
    if (nums.length < k) return new double[0];
    
    double[] result = new double[nums.length - k + 1];
    double windowSum = 0;
    
    // Calculate the sum of the first window
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    result[0] = windowSum / k;
    
    // Slide the window
    for (int i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        result[i - k + 1] = windowSum / k;
    }
    
    return result;
}

// Using prefix sum with sliding window
public int numSubarrayProductLessThanK(int[] nums, int k) {
    if (k <= 1) return 0;  // Since all elements are positive
    
    int count = 0;
    int product = 1;
    int left = 0;
    
    for (int right = 0; right < nums.length; right++) {
        // Expand the window
        product *= nums[right];
        
        // Shrink the window from the left
        while (product >= k) {
            product /= nums[left];
            left++;
        }
        
        // All subarrays ending at right and starting at or after left
        // have a product less than k
        count += right - left + 1;
    }
    
    return count;
}`,
          explanation: "These examples showcase optimizations for sliding window problems. The subarrays sum problem uses prefix sums with a HashMap to efficiently count subarrays with sum equal to k. The moving average demonstrates space optimization by maintaining just the window sum rather than storing all elements. The subarray product problem uses a combination of sliding window with a clever counting technique to avoid redundant computations."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "sw-hw1",
      question: "Implement a solution to the Maximum Average Subarray I problem: Given an array nums consisting of n integers and an integer k, find the contiguous subarray of length k that has the maximum average value. Return the maximum average value.",
      solution: "Use a sliding window approach: Calculate the sum of the first k elements, then slide the window one element at a time, adding the new element and removing the oldest one. At each step, update the maximum sum seen. Finally, divide by k to get the average. This approach has O(n) time complexity."
    },
    {
      id: "sw-hw2",
      question: "Implement a solution to the Fruit Into Baskets problem: You have two baskets, and each basket can carry any quantity of fruit. The only restriction is that each basket can only hold a single type of fruit. You start at any tree, and pick one fruit from that tree. Then you can move to any other tree (including the tree you visited already), and pick one fruit. You want to maximize the total number of fruits you can pick. Return the maximum.",
      solution: "This problem translates to finding the longest subarray with at most two distinct elements. Use a HashMap to track the frequency of fruits in the current window. Expand the window as long as the distinct fruit count is ≤ 2. When you encounter a third type, shrink the window from the left until one type is completely removed. Keep track of the maximum window size throughout the process."
    },
    {
      id: "sw-hw3",
      question: "Implement a solution to the Minimum Window Substring problem: Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return an empty string ''.",
      solution: "Use a variable-size sliding window approach with two hash maps: one for tracking the required characters and another for the current window. Expand the window until all required characters are included, then contract it from the left to find the minimum valid window. Keep track of a 'formed' counter that indicates how many unique characters have the required frequency. This approach has O(n) time complexity."
    }
  ],
  
  quiz: [
    {
      id: "sw-q1",
      question: "What is the time complexity of the sliding window technique for processing an array of length n?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation: "The sliding window technique typically processes each element at most twice (once when it enters the window and once when it exits), making the time complexity O(n) for an array of length n."
    },
    {
      id: "sw-q2",
      question: "Which of the following problems is NOT suitable for the sliding window technique?",
      options: [
        "Finding the maximum sum subarray of size k",
        "Finding the longest substring with at most k distinct characters",
        "Finding the permutations of a string",
        "Finding the smallest subarray with sum greater than a given value"
      ],
      correctAnswer: 2,
      explanation: "Finding the permutations of a string requires generating all possible arrangements, which is an O(n!) operation and doesn't fit the sliding window pattern. The other problems are well-suited for sliding window solutions."
    },
    {
      id: "sw-q3",
      question: "What is the key difference between fixed-size and variable-size sliding windows?",
      options: [
        "Fixed-size windows always use two pointers, while variable-size windows use only one",
        "Fixed-size windows maintain a constant window length, while variable-size windows adjust based on conditions",
        "Fixed-size windows are only used for arrays, while variable-size windows are used for strings",
        "Fixed-size windows have O(n) complexity, while variable-size windows have O(n²) complexity"
      ],
      correctAnswer: 1,
      explanation: "In fixed-size sliding windows, the window length remains constant throughout the algorithm. In variable-size sliding windows, the window expands and contracts based on certain conditions that need to be satisfied."
    },
    {
      id: "sw-q4",
      question: "Which data structure is commonly used to optimize the sliding window technique when tracking character frequencies?",
      options: [
        "Binary Search Tree",
        "Linked List",
        "HashMap or HashSet",
        "Stack"
      ],
      correctAnswer: 2,
      explanation: "HashMap or HashSet is commonly used in sliding window techniques to efficiently track the frequency or presence of elements within the current window, especially for string problems."
    },
    {
      id: "sw-q5",
      question: "Which of the following statements about sliding window is TRUE?",
      options: [
        "Sliding window always uses O(n) extra space",
        "Sliding window can only be applied to arrays, not strings",
        "Sliding window can transform some O(n²) algorithms to O(n)",
        "Sliding window requires the input to be sorted"
      ],
      correctAnswer: 2,
      explanation: "The sliding window technique can transform some brute force O(n²) algorithms to O(n) by avoiding redundant calculations. This is one of its main benefits, as it allows for a single pass through the data instead of nested loops."
    }
  ]
};

export default slidingWindowContent; 