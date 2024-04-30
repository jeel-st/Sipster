import { View, Text, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamePicture, Category } from '../components'
import { classNames } from '../utils'
import { styles} from '../constants'

export default function GamePageAll(){

    return (
        <SafeAreaView className={classNames('bg-primary')}>
            {/* Header */}
            <View>
                <Text className={`${styles.brandingText} mt-4 px-2`} >Games</Text>
            </View>

            {/* Category */}
            <View>
                <Text className={`${styles.categoryText } mt-4 px-2`}>Kategorie</Text>
            </View>
            <Category/>
            
            {/* Alle Games */}
            <GamePicture />

        </SafeAreaView>
    )
}