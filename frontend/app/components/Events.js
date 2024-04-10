import { ScrollView } from 'react-native'
import { useEvents } from '../utils/eventsFetcher';
import EventCard from './EventCard'

export default function Events({ onSelectEvent, selectedEvent }) {
    const handleEventClick = (event) => {
        onSelectEvent(event);
    };
    const events = useEvents();

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