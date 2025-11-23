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