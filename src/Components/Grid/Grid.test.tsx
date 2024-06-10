import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

describe('Grid component', () => {
  test('render grid', () => {
    render(<Grid currentShot="" mappedShips={[]} handleHitMovesResponse={() => {}} />);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  test('displays grid cells correctly expect to be 100', () => {
    const currentShot = 'A1';
    const mappedShips = [['C8', 'D8', 'E8', 'F8', 'G8'], ['D3', 'D4', 'D5', 'D6']];
    const handleHitMovesResponse = jest.fn();

    render(
      <Grid
        currentShot={currentShot}
        /* @ts-ignore */
        mappedShips={mappedShips}
        handleHitMovesResponse={handleHitMovesResponse}
      />
    );

    const gridCells = screen.getAllByTestId('grid-cell');
    expect(gridCells.length).toBe(100);
  });
});