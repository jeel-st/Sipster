import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { Games, Friends, Events } from '../components'
import { styles } from '../constants'
import React from 'react'
import { useEventDisplay } from '../utils';

export default function HomePage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();

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
                <View className={styles.spaceText}>
                    <Text className={styles.categoryText}>friends</Text>
                </View>
                <Friends />
            </View>
        </SafeAreaView>
    )
}