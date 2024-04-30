import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsButton({ title, icon }) {
    return (
        <TouchableOpacity className="shadow-md shadow-black w-[340px] rounded-xl bg-secondary mt-3">

            <View className="flex-row mt-5 items-center ">
                <Ionicons name="add-circle-outline" size={30} color="white" style={{ marginRight: 20, marginLeft: 6 }} />
                <Text className="text-white font-bold">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};