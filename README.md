Vehicle Auction App - React Native
Overview
This React Native application provides a platform for browsing and bidding on vehicles in an auction format. The app features a modern UI with filtering capabilities, vehicle details, and favorites management.

Architecture
The application follows a clean architecture pattern with separation of concerns:

src/
├── components/         # Reusable UI components│   
│   └── FilterChips.tsx       # Filter interface for vehicle search
│   ├── VehicleCard.tsx       # Card component for vehicle listings
│   ├── VehicleDetailScreen.tsx # Modal for detailed vehicle information
│   └── FilterModal.tsx       # Filter interface for vehicle search
├── entities/           # Data models and types
│   └── Vehicle.ts      # Vehicle data structure and related types
├── data/               # Local data
│   └── vehicles.json   # Vehicle json
├── services/               # Local data
│   └── VehicleService.ts   # Vehicle service and business logic
├── screens/               # Local data
│   └── VehicleListScreen.ts   # Vehicle service and business logic
├── presentation/       # UI logic and utilities
│   └── utils/
│       └── dateUtils.ts # Date manipulation utilities
├── theme/             # Styling system
│   ├── filterChipsStyles.ts       # Filter Chips styles
│   ├── filterModalStyles.ts # Filter Modal style
│   └── vehicleCardStyles.ts # Vehicle Card style
└── App.tsx             # Main application component

Key Features
1. Vehicle Browsing
Grid/list view of available vehicles
Card-based UI showing key vehicle information
Auction countdown timer for each vehicle

2. Advanced Filtering
Filter by make and model using chip selection
Price range filtering with min/max inputs
Favorites-only filter option
Responsive filter modal with keyboard handling

3. Vehicle Details
Comprehensive vehicle information display
Auction details including starting bid and time remaining
Favorite/unfavorite functionality
Vehicle specifications and features list

4. Responsive UI
Keyboard-aware components
Adaptive layouts for different screen sizes
Smooth animations and transitions
Components
VehicleCard
A touchable card component displaying essential vehicle information:

Make and model
Year, engine size, and fuel type
Mileage
Starting bid price
Time remaining until auction
Favorite toggle functionality

VehicleDetailScreen
A modal component showing comprehensive vehicle information:

Complete vehicle specifications
Auction information
Description and features
Favorite toggle functionality
Bid placement option

FilterModal
A bottom sheet modal for filtering vehicle listings:

Make and model selection with horizontal scrolling chips
Price range input with numeric keyboard
Favorites-only toggle
Apply and reset functionality
Keyboard-aware design to ensure inputs remain visible

Data Models
Vehicle
FilterOptions
Styling System
The application uses a theme-based styling approach:

Component-specific theme files
Consistent color palette
Responsive spacing and typography
Reusable style patterns
Technical Implementation Details
Keyboard Handling
The FilterModal component implements advanced keyboard handling:

KeyboardAvoidingView to adjust layout when keyboard appears
Auto-scrolling to keep input fields visible
Keyboard dismissal when tapping outside inputs
Input field focus management with refs
Extra padding to prevent content from being hidden by keyboard
State Management
Local component state for UI interactions
Props for component communication
Callback patterns for actions (onPress, onFavoriteToggle, etc.)
Responsive Design
Percentage-based layouts
Screen dimension awareness
Flexible containers with appropriate constraints
Getting Started
Prerequisites
Node.js (v14 or later)
npm or yarn
React Native development environment

Installation
Clone the repository
git clone [https://github.com/JamesLeve25/VehiclesAuction.git]
Install dependencies
cd vehicle-auction-app
npm install
Start the Metro bundler
npx react-native start

Run the application
npx react-native run-android

# or
npx react-native run-ios

Best Practices Implemented
Component Separation: Each UI element is encapsulated in its own component
Type Safety: TypeScript interfaces for all props and data structures
Theming: Consistent styling through theme files
Accessibility: Proper keyboard handling and focus management
Performance: Optimized rendering with appropriate component structure
User Experience: Smooth animations and intuitive interactions
Code Organization: Clear folder structure with separation of concerns

Future Enhancements
Repository pattern implementation from api data and from local data.
Real-time bidding functionality
Push notifications for auction updates
Offline support with data persistence
Advanced search capabilities
Vehicle image gallery
Bid history and analytics
This README provides a comprehensive overview of the Vehicle Auction App's architecture, features, and implementation details. The application demonstrates modern React Native development practices with a focus on user experience and code maintainability.
