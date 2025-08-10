FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Base image
FROM openjdk:17-oracle

# Set working directory
WORKDIR /app

# Copy JAR file
COPY --from=build /app/target/organica-0.0.1-SNAPSHOT.jar myapp.jar

# Expose port 9192
EXPOSE 9192

# Start the Java Spring Boot application
CMD ["java", "-jar", "myapp.jar"]
