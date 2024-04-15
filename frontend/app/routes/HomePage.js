import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { Events, Friends, Games } from '../components'
import { router } from 'expo-router'
import { NativeBaseProvider } from 'native-base'

export default function HomePage({ displayEvent, handleEventSelection, user }) {
    return (
        <NativeBaseProvider>
            <SafeAreaView className={classNames(
                'flex-1',
                'bg-primary',
            )}>
                <View>
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
        </NativeBaseProvider>
    )
}