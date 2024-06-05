import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { classNames } from '../../utils';
import HomeReactionCard from '../home/HomeReactionCard';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import useGameActivity from '../../utils/hooks/useGameActivity';
import { CameraView } from 'expo-camera';
import { useRef } from 'react';
import GameCameraBtn from './GameCameraBtn';
import { emojis } from '../../constants/games';

/*
    GameActivity is a component that represents the game activity page.
    It displays the camera view and a preview of the following post
    Typ: Component from games

    @param user:          object -> the user
    @param game:          object -> the game selected
    @param taggedFriends: array -> the tagged friends
    @return:              JSX -> returns the GameActivity component
*/
export default function GameActivity({ user, game, taggedFriends }) {
    const cameraRef = useRef(null);
    const { image, setImage, type, setType, flash, setFlash, takePicture, caption, setCaption, handlePress } = useGameActivity(cameraRef, game, taggedFriends);

    return (user &&
        <View className={classNames(
            'absolute z-20 justify-center items-center', // position
            'space-y-4', // spacing
            'w-full h-full', // sizing
            'bg-black opacity-80' // styling
        )}>
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
                            source={{ uri: fetchProfilePictureCompressed(user) }} />
                    </View>

                    {/* Activity Info */}
                    <View>
                        <Text className='text-white font-bold' >{user.username}</Text>
                        <Text className='text-neutral-300 font-thin' >played {game.name.toLowerCase()} | vaihingen</Text>
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
            {/*image &&  muss vor touchableOpacity rein*/}
            {
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
        </View>
    );
}
