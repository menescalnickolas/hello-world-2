import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {

  const [name, setName] = useState('');

 return (

   <View style={styles.container}>
    <View>
      <Text style={styles.title}>CHIT CHAT</Text>
    </View>
     <TextInput 
     style={styles.TextInput}
     value={name}
     onChangeText={setName}
     placeholder='Your Name'
     />
     <Button
       title="Go to Chat Room"
       onPress={() => navigation.navigate('Chat', {name: name})}
     />
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '44%',
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
    color: '#FFFFFF'
  }

});

export default Start;