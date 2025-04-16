import { Content } from '@/types/course';

const redBlackTreeContent: Content = {
  introduction: "Red-Black Trees are self-balancing binary search trees with an extra bit per node that denotes its color (red or black). These trees maintain balance by enforcing five key properties that ensure the tree remains approximately balanced during insertions and deletions. While not as strictly balanced as AVL trees, Red-Black Trees guarantee O(log n) performance with fewer rotations, making them popular for practical applications like C++'s map/set and Java's TreeMap/TreeSet implementations.",
  
  learningObjectives: [
    "Understand the five properties of Red-Black Trees",
    "Implement Red-Black Tree insertion and deletion with proper recoloring and rotations",
    "Compare Red-Black Trees with AVL trees and other balanced tree structures",
    "Analyze the time and space complexity of Red-Black Tree operations",
    "Recognize practical applications of Red-Black Trees in libraries and systems"
  ],
  
  sections: [
    {
      title: "Red-Black Tree Properties",
      content: `A Red-Black Tree must satisfy the following five properties:

1. Every node is either red or black
2. The root is black
3. All leaf nodes (NIL/null) are black
4. If a node is red, both its children must be black (no two adjacent red nodes)
5. Every path from a node to any of its descendant NIL nodes contains the same number of black nodes (black-height)

These properties ensure that the longest path from the root to any leaf is no more than twice as long as the shortest path, guaranteeing logarithmic height.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-md">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">Red-Black Tree</h4>
    <div class="flex justify-center">
      <img src="/images/red-black-tree.svg" alt="Red-Black Tree" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">A valid Red-Black Tree with black nodes (B) and red nodes (R)</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// Red-Black Tree Node
class RBNode {
    int key;
    RBNode left, right, parent;
    boolean isRed; // true if red, false if black
    
    RBNode(int key) {
        this.key = key;
        this.isRed = true; // New nodes are always red
        this.left = this.right = this.parent = null;
    }
    
    // Is this node a leaf (NIL)?
    boolean isNil() {
        return this.key == 0 && !this.isRed && this.left == null && this.right == null;
    }
}

// Red-Black Tree implementation
class RedBlackTree {
    private RBNode root;
    private RBNode NIL; // Sentinel node for leaves
    
    public RedBlackTree() {
        NIL = new RBNode(0);
        NIL.isRed = false; // NIL nodes are black
        root = NIL;
    }
    
    // Verify the properties of a Red-Black Tree
    private boolean verifyProperties() {
        // Property 1 is enforced by the boolean isRed
        
        // Property 2: Root is black
        if (root.isRed) {
            return false;
        }
        
        // Property 3: All leaves (NIL) are black
        // Already enforced by structure
        
        // Property 4 & 5 require a tree traversal to verify
        // (Implemented separately)
        
        return true;
    }
}`,
          explanation: "This code shows the basic structure of a Red-Black Tree node and tree class. Each node has a color attribute (red or black), and NIL nodes are implemented as sentinel nodes. The properties of Red-Black Trees are enforced through specific algorithms during insertion and deletion operations."
        }
      ]
    },
    {
      title: "Rotations and Recoloring",
      content: "When inserting or deleting nodes in a Red-Black Tree, we may need to perform rotations and recoloring to maintain the five properties. Rotations are similar to those in AVL trees, while recoloring changes node colors to ensure Property 4 (no two adjacent red nodes) is maintained.",
      codeExamples: [
        {
          language: "java",
          code: `// Left Rotation
private void leftRotate(RBNode x) {
    RBNode y = x.right;
    
    // Turn y's left subtree into x's right subtree
    x.right = y.left;
    if (y.left != NIL) {
        y.left.parent = x;
    }
    
    // Link x's parent to y
    y.parent = x.parent;
    if (x.parent == null) {
        root = y;
    } else if (x == x.parent.left) {
        x.parent.left = y;
    } else {
        x.parent.right = y;
    }
    
    // Put x on y's left
    y.left = x;
    x.parent = y;
}

// Right Rotation
private void rightRotate(RBNode y) {
    RBNode x = y.left;
    
    // Turn x's right subtree into y's left subtree
    y.left = x.right;
    if (x.right != NIL) {
        x.right.parent = y;
    }
    
    // Link y's parent to x
    x.parent = y.parent;
    if (y.parent == null) {
        root = x;
    } else if (y == y.parent.left) {
        y.parent.left = x;
    } else {
        y.parent.right = x;
    }
    
    // Put y on x's right
    x.right = y;
    y.parent = x;
}`,
          explanation: "These rotation methods rebalance the tree structure while preserving the binary search tree property. Left rotation makes the right child of x become its parent, while right rotation makes the left child of y become its parent. These operations are fundamental for maintaining the Red-Black Tree properties after insertions and deletions."
        }
      ]
    },
    {
      title: "Red-Black Tree Insertion",
      content: "Insertion in a Red-Black Tree starts like a regular BST insertion, but is followed by fixup operations to maintain the Red-Black properties.",
      codeExamples: [
        {
          language: "java",
          code: `// Insert a new key in the Red-Black Tree
public void insert(int key) {
    RBNode newNode = new RBNode(key);
    newNode.left = NIL;
    newNode.right = NIL;
    
    // 1. Standard BST insertion
    RBNode y = null;
    RBNode x = root;
    
    while (x != NIL) {
        y = x;
        if (newNode.key < x.key) {
            x = x.left;
        } else {
            x = x.right;
        }
    }
    
    newNode.parent = y;
    if (y == null) {
        root = newNode; // Tree was empty
    } else if (newNode.key < y.key) {
        y.left = newNode;
    } else {
        y.right = newNode;
    }
    
    // 2. Fix Red-Black Tree properties
    fixInsert(newNode);
}

// Fix the tree after insertion
private void fixInsert(RBNode k) {
    RBNode u;
    
    // If k is root, just make it black (Property 2)
    if (k == root) {
        k.isRed = false;
        return;
    }
    
    // Fix the tree until we reach the root or there are no adjacent reds
    while (k != root && k.parent.isRed) {
        if (k.parent == k.parent.parent.left) {
            u = k.parent.parent.right; // Uncle
            
            // Case 1: Uncle is red - recolor
            if (u.isRed) {
                k.parent.isRed = false;
                u.isRed = false;
                k.parent.parent.isRed = true;
                k = k.parent.parent;
            } else {
                // Case 2: Uncle is black, k is a right child - left rotation
                if (k == k.parent.right) {
                    k = k.parent;
                    leftRotate(k);
                }
                
                // Case 3: Uncle is black, k is a left child - right rotation
                k.parent.isRed = false;
                k.parent.parent.isRed = true;
                rightRotate(k.parent.parent);
            }
        } else {
            // Symmetric cases for right subtree
            u = k.parent.parent.left; // Uncle
            
            // Case 1: Uncle is red - recolor
            if (u.isRed) {
                k.parent.isRed = false;
                u.isRed = false;
                k.parent.parent.isRed = true;
                k = k.parent.parent;
            } else {
                // Case 2: Uncle is black, k is a left child - right rotation
                if (k == k.parent.left) {
                    k = k.parent;
                    rightRotate(k);
                }
                
                // Case 3: Uncle is black, k is a right child - left rotation
                k.parent.isRed = false;
                k.parent.parent.isRed = true;
                leftRotate(k.parent.parent);
            }
        }
    }
    
    // Ensure root is black (Property 2)
    root.isRed = false;
}`,
          explanation: "This insertion algorithm first performs a standard BST insertion, then fixes any violations of Red-Black properties. The fixup involves three main cases: recoloring when the uncle is red, and rotations when the uncle is black. The process guarantees that all five Red-Black properties are maintained after each insertion."
        }
      ]
    },
    {
      title: "Red-Black Tree Deletion",
      content: "Deletion in a Red-Black Tree is more complex than insertion, as it requires tracking replacements and potentially fixing multiple violations of the Red-Black properties.",
      codeExamples: [
        {
          language: "java",
          code: `// Find the node with a given key
private RBNode findNode(int key) {
    RBNode current = root;
    while (current != NIL) {
        if (key == current.key) {
            return current;
        }
        current = key < current.key ? current.left : current.right;
    }
    return null; // Not found
}

// Delete a node with given key
public void delete(int key) {
    RBNode z = findNode(key);
    if (z == null) return; // Key not found
    
    RBNode y = z; // Node to be removed or moved
    RBNode x; // Node to replace y
    boolean yOriginalColor = y.isRed;
    
    // Case 1: Z has at most one child
    if (z.left == NIL) {
        x = z.right;
        transplant(z, z.right);
    } else if (z.right == NIL) {
        x = z.left;
        transplant(z, z.left);
    } 
    // Case 2: Z has two children
    else {
        // Find successor (minimum in right subtree)
        y = minimum(z.right);
        yOriginalColor = y.isRed;
        x = y.right;
        
        if (y.parent == z) {
            x.parent = y; // Handle case where x is NIL
        } else {
            transplant(y, y.right);
            y.right = z.right;
            y.right.parent = y;
        }
        
        transplant(z, y);
        y.left = z.left;
        y.left.parent = y;
        y.isRed = z.isRed;
    }
    
    // If the original color was black, fix violations
    if (!yOriginalColor) {
        fixDelete(x);
    }
}

// Helper method to replace one subtree with another
private void transplant(RBNode u, RBNode v) {
    if (u.parent == null) {
        root = v;
    } else if (u == u.parent.left) {
        u.parent.left = v;
    } else {
        u.parent.right = v;
    }
    v.parent = u.parent;
}

// Fix the tree after deletion
private void fixDelete(RBNode x) {
    while (x != root && !x.isRed) {
        if (x == x.parent.left) {
            RBNode w = x.parent.right; // Sibling
            
            // Case 1: Sibling is red
            if (w.isRed) {
                w.isRed = false;
                x.parent.isRed = true;
                leftRotate(x.parent);
                w = x.parent.right;
            }
            
            // Case 2: Both of sibling's children are black
            if (!w.left.isRed && !w.right.isRed) {
                w.isRed = true;
                x = x.parent;
            } else {
                // Case 3: Sibling's right child is black
                if (!w.right.isRed) {
                    w.left.isRed = false;
                    w.isRed = true;
                    rightRotate(w);
                    w = x.parent.right;
                }
                
                // Case 4: Sibling's right child is red
                w.isRed = x.parent.isRed;
                x.parent.isRed = false;
                w.right.isRed = false;
                leftRotate(x.parent);
                x = root; // To exit the loop
            }
        } else {
            // Symmetric cases for x being a right child
            // (mirror image of the above code)
        }
    }
    
    // Set x to black to ensure Property 4
    x.isRed = false;
}

// Find minimum key in a subtree
private RBNode minimum(RBNode node) {
    while (node.left != NIL) {
        node = node.left;
    }
    return node;
}`,
          explanation: "This deletion algorithm handles removing a node while maintaining the Red-Black Tree properties. It's more complex than insertion because different cases arise based on the color of the removed node and its replacements. The fixup process ensures all five Red-Black properties remain satisfied after deletion."
        }
      ]
    },
    {
      title: "Comparison with AVL Trees",
      content: "Red-Black Trees offer different performance characteristics compared to AVL Trees, making them preferable in certain scenarios.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Red-Black Trees vs. AVL Trees:

1. Balance Factor:
   - AVL Trees: Height difference between subtrees is at most 1
   - Red-Black Trees: Longest path is at most 2 times the shortest path

2. Height Guarantee:
   - AVL Trees: Height is strictly ≤ 1.44 * log₂(n+2) - 0.328
   - Red-Black Trees: Height is at most 2 * log₂(n+1)

3. Rotations:
   - AVL Trees: Up to O(log n) rotations per insertion/deletion
   - Red-Black Trees: At most 2 rotations per insertion, 3 for deletion

4. Use Cases:
   - AVL Trees: Better for lookup-intensive applications
   - Red-Black Trees: Better for frequent insertions/deletions

5. Memory Overhead:
   - AVL Trees: One height field per node (typically an integer)
   - Red-Black Trees: One color bit per node (can be as small as 1 bit)

6. Implementation Complexity:
   - AVL Trees: Simpler rebalancing logic
   - Red-Black Trees: More complex deletion cases

7. Real-world Usage:
   - AVL Trees: Used in databases and other lookup-intensive applications
   - Red-Black Trees: Used in most language standard libraries:
     * Java: TreeMap, TreeSet
     * C++: std::map, std::set
     * Python: OrderedDict implementation
*/`,
          explanation: "This comparison highlights the key differences between Red-Black Trees and AVL Trees. While AVL Trees maintain stricter balance and have better search performance, Red-Black Trees are often preferred in practice due to fewer rotations during modifications and slightly lower memory overhead."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "rb-hw-1",
      question: "Implement a method to verify that a given tree satisfies all five Red-Black Tree properties. The method should return true if the tree is a valid Red-Black Tree and false otherwise.",
      solution: "```java\npublic class RedBlackValidator {\n    static class RBNode {\n        int key;\n        RBNode left, right, parent;\n        boolean isRed;\n        \n        RBNode(int key, boolean isRed) {\n            this.key = key;\n            this.isRed = isRed;\n        }\n    }\n    \n    private RBNode NIL;\n    \n    public RedBlackValidator() {\n        NIL = new RBNode(0, false); // NIL node is black\n    }\n    \n    // Verify all Red-Black Tree properties\n    public boolean isValidRedBlackTree(RBNode root) {\n        if (root == null) return true;\n        \n        // Property 1: Every node is either red or black\n        // (Enforced by the boolean isRed field)\n        \n        // Property 2: Root is black\n        if (root.isRed) return false;\n        \n        // Property 3: All NIL nodes are black\n        // (Enforced in the implementation)\n        \n        // Property 4: Red nodes have only black children\n        if (!noAdjacentReds(root)) return false;\n        \n        // Property 5: All paths from a node to its NIL descendants\n        // contain the same number of black nodes\n        int blackHeight = -1;\n        return checkBlackHeight(root, 0, blackHeight);\n    }\n    \n    // Check Property 4: No adjacent red nodes\n    private boolean noAdjacentReds(RBNode node) {\n        if (node == null || node == NIL) return true;\n        \n        if (node.isRed) {\n            // Check if either child is red\n            if ((node.left != null && node.left != NIL && node.left.isRed) ||\n                (node.right != null && node.right != NIL && node.right.isRed)) {\n                return false;\n            }\n        }\n        \n        // Recursively check children\n        return noAdjacentReds(node.left) && noAdjacentReds(node.right);\n    }\n    \n    // Check Property 5: Black height consistency\n    private boolean checkBlackHeight(RBNode node, int currentBlacks, int expectedBlacks) {\n        if (node == null || node == NIL) {\n            // Reached a NIL node, check if the black height matches\n            if (expectedBlacks == -1) {\n                // First leaf encountered, set the expected black height\n                expectedBlacks = currentBlacks;\n                return true;\n            }\n            return currentBlacks == expectedBlacks;\n        }\n        \n        // Count black nodes\n        if (!node.isRed) currentBlacks++;\n        \n        // Check both subtrees\n        return checkBlackHeight(node.left, currentBlacks, expectedBlacks) &&\n               checkBlackHeight(node.right, currentBlacks, expectedBlacks);\n    }\n}\n```\nThis solution verifies all five Red-Black Tree properties:\n1. Property 1 (every node is red or black) is enforced by the data structure\n2. Property 2 (root is black) is checked directly\n3. Property 3 (all NIL nodes are black) is enforced by the implementation\n4. Property 4 (no adjacent red nodes) is checked recursively\n5. Property 5 (equal black height on all paths) is verified by counting black nodes on paths\n\nTime complexity is O(n) where n is the number of nodes, as we need to visit each node once. Space complexity is O(h) where h is the height of the tree, for the recursion stack."
    },
    {
      id: "rb-hw-2",
      question: "Implement a method to count the number of nodes in a Red-Black Tree that fall within a given range [x, y]. Analyze the time complexity of your solution.",
      solution: "```java\npublic class RedBlackRangeQuery {\n    static class RBNode {\n        int key;\n        RBNode left, right;\n        boolean isRed;\n        \n        RBNode(int key) {\n            this.key = key;\n            this.isRed = true;\n        }\n    }\n    \n    private RBNode NIL;\n    \n    public RedBlackRangeQuery() {\n        NIL = new RBNode(0);\n        NIL.isRed = false;\n    }\n    \n    // Count nodes in range [x, y]\n    public int countNodesInRange(RBNode root, int x, int y) {\n        if (root == null || root == NIL) return 0;\n        \n        // If current node is in range\n        if (root.key >= x && root.key <= y) {\n            // Count current node + nodes in left and right subtrees\n            return 1 + countNodesInRange(root.left, x, y) + \n                     countNodesInRange(root.right, x, y);\n        }\n        \n        // If current node is smaller than range, check right subtree\n        else if (root.key < x) {\n            return countNodesInRange(root.right, x, y);\n        }\n        \n        // If current node is greater than range, check left subtree\n        else {\n            return countNodesInRange(root.left, x, y);\n        }\n    }\n    \n    // Optimized solution using BST properties\n    public int countNodesInRangeOptimized(RBNode root, int x, int y) {\n        if (x > y) return 0; // Invalid range\n        return countLessThanOrEqual(root, y) - countLessThanOrEqual(root, x-1);\n    }\n    \n    // Count nodes with key <= value\n    private int countLessThanOrEqual(RBNode node, int value) {\n        if (node == null || node == NIL) return 0;\n        \n        if (node.key <= value) {\n            // Current node + all nodes in left subtree + nodes in right subtree <= value\n            return 1 + countLessThanOrEqual(node.left, value) + \n                     countLessThanOrEqual(node.right, value);\n        } else {\n            // Only consider left subtree\n            return countLessThanOrEqual(node.left, value);\n        }\n    }\n}\n```\nThis solution provides two approaches to count nodes within a range:\n\n1. The first approach directly traverses the tree, only exploring subtrees that might contain values in the range. Time complexity is O(n) in the worst case, but typically better if the range is small.\n\n2. The optimized approach uses the fact that count of nodes in range [x,y] = count of nodes ≤ y - count of nodes ≤ (x-1). This is more efficient for large trees. Time complexity is O(h + k) where h is the height (log n in a balanced tree) and k is the number of nodes in the range."
    }
  ],
  
  quiz: [
    {
      id: "rb-quiz-1",
      question: "Which of the following is NOT one of the five properties of a Red-Black Tree?",
      options: [
        "Every node is either red or black",
        "The root is black",
        "All leaf nodes (NIL) are black",
        "The tree must be perfectly balanced (all leaves at same level)"
      ],
      correctAnswer: 3,
      explanation: "The property that 'the tree must be perfectly balanced' is not a Red-Black Tree property. Red-Black Trees allow some imbalance—specifically, the longest path from root to leaf can be up to twice as long as the shortest path. The actual fifth property is that every path from a node to its descendant NIL nodes contains the same number of black nodes."
    },
    {
      id: "rb-quiz-2",
      question: "What is the maximum possible height of a Red-Black Tree with n nodes?",
      options: ["log₂(n)", "1.44 * log₂(n)", "2 * log₂(n)", "n/2"],
      correctAnswer: 2,
      explanation: "The maximum possible height of a Red-Black Tree with n nodes is 2 * log₂(n). This is because the black-height is at least log₂(n+1), and due to the property that no two red nodes can be adjacent, the maximum height is at most twice the black-height."
    },
    {
      id: "rb-quiz-3",
      question: "What is the color of a newly inserted node in a Red-Black Tree?",
      options: ["Always black", "Always red", "Depends on its parent's color", "Depends on its key value"],
      correctAnswer: 1,
      explanation: "A newly inserted node in a Red-Black Tree is always initially colored red. This is because adding a red node doesn't violate the black-height property (Property 5). If the node's parent is also red, this will violate Property 4, but that's fixed during the insertion fixup."
    },
    {
      id: "rb-quiz-4",
      question: "How many rotations might be needed after a single insertion in a Red-Black Tree?",
      options: ["0", "At most 1", "At most 2", "O(log n)"],
      correctAnswer: 2,
      explanation: "After a single insertion in a Red-Black Tree, at most 2 rotations might be needed to restore the Red-Black properties. This is better than AVL trees, which may require O(log n) rotations after a single insertion."
    },
    {
      id: "rb-quiz-5",
      question: "Which of the following data structures in Java's standard library uses Red-Black Trees?",
      options: ["HashMap", "ArrayList", "LinkedList", "TreeMap"],
      correctAnswer: 3,
      explanation: "TreeMap in Java uses Red-Black Trees as its underlying implementation. This allows TreeMap to maintain keys in sorted order and provide O(log n) performance for operations like get, put, and remove."
    }
  ],
  
  practice: {
    introduction: "Practice these problems to reinforce your understanding of Red-Black Trees and balanced binary search trees. These exercises cover implementation details, tree properties, and applications of balanced trees in solving algorithmic problems.",
    questions: {
      easy: [
        {
          id: "search-in-a-binary-search-tree",
          title: "Search in a Binary Search Tree",
          link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
          description: "Implements a simple search in a BST, which works the same way in Red-Black Trees."
        },
        {
          id: "convert-sorted-array-to-binary-search-tree",
          title: "Convert Sorted Array to Binary Search Tree",
          link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
          description: "Create a height-balanced BST from a sorted array, similar to creating a balanced Red-Black Tree."
        },
        {
          id: "balanced-binary-tree",
          title: "Balanced Binary Tree",
          link: "https://leetcode.com/problems/balanced-binary-tree/",
          description: "Check if a binary tree is height-balanced, which is related to the balancing properties of Red-Black Trees."
        }
      ],
      medium: [
        {
          id: "insert-into-a-binary-search-tree",
          title: "Insert into a Binary Search Tree",
          link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
          description: "Implement insertion into a BST, which is the first step of insertion in a Red-Black Tree."
        },
        {
          id: "delete-node-in-a-bst",
          title: "Delete Node in a BST",
          link: "https://leetcode.com/problems/delete-node-in-a-bst/",
          description: "Implement deletion from a BST, which is similar to the first part of deletion in a Red-Black Tree."
        },
        {
          id: "range-sum-of-bst",
          title: "Range Sum of BST",
          link: "https://leetcode.com/problems/range-sum-of-bst/",
          description: "Calculate the sum of values in a BST within a given range, utilizing BST properties."
        }
      ],
      hard: [
        {
          id: "count-of-range-sum",
          title: "Count of Range Sum",
          link: "https://leetcode.com/problems/count-of-range-sum/",
          description: "Count range sums in an array, which can be efficiently solved using balanced BSTs."
        },
        {
          id: "count-of-smaller-numbers-after-self",
          title: "Count of Smaller Numbers After Self",
          link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
          description: "Count smaller elements to the right, which can be efficiently solved using balanced search trees."
        }
      ]
    }
  }
};

export default redBlackTreeContent; 