import { View, Text, SafeAreaView } from 'react-native'
import { Colors } from '../constants/styles'
import React from 'react'
import Games from '../components/Games'
import Events from '../components/Events'
import Friends from '../components/Friends'

export default function HomePage() {
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.primary }}>
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
                <Games/>

                {/* Events */}
                <View>
                    <Text className="text-white font-bold text-l tracking-widest">events</Text>
                </View>
                <Events/>

                {/* Friends */}
                <View className="mt-5">
                    <Text className="text-white font-bold text-l tracking-widest">friends</Text>
                </View>
                <Friends/>
            </View>
        </SafeAreaView>
    )
}