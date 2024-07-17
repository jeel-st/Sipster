import React from 'react'
import { View, Text } from 'react-native'
import TagCard from '../layout/TagCard'
import { classNames } from '../../utils/classNames'

/*
    EventInfoCard is a component that represents the selected event and displays it in detail.
    It displays the header, name, and description of the event.
    It also displays the tags associated with the event.
    Typ: Component from events

    @param event:   object -> the event to display
    @return:        JSX -> returns the EventInfoCard component
*/
export default function EventInfoCard({ event }) {
    return (
        <View className={classNames(
            'm-1 mx-6 mt-5', // spacing
            'h-72', // sizing
            'rounded-3xl shadow-md shadow-black bg-yellow' // styling
        )}>
            <View className={classNames(
                'flex-1 justify-start', // position
                'mx-5 my-5 space-y-3' // spacing
            )}>
                <Text className="text-black tracking-wide">{event.header}</Text>
                <Text className="text-black font-semibold text-lg">{event.name}</Text>
                <Text className="text-black font-light tracking-wide max-h-[46%]">{event.desc}</Text>
                <View className={classNames(
                    'absolute flex-1 flex-row self-start bottom-0', // position
                    'w-full', // sizing
                )}>
                    {
                        event.tags.map((tag, index) =>
                            <TagCard
                                tag={tag}
                                key={index}
                            />)
                    }
                </View>
            </View>
        </View>
    )
}