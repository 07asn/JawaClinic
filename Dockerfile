# Use Maven image to build the project
FROM maven:3.8.3-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file and the source code to the container
COPY pom.xml ./
COPY src ./src

# Build the project, skipping tests
RUN mvn clean package -DskipTests

# Use a slim version of OpenJDK as the runtime environment
FROM openjdk:17.0.1-jdk-slim

# Set the working directory for the runtime
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar demo.jar

# Expose the application's port
EXPOSE 8080

# Set the entry point for the container to run the jar file
ENTRYPOINT ["java", "-jar", "demo.jar"]
