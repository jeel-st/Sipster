// Imports
import { useCallback, useContext, useEffect, useState } from "react";
import { addReaction, removeReaction } from "../database/activityFetcher";
import { UserContext } from "../../components/provider/UserProvider";
import { activityLog } from "../logger/config";

/*
    Custom hook to handle the home activity card

    @param activity: object -> the activity to handle
    @return: object -> the object containing the hook methods
*/
const useHomeActitivityCard = (activity) => {
    const user = useContext(UserContext)
    const emojis = ['🍻', '😍', '🤮', '🥳']
    const [displayReaction, setDisplayReaction] = useState("");

    /*
        Method to handle the reaction of the user

        @param reaction: array -> the reaction to handle
        @return: void
    */
    const handleReaction = (reaction) => {
        // Check if the user has already reacted with the same reaction
        if (displayReaction[0] === reaction[0]) {
            activityLog.debug("Reaction remove", reaction[0], displayReaction[0])

            // Remove the reaction from the database
            removeReaction(user, activity, reaction[0])
            // Remove the reaction from the display reaction
            reaction[1].pop()

            setDisplayReaction("");
        } else {
            // If the user has not reacted with the same reaction, add the reaction
            activityLog.debug("Reactionadd", reaction[0], displayReaction[0])

            // Add the reaction to the database
            addReaction(user, activity, reaction[0])
            // Add the reaction to the display reaction
            reaction[1].push(user._id)
            // Remove the old reaction from the display reaction
            if (displayReaction) displayReaction[1].pop()

            setDisplayReaction(reaction);
        }
    }

    /*
        UseEffect to set the display reaction when the activity changes

        @return: void
    */
    useEffect(() => {
        // Check if the user has already reacted with a reaction
        for (const [reaction, reactors] of Object.entries(activity.reactions)) {
            if (reactors.some(reactor => reactor === user._id)) {
                // Set the display reaction when the user has already reacted
                setDisplayReaction([reaction, reactors]);
                break;
            }
        }
    }, [activity, user]);

    // Return the hook methods
    return { displayReaction, handleReaction, emojis }
}

export default useHomeActitivityCard;