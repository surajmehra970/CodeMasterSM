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
  ]
};

export default bitManipulationContent; 