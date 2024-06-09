import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { classNames } from '../../utils';
import useGameActivity from '../../utils/hooks/useGameActivity';
import { useRef } from 'react';
import GameAcitvityCam from './GameAcitvityCam';

/*
    GameActivity is a component that represents the game activity page.
    It displays the camera view and a preview of the following post
    Typ: Component from games

    @param user:          object -> the user
    @param game:          object -> the game selected
    @param taggedFriends: array -> the tagged friends
    @return:              JSX -> returns the GameActivity component
*/
export default function GameActivity({ activity }) {
    const cameraRef = useRef(null);
    const { handlePress, handleChoice, withSips } = useGameActivity(activity);

    return (
        <View className={classNames(
            'absolute z-20 justify-center items-center', // position
            'space-y-4', // spacing
            'w-full h-full', // sizing
            'bg-black opacity-90' // styling
        )}>
            {!withSips && ActivityChoice()}
            {withSips &&
                <GameAcitvityCam
                    activity={activity}
                    cameraRef={cameraRef}
                    handlePress={handlePress}
                />
            }
        </View>
    );

    function ActivityChoice() {
        return <>
            <View className={classNames(
                'justify-center items-center', // position
                'mx-6 mt-4 space-y-12', // spacing
                'w-[80%] h-[550px]', // sizing
            )}>
                <TouchableOpacity
                    onPress={() => handleChoice(true)}
                    className={classNames(
                        'justify-center items-center', // position
                        'py-4', // spacing
                        'w-full', // sizing
                        'bg-yellow rounded-3xl', // styling
                    )}>
                    <Text className='text-white font-bold text-xl'>Post image and collect sips</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleChoice(false)}
                    className={classNames(
                        'justify-center items-center', // position
                        'py-4', // spacing
                        'w-full', // sizing
                        'bg-secondary rounded-3xl', // styling
                    )}>
                    <Text className='text-white font-bold text-xl'>Continue without sips</Text>
                </TouchableOpacity>
            </View>
        </>
    }
}
