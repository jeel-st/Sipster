// Imports
import { Text, View } from "react-native";
import React, { useState } from 'react';
import { settings } from '../../constants';
import TextButton from './TextButton';
import { classNames } from "../../utils";

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
                <View className={classNames('mt-6')}>
                    <Text className={settings.header}>Impressum</Text>
                    <Text className={settings.text}>{settings.impressum}</Text>

                    <Text className={settings.header}>Datenschutzerklärung</Text>
                    <Text className={settings.text}>{settings.datenschutz}</Text>

                    <Text className={settings.header}>AGB</Text>
                    <Text className={settings.text}>{settings.AGB}</Text>
                </View>
            )}
        </View>
    )

}