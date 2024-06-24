// Imports
import React from 'react';
import { View, Text } from "react-native";
import { classNames } from '../../utils';
import { styles } from '../../constants';

/*
This component defines the layout of the ErrorMessages.
Typ: Component from layout

@ error 
*/
const ErrorMessage = ({ error }) => {
    return (
        <View className={styles.spaceText}>
            {error ? (<Text className={classNames("text-red-500 text-center")}>{error}</Text>) : null}
        </View>
    );
};

export default ErrorMessage;