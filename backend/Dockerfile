FROM maven:3.8.3-openjdk-17 AS bulid
COPY ../.. .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=bulid /target/com.clinic.management-0.0.1-SNAPSHOT.jar com.clinic.management.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]
