import { ScrollView } from 'react-native'
import { events } from '../constants'
import EventCard from './EventCard'
import React from 'react'

export default function Events() {
    return (
        <ScrollView className="mt-4 max-h-56" showsVerticalScrollIndicator={false}>
            {
                events.map((event, index) => <EventCard event={event} key={index} />)
            }
        </ScrollView>
    )
}