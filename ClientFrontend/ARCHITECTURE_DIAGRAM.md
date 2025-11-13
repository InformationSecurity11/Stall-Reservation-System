# Client Frontend - Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    REACT APPLICATION                           │  │
│  │                                                                 │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              PRESENTATION LAYER                          │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │  │
│  │  │  │  Login   │  │  Signup  │  │  Stalls  │  │  Resv   │ │  │  │
│  │  │  │  Page    │  │  Page    │  │  Page    │  │  Page   │ │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │  │
│  │  │  │ Profile  │  │  About   │  │   Home   │              │  │  │
│  │  │  │  Page    │  │  Page    │  │  Page    │              │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘              │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                           ▲                                     │  │
│  │                           │                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │           APPLICATION LAYER (State Management)          │  │  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │  │  │
│  │  │  │    Auth    │  │   Theme    │  │   Custom Hooks   │  │  │  │
│  │  │  │   Context  │  │  Context   │  │   useStalls()    │  │  │  │
│  │  │  │            │  │            │  │   useReservations│  │  │  │
│  │  │  └────────────┘  └────────────┘  └──────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                           ▲                                     │  │
│  │                           │                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              SERVICE LAYER                               │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │  │
│  │  │  │     Auth     │  │    Stall     │  │ Reservation  │  │  │  │
│  │  │  │   Service    │  │   Service    │  │   Service    │  │  │  │
│  │  │  │              │  │              │  │              │  │  │  │
│  │  │  │ - login()    │  │ - getAll()   │  │ - create()   │  │  │  │
│  │  │  │ - signup()   │  │ - getById()  │  │ - cancel()   │  │  │  │
│  │  │  │ - logout()   │  │ - search()   │  │ - update()   │  │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                           ▲                                     │  │
│  │                           │                                     │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │         INFRASTRUCTURE LAYER                             │  │  │
│  │  │  ┌──────────────────────────────────────────────────┐   │  │  │
│  │  │  │           Axios API Client                        │   │  │  │
│  │  │  │  - Request Interceptor (add JWT token)            │   │  │  │
│  │  │  │  - Response Interceptor (handle errors)           │   │  │  │
│  │  │  │  - Base URL Configuration                         │   │  │  │
│  │  │  └──────────────────────────────────────────────────┘   │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │  │
│  │  │  │  Formatters  │  │  Validators  │  │  Constants   │  │  │  │
│  │  │  │  - currency  │  │  - email     │  │  - endpoints │  │  │  │
│  │  │  │  - dates     │  │  - password  │  │  - statuses  │  │  │  │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTPS/REST API
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVER                               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    API GATEWAY (Port 4000)                     │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│         ┌────────────────────────┼────────────────────────┐         │
│         ▼                        ▼                        ▼         │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐   │
│  │    Auth     │         │    Stall    │         │ Reservation │   │
│  │  Service    │         │  Service    │         │   Service   │   │
│  └─────────────┘         └─────────────┘         └─────────────┘   │
│         │                        │                        │         │
│         └────────────────────────┼────────────────────────┘         │
│                                  ▼                                   │
│                           ┌─────────────┐                            │
│                           │  Database   │                            │
│                           └─────────────┘                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Communication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   USER AUTHENTICATION FLOW                    │
└──────────────────────────────────────────────────────────────┘

User Input (Login Form)
       │
       ▼
Login Component
       │
       ▼
useAuth Hook
       │
       ▼
authService.login()
       │
       ▼
API Client (POST /auth/login)
       │
       ├─ Add Content-Type header
       └─ Send credentials
       │
       ▼
Backend API
       │
       ▼
JWT Token + User Data
       │
       ▼
authService (Store in localStorage)
       │
       ▼
Update AuthContext
       │
       ├─ setUser()
       └─ isAuthenticated = true
       │
       ▼
Redirect to Dashboard
```

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA FETCHING FLOW                         │
└──────────────────────────────────────────────────────────────┘

Component Mount (StallsPage)
       │
       ▼
useStalls() Hook
       │
       ▼
stallService.getAllStalls()
       │
       ▼
API Client (GET /stalls)
       │
       ├─ Add Authorization header
       └─ Add query params (filters)
       │
       ▼
Backend API
       │
       ▼
Stall Data (JSON)
       │
       ▼
Update Local State
       │
       ├─ setStalls(data)
       ├─ setLoading(false)
       └─ setError(null)
       │
       ▼
Re-render Component with Data
```

```
┌──────────────────────────────────────────────────────────────┐
│                  PROTECTED ROUTE FLOW                         │
└──────────────────────────────────────────────────────────────┘

User navigates to /reservations
       │
       ▼
ProtectedRoute Component
       │
       ▼
Check useAuth().isAuthenticated
       │
       ├─ TRUE ────────► Render children (Reservations Page)
       │
       └─ FALSE ───────► <Navigate to="/login" />
                         └─ Save intended location
```

## State Management Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     CLIENT STATE                            │
│                  (React Context API)                        │
│                                                             │
│  AuthContext                    ThemeContext                │
│  ├─ user                        ├─ theme (light/dark)      │
│  ├─ isAuthenticated             └─ toggleTheme()           │
│  ├─ isLoading                                               │
│  ├─ login()                                                 │
│  ├─ signup()                                                │
│  └─ logout()                                                │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                    SERVER STATE                             │
│                   (Custom Hooks)                            │
│                                                             │
│  useStalls()                    useReservations()           │
│  ├─ stalls: []                  ├─ reservations: []        │
│  ├─ loading: boolean            ├─ loading: boolean        │
│  ├─ error: string|null          ├─ error: string|null     │
│  └─ refetch()                   ├─ cancelReservation()     │
│                                 └─ refetch()               │
└────────────────────────────────────────────────────────────┘
```

## Security Flow

```
┌────────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                           │
└────────────────────────────────────────────────────────────┘

1. CLIENT-SIDE VALIDATION
   └─ validators.ts (email, password, phone)

2. TYPE SAFETY
   └─ TypeScript interfaces for all data

3. TOKEN MANAGEMENT
   ├─ Store JWT in localStorage
   ├─ Auto-inject in request headers
   └─ Auto-logout on 401 errors

4. PROTECTED ROUTES
   └─ ProtectedRoute component checks auth

5. HTTPS COMMUNICATION
   └─ All API calls over HTTPS (production)

6. ERROR HANDLING
   ├─ Try-catch in services
   ├─ Axios interceptors
   └─ User-friendly error messages
```

## File Structure Tree

```
ClientFrontend/
├── public/
├── src/
│   ├── assets/              # Images, fonts
│   ├── components/          # Reusable components
│   │   ├── common/          # Button, Input, Card
│   │   ├── layout/          # Header, Footer
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # Global state
│   │   └── AuthContext.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useStalls.ts
│   │   └── useReservations.ts
│   ├── pages/               # Route pages
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ...
│   ├── services/            # API layer
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── stallService.ts
│   │   └── reservationService.ts
│   ├── utils/               # Helpers
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── App.tsx
│   └── main.tsx
├── .env                     # Environment variables
├── package.json
├── vite.config.ts
├── ARCHITECTURE.md          # This file
└── IMPLEMENTATION_GUIDE.md
```

## Key Design Patterns

### 1. Layered Architecture
- Clear separation of concerns
- Each layer has specific responsibility
- One-way dependency (top to bottom)

### 2. Service Layer Pattern
- All API calls centralized
- Reusable across components
- Easy to mock for testing

### 3. Custom Hooks Pattern
- Encapsulate data fetching logic
- Reusable state management
- Cleaner components

### 4. Context Provider Pattern
- Global state without prop drilling
- Centralized auth management
- Easy to access anywhere

### 5. Protected Routes Pattern
- Security at routing level
- Automatic redirects
- Preserves user intent
