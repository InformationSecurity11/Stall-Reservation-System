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
| PUT | `{userId}` | Update Complete Profile (Basic + Rich Info) |
| PATCH | `/{userId}/rich-info` | Update Logo, Bio, Website (Partial Update) |
| PUT | `/{userId}/genres` | Update Literary Genres |

### Complete Update Body (PUT):
```json
{
    "fullName": "Isitha Updated",
    "companyName": "New Tech Corp",
    "address": "Kandy, Sri Lanka",
    "businessDescription": "We are the best tech book sellers.",
    "profileImageUrl": "https://example.com/logo.png",
    "websiteUrl": "www.mybooks.lk"
}
```
### Basic CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new profile (Internal use) |
| GET | `/{userId}` | Get basic profile|
| DELETE | `/{userId}` | Delete profile |

## 🔗 Service Integration Map

### Auth Service (Port 9090):

Profile Service sends GET /api/auth/user/details with the User's Token to verify identity and get official account details.

### Reservation Service (Port 8083):

Profile Service sends GET /api/reservations/user/{id} to fetch booking history for the dashboard.


## Final Endpoints

| Endpoint        | Method                      | Request Body / Notes                                                                 |
|-----------------|-----------------------------|---------------------------------------------------------------------------------------|
| Create Profile  | POST `/`                    | {"userId": "6", "fullName": "Name", "email": "email@test.com", "role": "User"}        |
| Get Profile     | GET `/{userId}`             | None                                                                                  |
| Edit Profile    | PUT `/{userId}`             | {"fullName": "New Name", "companyName": "New Co", "address": "New Addr", "profileImageUrl": "url", "businessDescription": "text"} |
| Rich Info       | PATCH `/{userId}/rich-info` | {"businessDescription": "Bio", "websiteUrl": "link", "profileImageUrl": "link"}       |
| Update Genres   | PUT `/{userId}/genres`      | ["Sci-Fi", "Tech"]                                                                    |
| Search          | GET `/search?genre=X`       | None                                                                                  |
| Dashboard       | GET `/{userId}/dashboard`   | Header: Authorization: Bearer <TOKEN>                                                 |
| Delete          | DELETE `/{userId}`          | None                                                                                  |


---

