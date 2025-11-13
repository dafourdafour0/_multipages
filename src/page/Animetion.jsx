import React, { useState, useEffect, useCallback } from 'react'
import football from '../img/football.jpg'
import bas from '../img/basketball.png'
import voleyball from '../img/voley.jpg'
import person from '../img/person.jpg'
import animeImg from '../img/Saku Natsusawa.jpg'
import logo from '../img/logo.jpg'



// --- Constants ---
const FIELD_WIDTH = 650;
const FIELD_HEIGHT = 400;
const BALL_DIAMETER = 150;
const VX = 10;
const VY = 10;
const FRAME_RATE_MS = 25;

const MAX_X = FIELD_WIDTH - BALL_DIAMETER - 2;
const MAX_Y = FIELD_HEIGHT - BALL_DIAMETER - 2;

const IMAGE_PATHS = {
    basketball: bas,
    football: football,
    voley: voleyball,
    human: person,
    anime: animeImg,
    logo: logo,
};

const BUTTON_MAP = [
    { id: 'none', label: 'None', key: '0' },
    { id: 'basketball', label: 'Basketball', key: '1' },
    { id: 'football', label: 'Football', key: '2' },
    { id: 'voley', label: 'Voleyball', key: '3' },
    { id: 'human', label: 'Person', key: '4' },
    { id: 'anime', label: 'Cartoon', key: '5' },
    { id: 'logo', label: 'Logo', key: '6' },
];

const Animation = () => {
    // --- State Management ---
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [running, setRunning] = useState(false);
    const [lastSelected, setLastSelected] = useState('none');

    // --- Derived State for Ball Styling ---
    const ballStyle = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${BALL_DIAMETER}px`,
        height: `${BALL_DIAMETER}px`,
        backgroundColor: lastSelected === 'none' ? 'lightgray' : '',
        backgroundImage: lastSelected !== 'none' ? `url(${IMAGE_PATHS[lastSelected]})` : 'none',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
    };

    const fieldStyle = {
        width: `${FIELD_WIDTH}px`,
        height: `${FIELD_HEIGHT}px`,
        position: 'relative',
        border: '1px solid #ccc',
    };

    // --- Logic Functions ---

    const calculate = useCallback(() => {
        setX(prevX => {
            let newX = goRight ? prevX + VX : prevX - VX;

            if (goRight) {
                if (newX >= MAX_X) {
                    newX = MAX_X; // CLAMP FIX: Ensures position is exactly on the edge
                    setGoRight(false);
                }
            } else { // goLeft
                if (newX <= 0) {
                    newX = 0; // CLAMP FIX: Ensures position is exactly on the edge
                    setGoRight(true);
                }
            }
            return newX;
        });

        setY(prevY => {
            let newY = goDown ? prevY + VY : prevY - VY;
            
            if (goDown) {
                if (newY >= MAX_Y) {
                    newY = MAX_Y; // CLAMP FIX: Ensures position is exactly on the edge
                    setGoDown(false);
                }
            } else { // goUp
                if (newY <= 0) {
                    newY = 0; // CLAMP FIX: Ensures position is exactly on the edge
                    setGoDown(true);
                }
            }
            return newY;
        });
    }, [goRight, goDown]);

    const runClick = () => {
        setRunning(prevRunning => !prevRunning);
    };

    const handleBallClick = (id) => {
        setLastSelected(id);
    };

    // --- Effects (Animation Loop and Keyboard) ---

    // Animation Loop
    useEffect(() => {
        let intervalId;
        if (running) {
            intervalId = setInterval(() => {
                calculate();
            }, FRAME_RATE_MS);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [running, calculate]);

    // Keyboard Events
    useEffect(() => {
        const handleKeyDown = (event) => {
            let newId = null;
            switch (event.key) {
                case " ":
                    event.preventDefault();
                    runClick();
                    break;
                case "0": newId = 'none'; break;
                case "1": newId = 'basketball'; break;
                case "2": newId = 'football'; break;
                case "3": newId = 'voley'; break;
                case "4": newId = 'person'; break;
                case "5": newId = 'anime'; break;
                case "6": newId = 'logo'; break;
                default: return;
            }
            if (newId) {
                handleBallClick(newId);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // --- Render Logic ---

    const getButtonClass = (id) => {
        if (id === 'none') {
            return id === lastSelected ? 'btn-secondary' : 'btn-outline-secondary';
        }
        return id === lastSelected ? 'btn-primary' : 'btn-outline-primary';
    };

    return (
        <div className="container mt-5">
            {/* Field and Ball Container */}
            <div id="field" className="field" style={fieldStyle}>
                <div id="ball" className="ball" style={ballStyle}></div>
            </div>
            
            {/* Controls Section */}
            <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                {/* Run/Pause Button */}
                <button
                    id="Run"
                    onClick={runClick}
                    className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
                >
                    <span className="bi bi-play"></span>&nbsp;{running ? 'Pause' : 'Run'}
                </button>

                {/* Ball Selection Buttons */}
                <div className="d-flex flex-wrap gap-2">
                    {BUTTON_MAP.map((button) => (
                        <button
                            key={button.id}
                            id={button.id}
                            className={`btn ${getButtonClass(button.id)}`}
                            onClick={() => handleBallClick(button.id)}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Animation