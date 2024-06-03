import { View, Text, Image } from 'react-native'
import { classNames } from '../../utils'
import { formatDate } from '../../utils/formDate'
import TagCard from '../layout/TagCard'
import useUser from '../../utils/database/userFetcher'
import { fetchProfilePicture } from '../../utils/database/imageFetcher'

/*
    ProfileCard is a component that represents the profile card of a friend.
    It displays the profile picture, the name, the username, and some tags.
    Typ: Component from profile

    @param friend: object -> the friend to display
    @return:       JSX -> returns the ProfileCard component
*/
export default function ProfileCard({ friend }) {
    const tags = [formatDate(friend), "1000" + " sips"]

    return (
        <View className={classNames(
            'absolute z-20 justify-center items-center bottom-0', // position
            'w-full h-3/5', // sizing
            'bg-primary rounded-t-[40px]' // styling
        )}>
            {/* Profile Image*/}
            <Image
                source={{ uri: fetchProfilePicture(friend) }}
                className={classNames(
                    'mt-[-22.5%]', // position
                    'w-44 h-44 rounded-full' // sizing
                )} />

            {/* Profile Fullname Text*/}
            <Text className='text-white font-bold text-2xl'  > {friend.firstName + " " + friend.lastName} </Text>

            {/* Profile Username*/}
            <Text className='text-neutral-400 font-semibold' > @{friend.username} </Text>

            {/* Profile Tags*/}
            <View className="flex-1 flex-row">
                {
                    tags.map((tag, index) =>
                        <TagCard
                            tag={tag}
                            key={index}
                        />
                    )
                }
            </View>
        </View>
    )
}