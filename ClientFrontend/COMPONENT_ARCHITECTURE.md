# Reserve Page - Component Architecture

## 📐 Component Hierarchy

```
Reserve.tsx (Main Page)
├── Header (Global Navigation)
│   ├── Logo (Animated Sparkles icon)
│   ├── Navigation Links (Home, Reserve, My Bookings)
│   ├── Auth Buttons (Login/Signup or Profile)
│   └── Mobile Menu (Hamburger)
│
├── Hero Section
│   ├── Event Badge (Sparkles + "Colombo BookFair 2026")
│   ├── Heading (Gradient text)
│   ├── Description
│   └── Stats Grid (4 cards)
│       ├── Total Stalls
│       ├── Available
│       ├── Premium
│       └── Popular
│
├── Search & Filters Bar
│   ├── Search Input (Search icon)
│   ├── Date Picker (Calendar icon)
│   ├── Filter Button (toggles panel)
│   └── View Toggle (Grid/List icons)
│
├── Filter Panel (Expandable)
│   ├── Hall Filter (All, Hall A, Hall B, Outdoor)
│   └── Type Filter (All, Standard, Corner, Premium)
│
├── Main Content Grid (2 columns on desktop)
│   ├── Stalls Section (Left - 2/3 width)
│   │   ├── Section Header
│   │   │   ├── Title ("Available Stalls")
│   │   │   └── Count "(12 found)"
│   │   │
│   │   └── Stalls Grid/List
│   │       └── StallCard (×12)
│   │           ├── Image (with gradient overlay)
│   │           ├── Type Badge (Premium/Corner/Standard)
│   │           ├── Hall Badge (Hall A/B/Outdoor)
│   │           ├── Popular Badge (Star icon)
│   │           ├── Stall Info
│   │           │   ├── Name
│   │           │   ├── Location (MapPin icon)
│   │           │   ├── Size
│   │           │   └── Price (DollarSign icon)
│   │           ├── Amenities
│   │           │   ├── Wi-Fi icon
│   │           │   ├── Power icon
│   │           │   └── High Traffic icon
│   │           ├── Select Button
│   │           └── Selection Overlay (Checkmark)
│   │
│   └── Booking Summary (Right - 1/3 width, Sticky)
│       ├── Header
│       │   ├── ShoppingCart icon
│       │   ├── Title
│       │   └── Selection Counter Badge (X/3)
│       │
│       ├── Remaining Slots Text
│       ├── Max Limit Warning (if 3 selected)
│       ├── Selected Date Display (Calendar icon)
│       │
│       ├── Selected Stalls List (Scrollable)
│       │   └── Stall Card (×N)
│       │       ├── Name
│       │       ├── Type Badge
│       │       ├── Location (MapPin icon)
│       │       ├── Price
│       │       └── Remove Button (X icon)
│       │
│       ├── Separator
│       │
│       ├── Price Breakdown
│       │   ├── Subtotal
│       │   ├── Tax (10%)
│       │   └── Total (Gradient text)
│       │
│       ├── Separator
│       │
│       ├── Continue Button (Gradient, disabled state)
│       │
│       └── Help Text (Tip)
│
└── Footer (Global)
    ├── Stats Bar (4 metrics)
    ├── Main Content (4 columns)
    │   ├── Brand + Contact + Social
    │   ├── Quick Links
    │   ├── Resources
    │   └── Newsletter
    └── Bottom Bar (Copyright + Legal links)
```

---

## 🎨 Component Props & State

### Reserve.tsx (Main Component)

**State:**
```typescript
const [selectedStalls, setSelectedStalls] = useState<Stall[]>([])
const [selectedDate, setSelectedDate] = useState<Date | null>(null)
const [searchQuery, setSearchQuery] = useState("")
const [selectedHall, setSelectedHall] = useState<string>("All")
const [selectedType, setSelectedType] = useState<string>("All")
const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
const [showFilters, setShowFilters] = useState(false)
```

**Handlers:**
- `handleSelectStall(stallId)` - Add/remove stall from selection
- `handleRemoveStall(stallId)` - Remove stall from booking summary
- `handleContinue()` - Navigate to bookings page

**Computed Values:**
- `filteredStalls` - Stalls matching search + filters
- `stats` - Total, available, premium, popular counts

---

### StallCard.tsx

**Props:**
```typescript
interface StallCardProps {
  stall: Stall               // Stall data object
  isSelected: boolean        // Selection state
  onSelect: (id: string) => void  // Selection handler
  disabled?: boolean         // Disable selection (max reached)
}
```

**Features:**
- Image with gradient overlay
- Type badge (color-coded)
- Hall badge (color-coded)
- Popular badge (conditional)
- Amenities with icons
- Select/Selected button
- Selection checkmark overlay
- Availability overlay (if not available)
- Hover effects (scale, shadow, border)

---

### BookingSummary.tsx

**Props:**
```typescript
interface BookingSummaryProps {
  selectedStalls: Stall[]    // Array of selected stalls
  selectedDate: Date | null  // Selected date
  onRemoveStall: (id: string) => void  // Remove handler
  onContinue: () => void     // Continue handler
  maxStalls?: number         // Max selection limit (default: 3)
}
```

**Features:**
- Sticky positioning (top-24)
- Selection counter badge
- Remaining slots indicator
- Max limit warning
- Selected date display
- Scrollable stall list (max-h-60)
- Remove buttons (hover to show)
- Price calculation (subtotal, tax, total)
- Empty state (no stalls selected)
- Continue button (disabled state)
- Help tip

---

## 🔄 Data Flow

```
User Actions → State Updates → UI Re-renders
     ↓              ↓              ↓
  Click Stall → selectedStalls → StallCard + BookingSummary update
  Select Date → selectedDate → BookingSummary shows date
  Search → searchQuery → filteredStalls → StallCard grid updates
  Filter Hall → selectedHall → filteredStalls → StallCard grid updates
  Filter Type → selectedType → filteredStalls → StallCard grid updates
  Toggle View → viewMode → Grid/List layout changes
  Remove Stall → selectedStalls → StallCard deselected + Summary updates
  Continue → navigate("/bookings")
```

---

## 🎯 User Interactions

### 1. Search for Stalls
```
User types in search box
  ↓
searchQuery state updates
  ↓
filteredStalls recomputes
  ↓
Stall grid re-renders with matching stalls
```

### 2. Filter by Hall/Type
```
User clicks filter button (All/Hall A/Hall B/Outdoor)
  ↓
selectedHall state updates
  ↓
filteredStalls recomputes
  ↓
Stall grid re-renders with matching stalls
```

### 3. Select Stall
```
User clicks "Select" button on StallCard
  ↓
handleSelectStall(stallId) called
  ↓
Check if max limit reached (3 stalls)
  ↓
If allowed: Add stall to selectedStalls array
  ↓
StallCard shows "Selected" state (checkmark)
  ↓
BookingSummary adds stall card to list
  ↓
Price recalculates (subtotal, tax, total)
```

### 4. Remove Stall
```
User clicks X button in BookingSummary
  ↓
handleRemoveStall(stallId) called
  ↓
Remove stall from selectedStalls array
  ↓
StallCard returns to "Select" state
  ↓
BookingSummary removes stall card
  ↓
Price recalculates
```

### 5. Select Date
```
User picks date in date picker
  ↓
selectedDate state updates
  ↓
BookingSummary shows formatted date
  ↓
Continue button enabled (if stalls selected)
```

### 6. Continue to Booking
```
User clicks "Continue to Booking" button
  ↓
Check if stalls + date selected
  ↓
If yes: handleContinue() called
  ↓
Navigate to /bookings page (not yet implemented)
```

---

## 🧩 Reusable Components

### From shadcn/ui
- ✅ **Button** - 10 variants, used everywhere
- ✅ **Badge** - 7 variants, type/hall badges
- ✅ **Card** - Container for stalls, stats, filters
- ✅ **Input** - Search box, date picker
- ✅ **Separator** - Dividers in BookingSummary

### Custom Components
- ✅ **StallCard** - Reusable stall display
- ✅ **BookingSummary** - Reusable booking sidebar
- ✅ **Header** - Global navigation
- ✅ **Footer** - Global footer

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Mobile menu (hamburger)
- Stacked search/filters
- Single-column stall grid
- Full-width booking summary (moves to bottom)

### Tablet (768px - 1024px)
- 2-column stall grid
- Condensed filters
- Sidebar booking summary

### Desktop (> 1024px)
- 2-column stall grid
- Full filter panel
- Sticky sidebar (1/3 width)
- Hover effects enabled

---

## 🎨 Color Coding

### Stall Types
- **Premium** - `bg-olive/10` border, `text-olive` badge
- **Corner** - `bg-secondary/10` border, `text-secondary` badge
- **Standard** - `bg-primary/10` border, `text-primary` badge

### Halls
- **Hall A** - `bg-primary/10` border, `text-primary` badge
- **Hall B** - `bg-secondary/10` border, `text-secondary` badge
- **Outdoor** - `bg-olive/10` border, `text-olive` badge

### States
- **Available** - Full opacity, clickable
- **Unavailable** - 50% opacity, cursor not-allowed
- **Selected** - Green checkmark overlay, border highlight
- **Popular** - Yellow star badge

---

## 🚀 Performance Optimizations

### Implemented
- ✅ Component-level state (no global state needed)
- ✅ Filtered arrays computed only when dependencies change
- ✅ Sticky positioning (CSS, no JS)
- ✅ SVG icons (lightweight)
- ✅ Tailwind CSS (minimal runtime)

### Future Optimizations
- ⏳ React.memo for StallCard (prevent unnecessary re-renders)
- ⏳ useMemo for filteredStalls (expensive computation)
- ⏳ useCallback for handlers (prevent function recreation)
- ⏳ Virtual scrolling (if >100 stalls)
- ⏳ Lazy loading images (react-lazy-load-image-component)
- ⏳ Code splitting (React.lazy)

---

## 🔍 Accessibility Features

### Implemented
- ✅ Semantic HTML (header, main, footer, nav)
- ✅ ARIA labels (icons, buttons)
- ✅ Keyboard navigation (Tab, Enter)
- ✅ Focus states (outline, ring)
- ✅ Color contrast (WCAG AA)
- ✅ Alt text (images, icons)

### Future Improvements
- ⏳ Screen reader announcements (live regions)
- ⏳ Keyboard shortcuts (Alt+S for search)
- ⏳ Focus trap (modal dialogs)
- ⏳ Skip links (skip to main content)

---

## 📦 Dependencies

### Installed
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.1",
  "@radix-ui/react-separator": "^1.1.0",
  "lucide-react": "^0.468.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.7.0"
}
```

### To Install (Future)
```bash
npm install @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-dialog
npm install @radix-ui/react-calendar
npm install @radix-ui/react-popover
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-progress
npm install qrcode.react
```

---

## 🎉 Success Metrics

### Completed ✅
- Modern design (glassmorphism, gradients, animations)
- Responsive layout (mobile, tablet, desktop)
- Search functionality (name, location)
- Filter functionality (hall, type)
- Multi-select (up to 3 stalls)
- Price calculation (subtotal, tax, total)
- Empty states (no results, no selection)
- Loading states (disabled buttons)
- Error handling (max limit warning)

### Next Milestones 🎯
- Backend integration (API calls)
- Authentication (cookie-based)
- Form validation (Zod schemas)
- QR code generation
- Email confirmation
- Payment processing
- Booking management (view, cancel, modify)

---

**View the Reserve page at**: `http://localhost:8084/reserve` 🚀
