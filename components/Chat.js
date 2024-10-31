import { StyleSheet, View, Text, KeyboardAvoidingView, Platform  } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {

  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  // To keep old messages on screen
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }


  // To customize the message bubbles
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "royalblue",
          paddingVertical: 8, 
          paddingHorizontal: 10,
          maxWidth: '100%', 
          minWidth: '10%',
        },
        left: {
          backgroundColor: "snow",
          paddingVertical: 8,
          paddingHorizontal: 10,
          maxWidth: '100%',
          minWidth: '10%',
        }
      }}
    />
  }

  // To have the user's name at the top of the Chat screen
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);


// id: 2 is for system messages
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat.',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

 return (
  <View style={[styles.container, { backgroundColor: color || 'white' }]}> 
      
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }} 
        /> 
        {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }, 
});

export default Chat;