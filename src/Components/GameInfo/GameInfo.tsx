import React, {useState} from 'react';
import './GameInfo.css';

const destoryerSize = 4;
const battleshipSize = 5;

const GameInfo = () => {
    const [countBattleships, setCountBattleships] = useState<number>(1);
    const [countDestroyers, setCountDestroyers] = useState<number>(2);

    return (
        <div className='game-info'>
            <h3>Ships to find</h3>
            <div className='game-info-ships'>
                <div className='game-info-ship'>x{countBattleships}
                    <span>Battleships</span>
                    <div className="battleship-size">
                        {Array(battleshipSize).fill(null).map((_, idx) => (
                            <div key={idx}></div>
                        ))}
                    </div>
                </div>
                <div className='game-info-ship'>x{countDestroyers}
                    <span>Destroyers</span>
                    <div className='destroyer-size'>
                        {Array(destoryerSize).fill(null).map((_, idx) => (
                            <div key={idx}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameInfo;