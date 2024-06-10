type GameState = 'idle' | 'active' | 'finished';

type Action = { type: 'START_GAME' } | { type: 'FINISH_GAME' };

interface State {
    gameState: GameState;
}

export type {
    GameState,
    Action,
    State
}