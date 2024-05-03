import { View, Text, Image } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import getProfilePicture from '../../utils/accountFetcher'
import { formatDate } from '../../utils/formDate'

export default function ImageCard2({ friend }) {
    return (
        <View className={classNames(
            'mx-0.5 mb-4 mt-2 space-y-2',
            'h-[600px]',
            'rounded-2xl bg-secondary border-purple border-4'
        )}>
            {/* Friend Acivity Image */}
            <Image
                className={classNames(
                    'h-full',
                    'rounded-2xl'
                )}
                source={{
                    uri: `http://85.215.71.124/static/${getProfilePicture(friend)}`,
                    key: new Date()
                }} />

            {/* Username and Date */}
            <View className={classNames(
                'absolute z-20',
                'px-2 space-x-2',
                'h-12',
                'flex-row'
            )}>
                <View className={classNames(
                    'w-12 h-12',
                    'rounded-full shadow-md shadow-black border-purple border-2'
                )}>
                    <Image
                        className={classNames(
                            'w-full h-full',
                            'rounded-full'
                        )}
                        source={{
                            uri: `http://85.215.71.124/static/${getProfilePicture(friend)}`,
                            key: new Date()
                        }} />
                </View>
                <View>
                    <Text className={classNames(
                        'text-white font-bold'
                    )}>{friend.username}</Text>
                    <Text className={classNames(
                        'text-neutral-300 font-semibold'
                    )}>{formatDate(friend)}</Text>
                </View>
            </View>

            {/* Activity Indicator */}
            <View className={classNames(
                'absolute z-20 bottom-2',
                'px-4 space-x-2',
                'w-full h-12'
            )}>
                <View className={classNames(
                    'justify-center items-center',
                    'w-full h-full',
                    'rounded-full border-purple border-2'
                )}>
                    <Text className={classNames(
                        'absolute text-white font-bold'
                    )}>Beer Pong</Text>

                    <View className={classNames(
                        'w-full h-full',
                        'rounded-full bg-black opacity-30'
                    )}>
                    </View>
                </View>
            </View>
        </View>
    )
}