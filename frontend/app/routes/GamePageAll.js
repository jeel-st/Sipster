import { View, Text, ScrollView, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesPerCategory } from '../components'


export default function GamePageAll(){

    return (    
        <SafeAreaView className='bg-primary h-full'>
            
            <View>
                <Text className='text-white font-bold text-3xl tracking-widest'> Sipster </Text>
            </View>
            

            <ScrollView>
                {/* games */}
                <GamesPerCategory/>
            </ScrollView>
            
        </SafeAreaView>
    );
}