import { useEffect, useState } from "react";
import useUser, { getUser } from "../userFetcher";
import { events } from "../../constants";
import { usePathname } from "expo-router";

const useHome = () => {
    const [displayEvent, setDisplayEvent] = useState(events[0]);
    const [user, setUser] = useState(null)

    const handleEventSelection = (selectedEvent) => {
        if (selectedEvent !== displayEvent) {
            setDisplayEvent(selectedEvent);
        }
    };

    const path = usePathname()

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            setUser(userData);
        }
        if(path === "/"){
            fetchUser();
        }
    }, [path]);

    return {displayEvent, handleEventSelection, user}
}

export default useHome;
