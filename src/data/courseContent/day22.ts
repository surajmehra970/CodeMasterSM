import { Content } from '@/types/course';

const bTreeContent: Content = {
  introduction: "B-Trees are self-balancing search trees designed to work efficiently with disk-based storage systems where reading and writing large blocks of data is more efficient than individual items. Unlike binary trees that have at most two children per node, B-Tree nodes can have multiple keys and children. This structure minimizes disk I/O operations and is widely used in databases, file systems, and other applications where large datasets need to be stored and accessed efficiently.",
  
  learningObjectives: [
    "Understand the structure and properties of B-Trees",
    "Learn the operations of B-Trees: search, insertion, and deletion",
    "Analyze the time and space complexity of B-Tree operations",
    "Compare B-Trees with binary search trees and other balanced tree structures",
    "Recognize practical applications of B-Trees in database systems and file systems"
  ],
  
  sections: [
    {
      title: "B-Tree Structure and Properties",
      content: `A B-Tree of order m has the following properties:
- Every node has at most m children
- Every non-leaf node (except root) has at least ⌈m/2⌉ children
- The root has at least 2 children if it's not a leaf
- All leaf nodes appear at the same level
- A non-leaf node with k children contains k-1 keys

These properties ensure that the tree remains balanced, providing guaranteed logarithmic time for operations.

<div class="my-6 flex justify-center">
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-2 w-full max-w-3xl">
    <h4 class="text-center font-bold mb-2 text-gray-800 dark:text-gray-200">B-Tree Structure</h4>
    <div class="flex justify-center">
      <img src="/images/b-tree-structure.svg" alt="B-Tree Structure" class="w-full h-auto" loading="eager" />
    </div>
    <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">A B-Tree of order 5 with multiple keys per node</p>
  </div>
</div>`,
      codeExamples: [
        {
          language: "java",
          code: `// B-Tree Node
class BTreeNode {
    int[] keys;         // Array of keys
    int t;              // Minimum degree (defines the range for number of keys)
    BTreeNode[] children; // Array of child pointers
    int n;              // Current number of keys
    boolean leaf;       // Is true when node is leaf, else false
    
    // Constructor
    public BTreeNode(int t, boolean leaf) {
        this.t = t;
        this.leaf = leaf;
        this.keys = new int[2*t - 1]; // A node can have at most 2*t-1 keys
        this.children = new BTreeNode[2*t];
        this.n = 0; // Initially, the node has 0 keys
    }
}

// B-Tree
class BTree {
    BTreeNode root;
    int t; // Minimum degree
    
    // Constructor
    public BTree(int t) {
        this.root = null;
        this.t = t;
    }
}`,
          explanation: "This code defines the basic structure of a B-Tree. Each node contains an array of keys and an array of pointers to its children. The parameter 't' represents the minimum degree of the B-Tree, which determines how many keys each node can have (between t-1 and 2t-1, except for the root)."
        }
      ]
    },
    {
      title: "B-Tree Search Operation",
      content: "Searching in a B-Tree is similar to searching in a binary search tree but extended to handle multiple keys per node. Starting from the root, we find the appropriate child to traverse based on the comparison with keys in the current node.",
      codeExamples: [
        {
          language: "java",
          code: `// Search a key in B-Tree
public BTreeNode search(BTreeNode node, int key) {
    // Find the first key greater than or equal to key
    int i = 0;
    while (i < node.n && key > node.keys[i]) {
        i++;
    }
    
    // If the found key is equal to key, return this node
    if (i < node.n && key == node.keys[i]) {
        return node;
    }
    
    // If key is not found here and this is a leaf node, return null
    if (node.leaf) {
        return null;
    }
    
    // Go to the appropriate child
    return search(node.children[i], key);
}`,
          explanation: "This search method starts by finding the first key in the node that is greater than or equal to the target key. If the key is found, it returns the node. Otherwise, if the node is a leaf, the key is not in the tree. If the node is internal, the method recursively searches the appropriate child node based on the comparison result."
        }
      ]
    },
    {
      title: "B-Tree Insertion",
      content: "Insertion in a B-Tree is more complex than in a binary search tree because we need to maintain the B-Tree properties. If a node becomes full after insertion, it must be split to maintain balance.",
      codeExamples: [
        {
          language: "java",
          code: `// Insert a key into the B-Tree
public void insert(int key) {
    // If tree is empty
    if (root == null) {
        root = new BTreeNode(t, true);
        root.keys[0] = key;
        root.n = 1;
        return;
    }
    
    // If root is full, then tree grows in height
    if (root.n == 2*t - 1) {
        // Create new root
        BTreeNode s = new BTreeNode(t, false);
        
        // Make old root as child of new root
        s.children[0] = root;
        
        // Split the old root and move 1 key to the new root
        splitChild(s, 0);
        
        // New root has two children now. Decide which child will contain new key
        int i = 0;
        if (s.keys[0] < key) {
            i++;
        }
        insertNonFull(s.children[i], key);
        
        // Change root
        root = s;
    } else {
        // If root is not full, call insertNonFull for root
        insertNonFull(root, key);
    }
}

// Insert a key into a non-full node
private void insertNonFull(BTreeNode node, int key) {
    // Initialize index as the rightmost element
    int i = node.n - 1;
    
    // If this is a leaf node
    if (node.leaf) {
        // Find the position for new key and move all greater keys one space ahead
        while (i >= 0 && key < node.keys[i]) {
            node.keys[i+1] = node.keys[i];
            i--;
        }
        
        // Insert the new key
        node.keys[i+1] = key;
        node.n++;
    } else {
        // Find the child which is going to have the new key
        while (i >= 0 && key < node.keys[i]) {
            i--;
        }
        i++;
        
        // Check if the child is full
        if (node.children[i].n == 2*t - 1) {
            // If the child is full, split it
            splitChild(node, i);
            
            // After split, the middle key goes up and the node has two children
            if (key > node.keys[i]) {
                i++;
            }
        }
        insertNonFull(node.children[i], key);
    }
}

// Split the child of node at index i
private void splitChild(BTreeNode parent, int index) {
    BTreeNode child = parent.children[index];
    BTreeNode newChild = new BTreeNode(t, child.leaf);
    newChild.n = t - 1;
    
    // Copy the last (t-1) keys of child to newChild
    for (int j = 0; j < t-1; j++) {
        newChild.keys[j] = child.keys[j+t];
    }
    
    // Copy the last t children of child to newChild
    if (!child.leaf) {
        for (int j = 0; j < t; j++) {
            newChild.children[j] = child.children[j+t];
        }
    }
    
    // Reduce the number of keys in child
    child.n = t - 1;
    
    // Make room for a new child in parent
    for (int j = parent.n; j > index; j--) {
        parent.children[j+1] = parent.children[j];
    }
    
    // Link the new child to parent
    parent.children[index+1] = newChild;
    
    // Move a key from child to parent
    for (int j = parent.n-1; j >= index; j--) {
        parent.keys[j+1] = parent.keys[j];
    }
    parent.keys[index] = child.keys[t-1];
    parent.n++;
}`,
          explanation: "The insertion process involves traversing down to a leaf node and inserting the key there. If nodes become full during insertion, they are split, pushing a middle key up to the parent node. This may propagate up to the root, causing the tree to grow in height when the root splits."
        }
      ]
    },
    {
      title: "B-Tree Time and Space Complexity",
      content: "B-Trees are designed to minimize disk I/O operations, providing efficient time complexity for search, insert, and delete operations even with large amounts of data.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Time Complexity of B-Tree Operations:

1. Search:
   - O(log_t n), where t is the minimum degree and n is the number of keys
   - This represents the height of the tree, which is logarithmic to the number of keys

2. Insertion:
   - O(t * log_t n) in the worst case
   - Finding the insertion position takes O(log_t n)
   - Splitting a node takes O(t) time

3. Deletion:
   - O(t * log_t n) in the worst case

Space Complexity:
   - O(n) for storing the tree
   - Each node can have up to 2t-1 keys and 2t children

B-Tree vs. Other Data Structures:

1. B-Tree vs. Binary Search Tree:
   - BST: O(h) search time, where h can be n in worst case
   - B-Tree: Guaranteed O(log_t n) search time

2. B-Tree vs. AVL/Red-Black Tree:
   - Both provide O(log n) operations
   - B-Tree has fewer I/O operations when data doesn't fit in memory
   - B-Tree better utilizes block storage

3. B-Tree Applications:
   - Database indexing
   - File systems (NTFS, ext4, etc.)
   - When data is too large to fit in memory
*/`,
          explanation: "This analysis details the time and space complexity of B-Tree operations and compares B-Trees with other tree data structures. The logarithmic height of B-Trees ensures efficient operations, and their block-oriented structure reduces the number of disk accesses, making them ideal for external storage systems."
        }
      ]
    },
    {
      title: "B-Tree Variants and Applications",
      content: "B-Trees have several variants optimized for specific use cases, each with slight modifications to the original structure to improve performance or add features.",
      codeExamples: [
        {
          language: "java",
          code: `/*
Common B-Tree Variants:

1. B+ Tree
   - All keys exist in leaf nodes
   - Leaf nodes are linked for sequential access
   - Internal nodes only contain keys for routing
   - Commonly used in database indexing and file systems

2. B* Tree
   - Nodes are kept at least 2/3 full (instead of 1/2)
   - Delays splitting by redistributing keys between siblings
   - Reduces splits and improves space utilization

3. 2-3 Tree
   - Special case of B-Tree where t = 2
   - Each node has either 2 or 3 children
   - Simpler structure for educational purposes

4. 2-3-4 Tree
   - Special case of B-Tree where t = 2
   - Each node has 2, 3, or 4 children
   - Equivalent to Red-Black Trees

Real-world Applications:

1. Database Management Systems
   - MySQL (InnoDB): B+ Trees for indexing
   - PostgreSQL: B+ Trees for indexing
   - Oracle: B+ Trees for indexing

2. File Systems
   - NTFS: B+ Trees for master file table
   - ext4: B+ Trees for directory indexing
   - HFS+: B+ Trees for catalog file

3. Key-Value Stores
   - LevelDB: Combination of B+ Trees with LSM Trees
   - BerkeleyDB: B+ Trees as the underlying structure
*/`,
          explanation: "This code block outlines popular B-Tree variants and their real-world applications. The most widely used variant is the B+ Tree, which optimizes for range queries and sequential access by storing all keys in leaf nodes and adding pointers between leaves. These structures form the backbone of most modern databases and file systems."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "btree-hw-1",
      question: "Implement a method to find the height of a B-Tree, and analyze its time complexity.",
      solution: "```java\npublic class BTreeHeight {\n    class BTreeNode {\n        int n; // Number of keys\n        boolean leaf; // Is the node a leaf?\n        BTreeNode[] children; // Array of children\n        \n        BTreeNode(int t, boolean leaf) {\n            this.leaf = leaf;\n            this.children = new BTreeNode[2*t];\n            this.n = 0;\n        }\n    }\n    \n    // Calculate height of a B-Tree\n    public int getHeight(BTreeNode root) {\n        // An empty tree has height 0\n        if (root == null) {\n            return 0;\n        }\n        \n        // A leaf node has height 1\n        if (root.leaf) {\n            return 1;\n        }\n        \n        // For non-leaf nodes, get the height of the first child and add 1\n        return getHeight(root.children[0]) + 1;\n    }\n}\n```\nTime Complexity: O(h) where h is the height of the B-Tree. Since we only need to traverse down one path from the root to a leaf, the time complexity is proportional to the height of the tree.\n\nSpace Complexity: O(h) for the recursion stack.\n\nAs B-Trees have a guaranteed height of O(log_t n) where t is the minimum degree and n is the number of keys, the time complexity can also be expressed as O(log n).\n\nThis method works because all leaf nodes in a B-Tree are at the same level, so calculating the height only requires following any path from the root to a leaf."
    },
    {
      id: "btree-hw-2",
      question: "Design an algorithm to find the kth smallest key in a B-Tree. Analyze the time and space complexity of your solution.",
      solution: "```java\npublic class BTreeKthSmallest {\n    class BTreeNode {\n        int[] keys;\n        int n;\n        boolean leaf;\n        BTreeNode[] children;\n        \n        BTreeNode(int t, boolean leaf) {\n            this.leaf = leaf;\n            this.keys = new int[2*t - 1];\n            this.children = new BTreeNode[2*t];\n            this.n = 0;\n        }\n    }\n    \n    private int count = 0;\n    private int result = -1;\n    \n    // Find the kth smallest element\n    public int findKthSmallest(BTreeNode root, int k) {\n        count = 0;\n        result = -1;\n        \n        // Perform an in-order traversal\n        inOrderTraversal(root, k);\n        \n        return result;\n    }\n    \n    private void inOrderTraversal(BTreeNode node, int k) {\n        // Return if we've already found the kth element\n        if (result != -1) return;\n        \n        if (node == null) return;\n        \n        // Traverse children and keys in order\n        for (int i = 0; i < node.n; i++) {\n            // Visit left child of current key\n            if (!node.leaf) {\n                inOrderTraversal(node.children[i], k);\n            }\n            \n            // Visit current key\n            count++;\n            if (count == k) {\n                result = node.keys[i];\n                return;\n            }\n            \n            // Last child (rightmost)\n            if (i == node.n - 1 && !node.leaf) {\n                inOrderTraversal(node.children[i + 1], k);\n            }\n        }\n    }\n    \n    // More efficient version for B+ Trees (all keys in leaves)\n    public int findKthSmallestBPlusTree(BTreeNode root, int k) {\n        // Find leftmost leaf\n        BTreeNode current = root;\n        while (!current.leaf) {\n            current = current.children[0];\n        }\n        \n        // Count keys across leaf nodes\n        int count = 0;\n        \n        // Assume leaf nodes are linked in B+ Tree\n        while (current != null) {\n            for (int i = 0; i < current.n; i++) {\n                count++;\n                if (count == k) {\n                    return current.keys[i];\n                }\n            }\n            \n            // Move to next leaf (assuming linked leaves in B+ Tree)\n            current = current.nextLeaf; // In real B+ Tree, leaves would be linked\n        }\n        \n        return -1; // Not found\n    }\n}\n```\nTime Complexity: \n- For a general B-Tree: O(n) in the worst case, where n is the number of keys in the tree. We might need to visit every node to find the kth smallest element.\n- For a B+ Tree with linked leaves: O(h + k), where h is the height of the tree (log n) and k is the parameter. We need O(h) to find the leftmost leaf and potentially O(k) to traverse to the kth element.\n\nSpace Complexity: \n- O(h) for the recursion stack in the general solution.\n- O(1) for the B+ Tree solution since we use iterative traversal.\n\nThe B+ Tree approach is more efficient for finding the kth smallest element because all keys are stored in leaf nodes, which are linked together for sequential access."
    }
  ],
  
  quiz: [
    {
      id: "btree-quiz-1",
      question: "What is the minimum number of children for a non-root node in a B-Tree of order m?",
      options: ["1", "2", "⌈m/2⌉", "m-1"],
      correctAnswer: 2,
      explanation: "In a B-Tree of order m, a non-root node must have at least ⌈m/2⌉ children. This property ensures that the tree remains balanced and nodes are sufficiently filled, optimizing storage usage."
    },
    {
      id: "btree-quiz-2",
      question: "Which of the following is NOT a property of B-Trees?",
      options: [
        "All leaves are at the same level",
        "A node with k children contains k-1 keys",
        "All nodes except leaves must be at least half full",
        "The root must have at least ⌈m/2⌉ children"
      ],
      correctAnswer: 3,
      explanation: "The root node of a B-Tree is allowed to have fewer children than other nodes. Specifically, the root can have as few as 2 children (unless it's a leaf), while non-root nodes must have at least ⌈m/2⌉ children."
    },
    {
      id: "btree-quiz-3",
      question: "What is the maximum height of a B-Tree with n keys and minimum degree t?",
      options: ["log_2 n", "log_t n", "n/t", "t*log n"],
      correctAnswer: 1,
      explanation: "The maximum height of a B-Tree with n keys and minimum degree t is log_t n. This is because each node (except possibly the root) contains at least t-1 keys, so the height is logarithmic with base t relative to the number of keys."
    },
    {
      id: "btree-quiz-4",
      question: "Which variant of B-Tree maintains all data in leaf nodes and uses internal nodes only for indexing?",
      options: ["B* Tree", "B+ Tree", "2-3 Tree", "Red-Black Tree"],
      correctAnswer: 1,
      explanation: "A B+ Tree maintains all actual data (or record pointers) in leaf nodes. Internal nodes only contain keys that direct the search to the appropriate leaf node. This design optimizes for range queries and sequential access by linking leaf nodes together."
    },
    {
      id: "btree-quiz-5",
      question: "What is the primary advantage of B-Trees over balanced binary search trees like AVL or Red-Black Trees?",
      options: [
        "Lower time complexity for searches",
        "Reduced space complexity",
        "Fewer pointer manipulations during rebalancing",
        "Better performance with disk-based storage through reduced I/O operations"
      ],
      correctAnswer: 3,
      explanation: "The primary advantage of B-Trees over balanced binary search trees is their optimization for disk-based storage systems. By allowing many keys per node, B-Trees reduce the number of disk I/O operations needed to find a key, which is crucial for database and file system performance where disk access is much slower than memory access."
    }
  ],
  
  practice: {
    introduction: "The following problems will help you apply your understanding of B-Trees. While direct B-Tree implementation problems are less common in interview settings, the concepts appear in various tree and database-related problems.",
    questions: {
      easy: [
        {
          id: "binary-tree-level-order-traversal",
          title: "Binary Tree Level Order Traversal",
          link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
          description: "Perform level-order traversal on a binary tree, similar to how B-Trees are often traversed for operations."
        },
        {
          id: "search-in-a-binary-search-tree",
          title: "Search in a Binary Search Tree",
          link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
          description: "Implement a search operation in a BST, which follows the same principle as B-Tree search but with only one key per node."
        },
        {
          id: "count-complete-tree-nodes",
          title: "Count Complete Tree Nodes",
          link: "https://leetcode.com/problems/count-complete-tree-nodes/",
          description: "Count nodes in a complete binary tree efficiently, which requires understanding tree properties similar to those in B-Trees."
        }
      ],
      medium: [
        {
          id: "design-a-file-system",
          title: "Design a File System",
          link: "https://leetcode.com/problems/design-a-file-system/",
          description: "Design a file system structure that can efficiently create and get files, similar to how file systems use B-Trees."
        },
        {
          id: "range-sum-query-mutable",
          title: "Range Sum Query - Mutable",
          link: "https://leetcode.com/problems/range-sum-query-mutable/",
          description: "Implement a structure for efficient range sum queries with updates, which could utilize B-Tree-like indexing concepts."
        },
        {
          id: "lru-cache",
          title: "LRU Cache",
          link: "https://leetcode.com/problems/lru-cache/",
          description: "Design and implement a data structure that uses efficient lookup similar to B-Trees in database caching."
        }
      ],
      hard: [
        {
          id: "serialize-and-deserialize-n-ary-tree",
          title: "Serialize and Deserialize N-ary Tree",
          link: "https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/",
          description: "Serialize and deserialize an N-ary tree, which has multiple children like B-Tree nodes."
        },
        {
          id: "design-in-memory-file-system",
          title: "Design In-Memory File System",
          link: "https://leetcode.com/problems/design-in-memory-file-system/",
          description: "Design a more complex file system with directories and files, applying concepts from how B-Trees are used in real file systems."
        }
      ]
    }
  }
};

export default bTreeContent; 