import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyC2eBC3LneODX9I8xw-_tHFOlRBPwcjaOI",
    authDomain: "chat-bde4b.firebaseapp.com",
    projectId: "chat-bde4b",
    storageBucket: "chat-bde4b.firebasestorage.app",
    messagingSenderId: "257547840215",
    appId: "1:257547840215:web:d6ee521d480f1d57221e92"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{ db }} // Pass db as an initial parameter
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
