import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginPage from '../routes/LoginPage';

describe('LoginPage Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    // Check if the input fields are rendered
    expect(getByPlaceholderText('username')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();

    // Check if the button is rendered
    expect(getByText("let's party")).toBeTruthy();
  });

});