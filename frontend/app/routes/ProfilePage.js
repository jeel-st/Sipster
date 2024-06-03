import { Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { ProfileCard, ProfileHeaderButtons } from '../components'
import { useLocalSearchParams } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { fetchProfilePicture } from '../utils/database/imageFetcher'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { styles } from '../constants'

const { width, height } = Dimensions.get('window');

export default function ProfilePage() {
    const friend = useLocalSearchParams()
    return (
        <NativeBaseProvider>
            <SafeAreaView className={classNames(
                'flex-1',
                'bg-secondary',
            )}>
                {/* Header Buttons*/}
                <ProfileHeaderButtons friend={friend} />

                {/* Blurred Background */}
                <Image
                    source={{ uri: fetchProfilePicture(friend) }}
                    style={{ width, height: height * 0.55 }}
                    blurRadius={10} />

                {/* Profile Card */}
                <ProfileCard friend={friend} />

            </SafeAreaView>
        </NativeBaseProvider>
    )
}