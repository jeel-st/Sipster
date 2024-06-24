//Import
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../utils/classNames'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import truth from '../constants/truth'
import { quitGame } from '../../../utils/navigator';

/*
truthPage displays the current question

@return -> returns the truthPage components
@param category: string -> the truth question
*/
export default function truthPage() {
    const activity = JSON.parse(useLocalSearchParams().activity);
    const players = JSON.parse(useLocalSearchParams().players);
    const router = useRouter();
    const navigation = useNavigation();

    // Header ausblenden
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const randomIndex = Math.floor(Math.random() * truth.length);
    const category = truth[randomIndex];

    return (
        <View className={classNames(
            'flex-1',//position
            ' bg-primary',//styling
        )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                'flex-row justify-between',//position
                'mt-16 mx-6'//spaceing
            )}>

                {/* Sipster Logo */}
                <Image source={require('../assets/images/logo-small.png')} />

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => quitGame(activity, router)}
                    className={classNames(
                        'justify-center items-center'//position
                    )}>

                    <AntDesign name="close" size={34} color="white" />
                </TouchableOpacity>
            </View>



            <View className={classNames(
                'mt-4 mx-6 '//spaceing
            )}>


                <Text className={classNames(
                    'font-bold text-3xl text-white',//styling
                )}>
                    Wahrheit oder Pflicht
                </Text>


                <View className={classNames(
                    'items-center', // position
                    'mt-6',// spaceing
                    'w-100% h-[450px]', // sizing
                    'bg-yellow rounded-3xl shadow-md shadow-black ', //styling
                )}>
                    <Text className={classNames(
                        'mt-6', //spacing
                        'font-bold text-3xl', //styling
                    )}>
                        Wahrheit
                    </Text>
                    <View className={classNames(
                        ' mt-44 mr-4 ml-4', //spacing
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
                        'rounded-3xl shadow-md shadow-black bg-purple' // styling
                    )}
                        onPress={() => {
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