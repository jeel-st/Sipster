import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import classNames from '../WahrheitOderPflicht/utils/classNames'
import { router } from 'expo-router';
import { TextInput } from 'react-native';
import { useState } from 'react';





export default function WahrheitOderPflichtGame() {

   const [inputValue, setInputValue] = useState('');
   const [players, setPlayers] = useState([]);

   const handleInputChange = (text) => {
     setInputValue(text);
   };

   const handleSubmit = () => {
        const newPlayers = [...players, inputValue];
        setPlayers(newPlayers);
        setInputValue('');
    // Hier kannst du den Wert der Variable inputValue verwenden
       console.log('Eingegebener Wert:', inputValue);
       console.log(players);
   };


   const PlayerList = ({players})=> {


    if (!players || players.length === 0) {
        return <View></View>;
      }
    return(
        <View>
            {players.map((player,index) => (
                <View className={classNames(
                    'pl-2 m-1', // spacing 
                    'h-10 w-100%', // sizing
                    'rounded-xl shadow-md shadow-black text-white bg-secondary' // styling
                    )}>
                    <Text className={classNames(
                    'justify-center mt-3 ', // spacing 
                    'h-10 w-64', // sizing
                    ' text-white ' // styling
                    )} key={index} >{player}</Text>
                </View>
            ))}
        </View>
   );};
    



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
                    
                    <PlayerList players={players}/>

                    <TextInput className={classNames(
                    'pl-2 m-1', // spacing 
                    'h-10 w-100%', // sizing
                    'rounded-xl shadow-md shadow-black text-white bg-secondary' // styling
                    )}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmit}
                    placeholder='Player Name' />


                    {/*Namen hinzufügen können  */}
                </ScrollView>


                <View className={classNames(
                'mt-4 mx-20 absolute bottom-4 ')}>
                    <TouchableOpacity className={classNames(
                        'justify-center items-center', // position
                        'px-6 py-4 mt-5', // spacing 
                        'w-[200px]', // sizing
                        'rounded-3xl shadow-md shadow-black bg-yellow' // styling
                        )}
                        onPress={() => {router.navigate('/games/WahrheitOderPflicht/routes/choose')}}
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

