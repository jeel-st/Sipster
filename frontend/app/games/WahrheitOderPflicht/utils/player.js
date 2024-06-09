import { useState } from 'react';
import { View,Text } from 'react-native';
import classNames from './classNames';
import currentPlayer from '../constants/currentPlayers';



export function player(){

    const [inputValue, setInputValue] = useState('');
    const [players, setPlayers] = useState([]);
    const[list, setList] = useState(null);


    const handleInputChange = (text) => {
        setInputValue(text);
    };



   const handlePlayer = () =>{
        const newPlayers = [...players, inputValue];
        setPlayers(newPlayers);
        setInputValue('');
        console.log(newPlayers);
        handleList(newPlayers);
   }

   const handleList = (newPlayers) => {
    console.log('Liste handel');
    console.log(newPlayers);
    if (newPlayers.length === 0) {
        setList(
          <View>
            <Text>Test</Text>
          </View>
        );
      } else {
        setList(
          <View>
            {newPlayers.map((player, index) => (
              <Text className={classNames('font-bold text-l text-white')} key={index}>
                {player}
              </Text>
            ))}
          </View>
        );
      } 
   }

   const handleAllPlayer = () => {
      currentPlayer.splice(0,currentPlayer.length);
      console.log(currentPlayer);
      currentPlayer.push(...players);
   }



   
        


   return{handleInputChange, handlePlayer, players, inputValue, list, handleAllPlayer}
}