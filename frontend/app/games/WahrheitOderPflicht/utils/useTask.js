// Imports
import { useEffect, useState } from 'react';
import dare from '../constants/dare';
import truth from '../constants/truth';

/*
  handles everything that has to do with players
*/
export function useTask() {
  const [dareTask, setDareTask] = useState('');
  const [truthTask, setTruthTask] = useState([]);


  useEffect(() => {
    handleDareTask();
    handleTruthTask();
  }, [dare, truth]);
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