import { Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { ProfileCard, ProfileHeaderButtons } from '../components'
import { useLocalSearchParams } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { fetchProfilePicture } from '../utils/database/imageFetcher'

/*
    ProfilePage is a page that displays the profile of a friend.
    Typ: Page/route

    @return: JSX -> returns the ProfilePage component
*/
export default function ProfilePage() {
    const friend = useLocalSearchParams()
    const { width, height } = Dimensions.get('window');

    return (
        <NativeBaseProvider>
            <SafeAreaView className={classNames(
                'flex-1', // position
                'bg-secondary', // styling
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