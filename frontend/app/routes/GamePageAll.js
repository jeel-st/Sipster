import { View, Text, ScrollView, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GamesPerCategory } from '../components'
import { classNames } from '../utils';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { styles } from '../constants';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';


export default function GamePageAll() {
    const isFocused = useIsFocused();
    useEffect(() => {
        if (Platform.OS === 'android') {
            setBackgroundColorAsync(styles.Colors.secondary);
        }
    }, [isFocused]);

    return (
        <SafeAreaView className='flex-1 bg-primary h-full'>
            <View>
                {/* Header Text and Friendsmenu Button */}
                <View className={classNames(
                    'flex-row justify-between',
                    'mt-4 mx-6')}>

                    {/* Sipster Logo */}
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../assets/images/logo-small.png')}/>
                </View>

                {/* Sip-Counter */}
                <View className="h-40 flex items-end justify-center rounded-3xl shadow-md shadow-black mt-3 mb-4 mx-4 bg-yellow" >
                    <Text className="text-center text-2xl font-bold pr-4">1000 sips</Text>
                </View>

                {/* Separation line */}
                <View className={classNames(
                    'w-full h-[2px]',
                    'bg-secondary')} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className='mx-4'>

                {/* games */}
                <GamesPerCategory />
            </ScrollView>

        </SafeAreaView>
    );
}