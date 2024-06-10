import React, { useEffect, useMemo, useState, useRef } from 'react';
import './Grid.css';
import GridMap from '../../Utils/GridMap';
import { GridProps } from './Grid.types';

const Grid: React.FC<GridProps> = ({ currentShot, mappedShips, handleHitMovesResponse }) => {
  const [stateMoves, setStateMoves] = useState<{ [key: string]: string }>({});
  const prevMappedShips = useRef<string[][][]>([]);

  const checkMoveType = (move: any) => {
    const isMoveAHit = mappedShips.some((arr) => arr.includes(move));
    if (isMoveAHit) {
      handleHitMovesResponse(1);
      return 'hit';
    }
    return 'miss';
  };

  useEffect(() => {
    if (currentShot.length > 0) {
      setStateMoves((prevMoves) => ({ ...prevMoves, [currentShot]: checkMoveType(currentShot) }));
    }
  }, [currentShot]);

  useEffect(() => {
    if (prevMappedShips.current !== mappedShips) {
      prevMappedShips.current = mappedShips;
      setStateMoves({});
    }
  }, [mappedShips]);

  const drawGridCell = useMemo(() => {
    return (rowValue: string, colKey: number) => (
      <div
        data-testid="grid-cell"
        className={`grid_cell ${rowValue + colKey in stateMoves ? stateMoves[rowValue + colKey] : ''}`}
        key={colKey}
      >
        {rowValue + colKey}
      </div>
    );
  }, [currentShot, stateMoves, mappedShips]);

  return (
    <div id="grid" data-testid="grid">
      {Array.from(GridMap, ([rowKey, rowValue]) => (
        <div className="grid_row" key={rowKey}>
          {Array.from(GridMap, ([colKey]) => drawGridCell(rowValue, colKey))}
        </div>
      ))}
    </div>
  );
};

export default Grid;