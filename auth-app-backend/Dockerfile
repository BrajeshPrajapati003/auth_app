# --- Stage 1: Build (The "Heavy" lifting) ---
FROM eclipse-temurin:25-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and dependencies list first to leverage Docker layer caching
COPY pom.xml mvnw ./
COPY .mvn .mvn

RUN chmod +x mvnw
# Download dependencies (this layer is cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline

# Copy source code and build the JAR
COPY src ./src
RUN ./mvnw package -DskipTests

# --- Stage 2: Runtime (The "Slim" production image) ---
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Only copy the final executable from the builder stage
# We find the jar and rename it to app.jar in one step
COPY --from=builder /app/target/*.jar app.jar

# Run as a non-root user for security (Recommended for Alpine)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

EXPOSE 8080

# Recommended: Use exec form for better signal handling (SIGTERM)
ENTRYPOINT ["java", "-jar", "app.jar"]

