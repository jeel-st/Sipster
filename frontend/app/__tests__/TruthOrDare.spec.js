//Imports 
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react-native';
import WahrheitoderPflicht from '../games/WahrheitOderPflicht/WahrheitOderPflichtGame'



const mockActivity = {
    game:'WahrheitOderPflicht', 
    user: 'User', 
    taggedFriends: ['Friend1', 'Friend2', 'Friend3'],
  };
  
describe('TruthOrDare', () => {

    it('renders correctly and add an player', () => {
        render( <WahrheitoderPflicht activity={mockActivity} /> );
        const inputElement = screen.getByPlaceholderText('Player Name');
        const buttonElement = screen.getByTestId('Start Button');

        expect(inputElement).toBeTruthy;
        expect(buttonElement).toBeTruthy;

        fireEvent.changeText(inputElement, 'Player 1');
        fireEvent(inputElement, 'submitEditing');

        const playerElement = screen.getByText('Player 1');

        expect(playerElement).toBeTruthy;

    });  
  });
  