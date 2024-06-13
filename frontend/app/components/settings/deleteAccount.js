// Imports
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { Popover, Button, Checkbox } from "native-base";
import { useSettings } from '../../utils/hooks/useSettings';
import { Colors } from '../../constants/styles';
import { classNames } from '../../utils';

/* 
This component renders a button with a warning icon and "delete Account"-Text.
Type: Component from settings 

React.forwardRef            ->  This is a function from React that is used to enable the forwarding of refs in function components. 
                                By using React.forwardRef, refs can be forwarded from parent components to subordinate components.
@ ...props                  ->  The ...props syntax captures all other props that are passed to the component and packs them into an object called props. 
@ ref                       ->  The ref argument enables the component to receive refs from higher-level components.
*/
const DeleteAccount = React.forwardRef(({ ...props }, ref) => {

    // Import the logic for the changeUsername component from changeSettingsLogic.js
    const { handleDeleteAccount } = useSettings();

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Popover
            trigger={triggerProps => {
                return (
                    <View className="flex-row mt-2 items-center">
                        <Ionicons name="warning-outline" size={25} color="red" style={{ marginRight: 10 }} />
                        <TouchableOpacity ref={ref} {...triggerProps} {...props}>
                            <Text className="font-bold text-l" style={{ color: "red" }}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
        >
            {/* Popover.content is only displayed when the popover has been pressed. */}
            <Popover.Content accessibilityLabel="Delete Customer" w="56" ml={6}>
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header><Text style={{ fontWeight: 'bold' }}>Are you sure you want to delete your account?</Text></Popover.Header>
                <Popover.Body>
                    <Text>
                        This will remove all data relating to your account. This action cannot be
                        reversed. Deleted data cannot be recovered.
                    </Text>
                </Popover.Body>
                <Popover.Footer style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} colorScheme={isChecked ? "red" : "primary"} accessibilityLabel="checkbox"/>
                    <Text style={{ marginLeft: 6, marginRight: 12 }}>I accept.</Text>
                    <TouchableOpacity className={classNames('px-4 py-4 rounded-3xl text-center w-18')} style={{ backgroundColor: Colors.purple}}>
                        <Text className="text-center font-bold">Delete</Text>
                    </TouchableOpacity>
                </Popover.Footer>
            </Popover.Content>
        </Popover>
    );
});

export default DeleteAccount;