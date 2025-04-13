import { Content } from '@/types/course';

const sortingVisualizationsContent: Content = {
  introduction: "Visualizing sorting algorithms is one of the best ways to understand how they work. This page provides interactive SVG animations for various sorting algorithms covered in our DSA course, helping you grasp the mechanics and differences between these important algorithms.",
  
  learningObjectives: [
    "Visualize key sorting algorithms through interactive animations",
    "Compare the different approaches used by various sorting algorithms",
    "Understand the mechanics of partition, merge, and swap operations",
    "Identify the efficiency patterns of different algorithms visually",
    "Connect theoretical algorithm concepts with visual representations"
  ],
  
  sections: [
    {
      title: "Visualizing Bubble Sort",
      content: `Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they're in the wrong order. The algorithm gets its name because smaller elements "bubble" to the top of the list.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Bubble Sort Animation</h4>
    <div class="flex justify-center">
      <img src="/images/bubble-sort-animation.svg" alt="Bubble Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation shows how elements are swapped pairwise until the entire array is sorted</p>
  </div>
</div>

**Key Characteristics:**
- Time Complexity: O(n²) in worst and average cases
- Space Complexity: O(1)
- Stable: Yes
- Adaptive: Yes, O(n) time when the array is already sorted
- Best Use: Small datasets or nearly sorted arrays`,
      codeExamples: []
    },
    {
      title: "Visualizing Selection Sort",
      content: `Selection Sort works by repeatedly finding the minimum element from the unsorted part of the array and placing it at the beginning. The algorithm divides the array into a sorted and an unsorted region.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Selection Sort Animation</h4>
    <div class="flex justify-center">
      <img src="/images/selection-sort-animation.svg" alt="Selection Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation demonstrates how Selection Sort scans for the minimum element in each pass</p>
  </div>
</div>

**Key Characteristics:**
- Time Complexity: O(n²) in all cases
- Space Complexity: O(1)
- Stable: No
- Adaptive: No
- Best Use: Small arrays where simplicity is valued over efficiency`,
      codeExamples: []
    },
    {
      title: "Visualizing Insertion Sort",
      content: `Insertion Sort builds the final sorted array one item at a time. It iterates through an array, consuming one element each repetition, and grows a sorted array behind it.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Insertion Sort Animation</h4>
    <div class="flex justify-center">
      <img src="/images/insertion-sort-animation.svg" alt="Insertion Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation shows how each element is inserted into its correct position in the sorted portion</p>
  </div>
</div>

**Key Characteristics:**
- Time Complexity: O(n²) in worst and average cases, O(n) in the best case
- Space Complexity: O(1)
- Stable: Yes
- Adaptive: Yes, performs better on partially sorted arrays
- Best Use: Small datasets and nearly sorted arrays; often used within Quick Sort and Merge Sort for small subarrays`,
      codeExamples: []
    },
    {
      title: "Visualizing Merge Sort",
      content: `Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Merge Sort Animation</h4>
    <div class="flex justify-center">
      <img src="/images/merge-sort-animation.svg" alt="Merge Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation demonstrates the recursive division and merging process</p>
  </div>
</div>

**Key Characteristics:**
- Time Complexity: O(n log n) in all cases
- Space Complexity: O(n)
- Stable: Yes
- Adaptive: No (without modifications)
- Best Use: Large datasets when stability is important; linked lists; external sorting`,
      codeExamples: []
    },
    {
      title: "Visualizing Quick Sort",
      content: `Quick Sort selects a 'pivot' element and partitions the array around it, with elements less than the pivot on the left and elements greater than the pivot on the right. It then recursively sorts the sub-arrays.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Quick Sort Animation</h4>
    <div class="flex justify-center">
      <img src="/images/quick-sort-animation.svg" alt="Quick Sort Animation" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">This animation shows the pivot selection and partitioning process</p>
  </div>
</div>

**Key Characteristics:**
- Time Complexity: O(n log n) average, O(n²) worst case
- Space Complexity: O(log n) average case
- Stable: No (without modifications)
- Adaptive: No (without modifications)
- Best Use: Large datasets when average case performance matters more than worst case; when in-memory sorting is required`,
      codeExamples: []
    },
    {
      title: "Comparing Sorting Algorithms",
      content: `Different sorting algorithms have different strengths and weaknesses. This comparison helps you choose the most appropriate algorithm for your specific use case.

<div class="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
  <h4 class="font-bold mb-3 text-center text-gray-800 dark:text-gray-200">Sorting Algorithm Comparison</h4>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
        <tr>
          <th class="px-4 py-2 text-left">Algorithm</th>
          <th class="px-4 py-2 text-left">Best Case</th>
          <th class="px-4 py-2 text-left">Average Case</th>
          <th class="px-4 py-2 text-left">Worst Case</th>
          <th class="px-4 py-2 text-left">Space</th>
          <th class="px-4 py-2 text-left">Stable</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white dark:bg-gray-800 border-b">
          <td class="px-4 py-2 font-medium">Bubble Sort</td>
          <td class="px-4 py-2">O(n)</td>
          <td class="px-4 py-2 text-yellow-600 dark:text-yellow-400">O(n²)</td>
          <td class="px-4 py-2 text-red-600 dark:text-red-400">O(n²)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(1)</td>
          <td class="px-4 py-2">Yes</td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 border-b">
          <td class="px-4 py-2 font-medium">Selection Sort</td>
          <td class="px-4 py-2 text-yellow-600 dark:text-yellow-400">O(n²)</td>
          <td class="px-4 py-2 text-yellow-600 dark:text-yellow-400">O(n²)</td>
          <td class="px-4 py-2 text-red-600 dark:text-red-400">O(n²)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(1)</td>
          <td class="px-4 py-2">No</td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 border-b">
          <td class="px-4 py-2 font-medium">Insertion Sort</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n)</td>
          <td class="px-4 py-2 text-yellow-600 dark:text-yellow-400">O(n²)</td>
          <td class="px-4 py-2 text-red-600 dark:text-red-400">O(n²)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(1)</td>
          <td class="px-4 py-2">Yes</td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 border-b">
          <td class="px-4 py-2 font-medium">Merge Sort</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n log n)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n log n)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n log n)</td>
          <td class="px-4 py-2 text-yellow-600 dark:text-yellow-400">O(n)</td>
          <td class="px-4 py-2">Yes</td>
        </tr>
        <tr class="bg-white dark:bg-gray-800">
          <td class="px-4 py-2 font-medium">Quick Sort</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n log n)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(n log n)</td>
          <td class="px-4 py-2 text-red-600 dark:text-red-400">O(n²)</td>
          <td class="px-4 py-2 text-green-600 dark:text-green-400">O(log n)</td>
          <td class="px-4 py-2">No</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
      codeExamples: []
    }
  ],
  
  homework: [
    {
      id: "sv-1",
      question: "Compare the visual patterns in Bubble Sort and Selection Sort animations. What are the key differences in how these algorithms approach sorting, and how is this reflected in the animations?",
      solution: "The Bubble Sort animation shows elements being swapped pairwise as the algorithm makes passes through the array, with larger elements 'bubbling up' to their correct positions. Each pass ensures the largest unsorted element reaches its final position.\n\nIn contrast, the Selection Sort animation shows how the algorithm scans the entire unsorted portion to find the minimum element, then places it at the beginning of the unsorted section. The visual pattern in Selection Sort shows fewer overall swaps but more comparisons.\n\nThese differences reflect the fundamental approaches: Bubble Sort works by repeatedly making local decisions (adjacent comparisons and swaps), while Selection Sort makes global decisions (finding the minimum in the entire unsorted portion)."
    },
    {
      id: "sv-2",
      question: "Based on the visualizations, explain why Merge Sort and Quick Sort are generally more efficient than simpler algorithms like Bubble Sort for large datasets.",
      solution: "The animations reveal that Merge Sort and Quick Sort follow a divide-and-conquer approach, breaking the problem into smaller subproblems that can be solved independently and then combined.\n\nIn the Merge Sort visualization, we see the array being recursively divided until individual elements are reached, then merged back in sorted order. This logarithmic division pattern is what gives Merge Sort its O(n log n) complexity.\n\nFor Quick Sort, the animation demonstrates how partitioning around a pivot element allows large portions of the array to be sorted independently. This divide-and-conquer approach reduces the total number of comparisons needed.\n\nIn contrast, Bubble Sort's animation shows that it must make multiple passes through the entire array, comparing adjacent elements, which results in O(n²) time complexity as each element potentially needs to be compared with every other element."
    }
  ],
  
  quiz: [
    {
      id: "sv-q1",
      question: "Which sorting algorithm would be most efficient for an array that is already nearly sorted?",
      options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation: "Insertion Sort performs exceptionally well on nearly sorted arrays, approaching O(n) time complexity in such cases. This is because with few elements out of order, most elements will not need to move far from their original positions. The animation demonstrates how Insertion Sort builds the sorted portion incrementally, which becomes very efficient when most elements are already close to their final positions."
    },
    {
      id: "sv-q2",
      question: "Based on the animations, which sorting algorithm demonstrates a clear divide-and-conquer approach?",
      options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"],
      correctAnswer: 3,
      explanation: "The Merge Sort animation clearly demonstrates the divide-and-conquer approach, visually showing how the array is recursively divided into smaller subarrays until individual elements are reached, and then merged back together in sorted order. This visual pattern of dividing and combining is the hallmark of divide-and-conquer algorithms."
    },
    {
      id: "sv-q3",
      question: "Which sorting algorithm is NOT stable based on the visualizations and accompanying information?",
      options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Merge Sort"],
      correctAnswer: 2,
      explanation: "Quick Sort is not stable in its standard implementation, as shown in the animation. During the partitioning process, elements equal to the pivot may not maintain their original relative order. In contrast, Bubble Sort, Insertion Sort, and Merge Sort preserve the relative order of equal elements, making them stable sorting algorithms."
    }
  ]
};

export default sortingVisualizationsContent; 