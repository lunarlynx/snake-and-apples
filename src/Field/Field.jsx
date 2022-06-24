// import React, { useEffect } from 'react';
// import Square from './Square';
// import { startSnake } from '../Snake/Snake';
// import { Apple, startApple } from '../Apple/Apple';
// import { fieldSize } from './Setup';
// import GameOver from './GameOver';
//
// const Field = (props) => {
//   const [stateOfSnake, setStateOfSnake] = React.useState(startSnake);
//   const [stateOfApple, setStateOfApple] = React.useState(startApple);
//   const [isOver, setIsOver] = React.useState(false);
//
//   useEffect(() => {
//     let interval = setInterval(() => {
//       let newCrawState = stateOfSnake.directionWithPath(stateOfSnake.path, fieldSize);
//       if (newCrawState === undefined) {
//         setIsOver(true);
//       } else {
//         setStateOfSnake(newCrawState);
//       }
//     }, 20000);
//
//     let listener = (event) => {
//       let newStateOfSnake = stateOfSnake.direction(event, fieldSize);
//       if (newStateOfSnake === undefined) {
//         setIsOver(true);
//       } else {
//         setStateOfSnake(newStateOfSnake);
//       }
//     };
//     document.addEventListener('keydown', listener);
//
//     if ((stateOfSnake.coordinates[0][0] === stateOfApple.coordinates[0]) && (stateOfSnake.coordinates[0][1] === stateOfApple.coordinates[1])) {
//       const newSnakeState = stateOfSnake.eating(stateOfApple.coordinates[0], stateOfApple.coordinates[1]);
//       props.updateData();
//       setStateOfSnake(newSnakeState);
//       setStateOfApple(new Apple(newSnakeState));
//     }
//
//     return () => {
//       clearInterval(interval);
//       document.removeEventListener('keydown', listener);
//     };
//   });
//
//   const fieldArray = [];
//
//   if (isOver) {
//     fieldArray.push(<GameOver key={0}/>);
//   } else {
//     for (let x = 0; x < fieldSize; x++) {
//       for (let y = 0; y < fieldSize; y++) {
//         const isTail = stateOfSnake.isTail(x, y);
//         const isHead = stateOfSnake.isHead(x, y);
//         const isApple = stateOfApple.isApple(x, y);
//         fieldArray.push(<Square isTail={isTail} isHead={isHead} isApple={isApple} key={fieldArray.length}/>);
//       }
//     }
//   }
//   return fieldArray;
// };
//
// export default Field;
