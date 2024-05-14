import { View, Text, Image, Dimensions, ScrollView, findNodeHandle } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { classNames } from '../../utils'
import getProfilePicture from '../../utils/database/accountFetcher'
import HomeReactionCard from './HomeReactionCard'

const windowWidth = Dimensions.get('window').width

export default function HomeActivityCard({ friend }) {
    const emojis = ['🍻', '😍', '🤮', '🥳']
    const scrollViewRef = useRef(null)
    const [visibleIndex, setVisibleIndex] = useState(0)

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleIndex = Math.floor(contentOffset.x / layoutMeasurement.width)
        setVisibleIndex(visibleIndex)
    }

    return (
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
                        source={{
                            uri: `http://85.215.71.124/static/profilePictures/compressed/${getProfilePicture(friend)}?${new Date().getDate()}`,
                            key: new Date()
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
                'h-[90%]',
                'rounded-2xl'
            )}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        overflow: 'hidden'
                    }}
                    onScroll={handleScroll}>
                    {[...Array(2)].map((_, index) => (
                        <Image
                            key={index}
                            style={{
                                height: '100%',
                                // windowWidth without margin border
                                width: windowWidth - 48,
                                resizeMode: 'cover',
                            }}
                            className={classNames(
                                'rounded-2xl'
                            )}
                            source={{ uri: `http://85.215.71.124/static/profilePictures/${getProfilePicture(friend)}?${new Date().getDate()}` }}
                        />
                    ))}
                </ScrollView>

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

                <View className={classNames(
                    'absolute flex-row justify-center items-center',
                    'space-x-2',
                    'w-full'
                )}>
                    {[...Array(2)].map((_, index) => (
                        <Text key={index} className={classNames(
                            index === visibleIndex ? 'text-white' : 'text-neutral-400',
                            'text-2xl'
                        )}>
                            •
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    )
}
