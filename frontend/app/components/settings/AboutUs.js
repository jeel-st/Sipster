// Imports
import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { settings } from '../../constants';
import TextButton from './TextButton';

// This component renders the AboutUs information 
export default function AboutUs() {

    // 
    const [isInfoVisible, setInfoVisible] = useState(false);

    //
    return (
        <View>

            <TextButton title="About us" icon="information-circle-outline" color="white" content={() => setInfoVisible(!isInfoVisible)} />

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