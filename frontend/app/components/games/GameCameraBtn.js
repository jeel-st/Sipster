import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { classNames } from '../../utils';
import { CameraType, FlashMode } from 'expo-camera/build/legacy/Camera.types';

/*
    CameraControls is a component that represents the camera controls.
    It displays the camera controls for the camera view.
    Typ: Component from games

    @param image:       object -> the image taken
    @param setType:     function -> the function to call when should switch the camera side
    @param type:        string -> the camera side
    @param takePicture: function -> the function to call when a picture is taken
    @param setFlash:    function -> the function to call when the flash mode changes
    @param flash:       string -> the flash mode
    @param setImage:    function -> the function to call when the image is set
    @return:            JSX -> returns the CameraControls component
*/
export default function CameraControls({ image, setType, type, takePicture, setFlash, flash, setImage }) {
    return (<>
        {!image ?
            <View className={classNames(
                'flex-row justify-between items-center', // position
                'mx-8 pt-8', // spacing
                'w-[80%]' // sizing
            )}>
                <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                    <FontAwesome6 name="camera-rotate" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={takePicture}
                    className={classNames(
                        'justify-center items-center', // position
                        'w-20 h-20', // sizing
                        'bg-white rounded-full' // styling
                    )}>
                    <View className={classNames(
                        'w-[90%] h-[90%]', // sizing
                        'bg-primary rounded-full' // styling
                    )} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFlash(flash === FlashMode.on ? FlashMode.off : FlashMode.on)}>
                    {
                        flash === FlashMode.on ?
                            <Ionicons name="flash-off" size={30} color="white" /> :
                            <Ionicons name="flash" size={30} color="white" />
                    }
                </TouchableOpacity>
            </View> :
            <View className={classNames(
                'justify-center items-center', // position
                'mx-8 pt-8' // spacing
            )}>
                <TouchableOpacity
                    onPress={() => setImage(null)}>
                    <MaterialCommunityIcons name="camera-retake" size={40} color="white" />
                </TouchableOpacity>
            </View>
        }
    </>);
}
