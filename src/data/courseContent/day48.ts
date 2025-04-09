import { Content } from '@/types/course';

const loadBalancingCachingContent: Content = {
  introduction: "This module covers essential system design components: load balancing and caching. These technologies are fundamental to building scalable, high-performance distributed systems. Load balancers distribute traffic across multiple servers to optimize resource utilization and prevent overload, while caching stores frequently accessed data to reduce latency and backend load. Understanding these concepts is crucial for designing resilient systems that can handle large-scale traffic.",
  
  learningObjectives: [
    "Understand different load balancing algorithms and their appropriate use cases",
    "Implement caching strategies and evaluate their effectiveness in different scenarios",
    "Design systems that effectively combine load balancing and caching for optimal performance",
    "Analyze cache invalidation strategies and their impact on data consistency",
    "Apply load balancing patterns to microservices architectures"
  ],
  
  sections: [
    {
      title: "Load Balancing Fundamentals",
      content: "Load balancing is the process of distributing network traffic across multiple servers to ensure no single server bears too much demand. This improves application responsiveness and availability by enabling horizontal scaling and providing redundancy in case of server failures.",
      codeExamples: [
        {
          language: "java",
          code: `// Simple Round Robin Load Balancer implementation
public class RoundRobinLoadBalancer {
    private List<String> servers;
    private int currentIndex = 0;
    
    public RoundRobinLoadBalancer(List<String> servers) {
        this.servers = new ArrayList<>(servers);
    }
    
    // Thread-safe method to get next server
    public synchronized String getNextServer() {
        if (servers.isEmpty()) {
            return null;
        }
        
        String server = servers.get(currentIndex);
        currentIndex = (currentIndex + 1) % servers.size();
        return server;
    }
    
    // Add a new server to the rotation
    public synchronized void addServer(String server) {
        servers.add(server);
    }
    
    // Remove a server from rotation
    public synchronized boolean removeServer(String server) {
        boolean removed = servers.remove(server);
        if (removed && currentIndex >= servers.size()) {
            currentIndex = 0;
        }
        return removed;
    }
}`,
          explanation: "This implementation demonstrates a simple round-robin load balancer that distributes requests sequentially across available servers. The code handles server addition and removal while maintaining thread safety. Round-robin is one of the simplest load balancing algorithms, offering fair distribution when servers have similar capabilities and requests have uniform processing requirements."
        },
        {
          language: "java",
          code: `// Weighted Load Balancer implementation
public class WeightedLoadBalancer {
    private List<Server> servers;
    private int totalWeight = 0;
    private Random random = new Random();
    
    static class Server {
        String address;
        int weight;
        
        Server(String address, int weight) {
            this.address = address;
            this.weight = weight;
        }
    }
    
    public WeightedLoadBalancer(Map<String, Integer> serverWeights) {
        servers = new ArrayList<>();
        
        for (Map.Entry<String, Integer> entry : serverWeights.entrySet()) {
            servers.add(new Server(entry.getKey(), entry.getValue()));
            totalWeight += entry.getValue();
        }
    }
    
    // Get server based on weighted probability
    public synchronized String getServer() {
        if (totalWeight == 0) return null;
        
        int value = random.nextInt(totalWeight);
        int weightSum = 0;
        
        for (Server server : servers) {
            weightSum += server.weight;
            if (value < weightSum) {
                return server.address;
            }
        }
        
        // Should not reach here if weights are properly calculated
        return servers.get(servers.size() - 1).address;
    }
    
    // Update server weight
    public synchronized void updateWeight(String address, int newWeight) {
        for (Server server : servers) {
            if (server.address.equals(address)) {
                totalWeight = totalWeight - server.weight + newWeight;
                server.weight = newWeight;
                return;
            }
        }
    }
}`,
          explanation: "This weighted load balancer assigns varying probabilities to servers based on their capacity. Servers with higher weights receive proportionally more traffic. This approach is useful when servers have different processing capabilities or when you want to gradually introduce new servers by starting them with lower weights."
        }
      ]
    },
    {
      title: "Load Balancing Strategies",
      content: "Various load balancing algorithms serve different needs. Round-robin distributes requests sequentially, least connections routes to the server with fewest active connections, and IP hash maps client IPs to specific servers for session persistence. Modern systems often use adaptive strategies that consider server health, response times, and current load.",
      codeExamples: [
        {
          language: "java",
          code: `// Least Connections Load Balancer
public class LeastConnectionsLoadBalancer {
    private Map<String, Integer> serverConnections;
    
    public LeastConnectionsLoadBalancer(List<String> servers) {
        serverConnections = new HashMap<>();
        for (String server : servers) {
            serverConnections.put(server, 0);
        }
    }
    
    // Get server with least active connections
    public synchronized String getServer() {
        if (serverConnections.isEmpty()) {
            return null;
        }
        
        String selectedServer = null;
        int minConnections = Integer.MAX_VALUE;
        
        for (Map.Entry<String, Integer> entry : serverConnections.entrySet()) {
            if (entry.getValue() < minConnections) {
                minConnections = entry.getValue();
                selectedServer = entry.getKey();
            }
        }
        
        // Increment connection count for selected server
        serverConnections.put(selectedServer, minConnections + 1);
        return selectedServer;
    }
    
    // Release connection when request is complete
    public synchronized void releaseConnection(String server) {
        if (serverConnections.containsKey(server)) {
            int connections = serverConnections.get(server);
            if (connections > 0) {
                serverConnections.put(server, connections - 1);
            }
        }
    }
    
    // Add a new server with zero connections
    public synchronized void addServer(String server) {
        serverConnections.put(server, 0);
    }
    
    // Remove a server from the balancer
    public synchronized void removeServer(String server) {
        serverConnections.remove(server);
    }
}`,
          explanation: "The Least Connections algorithm directs traffic to the server with the fewest active connections, which helps distribute load based on current server capacity. This approach is particularly effective for requests with varying processing times, as it naturally adjusts traffic based on how busy each server is."
        },
        {
          language: "java",
          code: `// Consistent Hashing Load Balancer
public class ConsistentHashLoadBalancer {
    private final TreeMap<Integer, String> ring = new TreeMap<>();
    private final int replicas;
    private final HashFunction hashFunction;
    
    public interface HashFunction {
        int hash(String key);
    }
    
    public ConsistentHashLoadBalancer(List<String> servers, int replicas, HashFunction hashFunction) {
        this.replicas = replicas;
        this.hashFunction = hashFunction;
        
        for (String server : servers) {
            addServer(server);
        }
    }
    
    public synchronized void addServer(String server) {
        for (int i = 0; i < replicas; i++) {
            String virtualNode = server + "#" + i;
            int hash = hashFunction.hash(virtualNode);
            ring.put(hash, server);
        }
    }
    
    public synchronized void removeServer(String server) {
        for (int i = 0; i < replicas; i++) {
            String virtualNode = server + "#" + i;
            int hash = hashFunction.hash(virtualNode);
            ring.remove(hash);
        }
    }
    
    public String getServer(String key) {
        if (ring.isEmpty()) {
            return null;
        }
        
        int hash = hashFunction.hash(key);
        if (!ring.containsKey(hash)) {
            // Get the first key greater than or equal to the hash
            Map.Entry<Integer, String> entry = ring.ceilingEntry(hash);
            if (entry == null) {
                // Wrap around if we've reached the end of the ring
                entry = ring.firstEntry();
            }
            return entry.getValue();
        }
        return ring.get(hash);
    }
}`,
          explanation: "Consistent hashing assigns servers and requests to positions on a virtual 'ring.' Requests map to servers by finding the next server position in the ring. This minimizes redistribution when servers are added or removed, making it excellent for distributed caching systems where maintaining cache locality is important. The replicas parameter distributes server load more evenly across the ring."
        }
      ]
    },
    {
      title: "Caching Fundamentals",
      content: "Caching stores frequently accessed data in a fast-access storage layer to reduce retrieval times and backend load. Effective caching can dramatically improve application performance by serving repeated requests without expensive recomputation or database queries.",
      codeExamples: [
        {
          language: "java",
          code: `// Simple in-memory LRU Cache implementation
public class LRUCache<K, V> {
    private final int capacity;
    private final LinkedHashMap<K, V> cache;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        // LinkedHashMap with access order = true maintains LRU order
        this.cache = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }
    
    public synchronized V get(K key) {
        return cache.get(key);
    }
    
    public synchronized void put(K key, V value) {
        cache.put(key, value);
    }
    
    public synchronized void remove(K key) {
        cache.remove(key);
    }
    
    public synchronized int size() {
        return cache.size();
    }
    
    public synchronized void clear() {
        cache.clear();
    }
}`,
          explanation: "This LRU (Least Recently Used) cache implementation stores key-value pairs and evicts the least recently accessed items when capacity is reached. LRU is one of the most popular caching algorithms because it maintains high hit rates by keeping recently used items in the cache, which often correlates with items likely to be accessed again soon."
        },
        {
          language: "java",
          code: `// Two-level cache with local and distributed components
public class TwoLevelCache<K, V> {
    private final LRUCache<K, V> localCache;
    private final DistributedCache<K, V> distributedCache;
    
    public TwoLevelCache(int localCacheCapacity, DistributedCache<K, V> distributedCache) {
        this.localCache = new LRUCache<>(localCacheCapacity);
        this.distributedCache = distributedCache;
    }
    
    public V get(K key) {
        // Try to get from local cache first
        V value = localCache.get(key);
        
        if (value == null) {
            // If not in local cache, try distributed cache
            value = distributedCache.get(key);
            
            // If found in distributed cache, store in local cache for future access
            if (value != null) {
                localCache.put(key, value);
            }
        }
        
        return value;
    }
    
    public void put(K key, V value) {
        // Update both caches
        localCache.put(key, value);
        distributedCache.put(key, value);
    }
    
    public void remove(K key) {
        localCache.remove(key);
        distributedCache.remove(key);
    }
    
    // Interface for distributed cache implementations
    public interface DistributedCache<K, V> {
        V get(K key);
        void put(K key, V value);
        void remove(K key);
    }
}`,
          explanation: "This two-level cache demonstrates a common pattern in distributed systems: combining a fast local cache with a shared distributed cache. The local cache provides extremely low latency access to frequently used data, while the distributed cache ensures consistency across multiple application instances and serves as a fallback when data isn't in the local cache."
        }
      ]
    },
    {
      title: "Cache Invalidation Strategies",
      content: "Cache invalidation is the process of removing or updating cached data when the source data changes. The right strategy depends on your application's consistency requirements, update frequency, and tolerance for stale data.",
      codeExamples: [
        {
          language: "java",
          code: `// Time-based cache invalidation
public class TimeBasedCache<K, V> {
    private final Map<K, CacheEntry<V>> cache = new ConcurrentHashMap<>();
    private final long defaultTtlMs;
    
    private static class CacheEntry<V> {
        final V value;
        final long expirationTime;
        
        CacheEntry(V value, long expirationTime) {
            this.value = value;
            this.expirationTime = expirationTime;
        }
        
        boolean isExpired() {
            return System.currentTimeMillis() > expirationTime;
        }
    }
    
    public TimeBasedCache(long defaultTtlMs) {
        this.defaultTtlMs = defaultTtlMs;
    }
    
    public V get(K key) {
        CacheEntry<V> entry = cache.get(key);
        
        if (entry == null) {
            return null;
        }
        
        if (entry.isExpired()) {
            cache.remove(key);
            return null;
        }
        
        return entry.value;
    }
    
    public void put(K key, V value) {
        put(key, value, defaultTtlMs);
    }
    
    public void put(K key, V value, long ttlMs) {
        long expirationTime = System.currentTimeMillis() + ttlMs;
        cache.put(key, new CacheEntry<>(value, expirationTime));
    }
    
    // Clean expired entries (could be called by a background thread)
    public void evictExpiredEntries() {
        for (Map.Entry<K, CacheEntry<V>> entry : cache.entrySet()) {
            if (entry.getValue().isExpired()) {
                cache.remove(entry.getKey());
            }
        }
    }
}`,
          explanation: "Time-based invalidation uses a Time-To-Live (TTL) value to automatically expire cached data after a specified period. This strategy works well for data that changes at predictable intervals or where some staleness is acceptable. It's simple to implement and reduces coordination overhead, but may serve stale data until expiration."
        },
        {
          language: "java",
          code: `// Publisher-Subscriber based cache invalidation
public class PubSubCache<K, V> {
    private final Map<K, V> cache = new ConcurrentHashMap<>();
    private final List<InvalidationListener<K>> listeners = new CopyOnWriteArrayList<>();
    
    public interface InvalidationListener<K> {
        void onInvalidate(K key);
    }
    
    // Add an invalidation listener
    public void addInvalidationListener(InvalidationListener<K> listener) {
        listeners.add(listener);
    }
    
    // Remove an invalidation listener
    public void removeInvalidationListener(InvalidationListener<K> listener) {
        listeners.remove(listener);
    }
    
    // Put value in cache
    public void put(K key, V value) {
        cache.put(key, value);
    }
    
    // Get value from cache
    public V get(K key) {
        return cache.get(key);
    }
    
    // Invalidate an entry and notify all listeners
    public void invalidate(K key) {
        cache.remove(key);
        
        // Notify all listeners about the invalidation
        for (InvalidationListener<K> listener : listeners) {
            listener.onInvalidate(key);
        }
    }
    
    // Example usage for a distributed system
    public static class RedisInvalidationExample {
        public static void setupWithRedis(PubSubCache<String, Object> cache, RedisClient redisClient) {
            // Subscribe to invalidation events from Redis
            redisClient.subscribe("cache-invalidations", message -> {
                String key = message.toString();
                cache.invalidate(key);
            });
            
            // Add listener to publish invalidations to Redis
            cache.addInvalidationListener(key -> {
                redisClient.publish("cache-invalidations", key);
            });
        }
    }
}`,
          explanation: "Publisher-subscriber invalidation uses a messaging system to notify all cache instances when data changes. This approach provides near-real-time consistency across distributed caches. In this example, we implement the pattern with listeners and show how it could integrate with Redis pub/sub. This strategy works well in microservices architectures where multiple services maintain their own caches."
        }
      ]
    },
    {
      title: "Combining Load Balancing and Caching",
      content: "Effectively combining load balancing and caching can create highly scalable systems. Load balancers can use cache-aware routing to maintain cache locality, while caching can be implemented at multiple levels including CDN, gateway, service, and database layers.",
      codeExamples: [
        {
          language: "java",
          code: `// Cache-aware load balancer implementation
public class CacheAwareLoadBalancer {
    private final ConsistentHashLoadBalancer loadBalancer;
    private final Map<String, Set<String>> serverCacheKeys = new HashMap<>();
    
    public CacheAwareLoadBalancer(List<String> servers, int replicas) {
        this.loadBalancer = new ConsistentHashLoadBalancer(
            servers, 
            replicas, 
            key -> key.hashCode()
        );
        
        for (String server : servers) {
            serverCacheKeys.put(server, new HashSet<>());
        }
    }
    
    // Get server for a request based on cache key
    public String getServerForRequest(String cacheKey) {
        String server = loadBalancer.getServer(cacheKey);
        if (server != null) {
            // Track this key as being cached on this server
            serverCacheKeys.computeIfAbsent(server, k -> new HashSet<>()).add(cacheKey);
        }
        return server;
    }
    
    // Add a new server with cache warming capabilities
    public void addServer(String newServer, CacheWarmer cacheWarmer) {
        // Find keys that will be remapped to the new server
        Set<String> keysToWarm = new HashSet<>();
        for (Map.Entry<String, Set<String>> entry : serverCacheKeys.entrySet()) {
            String existingServer = entry.getKey();
            Set<String> cachedKeys = entry.getValue();
            
            Set<String> keysToRemove = new HashSet<>();
            for (String key : cachedKeys) {
                // Calculate which server the key would map to with the new server included
                loadBalancer.addServer(newServer);
                String newMappedServer = loadBalancer.getServer(key);
                loadBalancer.removeServer(newServer);
                
                // If this key would map to the new server, add it to the warming set
                if (newMappedServer.equals(newServer)) {
                    keysToWarm.add(key);
                    keysToRemove.add(key);
                }
            }
            
            // Remove keys that will be remapped
            cachedKeys.removeAll(keysToRemove);
        }
        
        // Warm up the cache on the new server
        cacheWarmer.warmCache(newServer, keysToWarm);
        
        // Now officially add the server
        loadBalancer.addServer(newServer);
        serverCacheKeys.put(newServer, new HashSet<>(keysToWarm));
    }
    
    // Interface for warming up a cache
    public interface CacheWarmer {
        void warmCache(String server, Set<String> keys);
    }
}`,
          explanation: "This cache-aware load balancer uses consistent hashing to maintain cache locality and includes a mechanism for warming caches when new servers are added. It tracks which keys are cached on which servers, enabling intelligent routing and cache pre-warming. This approach minimizes cache misses after scaling events, improving performance during system changes."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "lb-cache-hw1",
      question: "Design a load balancer for microservices with health checks and automatic failover. The load balancer should remove unhealthy instances from rotation and periodically check if they've recovered.",
      solution: "Implement a load balancer that maintains a list of available servers and their health status. Create a background thread that periodically sends health check requests to each server. If a server fails health checks, mark it as unhealthy and remove it from the active rotation. After a configurable waiting period, attempt to check the health again and reintroduce healthy servers to the rotation. The load balancer should support different routing algorithms and provide metrics on server health and response times."
    },
    {
      id: "lb-cache-hw2",
      question: "Implement a distributed cache with a write-through strategy and TTL-based invalidation. The cache should support sharding across multiple nodes and handle node failures gracefully.",
      solution: "Design a distributed cache using consistent hashing to shard data across nodes. Implement the write-through strategy by updating both the cache and the backing store in the same transaction. Use a TTL for each cache entry, and implement a background process to clean up expired entries. For fault tolerance, implement a mechanism to detect node failures and redistribute the cache segments of failed nodes. Consider maintaining replicas of each shard on different nodes for higher availability."
    },
    {
      id: "lb-cache-hw3",
      question: "Design a system to handle session persistence in a load-balanced environment. Ensure that requests from the same user session are routed to the same server while maintaining fault tolerance.",
      solution: "Implement a sticky sessions mechanism using cookie-based or IP-based affinity. Store a session identifier in a cookie or extract it from the client's IP. Use a consistent hashing algorithm to map session IDs to servers. To maintain fault tolerance, externalize the session data to a distributed cache or database, allowing any server to retrieve the session if the original server fails. Implement a fallback mechanism that routes requests to any available server if the preferred server is unavailable."
    },
    {
      id: "lb-cache-hw4",
      question: "Implement a cache preloading and warming strategy for a system that experiences predictable traffic patterns. The system should proactively cache frequently accessed data before peak usage periods.",
      solution: "Analyze access patterns to identify frequently accessed data during peak periods. Develop a prediction model based on historical access patterns. Implement a scheduled job that runs before anticipated peak times to preload the cache with likely-to-be-accessed data. The cache warming process should be gradual to avoid overwhelming backend systems. Include monitoring to track cache hit rates and adjust the preloading strategy based on actual usage patterns."
    }
  ],
  
  quiz: [
    {
      id: "lb-cache-q1",
      question: "Which load balancing algorithm is most appropriate when servers have varying processing capabilities?",
      options: [
        "Round Robin",
        "Least Connections",
        "Weighted Distribution",
        "IP Hash"
      ],
      correctAnswer: 2,
      explanation: "Weighted Distribution is most appropriate when servers have varying processing capabilities. This algorithm assigns a weight to each server based on its capacity, directing proportionally more traffic to servers with higher weights. This ensures that more powerful servers receive more requests, optimizing resource utilization across heterogeneous infrastructure."
    },
    {
      id: "lb-cache-q2",
      question: "What is the primary advantage of consistent hashing in distributed caching systems?",
      options: [
        "It always produces the same hash value for a given input",
        "It minimizes the number of keys that need to be remapped when the number of servers changes",
        "It guarantees perfect load distribution across all servers",
        "It eliminates the need for hash functions entirely"
      ],
      correctAnswer: 1,
      explanation: "The primary advantage of consistent hashing is that it minimizes the number of keys that need to be remapped when servers are added or removed. In traditional hashing, changing the number of servers typically requires remapping almost all keys, but consistent hashing only requires remapping the keys that were assigned to the specific server being added or removed, improving stability during scaling operations."
    },
    {
      id: "lb-cache-q3",
      question: "Which caching strategy is best suited for data that changes infrequently but requires strong consistency when it does change?",
      options: [
        "Time-based invalidation with short TTL",
        "Publisher-subscriber invalidation with immediate notification",
        "Write-through caching with versioning",
        "Cache-aside pattern with periodic refresh"
      ],
      correctAnswer: 1,
      explanation: "Publisher-subscriber invalidation with immediate notification is best suited for data that changes infrequently but requires strong consistency. This approach ensures that all cache instances are promptly notified when data changes, maintaining consistency across the system. Since changes are infrequent, the messaging overhead is minimal, making this an efficient approach for this scenario."
    },
    {
      id: "lb-cache-q4",
      question: "What is the main challenge when implementing sticky sessions in a load-balanced environment?",
      options: [
        "Increased complexity in load balancer configuration",
        "Reduced ability to distribute load evenly",
        "Potential for session loss if a server fails",
        "Higher network bandwidth requirements"
      ],
      correctAnswer: 2,
      explanation: "The main challenge when implementing sticky sessions is the potential for session loss if a server fails. When a user's requests are always routed to the same server and that server becomes unavailable, the session information may be lost unless it's externalized to a shared store. This creates a trade-off between the performance benefits of localized sessions and the reliability of distributed session management."
    },
    {
      id: "lb-cache-q5",
      question: "Which approach would best address the 'thundering herd' problem in distributed caching systems?",
      options: [
        "Increasing cache capacity",
        "Implementing exponential backoff for retries",
        "Using staggered cache expiration times",
        "Implementing cache lock/request coalescing"
      ],
      correctAnswer: 3,
      explanation: "Implementing cache lock/request coalescing best addresses the 'thundering herd' problem, where many clients simultaneously attempt to regenerate a cached item after it expires. With request coalescing, when the first request finds an expired cache entry, it acquires a lock and regenerates the value while subsequent requests wait for the regeneration rather than attempting their own. This prevents system overload from multiple concurrent regeneration attempts."
    }
  ]
};

export default loadBalancingCachingContent; 