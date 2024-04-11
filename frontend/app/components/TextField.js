import { View, TextInput } from 'react-native'
import { styles } from '../constants';

export default function ({ placeholder, onChangeText, value }) {

    return (
        <View>
            <TextInput
                className="h-10 m-1 rounded-xl shadow-md shadow-black w-64"
                style={{ backgroundColor: styles.Colors.secondary }}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
            />
        </View>
    )
}
