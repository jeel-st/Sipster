import { View, Text } from 'react-native'
import React from 'react'
import HomeActivityCard from './HomeActivityCard'
import { classNames } from '../../utils'
import Events from '../events/Events'
import { events } from '../../constants'
import EventInfoCard from '../events/EventInfoCard'

export default function HomeActivityFactory({ item, index }) {
    return (
        <View key={index}>
            <HomeActivityCard activity={item} />

            {/* Separation line */}
            <View className={classNames(
                'mt-4', // spacing
                'w-full h-[2px]', // sizing
                'bg-secondary' // styling
            )} />

            {/* Füge die EventInfoCard und Events abwechselnd ein */}
            {index % 2 ?
                <Events onSelectEvent={() => { }} selectedEvent={events[index]} />
                : <EventInfoCard event={events[index]} />}

        </View>
    )
}