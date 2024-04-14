import { Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { Friends, ProfileCard, ProfileHeaderButtons } from '../components'
import { styles } from '../constants'
import { useLocalSearchParams } from 'expo-router'

const { width, height } = Dimensions.get('window');

export default function ProfilePage() {
    const friend = useLocalSearchParams()

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-secondary',
        )}>
            {/* Header Buttons*/}
            <ProfileHeaderButtons />

            {/* Blurred Background */}
            <Image
                source={{ uri: styles.uri }}
                style={{ width, height: height * 0.55 }}
                blurRadius={10} />

            {/* Profile Card */}
            <ProfileCard friend={friend} />

        </SafeAreaView>
    )
}