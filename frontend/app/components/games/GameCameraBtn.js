import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { classNames } from '../../utils';
import { CameraType, FlashMode } from 'expo-camera/build/legacy/Camera.types';

export default function CameraControls({ image, setType, type, takePicture, setFlash, flash, setImage }) {
    return (<>
        {!image ?
            <View className={classNames(
                'flex-row justify-between items-center',
                'mx-8 pt-8',
                'w-[80%]'
            )}>
                <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                    <FontAwesome6 name="camera-rotate" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={takePicture}
                    className={classNames(
                        'justify-center items-center',
                        'w-20 h-20',
                        'bg-white rounded-full'
                    )}>
                    <View className={classNames(
                        'w-[90%] h-[90%]',
                        'bg-primary rounded-full'
                    )}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFlash(flash === FlashMode.on ? FlashMode.off : FlashMode.on)}>
                    {flash === FlashMode.on ?
                        <Ionicons name="flash-off" size={30} color="white" /> :
                        <Ionicons name="flash" size={30} color="white" />
                    }
                </TouchableOpacity>
            </View> :
            <View className={classNames(
                'justify-center items-center',
                'mx-8 pt-8'
            )}>
                <TouchableOpacity
                    onPress={() => setImage(null)}>
                    <MaterialCommunityIcons name="camera-retake" size={40} color="white" />
                </TouchableOpacity>
            </View>
        }
    </>);
}
