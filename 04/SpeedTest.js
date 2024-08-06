import React, { useEffect, useRef, useState } from 'react';
import useRandomItem from './hook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [inputText, setInputText] = useState('');
    const [time, setTime] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const inputRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        regenerateWord();
    }, []);

    const handleFocus = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const handleBlue = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => {
        if (inputText === word) {
            setTotalChars((prevTotal) => prevTotal + word.length);
            setInputText('');
            regenerateWord();
        }
    }, [inputText, word]);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    return (
        <div>
            <h1>{word}</h1>
            <input
                ref={inputRef}
                value={inputText}
                onFocus={handleFocus}
                onBlur={handleBlue}
                onChange={(e) => setInputText(e.target.value)}
            />
            <p>Time: {time}</p>
            <p>Total chars typed: {totalChars}</p>
        </div>
    );
}

export default SpeedTest;
