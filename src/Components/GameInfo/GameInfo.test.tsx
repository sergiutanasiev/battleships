import React from 'react';
import { render } from '@testing-library/react';
import GameInfo from './GameInfo';

describe('GameInfo', () => {
  test('renders battleship and destroyer sizes correctly', () => {
    const { getAllByTestId } = render(<GameInfo />);
    const battleshipSizes = getAllByTestId('battleship-size');
    const destroyerSizes = getAllByTestId('destroyer-size');

    expect(battleshipSizes.length).toBe(5);
    expect(destroyerSizes.length).toBe(4);
  });
});