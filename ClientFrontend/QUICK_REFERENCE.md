# Client Frontend - Quick Reference

## 🚀 Quick Start

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Key Files & Their Purpose

### Configuration Files
- **`vite.config.ts`** - Vite build configuration, port 5173
- **`.env`** - Environment variables (API URL)
- **`package.json`** - Dependencies and scripts
- **`tailwind.config.ts`** - Tailwind CSS configuration

### Entry Points
- **`index.html`** - HTML entry point
- **`src/main.tsx`** - JavaScript entry point
- **`src/App.tsx`** - Main React component with routing

### Core Services (API Layer)
- **`services/api.ts`** - Base axios configuration
- **`services/authService.ts`** - Login, signup, logout
- **`services/stallService.ts`** - Stall operations
- **`services/reservationService.ts`** - Reservation operations

### State Management
- **`contexts/AuthContext.tsx`** - Global auth state
- **`hooks/useStalls.ts`** - Stall data fetching
- **`hooks/useReservations.ts`** - Reservation management

### Pages
- **`pages/Login.tsx`** - Login page
- **`pages/Signup.tsx`** - Registration page
- **(Future)** `pages/StallBrowse.tsx` - Browse stalls
- **(Future)** `pages/Reservations.tsx` - User reservations

### Utilities
- **`utils/formatters.ts`** - Format currency, dates, phone
- **`utils/validators.ts`** - Validate email, password, etc.
- **`utils/constants.ts`** - API endpoints, statuses

## 🔐 Authentication Usage

### Login
```typescript
import { useAuth } from './contexts/AuthContext'

function LoginPage() {
  const { login } = useAuth()
  
  await login(email, password)
  // User is automatically redirected
}
```

### Check Auth Status
```typescript
const { user, isAuthenticated, logout } = useAuth()

if (isAuthenticated) {
  console.log('Logged in as:', user.email)
}
```

### Protected Routes
```typescript
import { ProtectedRoute } from './components/ProtectedRoute'

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## 📊 Data Fetching

### Fetch Stalls
```typescript
import { useStalls } from './hooks/useStalls'

function StallsPage() {
  const { stalls, loading, error } = useStalls()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{stalls.map(stall => ...)}</div>
}
```

### Fetch with Filters
```typescript
const filters = {
  location: 'Downtown',
  minPrice: 100,
  maxPrice: 500
}

const { stalls } = useStalls(filters)
```

### Fetch User Reservations
```typescript
import { useReservations } from './hooks/useReservations'

function MyReservations() {
  const { reservations, loading, cancelReservation } = useReservations()
  
  const handleCancel = async (id: string) => {
    await cancelReservation(id)
  }
}
```

## 🛠️ API Service Usage

### Direct Service Calls
```typescript
import { stallService } from './services/stallService'

// Get all stalls
const stalls = await stallService.getAllStalls()

// Get specific stall
const stall = await stallService.getStallById('123')

// Search stalls
const results = await stallService.searchStalls('market')

// Check availability
const available = await stallService.checkAvailability(
  stallId, 
  startDate, 
  endDate
)
```

### Create Reservation
```typescript
import { reservationService } from './services/reservationService'

const newReservation = await reservationService.createReservation({
  stallId: '123',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  notes: 'Special requirements'
})
```

## 🎨 Styling with Tailwind

### Common Patterns
```jsx
// Button
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Click Me
</button>

// Card
<div className="bg-white shadow rounded-lg p-6">
  Card content
</div>

// Input
<input className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(...)}
</div>
```

## 🔧 Utilities

### Format Currency
```typescript
import { formatCurrency } from './utils/formatters'

formatCurrency(1234.56) // "$1,234.56"
```

### Format Date
```typescript
import { formatDate } from './utils/formatters'

formatDate('2025-01-01') // "Jan 1, 2025"
formatDate('2025-01-01', 'long') // "January 1, 2025, 12:00 AM"
```

### Validate Email
```typescript
import { isValidEmail } from './utils/validators'

if (!isValidEmail(email)) {
  setError('Invalid email')
}
```

### Validate Password
```typescript
import { isValidPassword } from './utils/validators'

const { valid, errors } = isValidPassword(password)
if (!valid) {
  console.log(errors) // Array of error messages
}
```

## 🌐 Environment Variables

### Access in Code
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appName = import.meta.env.VITE_APP_NAME
```

### `.env` File
```
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=Stall Reservation System
```

## 🔄 Common Workflows

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link if needed

### Add New API Endpoint
1. Add method to relevant service (e.g., `stallService.ts`)
2. Define TypeScript interfaces
3. Use in component via custom hook or direct call

### Add New Feature
1. Create service methods (API layer)
2. Create custom hook (if needed)
3. Create page component
4. Add route
5. Add navigation

## 📦 Project Structure at a Glance

```
ClientFrontend/
├── src/
│   ├── services/     → API calls
│   ├── contexts/     → Global state
│   ├── hooks/        → Data fetching logic
│   ├── pages/        → Route components
│   ├── components/   → Reusable UI
│   └── utils/        → Helpers
├── .env              → Configuration
└── package.json      → Dependencies
```

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module 'axios'"
**Solution**: Run `npm install`

### Issue: API calls failing
**Solution**: Check `.env` file has correct `VITE_API_BASE_URL`

### Issue: TypeScript errors
**Solution**: Ensure all interfaces are properly defined and imported

### Issue: Routes not working
**Solution**: Make sure `BrowserRouter` wraps your App component

### Issue: Protected routes not redirecting
**Solution**: Ensure `AuthProvider` wraps your routes

## 📝 Code Snippets

### Basic Page Template
```typescript
import React from 'react'

export function PageName() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Page Title</h1>
      <div>Content here</div>
    </div>
  )
}

export default PageName
```

### Form Component Template
```typescript
import React, { useState } from 'react'

export function FormComponent() {
  const [formData, setFormData] = useState({ field: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // API call here
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Configure `.env`**: Set your API URL
3. **Start dev server**: `npm run dev`
4. **Test login/signup**: Navigate to `/login` or `/signup`
5. **Build additional pages**: Stalls, Reservations, Profile
6. **Connect to backend**: Ensure backend is running on port 4000

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com/docs/intro
