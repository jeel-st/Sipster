// Imports
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import Activity from "../../entitys/activity";
import { useUser } from "./useUser";

/*
    Custom hook to handle the game

    @return: object -> the object containing the game data
*/
export function useGame() {
    const [friends, setFriends] = useState([]);
    const [activity, setActivity] = useState(null);
    const [taggedFriends, setTaggedFriends] = useState([]);
    const [isPressed, setIsPressed] = useState(false);

    const game = new useLocalSearchParams();
    const user = useUser();

    /*
        Method to check if a friend is tagged

        @param friend: object -> the friend to check
        @return: boolean -> true if friend is tagged, false otherwise
    */
    const isTagged = (friend) => {
        return taggedFriends.includes(friend);
    }

    /*
        Method to handle tagged friends

        @param friend: object -> the friend to tag
        @return: void
    */
    const handleTaggedFriends = (friend) => {
        if (taggedFriends.includes(friend)) {
            // If friend is already tagged, remove from taggedFriends
            setTaggedFriends(taggedFriends.filter(taggedFriend => taggedFriend !== friend));
        } else {
            // If friend is not tagged, add to taggedFriends
            setTaggedFriends([...taggedFriends, friend]);
        }
    }

    /*
        Method to handle the press

        @return: void
    */
    const handlePress = () => {
        const act = new Activity(game, user, taggedFriends);
        setActivity(act);
        // Toggle the press state
        setIsPressed(!isPressed);
    }

    /*
        UseEffect to update friends when user data is available

        @return: void
    */
    useEffect(() => {
        // Update friends when user data is available
        if (user) {
            // Exclude the first friend (user) from the list
            setFriends(user.friends.filter((friend, index) => index !== 0));
        }
    }, [user]);

    /*
        UseEffect to handle the back press

        @return: void
    */
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

        // Add event listener when component mounts
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Remove event listener when component unmounts
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isPressed]);

    return { user, game, friends, taggedFriends, handleTaggedFriends, isTagged, isPressed, handlePress, activity };
}