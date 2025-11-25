# Reservation Management Service

## Overview

The **Reservation Management Service** is a Spring Boot microservice that handles all reservation-related operations for the Colombo International BookFair Stall Reservation System. This service manages stall bookings, generates QR codes for entry passes, sends email confirmations, and enforces business rules.

## Key Features

- ✅ **Stall Reservation Management** - Create, read, update, and cancel reservations
- ✅ **Business Rule Enforcement** - Maximum 3 stalls per user validation
- ✅ **Availability Checking** - Validate stall availability for date ranges
- ✅ **QR Code Generation** - Unique QR codes for each reservation using ZXing
- ✅ **Email Notifications** - Automated confirmation emails with QR code attachments
- ✅ **Genre Management** - Support for literary genre categorization
- ✅ **Admin Dashboard** - Admin endpoints for monitoring all reservations
- ✅ **Entry Validation** - QR code verification endpoint for exhibition entry
- ✅ **JWT Authentication** - Secure API with JWT token validation
- ✅ **Inter-Service Communication** - Integration with Auth and Stall services

## Technology Stack

- **Java 17**
- **Spring Boot 3.5.7**
- **Spring Data JPA** (MySQL)
- **Spring Mail** (SMTP Email)
- **ZXing** (QR Code Generation)
- **JWT** (Authentication)
- **WebFlux** (Inter-service Communication)
- **Lombok** (Boilerplate Reduction)

## Quick Start

### Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8.0+
- Gmail account (for SMTP)

### Setup

1. **Configure Database** - Edit `src/main/resources/application.properties`
2. **Configure Email** - Add Gmail app password
3. **Configure JWT Secret** - Must match Auth Service
4. **Build and Run**

```bash
mvn clean install
mvn spring-boot:run
```

Service runs on `http://localhost:8082`

## API Endpoints

### User Endpoints
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my-reservations` - Get user reservations
- `GET /api/reservations/{id}` - Get reservation by ID
- `PATCH /api/reservations/{id}/cancel` - Cancel reservation
- `PATCH /api/reservations/{id}/genres` - Update genres
- `GET /api/reservations/{id}/qrcode` - Get QR code
- `GET /api/reservations/verify-qr?code={code}` - Verify QR (Public)

### Admin Endpoints
- `GET /api/reservations/admin/all` - Get all reservations
- `GET /api/reservations/admin/status/{status}` - Get by status

## Documentation

📖 **[View Complete Implementation Documentation](./IMPLEMENTATION_DOCUMENTATION.md)**

Includes:
- Detailed architecture diagrams
- Complete API reference with examples
- Database schema
- Integration patterns
- Security implementation
- Testing strategies
- Troubleshooting guide

## Business Rules

1. Maximum 3 stalls per user
2. Auto-confirmation on reservation creation
3. Unique QR code generation
4. Email notifications with QR attachments
5. Stall availability validation

## Contact

- Email: support@colombobookfair.lk
- Development Team: dev-team@colombobookfair.lk

---

**Version:** 1.0.0 | **Port:** 8082
