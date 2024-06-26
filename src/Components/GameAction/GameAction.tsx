import {useRef, useState} from 'react';
import './GameAction.css';

const regex = /^[A-Ja-j](10|[1-9])$/;
const initialActionState = new Set();

const GameAction = ({handleAction}: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isValidInput, setIsValidInput] = useState<boolean>(true);
    const [actionState, setActionState] = useState(initialActionState);
    const [error, setError] = useState('');

    const handleClick = () => {
        if (inputRef.current) {
            setError("");
            const value = inputRef.current.value;
            const isValid = regex.test(value);
            
            if (!isValid) {
                setIsValidInput(isValid);
                setError('Use a valid format (A-J and a number 1-10). ex: A5');
                return; 
            }
            if (isValid && actionState.has(value)) {
                setIsValidInput(!isValid);
                setError(`${value} is a duplicated move`);
                return;
            }
            handleAction(inputRef.current.value.toUpperCase());
            setActionState(new Set([...actionState, value]));
            inputRef.current.value = '';
        }
    }

    return (
        <div className='game-action'>
            <input maxLength={3} placeholder='Your move...ex: A5' data-testid="move-input" className='move-cell' ref={inputRef} type="text" />
            <button onClick={handleClick}>FIRE</button>
            <span className='error'>{!isValidInput && <span>{error}</span>}</span>
        </div>
    )
}

export default GameAction;