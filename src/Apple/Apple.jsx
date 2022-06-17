import React from 'react';
import { fieldSize } from '../Field/Setup';

export class Apple {
  // Координаты для яблока нужно найти в методе whereIsApple
  constructor() {
    this.coordinates = this.whereIsApple(3, fieldSize);
  }

  // метод для бросания яблока в свободную клетку
  // TODO: Исключить попадание в змею
  whereIsApple(min, max) {
    const x = Math.floor(Math.random() * (max - min) + min);
    const y = Math.floor(Math.random() * (max - min) + min);
    return [x, y];
  }

  isApple(x, y) {
    const [appleX, appleY] = this.coordinates;
    return appleX === x && appleY === y;
  }
}

// Начальное яблоко
export const startApple = new Apple();
