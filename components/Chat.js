import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {

  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name }); // Include background color here
  }, []);

 return (
   <View style={styles.container}>
     <Text>Hello Chat!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;