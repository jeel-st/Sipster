import { View, Text, SafeAreaView } from 'react-native'
import { Games, Friends, Events } from '../components'
import { styles, events } from '../constants'
import React, { useState } from 'react'
import { useEventDisplay } from '../utils';

export default function HomePage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="">
                {/* Handy Header */}
                <View className="h-12 mx-6">
                </View>

                {/* Branding */}
                <View className="mt-5 mx-6">
                    <Text className="text-white font-bold text-2xl tracking-widest">sipster</Text>
                </View>

                {/* Games */}
                <View className="mt-5 mx-6">
                    <Text className="text-white font-bold text-l tracking-widest">games</Text>
                </View>
                <Games />

                {/* Events */}
                <View>
                    <Text className="mx-6 text-white font-bold text-l tracking-widest">events</Text>
                </View>
                <Events onSelectEvent={handleEventSelection} selectedEvent={displayEvent}/>

                {/* Friends */}
                <View className="mt-5 mx-6">
                    <Text className="text-white font-bold text-l tracking-widest">friends</Text>
                </View>
                <Friends />
            </View>
        </SafeAreaView>
    )
}