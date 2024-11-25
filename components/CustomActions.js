import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";

import { useActionSheet } from '@expo/react-native-action-sheet'

import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import * as ImagePicker from 'expo-image-picker';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            takePhoto();
            break;
          case 2:
            getLocation();
            break;
          default:
            break;
        }
      }
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        onSend({ image: result.assets[0].uri }); //Send image as message
      }
    } else {
      Alert.alert('Permission to access media library is required!');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        onSend({ image: result.assets[0].uri }); //Send photo as message
      }
    } else {
      Alert.alert('Permission to access camera is required!');
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        }); //Send location as message 
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

  


  return (
    <TouchableOpacity style={styles.container} onPress={handleActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;