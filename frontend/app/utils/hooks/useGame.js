import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import Activity from "../../entitys/activity";
import { useUser } from "./useUser";

export function useGame() {
    const game = new useLocalSearchParams();
    const user = useUser();

    const [friends, setFriends] = useState([]);
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        // Update friends when user data is available
        if (user) {
            // Exclude the first friend (user) from the list
            setFriends(user.friends.filter((friend, index) => index !== 0));
        }
    }, [user]);

    const [taggedFriends, setTaggedFriends] = useState([]);

    // Function to check if a friend is tagged
    const isTagged = (friend) => {
        return taggedFriends.includes(friend);
    }

    // Function to handle tagging/un-tagging friends
    const handleTaggedFriends = (friend) => {
        if (taggedFriends.includes(friend)) {
            // If friend is already tagged, remove from taggedFriends
            setTaggedFriends(taggedFriends.filter(taggedFriend => taggedFriend !== friend));
        } else {
            // If friend is not tagged, add to taggedFriends
            setTaggedFriends([...taggedFriends, friend]);
        }
    }

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        const act = new Activity(game, user, taggedFriends);
        setActivity(act);
        // Toggle the press state
        setIsPressed(!isPressed);
    }

    // useEffect to handle hardware back press
    useEffect(() => {
        const onBackPress = () => {
            if (isPressed) {
                // If isPressed, reset the press state and return true
                setIsPressed(false);
                return true;
            }
            // Otherwise, return false
            return false;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Remove event listener when component unmounts
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isPressed]);

    return { user, game, friends, taggedFriends, handleTaggedFriends, isTagged, isPressed, handlePress, activity };
}