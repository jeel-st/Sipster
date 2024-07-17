// Import
import { useEffect, useState } from "react";
import { getUser } from "../database/userFetcher";
import { router } from 'expo-router'
import { usePathname } from "expo-router";

// Custom hook to manage user data and friend selection for displaying images
const useImage = () => {
    const [user, setUser] = useState(null)
    const [displayFriend, setDisplayFriend] = useState(0)
    const [isManualScroll, setIsManualScroll] = useState(false)

    // Get current pathname using custom hook
    const path = usePathname()

    // Function to navigate to FriendsPage
    const navigateToFriendsPage = () => {
        router.navigate({
          pathname: "/routes/FriendsPage"
        });
      };

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
            fetchUser();
        }
    }, [path]);

    // Function to handle friend selection
    const handleFriendSelection = (selectedFriend) => {
        if (selectedFriend !== displayFriend) {
            // Update displayFriend state with selected friend
            setDisplayFriend(selectedFriend)
        }
    };

    // Function to handle scroll event
    const handleScroll = (scrollViewRef, windowWidth) => {
        return (event) => {
            // Get the current scroll position and calculate the index of the friend being displayed
            const offsetX = event.nativeEvent.contentOffset.x
            const friendIndex = Math.round(offsetX / windowWidth)

            if (!isManualScroll && friendIndex !== displayFriend) {
                // Update displayFriend state with friend to be scrolled to
                setDisplayFriend(friendIndex)
            }
        }
    }

    // Function to scroll to a specific friend
    const scrollToFriend = (scrollViewRef, windowWidth) => {
        // Exit if user data is not available on initial loading
        if (!user) return;

        const friendIndex = displayFriend
        const scrollOffset = friendIndex * windowWidth

        // Set manual scroll state to true to avoid scroll conflict with "handleScroll"
        setIsManualScroll(true)

        // Scroll to friend index
        scrollViewRef.current.scrollTo({ x: scrollOffset, animated: true })

        // Reset manual scroll state after 300ms
        const timer = setTimeout(() => {
            setIsManualScroll(false)
        }, 300);

        return () => clearTimeout(timer)
    }

    return { user, displayFriend, handleFriendSelection, handleScroll, scrollToFriend, navigateToFriendsPage }
}

export default useImage;