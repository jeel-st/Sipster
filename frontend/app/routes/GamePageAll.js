import { ScrollView,SafeAreaView } from 'react-native'
import GameOverview from '../components/GameOverview';
import { router, useLocalSearchParams } from 'expo-router'

export default function GamePageAll(){
    const game = useLocalSearchParams();

    return (
        <SafeAreaView>
            <GameOverview />
        </SafeAreaView>
    )
}