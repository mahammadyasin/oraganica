# Stage 1: Build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY pom.xml .

# Download dependencies (cached in Docker layer)
RUN mvn dependency:go-offline

# Now copy the rest of the code
COPY src ./src

# Build the JAR
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM openjdk:17-oracle
WORKDIR /app

# Copy built JAR from previous stage
COPY --from=build /app/target/organica-0.0.1-SNAPSHOT.jar myapp.jar

# Expose port
EXPOSE 9192

# Run the application
CMD ["java", "-jar", "myapp.jar"]
