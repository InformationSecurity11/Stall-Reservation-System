# 📁 Profile Management Service

A Spring Boot microservice for managing **User and Vendor profiles** in the **Colombo International Bookfair Reservation System**.  
This service handles business details, contact information, vendor genres, and internal API communication for other microservices.

---

## 📋 Features
- **Profile Management**: Create, Read, Update, Delete vendor/organizer profiles  
- **Genre Management**: Manage literary genres for each vendor  
- **Role Management**: Vendors vs Admins (Organizers)  
- **Data Persistence**: MongoDB  
- **Internal API**: Provides user details for Auth and Reservation services  

---

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| Java | 21 |
| Spring Boot | 3.2.0 |
| MongoDB | 6.0+ |
| Lombok | Latest |
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
│   │   ├── model/
│   │   │   └── UserProfile.java
│   │   ├── repository/
│   │   │   └── UserProfileRepository.java
│   │   ├── service/
│   │   │   └── UserProfileService.java
│   │   └── ProfileManagementServiceApplication.java
│   └── resources/
│       ├── application.properties
├── pom.xml
└── README.md
```

## ⚙️ Configuration
```bash
server.port=8081
spring.application.name=profile-management-service

# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/bookfair_db
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

### CREATE

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/profiles` | Create a new user/vendor profile |


**Request Body:**

```json
{
    "userId": "user123",
    "fullName": "Isitha Publisher",
    "email": "isitha@example.com",
    "companyName": "Isitha Books",
    "address": "Colombo, Sri Lanka",
    "role": "VENDOR"
}
```

### READ

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profiles` | Get all profiles |
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