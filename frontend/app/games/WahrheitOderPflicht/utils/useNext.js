// Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

/*
  handles everything that has to do with players
*/
export function useNext(players) {
  const router = useRouter();
  const [nextPlayer, setNextPlayer] = useState('');


  useEffect(() => {
    handleNextPlayer();
  }, [players]);

  const handleNextPlayer = () =>{
    const randomIndex = Math.floor(Math.random() * players.length);
    setNextPlayer(players[randomIndex])
  }

  

  return { router, players, nextPlayer, handleNextPlayer }
}