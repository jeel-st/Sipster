// Import
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/provider/UserProvider";
import { fetchActivity, fetchActivityFromUser } from "../database/activityFetcher";

const useHome = () => {
  const [displayFriend, setDisplayFriend] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [activities, setActivities] = useState(null);
  const [idSet, setIdSet] = useState([]);
  const [displayFriendActivities, setDisplayFriendActivities] = useState([]);

  const user = useContext(UserContext)

  async function fetchActivities(user) {
    newActivities = await fetchActivity(user, [])

    const newIdSet = newActivities.map((content) => obj = { type: content.type, id: content._id });
    setIdSet(newIdSet);
    setActivities(newActivities)
  }

  async function fetchActivitiesFromUser(user) {
    const activities = await fetchActivityFromUser(user)
    setDisplayFriendActivities(activities)
  }

  const loadMoreData = async () => {
    newActivities = await fetchActivity(user, idSet)

    if (!activities) return

    const combinedActivities = activities.concat(newActivities);
    const newIdSet = combinedActivities.map((content) => obj = { type: content.type, id: content._id });
    setIdSet(newIdSet);
    setActivities(combinedActivities);
  };

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
  }, [displayFriend, user, activities]);

  return { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate, activities, displayFriendActivities, loadMoreData }
}

export default useHome;
