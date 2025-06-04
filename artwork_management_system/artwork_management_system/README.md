# Artwork Management System

## How to Run the Application

### Prerequisites
- Java 17 or higher
- Maven

### Steps to Run
1. Navigate to the project directory:
   ```
   cd artwork_management_system
   ```

2. Build the application:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

4. The application will start on port 8082. You can access it at:
   ```
   http://localhost:8082
   ```

5. H2 Database Console (for development):
   ```
   http://localhost:8082/h2-console
   ```
   - JDBC URL: `jdbc:h2:mem:artwork_db`
   - Username: `sa`
   - Password: (leave empty)

## Configuration

### Database
The application is configured to use an H2 in-memory database for development. If you want to use MySQL instead, modify the `application.properties` file by uncommenting the MySQL configuration section and commenting out the H2 configuration.

### Spring Cloud
Spring Cloud services (Eureka, Config Server) have been disabled in this version of the application to simplify deployment and avoid dependency on external services.

## API Endpoints
The application provides RESTful API endpoints for managing artworks. These endpoints are accessible at:
```
http://localhost:8082/api/artworks
```

## Security
For development purposes, all endpoints are publicly accessible. In a production environment, you should configure proper authentication and authorization.
