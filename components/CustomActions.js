import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker'; 
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';

const CustomActions = ({
    wrapperStyle,
    iconTextStyle,
    onSend,
    storage,
    userID
}) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        // Defines array of strings to display in the ActionSheet
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel'
        ];
        // Displays cancel button
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            }
        );
    };

    // Generates unique reference for image based on user ID, current timestamp and image name
    const generateReference = (uri) => {
        const timeStamp = new Date().getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    };

     //To convert image to blob so it can be stored in Firebase
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend([
                {
                    createdAt: Timestamp.now(),
                    user: {
                        _id: userID
                    },
                    image: imageURL
                }
            ]);
        });
    };

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    };

   
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    };

  
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
              //Send location as message 
                onSend([
                    {
                        createdAt: Timestamp.now(),
                        user: {
                            _id: userID
                        },
                        location: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude
                        }
                    }
                ]);
            } else Alert.alert('Error occurred while fetching location');
        } else Alert.alert("Permissions haven't been granted.");
    };

    return (
        <TouchableOpacity
            accessible={true}
            accessibilityLabel="Select optional actions"
            accessibilityHint="Choose to send an image or your location."
            accessibilityRole="button"
            style={styles.container}
            onPress={onActionPress}
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
});

export default CustomActions;
