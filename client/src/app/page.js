'use client'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

const Unclicked = () => {
    const [grids, setGrids] = useState([
      '😺','🐎', '🥤', '🦈' ,
        '🦈', '🪲', '🍓', '😺',
        '🥤', '🐎', '🪲', '🍓',
    ])
    const [revealed, setRevealed] = useState(new Array(grids.length).fill(false)) 
    const [selectedEmoji, setSelectedEmoji] = useState([])
    const [wins, setWins] = useState(0);
    const [shake, setShake] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const wrongSound = new Audio('/sounds/wrong.mp3');
    const correctSound = new Audio('/sounds/correct.mp3');
    const winSound = new Audio('sounds/win.mp3');
    const loseSound = new Audio('sounds/lose.mp3')


    useEffect(() => {
    if (wins === 6 && !gameOver) {
        winSound.play();
    }
    else{
        if (gameOver){
            loseSound.play();
        }
    }
    }, [wins, gameOver]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft > 0 && wins < 8) {
            const timeout = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
            return () => clearTimeout(timeout);
        } else {
            setGameOver(true);
        }
    }, [timeLeft, wins]);

    const handleClick = (id) => { 
        if (gameOver || selectedEmoji.includes(id)) return; 

        if (grids[id] === ""){
            setShake(id);
            setTimeout(() => setShake(null), 500);
            return;
        }

        setSelectedEmoji(prevId => [...prevId, id]);
        const tempRevealed = [...revealed];
        tempRevealed[id] = true;
        setRevealed(tempRevealed);
    }

    useEffect(() => {
        if (selectedEmoji.length === 2) {
            const [first, second] = selectedEmoji;
            if (grids[first] === grids[second] && first !== second) {
                setTimeout(() => {
                    setGrids(prevEmoji => prevEmoji.map((item, index) => 
                        (index === first || index === second) ? '' : item
                    ));
                    setWins(prevWins => prevWins + 1); // ✅ Fixes state update
                }, 500);
                correctSound.play();
            } else {
                setTimeout(() => setRevealed(new Array(grids.length).fill(false)), 200);
                wrongSound.play();

            }
            setSelectedEmoji([]);
        }
    }, [selectedEmoji]);

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);


    const handleRestart=()=>{
        const resetGrids = [
        '😺','🐎', '🥤', '🦈' ,
        '🦈', '🪲', '🍓', '😺',
        '🥤', '🐎', '🪲', '🍓',
        ];
        setGrids(shuffle(resetGrids));

        setRevealed(new Array(resetGrids.length).fill(false));
        setSelectedEmoji([]);
        setWins(0);
        setShake(null);
        setTimeLeft(30);
        setGameOver(false);


    };

    return (
        <div className='flex flex-col items-center justify-center mt-6 relative'>

            {/* Confetti Effect when user wins */}
            {wins === 6 && <Confetti />}

            <h1 className="text-6xl font-extrabold text-green-900 text-center w-full mb-6 drop-shadow-md">
                {wins === 6 ? "🎉 YOU WIN! 🎉" : "Welcome to the Game"}
            </h1>

            <h2 className='text-2xl font-serif bg-gray-200 p-2 m-2'>
                Match 6 icons before time runs out and win the game!
            </h2>

            {gameOver ? (
                <>
                <h2 className="text-4xl font-bold text-red-600 mt-4">
                    {wins === 6 ? "🏆 Congratulations! You Won! 🏆" : "⏳ Game Over!"}
                </h2>
                <button onClick = {handleRestart} className='p-6 m-8 text-center items-center font-bold text-2xl border-2 rounded-3xl bg-red-200 text-gray-800 hover:bg-red-400'> Restart </button>
                </>
            ) : (
                <>
                    <h2 className='font-semibold text-3xl m-4'>Win count: {wins}/6</h2>

                    {/* 🕒 Timer Progress Bar */}
                    <div className="w-64 bg-gray-300 h-6 rounded-full overflow-hidden mt-4">
                        <div 
                            className="h-full bg-red-500 transition-all duration-1000" 
                            style={{ width: `${(timeLeft / 30) * 100}%` }} 
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 mt-2">
                        ⏳ {timeLeft}s
                    </h3>

                    {/* 🎭 Game Grid */}
                    <div className='grid grid-cols-4 justify-center mt-0'>
                        {grids.map((item, id) => (
                            <div 
                                key={id} 
                                onClick={() => handleClick(id)} 
                                className={`w-40 h-40 text-8xl m-6 shadow-lg text-center p-5 bg-yellow-200 rounded-2xl cursor-pointer 
                                    ${shake === id ? 'animate-wiggle bg-red-400' : ''}`}
                            >
                                {revealed[id] && item}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Unclicked;
