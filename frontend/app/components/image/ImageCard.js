import { View, Text, Image } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import getProfilePicture from '../../utils/accountFetcher'
import { formatDate } from '../../utils/formDate'

export default function ImageCard({ friend }) {
    return (
        <View className={classNames(
            'pt-4 pb-2 mb-2 space-y-2',
            'rounded-2xl bg-secondary border-purple border-2'
        )}>
            <View className={classNames(
                'px-6 space-x-2',
                'h-12',
                'flex-row'
            )}>
                <View className={classNames(
                    'w-12 h-12',
                    'rounded-full shadow-md shadow-black'
                )}>
                    <Image
                        className={classNames(
                            'w-full h-full',
                            'rounded-full'
                        )}
                        source={{
                            uri: `http://85.215.71.124/static/profilePictures/compressed/${getProfilePicture(friend)}?${new Date().getDate()}`
                        }} />
                </View>
                <View>
                    <Text className={classNames(
                        'text-white font-bold'
                    )}>{friend.username}</Text>
                    <Text className={classNames(
                        'text-neutral-400 font-thin'
                    )}>{formatDate(friend)}</Text>
                </View>
            </View>
            <View className={classNames(
                'mx-6',
                'h-[500px]',
                'rounded-2xl border-purple border-2 shadow-md shadow-black'
            )}>
                <Image
                    className={classNames(
                        'h-full',
                        'rounded-2xl'
                    )}
                    source={{
                        uri: `http://85.215.71.124/static/profilePictures/${getProfilePicture(friend)}?${new Date().getDate()}`
                    }} />
            </View>
        </View>
    )
}