# 📁 Profile Management Service

A Spring Boot microservice for managing User and Vendor profiles in the Colombo International Bookfair Reservation System. This service acts as the central hub for vendor identity, implementing the Aggregator Pattern to combine data from Auth and Reservation services into a single dashboard.

---

## 📋 Features
**Aggregator Dashboard**: Fetches and combines data from:

**Local MySQL**: Extended profile details (Logo, Bio, Website).

**Auth Service**: Official account details (Company Name, Owner, Role).

**Reservation Service**: Real-time booking status and total counts.

**Rich Profile Management**: CMS-like features for vendors to manage their public presence (Logos, Descriptions, Social Links).

**Public Catalog Search**: Search for vendors by literary genre (e.g., "Sci-Fi", "Education").

**CRUD Operations**: Full Create, Read, Update, Delete capabilities with Role validation.  

---

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| Java | 21 |
| Spring Boot | 3.2.0 |
| MySQL | 8.0+ |
| RestTemplate | Inter Service Communication |
| Maven | 3.9.x |
| Docker | Latest |

---

## 📁 Project Structure

```bash
profile-management-service/
├── src/main/
│   ├── java/com/bookfair/profile_management_service/
│   │   ├── controller/
│   │   │   └── UserProfileController.java
│   │   ├── dto/
│   │   │   ├── AuthUserDTO.java
│   │   │   ├── RichProfileRequest.java
│   │   │   └── VendorDashboardDTO.java
│   │   ├── model/
│   │   │   └── UserProfile.java
│   │   ├── repository/
│   │   │   └── UserProfileRepository.java
│   │   ├── service/
│   │   │   └── UserProfileService.java
│   │   └── ProfileManagementServiceApplication.java
│   └── resources/
│       ├── application.properties
├── Dockerfile
├── pom.xml
└── README.md
```

## ⚙️ Configuration
```properties
server.port=8081
spring.application.name=profile-management-service

# MySQL Connection
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bookfair_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

## 🚀 Run the Application

### Using Maven
```bash
./mvnw clean install
./mvnw spring-boot:run
```

App runs at: `http://localhost:8081`

## 🔌 API Endpoints
Base URL: `http://localhost:8081/api/profiles`

### USER DASHBOARD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/{userId}/dashboard` | Returns combined Profile + Auth + Reservation data |

**Headers Required:**

Authorization: Bearer <JWT_TOKEN>

**Request Body:**


```json
{
    "profile": {
        "fullName": "Isitha",
        "businessDescription": "Sci-Fi Sellers",
        "profileImageUrl": "logo.png",
        "websiteUrl": "www.isithabooks.lk"
    },
    "accountDetails": {
        "email": "isitha@test.com",
        "companyName": "Isitha Global",
        "owner": "Isitha Owner",
        "role": "User"
    },
    "myReservations": [],
    "totalReservations": 0
}
```

### EXTENDED PROFILE MANAGEMENT

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `{userId}` | Get all profiles |
| GET | `/api/profiles/{userId}` | Get stall by user ID |

### UPDATE

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/profiles/{userId}` | Update profile details (Name, Address, Company) |
| PUT | `/api/profiles/{userId}/genres` | Update literary genres list |

**Update Detail Request Body:**
```json
{
    "companyName": "Isitha Global Publishing",
    "address": "Kandy, Sri Lanka"
}
```

**Update Genre Request Body:**
```json
[
    "Fiction",
    "Science",
    "History",
    "Technology"
]
```
---

### DELETE

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/api/profiles/{userId}` | Delete a profile |

## 🧪 Test with PowerShell

### Create a Profile
```powershell
$body = '{"userId":"user123","fullName":"Isitha Publisher","email":"isitha@example.com","companyName":"Isitha Books","role":"VENDOR"}'
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles" -Method POST -Body $body -ContentType "application/json"
```

### Get a Profile
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles/{userId}" -Method GET
```

### Get all Profiles
```powershell
Invoke-RestMethod -Uri "http://localhost:8082/api/profiles" -Method GET
```

### Add Literary Genres
```powershell
$body = '["Fiction", "Educational", "Kids"]'
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles/{userId}/genres" -Method PUT -Body $body -ContentType "application/json"
```

### Delete Profile
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles/{u}serId}" -Method DELETE
```
---

## 📊 Response Examples

### User Profile Response
```json
{
    "id": "6741a1b2c3d4e5f6g7h8i9j0",
    "userId": "user123",
    "fullName": "Isitha Publisher",
    "email": "isitha@example.com",
    "phoneNumber": null,
    "companyName": "Isitha Books",
    "businessRegNo": null,
    "address": "Colombo, Sri Lanka",
    "literaryGenres": [
        "Fiction",
        "Science"
    ],
    "role": "VENDOR"
}
```

---

## 🔗 Integration with Other Services

The Profile Service acts as the central information hub:

**Auth Service:** When a user registers, Auth Service calls POST /api/profiles to create the initial record.

**Reservation Service:** Before booking a stall, Reservation Service calls GET /api/profiles/{userId} to verify the user is a valid "VENDOR".

**Stall Service:** May use profile data to associate a stall name with a specific company.

## 📝 Data Models

### User Profile Document

| Field | Type | Description |
|-------|------|-------------|
| id | String | MongoDB ObjectId |
| userId | String | Unique Link to Auth Service |
| fullName | String | Contact Person Name |
| email | String | Contact Email |
| phoneNumber | String | Contact Number |
| companyName | String | Business Name (For Vendors) |
| businessRegNo | String | Registration Number |
| address | String | Physical Address |
| literaryGenres | List<String> | Genres sold (e.g., Fiction, Sci-Fi) |
| role | String | VENDOR or ADMIN |

---

## ✅ API Test Results

All 6 endpoints tested and verified:

| # | API | Status |
|---|-----|--------|
| 1 | POST `/api/profiles` | ✅ Pass |
| 2 | GET `/api/profiles` | ✅ Pass |
| 3 | GET `/api/profiles/{userId}` | ✅ Pass |
| 4 | PUT `/api/profiles/{userId}` | ✅ Pass |
| 5 | PUT `/api/profiles/{userId}/genres` | ✅ Pass |
| 6 | DELETE `/api/profiles/{userId}` | ✅ Pass |

---