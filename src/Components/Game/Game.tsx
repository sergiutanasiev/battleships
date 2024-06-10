import React, { useEffect, useReducer, useState } from "react";
import Grid from "../Grid/Grid";
import GameAction from "../GameAction/GameAction";
import GameInfo from "../GameInfo/GameInfo";
import shipGenerator from "../../Utils/ShipGenerator";
import "./Game.css";
import { Action, State } from "./Game.types";

const initialState: State = {
  gameState: 'idle'
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_GAME':
      return { gameState: 'active' };
    case 'FINISH_GAME':
      return { gameState: 'finished' };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [countMoves, setCountMoves] = useState<number>(0);
  const [currentMove, setCurrentMove] = useState<string>("");
  const [mappedShips, setMappedShips] = useState<string[][][]>([]);
  const [hitMoves, setHitMoves] = useState<number>(0);
  const [necessaryHitMoves, setNecessaryHitMoves] = useState<number>(0);

  useEffect(() => {
    if (mappedShips.length === 0) {
      setMappedShips(shipGenerator());
    } else {
      setNecessaryHitMoves(mappedShips.flat().length);
    }
  }, [mappedShips]);

  const handleStartGame = () => {
    setCountMoves(0);
    setCurrentMove("");
    setMappedShips([]);
    setHitMoves(0);
    setNecessaryHitMoves(0);
    dispatch({ type: 'START_GAME' });
  };

  const handleMoves = (gridValue: string) => {
    setCountMoves((prevCountMoves) => prevCountMoves + 1);
    setCurrentMove(gridValue);
  };

  const handleHitMoves = (value: number) => {
    setHitMoves((prevHitMoves) => prevHitMoves + value);

    if (hitMoves + value === necessaryHitMoves) {
      dispatch({ type: 'FINISH_GAME' });
    }
  };

  return (
    <div className="game">
      {state.gameState === 'idle' && (
        <div className="state-menu">
          <button className="start-game" onClick={handleStartGame}>
            New Game
          </button>
        </div>
      )}
      {state.gameState === 'active' && <GameAction handleAction={handleMoves} />}
      {state.gameState === 'finished' && (
        <div className="state-menu">
          <p>You finished the game in {countMoves} moves</p>
          <button className="start-game" onClick={handleStartGame}>
            Play Another Game
          </button>
        </div>
      )}
      <Grid
        handleHitMovesResponse={handleHitMoves}
        mappedShips={mappedShips}
        currentShot={currentMove}
      />
      <GameInfo />
    </div>
  );
};

export default Game;