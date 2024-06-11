import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { classNames } from '../../utils';
import HomeReactionCard from '../home/HomeReactionCard';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import { CameraView } from 'expo-camera';
import GameCameraBtn from './GameCameraBtn';
import { emojis } from '../../constants/games';
import useCam from '../../utils/hooks/useCam';

export default function GameAcitvityCam({ activity, cameraRef, handlePress }) {
    const { image, setImage, type, setType, flash, setFlash, takePicture, caption, setCaption } = useCam(cameraRef, activity);
    return (<>
        <View className={classNames(
            'justify-between', // position
            'mx-6 mt-4 space-y-2', // spacing
            'w-[80%] h-[550px]', // sizing
        )}>
            <View className={classNames(
                'flex-row justify-start items-center', // position
                'space-x-3', // spacing
                'h-[10%] w-full' // sizing
            )}>
                <View className={classNames(
                    'w-12 h-12', // sizing
                    'rounded-full border-yellow border-[1px]' // styling
                )}>
                    {/* Profile Picture */}
                    <Image
                        className={classNames(
                            'w-full h-full', // sizing
                            'rounded-full' // styling
                        )}
                        source={{ uri: fetchProfilePictureCompressed(activity.user) }} />
                </View>

                {/* Activity Info */}
                <View>
                    <Text className='text-white font-bold' >{activity.user.username}</Text>
                    <Text className='text-neutral-300 font-thin' >played {activity.game.name.toLowerCase()} | vaihingen</Text>
                </View>
            </View>

            {/* Camera View*/}
            <View className={classNames(
                'h-[90%]', // sizing
                'rounded-2xl' // styling
            )}>
                {image ?
                    <Image
                        source={{ uri: image }}
                        className='w-full h-full rounded-2xl' /> :
                    <CameraView
                        facing={type}
                        flash={flash}
                        ref={cameraRef}
                        className={classNames(
                            'w-full h-full', // sizing
                            'rounded-2xl' // styling
                        )}
                    >
                    </CameraView>
                }

                <View className={classNames(
                    'absolute bottom-4 justify-between flex-row items-end', // position
                    'w-full', // sizing
                    'px-3' // spacing
                )}>
                    <TextInput
                        value={caption}
                        onChangeText={setCaption}
                        placeholder="About last Night #fun #party"
                        placeholderTextColor="gray"
                        style={{
                            color: 'white',
                            fontSize: 16,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            paddingHorizontal: 10,
                            borderRadius: 8,
                        }}
                    />

                    <View>
                        {emojis.map((emoji, index) =>
                            <HomeReactionCard
                                emoji={emoji}
                                key={index}
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>

        {/* Camera Controls */}
        <GameCameraBtn
            image={image}
            setType={setType}
            type={type}
            takePicture={takePicture}
            setFlash={setFlash}
            flash={flash}
            setImage={setImage}
        />

        {/* Start Game Button */}
        {image &&
            <TouchableOpacity
                onPress={handlePress}
                className={classNames(
                    'justify-center items-center', // position
                    'mt-8', // spacing
                    'h-24 w-[80%]', // sizing
                    'bg-yellow rounded-2xl shadow-md shadow-black' // styling
                )}>
                <Text className={classNames('text-black text-xl font-bold')}>Post and Go</Text>
            </TouchableOpacity>
        }
    </>
    )
}