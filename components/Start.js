
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [colorOptions, setColorOptions] = useState('');

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid, name: name, color: colorOptions });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "android" ? "padding" : "height"}>
      <ImageBackground source={require("../img/Background.png")} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>CHIT CHAT</Text>

          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <Image source={require('../img/icon.png')} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder='Your Name'
              />
            </View>

            <Text style={styles.chooseColorText}>Choose a background color:</Text>
            <View style={styles.colorOptionsContainer}>
              {['floralwhite', 'pink', 'salmon', 'lavender', 'plum'].map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    color === colorOptions ? styles.selectedColor : null
                  ]}
                  onPress={() => setColorOptions(color)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              // onPress={() => navigation.navigate('Chat', { name: name, color: colorOptions })}
              onPress={signInUser}
              >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    height: 50,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
    marginTop: 155,
    alignSelf: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: '100%',
    width: '100%'
  },

  mainContainer: {
    width: '88%',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },

  chooseColorText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: '3%',
    padding: 15
  },

  button: {
    width: '88%',
    height: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  icon: {
    width: 20,
    height: 20,
  },

  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '88%',
    marginVertical: 10,
  },

  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 15
  },

  selectedColor: {
    borderWidth: 3,
    borderColor: 'gray'
  },
});

export default Start;