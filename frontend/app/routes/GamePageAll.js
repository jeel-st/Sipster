import { View, Text, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GameOverview } from '../components';
import { classNames } from '../utils'
import { styles } from '../constants'

export default function GamePageAll(){

    return (
        <SafeAreaView className={classNames('felx-1', 'bg-primary')}>
            
            <View>
                <Text className={styles.brandingText}>Games</Text>
            </View>

            <GameOverview />

        </SafeAreaView>
    )
}