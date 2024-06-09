import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../WahrheitOderPflicht/utils/classNames'
import { router } from 'expo-router';
import { TextInput } from 'react-native';
import { player } from './utils/player';
import PlayerList from './components/PlayerList';


export default function WahrheitOderPflichtGame() {
    const { handleInputChange, handlePlayer, players, inputValue, handleNextPlayer, list, handleAllPlayer} = player();

    return (

        <View className={classNames(
            'flex-1 bg-primary',
        )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                'flex-row justify-between',
                'mt-4 mx-6')}>

                {/* Sipster Logo */}
                <Image source={require('../WahrheitOderPflicht/assets/images/logo-small.png')} />

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => { router.navigate('(tabs)/games')}}
                    className={classNames(
                        'justify-center items-center')}>

                    <AntDesign name="close" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View className={classNames(
            'flex-1 ',)}>
                <View className={classNames(
                'mt-4 mx-6')}>
                    <Text className={classNames(
                            'font-bold text-3xl text-white',
                        )}>
                            Wahrheit oder Pflicht 
                    </Text>
                    
                    <Text className={classNames(
                            'font-bold text-xl text-white',
                        )}>
                            Wer spielt mit? 
                    </Text>
                </View>


                <ScrollView showsVerticalScrollIndicator={false} className={classNames(
                'mt-4 mx-6 mb-20 w-100% ')}>
                    <Text className={classNames(
                            'font-bold text-xl text-white',
                        )}>Mitspieler:</Text>
                        
                    <Text> {list} </Text>


                    <TextInput className={classNames(
                    'pl-2 m-1 mt-4', // spacing 
                    'h-10 w-100%', // sizing
                    'rounded-xl shadow-md shadow-black text-white bg-secondary' // styling
                    )}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handlePlayer}
                    placeholder='Player Name' />

                    

                  
                </ScrollView>


                <View className={classNames(
                'mt-4 mx-20 absolute bottom-4 ')}>
                    <TouchableOpacity className={classNames(
                        'justify-center items-center', // position
                        'px-6 py-4 mt-5', // spacing 
                        'w-[200px]', // sizing
                        'rounded-3xl shadow-md shadow-black bg-yellow' // styling
                        )}
                        onPress={() => {
                            handleAllPlayer();
                            router.navigate('/games/WahrheitOderPflicht/routes/choose')}}
                        >
                            <Text className={classNames(
                                'text-center', // position
                                'font-bold' // styling
                            )}>
                                Start the Game  </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

