# Stall Management Service

A Spring Boot microservice for managing stalls in the Colombo International Bookfair.

## 📋 Features

- Create, Read, Update, Delete stalls
- Filter stalls by size, status, section
- Check stall availability
- Internal API for Reservation Service integration

## 🛠️ Tech Stack

- Java 17
- Spring Boot 3.2.0
- MongoDB
- Lombok

## 📁 Project Structure

```
stall-management-service/
├── src/
│   ├── controller/
│   │   └── StallController.java
│   ├── dto/
│   │   ├── AvailabilityResponse.java
│   │   ├── StallRequest.java
│   │   ├── StallResponse.java
│   │   └── StallStatusRequest.java
│   ├── model/
│   │   └── Stall.java
│   ├── repository/
│   │   └── StallRepository.java
│   ├── service/
│   │   └── StallService.java
│   └── StallManagementApplication.java
├── main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

## ⚙️ Configuration

Update `application.properties` with your MongoDB connection:

```properties
server.port=8082
spring.data.mongodb.uri=mongodb://localhost:27017/bookfair_stalls
spring.data.mongodb.auto-index-creation=true
spring.application.name=stall-management-service
```

## 🚀 Run the Application

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

The service will start at: `http://localhost:8082`

## 🔌 API Endpoints

### Create Stall
```
POST /api/stalls
```
```json
{
  "stallCode": "A",
  "name": "Stall A",
  "size": "MEDIUM",
  "section": "Hall A",
  "row": 1,
  "column": 1,
  "xPosition": 100.0,
  "yPosition": 200.0,
  "width": 3.0,
  "length": 3.0,
  "pricePerDay": 5000.0,
  "description": "Corner stall"
}
```

### Get All Stalls
```
GET /api/stalls
```

### Get Stall by ID
```
GET /api/stalls/{id}
```

### Get Stall by Code
```
GET /api/stalls/code/{stallCode}
```

### Get Available Stalls
```
GET /api/stalls/available
```

### Filter by Size
```
GET /api/stalls/size/{size}
```
Values: `SMALL`, `MEDIUM`, `LARGE`

### Filter by Status
```
GET /api/stalls/status/{status}
```
Values: `AVAILABLE`, `RESERVED`, `MAINTENANCE`

### Filter by Section
```
GET /api/stalls/section/{section}
```

### Available Stalls by Size
```
GET /api/stalls/available/size/{size}
```

### Available Stalls by Section
```
GET /api/stalls/available/section/{section}
```

### Check Availability by Code
```
GET /api/stalls/check-availability/{stallCode}
```

### Check Availability by ID
```
GET /api/stalls/{id}/availability
```

### Update Stall
```
PUT /api/stalls/{id}
```

### Update Status by ID
```
PATCH /api/stalls/{id}/status
```
```json
{
  "status": "RESERVED"
}
```

### Update Status by Code (For Reservation Service)
```
PATCH /api/stalls/code/{stallCode}/status
```
```json
{
  "status": "RESERVED"
}
```

### Delete Stall
```
DELETE /api/stalls/{id}
```

## 🧪 Test with cURL

### Create a Stall
```bash
curl -X POST http://localhost:8082/api/stalls \
  -H "Content-Type: application/json" \
  -d '{
    "stallCode": "A",
    "name": "Stall A",
    "size": "MEDIUM",
    "section": "Hall A",
    "row": 1,
    "column": 1,
    "pricePerDay": 5000.0
  }'
```

### Get All Stalls
```bash
curl http://localhost:8082/api/stalls
```

### Get Available Stalls
```bash
curl http://localhost:8082/api/stalls/available
```

### Check Availability
```bash
curl http://localhost:8082/api/stalls/check-availability/A
```

### Update Status to Reserved
```bash
curl -X PATCH http://localhost:8082/api/stalls/code/A/status \
  -H "Content-Type: application/json" \
  -d '{"status": "RESERVED"}'
```

## 🧪 Test with Postman

Import these requests into Postman:

| Method | URL | Body |
|--------|-----|------|
| POST | `http://localhost:8082/api/stalls` | JSON (see above) |
| GET | `http://localhost:8082/api/stalls` | - |
| GET | `http://localhost:8082/api/stalls/available` | - |
| GET | `http://localhost:8082/api/stalls/size/MEDIUM` | - |
| GET | `http://localhost:8082/api/stalls/check-availability/A` | - |
| PATCH | `http://localhost:8082/api/stalls/code/A/status` | `{"status": "RESERVED"}` |

## 📊 Sample Data

Create multiple stalls for testing:

```bash
# Stall A - Small
curl -X POST http://localhost:8082/api/stalls -H "Content-Type: application/json" \
  -d '{"stallCode":"A","name":"Stall A","size":"SMALL","section":"Hall A","row":1,"column":1,"pricePerDay":3000}'

# Stall B - Medium
curl -X POST http://localhost:8082/api/stalls -H "Content-Type: application/json" \
  -d '{"stallCode":"B","name":"Stall B","size":"MEDIUM","section":"Hall A","row":1,"column":2,"pricePerDay":5000}'

# Stall C - Large
curl -X POST http://localhost:8082/api/stalls -H "Content-Type: application/json" \
  -d '{"stallCode":"C","name":"Stall C","size":"LARGE","section":"Hall B","row":1,"column":1,"pricePerDay":8000}'
```

## 🔗 Integration with Reservation Service

The Reservation Service can call these endpoints:

```bash
# Check if stall is available before booking
GET /api/stalls/check-availability/{stallCode}

# Mark stall as reserved after booking
PATCH /api/stalls/code/{stallCode}/status
Body: {"status": "RESERVED"}

# Release stall on cancellation
PATCH /api/stalls/code/{stallCode}/status
Body: {"status": "AVAILABLE"}
```



