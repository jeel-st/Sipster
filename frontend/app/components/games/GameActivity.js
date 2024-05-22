import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { classNames } from '../../utils';
import HomeReactionCard from '../home/HomeReactionCard';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import useGameActivity from '../../utils/hooks/useGameActivity';
import { CameraView } from 'expo-camera';
import { useRef } from 'react';
import GameCameraBtn from './GameCameraBtn';

export default function GameActivity({ user, game, taggedFriends }) {
    const emojis = ['🍻', '😍', '🤮', '🥳'];
    const cameraRef = useRef(null);
    const { image, setImage, type, setType, flash, setFlash, takePicture, caption, setCaption, handlePress } = useGameActivity(cameraRef, game, taggedFriends);

    return (user &&
        <View className={classNames(
            'absolute z-20 justify-center items-center',
            'space-y-4',
            'w-full h-full',
            'bg-black opacity-95'
        )}>
            <View className={classNames(
                'justify-between',
                'mx-6 mt-4 space-y-2',
                'w-[80%] h-[550px]',
            )}>
                <View className={classNames(
                    'flex-row justify-start items-center',
                    'space-x-3',
                    'h-[10%] w-full'
                )}>
                    <View className={classNames(
                        'w-12 h-12',
                        'rounded-full border-yellow border-[1px]'
                    )}>
                        {/* Profile Picture */}
                        <Image
                            className={classNames(
                                'w-full h-full',
                                'rounded-full'
                            )}
                            source={{ uri: fetchProfilePictureCompressed(user) }} />
                    </View>

                    {/* Activity Info */}
                    <View>
                        <Text className={classNames(
                            'text-white font-bold'
                        )}>{user.username}</Text>
                        <Text className={classNames(
                            'text-neutral-300 font-thin'
                        )}>played {game.name.toLowerCase()} | vaihingen</Text>
                    </View>
                </View>

                {/* Camera View*/}
                <View className={classNames(
                    'h-[90%]',
                    'rounded-2xl'
                )}>
                    {image ?
                        <Image
                            source={{ uri: image }}
                            className={classNames(
                                'w-full h-full',
                                'rounded-2xl'
                            )} /> :
                        <CameraView
                            facing={type}
                            flash={flash}
                            ref={cameraRef}
                            className={classNames(
                                'w-full h-full',
                                'rounded-2xl'
                            )}
                        >
                        </CameraView>
                    }

                    <View className={classNames(
                        'absolute bottom-4 justify-between flex-row items-end',
                        'w-full',
                        'px-3'
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
                            {emojis.map((emoji, index) => {
                                return (
                                    <HomeReactionCard emoji={emoji} key={index} />
                                )
                            })}
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
                        'justify-center items-center',
                        'mt-8',
                        'h-24 w-[80%]',
                        'bg-yellow rounded-2xl shadow-md shadow-black'
                    )}>
                    <Text className={classNames('text-black text-xl font-bold')}>Post and Go</Text>
                </TouchableOpacity>
            }
        </View>
    );
}
