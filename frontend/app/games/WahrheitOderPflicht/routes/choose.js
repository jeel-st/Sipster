import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { player } from '../utils/player';
import { useEffect } from 'react';
import currentPlayer from '../constants/currentPlayers';


 export default function choose() {

    const navigation = useNavigation(); // Zugriff auf die Navigationsfunktionen

    React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); // Header ausblenden
    }, [navigation]);

    
    const randomIndex = Math.floor(Math.random() * currentPlayer.length);
    const nextPlayer = currentPlayer[randomIndex];
    console.log(nextPlayer + ' ist dran')

     return (
         <View className={classNames(
             'flex-1 bg-primary ',
         )}>
             {/* Header Text and Close Button */}
             <View className={classNames(
                 'flex-row justify-between',
                 'mt-16 mx-6')}>
 
                 {/* Sipster Logo */}
                 <Image source={require('../assets/images/logo-small.png')} />
 
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
                             {nextPlayer}
                     </Text>
                     <Text className={classNames(
                             'font-bold text-xl text-white',
                         )}>
                             du bist dran... 
                     </Text>
                 </View>
 
                <View className={classNames(
                        'mt-8 mx-6', // position
                        )}>
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
                                Wahrheit</Text>
                    </TouchableOpacity>

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
                                Pflicht</Text>
                    </TouchableOpacity>
                 </View>

             </View>
         </View>
     )
 }
 
 