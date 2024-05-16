// Imports
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from "react-native"
import React, { useState } from 'react';
import { styles, settings } from '../../constants'

// This component renders the AboutUs information 
export default function AboutUs() {

    // 
    const [isInfoVisible, setInfoVisible] = useState(false);

    //
    return (
        <View>
            <View className="flex-row mt-2 items-center">
                <Ionicons name="information-circle-outline" size={25} color="white" style={{ marginRight: 10 }} />
                <TouchableOpacity onPress={() => setInfoVisible(!isInfoVisible)}>
                    <Text className={styles.H3Text}>About us</Text>
                </TouchableOpacity>
            </View>

            {isInfoVisible && (
                <View className="mt-6 mb-6">

                    <Text className="text-yellow font-bold text-l">Impressum</Text>
                    <Text className="text-white text-l">{settings.impressum}</Text>

                    <Text className="text-yellow font-bold text-l mt-4">Datenschutzerklärung</Text>
                    <Text className="text-white text-l">{settings.datenschutz}</Text>

                    <Text className="text-yellow font-bold text-l mt-4">AGB</Text>
                    <Text className="block text-white text-l">{settings.AGB}</Text>
                </View>
            )}
        </View>
    )

}