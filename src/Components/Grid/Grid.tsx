import React, { useEffect, useMemo, useState } from 'react';
import './Grid.css';

type GridProps = {
  currentShot: string
}

// Map with the grid format
const gridMap = new Map([
    [1, 'A'],
    [2, 'B'],
    [3, 'C'],
    [4, 'D'],
    [5, 'E'],
    [6, 'F'],
    [7, 'G'],
    [8, 'H'],
    [9, 'I'],
    [10, 'J']
  ]);

  const arr = [['A1', 'A2'], ['B1', 'B2']]

  const Grid: React.FC<GridProps> = ({ currentShot }) => {
    const [stateMoves, setStateMoves] = useState<{ [key: string]: string }>({});
  
    const checkMoveType = (move: string) => {
      return arr.some((subArr) => subArr.includes(move)) ? 'hit' : 'miss';
    };
  
    useEffect(() => {
      if (currentShot.length > 0) {
        setStateMoves((prevMoves) => ({ ...prevMoves, [currentShot]: checkMoveType(currentShot) }));
      }
    }, [currentShot]);
  
    const drawGridCell = useMemo(() => {
      return (rowValue: string, colKey: number) => (
        <div className={`grid_cell ${rowValue + colKey in stateMoves ? stateMoves[rowValue + colKey] : ''}`} key={colKey}>
          {rowValue + colKey}
        </div>
      );
    }, [currentShot, stateMoves]);
  
    return (
      <div id="grid">
        {Object.values(stateMoves)} {Object.keys(stateMoves)}
        {Array.from(gridMap, ([rowKey, rowValue]) => (
          <div className="grid_row" key={rowKey}>
            {Array.from(gridMap, ([colKey]) => drawGridCell(rowValue, colKey))}
          </div>
        ))}
      </div>
    );
  };

export default Grid;