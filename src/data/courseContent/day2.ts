import { Content } from '@/types/course';

const bitManipulationContent: Content = {
  introduction: "Bit manipulation involves working with individual bits in numbers to perform operations efficiently. Many problems can be solved more elegantly and with better performance using bitwise operations.",
  learningObjectives: [
    "Understand bitwise operators (AND, OR, XOR, NOT, shifts)",
    "Learn common bit manipulation techniques",
    "Solve bit manipulation problems",
    "Optimize code using bit operations"
  ],
  sections: [
    {
      title: "Basic Bit Operations",
      content: "Bit manipulation uses operators like AND (&), OR (|), XOR (^), NOT (~), and shifts (<<, >>) to work with individual bits. These operations are often much faster than arithmetic operations.",
      codeExamples: [
        {
          language: "java",
          code: `// Check if number is even/odd
boolean isEven(int n) {
    return (n & 1) == 0;
}

// Get bit at position i
boolean getBit(int num, int i) {
    return (num & (1 << i)) != 0;
}

// Set bit at position i
int setBit(int num, int i) {
    return num | (1 << i);
}

// Clear bit at position i
int clearBit(int num, int i) {
    return num & ~(1 << i);
}`,
          explanation: "Common bit manipulation operations"
        }
      ]
    },
    {
      title: "Advanced Bit Manipulation Techniques",
      content: "These techniques are commonly used in competitive programming and technical interviews to solve various problems efficiently.",
      codeExamples: [
        {
          language: "java",
          code: `// Count number of set bits (Brian Kernighan's Algorithm)
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);  // Clear the least significant set bit
        count++;
    }
    return count;
}

// Check if number is a power of 2
boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Flip bits (XOR with 1 flips a bit)
int flipBits(int n, int positions) {
    return n ^ positions;
}

// Find the rightmost set bit
int rightmostSetBit(int n) {
    return n & -n;
}`,
          explanation: "Advanced bit manipulation techniques used in algorithms"
        }
      ]
    }
  ],
  homework: [
    {
      id: "bit-1",
      question: "Write a function to count the number of set bits (1s) in an integer.",
      solution: "Use Brian Kernighan's algorithm: n & (n-1) to clear rightmost set bit"
    },
    {
      id: "bit-2",
      question: "Implement a function to swap two numbers without using a temporary variable.",
      solution: "Use XOR: a ^= b; b ^= a; a ^= b;"
    }
  ],
  quiz: [
    {
      id: "bit-q1",
      question: "What is the result of 5 & 3?",
      options: ["1", "7", "8", "0"],
      correctAnswer: 0,
      explanation: "5 (101) & 3 (011) = 001 (1 in decimal)"
    },
    {
      id: "bit-q2", 
      question: "Which operation can be used to quickly multiply a number by 2?",
      options: ["n & 1", "n | 2", "n << 1", "n >> 1"],
      correctAnswer: 2,
      explanation: "Left shift (<<) by 1 multiplies a number by 2."
    }
  ],
  practice: {
    introduction: "Practice is essential to master bit manipulation. Complete the following LeetCode problems to reinforce your understanding of bitwise operations and techniques.",
    questions: {
      easy: [
        {
          id: "e1",
          title: "Number of 1 Bits",
          link: "https://leetcode.com/problems/number-of-1-bits/",
          description: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight)."
        },
        {
          id: "e2",
          title: "Single Number",
          link: "https://leetcode.com/problems/single-number/",
          description: "Given a non-empty array of integers, every element appears twice except for one. Find that single one using bit manipulation."
        },
        {
          id: "e3",
          title: "Power of Two",
          link: "https://leetcode.com/problems/power-of-two/",
          description: "Determine if a given integer is a power of two using bit manipulation."
        },
        {
          id: "e4",
          title: "Reverse Bits",
          link: "https://leetcode.com/problems/reverse-bits/",
          description: "Reverse bits of a given 32 bits unsigned integer."
        }
      ],
      medium: [
        {
          id: "m1",
          title: "Single Number III",
          link: "https://leetcode.com/problems/single-number-iii/",
          description: "Given an array where all numbers appear twice except two numbers, find those two numbers using bit manipulation."
        },
        {
          id: "m2",
          title: "Counting Bits",
          link: "https://leetcode.com/problems/counting-bits/",
          description: "Given an integer n, return an array of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i."
        },
        {
          id: "m3",
          title: "Subsets",
          link: "https://leetcode.com/problems/subsets/",
          description: "Generate all possible subsets of a set using bit manipulation."
        },
        {
          id: "m4",
          title: "Sum of Two Integers",
          link: "https://leetcode.com/problems/sum-of-two-integers/",
          description: "Calculate the sum of two integers without using the + and - operators. Use bit manipulation instead."
        }
      ],
      hard: [
        {
          id: "h1",
          title: "Maximum XOR of Two Numbers in an Array",
          link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
          description: "Find the maximum result of ai XOR aj, where 0 ≤ i, j < n. Solve with bit manipulation optimization."
        },
        {
          id: "h2",
          title: "Minimum Number of Flips to Make a OR b Equal to c",
          link: "https://leetcode.com/problems/minimum-number-of-flips-to-make-a-or-b-equal-to-c/",
          description: "Find the minimum number of bit flips required to make a OR b equal to c."
        }
      ]
    }
  }
};

export default bitManipulationContent; 