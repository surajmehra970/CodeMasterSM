import { Content } from '@/types/course';

const timeComplexityContent: Content = {
  introduction: "Understanding time complexity is crucial for writing efficient algorithms. It helps us analyze how an algorithm's performance scales with input size and make informed decisions when choosing between different approaches.",
  learningObjectives: [
    "Understand Big-O notation and its importance in algorithm analysis",
    "Compare and analyze time complexity of common algorithms",
    "Identify the best algorithm for specific scenarios based on complexity",
    "Recognize space-time complexity trade-offs in algorithm design"
  ],
  sections: [
    {
      title: "Introduction to Time Complexity",
      content: `Time complexity measures how the runtime of an algorithm grows with input size. It helps us understand the scalability of our code and make informed decisions about algorithm selection.

<div class="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg shadow-sm"><h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Why Time Complexity Matters</h4><p class="text-gray-800 dark:text-gray-200">Imagine sorting 10 vs 10 million elements. A poorly chosen algorithm might take seconds vs weeks!</p><div class="mt-3 flex justify-center"><img src="/images/time-complexity-growth.svg" alt="Time Complexity Growth Chart" class="w-full max-w-md h-auto rounded-lg shadow-md" loading="eager" /></div></div>

As input size increases, even small differences in algorithm efficiency can result in dramatic performance differences. The graph above shows how different Big-O complexity classes scale - notice how O(n²) quickly becomes impractical for large inputs.`,
      codeExamples: [
        {
          language: "java",
          code: `// O(1) - Constant Time ⚡️
int getFirst(int[] arr) {
    return arr[0]; // Always one operation, regardless of array size
}

// O(n) - Linear Time 📈
int findMax(int[] arr) {
    int max = arr[0];
    for(int num : arr) { // Loops through each element once
        if(num > max) max = num;
    }
    return max;
}

// O(n²) - Quadratic Time ⏱️
void bubbleSort(int[] arr) {
    for(int i = 0; i < arr.length; i++) {
        for(int j = 0; j < arr.length-1; j++) { // Nested loops = quadratic
            if(arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
          explanation: "Examples of different time complexities with their real-world performance implications. Notice how nested loops result in quadratic time complexity."
        }
      ]
    },
    {
      title: "Quadratic Complexity Visualized",
      content: `The O(n²) time complexity of algorithms like Bubble Sort can be visually demonstrated. This animation shows why nested loops result in quadratic growth of operations as input size increases.

<div class="my-8"><div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"><div class="p-6"><h4 class="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Bubble Sort O(n²) Visualization</h4><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"><iframe src="/images/bubble-sort-animation.svg" title="Bubble Sort Animation" class="w-full h-full border-0" style="min-height:400px; background-color:#fff; width:100%;" loading="eager"></iframe></div><p class="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">This animation shows how Bubble Sort makes multiple passes through the array, with each element potentially compared to every other element. Click the "Restart" button to replay.</p></div></div></div>

The nested loops in quadratic algorithms like Bubble Sort create a multiplicative effect: if the input size doubles, the running time quadruples. This is why quadratic algorithms become impractical for large inputs.`,
      codeExamples: []
    },
    {
      title: "Big-O Notation Explained",
      content: `Big-O notation describes the upper bound of an algorithm's time complexity, focusing on growth rate as input size increases. It helps us compare algorithms and predict performance at scale.

<div class="my-6 flex justify-center"><div class="w-full max-w-lg border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md"><div class="p-4"><h3 class="text-center font-bold mb-4 text-gray-800 dark:text-gray-200">Common Time Complexities</h3><div class="grid grid-cols-2 gap-3 w-full"><div class="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"><span class="text-green-600 dark:text-green-400 font-mono mr-2">O(1)</span><span class="text-sm text-gray-700 dark:text-gray-300">Constant</span></div><div class="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><span class="text-blue-600 dark:text-blue-400 font-mono mr-2">O(log n)</span><span class="text-sm text-gray-700 dark:text-gray-300">Logarithmic</span></div><div class="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><span class="text-purple-600 dark:text-purple-400 font-mono mr-2">O(n)</span><span class="text-sm text-gray-700 dark:text-gray-300">Linear</span></div><div class="flex items-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><span class="text-indigo-600 dark:text-indigo-400 font-mono mr-2">O(n log n)</span><span class="text-sm text-gray-700 dark:text-gray-300">Linearithmic</span></div><div class="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><span class="text-yellow-600 dark:text-yellow-400 font-mono mr-2">O(n²)</span><span class="text-sm text-gray-700 dark:text-gray-300">Quadratic</span></div><div class="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"><span class="text-red-600 dark:text-red-400 font-mono mr-2">O(2ⁿ)</span><span class="text-sm text-gray-700 dark:text-gray-300">Exponential</span></div></div></div></div></div></div>

<div class="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg shadow-sm"><h4 class="font-bold text-yellow-700 dark:text-yellow-300 mb-2">🔍 Big-O Simplification Rules</h4><ul class="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-200"><li>Drop constants: O(2n) → O(n)</li><li>Drop lower-order terms: O(n² + n) → O(n²)</li><li>Focus on worst-case scenario</li></ul></div>

When analyzing algorithms, we focus on the dominant term because as input size grows, that term will have the most significant impact on performance.`,
      codeExamples: [
        {
          language: "java",
          code: `// O(log n) - Logarithmic Time 🔍
int binarySearch(int[] sortedArray, int target) {
    int left = 0;
    int right = sortedArray.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (sortedArray[mid] == target) {
            return mid; // Found the target
        } else if (sortedArray[mid] < target) {
            left = mid + 1; // Search in right half
        } else {
            right = mid - 1; // Search in left half
        }
    }
    
    return -1; // Element not found
}

// O(n log n) - Linearithmic Time ⚖️
void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);      // Sort left half
        mergeSort(arr, mid + 1, right); // Sort right half
        merge(arr, left, mid, right);   // Merge sorted halves
    }
}`,
          explanation: "Logarithmic algorithms like binary search cut the problem size in half with each step. Merge sort combines the efficiency of divide-and-conquer with the need to process all elements at least once."
        }
      ]
    },
    {
      title: "Algorithm Comparison Visualized",
      content: `Let's visualize how different algorithms perform as input size increases. This helps us understand why choosing the right algorithm is critical for large-scale applications.

<div class="my-4"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"><div class="p-4"><h4 class="text-lg font-semibold text-center mb-3 text-gray-800 dark:text-gray-200">Algorithm Performance Comparison</h4><div class="overflow-x-auto"><table class="min-w-full text-sm border-collapse"><thead class="bg-gray-50 dark:bg-gray-700"><tr><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Algorithm</th><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Complexity</th><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">n=10</th><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">n=100</th><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">n=1,000</th><th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">n=1M</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"><tr class="hover:bg-gray-50 dark:hover:bg-gray-750"><td class="px-3 py-2 font-medium">Constant</td><td class="px-3 py-2 font-mono text-sm">O(1)</td><td class="px-3 py-2 text-green-600 dark:text-green-400">1</td><td class="px-3 py-2 text-green-600 dark:text-green-400">1</td><td class="px-3 py-2 text-green-600 dark:text-green-400">1</td><td class="px-3 py-2 text-green-600 dark:text-green-400">1</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-750"><td class="px-3 py-2 font-medium">Binary Search</td><td class="px-3 py-2 font-mono text-sm">O(log n)</td><td class="px-3 py-2 text-green-600 dark:text-green-400">3</td><td class="px-3 py-2 text-green-600 dark:text-green-400">7</td><td class="px-3 py-2 text-green-600 dark:text-green-400">10</td><td class="px-3 py-2 text-green-600 dark:text-green-400">20</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-750"><td class="px-3 py-2 font-medium">Linear Search</td><td class="px-3 py-2 font-mono text-sm">O(n)</td><td class="px-3 py-2 text-green-600 dark:text-green-400">10</td><td class="px-3 py-2 text-green-600 dark:text-green-400">100</td><td class="px-3 py-2 text-yellow-600 dark:text-yellow-400">1K</td><td class="px-3 py-2 text-red-600 dark:text-red-400">1M</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-750"><td class="px-3 py-2 font-medium">Merge Sort</td><td class="px-3 py-2 font-mono text-sm">O(n log n)</td><td class="px-3 py-2 text-green-600 dark:text-green-400">33</td><td class="px-3 py-2 text-yellow-600 dark:text-yellow-400">664</td><td class="px-3 py-2 text-yellow-600 dark:text-yellow-400">10K</td><td class="px-3 py-2 text-red-600 dark:text-red-400">20M</td></tr><tr class="hover:bg-gray-50 dark:hover:bg-gray-750"><td class="px-3 py-2 font-medium">Bubble Sort</td><td class="px-3 py-2 font-mono text-sm">O(n²)</td><td class="px-3 py-2 text-green-600 dark:text-green-400">100</td><td class="px-3 py-2 text-yellow-600 dark:text-yellow-400">10K</td><td class="px-3 py-2 text-red-600 dark:text-red-400">1M</td><td class="px-3 py-2 text-red-600 dark:text-red-400">10¹²</td></tr></tbody></table></div></div></div></div>

<div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"><div class="p-6"><h4 class="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Bubble Sort (O(n²))</h4><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"><iframe src="/images/bubble-sort-animation.svg" title="Bubble Sort Animation" class="w-full h-full border-0" style="min-height:300px; background-color:#fff; width:100%;" loading="eager"></iframe></div><p class="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">O(n²) complexity from nested loops</p></div></div><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"><div class="p-6"><h4 class="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Insertion Sort (O(n²))</h4><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"><iframe src="/images/insertion-sort-animation.svg" title="Insertion Sort Animation" class="w-full h-full border-0" style="min-height:300px; background-color:#fff; width:100%;" loading="eager"></iframe></div><p class="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">Efficient for small or nearly sorted arrays</p></div></div></div>

<div class="my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg shadow-sm"><h4 class="font-bold text-green-700 dark:text-green-300 mb-2">🚀 Pro Tip: Algorithm Selection</h4><p class="text-gray-800 dark:text-gray-200">For small inputs (n < 100), algorithm choice often doesn't matter much. For large inputs, the right algorithm can be the difference between milliseconds and hours of processing time.</p></div>

Understanding these differences helps you make informed decisions when designing and optimizing your code.`,
      codeExamples: [
        {
          language: "java",
          code: `// Real-world application: Finding an item in a collection
// Two approaches with different complexity

// Approach 1: Using HashMap (O(1) lookup)
public boolean containsItemOptimized(String item) {
    Map<String, Boolean> itemMap = new HashMap<>();
    // Assume we've added all items to the map
    return itemMap.containsKey(item); // O(1) constant time
}

// Approach 2: Using Array (O(n) lookup)
public boolean containsItemNaive(String item) {
    String[] items = getItems();
    for (String i : items) {
        if (i.equals(item)) {
            return true;
        }
    }
    return false; // O(n) linear time
}

// For 1 million items, the HashMap approach could be
// thousands of times faster than the array approach!`,
          explanation: "This example demonstrates how data structure choice directly impacts algorithm efficiency. For frequent lookups, a HashMap's O(1) performance dramatically outperforms a linear search's O(n) time."
        }
      ]
    },
    {
      title: "Interactive Complexity Explorer",
      content: `Let's explore how different algorithms scale with input size. Use this interactive guide to understand the practical implications of time complexity.

<div class="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg shadow-sm"><h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">💻 Try It Yourself!</h4><p class="text-gray-800 dark:text-gray-200">When implementing and testing algorithms, always:</p><ul class="list-disc pl-5 mt-2 space-y-1 text-gray-800 dark:text-gray-200"><li>Start with a correct but simple solution</li><li>Analyze its time complexity</li><li>If performance is inadequate, look for more efficient algorithms</li><li>Benchmark with realistic data sizes</li></ul><p class="mt-3 text-sm italic text-gray-700 dark:text-gray-300">Remember: Premature optimization is the root of all evil, but choosing the right algorithm from the start isn't optimization—it's good engineering.</p></div>

<div class="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h4 class="font-bold mb-4">Common Time Complexities</h4><div class="grid grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-900 p-3 rounded-md shadow-sm"><h5 class="font-medium mb-2 text-blue-700 dark:text-blue-300 border-b pb-1">Data Structures</h5><table class="w-full"><tbody><tr><td><code class="text-green-600 dark:text-green-400">O(1)</code></td><td>Array access, HashMap lookup</td></tr><tr><td><code class="text-blue-600 dark:text-blue-400">O(log n)</code></td><td>Binary search tree operations</td></tr><tr><td><code class="text-yellow-600 dark:text-yellow-400">O(n)</code></td><td>Linear search, array insertion</td></tr></tbody></table></div><div class="bg-white dark:bg-gray-900 p-3 rounded-md shadow-sm"><h5 class="font-medium mb-2 text-purple-700 dark:text-purple-300 border-b pb-1">Sorting</h5><table class="w-full"><tbody><tr><td><code class="text-yellow-600 dark:text-yellow-400">O(n log n)</code></td><td>Merge sort, Quicksort</td></tr><tr><td><code class="text-red-600 dark:text-red-400">O(n²)</code></td><td>Bubble sort, Insertion sort</td></tr><tr><td><code class="text-green-600 dark:text-green-400">O(n)</code></td><td>Counting sort</td></tr></tbody></table></div></div></div>
</div>`,
      codeExamples: []
    }
  ],
  homework: [
    {
      id: "tc-1",
      question: "Analyze the time complexity of searching for an element in a sorted array using binary search vs linear search. For what input sizes would you prefer one over the other?",
      solution: `Binary Search: O(log n), Linear Search: O(n)

For almost any meaningful input size (n > 20), binary search will be faster than linear search. The advantages become exponentially more significant as the input size grows:

\`\`\`java
// For an array of 1,000,000 elements:
// Binary search requires at most ~20 comparisons
// Linear search requires up to 1,000,000 comparisons

// However, binary search requires a sorted array. If the array
// is unsorted and used only once, sorting (O(n log n)) + binary search
// is less efficient than a single linear search.

// Rule of thumb: If you'll search multiple times in the same data,
// it's worth sorting first and using binary search.
\`\`\`

This demonstrates why understanding time complexity helps make better engineering decisions.`
    },
    {
      id: "tc-2",
      question: "What is the time complexity of inserting an element into an array at a specific index? How could you optimize this operation?",
      solution: `Inserting at a specific index in an array has O(n) time complexity in the worst case, because all elements after the insertion point need to be shifted.

\`\`\`java
// Standard array insertion (creating a new array)
int[] insertAt(int[] array, int index, int value) {
    int[] result = new int[array.length + 1];
    
    // Copy elements before index
    for (int i = 0; i < index; i++) {
        result[i] = array[i];
    }
    
    // Insert new element
    result[index] = value;
    
    // Copy elements after index (shifted by 1)
    for (int i = index; i < array.length; i++) {
        result[i + 1] = array[i];
    }
    
    return result;
}
\`\`\`

Optimizations:
1. Use ArrayList or LinkedList in Java for frequent insertions
2. If insertions happen predominantly at the end, use an array-based stack (amortized O(1))
3. If insertions happen predominantly at the beginning, consider a deque or linked list
4. For random access insertions, a balanced tree structure might be better

Data structure selection should be based on the most common operations in your specific use case.`
    }
  ],
  quiz: [
    {
      id: "tc-q1",
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Array access by index is constant time O(1) because it directly computes the memory location using the formula: baseAddress + (index * elementSize). This calculation takes the same amount of time regardless of the array size."
    },
    {
      id: "tc-q2",
      question: "Which of these has the best time complexity for large inputs?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 3,
      explanation: "O(log n) grows much slower than the others as n increases, making it the most efficient. For example, when n=1,000,000, log n is approximately 20, whereas n is 1,000,000, n log n is about 20,000,000, and n² is 10¹². This exponential difference is why logarithmic algorithms are preferred for large datasets."
    },
    {
      id: "tc-q3",
      question: "What is the time complexity of the following code snippet?\n\nfor(int i=0; i<n; i++) {\n  for(int j=0; j<n; j++) {\n    if(i == j) {\n      System.out.println(i);\n    }\n  }\n}",
      options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: 3,
      explanation: "This code has two nested loops, each iterating n times, resulting in n*n = n² operations. Even though the inner operation (the print statement) only executes n times total (when i==j), we still have to perform n² comparisons. The time complexity is dominated by the nested loops, making it O(n²)."
    }
  ]
};

export default timeComplexityContent; 