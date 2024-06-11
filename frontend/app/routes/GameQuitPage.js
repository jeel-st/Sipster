import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import classNames from '../games/beerpongExtreme/utils/classNames'
import useGameQuit from '../utils/hooks/useGameQuit';
import { useLocalSearchParams } from 'expo-router';
import GameAcitvityCam from '../components/games/GameAcitvityCam';

export default function GameQuitPage() {
    const activity = JSON.parse(useLocalSearchParams().activity);

    console.log(activity)

    const cameraRef = useRef(null);
    const { handlePress } = useGameQuit(activity);

    return (activity &&
        <View className={classNames(
            'justify-center items-center', // position
            'space-y-4', // spacing
            'w-full h-full', // sizing
            'bg-primary' // styling
        )}>
            <GameAcitvityCam
                activity={activity}
                handlePress={handlePress}
                cameraRef={cameraRef}
            />
        </View>
    )
}