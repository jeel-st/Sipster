// Imports
import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { settings } from '../../constants';
import TextButton from './TextButton';

/* 
This component renders the AboutUs information
Typ: Component from settings 
*/
export default function AboutUs() {

    /* 
    When the AboutUs component first renders, isInfoVisible is false. This means the detailed information 
    (like Impressum, Datenschutzerklärung, and AGB) is not displayed. The useState hook initializes the state.
    When the button is pressed, it toggles the value of isInfoVisible between true and false.
    */
    const [isInfoVisible, setInfoVisible] = useState(false);

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