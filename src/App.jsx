import React, { useEffect, useState } from 'react';
import './App.css';
import Field from './Field/Field';
import { fieldSize } from './Field/Setup';
import Controls from './Controls/Controls';
import { startSnake } from './Snake/Snake';
import GameOver from './Field/GameOver';
import Square from './Field/Square';
import Scores from './Scores/Scores';
import { Apple, startApple } from './Apple/Apple';

const size = 'repeat(' + fieldSize + ', 1.5rem)';
const fieldStyle = {
  gridTemplateColumns: size,
  gridTemplateRows: size
}

function App() {
  const [score, setScore] = React.useState(0);
  const [newDirect, setNewDirect] = React.useState();
  const [stateOfSnake, setStateOfSnake] = React.useState(startSnake);
  const [stateOfApple, setStateOfApple] = React.useState(startApple);
  const [isOver, setIsOver] = React.useState(false);

  // счетчик съеденных яблок
  const updateData = () => {
    setScore(score + 1);
  };

  // движение и управление змеей
  useEffect(() => {

    let interval = setInterval(() => {
      let newCrawState = stateOfSnake.directionWithPath(stateOfSnake.path, fieldSize);
      if (newCrawState === undefined) {
        setIsOver(true);
      } else {
        setStateOfSnake(newCrawState);
      }
    }, 1000);

    let listener = (event) => {
      let newStateOfSnake = stateOfSnake.direction(event, fieldSize);
      if (newStateOfSnake === undefined) {
        setIsOver(true);
      } else {
        setStateOfSnake(newStateOfSnake);
      }
    };
    document.addEventListener('keydown', listener);

    if ((stateOfSnake.coordinates[0][0] === stateOfApple.coordinates[0]) && (stateOfSnake.coordinates[0][1] === stateOfApple.coordinates[1])) {
      const newSnakeState = stateOfSnake.eating(stateOfApple.coordinates[0], stateOfApple.coordinates[1]);
      updateData();
      setStateOfSnake(newSnakeState);
      setStateOfApple(new Apple(newSnakeState));
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', listener);
    };

  });

  const fieldArray = [];

  if (isOver) {
    fieldArray.push(<GameOver key={0} />);
  } else {
    for (let x = 0; x < fieldSize; x++) {
      for (let y = 0; y < fieldSize; y++) {
        const isTail = stateOfSnake.isTail(x, y);
        const isHead = stateOfSnake.isHead(x, y);
        const isApple = stateOfApple.isApple(x, y);
        fieldArray.push(<Square isTail={isTail} isHead={isHead} isApple={isApple} key={fieldArray.length}/>);
      }
    }
  }

  // хендлер для управления змейкой веб-кнопками
  function directPush(d) {
    setNewDirect(d);
  }
  let directHandler = direct => {
    directPush(direct);
    let newStateOfSnake = stateOfSnake.directionWithPath(direct, fieldSize);
    if (newStateOfSnake === undefined) {
      setIsOver(true);
    } else {
      setStateOfSnake(newStateOfSnake);
    }
  };

  return (
    <div className="App">
      <Scores score={score} />
      <div className="container" style={fieldStyle}>
        {fieldArray}
      </div>
      <Controls direct={directHandler} noGame={isOver} />
    </div>
  );
}

export default App;
