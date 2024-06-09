// imports
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { useSavedEvents } from '../../utils/database/eventsFetcher';
import EventBtn from './EventBtn';

/*
    SavedEvents is a component that represents the list of events that the user has saved.
    It displays a list of the saved events and allows the user to select one.
    Typ: Component from events

    @param onSelectEvent:   function -> the function to call when an event is selected
    @param selectedEvent:   object -> the selected event
    @return:                JSX -> returns the SavedEvents component
*/
export default function SavedEvents({ onSelectEvent, selectedEvent }) {
    const handleEventClick = (event) => {
        onSelectEvent(event);
    };
    const events = useSavedEvents();

    // This component is only rendered if events are also saved
    if (!Array.isArray(events) || events.length === 0) {
        return null; 
    }

    return (
        <View>
            <View className={styles.spaceText}>
                <Text className={styles.categoryText}>saved events</Text>
            </View>
            <ScrollView
                className="mt-4 max-h-48 bg-primary"
                showsVerticalScrollIndicator={false}>
                {
                    events.map((event, index) =>
                        <EventBtn
                            event={event}
                            key={index}
                            onClick={() => handleEventClick(event)}
                            isSelected={selectedEvent === event}
                        />)
                }
            </ScrollView>
        </View>
    )
}