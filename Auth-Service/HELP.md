Auth-Service API Documentation

1. Register User

URL: /api/auth/register
Method: POST

Request Body:

email : String, Required, Must be a valid email format
password : String, Required, Minimum 6 characters
role : String, Required, Must be "Admin" or "User" (case-insensitive)
companyName : String, Required, Cannot be blank
contactNumber : String, Required, Cannot be blank
owner : String, Required, Cannot be blank

Example Request:

{
"email": "admin@example.com",
"password": "admin123",
"role": "Admin",
"companyName": "MyCompany",
"contactNumber": "0771234567",
"owner": "John Doe"
}

Response (Success):

{
"message": "User registered with id 1",
"error": null
}

Response (Validation Error):

{
"email": "Invalid email format",
"password": "Password must be at least 6 characters"
}

2. Login User

URL: /api/auth/login
Method: POST

Request Body:

email : String, Required, Must be a valid email format
password : String, Required, Cannot be blank

Example Request:

{
"email": "admin@example.com",
"password": "admin123"
}

Response (Success):

{
"message": "Login successful",
"error": null,
"token": "<JWT_TOKEN>"
}

Response (Failure):

{
"message": null,
"error": "Invalid email or password",
"token": null
}

3. Logout

URL: /api/auth/logout
Method: POST
Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

"User logged out successfully."

4. Delete User

URL: /api/auth/user/delete/{id}
Method: DELETE
Headers:

Authorization: Bearer <JWT_TOKEN>

Response (Success):
{
"success": true,
"message": "User deleted successfully"
}


Response (Failure):
{
"success": false,
"message": "User with ID {id} does not exist"
}

Response (Failure: Missing/Invalid Token)
{
"success": false,
"message": "Authorization token is missing"
}


5. Get User Details

URL: /api/auth/user/details
Method: GET

Query Parameters: email=<user_email>

Headers:
Authorization: Bearer <JWT_TOKEN>

Response (Success):

{
"email": "admin@example.com",
"role": "Admin",
"companyName": "MyCompany",
"contactNumber": "0771234567",
"owner": "John Doe"
}

Response (Failure):

"Authorization token is missing"

6. Get All Users

URL: /api/auth/users/all
Method: GET
Headers:

Authorization: Bearer <JWT_TOKEN>

Response:

{
"users": [
{
"email": "admin@example.com",
"role": "Admin",
"companyName": "MyCompany",
"contactNumber": "0771234567",
"owner": "John Doe"
},
{
"email": "user2@example.com",
"role": "User",
"companyName": "Company2",
"contactNumber": "0779876543",
"owner": "Jane Doe"
}
]
}
