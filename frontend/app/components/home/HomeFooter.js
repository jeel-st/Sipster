import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'

export default function HomeFooter() {
  return (
    <View className={classNames(
        'h-20', // sizing
        'justify-center items-center', // position
    )}>
        <ActivityIndicator size={'large'} color={'#DFFA54'} />
    </View>
  )
}