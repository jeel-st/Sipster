// Imports
import React, { useEffect, useState } from 'react';
import { Image, View, SafeAreaView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from '../../utils/database/imageFetcher';
import { classNames } from '../../utils';
import TextButton from './TextButton';
import CheckButton from './CheckButton';
import { userLog } from '../../utils/logger/config';
import { useUser } from '../../utils/hooks/useUser';

/*
This component can be used to upload your own and new profile pictures.
Typ: Component from settings
*/
export default function Picker({ change }) {

    // useState() -> Hook function of React to trade states
    const [hasPhotoPermission, setPhotoPermission] = useState(null);
    const [image, setImage] = useState(null);

    // logged in user is called
    const user = useUser()

    // When the component is first rendered, this function checks whether the app
    // has authorisation to access the device's media library.
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPhotoPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    // The pickImage function starts a process to select an image from the device's media library,
    // provided authorisation has been granted.
    const pickImage = async () => {
        if (hasPhotoPermission) {
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [3, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setImage(result.assets[0].uri);
                    await uploadProfilePicture(result.assets[0], user);
                }
            } catch (error) {
                userLog.error("Error during image upload:", error)
            }
        }
    };

    return (
            <View className={classNames('flex-row justify-between')}>
                <View style={styles.imageContainer}>
                    {image && <Image source={{ uri: image }} className={('w-full h-full object-cover')}/>}
                </View>
                <View className={classNames('items-center justify-center')}>
                    <TextButton title="Choose Image" color="white" icon="attach-outline" content={pickImage} />
                    <View className={('mt-6')}/>
                    <CheckButton change={change}/>
                </View>
            </View>
    );
}

// Stylesheet for the ImageContainter
const styles = StyleSheet.create({
    imageContainer: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginRight: 20,
    },
});
