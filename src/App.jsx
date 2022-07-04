import React, { useEffect } from 'react';
import './App.css';
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
};

function App() {
  const [score, setScore] = React.useState(0);
  const [stateOfSnake, setStateOfSnake] = React.useState(startSnake);
  const speedContainer = React.useRef(500);
  const levelContainer = React.useRef(1);
  const [stateOfApple, setStateOfApple] = React.useState(startApple);
  const [isOver, setIsOver] = React.useState(false);

  // счетчик съеденных яблок
  const updateScore = () => {
    setScore(score + 1);
  };

  // счетчик уровня
  const updateLevel = () => {
    levelContainer.current = levelContainer.current + 1;
  };

  function updateSpeed() {
    if (speedContainer.current >= 60) {
      speedContainer.current = speedContainer.current - 20;
    } else {
      return speedContainer;
    }
  }

  useEffect(() => {
    if (isOver) return;

    // самостоятельное движение змеи
    let interval = setInterval(() => {
      let newCrawState = stateOfSnake.directionWithPath(stateOfSnake.path, fieldSize);
      if (newCrawState === undefined) {
        setIsOver(true);
      } else {
        setStateOfSnake(newCrawState);
      }
    }, speedContainer.current);

    // отслеживание столкновения змеи с яблоком
    if ((stateOfSnake.coordinates[0][0] === stateOfApple.coordinates[0]) && (stateOfSnake.coordinates[0][1] === stateOfApple.coordinates[1])) {
      const newSnakeState = stateOfSnake.eating(stateOfApple.coordinates[0], stateOfApple.coordinates[1]);
      updateScore();
      setStateOfSnake(newSnakeState);
      setStateOfApple(new Apple(newSnakeState));
    }

    return () => {
      clearInterval(interval);
    };
  }, [stateOfSnake, isOver]);

  useEffect(() => {
    // отслеживание нажатия кнопок на клавиатуре
    let listener = (event) => {
      let newStateOfSnake = stateOfSnake.direction(event, fieldSize);
      if (newStateOfSnake === undefined) {
        setIsOver(true);
      } else {
        setStateOfSnake(newStateOfSnake);
      }
    };

    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [stateOfSnake]);

  // повышение сложности каждые 3 секунды
  useEffect(() => {
    if (isOver) return;

    let complexity = setTimeout(() => {
      updateLevel();
      updateSpeed();
    }, 5000);
    return () => {
      clearTimeout(complexity);
    };

  }, [speedContainer.current, isOver]);

  const fieldArray = [];

  if (isOver) {
    fieldArray.push(<GameOver key={0}/>);
  } else {
    // рисование поля
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
  const directHandler = direct => {
    let newStateOfSnake = stateOfSnake.directionWithPath(direct, fieldSize);
    if (newStateOfSnake === undefined) {
      setIsOver(true);
    } else {
      setStateOfSnake(newStateOfSnake);
    }
  };

  return (
    <div className="App">
      <Scores score={score} level={levelContainer.current}/>
      <div className="container" style={fieldStyle}>
        {fieldArray}
      </div>
      <Controls direct={directHandler} noGame={isOver}/>
    </div>
  );
}

export default App;
