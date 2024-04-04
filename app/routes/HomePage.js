import { View, Text, SafeAreaView } from 'react-native'
import { Games, Friends, Events } from '../components'
import { styles } from '../constants'
import React from 'react'

export default function HomePage() {
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="mx-6">
                {/* Handy Header */}
                <View className="h-12">
                </View>

                {/* Branding */}
                <View className="mt-5">
                    <Text className="text-white font-bold text-2xl tracking-widest">sipster</Text>
                </View>

                {/* Games */}
                <View className="mt-5">
                    <Text className="text-white font-bold text-l tracking-widest">games</Text>
                </View>
                <Games />

                {/* Events */}
                <View>
                    <Text className="text-white font-bold text-l tracking-widest">events</Text>
                </View>
                <Events />

                {/* Friends */}
                <View className="mt-5">
                    <Text className="text-white font-bold text-l tracking-widest">friends</Text>
                </View>
                <Friends />
            </View>
        </SafeAreaView>
    )
}