# Stall Management Service

A Spring Boot microservice for managing stalls in the Colombo International Bookfair Reservation System.

## 📋 Features

- **CRUD Operations**: Create, Read, Update, Delete stalls
- **Filter Stalls**: By size, status, section
- **Check Availability**: Verify if a stall is available for reservation
- **Internal API**: Status update endpoint for Reservation Service integration

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 3.2.0 |
| MongoDB Atlas | Cloud |
| Lombok | Latest |
| Maven | 3.9.x |

## 📁 Project Structure

```
stall-management-service/
├── src/main/
│   ├── java/com/bookfair/stallmanagement/
│   │   ├── controller/
│   │   │   └── StallController.java
│   │   ├── dto/
│   │   │   ├── AvailabilityResponse.java
│   │   │   ├── StallRequest.java
│   │   │   ├── StallResponse.java
│   │   │   └── StallStatusRequest.java
│   │   ├── model/
│   │   │   └── Stall.java
│   │   ├── repository/
│   │   │   └── StallRepository.java
│   │   ├── service/
│   │   │   └── StallService.java
│   │   └── StallManagementApplication.java
│   └── resources/
│       └── application.properties
├── pom.xml
└── README.md
```

## ⚙️ Configuration

Update `src/main/resources/application.properties`:

```properties
server.port=8082
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bookfair_stalls?retryWrites=true&w=majority
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

Application runs at: `http://localhost:8082`

---

## 🔌 API Endpoints

### Base URL: `http://localhost:8082/api/stalls`

### CREATE

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stalls` | Create a new stall |

**Request Body:**
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
    "description": "Corner stall near entrance"
}
```

**Size Options:** `SMALL`, `MEDIUM`, `LARGE`

---

### READ

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stalls` | Get all stalls |
| GET | `/api/stalls/{id}` | Get stall by ID |
| GET | `/api/stalls/code/{stallCode}` | Get stall by code |
| GET | `/api/stalls/available` | Get all available stalls |
| GET | `/api/stalls/size/{size}` | Filter by size |
| GET | `/api/stalls/status/{status}` | Filter by status |
| GET | `/api/stalls/section/{section}` | Filter by section |
| GET | `/api/stalls/available/size/{size}` | Available stalls by size |
| GET | `/api/stalls/available/section/{section}` | Available stalls by section |
| GET | `/api/stalls/check-availability/{stallCode}` | Check availability by code |
| GET | `/api/stalls/{id}/availability` | Check availability by ID |

**Status Options:** `AVAILABLE`, `RESERVED`, `MAINTENANCE`

---

### UPDATE

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/stalls/{id}` | Update stall details |
| PATCH | `/api/stalls/{id}/status` | Update status by ID |
| PATCH | `/api/stalls/code/{stallCode}/status` | Update status by code |

**Update Status Request Body:**
```json
{
    "status": "RESERVED"
}
```

---

### DELETE

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/api/stalls/{id}` | Delete a stall |

---

## 🧪 Test with PowerShell

### Create a Stall
```powershell
$body = '{"stallCode":"A","name":"Stall A","size":"MEDIUM","section":"Hall A","row":1,"column":1,"pricePerDay":5000}'
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls" -Method POST -Body $body -ContentType "application/json"
```

### Get All Stalls
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls" -Method GET
```

### Get Available Stalls
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls/available" -Method GET
```

### Check Availability
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls/check-availability/A" -Method GET
```

### Update Status to Reserved
```powershell
$body = '{"status":"RESERVED"}'
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls/code/A/status" -Method PATCH -Body $body -ContentType "application/json"
```

### Filter by Size
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/stalls/size/MEDIUM" -Method GET
```

---

## 🧪 Test with Postman

| Method | URL | Body |
|--------|-----|------|
| POST | `http://localhost:8082/api/stalls` | `{"stallCode":"A","name":"Stall A","size":"MEDIUM","section":"Hall A","row":1,"column":1,"pricePerDay":5000}` |
| GET | `http://localhost:8082/api/stalls` | - |
| GET | `http://localhost:8082/api/stalls/available` | - |
| GET | `http://localhost:8082/api/stalls/code/A` | - |
| GET | `http://localhost:8082/api/stalls/size/MEDIUM` | - |
| GET | `http://localhost:8082/api/stalls/check-availability/A` | - |
| PATCH | `http://localhost:8082/api/stalls/code/A/status` | `{"status":"RESERVED"}` |
| DELETE | `http://localhost:8082/api/stalls/{id}` | - |

---

## 📊 Response Examples

### Stall Response
```json
{
    "id": "6741a1b2c3d4e5f6g7h8i9j0",
    "stallCode": "A",
    "name": "Stall A",
    "size": "MEDIUM",
    "status": "AVAILABLE",
    "section": "Hall A",
    "row": 1,
    "column": 1,
    "xPosition": 100.0,
    "yPosition": 200.0,
    "width": 3.0,
    "length": 3.0,
    "pricePerDay": 5000.0,
    "description": "Corner stall",
    "available": true
}
```

### Availability Response
```json
{
    "stallCode": "A",
    "available": true,
    "message": "Stall is available"
}
```

---

## 🔗 Integration with Reservation Service

The Reservation Service can use these endpoints:

```bash
# Check availability before booking
GET /api/stalls/check-availability/{stallCode}

# Mark stall as reserved after successful booking
PATCH /api/stalls/code/{stallCode}/status
Body: {"status": "RESERVED"}

# Release stall on cancellation
PATCH /api/stalls/code/{stallCode}/status
Body: {"status": "AVAILABLE"}
```

---

## 📝 Data Models

### Stall Entity

| Field | Type | Description |
|-------|------|-------------|
| id | String | MongoDB ObjectId |
| stallCode | String | Unique code (A, B, C, etc.) |
| name | String | Display name |
| size | Enum | SMALL, MEDIUM, LARGE |
| status | Enum | AVAILABLE, RESERVED, MAINTENANCE |
| section | String | Hall/Wing name |
| row | Integer | Row position |
| column | Integer | Column position |
| xPosition | Double | X coordinate for map |
| yPosition | Double | Y coordinate for map |
| width | Double | Width in meters |
| length | Double | Length in meters |
| pricePerDay | Double | Price per day |
| description | String | Additional description |

---

## ✅ API Test Results

All 16 endpoints tested and verified:

| # | API | Status |
|---|-----|--------|
| 1 | POST `/api/stalls` | ✅ Pass |
| 2 | GET `/api/stalls` | ✅ Pass |
| 3 | GET `/api/stalls/{id}` | ✅ Pass |
| 4 | GET `/api/stalls/code/{stallCode}` | ✅ Pass |
| 5 | GET `/api/stalls/available` | ✅ Pass |
| 6 | GET `/api/stalls/size/{size}` | ✅ Pass |
| 7 | GET `/api/stalls/status/{status}` | ✅ Pass |
| 8 | GET `/api/stalls/section/{section}` | ✅ Pass |
| 9 | GET `/api/stalls/available/size/{size}` | ✅ Pass |
| 10 | GET `/api/stalls/available/section/{section}` | ✅ Pass |
| 11 | GET `/api/stalls/check-availability/{stallCode}` | ✅ Pass |
| 12 | GET `/api/stalls/{id}/availability` | ✅ Pass |
| 13 | PUT `/api/stalls/{id}` | ✅ Pass |
| 14 | PATCH `/api/stalls/{id}/status` | ✅ Pass |
| 15 | PATCH `/api/stalls/code/{stallCode}/status` | ✅ Pass |
| 16 | DELETE `/api/stalls/{id}` | ✅ Pass |

---
