// Imports
import { useState } from 'react';
import { events } from '../../constants';

/*
    Custom hook to handle the event display

    @return: object -> the object containing the display event and the handle event selection method
*/
export function useEventDisplay() {
    const [displayEvent, setDisplayEvent] = useState(events[0]);

    /*
        Method to handle the event selection

        @param selectedEvent: string -> the selected event
        @return: void
    */
    const handleEventSelection = (selectedEvent) => {
        // Update the displayed event only if the selected event is different from the current one
        if (selectedEvent !== displayEvent) {
            setDisplayEvent(selectedEvent);
        }
    };

    // Return the hook methods
    return { displayEvent, handleEventSelection }
}
