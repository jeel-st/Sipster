import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import { Events, EventInfoCard, SipsterButton } from '../components';
import { styles } from '../constants';
import React from 'react';
import { useEventDisplay } from '../utils';
import { navBarColor } from '../utils/navBarColor';

/*
    EventPage is a page that displays the event information and allows the user to save events and view more details.
    Typ: Page/route

    @return: JSX -> returns the EventPage component
*/
export default function EventPage() {
    const { displayEvent, handleEventSelection } = useEventDisplay();

    navBarColor(styles.Colors.secondary)

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: styles.Colors.primary }}>
            <View>
                {/* Header */}
                <View style={{ height: StatusBar.currentHeight }} />

                {/* Branding */}
                <View className={styles.spaceText}>
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../assets/images/logo-small.png')} />
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