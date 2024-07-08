// Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

/*
  handles everything that has to do with players
*/
export function useNext(players) {
  const router = useRouter();
  const [nextPlayer, setNextPlayer] = useState('');

  console.log(players + " players")

  useEffect(() => {
    handleNextPlayer();
  }, [players]);

  const handleNextPlayer = () =>{
    const randomIndex = Math.floor(Math.random() * players.length);
    setNextPlayer(players[randomIndex])
    console.log(players[randomIndex] + " ein Spieler")
  }

  
  console.log(nextPlayer + " weitergegebener Spieler")

  return { router, players, nextPlayer, handleNextPlayer }
}