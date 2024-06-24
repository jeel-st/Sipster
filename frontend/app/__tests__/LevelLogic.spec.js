// Imports
import React from 'react';
import { render } from '@testing-library/react-native';
import { useAccount } from '../utils/hooks/useAccount';
import { useUser } from '../utils/hooks/useUser';
import { userLog } from '../utils/logger/config';

/*
This file tests useAccount.js, which contains the logic for calculating levels and levelinfo.
Type: Test file
*/

// Mock the useUser hook
jest.mock('../utils/hooks/useUser');

// Mock the logger
jest.mock('../utils/logger/config', () => ({
  userLog: {
    info: jest.fn(),
  },
}));

// Helper component to test useAccount hook
const TestComponent = () => {
  const { level, levelInfo } = useAccount();
  return (
    <div>
      <span testID="level">{level}</span>
      <span testID="levelInfo">{JSON.stringify(levelInfo)}</span>
    </div>
  );
};

describe('useAccount Hook Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Integration test / postive case -> Testing both functions
  test('calculate level correctly when user has sips', () => {
    useUser.mockReturnValue({ sips: 300 });

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('level').props.children).toBe('3');
    expect(getByTestId('levelInfo').props.children).toEqual(JSON.stringify({
      image: require('../assets/images/level3.png'),
      header: 'Nice progress!',
      text: "You're doing well.",
    }));
    expect(userLog.info).toHaveBeenCalledWith("The user is in level 3");
  });

  // Testing the null case -> negativ case
  test('handle null user object', () => {
    useUser.mockReturnValue(null);

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('level').props.children).toBe('');
    expect(getByTestId('levelInfo').props.children).toEqual('{}')
  });

  // Testing zero sips -> negativ case
  test('handle no sips', () => {
    useUser.mockReturnValue({});

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('level').props.children).toBe('0');
    expect(getByTestId('levelInfo').props.children).toEqual(JSON.stringify({
      image: require('../assets/images/level0.png'),
      header: 'Perfect,',
      text: "now it can start!",
    }));
  });

  // testing boundary conditions and positive cases
  test('calculate level correctly on boundary conditions', () => {
    const boundaryTests = [
      { sips: 99, expectedLevel: '1' },
      { sips: 100, expectedLevel: '2' },
      { sips: 249, expectedLevel: '2' },
      { sips: 250, expectedLevel: '3' },
      { sips: 499, expectedLevel: '3' },
      { sips: 500, expectedLevel: '4' },
      { sips: 749, expectedLevel: '4' },
      { sips: 750, expectedLevel: '5' },
      { sips: 999, expectedLevel: '5' },
      { sips: 1000, expectedLevel: '6' },
    ];

    boundaryTests.forEach(({ sips, expectedLevel }) => {
      useUser.mockReturnValue({ sips });

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('level').props.children).toBe(expectedLevel);
    });
  });
})
