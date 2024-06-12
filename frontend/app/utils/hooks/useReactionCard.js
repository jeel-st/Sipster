import { useCallback, useContext, useEffect, useState } from "react";
import { addReaction } from "../database/activityFetcher";
import { UserContext } from "../../components/provider/UserProvider";

const useReactionCard = (reaction, activity) => {
    const user = useContext(UserContext)

    const [emoji, setEmoji] = useState(null);
    const [reactionCount, setReactionCount] = useState(0);
    const [hasReacted, setHasReacted] = useState(false);

    useEffect(() => {
        switch (reaction[0]) {
            case 'beer':
                setEmoji('🍻');
                break;
            case 'love':
                setEmoji('😍');
                break;
            case 'barf':
                setEmoji('🤮');
                break;
            case 'party':
                setEmoji('🥳');
                break;
            default:
                return
        }
        setReactionCount(reaction[1].length)

        const hasReacted = reaction[1].some((reactor) => reactor === user.userID);
        setHasReacted(hasReacted);
    }, [reaction])

    const handleReaction = () => {
        if(hasReacted) return
        // Handle reaction
        addReaction(user, activity, reaction[0])
        setReactionCount(reaction[1].length + 1)
        setHasReacted(true)
    }

    return { emoji, handleReaction, reactionCount, hasReacted }
}

export default useReactionCard;