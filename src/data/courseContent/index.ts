import { Content } from '@/types/course';
import timeComplexityContent from './day1';
import bitManipulationContent from './day2';
import arrayBasicsContent from './day3';
import twoPointersContent from './day4';
import slidingWindowContent from './day5';
import prefixSumContent from './day6';
import mockTestWeek1Content from './day7';
import singlyLinkedListContent from './day8';
import doublyLinkedListContent from './day9';
import stackBasicsContent from './day10';
import monotonicStackContent from './day11';
import queueFIFOContent from './day12';
import priorityQueueContent from './day13';
import mockTestWeek2Content from './day14';
import mergeSortContent from './day15';
import quickSortContent from './day16';
import binarySearchContent from './day17';
import search2DMatrixContent from './day18';
import binarySearchOnAnswerContent from './day19';
import mockTestWeek3Content from './day20';
import treeTraversalContent from './day21';
import bfsDfsTreeContent from './day22';
import lowestCommonAncestorContent from './day23';
import diameterOfTreeContent from './day24';
import mockTestTreesContent from './day25';
import graphRepresentationContent from './day26';
import bfsContent from './day27';
import dfsContent from './day28';
import dijkstraAlgorithmContent from './day29';
import mockTestGraphsContent from './day30';
import dpIntroductionContent from './day31';
import knapsackContent from './day32';
import lcsContent from './day33';
import dpOnTreesContent from './day34';
import mockTestWeek6Content from './day35';
import bellmanFordContent from './day36';
import floydWarshallContent from './day37';
import topologicalSortContent from './day38';
import mockTestWeek7Content from './day39';
import lisContent from './day40';
import editDistanceContent from './day41';
import dpOnGridContent from './day42';
import hardDPContent from './day43';
import mockTestWeek8Content from './day44';
import googleProblemContent from './day45';
import amazonProblemContent from './day46';
import microsoftProblemContent from './day47';
import loadBalancingCachingContent from './day48';
import capTheoremContent from './day49';
import microservicesDatabasesContent from './day50';
import systemDesignPatternsContent from './day51';

// Map of day numbers to their topics
export const dayToTopicMap: { [key: number]: string } = {
  // Month 1: Foundations & Problem-Solving Basics
  1: "Time Complexity, Big-O",
  2: "Bit Manipulation",
  3: "Arrays Basic",
  4: "Two Pointers",
  5: "Sliding Window",
  6: "Prefix Sum",
  7: "Mock Test (Week 1)",
  
  // Month 1: Week 2
  8: "Singly Linked List",
  9: "Doubly Linked List",
  10: "Stack Basics",
  11: "Monotonic Stack",
  12: "Queue (FIFO)",
  13: "Priority Queue (Heap)",
  14: "Mock Test (Week 2)",
  
  
  // Month 1: Week 3
  15: "Merge Sort",
  16: "Quick Sort",
  17: "Binary Search",
  18: "Search in 2D Matrix",
  19: "Binary Search on Answer",
  20: "Mock Test (Week 3)",
  
  // Month 2: Trees, Graphs & Dynamic Programming
  21: "Tree Traversals",
  22: "BFS & DFS",
  23: "Lowest Common Ancestor",
  24: "Diameter of Tree",
  25: "Mock Test (Week 4)",
  
  // Month 2: Week 2
  26: "Graph Representation",
  27: "BFS",
  28: "DFS",
  29: "Dijkstra's Algorithm",
  30: "Mock Test (Week 5)",
  
  // Month 2: Week 3
  31: "DP Introduction",
  32: "Knapsack",
  33: "Longest Common Subsequence",
  34: "DP on Trees",
  35: "Mock Test (Week 6)",
  
  // Month 3: Advanced DSA
  36: "Bellman-Ford Algorithm",
  37: "Floyd-Warshall Algorithm",
  38: "Topological Sort",
  39: "Mock Test (Week 7)",
  
  // Month 3: Week 2-3
  40: "Longest Increasing Subsequence",
  41: "Edit Distance",
  42: "DP on Grid",
  43: "Hard DP",
  44: "Mock Test (Week 8)",
  
  // Month 4: Mock Interviews & System Design
  45: "Company-tagged problems - Google",
  46: "Company-tagged problems - Amazon",
  47: "Company-tagged problems - Microsoft",
  48: "Load Balancing, Caching",
  49: "CAP Theorem",
  50: "Microservices & Databases",
  51: "Mock System Design Interviews"
};

// Map day numbers to their content
const courseContentMap: Record<number, Content> = {
  1: timeComplexityContent,
  2: bitManipulationContent,
  3: arrayBasicsContent,
  4: twoPointersContent,
  5: slidingWindowContent,
  6: prefixSumContent,
  7: mockTestWeek1Content,
  8: singlyLinkedListContent,
  9: doublyLinkedListContent,
  10: stackBasicsContent,
  11: monotonicStackContent,
  12: queueFIFOContent,
  13: priorityQueueContent,
  14: mockTestWeek2Content,
  15: mergeSortContent,
  16: quickSortContent,
  17: binarySearchContent,
  18: search2DMatrixContent,
  19: binarySearchOnAnswerContent,
  20: mockTestWeek3Content,
  21: treeTraversalContent,
  22: bfsDfsTreeContent,
  23: lowestCommonAncestorContent,
  24: diameterOfTreeContent,
  25: mockTestTreesContent,
  26: graphRepresentationContent,
  27: bfsContent,
  28: dfsContent,
  29: dijkstraAlgorithmContent,
  30: mockTestGraphsContent,
  31: dpIntroductionContent,
  32: knapsackContent,
  33: lcsContent,
  34: dpOnTreesContent,
  35: mockTestWeek6Content,
  36: bellmanFordContent,
  37: floydWarshallContent,
  38: topologicalSortContent,
  39: mockTestWeek7Content,
  40: lisContent,
  41: editDistanceContent,
  42: dpOnGridContent,
  43: hardDPContent,
  44: mockTestWeek8Content,
  45: googleProblemContent,
  46: amazonProblemContent,
  47: microsoftProblemContent,
  48: loadBalancingCachingContent,
  49: capTheoremContent,
  50: microservicesDatabasesContent,
  51: systemDesignPatternsContent
};

// Function to get content by day number
export const getContentByDay = (dayNumber: number): Content | null => {
  return courseContentMap[dayNumber] || null;
};

export default courseContentMap; 