// Imports 
import { useState } from 'react';
import { View,Text } from 'react-native';
import classNames from './classNames';
import currentPlayer from '../constants/currentPlayers';


/* 
handles everything that has to do with players

*/


export function player(){

    const [inputValue, setInputValue] = useState('');
    const [players, setPlayers] = useState([]);
    const[list, setList] = useState(null);


    /* 
    sets the input that is entered  
    
    @param text: string -> input
    */
    const handleInputChange = (text) => {
        setInputValue(text);
    };


    /* 
    add new player to the players array and call handleList 
    @param newPlayers: array -> all player Names
    */
   const handlePlayer = () =>{
        const newPlayers = [...players, inputValue];
        setPlayers(newPlayers);
        setInputValue('');
        console.log(newPlayers);
        handleList(newPlayers);
   }


   /* 
   updates the list that is displayed  
   @param newPlayers: array -> with all Player names 
   */
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


   /* 
   clear and save all players in the currentPlayer array   
   @param currentPlayer: array -> array with all Players that Play this round 
   */
   const handleAllPlayer = () => {
      currentPlayer.splice(0,currentPlayer.length);
      console.log(currentPlayer);
      currentPlayer.push(...players);
   }



   
        


   return{handleInputChange, handlePlayer, players, inputValue, list, handleAllPlayer}
}