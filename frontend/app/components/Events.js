import { ScrollView } from 'react-native'
import { events } from '../constants'
import EventCard from './EventCard'
import React from 'react'
import PropTypes from 'prop-types';

export default function Events({ onSelectEvent, selectedEvent }) {
    const handleEventClick = (event) => {
        onSelectEvent(event);
    };

    return (
        <ScrollView className="mt-4 max-h-56" showsVerticalScrollIndicator={false}>
            {
                events.map((event, index) => <EventCard
                    event={event}
                    key={index}
                    onClick={() => handleEventClick(event)}
                    isSelected={selectedEvent === event} />)
            }
        </ScrollView>
    )
}

Events.propTypes = {
    onSelectEvent: PropTypes.func.isRequired,
    selectedEvent: PropTypes.object.isRequired,
};