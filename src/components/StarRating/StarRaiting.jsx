import React from 'react'
import Star from './Star'

const StarRaiting = () => {
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
                {Array.from({length:10},(_,ind)=><Star key={ind}/>)}
            
            </div>
            {/* жизненые цыклы напомнить*/}
            <span
            style={{
                marginLeft: "10px",
                verticalAlign: "5px",
                color: "white",
            }}
            >
            10/10
            </span>
        </div>
    )
}

export default StarRaiting