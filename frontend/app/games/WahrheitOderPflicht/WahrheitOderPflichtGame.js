//Imports
import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../WahrheitOderPflicht/utils/classNames'
import { router } from 'expo-router';
import { TextInput } from 'react-native';
import { player } from './utils/player'; 

/*
WahrheitOderPflichtGame starts the Game and allow the player to add all other players 

@return  -> returns the WahrheitOderPflichtGame components 
@param list: component -> list of players who have been added
@param inputValue: string -> input from the user
@param handleInputChange: function -> function is called when inputValue is change
@param handlePlayer: function -> function is called when enter pressed ???
@param handleAllPlayer: function -> function saves all Player which play in an Array


*/


export default function WahrheitOderPflichtGame() {
    const { handleInputChange, handlePlayer, inputValue, list, handleAllPlayer} = player();

    return (

        <View className={classNames(
                'flex-1', //position
                ' bg-primary', //styling
                )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                    'flex-row justify-between', //position
                    'mt-4 mx-6' // spacing 
                    )}>

                {/* Sipster Logo */}
                <Image source={require('../WahrheitOderPflicht/assets/images/logo-small.png')}/>

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => { router.navigate('(tabs)/games')}}
                    className={classNames(
                        'justify-center items-center'//position
                        )}>

                    <AntDesign name="close" size={34} color="white" />
                </TouchableOpacity>
            </View>



            {/* Game Header */}
            <View className={classNames(
                    'flex-1 ', //position
                    )}>

                <View className={classNames(
                        'mt-4 mx-6' // spaciing
                        )}>
                    <Text className={classNames(
                            'font-bold text-3xl text-white', //styling
                            )}>
                            Wahrheit oder Pflicht 
                    </Text>
                    
                    <Text className={classNames(
                            'font-bold text-xl text-white', //styling
                            )}>
                            Wer spielt mit? 
                    </Text>
                </View>


                

                <ScrollView showsVerticalScrollIndicator={false} 
                            className={classNames(
                                'mt-4 mx-6 mb-20', //spacing
                                ' w-100% ' //sizing
                                )}> 
                    <Text className={classNames(
                            'font-bold text-xl text-white', //styling
                            )}>
                            Mitspieler:
                    </Text>
                        

                    {/* current List of Players */}    
                    <Text> {list} </Text>


                    {/* Input Field for the Players name  */}
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

                    {/* Start Button  */}
                    <TouchableOpacity className={classNames(
                        'justify-center items-center', // position
                        'px-6 py-4 mt-5', // spacing 
                        'w-[200px]', // sizing
                        'rounded-3xl shadow-md shadow-black bg-yellow' // styling
                        )}
                        onPress={() => {
                            handleAllPlayer();
                            router.navigate('/games/WahrheitOderPflicht/routes/choose')}}>
                            <Text className={classNames(
                                'text-center', // position
                                'font-bold' // styling
                                )}>
                                Start the Game  
                            </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}

