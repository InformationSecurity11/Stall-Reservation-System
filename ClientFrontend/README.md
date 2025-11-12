# Client Frontend - Stall Reservation System

Modern React-based client portal for browsing stalls, making reservations, and managing bookings.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Context API** - State management

## 📋 Features

### ✅ Implemented
- User authentication (Login/Signup)
- Protected routes
- JWT token management
- Service layer architecture
- Custom hooks for data fetching
- Form validation
- Responsive design

### 🚧 Coming Soon
- Stall browsing & search
- Reservation management
- User profile
- Payment integration
- Real-time availability

## 🏗️ Architecture

This project follows a **layered architecture** pattern:

```
┌─────────────────────────────────┐
│   Presentation Layer (Pages)     │  ← User Interface
├─────────────────────────────────┤
│   Application Layer (Hooks)      │  ← State Management
├─────────────────────────────────┤
│   Service Layer (API Services)   │  ← Business Logic
├─────────────────────────────────┤
│   Infrastructure (Utils/Config)  │  ← Cross-cutting
└─────────────────────────────────┘
```

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for detailed documentation.

## 📁 Project Structure

```
src/
├── services/          # API services (auth, stalls, reservations)
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components (routes)
├── components/        # Reusable UI components
└── utils/             # Helper functions & constants
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on port 4000

### Installation

```powershell
# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Available Scripts

```powershell
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=Stall Reservation System
```

## 🔐 Authentication Flow

1. User enters credentials on login page
2. `authService.login()` sends request to backend
3. Backend returns JWT token + user data
4. Token stored in localStorage
5. Token auto-injected in all subsequent API calls
6. Context updates global auth state
7. Protected routes become accessible

## 📡 API Integration

All API calls go through the service layer:

```typescript
// Example: Fetching stalls
import { stallService } from './services/stallService'

const stalls = await stallService.getAllStalls({
  location: 'Downtown',
  minPrice: 100
})
```

### Available Services
- `authService` - Authentication operations
- `stallService` - Stall management
- `reservationService` - Reservation operations

## 🎨 UI Components

Built with Tailwind CSS for responsive design:

```tsx
// Responsive grid example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {stalls.map(stall => <StallCard key={stall.id} {...stall} />)}
</div>
```

## 🔒 Security Features

- JWT token management
- Protected routes with automatic redirect
- Request/response interceptors
- Client-side input validation
- Type-safe API calls with TypeScript

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture overview
- **[ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)** - Visual diagrams
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Implementation details
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick code examples

## 🛠️ Development

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link (if needed)

### Adding a New API Endpoint

1. Add method to relevant service (e.g., `stallService.ts`)
2. Define TypeScript interfaces
3. Create custom hook (optional)
4. Use in component

### Code Standards

- Use TypeScript for type safety
- Follow React hooks best practices
- Keep components small and focused
- Separate concerns (UI vs logic)
- Use custom hooks for reusable logic

## 🧪 Testing (Future)

```powershell
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
npm run test:coverage  # Coverage report
```

## 📦 Building for Production

```powershell
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Build output will be in `dist/` directory.

## 🚀 Deployment

### Recommended Platforms
- **Vercel** - Zero config deployment
- **Netlify** - Continuous deployment from Git
- **AWS S3 + CloudFront** - Enterprise solution

### Environment Variables in Production
Make sure to set:
- `VITE_API_BASE_URL` - Your production API URL

## 🐛 Troubleshooting

### API calls failing
- Check backend is running on port 4000
- Verify `.env` has correct API URL
- Check CORS settings on backend

### TypeScript errors
- Run `npm install` to ensure all types are installed
- Check all interfaces are properly defined

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React + TypeScript + Vite**
