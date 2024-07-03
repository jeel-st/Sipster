// Imports
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import dare from '../constants/dare';
import truth from '../constants/truth';

/*
  handles everything that has to do with players
*/
export function useTask() {
  const [dareTask, setDareTask] = useState('');
  const [truthTask, setTruthTask] = useState([]);

  useEffect(() => {
    const taggedFriends = activity.taggedFriends.map(friend => friend.fullName)
    taggedFriends.push(activity.user.fullName);
    setPlayers(taggedFriends);
  }, [activity]);

  /*
    sets the input that is entered
    @param text: string -> input
  */
  const handleDareTask = () => {
    const randomIndex = Math.floor(Math.random() * dare.length);
    setDareTask(dare[randomIndex]);
  };

  const handleTruthTask = () => {
    const randomIndex = Math.floor(Math.random() * truth.length);
    setTruthTask(truth[randomIndex]);
  };

  return { handleDareTask, handleTruthTask, dareTask, truthTask  }
}