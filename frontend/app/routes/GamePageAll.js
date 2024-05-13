import { View, Text, ScrollView, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesPerCategory } from '../components'


export default function GamePageAll(){

    return (    
        <SafeAreaView className='bg-primary h-full'>
            
            <View>
                <Text className='text-white font-bold text-3xl tracking-widest'> Sipster </Text>
                {/*<Image source={require('../../assets/images/logo-small.png')} />*/}
            </View>

            {/* Sip-Counter */}
            {/*
            <View className="h-40 w-full flex items-end justify-center rounded-3xl shadow-md shadow-black mt-3 bg-yellow" >
                <Text className="text-center text-2xl font-bold pr-4">1000 sips</Text>
            </View>
            */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Sip-Counter */}
                <View className="h-40 w-full flex items-end justify-center rounded-3xl shadow-md shadow-black mt-3 bg-yellow" >
                    <Text className="text-center text-2xl font-bold pr-4">1000 sips</Text>
                </View>
                {/* games */}
                <GamesPerCategory/>
            </ScrollView>
            
        </SafeAreaView>
    );
}
