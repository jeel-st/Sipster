//Imports 
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import currentPlayer from '../constants/currentPlayers';
import { quitGame } from '../../utils/navigator';


/*
choose Page lets the player whose turn it is choose between truth and dare

@return  -> return the choose Components 
@param currentPlayer: array -> the  array have all Players 
@param nextPlayer: string -> the next player 
*/

 export default function choose() {

    const navigation = useNavigation(); 

    // Header disable
    React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); 
    }, [navigation]);


    
    // randomly selects the next player
    const randomIndex = Math.floor(Math.random() * currentPlayer.length);
    const nextPlayer = currentPlayer[randomIndex];
    console.log(nextPlayer + ' ist dran')

     return (
         <View className={classNames(
                'flex-1', //position
                ' bg-primary ', // styling
                )}>

             {/* Header Text and Close Button */}
             <View className={classNames(
                    'flex-row justify-between', //position
                    'mt-16 mx-6' //spaceing
                    )}>
 
                 {/* Sipster Logo */}
                 <Image source={require('../assets/images/logo-small.png')} />
 
                 {/* Close Button */}
                 <TouchableOpacity
                     onPress={() => quitGame(activity, router)}
                     className={classNames(
                        'justify-center items-center' //position
                        )}>
 
                     <AntDesign name="close" size={34} color="white" />
                 </TouchableOpacity>
             </View>
 



             <View className={classNames(
                    'flex-1 ', //position 
                    )}>


                <View className={classNames(
                        'mt-4 mx-6' //spaceing
                        )}>
                    <Text className={classNames(
                            'font-bold text-3xl text-white', //styling
                            )}>
                             Wahrheit oder Pflicht 
                    </Text>
                    
                    <Text className={classNames( 
                            'font-bold text-xl text-white', //styling
                            )}>
                            {/* show the next Player */}
                        {nextPlayer}
                    </Text>

                    <Text className={classNames(
                            'font-bold text-xl text-white', //styling
                            )}>
                            du bist dran... 
                    </Text>

                </View>
 



                <View className={classNames(
                        'mt-8 mx-6', // spacing 
                        )}>

                    {/* Truth Button */}
                    <TouchableOpacity className={classNames(
                                        'items-center justify-center', // position
                                        'px-6 py-4 mt-5', // spacing 
                                        'w-100% h-60', // sizing
                                        'rounded-3xl shadow-md shadow-black bg-yellow' // styling
                                        )}
                                        onPress={() => {router.navigate('/games/WahrheitOderPflicht/routes/truthPage')}}
                                        >
                            <Text className={classNames(
                                    'text-center', // position
                                    'font-bold text-3xl' // styling
                                    )}>
                                    Wahrheit
                            </Text>

                    </TouchableOpacity>

                    {/* Dare Button */}
                    <TouchableOpacity className={classNames(
                        'items-center justify-center', // position
                        'px-6 py-4 mt-5', // spacing 
                        'w-100% h-60', // sizing
                        'rounded-3xl shadow-md shadow-black bg-purple' // styling
                        )}
                        onPress={() => {router.navigate('/games/WahrheitOderPflicht/routes/darePage')}}
                        >
                            <Text className={classNames(
                                'text-center', // position
                                'font-bold text-3xl' // styling
                            )}>
                                Pflicht
                            </Text>

                    </TouchableOpacity>
                 </View>

             </View>
         </View>
     )
 }
 
 