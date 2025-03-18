# Use a base image with Java
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the Maven build files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the application source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Copy the built JAR file
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
