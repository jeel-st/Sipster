import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { Events, FriendsScrollView, Games } from '../components'
import { router } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import FriendsSkeleton from '../components/skeletons/FriendsSkeleton';

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
                        <Image source={require('../../assets/images/logo-small.png')} />
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
                        user && user.friends.length > 0 && (<FriendsScrollView friends={user.friends} user={user} />)
                    }
                    {
                        user && user.friends.length == 0 && FriendsSkeleton()
                    }
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}