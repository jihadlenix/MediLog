FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . /app

RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/medilog-0.0.1-SNAPSHOT.jar"]
