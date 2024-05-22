import { Text, View } from 'react-native'
import React, { Suspense, lazy } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { classNames } from '../utils';

const loadGameComponent = (game) => {
    switch (game) {
        case 'Bierpong':
            return lazy(() => import('../games/bombparty/BombPartyGame'));
        case 'gameB':
            return lazy(() => import('../games/bombparty/BombPartyGame'));
        case 'gameC':
            return lazy(() => import('../games/bombparty/BombPartyGame'));
        default:
            return () => <Fallback text={"Dieses Game ist uns nicht bekannt"} />;
    }
};

const Fallback = ({text}) => {
    return <View className={classNames(
        'flex-1 justify-center items-center',
    )}>
        <Text className={classNames(
            'text-white font-bold text-2xl tracking-wide text-center'
        )}>{text}</Text>
    </View>;
}

export default function GameFactory() {
    const game = useLocalSearchParams();
    const GameComponent = loadGameComponent(game.name);

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary')}>
            <Suspense fallback={<Fallback text={"Loading..."}/>}>
                <GameComponent />
            </Suspense>
        </SafeAreaView>
    );
}