# Posko Finder App 

A React Native mobile application designed to dynamically map and manage "Posko" (Posts/Facilities). Built as a technical assignment for Transnovasi.

## Features
- **Interactive Map:** Powered by `react-native-maps`.
- **Real-Time Geolocation:** Uses `expo-location` to request and track user coordinates.
- **Dynamic UI States:** Smooth transitions between Start, List, Card Carousel, and Filter Options without heavy nested navigations.
- **Filtering & Sorting:** Easily find facilities based on categories and alphabetical sorting.
- **Clean Architecture:** Utilizes Zustand for robust global state management and centralized UI constants (Colors/Themes).

## Tech Stack & Libraries Used
- **Framework:** React Native (Expo)
- **State Management:** Zustand
- **Maps:** `react-native-maps`
- **Geolocation:** `expo-location`
- **Icons:** `@expo/vector-icons`

## Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (v16 or newer recommended)
- Git
- Expo Go app on your physical device (or Android Studio / Xcode for emulators)

---

## How to Run the App Locally

**1. Clone the repository**
    git clone https://github.com/defasta/posko-apps.git

**2. Install dependencies**
    npm install

**3. Start the Expo development server**
    npm start

**4. Run on your device or emulator**
- Press **a** in the terminal to open the app in an Android Emulator.
- Press **i** in the terminal to open the app in an iOS Simulator.
- Scan the QR code generated in the terminal using the **Expo Go** app on your physical device (ensure your device and computer are on the same Wi-Fi network).

---

## Additional Information (Please Read)

### 1. Location Permissions
The app relies heavily on geolocation features. Upon the first launch, it will prompt you for location access. Please grant this permission for the application to function correctly and center the map on your current location.

### 2. Note on Google Maps API Key (APK Build)
Google Maps SDK for Android requires a valid API Key linked to an active Google Cloud Billing Account (Credit Card). Since I am submitting this as a technical test and currently do not have a Visa/Credit Card attached to a billing account, I have provided a **dummy API key** inside the `app.json` file. 

**What does this mean for the APK?**
To prevent the Standalone APK from instantly crashing upon rendering the MapView, the dummy key allows the app to run smoothly. However, the map tiles (the actual street visual) will appear blank or greyed out in the built `.apk`. 
All UI components, bottom sheets, markers, and state logic remain fully functional. 

*If you wish to see the full map tiles, please run the app locally via **Expo Go** (which uses Expo's internal API key), or replace the dummy key in `app.json` with a valid Google Maps API Key and rebuild.*

### 3. State Management & Structure
Instead of relying on deep navigation stacks, the app's UI is managed dynamically using Zustand to switch between core views (START, LIST, CARD, OPTION). This keeps the component tree clean and ensures smooth bottom-sheet and floating-card interactions.

---

## 📦 APK Release
The production-ready `.apk` file (PoskoApp-Release.apk) has been compiled and is **attached to the submission email**. It can be installed directly on any Android device to review the functional behaviors, UI layout, and application flow.