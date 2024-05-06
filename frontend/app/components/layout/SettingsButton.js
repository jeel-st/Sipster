/* Imports */
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../constants'

/* Frontend Component für den SettingsButton - Kann individuell genutzt werden da titel und icon variabel */
export default function SettingsButton({ title, onPress }) {
    return (
        <TouchableOpacity className="shadow-md shadow-black w-[340px] rounded-xl bg-secondary mt-3" onPress={onPress}>

            <View className="flex-row mt-2 mb-2 items-center ">
                <Ionicons name="add-circle-outline" size={30} color="white" style={{ marginRight: 20, marginLeft: 6 }} />
                <Text className={styles.categoryText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};