import { View, Text, Image, ScrollView } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { classNames } from '../../utils'
import HomeReactionCard from './HomeReactionCard'
import HomeActivityImage from './HomeAcitivityImage'
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import { RefreshContext } from '../provider/RefreshProvider'

/*
    HomeActivityCard is a component that represents the activity of a friend in the home screen.
    It displays the profile picture, username, and activity of the friend.
    Typ: Component from home

    @param friend: object -> the friend to display
    @return:       JSX -> returns the HomeActivityCard component
*/
export default function HomeActivityCard({ activity }) {
    const scrollViewRef = useRef(null)
    const [visibleIndex, setVisibleIndex] = useState(0)

    const refreshDate = useContext(RefreshContext)

    // handleScroll is a function that is called when the user scrolls the scroll view.
    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent
        const visibleIndex = Math.floor(contentOffset.x / layoutMeasurement.width)
        setVisibleIndex(visibleIndex)
    }

    return (
        <View className={classNames(
            'justify-between', // position
            'mx-6 mt-4 space-y-2', // spacing
            'h-[550px]', // sizing
        )}>
            <View className={classNames(
                'flex-row justify-start items-center', // position
                'space-x-3', // spacing
                'h-[10%] w-full' // sizing
            )}>
                <View className={classNames(
                    'w-12 h-12', // sizing
                    'rounded-full border-yellow border-[1px]' // styling
                )}>
                    <Image
                        className={classNames(
                            'w-full h-full', // sizing
                            'rounded-full' // styling
                        )}
                        source={{ uri: fetchProfilePictureCompressed(activity.user, refreshDate) }} />
                </View>

                <View>
                    <Text className='text-white font-bold'>{activity.user.username}</Text>
                    <Text className='text-neutral-300 font-thin'>played {activity.game.name} | vaihingen</Text>
                </View>
            </View>

            <View className={classNames(
                'h-[90%]', // sizing
                'rounded-2xl' // styling
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
                    {[...Array(2)].map((value, index) => (<HomeActivityImage key={index} activity={activity} index={index}/>))}
                </ScrollView>

                <View className={classNames(
                    'absolute bottom-4 justify-between flex-row items-end', // position
                    'w-full', // sizing
                    'px-3' // spacing
                )}>
                    <Text className='text-white text-l' > {activity.caption} </Text>

                    <View>
                        {Object.entries(activity.reactions).map((reaction, index) =>
                            <HomeReactionCard
                                key={index}
                                reaction={reaction}
                                activity={activity}
                            />
                        )}
                    </View>
                </View>

                <View className={classNames(
                    'absolute flex-row justify-center items-center', // position
                    'space-x-2', // spacing
                    'w-full' // sizing
                )}>
                    {[...Array(2)].map((_, index) => (
                        <Text key={index} className={classNames(
                            index === visibleIndex ? 'text-white' : 'text-neutral-400', // styling
                            'text-2xl' // styling
                        )}>
                            •
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    )
}
