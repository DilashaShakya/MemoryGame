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

    const handleClick=(id)=>{ 
      if (selectedEmoji.includes(id)) return; // Prevent clicking the same box twice
      setSelectedEmoji(prevId => [...prevId, id])
        const tempRevealed = [...revealed]
        tempRevealed[id] = true
        setRevealed(tempRevealed)
    }

    useEffect(()=>{
      if (selectedEmoji.length == 2){
        const [first, second] = selectedEmoji
        if (grids[first]=== grids[second] && first!=second){
          setTimeout(() => {
            setGrids(prevEmoji => prevEmoji.map((item)=> (item == grids[first] || item == grids[second]) ? '': item))
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
    available items: {grids.toString()}
    <br/>
    revealed grids: {JSON.stringify(revealed)}
    <br/>
    selected Emojis : {selectedEmoji.toString()}
    <div className='grid grid-cols-4 justify-center mt-0'>
        {grids.map((item, id)=>{
            return(
            <div onClick={()=>handleClick(id)} className='w-40 h-40 text-8xl m-6 shadow-lg text-center p-5 bg-yellow-200 rounded-2xl cursor-pointer'>
              {revealed[id] && item}
            </div>

                        )
                      
        })}
        
    </div>
    </div>
   
  )
}

export default Unclicked