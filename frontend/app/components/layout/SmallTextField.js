import { View, TextInput } from 'react-native'
import React from 'react'
import { styles } from '../../constants'

/* Frontend Component für das SmallTextField - Kann individuell genutzt werden da placeholder, onChangeText, value und hideText variabel */
export default function SmallTextField({ placeholder, onChangeText, value, hideText }) {
  return (
    <View>
        <TextInput
            className="h-10 m-1 rounded-xl shadow-md shadow-black text-white w-[122px] pl-2"
            style={{ backgroundColor: styles.Colors.secondary }}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            autoCapitalize="none"
            secureTextEntry={hideText}
        />
    </View>
)
}