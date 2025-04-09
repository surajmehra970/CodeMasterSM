import { Content } from '@/types/course';

const stackBasicsContent: Content = {
  introduction: "A stack is a fundamental data structure that follows the Last-In-First-Out (LIFO) principle. This means the last element added to the stack is the first one to be removed. Think of it like a stack of plates: you can only take the top plate, and you add new plates to the top. Stacks are used in various applications including function call management (the call stack), expression evaluation, backtracking algorithms, and undo mechanisms in applications.",
  
  learningObjectives: [
    "Understand the stack data structure and its LIFO (Last-In-First-Out) principle",
    "Implement a stack using arrays and linked lists",
    "Apply stacks to solve common problems like balanced parentheses, infix to postfix conversion",
    "Recognize problems that can be efficiently solved using stacks"
  ],
  
  sections: [
    {
      title: "Stack Implementation",
      content: "There are primarily two ways to implement a stack: using arrays or using linked lists. Each has its advantages: array-based implementations have better memory locality but fixed size (unless using dynamic arrays), while linked list implementations allow for dynamic sizing but have slightly higher overhead per element.",
      codeExamples: [
        {
          language: "java",
          code: `// Array-based Stack implementation
class ArrayStack {
    private int[] array;
    private int top;
    private int capacity;
    
    // Constructor to initialize the stack
    public ArrayStack(int capacity) {
        this.array = new int[capacity];
        this.capacity = capacity;
        this.top = -1;
    }
    
    // Push operation to add an element
    public void push(int item) {
        if (isFull()) {
            throw new RuntimeException("Stack overflow");
        }
        array[++top] = item;
    }
    
    // Pop operation to remove the top element
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        return array[top--];
    }
    
    // Peek operation to get the top element without removing
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return array[top];
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }
    
    // Check if stack is full
    public boolean isFull() {
        return top == capacity - 1;
    }
    
    // Get size of stack
    public int size() {
        return top + 1;
    }
}`,
          explanation: "This is an array-based implementation of a stack. It maintains a 'top' pointer that points to the index of the top element. Push, pop, and peek operations all have O(1) time complexity."
        },
        {
          language: "java",
          code: `// Linked list-based Stack implementation
class Node {
    int data;
    Node next;
    
    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    private Node top;
    private int size;
    
    // Constructor
    public LinkedListStack() {
        this.top = null;
        this.size = 0;
    }
    
    // Push operation to add an element
    public void push(int data) {
        Node newNode = new Node(data);
        newNode.next = top;
        top = newNode;
        size++;
    }
    
    // Pop operation to remove the top element
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        int data = top.data;
        top = top.next;
        size--;
        return data;
    }
    
    // Peek operation to get the top element without removing
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return top.data;
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return top == null;
    }
    
    // Get size of stack
    public int size() {
        return size;
    }
}`,
          explanation: "This is a linked list-based implementation of a stack. New elements are added to the head of the linked list (top of the stack), and elements are removed from the head as well. This implementation doesn't have a size limit like the array-based one."
        }
      ]
    },
    {
      title: "Using Java's Stack Class and Alternatives",
      content: "Java provides a built-in Stack class in the java.util package, but it's generally recommended to use more modern alternatives like ArrayDeque or LinkedList that implement the Deque interface, which provides stack operations. Let's see how to use both.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Stack;
import java.util.Deque;
import java.util.ArrayDeque;

public class StackDemo {
    public static void main(String[] args) {
        // Using Java's built-in Stack class
        Stack<Integer> stack1 = new Stack<>();
        stack1.push(10);
        stack1.push(20);
        stack1.push(30);
        
        System.out.println("Top element: " + stack1.peek());
        System.out.println("Popped element: " + stack1.pop());
        System.out.println("Stack size: " + stack1.size());
        
        // Using ArrayDeque as a stack (preferred approach)
        Deque<Integer> stack2 = new ArrayDeque<>();
        stack2.push(10);
        stack2.push(20);
        stack2.push(30);
        
        System.out.println("Top element: " + stack2.peek());
        System.out.println("Popped element: " + stack2.pop());
        System.out.println("Stack size: " + stack2.size());
    }
}`,
          explanation: "This example demonstrates both Java's Stack class and the more modern ArrayDeque used as a stack. Both support the same basic operations: push, pop, and peek. The Deque interface used with ArrayDeque is generally preferred for stack operations as it has better performance and more consistent methods."
        }
      ]
    },
    {
      title: "Common Stack Applications",
      content: "Stacks are used in many different contexts. Some common applications include checking for balanced parentheses in expressions, implementing undo functionality, expression evaluation (infix to postfix conversion), and backtracking algorithms.",
      codeExamples: [
        {
          language: "java",
          code: `import java.util.Deque;
import java.util.ArrayDeque;

public class BalancedParentheses {
    public static boolean isBalanced(String expression) {
        Deque<Character> stack = new ArrayDeque<>();
        
        for (char ch : expression.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else if (ch == ')' || ch == ']' || ch == '}') {
                if (stack.isEmpty()) {
                    return false;
                }
                
                char top = stack.pop();
                
                if ((ch == ')' && top != '(') || 
                    (ch == ']' && top != '[') || 
                    (ch == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    public static void main(String[] args) {
        System.out.println(isBalanced("({[]})")); // true
        System.out.println(isBalanced("({[})")); // false
        System.out.println(isBalanced("({[]})[]{}")); // true
    }
}`,
          explanation: "This example demonstrates how to use a stack to check if an expression has balanced parentheses. The algorithm pushes opening brackets onto the stack and pops when it encounters closing brackets, checking if they match. If the stack is empty at the end, the expression is balanced."
        },
        {
          language: "java",
          code: `import java.util.Deque;
import java.util.ArrayDeque;

public class InfixToPostfix {
    public static int precedence(char operator) {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
        }
        return -1;
    }
    
    public static String infixToPostfix(String expression) {
        StringBuilder result = new StringBuilder();
        Deque<Character> stack = new ArrayDeque<>();
        
        for (int i = 0; i < expression.length(); i++) {
            char ch = expression.charAt(i);
            
            // If the character is an operand, add it to result
            if (Character.isLetterOrDigit(ch)) {
                result.append(ch);
            }
            // If the character is '(', push it to stack
            else if (ch == '(') {
                stack.push(ch);
            }
            // If the character is ')', pop from stack until '(' is found
            else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                
                if (!stack.isEmpty() && stack.peek() == '(') {
                    stack.pop(); // Remove '(' from stack
                }
            }
            // If the character is an operator
            else {
                while (!stack.isEmpty() && precedence(ch) <= precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(ch);
            }
        }
        
        // Pop all the remaining operators from the stack
        while (!stack.isEmpty()) {
            if (stack.peek() == '(') {
                return "Invalid Expression";
            }
            result.append(stack.pop());
        }
        
        return result.toString();
    }
    
    public static void main(String[] args) {
        String expression = "a+b*(c^d-e)^(f+g*h)-i";
        System.out.println(infixToPostfix(expression));
        // Output: abcd^e-fgh*+^*+i-
    }
}`,
          explanation: "This example shows how to convert an infix expression (e.g., a+b*c) to a postfix expression (e.g., abc*+) using a stack. The algorithm uses the stack to track operators and their precedence, building the postfix expression character by character."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "stack-hw-1",
      question: "Implement a MinStack which supports push, pop, top, and retrieving the minimum element with O(1) time complexity for all operations.",
      solution: "```java\nimport java.util.Stack;\n\nclass MinStack {\n    private Stack<Integer> stack;\n    private Stack<Integer> minStack;\n    \n    public MinStack() {\n        stack = new Stack<>();\n        minStack = new Stack<>();\n    }\n    \n    public void push(int val) {\n        stack.push(val);\n        \n        // If minStack is empty or new value is less than or equal to current min,\n        // push to minStack\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n    \n    public void pop() {\n        if (stack.isEmpty()) return;\n        \n        // If the value being popped is the current minimum, pop from minStack too\n        if (stack.peek().equals(minStack.peek())) {\n            minStack.pop();\n        }\n        \n        stack.pop();\n    }\n    \n    public int top() {\n        if (stack.isEmpty()) throw new RuntimeException(\"Stack is empty\");\n        return stack.peek();\n    }\n    \n    public int getMin() {\n        if (minStack.isEmpty()) throw new RuntimeException(\"Stack is empty\");\n        return minStack.peek();\n    }\n}\n```\nThis solution uses two stacks: one to store all elements and another to keep track of the minimum values. When pushing a new element, it's also pushed to the minStack if it's smaller than or equal to the current minimum. When popping, we check if the popped element is the current minimum, and if so, we also pop from the minStack."
    },
    {
      id: "stack-hw-2",
      question: "Evaluate a postfix expression using a stack. For example, the postfix expression \"23+4*\" should evaluate to 20 ((2+3)*4).",
      solution: "```java\nimport java.util.Deque;\nimport java.util.ArrayDeque;\n\npublic class PostfixEvaluation {\n    public static int evaluatePostfix(String expression) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        \n        for (int i = 0; i < expression.length(); i++) {\n            char ch = expression.charAt(i);\n            \n            // If character is a digit, push it to the stack\n            if (Character.isDigit(ch)) {\n                stack.push(ch - '0'); // Convert char to int\n            }\n            // If character is an operator, pop two values, apply operator, push result\n            else {\n                int val1 = stack.pop();\n                int val2 = stack.pop();\n                \n                switch (ch) {\n                    case '+':\n                        stack.push(val2 + val1);\n                        break;\n                    case '-':\n                        stack.push(val2 - val1);\n                        break;\n                    case '*':\n                        stack.push(val2 * val1);\n                        break;\n                    case '/':\n                        stack.push(val2 / val1);\n                        break;\n                }\n            }\n        }\n        \n        return stack.pop();\n    }\n    \n    public static void main(String[] args) {\n        String expression = \"23+4*\";\n        System.out.println(evaluatePostfix(expression)); // Output: 20\n    }\n}\n```\nThis solution processes each character in the postfix expression. Digits are pushed onto the stack, and when an operator is encountered, the top two values are popped, the operation is performed, and the result is pushed back onto the stack. The final value on the stack is the result of the expression."
    }
  ],
  
  quiz: [
    {
      id: "stack-quiz-1",
      question: "What is the time complexity of the push and pop operations in a well-implemented stack?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Both push and pop operations in a well-implemented stack have O(1) time complexity, meaning they take constant time regardless of the size of the stack."
    },
    {
      id: "stack-quiz-2",
      question: "Which of the following applications would NOT typically use a stack?",
      options: ["Function call management", "Undo mechanism in text editors", "Breadth-first search in a graph", "Checking balanced parentheses"],
      correctAnswer: 2,
      explanation: "Breadth-first search (BFS) typically uses a queue rather than a stack. The other options—function call management, undo mechanisms, and checking balanced parentheses—are classic applications of stacks."
    },
    {
      id: "stack-quiz-3",
      question: "What happens when you try to pop from an empty stack?",
      options: ["It returns null", "It throws an exception", "It returns a special value indicating empty stack", "The behavior is undefined"],
      correctAnswer: 1,
      explanation: "In most implementations, attempting to pop from an empty stack throws an exception (e.g., EmptyStackException or similar), as there's no element to remove. Good implementations check for this condition explicitly."
    },
    {
      id: "stack-quiz-4",
      question: "Which data structure is recommended as a modern alternative to Java's Stack class?",
      options: ["ArrayList", "LinkedList", "ArrayDeque", "HashMap"],
      correctAnswer: 2,
      explanation: "ArrayDeque is the recommended modern alternative to Java's Stack class. It implements the Deque interface which provides stack operations and offers better performance and a more complete and consistent set of methods."
    }
  ]
};

export default stackBasicsContent; 