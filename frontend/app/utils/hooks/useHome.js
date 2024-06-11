import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/provider/UserProvider";
import { fetchActivity } from "../database/activityFetcher";

const useHome = () => {
  const [displayFriend, setDisplayFriend] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [activities, setActivities] = useState(null);

  const user = useContext(UserContext)

  async function fetchActivities(user) {
    const activities = await fetchActivity(user)
    setActivities(activities)
  }

  useEffect(() => {
    // Fetch activities from database
    fetchActivities(user)
  }, [user])

  // Function to handle friend selection
  const handleFriendSelection = (selectedFriend) => {
    if (selectedFriend !== displayFriend) {
      // Update displayFriend state with selected friend
      setDisplayFriend(selectedFriend)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshDate(new Date());
    await fetchActivities(user);

    setRefreshing(false);
}, []);

  return { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate, activities }
}

export default useHome;
