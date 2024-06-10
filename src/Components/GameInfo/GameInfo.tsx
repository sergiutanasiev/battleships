import './GameInfo.css';

const destoryerSize = 4;
const battleshipSize = 5;

const GameInfo = () => {

    return (
        <div className='game-info'>
            <h3>Ships to find</h3>
            <div className='game-info-ships'>
                <div className='game-info-ship'>1
                    <span>Battleships</span>
                    <div className="battleship-size">
                        {Array(battleshipSize).fill(null).map((_, idx) => (
                            <div data-testid="battleship-size" key={idx}></div>
                        ))}
                    </div>
                </div>
                <div className='game-info-ship'>2
                    <span>Destroyers</span>
                    <div className='destroyer-size'>
                        {Array(destoryerSize).fill(null).map((_, idx) => (
                            <div data-testid="destroyer-size" key={idx}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameInfo;