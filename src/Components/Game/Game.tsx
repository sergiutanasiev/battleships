import Grid from "../Grid/Grid";
import GameAction from "../GameAction/GameAction";
import GameInfo from "../GameInfo/GameInfo";
import { useReducer, useState } from "react";


type GameState = 'idle' | 'active' | 'finished';

type Action = { type: 'START_GAME' } | { type: 'FINISH_GAME' };

interface State {
    gameState: GameState;
}

const initialState:State = {
    gameState: 'active'
}

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
    const [countShots, setCountShots] = useState<number>(0);
    const [currentShot, setCurrentShot] = useState<string>("");

    const handleStartGame = () => {
        dispatch({type: 'START_GAME'});
    }

    const handleShots = (gridValue: string) => {
        setCountShots(countShots + 1);
        setCurrentShot(gridValue);
    }

    return (
        <div className="game">
            {countShots} - {currentShot}
            {state.gameState === 'idle' && (
                <button onClick={handleStartGame}>Start New Game</button>
            )}
            {(state.gameState === 'active' || state.gameState === 'finished') && (
            <>
                {state.gameState === 'active' ? (
                    <GameAction handleAction={handleShots} />
                ) : (
                    <button onClick={handleStartGame}>Start New Game</button>
                )}
                
                <Grid currentShot={currentShot} />
                <GameInfo />
            </>
            )}
        </div>
    );
}

export default Game;