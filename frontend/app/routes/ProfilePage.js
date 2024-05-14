import { Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { ProfileCard, ProfileHeaderButtons } from '../components'
import { useLocalSearchParams } from 'expo-router'
import getProfilePicture from '../utils/database/accountFetcher'
import { NativeBaseProvider } from 'native-base'

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
                    source={{ uri: `http://85.215.71.124/static/profilePictures/${getProfilePicture(friend)}?${new Date().getDate()}` }}
                    style={{ width, height: height * 0.55 }}
                    blurRadius={10} />

                {/* Profile Card */}
                <ProfileCard friend={friend} />

            </SafeAreaView>
        </NativeBaseProvider>
    )
}