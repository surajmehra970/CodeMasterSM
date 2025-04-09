import { Content } from '@/types/course';

const capTheoremContent: Content = {
  introduction: "The CAP Theorem is a fundamental principle in distributed systems that states it's impossible for a distributed data store to simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance. Understanding these trade-offs is crucial for designing robust distributed systems. This module explores the implications of CAP Theorem, discusses real-world examples, and provides strategies for system design based on specific requirements.",
  
  learningObjectives: [
    "Understand the three guarantees of the CAP Theorem and their implications",
    "Analyze distributed systems in terms of CAP Theorem trade-offs",
    "Evaluate when to prioritize consistency vs. availability in system design",
    "Implement strategies to mitigate the limitations imposed by the CAP Theorem",
    "Apply CAP Theorem concepts to real-world distributed database selection"
  ],
  
  sections: [
    {
      title: "Understanding CAP Theorem Fundamentals",
      content: "The CAP Theorem, proposed by Eric Brewer in 2000, states that a distributed system can only provide two of three guarantees: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite network failures). In practical terms, because network partitions are unavoidable, system designers must choose between consistency and availability.",
      codeExamples: [
        {
          language: "java",
          code: `// Simplified example illustrating CAP Theorem concepts
public class CAPExample {
    enum SystemType {
        CP,  // Consistent and Partition Tolerant
        AP,  // Available and Partition Tolerant
        CA   // Consistent and Available (theoretical only)
    }
    
    public static void demonstrateCAP(SystemType type, boolean isPartitioned) {
        switch (type) {
            case CP:
                if (isPartitioned) {
                    System.out.println("Partition detected. Blocking writes to maintain consistency.");
                    System.out.println("Some nodes will be unavailable until partition resolves.");
                    // In CP systems, during a partition, some nodes become unavailable
                    // to ensure data consistency across the available nodes
                } else {
                    System.out.println("Normal operation: System is consistent and available.");
                }
                break;
                
            case AP:
                if (isPartitioned) {
                    System.out.println("Partition detected. Continuing to accept writes.");
                    System.out.println("Warning: Data may be inconsistent across nodes.");
                    // In AP systems, during a partition, all nodes remain available
                    // but may have inconsistent data
                } else {
                    System.out.println("Normal operation: System is consistent and available.");
                }
                break;
                
            case CA:
                if (isPartitioned) {
                    System.out.println("Theoretical only: CA systems cannot handle partitions.");
                    System.out.println("In real distributed systems, partitions will happen.");
                    // CA systems don't exist in practical distributed systems
                    // because network partitions are inevitable
                } else {
                    System.out.println("Normal operation: System is consistent and available.");
                }
                break;
        }
    }
}`,
          explanation: "This code demonstrates the fundamental trade-offs in CAP Theorem through a simplified example. It shows how CP systems prioritize consistency over availability during network partitions, while AP systems continue to operate with potentially inconsistent data. The CA combination is included for completeness but highlighted as theoretical only, since real-world distributed systems must handle network partitions."
        }
      ]
    },
    {
      title: "Consistency Models in Distributed Systems",
      content: "Consistency in distributed systems exists on a spectrum rather than as a binary property. Models range from strong consistency (all reads receive the most recent write) to eventual consistency (all replicas eventually converge). Understanding these models helps in making appropriate trade-offs based on application requirements.",
      codeExamples: [
        {
          language: "java",
          code: `// Implementation of different consistency models
public class ConsistencyModels {
    // Strong consistency implementation example
    public class StrongConsistencyStorage<T> {
        private T value;
        private final Lock lock = new ReentrantLock();
        
        public T read() {
            lock.lock();
            try {
                return value;
            } finally {
                lock.unlock();
            }
        }
        
        public void write(T newValue) {
            lock.lock();
            try {
                // In a distributed system, this would involve consensus
                // across all nodes before returning success
                value = newValue;
            } finally {
                lock.unlock();
            }
        }
    }
    
    // Eventual consistency implementation example
    public class EventualConsistencyStorage<T> {
        private T value;
        private final List<ReplicationNode<T>> replicationNodes = new ArrayList<>();
        
        public void addReplicationNode(ReplicationNode<T> node) {
            replicationNodes.add(node);
        }
        
        public T read() {
            // Read from local replica without synchronization
            return value;
        }
        
        public void write(T newValue) {
            // Update local value immediately
            value = newValue;
            
            // Asynchronously propagate to replicas
            CompletableFuture.runAsync(() -> {
                for (ReplicationNode<T> node : replicationNodes) {
                    try {
                        node.replicate(newValue);
                    } catch (Exception e) {
                        // Handle replication failure, retry later
                        scheduledReplicationRetry(node, newValue);
                    }
                }
            });
        }
        
        private void scheduledReplicationRetry(ReplicationNode<T> node, T value) {
            // Implementation of retry logic for failed replications
            // This ensures eventual consistency even when nodes are temporarily unavailable
        }
    }
    
    // Interface for replication nodes
    public interface ReplicationNode<T> {
        void replicate(T value);
    }
}`,
          explanation: "This code illustrates implementations of strong and eventual consistency models. The strong consistency implementation uses locks to ensure all reads see the most recent write, which would translate to consensus protocols in distributed systems. The eventual consistency implementation allows immediate local updates and asynchronous propagation to replicas, with retry mechanisms to ensure all nodes eventually converge to the same state."
        }
      ]
    },
    {
      title: "Availability Strategies",
      content: "Availability in distributed systems refers to the system's ability to remain operational and respond to requests even during failures. Strategies to enhance availability include replication, load balancing, failover mechanisms, and circuit breakers.",
      codeExamples: [
        {
          language: "java",
          code: `// High availability patterns implementation
public class AvailabilityPatterns {
    // Circuit Breaker Pattern
    public class CircuitBreaker {
        private enum State { CLOSED, OPEN, HALF_OPEN }
        
        private State state = State.CLOSED;
        private int failureCount = 0;
        private final int failureThreshold;
        private long lastFailureTime;
        private final long resetTimeoutMs;
        
        public CircuitBreaker(int failureThreshold, long resetTimeoutMs) {
            this.failureThreshold = failureThreshold;
            this.resetTimeoutMs = resetTimeoutMs;
        }
        
        public <T> T executeWithCircuitBreaker(Supplier<T> operation) throws Exception {
            if (state == State.OPEN) {
                // Check if timeout has elapsed to transition to half-open
                if (System.currentTimeMillis() - lastFailureTime > resetTimeoutMs) {
                    state = State.HALF_OPEN;
                } else {
                    throw new RuntimeException("Circuit is open, fast failing request");
                }
            }
            
            try {
                T result = operation.get();
                
                // Success, close circuit if it was half-open
                if (state == State.HALF_OPEN) {
                    reset();
                }
                
                return result;
            } catch (Exception e) {
                recordFailure();
                throw e;
            }
        }
        
        private void recordFailure() {
            failureCount++;
            lastFailureTime = System.currentTimeMillis();
            
            if (state == State.HALF_OPEN || failureCount >= failureThreshold) {
                state = State.OPEN;
            }
        }
        
        private void reset() {
            state = State.CLOSED;
            failureCount = 0;
        }
    }
    
    // Read-Through Cache for improved availability
    public class ReadThroughCache<K, V> {
        private final Map<K, V> cache = new ConcurrentHashMap<>();
        private final Function<K, V> dataLoader;
        private final CircuitBreaker circuitBreaker;
        
        public ReadThroughCache(Function<K, V> dataLoader, int failureThreshold, long resetTimeoutMs) {
            this.dataLoader = dataLoader;
            this.circuitBreaker = new CircuitBreaker(failureThreshold, resetTimeoutMs);
        }
        
        public V get(K key) throws Exception {
            // Return cached value if available
            if (cache.containsKey(key)) {
                return cache.get(key);
            }
            
            // Load from source with circuit breaker protection
            try {
                V value = circuitBreaker.executeWithCircuitBreaker(() -> dataLoader.apply(key));
                cache.put(key, value);
                return value;
            } catch (Exception e) {
                // If failure is due to circuit being open, return stale data if available
                if (cache.containsKey(key)) {
                    // Log warning about stale data
                    return cache.get(key);
                }
                throw e;
            }
        }
    }
}`,
          explanation: "This code demonstrates practical patterns for improving system availability. The Circuit Breaker pattern prevents cascading failures by failing fast when a service is experiencing problems, allowing it time to recover. The Read-Through Cache improves availability by serving cached data when the primary data source is unavailable, implementing a pragmatic AP strategy where stale data is preferred over no data during failures."
        }
      ]
    },
    {
      title: "Partition Tolerance Techniques",
      content: "Partition tolerance refers to a system's ability to continue operating despite network partitions. Techniques to handle partitions include asynchronous replication, conflict resolution strategies, anti-entropy protocols, and partition-aware routing.",
      codeExamples: [
        {
          language: "java",
          code: `// Partition tolerance implementation examples
public class PartitionToleranceTechniques {
    // Vector Clock for conflict detection and resolution
    public class VectorClock {
        private final String nodeId;
        private final Map<String, Integer> clockValues = new HashMap<>();
        
        public VectorClock(String nodeId) {
            this.nodeId = nodeId;
            clockValues.put(nodeId, 0);
        }
        
        // Increment local counter for an event
        public void increment() {
            clockValues.put(nodeId, clockValues.getOrDefault(nodeId, 0) + 1);
        }
        
        // Merge with another vector clock
        public void merge(VectorClock other) {
            for (Map.Entry<String, Integer> entry : other.clockValues.entrySet()) {
                String id = entry.getKey();
                Integer otherValue = entry.getValue();
                Integer currentValue = clockValues.getOrDefault(id, 0);
                
                // Keep the maximum value for each node
                clockValues.put(id, Math.max(currentValue, otherValue));
            }
        }
        
        // Compare vector clocks to detect causality
        public CausalityResult compareTo(VectorClock other) {
            boolean greaterExists = false;
            boolean lessExists = false;
            
            // Check all keys from this clock
            for (Map.Entry<String, Integer> entry : clockValues.entrySet()) {
                String id = entry.getKey();
                Integer value = entry.getValue();
                Integer otherValue = other.clockValues.getOrDefault(id, 0);
                
                if (value > otherValue) {
                    greaterExists = true;
                } else if (value < otherValue) {
                    lessExists = true;
                }
            }
            
            // Check keys that exist only in the other clock
            for (String id : other.clockValues.keySet()) {
                if (!clockValues.containsKey(id) && other.clockValues.get(id) > 0) {
                    lessExists = true;
                }
            }
            
            if (greaterExists && lessExists) {
                return CausalityResult.CONCURRENT;
            } else if (greaterExists) {
                return CausalityResult.AFTER;
            } else if (lessExists) {
                return CausalityResult.BEFORE;
            } else {
                return CausalityResult.EQUAL;
            }
        }
        
        public enum CausalityResult {
            BEFORE,     // This event happened before the other
            AFTER,      // This event happened after the other
            CONCURRENT, // Events happened concurrently (conflict)
            EQUAL       // Vector clocks are identical
        }
    }
    
    // Conflict resolution with Last-Writer-Wins
    public class LWWRegister<T> {
        private T value;
        private long timestamp;
        private final String nodeId;
        private static final AtomicLong CLOCK = new AtomicLong(0);
        
        public LWWRegister(String nodeId) {
            this.nodeId = nodeId;
        }
        
        public synchronized T get() {
            return value;
        }
        
        public synchronized void set(T newValue) {
            long newTimestamp = CLOCK.incrementAndGet();
            if (newTimestamp > timestamp) {
                value = newValue;
                timestamp = newTimestamp;
            }
        }
        
        // Merge updates from another node
        public synchronized void merge(T remoteValue, long remoteTimestamp, String remoteNodeId) {
            // Update local clock
            CLOCK.updateAndGet(current -> Math.max(current, remoteTimestamp));
            
            // Apply remote update if it's newer
            if (remoteTimestamp > timestamp || 
                (remoteTimestamp == timestamp && remoteNodeId.compareTo(nodeId) > 0)) {
                value = remoteValue;
                timestamp = remoteTimestamp;
            }
        }
    }
}`,
          explanation: "This code demonstrates techniques for handling network partitions in distributed systems. The Vector Clock implementation provides a way to track causality between events, helping detect and resolve conflicts when partitioned nodes reconnect. The Last-Writer-Wins Register implements a simple conflict resolution strategy based on timestamps, with node IDs as tiebreakers. These mechanisms allow systems to continue operating during partitions and reconcile state when partitions heal."
        }
      ]
    },
    {
      title: "CAP in Real-World Systems",
      content: "Different distributed systems make different trade-offs within the CAP theorem. CP systems like relational databases with strong consistency prioritize correctness, while AP systems like NoSQL databases prioritize availability. Understanding these trade-offs helps in selecting the right database for specific application requirements.",
      codeExamples: [
        {
          language: "java",
          code: `// Examples of database selection based on CAP considerations
public class DatabaseSelectionExamples {
    public enum ConsistencyRequirement {
        STRONG,     // All nodes return the same data, always current
        EVENTUAL,   // Nodes converge over time, may return stale data
        CAUSAL      // Updates are seen in causal order
    }
    
    public enum AvailabilityRequirement {
        HIGH,       // System must be available even during partitions
        MODERATE    // System can reject requests during partitions
    }
    
    public static class DatabaseRecommender {
        public static List<String> recommendDatabases(
                ConsistencyRequirement consistency,
                AvailabilityRequirement availability) {
            
            List<String> recommendations = new ArrayList<>();
            
            if (consistency == ConsistencyRequirement.STRONG) {
                if (availability == AvailabilityRequirement.HIGH) {
                    recommendations.add("Warning: Strong consistency and high availability cannot be guaranteed simultaneously during partitions.");
                    recommendations.add("Consider relaxing consistency requirements or availability needs.");
                } else {
                    // CP systems
                    recommendations.add("PostgreSQL with synchronous replication");
                    recommendations.add("Google Cloud Spanner");
                    recommendations.add("Apache HBase");
                    recommendations.add("etcd");
                    recommendations.add("MongoDB (with majority write concern)");
                }
            } else if (consistency == ConsistencyRequirement.EVENTUAL) {
                if (availability == AvailabilityRequirement.HIGH) {
                    // AP systems
                    recommendations.add("Amazon DynamoDB");
                    recommendations.add("Apache Cassandra");
                    recommendations.add("Couchbase");
                    recommendations.add("Riak");
                    recommendations.add("Voldemort");
                } else {
                    recommendations.add("Any database can meet these requirements");
                    recommendations.add("Consider optimizing for other factors like performance or cost");
                }
            } else if (consistency == ConsistencyRequirement.CAUSAL) {
                if (availability == AvailabilityRequirement.HIGH) {
                    recommendations.add("Cosmos DB (with session consistency)");
                    recommendations.add("Cassandra (with application-level causality)");
                } else {
                    recommendations.add("CockroachDB");
                    recommendations.add("YugabyteDB");
                    recommendations.add("FaunaDB");
                }
            }
            
            return recommendations;
        }
        
        public static void explainConsistencyModel(String database) {
            switch (database.toLowerCase()) {
                case "postgresql":
                    System.out.println("PostgreSQL: CP system with ACID transactions and strong consistency.");
                    System.out.println("During network partitions, PostgreSQL with synchronous replication will refuse writes rather than risk inconsistency.");
                    break;
                    
                case "cassandra":
                    System.out.println("Cassandra: AP system with tunable consistency levels.");
                    System.out.println("Default behavior prioritizes availability over consistency during partitions.");
                    System.out.println("Uses eventual consistency with techniques like read repair and anti-entropy to reconcile data.");
                    break;
                    
                case "mongodb":
                    System.out.println("MongoDB: Configurable between CP and AP depending on write concern.");
                    System.out.println("With 'majority' write concern, behaves as CP system, prioritizing consistency.");
                    System.out.println("With lower write concerns, behaves more like AP system, prioritizing availability.");
                    break;
                    
                default:
                    System.out.println("Database details not available.");
            }
        }
    }
}`,
          explanation: "This code demonstrates a practical approach to database selection based on CAP Theorem considerations. It recommends specific databases based on application requirements for consistency and availability. The example also includes explanations of how real-world databases make different CAP trade-offs, helping developers understand which systems are appropriate for their specific use cases."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "cap-hw1",
      question: "Design a distributed shopping cart system that maintains availability even during network partitions. Describe the consistency model you would use and how you would handle conflict resolution when partitions heal.",
      solution: "Implement an AP system using eventual consistency. Use a Last-Write-Wins strategy with vector clocks for conflict resolution. Each user's cart state is replicated across multiple nodes, with local writes accepted even during partitions. When partitions heal, conflicts are resolved by comparing vector clocks and possibly merging cart contents. For items with quantity conflicts, either take the maximum value or alert the user. Ensure idempotent operations to prevent duplicate item additions during retries."
    },
    {
      id: "cap-hw2",
      question: "Design a distributed banking system where consistency is the primary requirement. Explain how the system would handle network partitions and what mechanisms you would use to ensure transaction integrity.",
      solution: "Implement a CP system using a strong consistency model. Use a consensus algorithm like Paxos or Raft to coordinate transactions across nodes. During network partitions, only nodes in the majority partition can process transactions, while minority partitions become read-only. Implement two-phase commit for distributed transactions, with a transaction coordinator tracking the state. Use write-ahead logging for durability and crash recovery. Consider implementing compensating transactions for rollback capabilities."
    },
    {
      id: "cap-hw3",
      question: "Compare and contrast how you would design a social media news feed system versus a payment processing system in terms of CAP theorem trade-offs. Explain your reasoning and provide specific examples of technologies you would use in each case.",
      solution: "For a social media news feed, prioritize availability and partition tolerance (AP) with eventual consistency. Use technologies like Cassandra or DynamoDB for posts storage, with Redis caching. Accept that users might temporarily see slightly outdated content during partitions. For payment processing, prioritize consistency and partition tolerance (CP) using systems like PostgreSQL with synchronous replication or a distributed database like CockroachDB. Implement compensating transactions for payment failures and use a messaging queue for retries. The key difference is that social media can tolerate stale data while payment systems require strong transaction guarantees to prevent financial errors."
    },
    {
      id: "cap-hw4",
      question: "Design a distributed caching system that supports both read-heavy and write-heavy workloads. Explain how you would balance consistency and availability requirements, and how your design would change based on different types of cached data.",
      solution: "Implement a tiered consistency model where critical data uses strong consistency while less critical data uses eventual consistency. For read-heavy data (e.g., product information), use a Read-One-Write-All approach with asynchronous updates and TTL-based invalidation. For write-heavy data (e.g., user sessions), use quorum-based consistency with configurable read/write quorums. Scale read capacity with read replicas and implement write sharding for write-heavy workloads. Use consistent hashing for cache node distribution. For critical data, implement lease-based cache invalidation to prevent stale reads, while using simple TTL for less critical data."
    }
  ],
  
  quiz: [
    {
      id: "cap-q1",
      question: "Which of the following is NOT one of the three guarantees described by the CAP theorem?",
      options: [
        "Consistency",
        "Availability",
        "Partition Tolerance",
        "Performance"
      ],
      correctAnswer: 3,
      explanation: "The CAP theorem specifically addresses three guarantees in distributed systems: Consistency (all nodes seeing the same data at the same time), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite network failures). Performance, while important, is not part of the CAP theorem's guarantees."
    },
    {
      id: "cap-q2",
      question: "In practical distributed systems, which combination is considered impossible to achieve simultaneously according to the CAP theorem?",
      options: [
        "Consistency and Availability",
        "Consistency and Partition Tolerance",
        "Availability and Partition Tolerance",
        "All three: Consistency, Availability, and Partition Tolerance"
      ],
      correctAnswer: 3,
      explanation: "According to the CAP theorem, it's impossible for a distributed system to simultaneously provide all three guarantees: Consistency, Availability, and Partition Tolerance. Since network partitions are inevitable in distributed systems, designers must choose between consistency and availability when partitions occur."
    },
    {
      id: "cap-q3",
      question: "Which type of system would MongoDB with a 'majority' write concern be classified as under the CAP theorem?",
      options: [
        "CA (Consistency and Availability)",
        "CP (Consistency and Partition Tolerance)",
        "AP (Availability and Partition Tolerance)",
        "CAP (all three simultaneously)"
      ],
      correctAnswer: 1,
      explanation: "MongoDB with a 'majority' write concern would be classified as a CP system (Consistency and Partition Tolerance). In this configuration, MongoDB ensures that data is consistent across a majority of nodes and will reject writes during network partitions if it cannot reach a majority, sacrificing availability to maintain consistency."
    },
    {
      id: "cap-q4",
      question: "Which consistency model allows reads to return stale data but guarantees that all replicas will eventually converge to the same state?",
      options: [
        "Strong consistency",
        "Sequential consistency",
        "Causal consistency",
        "Eventual consistency"
      ],
      correctAnswer: 3,
      explanation: "Eventual consistency allows reads to return stale (outdated) data but guarantees that all replicas will eventually converge to the same state if no new updates are made. This model prioritizes availability over immediate consistency and is common in AP systems like Cassandra and DynamoDB."
    },
    {
      id: "cap-q5",
      question: "What mechanism is commonly used to detect and resolve conflicts in eventually consistent systems when network partitions heal?",
      options: [
        "Two-phase commit",
        "Vector clocks",
        "Quorum consensus",
        "Blockchain validation"
      ],
      correctAnswer: 1,
      explanation: "Vector clocks are commonly used to detect and resolve conflicts in eventually consistent systems when network partitions heal. They track the causal relationship between different versions of data by maintaining counters for each node, allowing systems to determine whether updates occurred concurrently or in sequence, and to resolve conflicts appropriately."
    }
  ]
};

export default capTheoremContent; 