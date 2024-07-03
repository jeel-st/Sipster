//Imports
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { quitGame } from '../../../utils/navigator';
import { useTask } from '../utils/useTask';
import { usePlayer } from '../utils/usePlayer';

/*
darePage displays the current question

@return -> returns the darePage components
@param category: string -> The dare task

*/
export default function darePage() {
    const activity = JSON.parse(useLocalSearchParams().activity);
    const players = JSON.parse(useLocalSearchParams().players);
    const router = useRouter();
    const navigation = useNavigation(); // Zugriff auf die Navigationsfunktionen
    const {dareTask } = useTask();
    const {handleNextPlayer} = usePlayer();

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); // Header ausblenden
    }, [navigation]);



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
                    onPress={() => quitGame(activity, router)}
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
                            {dareTask}
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
                            handleNextPlayer();
                            router.navigate({ pathname: '/games/WahrheitOderPflicht/routes/choosePage', params: { activity: JSON.stringify(activity), players: JSON.stringify(players) }  })
                        }}
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