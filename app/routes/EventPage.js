import { View, Text, SafeAreaView } from 'react-native'
import { Events, EventInfoCard } from '../components'
import { styles, events } from '../constants'
import React, { useState } from 'react'

export default function EventPage() {
    const [displayEvent, setDisplayEvent] = useState(events[0]);

    const handleEventSelection = (selectedEvent) => {
        if (selectedEvent !== displayEvent) {
            setDisplayEvent(selectedEvent);
        }
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="mx-6">
                {/* Header */}
                <View className="h-12">
                </View>

                {/* Branding */}
                <View className="mt-5">
                    <Text className={styles.brandingText}>sipster</Text>
                </View>

                {/* Event Info */}
                <EventInfoCard event={displayEvent} />

                {/* Events */}
                <View className="mt-5">
                    <Text className={styles.categoryText}>events</Text>
                </View>
                <Events onSelectEvent={handleEventSelection} selectedEvent={displayEvent}/>

                {/* Button? */}
                <View className="h-12 mt-5 rounded-xl shadow-xl shadow-black mx-20 items-center justify-center" style={{ backgroundColor: styles.Colors.yellow }}>
                    <Text className="font-bold text-l tracking-widest">save the date {'>>'}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}