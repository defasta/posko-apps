# Posko Finder App

A React Native mobile application designed to dynamically map and manage "Posko" (Posts/Facilities). Built as a technical assessment for PT Transnovasi Bangun Persada.

## Features
- Interactive Map: Dynamic map visualization powered by `react-native-maps`.
- Real-Time Geolocation: Uses `expo-location` to request and track user coordinates.
- Dynamic State-Driven UI: Smooth view transitions and interactions utilizing `@gorhom/bottom-sheet`.
- Clean Code Architecture: Centralized state management using Zustand and modular UI components.

## Tech Stack & Libraries Used
- Framework: React Native (Expo SDK)
- State Management: Zustand
- Maps: `react-native-maps`
- Geolocation: `expo-location`
- UI Components: `@gorhom/bottom-sheet`, `react-native-reanimated`

## How to Run the App Locally

If you wish to run the app in a development environment:

1. Clone the repository:
   git clone https://github.com/defasta/posko-apps.git
   cd posko-apps

2. Install dependencies:
   npm install

3. Start the Expo development server:
   npm start

4. Run on your device or emulator:
   - Press 'a' to open on Android Emulator.
   - Press 'i' to open on iOS Simulator.
   - Or scan the QR code using the Expo Go app on your physical device.

## Application Flow & Architecture Highlights
- State Management: Logic and view states are handled globally using Zustand, keeping UI components light, readable, and highly maintainable.
- Permissions Handling: The app gracefully requests location permissions upon launch to enable map recentering and current location markers.
- Production Ready: The repository includes configurations ready for standalone release builds.