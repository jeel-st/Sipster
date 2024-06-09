//Import
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { player } from '../utils/player';
import truth from '../constants/truth'

/*
truthPage displays the current question 

@return -> returns the truthPage components 

*/





export default function truthPage() {
    const navigation = useNavigation(); // Zugriff auf die Navigationsfunktionen

    React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); // Header ausblenden
    }, [navigation]);
 
    const { handleInputChange, handlePlayer, players, inputValue, handleNextPlayer} = player();

    const randomIndex = Math.floor(Math.random() * truth.length);
    const category = truth[randomIndex];
    console.log(category)


     return (
         <View className={classNames(
             'flex-1 bg-primary',
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
                 'mt-4 mx-6 ')}>

                    
                 <Text className={classNames(
                         'font-bold text-3xl text-white',
                     )}>
                         Wahrheit oder Pflicht 
                 </Text>


                 <View className={classNames(
                            ' mt-6 bg-yellow rounded-3xl shadow-md shadow-black w-100% h-[450px]  items-center',
                        )}>
                    <Text className={classNames(
                            'font-bold text-3xl mt-6 ',
                        )}> Wahrheit </Text>
                    <View className={classNames(
                            ' mt-44 mr-4 ml-4',
                        )}>
                         {/* display the current question */}
                        <Text className={classNames('text-2xl text-black font-light')}>
                            {category}
                        </Text>
                    </View>
                 </View>
                     
                <View className={classNames(
                            'items-center',
                        )}>

                    {/* button to get to the next player */}
                    <TouchableOpacity className={classNames(
                                'text-center ', // position
                                'px-6 py-4 mt-5', // spacing 
                                'w-[200px]', // sizing
                                'rounded-3xl shadow-md shadow-black bg-purple' // styling
                                )}
                                onPress={() => {
                                    router.navigate('/games/WahrheitOderPflicht/routes/choose')}}
                                >
                                    <Text className={classNames(
                                        'text-center', // position
                                        'font-bold' // styling
                                    )}>
                                        Weiter</Text>
                    </TouchableOpacity>
                    
                </View>
                
                
             </View>
         </View>
     )
 }