import React from 'react';
import LoginPage from '../routes/LoginPage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mocke die Navigation für den Test
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
// Mocke AsyncStorage mit jest.mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  // Füge hier weitere benötigte Methoden hinzu
}));

describe('LoginPage Component', () => {
  
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<NavigationContainer>
      <LoginPage />
    </NavigationContainer>
    );

    // Check if the input fields are rendered
    expect(getByPlaceholderText('username')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();

    // Check if the button is rendered
    expect(getByText("let's party")).toBeTruthy();
  });

});