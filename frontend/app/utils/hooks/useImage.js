import { useEffect, useRef, useState } from "react";
import { getUser } from "../userFetcher";
import { events, friends } from "../../constants";
import { usePathname } from "expo-router";

const useImage = () => {
    const [user, setUser] = useState(null)
    const [displayFriend, setDisplayFriend] = useState(0)

    const path = usePathname()

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            setUser(userData);
        }
        if (path === "/") {
            fetchUser();
        }
    }, [path]);

    const handleFriendSelection = (selectedFriend) => {
        if (selectedFriend !== displayFriend) {
            setDisplayFriend(selectedFriend);
        }
    };

    return { user, displayFriend, handleFriendSelection }
}

export default useImage;