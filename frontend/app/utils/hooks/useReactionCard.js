import { useCallback, useContext, useEffect, useState } from "react";
import { addReaction, removeReaction } from "../database/activityFetcher";
import { UserContext } from "../../components/provider/UserProvider";

const useReactionCard = (reaction, activity) => {
    const user = useContext(UserContext)

    const [emoji, setEmoji] = useState(null);
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

        const hasReacted = reaction[1].some((reactor) => reactor === user.userID);
        setHasReacted(hasReacted);
    }, [reaction])

    const handleReaction = () => {
        if(!hasReacted) {
        addReaction(user, activity, reaction[0])
        reaction[1].length += 1
        setHasReacted(true)
        } else {
            removeReaction(user, activity, reaction[0])
            reaction[1].length -= 1
            setHasReacted(false)
        }

    }

    return { emoji, handleReaction, hasReacted }
}

export default useReactionCard;