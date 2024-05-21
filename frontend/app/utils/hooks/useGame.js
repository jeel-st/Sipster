import { useLocalSearchParams } from "expo-router";
import useUser from "../database/userFetcher";
import { useEffect, useState } from "react";


export function useGame() {
    const game = useLocalSearchParams();
    const user = useUser()

    const [friends, setFriends] = useState([])

    useEffect(() => {
        if (user) {
            setFriends(user.friends.filter((friend, index) => index !== 0));
        }
    }, [user])

    const [taggedFriends, setTaggedFriends] = useState([])

    const isTagged = (friend) => {
        return taggedFriends.includes(friend)
    }

    const handleTaggedFriends = (friend) => {
        if (taggedFriends.includes(friend)) {
            setTaggedFriends(taggedFriends.filter(taggedFriend => taggedFriend !== friend));
        } else {
            setTaggedFriends([...taggedFriends, friend]);
        }
    }

    const [isPressed, setIsPressed] = useState(false)

    const handlePress = () => {
        setIsPressed(!isPressed)
    }

    return { user, game, friends, handleTaggedFriends, isTagged, isPressed, handlePress }
}