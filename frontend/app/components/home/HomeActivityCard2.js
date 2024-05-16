import { View, Text, Image } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import getProfilePicture from '../../utils/database/accountFetcher'

export default function HomeActivityCard2({ friend }) {
    return (
        <View>
            <View className={classNames(
                'justify-between',
                'mx-6 mt-4 space-y-2',
                'h-[600px]',
            )}>
                <View className={classNames(
                    'flex-row justify-start items-center',
                    'space-x-3',
                    'h-[10%] w-full',
                    'bg-primary'
                )}>
                    <View className={classNames(
                        'w-12 h-12',
                        'rounded-full shadow-md shadow-black border-yellow border-[1px]'
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
                            'text-neutral-300 font-thin'
                        )}>played bierpong | vaihingen</Text>
                    </View>
                </View>

                <View className={classNames(
                    'h-[80%]',
                    'bg-purple rounded-2xl'
                )}>
                    <Image
                        className={classNames(
                            'h-full',
                            'rounded-2xl'
                        )}
                        source={{
                            uri: `http://85.215.71.124/static/profilePictures/${getProfilePicture(friend)}?${new Date().getDate()}`
                        }} />

                    <View className={classNames(
                        'absolute bottom-4 justify-between items-end',
                        'w-full',
                        'px-3'
                    )}>
                        <View className={classNames(
                            'flex-row',
                            'space-x-1'
                        )}>
                            <View className={classNames(
                                'flex-row justify-between items-center',
                                'px-2',
                                'w-[60px] h-[35px]',
                                'bg-primary rounded-full'
                            )}>
                                <Text className={classNames('text-xl')}>🍻</Text>
                                <Text className={classNames('text-xl text-white ')}>0</Text>
                            </View>

                            <View className={classNames(
                                'flex-row justify-between items-center',
                                'px-2',
                                'w-[60px] h-[35px]',
                                'bg-primary rounded-full'
                            )}>
                                <Text className={classNames('text-xl')}>😍</Text>
                                <Text className={classNames('text-xl text-white ')}>4</Text>
                            </View>

                            <View className={classNames(
                                'flex-row justify-between items-center',
                                'px-2',
                                'w-[60px] h-[35px]',
                                'bg-primary rounded-full'
                            )}>
                                <Text className={classNames('text-xl')}>🤮</Text>
                                <Text className={classNames('text-xl text-white ')}>4</Text>
                            </View>

                            <View className={classNames(
                                'flex-row justify-between items-center',
                                'px-2',
                                'w-[60px] h-[35px]',
                                'bg-primary rounded-full'
                            )}>
                                <Text className={classNames('text-xl')}>🥳</Text>
                                <Text className={classNames('text-xl text-white ')}>2</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className={classNames('px-1')}>
                    <Text className={classNames(
                        'text-white text-[15px]'
                    )}>
                        About last Night #fun #party
                    </Text>
                </View>
            </View>

            {/* Separation line */}
            <View className={classNames('w-full h-[2px] mt-4 bg-secondary')} />
        </View>
    )
}