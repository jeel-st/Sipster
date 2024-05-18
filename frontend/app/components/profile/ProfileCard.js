import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { classNames } from '../../utils'
import { formatDate } from '../../utils/formDate'
import TagCard from '../layout/TagCard'
import useUser from '../../utils/database/userFetcher'
import { fetchFriendsInvitations } from '../../utils/database/friendsFetcher'
import { fetchProfilePicture } from '../../utils/database/imageFetcher'

export default function ProfileCard({ friend }) {
    const tags = [formatDate(friend), "1000" + " sips"]
    const [isFriend, setIsFriend] = useState(false)
    const [isInvited, setIsInvited] = useState(false)

    const user = useUser();

    const handleIsFriend = async () => {
        const isfriend = user.friends.find((elemenent) => elemenent.username == friend.username)
        const invites = await fetchFriendsInvitations(user.username)
        inviteReceived = invites[0].find((elemenent) => elemenent.username == friend.username)
        sentReceived = invites[1].find((elemenent) => elemenent.username == friend.username)
        if (isfriend) {
            setIsFriend(true)
        } else if (inviteReceived || sentReceived) {
            setIsInvited(true)
        } else {
            setIsFriend(false)
            setIsInvited(false)
        }
    }

    useEffect(() => {
        if (user) {
            handleIsFriend();
        }
    }, [user]);

    return (
        <View className={classNames(
            'absolute z-20 justify-center items-center bottom-0',
            'w-full h-3/5',
            'bg-primary rounded-t-[40px]'
        )}>
            {/* Profile Image*/}
            <Image
                source={{ uri: fetchProfilePicture(friend) }}
                className={classNames(
                    'mt-[-22.5%]',
                    'w-44 h-44 rounded-full'
                )} />

            {/* Profile Fullname Text*/}
            <Text className={classNames(
                'text-white font-bold text-2xl'
            )}>
                {friend.firstName + " " + friend.lastName}
            </Text>

            {/* Profile Username*/}
            <Text className={classNames(
                'text-neutral-400 font-semibold'
            )}>
                @{friend.username}
            </Text>

            { user && isInvited && <Text className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mt-2">Pending</Text> }
            { user && isFriend && <Text className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-2">Friend</Text>}
            { user && !isInvited && !isFriend && <Text className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 mt-2">Not Friend</Text>}

            {/* Profile Tags*/}
            <View className="flex-1 flex-row">
                {
                    tags.map((tag, index) => <TagCard tag={tag} key={index} />)
                }
            </View>
        </View>
    )
}