// Imports
import React from 'react';
import LoginPage from '../routes/LoginPage';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

/*
This file tests the LoginPage.js
Type: Test file
*/

// Mock the navigation for the test
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock AsyncStorage with jest.mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockImplementation(() => Promise.resolve(null)),
  setItem: jest.fn().mockImplementation(() => Promise.resolve(null)),
}));

// Mock the logger to avoid unwanted console errors
jest.mock('../utils/logger/config', () => ({
  userLog: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('LoginPage Component', () => {

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
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
