import { View, Text, Image } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import { styles } from '../../constants'
import { formatDate } from '../../utils/formDate'
import TagCard from '../layout/TagCard'
import getProfilePicture from '../../utils/accountFetcher'

export default function ProfileCard({ friend }) {
    const tags = [formatDate(friend), "1000" + " sips"]

    return (
        <View className={classNames(
            'absolute z-20 justify-center items-center bottom-0',
            'w-full h-3/5',
            'bg-primary rounded-t-[40px]'
        )}>
            {/* Profile Image*/}
            <Image
                source={{ uri: `http://85.215.71.124/static/${getProfilePicture(friend)}` }}
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

            {/* Profile Tags*/}
            <View className="flex-1 flex-row">
                {
                    tags.map((tag, index) => <TagCard tag={tag} key={index} />)
                }
            </View>
        </View>
    )
}