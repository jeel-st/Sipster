import { View, Text, SafeAreaView } from 'react-native'
import { Games, Friends, Events } from '../components'
import { styles } from '../constants'
import React from 'react'

export default function EventPage() {
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="mx-6">
                {/* Header */}
                <View className="h-12">
                </View>

                {/* Branding */}
                <View className="mt-5">
                    <Text className={styles.categoryText}>sipster</Text>
                </View>

                {/* Friends */}
                <View className="mt-5">
                    <Text className={styles.categoryText}>friends</Text>
                </View>
                <Friends />

                {/* Games */}
                <View className="mt-5">
                    <Text className={styles.categoryText}>games</Text>
                </View>
                <Games />

                {/* Events */}
                <View>
                    <Text className={styles.categoryText}>events</Text>
                </View>
                <Events />
            </View>
        </SafeAreaView>
    )
}