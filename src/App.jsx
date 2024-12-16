import React, { useState, useEffect } from "react";

const App = () => {
  const [x, setx] = useState(100);
  const [y, sety] = useState(100);
  const [direction, setDirection] = useState(null);
  const [Arr, setArr] = useState([]);
  const [score, setscore] = useState(2);
  const [food_x, setfood_x] = useState(150);
  const [food_y, setfood_y] = useState(150);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && direction !== "down") setDirection("up");
    if (e.key === "ArrowDown" && direction !== "up") setDirection("down");
    if (e.key === "ArrowLeft" && direction !== "right") setDirection("left");
    if (e.key === "ArrowRight" && direction !== "left") setDirection("right");
  };
  const foodCollieded = () => {
    if(x >=  food_x -10 && x <= food_x + 10 && y >=food_y -10  && y<= food_y + 10){
      return true;
    }else
    return false;
  }
  const snake_Collided = (newX , newY) => {
    Arr.map(e=>{
      if(e[0] == newX && e[1] == newY){
        setscore(0)
        setx(100)
        sety(100)
        setArr([])
      }
    })
  }
  
  useEffect(() => {
    const moveSnake = () => {
      if(Arr.length > score){
        Arr.splice(0,1)
      }
      let newX = x;
      let newY = y;
      if (direction === "up") newY -= 8;
      if (direction === "down") newY += 8;
      if (direction === "left") newX -= 8;
      if (direction === "right") newX += 8;
      if (newX < 0) newX = 400-8; 
      if (newX > 400 - 8) newX = 0; 
      if (newY < 0) newY = 400 -8; 
      if (newY > 400 -8) newY = 0; 
      snake_Collided(newX , newY)
      setx(newX);
      sety(newY);
      setArr((prevArr) => [...prevArr, [newX, newY]]);

    };
    const intervalId = setInterval(() => {
      if(foodCollieded()){
        setfood_x(Math.floor(Math.random() * 392) + 8);
        setfood_y(Math.floor(Math.random() * 392) + 8);
        setscore(score + 1);
      }
      if (direction) moveSnake();
    }, 100);

    return () => clearInterval(intervalId);
  }, [direction, x, y]);

  return (
    <>
      <div className="flex items-center flex-col justify-center h-screen w-screen bg-gray-100">
        <h1 className="font-bold text-4xl mb-4 text-blue-600">Snake Game in React</h1>
        <input
          className="absolute opacity-0"
          autoFocus
          type="text"
          onKeyDown={handleKeyDown}
        />
        <p className="text-center text-xl mb-4 text-gray-700 font-semibold">Score: {score}</p>

        <div className="relative border-4 border-gray-800 rounded-lg w-[400px] h-[400px] bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg">
          {/* Snake */}
          <div
            style={{ left: x, top: y }}
            className="absolute w-[8px] h-[8px] bg-gradient-to-br from-green-400 to-blue-500 rounded-lg "
          ></div>

          {Arr.map((pos, index) => (
            <div
              key={index}
              style={{ left: pos[0], top: pos[1] }}
              className="absolute w-[8px] h-[8px] bg-gradient-to-br from-green-400 to-blue-500 rounded-lg "
            ></div>
          ))}

          {/* Food */}
          <div
            style={{ left: food_x, top: food_y }}
            className="absolute w-[8px] h-[8px] bg-pink-500 rounded-lg shadow-lg"
          ></div>
        </div>
      </div>
    </>
  );
};

export default App;