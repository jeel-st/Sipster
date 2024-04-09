import { View, TextInput } from 'react-native'
import { styles } from '../constants';

const TextField = ({ placeholder }) => {
    return (
        <View>
            <TextInput
                className="h-10 m-1 rounded-xl shadow-xl shadow-black w-64"
                style={{ backgroundColor: styles.Colors.secondary }}
                placeholder={placeholder}
            />
        </View>
    )
}

export default TextField;