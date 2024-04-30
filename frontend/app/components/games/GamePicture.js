import { ScrollView, View } from 'react-native'
import { games } from '../../constants'
import GameOverview from './GameOverview'

export default function GamePicture() {
    return (
        <View>
            <ScrollView className="mt-4 px-2">
                {
                    games.map((game, index) => <GameOverview game={game} key={index} />)
                }
                
            </ScrollView>
        </View>
    )
}