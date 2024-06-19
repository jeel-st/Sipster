import { View, Text } from 'react-native'
import React from 'react'
import HomeActivityCard from './HomeActivityCard'
import { classNames } from '../../utils'
import EventInfoCard from '../events/EventInfoCard'
import GameInfoCard from '../games/GameInfoCard'

export default function HomeActivityFactory({ item, index }) {
    return (
        <View key={index}>
            {item.type === "activity" &&
                <>
                    <HomeActivityCard activity={item} />

                    {/* Separation line */}
                    <View className={classNames(
                        'mt-4', // spacing
                        'w-full h-[2px]', // sizing
                        'bg-secondary' // styling
                    )} />
                </>
            }
            {item.type === "event" &&
            <>
                <EventInfoCard event={item} />
            </>
            }
            {item.type === "game" &&
            <>
                <GameInfoCard game={item} />
            </>
            }
        </View>
    )
}