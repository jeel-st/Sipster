// Imports 
import { useState } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import classNames from './classNames';
import currentPlayer from '../constants/currentPlayers';
import { AntDesign } from '@expo/vector-icons';


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
            
          </View>
        );
      } else {
        setList(
          <View>
            {newPlayers.map((player, index) => (
              <View className={classNames(
                      'pl-2 m-1', // spacing 
                      'w-12/12', // sizing
                      'items-center flex-row', //position
                      'rounded-xl shadow-md shadow-black text-white bg-purple' // styling
                      )}>
                      <Text className={classNames('font-bold text-l text-black basis-11/12 ')} key={index}>
                      {player}
                      </Text>
                      <TouchableOpacity
                          onPress={() => { handleDeletPlayer(player)}}
                          className={classNames(
                              ' mr-0.5 items-center basis-1/12')}>

                          <AntDesign name="close" size={20} color="black" />
                      </TouchableOpacity>
              </View>
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



   /* 
   delet Player   
   @param player: string -> player to be deleted
   @param indexToDelet: number -> index from player to be deleted
   @param newArray: array -> array without player to be deleted 
   */


   const handleDeletPlayer = (player) => {
      console.log(player + ' Wer raus soll')
      const indexToDelete = players.indexOf(player);
      console.log(indexToDelete + ' Wer raus soll als index')
      let newArray = [];

      for(let i = 0; i < players.length; i++){
        if(i != indexToDelete){
            newArray.push(players[i])
        }
      }
      if(player != inputValue){newArray.push(inputValue)}
      console.log(newArray + 'neuer Array')
      setPlayers(newArray);
      handleList(newArray);
   }

   
        


   return{handleInputChange, handlePlayer, players, inputValue, list, handleAllPlayer}
}