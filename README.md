# Posko Finder App

A React Native mobile application designed to dynamically map and manage "Posko" (Posts/Facilities). Built as a technical assessment for Transnovasi.

## Features
- **Interactive Map:** Dynamic map visualization powered by `react-native-maps`.
- **Real-Time Geolocation:** Uses `expo-location` to request and track user coordinates.
- **Dynamic State-Driven UI:** Smooth view transitions between `START`, `LIST`, `CARD`, and `OPTION` states without heavy navigation boilerplate.
- **Filtering & Sorting:** Easily find facilities based on categories and alphabetical sorting.
- **Clean Code Architecture:** Centralized state management using Zustand, centralized theme constants (`COLORS`), and decoupled modular UI components.

## Tech Stack & Libraries Used
- **Framework:** React Native (Expo SDK)
- **State Management:** Zustand
- **Maps:** `react-native-maps`
- **Geolocation:** `expo-location`
- **Icons:** `@expo/vector-icons`

---

## How to Run the App Locally (Recommended)

To evaluate the application with full functionality and map tile rendering, running via Expo Go or an emulator is recommended.

1. **Clone the repository:**
   git clone https://github.com/defasta/posko-apps.git

2. **Install dependencies:**
   npm install

3. **Start the Expo development server:**
   npm start

4. **Run on your device or emulator:**
   - Press **a** to open on Android Emulator.
   - Press **i** to open on iOS Simulator.
   - Or scan the QR code using the **Expo Go** app on your physical device.

---

## Important Technical Notes for Evaluators

### 1. Standalone APK vs. Expo Go Environment
- Google Maps SDK for Android requires an active Google Cloud Billing Account (Credit Card) to generate a valid Production API Key for standalone `.apk` builds. 
- Due to the absence of a billing-enabled Google Maps API Key for standalone APK compilation, the MapView native module may fail to initialize on standalone APK builds.
- **Full Functionality Verification:** Please run the project locally via `npm start` (Expo Go / Emulator). Expo Go uses its built-in map key provider, allowing the entire app—including MapView rendering, Zustand state updates, bottom sheet transitions, filtering, and geolocation—to run 100% perfectly.

### 2. Permissions Handling
- The app requests location permissions upon launch via `expo-location`. Please grant location permissions when prompted to enable map recentering and current location markers.

### 3. Code Architecture & Clean Code Highlights
- **State Management:** Logic and view states are handled globally using Zustand (`useAppStore`), keeping UI components light and readable.
- **Theme Centralization:** All hex colors and theme styles are centralized inside `src/constants/colors.ts` to ensure UI consistency and easy scalability.