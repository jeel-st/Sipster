import { useState } from 'react';
import { events } from '../constants';

export function useEventDisplay() {
    const [displayEvent, setDisplayEvent] = useState(events[0]);

    const handleEventSelection = (selectedEvent) => {
        if (selectedEvent !== displayEvent) {
            setDisplayEvent(selectedEvent);
        }
    };

    return { displayEvent, handleEventSelection }
}
