import { useEffect, useState } from "react";
import { getUser } from "../database/userFetcher";
import { usePathname } from "expo-router";

const useHome = () => {
    const [displayFriend, setDisplayFriend] = useState(0);
    const [user, setUser] = useState(null)

    const path = usePathname()

    // useEffect to fetch user data when page is focused
    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            // Set user data in state
            setUser(userData);
        }
        // Fetch user data only when loading page
        // Preventing fetch user data when leaving the site
        if (path === "/") {
            fetchUser()
        }
    }, [path])

    // Function to handle friend selection
    const handleFriendSelection = (selectedFriend) => {
        if (selectedFriend !== displayFriend) {
            // Update displayFriend state with selected friend
            setDisplayFriend(selectedFriend)
        }
    }

    return {user, displayFriend, handleFriendSelection}
}

export default useHome;
