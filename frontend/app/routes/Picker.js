import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from '../utils/accountFetcher';

export default function Picker() {
    const [hasPhotoPermission, setPhotoPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPhotoPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        if(hasPhotoPermission){
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [3, 3],
                    quality: 1,
                });

                console.log(result);

                if (!result.cancelled) {
                    setImage(result.assets[0].uri);
                    await uploadProfilePicture(result.assets[0]);
                }
            } catch (error) {
                console.log("[pickImageError] ", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container} className="bg-primary">
            <Pressable onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Choose Image</Text>
            </Pressable>
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'red',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
