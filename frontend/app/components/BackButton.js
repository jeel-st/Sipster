import React from 'react';
import { TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BackButton = ({ title, navigation }) => {
    return (
        <TouchableOpacity 
            onPress={() => router.back()} >
            <Icon name="chevron-left" size={30} color="white"/>
        </TouchableOpacity>
    );
};

export default BackButton;