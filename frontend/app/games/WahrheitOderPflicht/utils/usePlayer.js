// Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

/*
  handles everything that has to do with players
*/
export function usePlayer(activity) {
  const [inputValue, setInputValue] = useState('');
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const [nextPlayer, setNextPlayer] = useState('');

  useEffect(() => {
    if (activity) {
        const taggedFriends = activity.taggedFriends.map(friend => friend.fullName);
        taggedFriends.push(activity.user.fullName);
        setPlayers(taggedFriends);
    }
}, [activity]);

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
  const handlePlayer = () => {
    const newPlayers = [...players, inputValue];
    setPlayers(newPlayers);
    setInputValue('');
  }

  /*
    delete Player
    @param player: string -> player to be deleted
    @param indexToDelet: number -> index from player to be deleted
    @param newArray: array -> array without player to be deleted
  */
  const handleDeletePlayer = (player) => {
    const newPlayers = players.filter(friend => friend !== player);
    setPlayers(newPlayers);
  }

  const handleNextPlayer = () =>{
    const randomIndex = Math.floor(Math.random() * players.length);
    setNextPlayer(players[randomIndex])
  }

  return { handleInputChange, handlePlayer, handleDeletePlayer, players, inputValue, router, players, nextPlayer, handleNextPlayer }
}