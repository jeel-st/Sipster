// Imports
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/provider/UserProvider";
import { fetchActivity, fetchActivityFromUser } from "../database/activityFetcher";

/*
    Custom hook to handle the home screen

    @return: object -> the object containing the home data
*/
const useHome = () => {
  const [displayFriend, setDisplayFriend] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [activities, setActivities] = useState(null);
  const [idSet, setIdSet] = useState([]);
  const [displayFriendActivities, setDisplayFriendActivities] = useState([]);

  const user = useContext(UserContext)

  /*
      Method to fetch activities when opening the home screen or refreshing

      @param user: object -> the user object
      @param idSet: array -> the id set
      @return: array -> the array containing the activities
  */
  async function fetchActivities(user) {
    newActivities = await fetchActivity(user, [])

    // safe the id and type of the activities in the idSet to sent it back to the backend when loading more data
    const newIdSet = newActivities.map((content) => obj = { type: content.type, id: content._id });
    setIdSet(newIdSet);
    setActivities(newActivities)
  }

  /*
      Method to fetch activities from a specific user

      @param user: object -> the user object
      @return: array -> the array containing the activities
  */
  async function fetchActivitiesFromUser(user) {
    const activities = await fetchActivityFromUser(user)
    setDisplayFriendActivities(activities)
  }

  /*
      Method to load more data when scrolling to the bottom

      @return: void
  */
  const loadMoreData = async () => {
    newActivities = await fetchActivity(user, idSet)

    if (!activities) return

    // add the new activities to the existing activities at the end
    const combinedActivities = activities.concat(newActivities);
    // safe the id and type of the activities in the idSet to sent it back to the backend when loading more data
    const newIdSet = combinedActivities.map((content) => obj = { type: content.type, id: content._id });
    setIdSet(newIdSet);
    setActivities(combinedActivities);
  };

  /*
      Method to handle the friend selection

      @param selectedFriend: object -> the selected friend
      @return: void
  */
  const handleFriendSelection = (selectedFriend) => {
    if (selectedFriend !== displayFriend) {
      // Update displayFriend state with selected friend
      setDisplayFriend(selectedFriend);
    }
  };

  /*
      UseEffect to fetch activities from database when user changes

      @return: void
  */
  useEffect(() => {
    // Fetch activities from database
    fetchActivities(user)
  }, [user])

  /*
      UseEffect to fetch activities from a specific user when displayFriend changes

      @return: void
  */
  useEffect(() => {
    if (displayFriend !== 0) {
      fetchActivitiesFromUser(user.friends[displayFriend]);
    }
  }, [displayFriend]);

  /*
      UseCallback to handle the refresh the home screen

      @return: void
  */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshDate(new Date());

    // if first friend is selected, fetch all recommendet activities from database
    // else fetch all activities from selected friend
    if (displayFriend === 0) {
      await fetchActivities(user);
    } else {
      await fetchActivitiesFromUser(user.friends[displayFriend]);
    }

    setRefreshing(false);
  }, [displayFriend, user, activities]);

  // Return state variables and functions for use in the component
  return { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate, activities, displayFriendActivities, loadMoreData }
}

export default useHome;