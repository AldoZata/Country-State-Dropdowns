# Country & State Dropdown Challenge

A production-quality web application that demonstrates cascading dropdown functionality using a clean architecture and modern React patterns.

## 🎯 Challenge Overview

This application implements two connected dropdowns:
- **Country Dropdown**: Loads and displays a list of countries
- **State Dropdown**: Dynamically loads states based on the selected country

## 🏗️ Architecture & Design Decisions

### Framework Choice
- **Vite** + **React 19** for fast dev/build and modern React
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS v4** + **Radix UI primitives** for accessible, consistent UI

### Architecture Patterns

#### 1. Component Architecture
```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── country-state-dropdowns.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       └── toast.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── api.ts
│   └── utils.ts
└── index.css

public/
index.html
vite.config.ts
tsconfig.json
```

#### 2. Separation of Concerns
- **API Layer** (`src/lib/api.ts`): Handles all external API communication
- **UI Components** (`src/components/`): Reusable, accessible UI elements
- **Business Logic** (`country-state-dropdowns.tsx`): State management and user interactions

#### 3. State Management Strategy
Using React's built-in state management with strategic separation:
- `countries`: Master list of available countries
- `states`: Dynamic list based on selected country
- `selectedCountry` & `selectedState`: Current user selections
- `loadingCountries` & `loadingStates`: Loading states for better UX

### Key Features

#### 🔄 Cascading Dropdown Logic
```typescript
// When country changes, automatically:
// 1. Reset state selection
// 2. Load new states for selected country
// 3. Handle loading states appropriately
useEffect(() => {
  const loadStates = async () => {
    if (!selectedCountry) {
      setStates([])
      return
    }
    // ... load states logic
  }
  loadStates()
}, [selectedCountry])
```

#### 🛡️ Error Handling
- Comprehensive try-catch blocks for API calls
- User-friendly error messages via toast notifications
- Graceful degradation when API calls fail

#### ♿ Accessibility
- Semantic HTML with proper labels
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management

#### 🎨 User Experience
- Loading indicators during API calls
- Disabled states for dependent dropdowns
- Clear placeholder text for different states
- Visual feedback for selections

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd dropdown-challenge

# Install dependencies
npm install

# Required environment variables (Vite)
echo VITE_API_BASE_URL=https://fedt.unruffledneumann.xyz/api/v1 > .env
echo VITE_API_KEY= >> .env  # optional

# Start development server (http://localhost:3000)
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Countries load on page mount
- [ ] Country selection triggers state loading
- [ ] State dropdown resets when country changes
- [ ] Error handling works when API is unavailable
- [ ] Loading states display correctly
- [ ] Submit button validates selections
- [ ] Accessibility features work with keyboard navigation

### Automated Testing (Future Enhancement)
Recommended testing approach:
```typescript
// Example test structure
describe('CountryStateDropdowns', () => {
  it('loads countries on mount')
  it('loads states when country is selected')
  it('resets state selection when country changes')
  it('handles API errors gracefully')
  it('validates form submission')
})
```

## 🔧 API Integration

### Endpoints Used
- `GET /countries` - Retrieves list of all countries
- `GET /countries/{id}/states` - Retrieves states for specific country

### API Client Features
- Automatic sorting of results alphabetically
- Proper error handling and logging
- TypeScript interfaces for type safety
- Centralized configuration (base URL, headers)

## 🎯 Production Considerations

### Performance
- Efficient re-renders using proper dependency arrays
- Alphabetical sorting for better user experience
- Minimal API calls (only when necessary)

### Security
- API key configured via env variables (Vite)
- Input validation on form submission
- XSS protection through React's built-in escaping

### Scalability
- Modular component architecture
- Reusable API utilities
- Easy to extend with additional dropdowns or features

## 🔮 Future Enhancements

1. **Caching**: Implement client-side caching for countries/states
2. **Search**: Add search/filter functionality to dropdowns
3. **Virtualization**: Handle large lists with virtual scrolling
4. **Offline Support**: Cache data for offline functionality
5. **Testing**: Add comprehensive unit and integration tests
6. **Analytics**: Track user selections for insights

## 📝 Development Notes

This implementation prioritizes:
- **Clean Code**: Readable, maintainable, and well-documented
- **User Experience**: Smooth interactions with proper feedback
- **Accessibility**: Works for all users regardless of abilities
- **Type Safety**: Comprehensive TypeScript coverage
- **Error Resilience**: Graceful handling of edge cases

The architecture is designed to be easily extensible while maintaining separation of concerns and following React best practices.
