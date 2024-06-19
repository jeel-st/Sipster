import { useCallback, useContext, useEffect, useState } from "react";
import { addReaction, removeReaction } from "../database/activityFetcher";
import { UserContext } from "../../components/provider/UserProvider";
import { activityLog } from "../logger/config";

const useHomeActitivityCard = (activity) => {
    const user = useContext(UserContext)
    const emojis = ['🍻', '😍', '🤮', '🥳']
    const [displayReaction, setDisplayReaction] = useState("");

    useEffect(() => {
        for (const [reaction, reactors] of Object.entries(activity.reactions)) {
            if (reactors.some(reactor => reactor === user._id)) {
                setDisplayReaction([reaction, reactors]);
                break;
            }
        }
    }, [activity.reactions, user._id]);

    const handleReaction = (reaction) => {
        if (displayReaction[0] === reaction[0]) {
            activityLog.debug("Reaction remove", reaction[0], displayReaction[0])
            removeReaction(user, activity, reaction[0])
            reaction[1].pop()
            setDisplayReaction("");
        } else {
            activityLog.debug("Reactionadd", reaction[0], displayReaction[0])
            addReaction(user, activity, reaction[0])
            reaction[1].push(user._id)
            if (displayReaction) displayReaction[1].pop()
            setDisplayReaction(reaction);
        }
    }

    return { displayReaction, handleReaction, emojis }
}

export default useHomeActitivityCard;