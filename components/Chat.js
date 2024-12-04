import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import CustomActions from './CustomActions.js';
import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from 'react-native';


const Chat = ({ route, navigation, isConnected, db, storage }) => {

  const { name = "User", color = "white", userID = null } = route?.params || {};
  const [messages, setMessages] = useState([]);


  // To keep old messages on screen
  const onSend = (newMessages) => {
    const message = Array.isArray(newMessages) ? newMessages[0] : newMessages;
    console.log("Message sent:", newMessages[0]);
    addDoc(collection(db, "messages"), message); // Ensure message is saved correctly
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  let unsubMessages;

  useEffect(() => {

    if (isConnected === true) {

      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), where("uid", "==", userID));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  // To have the user's name at the top of the Chat screen
  useEffect(() => {
    if (navigation?.setOptions && name) {
      navigation.setOptions({ title: name });
    }
  }, [navigation, name]);


  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubChat = onSnapshot(q, (documentsSnapshot) => {
      const newMessages = documentsSnapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubChat) unsubChat();
    }
  }, [userID]);



// To pick image and get location
const renderCustomActions = (props) => {
  return <CustomActions storage={storage} onSend={onSend} {...props} />;
};

// To show location in chat bubble
const renderCustomView = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  } else if (currentMessage.image) {
    return (
      <Image
        source={{ uri: currentMessage.image }}
        style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
      />
    );
  }
  return null;
};

  return (
    <View style={[styles.container, { backgroundColor: color || 'white' }]}>

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;