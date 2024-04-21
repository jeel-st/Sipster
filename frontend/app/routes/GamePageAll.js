import { ScrollView,SafeAreaView } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { GameOverview } from '../components';

export default function GamePageAll(){
    const game = useLocalSearchParams();

    return (
        <SafeAreaView>
            <GameOverview />
        </SafeAreaView>
    )
}