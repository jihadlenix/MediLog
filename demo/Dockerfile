# Use a base image with Java
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml first (for caching dependencies)
COPY demo/pom.xml .
COPY demo/mvnw .
COPY demo/.mvn .mvn

# Download dependencies (this prevents downloading them every build)
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy the actual application source code
COPY demo/src ./src

# Build the application inside the container
RUN ./mvnw clean package -DskipTests

# Copy the built JAR file into the container
COPY demo/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
