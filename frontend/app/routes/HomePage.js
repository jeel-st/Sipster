import { View, Text, SafeAreaView, StatusBar, Pressable } from 'react-native'
import { Games, Friends, Events } from '../components'
import { styles } from '../constants'
import { useEventDisplay } from '../utils';
import { router } from 'expo-router'
import useUser from '../utils/userFetcher';
import React from 'react'

export default function HomePage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();
    const user = useUser();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="">
                {/* Handy Header */}
                <View style={{ height: StatusBar.currentHeight }} />

                {/* Branding */}
                <View className={styles.spaceText}>
                    <Text className={styles.brandingText}>sipster</Text>
                </View>

                {/* Games */}
                <View className={styles.spaceText}>
                    <Text className={styles.categoryText}>games</Text>
                </View>
                <Games />

                {/* Events */}
                <View className={styles.spaceText}>
                    <Text className={styles.categoryText}>events</Text>
                </View>
                <Events onSelectEvent={handleEventSelection} selectedEvent={displayEvent} />

                {/* Friends */}
                <Pressable className={styles.spaceText}
                    onPress={() => router.navigate({
                        pathname: "/routes/FriendsPage"
                    })}>
                    <Text className={styles.categoryText}>friends</Text>
                </Pressable>
                {
                    user && (<Friends friends={user.friends} />)
                }

            </View>
        </SafeAreaView>
    )
}