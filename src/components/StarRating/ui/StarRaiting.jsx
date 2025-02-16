import React, { useState } from 'react'
import Star from './Star'

const StarRaiting = () => {
    const [tempRating, setTempRating] = useState(0);
    const [rating, setRating] = useState(0);

    return (
            <div
            style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            }}
        >
            <div
            style={{
                display: "flex",
            }}
            >
                {/* 
                    создай массив из 10 объектов
                    _ - не пользуемся
                */}
                {Array.from({length:10},(_,ind)=>
                    <Star 
                        onMark={setRating} 
                        key={ind} 
                        fill={(ind < tempRating) || ind < rating ? "gold" : "transparent"} 
                        ind={ind} 
                        onHover={setTempRating}/>
                )}
            
            </div>
            {/* жизненые цыклы напомнить*/}
            <span
            style={{
                marginLeft: "10px",
                verticalAlign: "5px",
                color: "white",
            }}
            >
            {tempRating || rating}/10
            </span>
        </div>
    )
}

export default StarRaiting