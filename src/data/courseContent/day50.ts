import { Content } from '@/types/course';

const microservicesDatabasesContent: Content = {
  introduction: "This module explores the intersection of microservices architecture and database design. Microservices architecture enables building complex applications as a suite of small, independent services, while database selection and design are critical for each service's performance and scalability. We'll examine strategies for database selection, data consistency patterns, and communication between microservices, providing practical patterns for building resilient, maintainable distributed systems.",
  
  learningObjectives: [
    "Understand key principles of microservices architecture and their implications for database design",
    "Evaluate different database types and their suitability for various microservice requirements",
    "Implement data consistency patterns across distributed microservice databases",
    "Design effective communication patterns between microservices",
    "Apply best practices for securing microservices and their data stores"
  ],
  
  sections: [
    {
      title: "Microservices Architecture Fundamentals",
      content: "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service encapsulates a specific business capability, has its own data storage, and communicates with other services through well-defined APIs. This approach enables teams to develop, deploy, and scale services independently, but introduces challenges in data consistency and service coordination.",
      codeExamples: [
        {
          language: "java",
          code: `// Example Spring Boot microservice
@SpringBootApplication
@RestController
public class ProductService {
    
    private final ProductRepository repository;
    
    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Optional<Product> product = repository.findById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saved = repository.save(product);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }
    
    // Product entity
    @Entity
    public static class Product {
        @Id
        @GeneratedValue
        private Long id;
        private String name;
        private BigDecimal price;
        
        // Getters and setters omitted for brevity
    }
    
    // Repository interface
    public interface ProductRepository extends JpaRepository<Product, Long> {
        // Spring Data JPA provides implementation automatically
    }
}`,
          explanation: "This code demonstrates a basic microservice for product management using Spring Boot. It encapsulates a specific business domain (products) with its own data model, persistence layer, and API endpoints. The service follows REST principles and uses Spring Data JPA for database operations. In a microservices architecture, this would be one of many independent services that collectively form the complete application."
        }
      ]
    },
    {
      title: "Database Selection for Microservices",
      content: "Microservices architecture enables polyglot persistence—using different database types based on each service's specific requirements. Relational databases provide strong consistency and transactions for complex data relationships, while NoSQL databases offer flexibility, scalability, and performance for specific data access patterns. The right choice depends on the service's data model, query patterns, consistency requirements, and scaling needs.",
      codeExamples: [
        {
          language: "java",
          code: `// MongoDB repository for a catalog service
@Service
public class CatalogService {
    
    private final ProductRepository repository;
    
    public CatalogService(ProductRepository repository) {
        this.repository = repository;
    }
    
    public List<Product> findProductsByCategory(String category) {
        return repository.findByCategory(category);
    }
    
    public List<Product> searchProducts(String query) {
        // Text search using MongoDB's capabilities
        return repository.findByNameContainingOrDescriptionContaining(query, query);
    }
    
    // MongoDB document
    @Document(collection = "products")
    public static class Product {
        @Id
        private String id;
        private String name;
        private String description;
        private String category;
        private Map<String, Object> attributes; // Flexible schema
        private List<String> tags;
        
        // Getters and setters omitted for brevity
    }
    
    // MongoDB repository
    public interface ProductRepository extends MongoRepository<Product, String> {
        List<Product> findByCategory(String category);
        List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
    }
}

// Relational database repository for an order service
@Service
public class OrderService {
    
    private final OrderRepository repository;
    
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
    
    @Transactional
    public Order createOrder(Order order) {
        // Validate order items, calculate totals, etc.
        return repository.save(order);
    }
    
    public List<Order> findOrdersByCustomer(Long customerId) {
        return repository.findByCustomerId(customerId);
    }
    
    // JPA entities with relationships
    @Entity
    @Table(name = "orders")
    public static class Order {
        @Id
        @GeneratedValue
        private Long id;
        
        private Long customerId;
        private LocalDateTime orderDate;
        private String status;
        
        @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
        private List<OrderItem> items = new ArrayList<>();
        
        // Getters and setters omitted for brevity
    }
    
    @Entity
    @Table(name = "order_items")
    public static class OrderItem {
        @Id
        @GeneratedValue
        private Long id;
        
        @ManyToOne
        @JoinColumn(name = "order_id")
        private Order order;
        
        private String productId;
        private int quantity;
        private BigDecimal price;
        
        // Getters and setters omitted for brevity
    }
    
    // Spring Data JPA repository
    public interface OrderRepository extends JpaRepository<Order, Long> {
        List<Order> findByCustomerId(Long customerId);
    }
}`,
          explanation: "This example demonstrates database selection based on service requirements. The catalog service uses MongoDB (a NoSQL database) for its flexible schema, which is ideal for product data with varying attributes and efficient text search capabilities. The order service uses a relational database with JPA for complex relationships between orders and items, and to ensure ACID transactions during order creation. This polyglot persistence approach allows each service to use the most appropriate database for its specific needs."
        }
      ]
    },
    {
      title: "Data Consistency Patterns",
      content: "Maintaining data consistency across microservices is challenging due to distributed data ownership. Patterns like Saga, Event Sourcing, and CQRS help manage consistency while preserving service independence. These patterns often rely on eventual consistency, where the system guarantees that all services will eventually have consistent data, though temporary inconsistencies may exist.",
      codeExamples: [
        {
          language: "java",
          code: `// Saga pattern implementation for order processing
@Service
public class OrderSagaCoordinator {
    
    private final OrderService orderService;
    private final InventoryService inventoryService;
    private final PaymentService paymentService;
    private final ShippingService shippingService;
    private final MessagePublisher eventPublisher;
    
    // Constructor with dependency injection omitted
    
    @Transactional
    public void processOrder(Order order) {
        try {
            // Step 1: Create order in pending state
            Order createdOrder = orderService.createOrder(order);
            
            try {
                // Step 2: Reserve inventory
                InventoryReservation reservation = inventoryService.reserveInventory(createdOrder);
                
                try {
                    // Step 3: Process payment
                    Payment payment = paymentService.processPayment(createdOrder);
                    
                    try {
                        // Step 4: Schedule shipping
                        Shipment shipment = shippingService.scheduleShipment(createdOrder);
                        
                        // All steps successful - update order status
                        orderService.updateOrderStatus(createdOrder.getId(), "CONFIRMED");
                        
                        // Publish order completed event
                        eventPublisher.publish(new OrderCompletedEvent(createdOrder.getId()));
                        
                    } catch (Exception e) {
                        // Compensating transaction for shipping failure
                        paymentService.refundPayment(payment.getId());
                        inventoryService.releaseReservation(reservation.getId());
                        orderService.updateOrderStatus(createdOrder.getId(), "FAILED");
                        throw e;
                    }
                } catch (Exception e) {
                    // Compensating transaction for payment failure
                    inventoryService.releaseReservation(reservation.getId());
                    orderService.updateOrderStatus(createdOrder.getId(), "FAILED");
                    throw e;
                }
            } catch (Exception e) {
                // Compensating transaction for inventory failure
                orderService.updateOrderStatus(createdOrder.getId(), "FAILED");
                throw e;
            }
        } catch (Exception e) {
            // Handle or log the exception
            throw new OrderProcessingException("Failed to process order", e);
        }
    }
}

// Event Sourcing and CQRS example
@Service
public class ProductCommandService {
    
    private final EventStore eventStore;
    private final MessagePublisher eventPublisher;
    
    public void createProduct(CreateProductCommand command) {
        // Create a new event
        ProductCreatedEvent event = new ProductCreatedEvent(
            UUID.randomUUID().toString(),
            command.getName(),
            command.getPrice(),
            command.getDescription(),
            LocalDateTime.now()
        );
        
        // Store the event
        eventStore.store(event);
        
        // Publish the event for query services to update their views
        eventPublisher.publish(event);
    }
    
    public void updateProductPrice(UpdateProductPriceCommand command) {
        // Validate that product exists
        if (!eventStore.exists(command.getProductId())) {
            throw new ProductNotFoundException(command.getProductId());
        }
        
        // Create price updated event
        ProductPriceUpdatedEvent event = new ProductPriceUpdatedEvent(
            command.getProductId(),
            command.getNewPrice(),
            LocalDateTime.now()
        );
        
        // Store the event
        eventStore.store(event);
        
        // Publish the event
        eventPublisher.publish(event);
    }
}

@Service
public class ProductQueryService {
    
    private final ProductRepository repository;
    private final EventConsumer eventConsumer;
    
    @PostConstruct
    public void subscribe() {
        eventConsumer.subscribe(ProductCreatedEvent.class, this::handleProductCreated);
        eventConsumer.subscribe(ProductPriceUpdatedEvent.class, this::handleProductPriceUpdated);
    }
    
    private void handleProductCreated(ProductCreatedEvent event) {
        Product product = new Product();
        product.setId(event.getProductId());
        product.setName(event.getName());
        product.setPrice(event.getPrice());
        product.setDescription(event.getDescription());
        
        repository.save(product);
    }
    
    private void handleProductPriceUpdated(ProductPriceUpdatedEvent event) {
        repository.findById(event.getProductId())
            .ifPresent(product -> {
                product.setPrice(event.getNewPrice());
                repository.save(product);
            });
    }
    
    public List<Product> findAllProducts() {
        return repository.findAll();
    }
    
    public Optional<Product> findProductById(String id) {
        return repository.findById(id);
    }
}`,
          explanation: "This code demonstrates two patterns for maintaining data consistency across microservices. The Saga pattern orchestrates a distributed transaction across multiple services (Order, Inventory, Payment, Shipping) with compensating transactions to roll back changes if any step fails. The Event Sourcing and CQRS (Command Query Responsibility Segregation) pattern separates write operations (commands) from read operations (queries), storing all changes as events and updating materialized views asynchronously. These patterns help maintain consistency without tight coupling between services."
        }
      ]
    },
    {
      title: "Microservices Communication Patterns",
      content: "Microservices communicate through various patterns, each with trade-offs in coupling, reliability, and latency. Synchronous communication (REST, gRPC) provides immediate responses but introduces temporal coupling. Asynchronous communication (message queues, event streaming) decouples services temporally but adds complexity in tracking request state and handling failures.",
      codeExamples: [
        {
          language: "java",
          code: `// REST API client for synchronous communication
@Service
public class ProductServiceClient {
    
    private final RestTemplate restTemplate;
    private final String productServiceUrl;
    
    public ProductServiceClient(RestTemplate restTemplate, String productServiceUrl) {
        this.restTemplate = restTemplate;
        this.productServiceUrl = productServiceUrl;
    }
    
    public Product getProduct(String id) {
        return restTemplate.getForObject(productServiceUrl + "/products/{id}", 
                                       Product.class, id);
    }
    
    @CircuitBreaker(name = "productService", fallbackMethod = "getProductFallback")
    public List<Product> getProductsByCategory(String category) {
        ResponseEntity<List<Product>> response = restTemplate.exchange(
            productServiceUrl + "/products?category={category}",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Product>>() {},
            category
        );
        return response.getBody();
    }
    
    private List<Product> getProductFallback(String category, Throwable t) {
        // Return cached or default products for this category
        // Falling back to cached products
        return cachedProductsByCategory.getOrDefault(category, Collections.emptyList());
    }
}

// Kafka consumer for asynchronous communication
@Service
public class OrderEventConsumer {
    
    private final ShipmentService shipmentService;
    
    @KafkaListener(topics = "orders")
    public void processOrder(ConsumerRecord<String, String> record) {
        String key = record.key();
        String event = record.value();
        int partition = record.partition();
        long timestamp = record.timestamp();
        
        // Process order event
        
        // Update inventory
        inventoryService.updateInventory(event);
    }
}

// gRPC client for efficient synchronous communication
@Service
public class InventoryGrpcClient {
    
    private final InventoryServiceGrpc.InventoryServiceBlockingStub blockingStub;
    
    public InventoryGrpcClient(ManagedChannel channel) {
        this.blockingStub = InventoryServiceGrpc.newBlockingStub(channel);
    }
    
    public boolean checkAvailability(String productId, int quantity) {
        AvailabilityRequest request = AvailabilityRequest.newBuilder()
            .setProductId(productId)
            .setQuantity(quantity)
            .build();
        
        try {
            AvailabilityResponse response = blockingStub.checkAvailability(request);
            return response.getAvailable();
        } catch (StatusRuntimeException e) {
            console.error("RPC failed: " + e.getStatus());
            throw new ServiceException("Inventory service unavailable", e);
        }
    }
    
    public void reserveInventory(String orderId, List<OrderItem> items) {
        ReservationRequest.Builder requestBuilder = ReservationRequest.newBuilder()
            .setOrderId(orderId);
        
        for (OrderItem item : items) {
            requestBuilder.addItems(ItemQuantity.newBuilder()
                .setProductId(item.getProductId())
                .setQuantity(item.getQuantity())
                .build());
        }
        
        try {
            ReservationResponse response = blockingStub.reserveInventory(requestBuilder.build());
            if (!response.getSuccess()) {
                throw new InsufficientInventoryException(response.getMessage());
            }
        } catch (StatusRuntimeException e) {
            console.error("RPC failed: " + e.getStatus());
            throw new ServiceException("Inventory service unavailable", e);
        }
    }
}`,
          explanation: "This code showcases three common communication patterns in microservices architecture. The REST client demonstrates synchronous HTTP communication with a circuit breaker for resilience. The Kafka consumer illustrates asynchronous event-driven communication where services react to events without direct coupling. The gRPC client shows efficient RPC-style communication with strongly typed contracts, suitable for high-throughput internal service communication. Each pattern has different trade-offs in terms of coupling, latency, and reliability."
        }
      ]
    },
    {
      title: "Security in Microservices and Databases",
      content: "Securing microservices involves protecting both the services and their data stores. Authentication, authorization, secure communication, and data protection are essential considerations. The distributed nature of microservices introduces additional security challenges compared to monolithic applications.",
      codeExamples: [
        {
          language: "java",
          code: `// JWT authentication and authorization in a microservice
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    private final JwtTokenProvider tokenProvider;
    
    public SecurityConfig(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/public/**").permitAll()
                .antMatchers("/api/orders/**").hasRole("USER")
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            .and()
            .apply(new JwtConfigurer(tokenProvider));
    }
}

// Database security implementation
@Configuration
public class DatabaseSecurityConfig {
    
    private final String encryptionKey;
    
    public DatabaseSecurityConfig(String encryptionKey) {
        this.encryptionKey = encryptionKey;
    }
    
    @Bean
    public EncryptionService encryptionService() {
        return new AesEncryptionService(encryptionKey);
    }
    
    @Bean
    public AttributeConverter<String, String> sensitiveDataConverter() {
        return new SensitiveDataConverter(encryptionService());
    }
    
    // Converter for sensitive data (PII)
    public class SensitiveDataConverter implements AttributeConverter<String, String> {
        
        private final EncryptionService encryptionService;
        
        public SensitiveDataConverter(EncryptionService encryptionService) {
            this.encryptionService = encryptionService;
        }
        
        @Override
        public String convertToDatabaseColumn(String attribute) {
            return attribute == null ? null : encryptionService.encrypt(attribute);
        }
        
        @Override
        public String convertToEntityAttribute(String dbData) {
            return dbData == null ? null : encryptionService.decrypt(dbData);
        }
    }
}

// Customer entity with encrypted sensitive data
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    
    @Convert(converter = SensitiveDataConverter.class)
    private String emailAddress;
    
    @Convert(converter = SensitiveDataConverter.class)
    private String phoneNumber;
    
    // Regular fields and encrypted sensitive data are used normally in the code
    // but stored encrypted in the database
}

// API Gateway security filter for service-to-service communication
@Component
public class ServiceAuthenticationFilter extends OncePerRequestFilter {
    
    private final ServiceCredentialsRepository credentialsRepository;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) throws ServletException, IOException {
        
        String serviceId = request.getHeader("X-Service-ID");
        String serviceKey = request.getHeader("X-Service-Key");
        
        if (serviceId == null || serviceKey == null) {
            // Missing credentials - continue to other authentication methods
            filterChain.doFilter(request, response);
            return;
        }
        
        // Validate service credentials
        if (!credentialsRepository.validateServiceCredentials(serviceId, serviceKey)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid service credentials");
            return;
        }
        
        // Add service details to security context
        ServiceAuthenticationToken authentication = 
            new ServiceAuthenticationToken(serviceId, 
                                         credentialsRepository.getServiceAuthorities(serviceId));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        filterChain.doFilter(request, response);
    }
}`,
          explanation: "This code demonstrates security implementation in a microservices architecture. The JWT configuration shows how to secure service endpoints with token-based authentication and role-based authorization. The database security section illustrates how to protect sensitive data through encryption at the persistence layer. The service authentication filter demonstrates secure service-to-service communication using API keys. Together, these components form a multi-layered security approach that protects both the services and their data."
        }
      ]
    }
  ],
  
  homework: [
    {
      id: "microservices-db-hw1",
      question: "Design a microservices architecture for an e-commerce platform, focusing on the database choices for each service. Justify your database selections based on the specific requirements of each service.",
      solution: "Create distinct microservices for: 1) Products (MongoDB for flexible schema to handle varying product attributes and categories), 2) User Profiles (PostgreSQL for relational data with personal information), 3) Orders (PostgreSQL with transactions for financial consistency), 4) Inventory (Redis for high-speed availability checks), 5) Search (Elasticsearch for full-text product search), 6) Reviews (MongoDB for schema flexibility and document storage), 7) Cart (Redis for high performance and time-limited data), and 8) Payments (PostgreSQL for ACID transactions and financial audit trails). Connect services via REST for queries and Kafka for events like order creation, inventory updates, etc. Implement API Gateway for client access and service discovery using Consul or Eureka."
    },
    {
      id: "microservices-db-hw2",
      question: "Implement a Saga pattern for a flight booking system that involves multiple services: flight reservation, payment processing, seat allocation, and notification. Detail how you would handle compensation transactions if any step fails.",
      solution: "Implement a choreography-based Saga with event-driven communication. Each service publishes events and subscribes to relevant events from other services. If the payment service fails after flight reservation, it publishes a PaymentFailedEvent, triggering the flight service to release the reservation by listening to this event. Similarly, if seat allocation fails, it publishes a SeatAllocationFailedEvent that triggers payment refund and flight reservation cancellation. Use a distributed event store (like Kafka) to ensure event delivery. Include a timeout mechanism for each step to handle cases where services don't respond, and implement idempotent operations to safely retry steps if needed."
    },
    {
      id: "microservices-db-hw3",
      question: "Design a strategy for handling distributed transactions across microservices that use different types of databases (SQL and NoSQL). Focus on maintaining data consistency without tight coupling between services.",
      solution: "Implement an event-driven architecture with the Outbox Pattern: 1) When a service performs a local transaction, it also writes events to an 'outbox' table in its database as part of the same transaction, 2) A separate Message Relay process periodically polls the outbox table and publishes events to a message broker, 3) Services that need to react to these events subscribe to the appropriate topics and perform their local transactions. Use idempotent event handlers to handle duplicate messages safely. For query consistency, implement CQRS with materialized views that are updated asynchronously based on events. Monitor data consistency with reconciliation processes that detect and resolve discrepancies."
    },
    {
      id: "microservices-db-hw4",
      question: "Develop a strategy for securing sensitive customer data in a microservices architecture where customer information is accessed by multiple services. Address both data at rest and data in transit security concerns.",
      solution: "Implement a layered security approach: 1) For data at rest, use column-level encryption for PII in databases, with keys managed by a dedicated key management service, 2) For data in transit, use mutual TLS between services and encrypt all external communications, 3) Create a dedicated Identity Service that acts as the system of record for customer data, with other services storing only customer IDs and requesting sensitive data via secure APIs when needed, 4) Implement attribute-based access control (ABAC) for fine-grained authorization, 5) Use API gateways to enforce consistent authentication, 6) Maintain audit logs for all access to sensitive data, 7) Implement data minimization principles by limiting which services can access full customer profiles, and 8) Use token-based data access with short-lived tokens for temporary access to sensitive information."
    }
  ],
  
  quiz: [
    {
      id: "microservices-db-q1",
      question: "Which database characteristic is most important for a microservice that processes financial transactions?",
      options: [
        "Schema flexibility",
        "Full-text search capabilities",
        "ACID transaction support",
        "Geographic distribution"
      ],
      correctAnswer: 2,
      explanation: "ACID transaction support is the most important database characteristic for financial transaction processing because it ensures Atomicity (transactions are all-or-nothing), Consistency (transactions bring the database from one valid state to another), Isolation (concurrent transactions don't interfere with each other), and Durability (completed transactions survive system failures). These properties are essential for maintaining financial data integrity and preventing issues like double-spending or lost transactions."
    },
    {
      id: "microservices-db-q2",
      question: "Which communication pattern is most appropriate for a microservices scenario where multiple services need to react to an event but the originating service doesn't need to wait for their responses?",
      options: [
        "Synchronous REST API calls",
        "Remote Procedure Calls (RPC)",
        "Request-response over HTTP",
        "Asynchronous event publishing"
      ],
      correctAnswer: 3,
      explanation: "Asynchronous event publishing is most appropriate when multiple services need to react to an event without the originating service waiting for responses. This pattern decouples the services temporally and allows them to process the event at their own pace. It's ideal for scenarios like 'order placed' events where inventory, shipping, notification, and analytics services all need to react independently without blocking the order service that published the event."
    },
    {
      id: "microservices-db-q3",
      question: "What is the primary challenge addressed by the Saga pattern in microservices?",
      options: [
        "Service discovery and registration",
        "Distributed data queries across services",
        "Maintaining data consistency across multiple services without distributed transactions",
        "Optimizing network communication between services"
      ],
      correctAnswer: 2,
      explanation: "The Saga pattern primarily addresses the challenge of maintaining data consistency across multiple services without using distributed transactions. It breaks down a distributed transaction into a sequence of local transactions, each with compensating transactions that can be executed if a step fails. This allows microservices to maintain their data independence while still ensuring overall business process consistency."
    },
    {
      id: "microservices-db-q4",
      question: "In a microservices architecture using the Database-per-Service pattern, what is the recommended approach for handling queries that need data from multiple services?",
      options: [
        "Create a shared database that all services can access",
        "Use distributed transactions across service databases",
        "Implement API Composition or CQRS with materialized views",
        "Allow services to directly query other services' databases"
      ],
      correctAnswer: 2,
      explanation: "Implementing API Composition or CQRS with materialized views is the recommended approach for handling queries that need data from multiple services. API Composition aggregates data from multiple services in real-time through their APIs, while CQRS with materialized views maintains read-optimized views of data that span multiple services. Both approaches respect service boundaries and data ownership, unlike shared databases or direct cross-service database access which create tight coupling."
    },
    {
      id: "microservices-db-q5",
      question: "Which security practice is most effective for protecting sensitive data when multiple microservices need access to it?",
      options: [
        "Using a shared encryption key across all microservices",
        "Implementing a dedicated service for sensitive data with strict access controls",
        "Duplicating encrypted data across all services that need it",
        "Storing sensitive data only in memory, never in databases"
      ],
      correctAnswer: 1,
      explanation: "Implementing a dedicated service for sensitive data with strict access controls is the most effective practice for protecting sensitive information in a microservices architecture. This approach centralizes security concerns, minimizes the exposure surface area, enables comprehensive auditing, and allows for fine-grained access controls. It ensures that sensitive data is managed consistently and that each service only accesses the specific data it needs through controlled interfaces."
    }
  ]
};

export default microservicesDatabasesContent; 