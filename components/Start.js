import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {

  const [name, setName] = useState('');

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (

    <View style={styles.container}>
      <ImageBackground source={require("../img/Background.png")} style={styles.backgroundImage}>
        <View>
          <Text style={styles.title}>CHIT CHAT</Text>
        </View>


        <View style={styles.colorContainer}>
          <TextInput
            style={styles.TextInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Text>Choose a background color:</Text>
          <TouchableOpacity style={styles.colorOptions} onPress={onPress} />

          <Button
            style={styles.button}
            title="Start Chatting"
            onPress={() => navigation.navigate('Chat', { name: name })}
          /></View>
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

  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderColor: 'black'
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: '100%',
    width: '100%'
  },

  colorContainer: {
    marginTop: '50%',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'fixed',
    justifyContent: 'space-around', 
  },

  colorOptions: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'salmon'
  }, 

});

export default Start;