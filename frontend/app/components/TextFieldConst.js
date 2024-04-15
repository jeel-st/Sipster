import { View, TextInput } from 'react-native'
import { styles } from '../constants';

const TextField = ({ placeholder }) => {
    return (
        <View>
            {/* text etwas nach rechts schieben? */}
            <TextInput
                className="h-10 m-1 rounded-xl shadow-md shadow-black w-64"
                style={{ backgroundColor: styles.Colors.secondary }}
                placeholder={placeholder}
                placeholderTextColor="white"
                editable={false}
            />
        </View>
    )
}

export default TextField;