Profile Management ServiceA Spring Boot microservice for managing User and Vendor profiles in the Colombo International Bookfair Reservation System. This service handles business details, contact information, and literary genres for stall reservations.📋 FeaturesProfile Management: Create, Read, Update, Delete vendor/organizer profilesGenre Management: Specific functionality to manage literary genres for vendorsRole Management: Distinguish between Vendors and Admins (Organizers)Data Persistence: Robust storage using MongoDBInternal API: Provides user details for Auth and Reservation services🛠️ Tech StackTechnologyVersionJava21Spring Boot3.2.0MongoDB6.0+ (Community/Atlas)LombokLatestMaven3.9.xDockerLatest📁 Project Structureprofile-management-service/
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
│       └── application.yml (optional)
├── Dockerfile
├── pom.xml
└── README.md
⚙️ ConfigurationUpdate src/main/resources/application.properties:server.port=8081
spring.application.name=profile-management-service

# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/bookfair_db
🚀 Run the Application# Build
./mvnw clean install

# Run
./mvnw spring-boot:run
Application runs at: http://localhost:8081🔌 API EndpointsBase URL: http://localhost:8081/api/profilesCREATEMethodEndpointDescriptionPOST/api/profilesCreate a new user/vendor profileRequest Body:{
    "userId": "user123",
    "fullName": "Isitha Publisher",
    "email": "isitha@example.com",
    "companyName": "Isitha Books",
    "address": "Colombo, Sri Lanka",
    "role": "VENDOR"
}
READMethodEndpointDescriptionGET/api/profilesGet all profiles (Admin use)GET/api/profiles/{userId}Get specific profile by User IDUPDATEMethodEndpointDescriptionPUT/api/profiles/{userId}Update profile details (Name, Address, Company)PUT/api/profiles/{userId}/genresUpdate literary genres listUpdate Details Request Body:{
    "companyName": "Isitha Global Publishing",
    "address": "Kandy, Sri Lanka"
}
Update Genres Request Body:[
    "Fiction",
    "Science",
    "History",
    "Technology"
]
DELETEMethodEndpointDescriptionDELETE/api/profiles/{userId}Delete a profile🧪 Test with PowerShellCreate a Profile$body = '{"userId":"user123","fullName":"Isitha Publisher","email":"isitha@example.com","companyName":"Isitha Books","role":"VENDOR"}'
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles" -Method POST -Body $body -ContentType "application/json"
Get All ProfilesInvoke-RestMethod -Uri "http://localhost:8081/api/profiles" -Method GET
Get Specific ProfileInvoke-RestMethod -Uri "http://localhost:8081/api/profiles/user123" -Method GET
Add Literary Genres$body = '["Fiction", "Educational", "Kids"]'
Invoke-RestMethod -Uri "http://localhost:8081/api/profiles/user123/genres" -Method PUT -Body $body -ContentType "application/json"
Delete ProfileInvoke-RestMethod -Uri "http://localhost:8081/api/profiles/user123" -Method DELETE
🧪 Test with PostmanMethodURLBodyPOSThttp://localhost:8081/api/profiles{"userId":"user123","fullName":"Isitha","email":"isitha@example.com","role":"VENDOR"}GEThttp://localhost:8081/api/profiles-GEThttp://localhost:8081/api/profiles/user123-PUThttp://localhost:8081/api/profiles/user123{"companyName":"Isitha Books","address":"Colombo"}PUThttp://localhost:8081/api/profiles/user123/genres["Fiction", "Science"]DELETEhttp://localhost:8081/api/profiles/user123-📊 Response ExamplesUser Profile Response{
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
🔗 Integration with Other ServicesThe Profile Service acts as the central information hub:Auth Service: When a user registers, Auth Service calls POST /api/profiles to create the initial record.Reservation Service: Before booking a stall, Reservation Service calls GET /api/profiles/{userId} to verify the user is a valid "VENDOR".Stall Service: May use profile data to associate a stall name with a specific company.📝 Data ModelsUserProfile DocumentFieldTypeDescriptionidStringMongoDB ObjectIduserIdStringUnique Link to Auth ServicefullNameStringContact Person NameemailStringContact EmailphoneNumberStringContact NumbercompanyNameStringBusiness Name (For Vendors)businessRegNoStringRegistration NumberaddressStringPhysical AddressliteraryGenresList<String>Genres sold (e.g., Fiction, Sci-Fi)roleStringVENDOR or ADMIN✅ API Test ResultsAll 6 endpoints tested and verified:#APIStatus1POST /api/profiles✅ Pass2GET /api/profiles✅ Pass3GET /api/profiles/{userId}✅ Pass4PUT /api/profiles/{userId}✅ Pass5PUT /api/profiles/{userId}/genres✅ Pass6DELETE /api/profiles/{userId}✅ Pass