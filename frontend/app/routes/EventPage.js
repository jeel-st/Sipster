import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Events, EventInfoCard, SipsterButton } from '../components';
import { styles } from '../constants';
import React from 'react';
import { useEventDisplay } from '../utils';

export default function EventPage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View>
                {/* Header */}
                <View style={{ height: StatusBar.currentHeight }} />

                {/* Branding */}
                <View className={styles.spaceText}>
                    <Text className={styles.brandingText}>sipster</Text>
                </View>

                {/* Event Info */}
                <EventInfoCard event={displayEvent} />

                {/* Events */}
                <View className={styles.spaceText}>
                    <Text className={styles.categoryText}>events</Text>
                </View>
                <Events onSelectEvent={handleEventSelection} selectedEvent={displayEvent} />

                {/* Button */}
                <View className="items-center">
                    <SipsterButton title="save the date >>" />
                </View>
            </View>
        </SafeAreaView>
    )
}