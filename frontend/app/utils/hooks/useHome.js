import { useState } from "react";
import useUser from "../userFetcher";
import { events } from "../../constants";

const useHome = () => {
    const [displayEvent, setDisplayEvent] = useState(events[0]);

    const handleEventSelection = (selectedEvent) => {
        if (selectedEvent !== displayEvent) {
            setDisplayEvent(selectedEvent);
        }
    };

    const user = useUser();

    return {displayEvent, handleEventSelection, user}
}

export default useHome;
