import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {

  const [name, setName] = useState('');
  const [colorOptions, setColorOptions] = useState('');

  return (

    <View style={styles.container}>
      <ImageBackground source={require("../img/Background.png")} style={styles.backgroundImage}>
        <View>
          <Text style={styles.title}>CHIT CHAT</Text>
        </View>

        
        <View style={styles.mainContainer}> 
          <View style={styles.inputContainer}>
            <Image source={require('../img/icon.png')} style={styles.icon} />
            <TextInput
              style={styles.textInput} // Make sure to use lowercase 'textInput' as defined in your styles
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
                  color === colorOptions ? styles.selectedColor : null // Add selected styles
                ]}
                onPress={() => setColorOptions(color)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { name: name, color: colorOptions })}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingLeft: 10, // Add spacing between icon and input text
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
    position: 'absolute',
    bottom: 100, // Position it near the bottom
    width: '88%',
    height: '44%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignSelf: 'center', // Center horizontally
    paddingVertical: 20, // Optional: adjust padding as desired
  },

  chooseColorText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: '6%',

  },

  button: {
    width: '88%',
    height: 50,
    backgroundColor: 'gray', // Customize color
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, // Optional: adds rounded corners
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
    borderRadius: 25
  },

  selectedColor: {
    borderWidth: 3, 
    borderColor: 'gray'
  },

});

export default Start;