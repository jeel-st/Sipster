import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/provider/UserProvider";
import { fetchActivity, fetchActivityFromUser } from "../database/activityFetcher";

const useHome = () => {
  const [displayFriend, setDisplayFriend] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [activities, setActivities] = useState(null);
  const [displayFriendActivities, setDisplayFriendActivities] = useState([]);

  const user = useContext(UserContext)

  async function fetchActivities(user) {
    const activities = await fetchActivity(user)
    setActivities(activities);
  }

  async function fetchActivitiesFromUser(user) {
    const activities = await fetchActivityFromUser(user)
    setDisplayFriendActivities(activities)
  }

  // Function to handle friend selection
  const handleFriendSelection = (selectedFriend) => {
    if (selectedFriend !== displayFriend) {
      // Update displayFriend state with selected friend
      setDisplayFriend(selectedFriend);
    }
  };

  useEffect(() => {
    // Fetch activities from database
    fetchActivities(user)
  }, [user])

  // Fetch activities whenever displayFriend changes
  useEffect(() => {
    if (displayFriend !== 0) {
      fetchActivitiesFromUser(user.friends[displayFriend]);
    }
  }, [displayFriend]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshDate(new Date());

    if (displayFriend === 0) {
      await fetchActivities(user);
    } else {
      await fetchActivitiesFromUser(user.friends[displayFriend]);
    }

    setRefreshing(false);
  }, [displayFriend, user]);

  return { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate, activities, displayFriendActivities }
}

export default useHome;
