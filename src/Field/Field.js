import React, { useEffect } from 'react';
import Square from './Square';
import { startSnake } from '../Snake/Snake';

const fieldSize = 10;

const Field = () => {
  const [stateOfSnake, setStateOfSnake] = React.useState(startSnake);

  useEffect(() => {
    let listener = (event) => {
      setStateOfSnake(stateOfSnake.direction(event, fieldSize));
    };
    document.addEventListener('keydown', listener);


    return () => {
      document.removeEventListener('keydown', listener);
    }
  });

  const fieldArray = [];
  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      const isTail = stateOfSnake.isTail(x, y);
      const isHead = stateOfSnake.isHead(x, y);
      fieldArray.push(<Square isTail={isTail} isHead={isHead} key={fieldArray.length}/>);
    }
  }
  return fieldArray;
};

export default Field;
