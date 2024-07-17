//Imports
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { quitGame } from '../../../utils/navigator';
import { useTask } from '../utils/useTask';
import { useNext } from '../utils/useNext';

/*
choose Page lets the player whose turn it is choose between truth and dare

@return  -> return the choose Components
@param currentPlayer: array -> the  array have all Players
@param nextPlayer: string -> the next player
*/

export default function choose() {
    const activity = JSON.parse(useLocalSearchParams().activity);
    const players = JSON.parse(useLocalSearchParams().players);
    const router = useRouter();
    const navigation = useNavigation();

    const {handleDareTask, handleTruthTask } = useTask();
    //const {nextPlayer} = usePlayer(activity);
    const {nextPlayer} = useNext(players);

   


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
                        onPress={() => { 
                            handleTruthTask();
                            router.navigate({ pathname: '/games/WahrheitOderPflicht/routes/truthPage', params: { activity: JSON.stringify(activity), players: JSON.stringify(players) }  }) }}
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
                        onPress={() => { 
                            handleDareTask();
                            router.navigate({ pathname: '/games/WahrheitOderPflicht/routes/darePage', params: { activity: JSON.stringify(activity), players: JSON.stringify(players) }  }) }}
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

