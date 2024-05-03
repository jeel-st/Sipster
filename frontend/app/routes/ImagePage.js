import { View, Text } from 'react-native'
import React from 'react'
import { classNames } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../constants'
import ImageContainer from '../components/image/ImageContainer'

export default function ImagePage({user, displayFriend, handleFriendSelection}) {
  return (
    <SafeAreaView className={classNames(
        'flex-1',
        'bg-primary',
    )}>
        <View className={classNames(
        'flex-1',
    )}>
            {/* Branding */}
            <View className={styles.spaceText}>
                <Text className={styles.brandingText}>sipster</Text>
            </View>

            {/* Image Container */}
            {user && <ImageContainer user={user} displayFriend={displayFriend} handleFriendSelection={handleFriendSelection}/>}
        </View>
    </SafeAreaView>
  )
}