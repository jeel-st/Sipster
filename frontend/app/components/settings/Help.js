// Imports
import { Text, View } from "react-native";
import React, { useState } from 'react';
import { settings } from '../../constants';
import TextButton from './TextButton';

/* 
This component renders the Help&FAQs information
Typ: Component from settings 
*/
export default function Help() {

    /*
    When the Help component first renders, isHelpVisible is false. This means the detailed information 
    is not displayed. The useState hook initializes the state.
    When the button is pressed, it toggles the value of isHelpVisible between true and false. 
    */
    const [isHelpVisible, setHelpVisible] = useState(false);

    return (
        <View>

            <TextButton title="Help & FAQs" icon="help-circle-outline" color="white" content={() => setHelpVisible(!isHelpVisible)} />

            {isHelpVisible && (
                <View className="mt-6 mb-6">
                    <Text className="text-yellow font-bold text-l">How do I log in to the application?</Text>
                    <Text className="text-white text-l">{settings.questions1}</Text>

                    <Text className="text-yellow font-bold text-l mt-4">How can I collect sips?</Text>
                    <Text className="text-white text-l">{settings.questions2}</Text>

                    <Text className="text-yellow font-bold text-l mt-4">How can I get help or support if I encounter an issue?</Text>
                    <Text className="text-white text-l">{settings.questions3}</Text>
                </View>
            )}
        </View>
    )

}


