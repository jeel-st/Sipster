import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { classNames } from '../../utils/classNames'

export default function GameGoBtn({handlePress, text, color}) {
    return (
        <TouchableOpacity
            onPress={handlePress}
            className={classNames(
                'justify-center items-center', // position
                'mt-8', // spacing
                'h-24 w-[80%]', // sizing
                'rounded-2xl shadow-md shadow-black', // styling
                color // color
            )}>

            <Text className='text-black text-xl font-bold' >{text}</Text>
        </TouchableOpacity>
    )
}