import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native-svg";

import { useActionSheet } from '@expo/react-native-action-sheet'

import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import * as ImagePicker from 'expo-image-picker';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend}) => {
  const actionSheet = useActionSheet();

  const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
  const cancelButtonIndex = options.length - 1;
  actionSheet.showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          console.log('user wants to pick an image');
          return;
        case 1:
          console.log('user wants to take a photo');
          return;
        case 2:
          console.log('user wants to get their location');
        default:
      }
    },
  );
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
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }

  


  return (
    <TouchableOpacity style={styles.container}>
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