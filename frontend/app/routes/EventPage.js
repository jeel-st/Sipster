import { View, Text, SafeAreaView } from 'react-native';
import { Events, EventInfoCard } from '../components';
import { styles } from '../constants';
import React from 'react';
import { useEventDisplay } from '../utils';

export default function EventPage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View className="">
                {/* Header */}
                <View className="h-12 mx-6">
                </View>

                {/* Branding */}
                <View className="mt-5 mx-6">
                    <Text className={styles.brandingText}>sipster</Text>
                </View>

                {/* Event Info */}
                <EventInfoCard event={displayEvent} />

                {/* Events */}
                <View className="mt-5 mx-6">
                    <Text className={styles.categoryText}>events</Text>
                </View>
                <Events onSelectEvent={handleEventSelection} selectedEvent={displayEvent}/>

                {/* Button? */}
                <View className="h-12 mt-5 rounded-xl shadow-md shadow-white mx-20 items-center justify-center" style={{ backgroundColor: styles.Colors.yellow }}>
                    <Text className="font-bold text-l tracking-widest">save the date {'>>'}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}