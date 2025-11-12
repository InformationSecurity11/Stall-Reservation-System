# Client Frontend - High-Level Architecture

## Overview
Modern React-based client portal for stall reservation management system.

## Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: Context API / React Query (for server state)
- **HTTP Client**: Axios / Fetch API
- **Form Management**: React Hook Form + Zod validation

## Directory Structure
```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Card)
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useStalls.ts
│   └── useReservations.ts
├── pages/              # Page components (routes)
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── StallBrowse.tsx
│   ├── StallDetails.tsx
│   ├── Reservations.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
├── services/           # API service layer
│   ├── api.ts          # Base API configuration
│   ├── authService.ts
│   ├── stallService.ts
│   └── reservationService.ts
├── types/              # TypeScript type definitions
│   ├── auth.types.ts
│   ├── stall.types.ts
│   └── reservation.types.ts
├── utils/              # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Core Features

### 1. Authentication System
- User registration (signup)
- User login with JWT tokens
- Password reset flow
- Session management
- Protected routes

### 2. Stall Management (Client View)
- Browse available stalls
- Filter by location, size, price
- View stall details and images
- Check availability calendar
- Real-time availability updates

### 3. Reservation Management
- Create new reservations
- View booking history
- Cancel/modify reservations
- Payment integration
- Booking confirmation emails

### 4. User Profile
- View/edit profile information
- Change password
- View reservation history
- Manage preferences

### 5. Search & Filters
- Search stalls by criteria
- Advanced filtering options
- Sort by various parameters
- Map view integration (optional)

## State Management Strategy

### Client State (React Context)
- Authentication state
- User preferences
- Theme settings
- UI state (modals, sidebars)

### Server State (React Query/SWR)
- Stall listings
- Reservation data
- User profile data
- Cached with automatic revalidation

## API Integration Pattern

### Base API Configuration
```typescript
// Centralized axios instance
// Base URL configuration
// Request/response interceptors
// Error handling
// Token management
```

### Service Layer Pattern
```typescript
// Separation of concerns
// Reusable API methods
// Type-safe responses
// Error handling
```

## Routing Structure

```
/                       → Home page (stall listings)
/login                  → Login page
/signup                 → Signup page
/stalls                 → Browse stalls
/stalls/:id             → Stall details
/reservations           → User's reservations
/reservations/new       → Create reservation
/reservations/:id       → Reservation details
/profile                → User profile
/profile/edit           → Edit profile
/404                    → Not found page
```

## Component Design Patterns

### 1. Container/Presentational Pattern
- Smart containers handle logic
- Dumb components handle UI

### 2. Custom Hooks Pattern
- Extract reusable logic
- Simplify component code
- Better testability

### 3. Compound Components
- Complex UI components
- Flexible composition

## Security Considerations
- JWT token storage (httpOnly cookies preferred)
- CSRF protection
- XSS prevention
- Input sanitization
- Protected routes implementation
- Secure API calls

## Performance Optimizations
- Code splitting by route
- Lazy loading components
- Image optimization
- Memoization (React.memo, useMemo)
- Virtual scrolling for large lists
- API response caching

## User Experience Features
- Loading states
- Error boundaries
- Toast notifications
- Form validation feedback
- Responsive design (mobile-first)
- Accessibility (ARIA labels)

## Deployment Considerations
- Environment variables
- Build optimization
- CDN integration
- Browser compatibility
- Analytics integration
- Error tracking (Sentry)
