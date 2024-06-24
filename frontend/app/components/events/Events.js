import React from 'react'
import { ScrollView } from 'react-native'
import { useEvents } from '../../utils/database/eventsFetcher';
import EventBtn from './EventBtn';

/*
    Events is a component that represents the list of events.
    It displays a list of events and allows the user to select one.
    Typ: Component from events

    @param onSelectEvent:   function -> the function to call when an event is selected
    @param selectedEvent:   object -> the selected event
    @return:                JSX -> returns the Events component
*/
export default function Events({ onSelectEvent, selectedEvent }) {
    const handleEventClick = (event) => {
        onSelectEvent(event);
    };
    const events = useEvents();

    return (
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
    )
}