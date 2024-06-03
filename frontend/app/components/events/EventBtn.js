import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { styles } from '../../constants'
import { classNames } from '../../utils/classNames'

/*
    EventBtn is a component that represents a single event in the event list.
    It displays the date, name, and time of the event.
    It also has a border that changes color when the event is selected.
    Typ: Component from events

    @param event:       object -> the event to display
    @param onClick:     function -> the function to call when the event is clicked
    @param isSelected:  boolean -> whether the event is selected
    @return:            JSX -> returns the EventBtn component
*/
export default function EventBtn({ event, onClick, isSelected }) {
    return (
        <Pressable onPress={onClick} className={classNames(
            'justify-center', // position
            'm-1 mx-5', // spacing
            'h-10', // sizing
            'rounded-xl shadow-sm shadow-black overflow-visible bg-secondary' // styling
        )} style={[
            {
                borderWidth: isSelected ? 1 : 0,
                borderColor: styles.Colors.yellow,
            }
        ]}>
            <View className="flex flex-row justify-between items-center mx-5">
                <Text className={styles.H3Text}>{event.date}</Text>
                <Text className={styles.H3Text}>{event.name}</Text>
                <Text className={styles.H3Text}>{event.time}</Text>
            </View>
        </Pressable>
    )
}