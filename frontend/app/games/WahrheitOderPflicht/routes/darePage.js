//Imports
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { player } from '../utils/player';
import dare from '../constants/dare'





/*
darePage displays the current question 

@return -> returns the darePage components 
@param category: string -> The dare task 
 
*/




export default function darePage() {
    const navigation = useNavigation(); // Zugriff auf die Navigationsfunktionen

    React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); // Header ausblenden
    }, [navigation]);

   
    const randomIndex = Math.floor(Math.random() * dare.length);
    const category = dare[randomIndex];
    console.log(category)



     return (
        <View className={classNames(
                'flex-1', //position
                ' bg-primary', //styling
                )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                'flex-row justify-between', //position
                'mt-16 mx-6' //spacing
                )}>

                {/* Sipster Logo */}
                <Image source={require('../assets/images/logo-small.png')} />

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => { router.navigate('(tabs)/games')}}
                    className={classNames(
                        'justify-center items-center' //position
                        )}>

                    <AntDesign name="close" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View className={classNames(
                    'mt-4 mx-6 ' //spacing 
                    )}>
                <Text className={classNames(
                        'font-bold text-3xl text-white', //styling
                    )}>
                        Wahrheit oder Pflicht 
                </Text>


                <View className={classNames(
                        'items-center', //position
                        'mt-6 ', //spacing
                        'w-100% h-[450px]', //sizeing
                        ' bg-purple rounded-3xl shadow-md shadow-black ', //styling
                        )}>
                   <Text className={classNames(
                           'font-bold text-3xl mt-6 ',
                       )}> Pflicht </Text>
                   <View className={classNames(
                           ' mt-44 mr-4 ml-4',
                       )}>
                        {/* display the current question */}
                        <Text className={classNames(
                                'text-2xl text-black font-light'//styling
                                )}>
                            {category}
                        </Text>
                   </View>
                </View>
                    
               <View className={classNames(
                           'items-center', //position
                       )}>

                    {/* button to get to the next player */}
                   <TouchableOpacity className={classNames(
                               'text-center ', // position
                               'px-6 py-4 mt-5', // spacing 
                               'w-[200px]', // sizing
                               'rounded-3xl shadow-md shadow-black bg-yellow' // styling
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