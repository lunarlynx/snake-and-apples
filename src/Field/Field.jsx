import React, { useEffect } from 'react';
import Square from './Square';
import { startSnake } from '../Snake/Snake';
import { Apple, startApple } from '../Apple/Apple';
import { fieldSize } from './Setup';

const Field = () => {
  const [stateOfSnake, setStateOfSnake] = React.useState(startSnake);
  const [stateOfApple, setStateOfApple] = React.useState(startApple);
  const [scores, setScores] = React.useState(0);

  useEffect(() => {
    let listener = (event) => {
      setStateOfSnake(stateOfSnake.direction(event, fieldSize));
    };
    document.addEventListener('keydown', listener);

    if ((stateOfSnake.coordinates[0][0] === stateOfApple.coordinates[0]) && (stateOfSnake.coordinates[0][1] === stateOfApple.coordinates[1])) {
      setScores(scores + 1);
      setStateOfSnake(stateOfSnake.eating(stateOfApple.coordinates[0], stateOfApple.coordinates[1]));
      setStateOfApple(new Apple());
    }

    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const fieldArray = [];
  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      const isTail = stateOfSnake.isTail(x, y);
      const isHead = stateOfSnake.isHead(x, y);
      const isApple = stateOfApple.isApple(x, y);
      fieldArray.push(<Square isTail={isTail} isHead={isHead} isApple={isApple} key={fieldArray.length}/>);
    }
  }
  return fieldArray;
};

export default Field;
