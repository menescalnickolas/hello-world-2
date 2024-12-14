# Chit Chat App

A React Native chat application that enables users to exchange messages, share images, and send locations in real time. The app is powered by Firebase Firestore and includes offline functionality for seamless use in any connectivity state.

## Features
- Real-time chat with message persistence.
- Offline functionality with message caching.
- Image sharing and location sending.
- Customizable chat background colors.

## Prerequisites
Before setting up the project, ensure you have the following installed:

- Node.js (latest LTS version recommended)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions
**1. Clone the Repository**
git clone URL
cd chit-chat-app

**2. Install Dependencies**
npm install

**3. Configure Firebase**
- Create a Firebase project at Firebase Console.
- Enable Firestore Database and Storage services.
- Set up authentication with Anonymous Sign-In.
- Replace the firebaseConfig object in App.js with your Firebase project configuration. You can find it in your Firebase project settings under *Project Settings > General > Your Apps*.

**4. Start the Development Server**
To run the app locally, execute:
expo start

**5. Development Environment Setup**
Android: Open the Expo project in Android Studio, or use the Expo Go app on a physical device.
iOS: Open the project in Xcode or use the Expo Go app on an iPhone.

## Required Libraries
The app depends on the following libraries, which are automatically installed via npm install:

- react-native and expo: Core frameworks for building the app.
- @react-navigation/native and @react-navigation/native-stack: Navigation between screens.
- firebase: Firebase services for authentication, Firestore, and Storage.
- @react-native-community/netinfo: Network status monitoring.
- react-native-gifted-chat: Chat interface.
- expo-image-picker and expo-location: Image and location utilities.
- react-native-maps: Displaying location in messages.
- @react-native-async-storage/async-storage: Offline message caching.

## Offline Mode
The app supports offline functionality. Messages are cached locally using AsyncStorage and synced with Firebase when the connection is restored.

## Known Issues
Ensure Firebase credentials are properly configured; otherwise, the app may fail to connect to the database.
Location and image features require appropriate permissions on devices.
