import { View, TextInput } from 'react-native'

const TextField = () => {
    return (
        <View>
            <TextInput
                className="h-10 m-1 rounded-xl shadow-xl shadow-black w-64" style={{ backgroundColor: '#343434' }}
            />
        </View>
    )
}

export default TextField;