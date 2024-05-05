// imports
import { View } from 'react-native'
import { styles } from '../constants'

// Component um den Username zu ändern
export default function changeUsername() {
    return (
        <View classname="flex-1 items-center">
            <Text className={styles.categoryText}>type in your new username:</Text>

            <TextField placeholder="username" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
        </View>
    )

}