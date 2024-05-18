import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../components/provider/UserProvider";

const useHome = () => {
    const [displayFriend, setDisplayFriend] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshDate, setRefreshDate] = useState(new Date());

    const user = useContext(UserContext)

    // Function to handle friend selection
    const handleFriendSelection = (selectedFriend) => {
        if (selectedFriend !== displayFriend) {
            // Update displayFriend state with selected friend
            setDisplayFriend(selectedFriend)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshDate(new Date());
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    return {user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate}
}

export default useHome;
