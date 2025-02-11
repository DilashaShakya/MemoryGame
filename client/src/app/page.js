'use client'
import React, { useEffect, useState } from 'react'

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

  
      useEffect(() => {
        if (timeLeft > 0) {
            const timeout = setTimeout(() => setTimeLeft(timeLeft - 1), 10000);
            return () => clearTimeout(timeout);
        } else {
            setGameOver(true);
        }
    }, [timeLeft]);
    

      
    const handleClick=(id)=>{ 
      if (gameOver || selectedEmoji.includes(id)) return; 
      
      // Prevent clicking the same box twice

      if (grids[id] === ""){
        setShake(id)
        setTimeout(() => {
          setShake(null)
        }, 500);
        return;
      }
      setSelectedEmoji(prevId => [...prevId, id])
        const tempRevealed = [...revealed]
        tempRevealed[id] = true
        setRevealed(tempRevealed)
    }

    useEffect(()=>{
      if (wins==5){

      }
    },[wins])

    useEffect(()=>{
      if (selectedEmoji.length == 2){
        const [first, second] = selectedEmoji
        if (grids[first]=== grids[second] && first!=second){
          setTimeout(() => {
            setGrids(prevEmoji => prevEmoji.map((item)=> (item == grids[first] || item == grids[second]) ? '': item))
            setWins(wins+1)
          }, 500);
          
        }
        else{
          setTimeout(() => {
            setRevealed(new Array(grids.length).fill(false))
          
          }, 200);
          

        }
        setSelectedEmoji([])
        
      
      
      }
      

    }, [selectedEmoji])
  return (
    <div className=' flex flex-col items-center justify-center mt-6' >
        <h1 className="text-6xl font-extrabold text-green-900 text-center w-full mb-6 drop-shadow-md">
        Welcome to the Game
    </h1>
    <h2 className='text-2xl font-serif bg-gray-200 '> Match 8 icons with each other with a time limit and win the game!</h2>

    {gameOver ? (<h2>Game Over! </h2>):
     <>
     <h2 className='font-semibold text-3xl '>Win count: {wins}</h2>
    {/* available items: {grids.toString()}
    <br/>
    revealed grids: {JSON.stringify(revealed)}
    <br/>
    selected Emojis : {selectedEmoji.toString()} */}
    <div className="w-64 bg-gray-300 h-6 rounded-full overflow-hidden mt-4">
    <div 
        className="h-full bg-red-500 transition-all duration-1000" 
        style={{ width: `${(timeLeft / 30) * 100}%` }} 
    />
</div>
<h3 className="text-2xl font-bold text-red-600 mt-2">
    ⏳ {timeLeft}s
</h3>

    <div className='grid grid-cols-4 justify-center mt-0'>
        {grids.map((item, id)=>{
            return(
            <div onClick={()=>handleClick(id)} key={id} className={`w-40 h-40 text-8xl m-6 shadow-lg text-center p-5 bg-yellow-200 rounded-2xl cursor-pointer ${shake === id ? 'animate-wiggle bg-red-400' : ''}`} >
              {revealed[id] && item}
            </div>

                        )
                      
        })}
        
    </div>
    </>}
    
    </div>
   
  )
}

export default Unclicked;