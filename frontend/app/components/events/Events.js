import { ScrollView } from 'react-native'
import { useEvents } from '../../utils/database/eventsFetcher';
import React from 'react'
import PropTypes from 'prop-types'
import { styles } from '../../constants'
import EventBtn from './EventBtn';

export default function Events({ onSelectEvent, selectedEvent }) {
    const handleEventClick = (event) => {
        onSelectEvent(event);
    };
    const events = useEvents();

    return (
        <ScrollView className="mt-4 max-h-48" showsVerticalScrollIndicator={false} style={{ backgroundColor: styles.Colors.primary }}>
            {
                events.map((event, index) => <EventBtn
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