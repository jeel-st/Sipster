import { Text, View } from 'react-native'
import React, { Suspense, lazy } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { classNames } from '../utils';
import { gameLog } from '../utils/logger/config';

/*
    loadGameComponent is a function that loads the game component based on the game name.
    Typ: Function

    @param game: string -> the game name
    @return:    Component -> returns the game component
*/
const loadGameComponent = (activity) => {
    switch (activity.game.name) {
        case 'Bomb Party':
            gameLog.info('Loading Bomb Party Game')
            return lazy(() => import('../games/bombparty/BombPartyGame'));
        case 'Beer Pong':
            gameLog.info('Loading Beer Pong Game')
            return lazy(() => import('../games/beerpongExtreme/BeerpongExtreme'));
        case 'gameC':
            return lazy(() => import('../games/bombparty/BombPartyGame'));
        default:
            return () => <Fallback text={"Dieses Game ist uns nicht bekannt"} />;
    }
};

/*
    Fallback is a component that displays a text while the game is loading.
    Typ: Component

    @param text: string -> the text to display
    @return:    JSX -> returns the Fallback component
*/
const Fallback = ({ text }) => {
    return <View className={classNames(
        'flex-1 justify-center items-center',
    )}>
        <Text className={classNames(
            'text-white font-bold text-2xl tracking-wide text-center'
        )}>{text}</Text>
    </View>;
}

/*
    GameFactory is a page that displays the game and allows the user to play it.
    Typ: Page/route

    @return: JSX -> returns the GameFactory component
*/
export default function GameFactory() {
    const activity = JSON.parse(useLocalSearchParams().activity);
    const GameComponent = loadGameComponent(activity);

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary')}>
            <Suspense fallback={<Fallback text={"Loading..."} />}>
                <GameComponent activity={activity} />
            </Suspense>
        </SafeAreaView>
    );
}