import { View, Text, ScrollView } from 'react-native'
import { events } from '../constants/events'
import React from 'react'
import EventCard from './EventCard'

export default function Events() {
    return (
        <ScrollView className="mt-4 max-h-56" showsVerticalScrollIndicator={false}>
            {
                events.map((event, index) => <EventCard event={event} key={index} />)
            }
        </ScrollView>
    )
}