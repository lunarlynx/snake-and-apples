import React from 'react';
import { fieldSize } from '../Field/Setup';
import { startSnake } from '../Snake/Snake';

export class Apple {
  // Координаты для яблока нужно найти в методе whereIsApple
  // Нужно передать текущую змею, чтобы не попасть яблоком в нее
  constructor(obj) {
    this.coordinates = this.whereIsApple(obj, fieldSize);
  }

  // метод для бросания яблока в свободную клетку
  whereIsApple(obj, max) {
    let x = Math.floor(Math.random() * max);
    let y = Math.floor(Math.random() * max);
    for (let i = 0; i < obj.coordinates.length; i++) {
      if (x === obj.coordinates[i][0] && y === obj.coordinates[i][1]) {
        return this.whereIsApple(obj, max);
      }
    }
    return [x, y];
  }

  isApple(x, y) {
    const [appleX, appleY] = this.coordinates;
    return appleX === x && appleY === y;
  }
}

// Начальное яблоко
export const startApple = new Apple(startSnake);
