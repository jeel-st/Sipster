import { View, Text, Image, ScrollView } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { classNames } from '../../utils'
import { RefreshContext } from '../provider/RefreshProvider'
import { UserProvider } from '../provider/UserProvider'
import HomeReactionCard from '../home/HomeReactionCard'
import { fetchProfilePicture, fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import HomeActivityImage from '../home/HomeAcitivityImage'

export default function GameActivity({ user }) {
    const emojis = ['🍻', '😍', '🤮', '🥳']

    return (user &&
        <View className={classNames(
            'flex-1 absolute z-20 justify-center',
            'mt-[-10%] space-y-4',
            'w-full h-[110%]',
            'bg-black opacity-90'
        )}>
            <View className={classNames(
                'justify-between',
                'mx-6 mt-4 space-y-2',
                'h-[550px]',
            )}>
                <View className={classNames(
                    'flex-row justify-start items-center',
                    'space-x-3',
                    'h-[10%] w-full'
                )}>
                    <View className={classNames(
                        'w-12 h-12',
                        'rounded-full border-yellow border-[1px]'
                    )}>
                        <Image
                            className={classNames(
                                'w-full h-full',
                                'rounded-full'
                            )}
                            source={{ uri: fetchProfilePictureCompressed(user) }} />
                    </View>

                    <View>
                        <Text className={classNames(
                            'text-white font-bold'
                        )}>{user.username}</Text>
                        <Text className={classNames(
                            'text-neutral-300 font-thin'
                        )}>played bierpong | vaihingen</Text>
                    </View>
                </View>

                <View className={classNames(
                    'h-[90%]',
                    'rounded-2xl'
                )}>
                    <Image
                        className={classNames(
                            'w-full h-full',
                            'rounded-2xl'
                        )}
                        source={{ uri: fetchProfilePicture(user) }} />

                    <View className={classNames(
                        'absolute bottom-4 justify-between flex-row items-end',
                        'w-full',
                        'px-3'
                    )}>
                        <Text className={classNames(
                            'text-white text-l'
                        )}>
                            About last Night #fun #party
                        </Text>

                        <View>
                            {emojis.map((emoji, index) => {
                                return (
                                    <HomeReactionCard emoji={emoji} key={index} />
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
            <View className={classNames(
                'justify-center items-center',
            )}>
                <View className={classNames(
                    'justify-center items-center',
                    'w-20 h-20',
                    'bg-white rounded-full'
                )}>
                    <View className={classNames(
                        'w-[90%] h-[90%]',
                        'bg-primary rounded-full'
                    )}></View>
                </View>
            </View>
        </View>
    )
}