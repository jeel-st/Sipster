//Imports
import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../WahrheitOderPflicht/utils/classNames'
import { TextInput } from 'react-native';
import { usePlayer } from './utils/usePlayer';
import { quitGame } from '../../utils/navigator';

/*
WahrheitOderPflichtGame starts the Game and allow the player to add all other players

@return  -> returns the WahrheitOderPflichtGame components
@param list: component -> list of players who have been added
@param inputValue: string -> input from the user
@param handleInputChange: function -> function is called when inputValue is change
@param handlePlayer: function -> function is called when enter pressed ???
@param handleAllPlayer: function -> function saves all Player which play in an Array
*/
export default function WahrheitOderPflichtGame({ activity }) {
    const { handleInputChange, handlePlayer, handleDeletePlayer, inputValue, router, players } = usePlayer(activity);

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
                <Image source={require('../WahrheitOderPflicht/assets/images/logo-small.png')} />

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => quitGame(activity, router)}
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
                    <Text>
                        <View>
                            {players.map((player, index) => (
                                <View className={classNames(
                                    'pl-2 m-1', // spacing
                                    'w-12/12', // sizing
                                    'items-center flex-row', //position
                                    'rounded-xl shadow-md shadow-black text-white bg-purple' // styling
                                )} key={index}>
                                    <Text className={classNames('font-bold text-l text-black basis-11/12 ')}>
                                        {player}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => { handleDeletePlayer(player) }}
                                        className={classNames('mr-0.5 items-center basis-1/12')}>

                                        <AntDesign name="close" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </Text>


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
                        testID='Start Button'
                        onPress={() => {
                            router.navigate({ pathname: '/games/WahrheitOderPflicht/routes/choosePage', params: { activity: JSON.stringify      (activity), players: JSON.stringify(players) } })
                        }}>
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

