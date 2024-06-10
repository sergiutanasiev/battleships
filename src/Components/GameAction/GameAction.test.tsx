import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameAction from './GameAction';

describe('GameAction', () => {
  test('renders input and fire button', () => {
    render(<GameAction handleAction={() => {}} />);
    const input = screen.getByTestId('move-input');
    const button = screen.getByText('FIRE');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('call handleAction with value', () => {
    const handleActionMock = jest.fn();
    render(<GameAction handleAction={handleActionMock} />);
    const input = screen.getByTestId('move-input');
    const button = screen.getByText('FIRE');

    fireEvent.change(input, { target: { value: 'A1' } });
    fireEvent.click(button);

    expect(handleActionMock).toHaveBeenCalledWith('A1');
  });

});