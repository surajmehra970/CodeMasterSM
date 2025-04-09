import { Content } from '@/types/course';

const systemDesignPatternsContent: Content = {
  introduction: "This module explores essential system design patterns used to create scalable, maintainable, and resilient distributed systems. We'll examine architectural patterns, integration strategies, and resilience techniques that form the foundation of modern enterprise and cloud-native applications.",
  
  learningObjectives: [
    "Understand key architectural patterns for distributed systems",
    "Apply appropriate integration patterns for different communication scenarios",
    "Implement resilience patterns to handle failures gracefully",
    "Design scalable systems using modern architectural approaches",
    "Evaluate trade-offs between different design patterns"
  ],
  
  sections: [
    {
      title: "Architectural Patterns",
      content: "Architectural patterns provide high-level structures for organizing complex systems. These patterns define how components interact, establishing the foundation for a system's quality attributes like scalability, maintainability, and performance.",
      codeExamples: [
        {
          language: "java",
          code: `// Microservices architecture example with Spring Boot
@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/orders")
class OrderController {
    private final OrderService orderService;
    private final ProductClient productClient;
    
    OrderController(OrderService orderService, ProductClient productClient) {
        this.orderService = orderService;
        this.productClient = productClient;
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        // Validate product availability via product service
        boolean productsAvailable = request.getItems().stream()
            .allMatch(item -> productClient.checkAvailability(item.getProductId(), item.getQuantity()));
            
        if (!productsAvailable) {
            return ResponseEntity.badRequest().build();
        }
        
        Order order = orderService.createOrder(request);
        return ResponseEntity.created(URI.create("/orders/" + order.getId())).body(order);
    }
}

// Layered architecture example
public class LayeredArchitectureExample {
    // Presentation layer
    public class OrderController {
        private final OrderService orderService;
        
        public OrderController(OrderService orderService) {
            this.orderService = orderService;
        }
        
        public void processOrderRequest(OrderRequest request) {
            orderService.createOrder(request);
        }
    }
    
    // Service layer
    public class OrderService {
        private final OrderRepository orderRepository;
        private final ProductService productService;
        
        public OrderService(OrderRepository orderRepository, ProductService productService) {
            this.orderRepository = orderRepository;
            this.productService = productService;
        }
        
        @Transactional
        public Order createOrder(OrderRequest request) {
            // Business logic
            validateOrder(request);
            Order order = convertToOrder(request);
            orderRepository.save(order);
            productService.updateInventory(order.getItems());
            return order;
        }
        
        private void validateOrder(OrderRequest request) {
            // Validation logic
        }
    }
    
    // Data access layer
    public interface OrderRepository extends JpaRepository<Order, Long> {
        List<Order> findByCustomerId(Long customerId);
    }
}`,
          explanation: "This example demonstrates two common architectural patterns. The first shows a microservices approach using Spring Boot, where the OrderService is a standalone service that communicates with other services (like ProductService) via APIs. The second example illustrates a layered architecture with clear separation between presentation, business logic, and data access layers, promoting separation of concerns and maintainability."
        }
      ]
    },
    {
      title: "Integration Patterns",
      content: "Integration patterns define how different components or systems communicate with each other. These patterns address challenges like coupling, reliability, and synchronization in distributed communications.",
      codeExamples: [
        {
          language: "java",
          code: `// Message Queue integration pattern
@Service
public class OrderProcessor {
    private final JmsTemplate jmsTemplate;
    private final ObjectMapper objectMapper;
    
    public OrderProcessor(JmsTemplate jmsTemplate, ObjectMapper objectMapper) {
        this.jmsTemplate = jmsTemplate;
        this.objectMapper = objectMapper;
    }
    
    public void processOrder(Order order) {
        try {
            // Send order to processing queue
            jmsTemplate.convertAndSend("order-processing-queue", 
                objectMapper.writeValueAsString(order));
                
            // Log success
            System.out.println("Order " + order.getId() + " sent for processing");
        } catch (Exception e) {
            // Handle exception
            System.err.println("Failed to queue order: " + e.getMessage());
        }
    }
}

@Component
public class OrderConsumer {
    private final OrderRepository orderRepository;
    private final EmailService emailService;
    
    @JmsListener(destination = "order-processing-queue")
    public void receiveOrder(String orderJson) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Order order = mapper.readValue(orderJson, Order.class);
        
        try {
            // Process the order
            order.setStatus("PROCESSING");
            orderRepository.save(order);
            
            // Notify customer
            emailService.sendOrderConfirmation(order);
        } catch (Exception e) {
            // Handle processing failure
            System.err.println("Order processing failed: " + e.getMessage());
            order.setStatus("FAILED");
            orderRepository.save(order);
        }
    }
}

// API Gateway pattern
@RestController
public class ApiGatewayController {
    private final RestTemplate restTemplate;
    private final CircuitBreakerFactory circuitBreakerFactory;
    
    public ApiGatewayController(RestTemplate restTemplate, 
                              CircuitBreakerFactory circuitBreakerFactory) {
        this.restTemplate = restTemplate;
        this.circuitBreakerFactory = circuitBreakerFactory;
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) {
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("productService");
        
        return circuitBreaker.run(
            () -> restTemplate.getForEntity("http://product-service/products/" + id, Product.class),
            throwable -> fallbackForProduct(id, throwable)
        );
    }
    
    private ResponseEntity<Product> fallbackForProduct(String id, Throwable throwable) {
        // Return cached data or a default response
        System.err.println("Product service is down. Using fallback for product: " + id);
        return ResponseEntity.ok(new Product(id, "Fallback Product", 0.0));
    }
}`,
          explanation: "This code demonstrates two important integration patterns. The Message Queue pattern shows asynchronous communication between services, where OrderProcessor sends orders to a queue and OrderConsumer processes them independently, providing decoupling and reliability. The API Gateway pattern illustrates how a single entry point can route client requests to multiple backend services while providing cross-cutting concerns like circuit breaking for fault tolerance."
        }
      ]
    },
    {
      title: "Resilience Patterns",
      content: "Resilience patterns help systems gracefully handle failures, ensuring reliability and availability even when components or dependencies fail. These patterns are essential for building robust distributed systems.",
      codeExamples: [
        {
          language: "java",
          code: `// Circuit Breaker pattern implementation
@Service
public class PaymentService {
    private final RestTemplate restTemplate;
    
    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public PaymentResponse processPayment(PaymentRequest paymentRequest) {
        return restTemplate.postForObject(
            "https://payment-processor.example.com/process",
            paymentRequest,
            PaymentResponse.class
        );
    }
    
    public PaymentResponse paymentFallback(PaymentRequest paymentRequest, Exception e) {
        // Log the failure
        System.err.println("Payment processing failed: " + e.getMessage());
        
        if (paymentRequest.isRetryable()) {
            // Queue for later processing
            queueForRetry(paymentRequest);
            return new PaymentResponse(Status.PENDING, "Payment queued for processing");
        } else {
            return new PaymentResponse(Status.FAILED, "Payment service unavailable");
        }
    }
    
    private void queueForRetry(PaymentRequest request) {
        // Implementation to queue failed request
    }
}

// Bulkhead pattern implementation
@Service
public class OrderService {
    @Bulkhead(name = "orderProcessing", type = Bulkhead.Type.THREADPOOL)
    public Order processOrder(OrderRequest request) {
        // Process order logic
        return createOrder(request);
    }
    
    @Bulkhead(name = "orderQueries", type = Bulkhead.Type.THREADPOOL)
    public List<Order> getCustomerOrders(Long customerId) {
        // Query logic
        return findOrdersByCustomer(customerId);
    }
    
    private Order createOrder(OrderRequest request) {
        // Implementation details
        return new Order();
    }
    
    private List<Order> findOrdersByCustomer(Long customerId) {
        // Implementation details
        return new ArrayList<>();
    }
}

// Retry pattern with exponential backoff
@Service
public class InventoryService {
    private final RestTemplate restTemplate;
    
    @Retry(name = "inventoryService", fallbackMethod = "inventoryFallback")
    public boolean reserveInventory(String productId, int quantity) {
        return restTemplate.postForObject(
            "https://inventory.example.com/reserve",
            new ReservationRequest(productId, quantity),
            Boolean.class
        );
    }
    
    public boolean inventoryFallback(String productId, int quantity, Exception e) {
        // Log failure and return conservative response
        System.err.println("Inventory reservation failed: " + e.getMessage());
        return false;
    }
}`,
          explanation: "This code demonstrates three important resilience patterns. The Circuit Breaker pattern prevents cascading failures by 'breaking the circuit' when a service is failing, with fallback behavior. The Bulkhead pattern isolates different types of operations into separate thread pools, preventing one type of operation from consuming all resources. The Retry pattern automatically retries failed operations with exponential backoff to handle transient failures. Together, these patterns create resilient systems that degrade gracefully during failures."
        }
      ]
    },
    {
      title: "Scalability Patterns",
      content: "Scalability patterns enable systems to handle growing loads by efficiently distributing work and managing resources. These patterns are crucial for designing systems that can scale with increasing demand.",
      codeExamples: [
        {
          language: "java",
          code: `// Sharding pattern for database scalability
@Service
public class UserService {
    private final List<JdbcTemplate> shardedDatabases;
    
    public UserService(List<JdbcTemplate> shardedDatabases) {
        this.shardedDatabases = shardedDatabases;
    }
    
    public User getUserById(String userId) {
        // Determine shard index based on user ID
        int shardIndex = calculateShardIndex(userId);
        
        // Use the appropriate database shard
        JdbcTemplate shard = shardedDatabases.get(shardIndex);
        
        return shard.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new Object[] { userId },
            (rs, rowNum) -> new User(
                rs.getString("id"),
                rs.getString("name"),
                rs.getString("email")
            )
        );
    }
    
    private int calculateShardIndex(String userId) {
        // Consistent hashing to determine shard
        return Math.abs(userId.hashCode() % shardedDatabases.size());
    }
}

// CQRS (Command Query Responsibility Segregation) pattern
public class CQRSExample {
    // Command side - optimized for writes
    @Service
    public class OrderCommandService {
        private final OrderRepository writeRepository;
        private final EventPublisher eventPublisher;
        
        public String createOrder(CreateOrderCommand command) {
            // Validate command
            validateCommand(command);
            
            // Create order entity
            Order order = new Order(
                UUID.randomUUID().toString(),
                command.getCustomerId(),
                command.getItems(),
                OrderStatus.CREATED,
                LocalDateTime.now()
            );
            
            // Save to write database
            writeRepository.save(order);
            
            // Publish event for read model updates
            eventPublisher.publish(new OrderCreatedEvent(order));
            
            return order.getId();
        }
    }
    
    // Query side - optimized for reads
    @Service
    public class OrderQueryService {
        private final OrderReadRepository readRepository;
        
        public OrderDTO getOrder(String orderId) {
            return readRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        }
        
        public List<OrderDTO> getCustomerOrders(String customerId) {
            return readRepository.findByCustomerId(customerId);
        }
        
        public List<OrderDTO> getRecentOrders(int limit) {
            return readRepository.findRecentOrders(limit);
        }
    }
    
    // Event handler to update read models
    @Component
    public class OrderEventHandler {
        private final OrderReadRepository readRepository;
        
        @EventListener
        public void handleOrderCreated(OrderCreatedEvent event) {
            OrderDTO orderDTO = mapToDTO(event.getOrder());
            readRepository.save(orderDTO);
        }
        
        private OrderDTO mapToDTO(Order order) {
            // Mapping logic
            return new OrderDTO();
        }
    }
}

// Event Sourcing pattern
public class EventSourcingExample {
    // Event store
    @Repository
    public class EventStore {
        private final JdbcTemplate jdbcTemplate;
        
        public void saveEvent(Event event) {
            jdbcTemplate.update(
                "INSERT INTO events (aggregate_id, type, data, timestamp) VALUES (?, ?, ?, ?)",
                event.getAggregateId(),
                event.getType(),
                serializeEvent(event),
                event.getTimestamp()
            );
        }
        
        public List<Event> getEventsForAggregate(String aggregateId) {
            return jdbcTemplate.query(
                "SELECT * FROM events WHERE aggregate_id = ? ORDER BY timestamp",
                new Object[] { aggregateId },
                (rs, rowNum) -> deserializeEvent(rs)
            );
        }
        
        private String serializeEvent(Event event) {
            try {
                return new ObjectMapper().writeValueAsString(event);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Failed to serialize event", e);
            }
        }
        
        private Event deserializeEvent(ResultSet rs) throws SQLException {
            try {
                String data = rs.getString("data");
                String type = rs.getString("type");
                Class<?> eventClass = Class.forName(type);
                return (Event) new ObjectMapper().readValue(data, eventClass);
            } catch (Exception e) {
                throw new RuntimeException("Failed to deserialize event", e);
            }
        }
    }
    
    // Aggregate rebuilt from events
    public class OrderAggregate {
        private String id;
        private OrderStatus status;
        private List<OrderItem> items = new ArrayList<>();
        private List<Event> uncommittedEvents = new ArrayList<>();
        
        public static OrderAggregate loadFromHistory(String orderId, EventStore eventStore) {
            OrderAggregate aggregate = new OrderAggregate();
            aggregate.id = orderId;
            
            List<Event> events = eventStore.getEventsForAggregate(orderId);
            events.forEach(aggregate::apply);
            
            return aggregate;
        }
        
        public void createOrder(String customerId, List<OrderItem> items) {
            OrderCreatedEvent event = new OrderCreatedEvent(
                id, customerId, items, LocalDateTime.now()
            );
            applyAndSave(event);
        }
        
        public void cancelOrder(String reason) {
            if (status == OrderStatus.DELIVERED) {
                throw new IllegalStateException("Cannot cancel delivered order");
            }
            
            OrderCancelledEvent event = new OrderCancelledEvent(
                id, reason, LocalDateTime.now()
            );
            applyAndSave(event);
        }
        
        private void applyAndSave(Event event) {
            apply(event);
            uncommittedEvents.add(event);
        }
        
        private void apply(Event event) {
            if (event instanceof OrderCreatedEvent) {
                this.status = OrderStatus.CREATED;
                this.items = ((OrderCreatedEvent) event).getItems();
            } else if (event instanceof OrderCancelledEvent) {
                this.status = OrderStatus.CANCELLED;
            }
            // Handle other event types
        }
        
        public List<Event> getUncommittedEvents() {
            return uncommittedEvents;
        }
        
        public void clearUncommittedEvents() {
            uncommittedEvents.clear();
        }
    }
}`,
          explanation: "This code demonstrates three scalability patterns. The Sharding pattern distributes data across multiple databases to handle large datasets and high write loads. The CQRS pattern separates read and write operations, allowing each side to scale independently and be optimized for its specific workload. The Event Sourcing pattern stores changes as a sequence of events, providing scalability through append-only operations and enabling powerful capabilities like temporal queries and system rebuilding."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "sdp-hw1",
      question: "Design a system for an e-commerce platform that can handle high traffic during sales events. Explain which architectural and scaling patterns you would use and why.",
      solution: "Implement a microservices architecture with services for products, orders, users, and payments. Use API Gateway for client access and service discovery. Apply CQRS to separate read and write workloads, with denormalized read models for product listings. Implement database sharding for user and order data based on user ID. Use event sourcing for order processing with async event handlers. Add a distributed cache layer using Redis for product information and user sessions. Implement circuit breakers between services and rate limiting at the API gateway. For scaling, use horizontal scaling with auto-scaling groups, with stateless services behind load balancers."
    },
    {
      id: "sdp-hw2",
      question: "Implement a resilient service that processes payments in a distributed system. Include code examples showing how you would handle failures in external payment gateways.",
      solution: "Use circuit breaker, retry, and fallback patterns. Implement payment service with Resilience4j circuit breaker to detect failed gateways. Use retry with exponential backoff for transient failures. Queue failed payments for later processing. Implement multiple payment providers with failover capability. Store payment attempts in a transactional database before external calls. Use the Saga pattern for distributed transactions with compensating actions if any step fails."
    },
    {
      id: "sdp-hw3",
      question: "Design an event-driven architecture for a social media platform that can efficiently handle millions of user interactions per day. Focus on message routing and processing patterns.",
      solution: "Use event sourcing to store user activities as events. Implement Apache Kafka for high-volume event streaming with topics for different interaction types. Use the publish-subscribe pattern with multiple consumer groups for different use cases. Implement event handlers for notifications, analytics, content recommendations, and feed updates. Use the CQRS pattern to separate interaction recording from feed generation. Deploy processors in a scalable Kubernetes cluster with auto-scaling based on queue length. Implement idempotent event processing to handle duplicate events safely."
    },
    {
      id: "sdp-hw4",
      question: "Compare and contrast the Microservices architecture with the Monolithic architecture. Provide scenarios where each would be the appropriate choice.",
      solution: "Microservices advantages: independent scaling, technology diversity, fault isolation, and team autonomy. Challenges include network latency, distributed transactions, and operational complexity. Appropriate for large systems with clear domain boundaries, evolving products, and teams distributed across multiple locations. Monolithic advantages: simplicity, performance, easier transactions, and simpler deployment. Challenges include scaling bottlenecks and technology lock-in. Appropriate for small teams, simple domains, early-stage startups, and systems with tight performance requirements. The decision should consider team size, system complexity, scaling needs, and organizational structure."
    }
  ],
  
  quiz: [
    {
      id: "sdp-q1",
      question: "Which pattern is primarily used to prevent a failing service from cascading failures to other services?",
      options: [
        "Bulkhead Pattern",
        "Circuit Breaker Pattern",
        "CQRS Pattern",
        "Saga Pattern"
      ],
      correctAnswer: 1,
      explanation: "The Circuit Breaker Pattern prevents cascading failures by 'breaking the circuit' when a service is failing repeatedly. It stops calls to the failing service after a threshold is reached, providing an alternate path or graceful degradation instead. This prevents the failure from affecting other services and gives the failing component time to recover."
    },
    {
      id: "sdp-q2",
      question: "Which architectural pattern separates read and write operations to allow independent optimization and scaling?",
      options: [
        "Event Sourcing",
        "Microservices",
        "CQRS (Command Query Responsibility Segregation)",
        "Layered Architecture"
      ],
      correctAnswer: 2,
      explanation: "CQRS (Command Query Responsibility Segregation) separates read operations (queries) from write operations (commands), allowing each side to be optimized and scaled independently. This pattern is particularly useful for systems with significant differences between read and write workloads, enabling specialized data models and performance optimizations for each type of operation."
    },
    {
      id: "sdp-q3",
      question: "Which integration pattern is best suited for decoupling services while ensuring reliable delivery of messages?",
      options: [
        "REST API",
        "Message Queue",
        "RPC (Remote Procedure Call)",
        "Database Integration"
      ],
      correctAnswer: 1,
      explanation: "Message Queue is the best pattern for decoupling services while ensuring reliable delivery. It allows asynchronous communication between services, with messages persisted in the queue until successfully processed. This provides temporal decoupling (services don't need to be available simultaneously) and reliable delivery even during service outages or network issues."
    },
    {
      id: "sdp-q4",
      question: "Which pattern stores all changes to the application state as a sequence of events?",
      options: [
        "Event Sourcing",
        "Publish-Subscribe",
        "Observer Pattern",
        "CQRS"
      ],
      correctAnswer: 0,
      explanation: "Event Sourcing stores all changes to the application state as a sequence of events. Instead of storing current state, it captures each state-changing event, providing a complete audit trail and enabling system reconstruction to any point in time. This pattern is powerful for systems requiring strong audit capabilities or complex event processing."
    },
    {
      id: "sdp-q5",
      question: "In a microservices architecture, which pattern provides a single entry point for all client requests while handling cross-cutting concerns?",
      options: [
        "Service Mesh",
        "API Gateway",
        "Event Bus",
        "Service Registry"
      ],
      correctAnswer: 1,
      explanation: "The API Gateway pattern provides a single entry point for all client requests in a microservices architecture. It handles cross-cutting concerns like authentication, routing, protocol translation, and rate limiting. This simplifies client interaction with the system by hiding the complexity of the microservices topology and providing a unified interface."
    }
  ]
};

export default systemDesignPatternsContent; 