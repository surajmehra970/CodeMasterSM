import { Content } from '@/types/course';

const timeComplexityContent: Content = {
  introduction: "Understanding time complexity is crucial for writing efficient algorithms. It helps us analyze how an algorithm's performance scales with input size.",
  learningObjectives: [
    "Understand Big-O notation and its importance",
    "Analyze time complexity of algorithms",
    "Compare algorithm efficiency",
    "Identify space complexity considerations"
  ],
  sections: [
    {
      title: "Introduction to Time Complexity",
      content: "Time complexity measures how the runtime of an algorithm grows with input size. It helps us understand the scalability of our code and make informed decisions about algorithm selection.",
      codeExamples: [
        {
          language: "java",
          code: `// O(1) - Constant Time
int getFirst(int[] arr) {
    return arr[0];
}

// O(n) - Linear Time
int findMax(int[] arr) {
    int max = arr[0];
    for(int num : arr) {
        if(num > max) max = num;
    }
    return max;
}

// O(n²) - Quadratic Time
void bubbleSort(int[] arr) {
    for(int i = 0; i < arr.length; i++) {
        for(int j = 0; j < arr.length-1; j++) {
            if(arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
          explanation: "Examples of different time complexities"
        }
      ]
    },
    {
      title: "Big-O Notation",
      content: "Big-O notation describes the upper bound of an algorithm's time complexity, focusing on growth rate as input size increases. It helps us compare algorithms and predict performance at scale.",
      codeExamples: [
        {
          language: "java",
          code: `// O(log n) - Logarithmic Time
int binarySearch(int[] sortedArray, int target) {
    int left = 0;
    int right = sortedArray.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (sortedArray[mid] == target) {
            return mid;
        } else if (sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}

// O(n log n) - Linearithmic Time
void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
          explanation: "Logarithmic and linearithmic time complexity examples"
        }
      ]
    }
  ],
  homework: [
    {
      id: "tc-1",
      question: "Analyze the time complexity of searching for an element in a sorted array using binary search vs linear search.",
      solution: "Binary Search: O(log n), Linear Search: O(n)"
    },
    {
      id: "tc-2",
      question: "What is the time complexity of inserting an element into an array at a specific index?",
      solution: "O(n) because in worst case, all elements after the insertion point need to be shifted."
    }
  ],
  quiz: [
    {
      id: "tc-q1",
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Array access by index is constant time O(1) because it directly computes the memory location."
    },
    {
      id: "tc-q2",
      question: "Which of these has the best time complexity for large inputs?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 3,
      explanation: "O(log n) grows much slower than the others as n increases, making it the most efficient."
    }
  ]
};

export default timeComplexityContent; 