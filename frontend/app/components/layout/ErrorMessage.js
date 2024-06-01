// Imports
import React from 'react';
import { View, Text } from "react-native";
import { classNames } from '../../utils';
import { styles } from '../../constants';

/*
This button displays a customised icon and navigates to a new page.
Typ: Component from layout

@ icon 
@ navigation 
*/
const ErrorMessage = ({ error }) => {
    return (
        <View className={styles.spaceText}>
            {error ? (<Text className={classNames("text-red-500 text-center")}>{error}</Text>) : null}
        </View>
    );
};

export default ErrorMessage;