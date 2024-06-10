import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

describe('Game component', () => {
  test('renders start game button when game state is idle', () => {
    const { getByText } = render(<Game />);
    const startGameButton = getByText((content, element) => {
      return element!.tagName.toLowerCase() === 'button' && content.includes('New Game');
    });
    expect(startGameButton).toBeInTheDocument();
  });

});