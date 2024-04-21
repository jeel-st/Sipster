import { View, Text } from 'react-native'
import { styles } from '../../constants'
import React from 'react'

export default function TagCard({ tag }) {
  return (
    <View className="h-10 rounded-3xl mr-2 mt-2" style={{ backgroundColor: styles.Colors.primary }}>
      <View className="flex-1 flex-row justify-between items-center ml-1 mr-2 space-x-1">
        <View className="h-8 w-8 rounded-full" style={{ backgroundColor: styles.Colors.secondary }}></View>
        <Text className="text-white font-light">{tag}</Text>
      </View>
    </View>
  )
}