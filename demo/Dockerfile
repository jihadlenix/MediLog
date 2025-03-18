# Use a base image with Java
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the Maven build files (to cache dependencies)
COPY demo/pom.xml .
COPY demo/mvnw .
COPY demo/.mvn .mvn

# Download dependencies (this will cache them)
RUN ./mvnw dependency:go-offline

# Copy the actual source code
COPY demo/src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Copy the built JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
