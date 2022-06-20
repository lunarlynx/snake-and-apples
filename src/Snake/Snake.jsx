import React from 'react';

// удаление куска хвоста, после появления яблок не понадобится
export class Scaly {
  // чтобы создать новую змею, нужны ее координаты
  constructor(array, path) {
    this.coordinates = [...array];
    this.path = path;
  }

  checkDirection(x, y, limit) {
    if ((0 <= x && x < limit) && (0 <= y && y < limit) && !this.isTail(x, y)) {
      return this;
    } else {
      return undefined;
    }
  }

  directionWithPath(path, limit) {
    let head = this.coordinates[0];
    const x = head[0]; // x головы
    const y = head[1]; // у головы
    const xPlus1 = head[0] + 1; // координата справа
    const xMinus1 = head[0] - 1; // координата слева
    const yPlus1 = head[1] + 1; // координата снизу
    const yMinus1 = head[1] - 1; // координата сверху

    if (path === 'down') {
      if (this.checkDirection(xPlus1, y, limit) !== undefined) {
        return this.moving(xPlus1, y, 'down');
      } else {
        console.log('Там либо хвост, либо стена!');
        return undefined;
      }
    }

    if (path === 'up') {
      if (this.checkDirection(xMinus1, y, limit) !== undefined) {
        return this.moving(xMinus1, y, 'up');
      } else {
        console.log('Там либо хвост, либо стена!');
        return undefined;
      }
    }

    if (path === 'left') {
      if (this.checkDirection(x, yMinus1, limit) !== undefined) {
        return this.moving(x, yMinus1, 'left');
      } else {
        console.log('Там либо хвост, либо стена!');
        return undefined;
      }
    }

    if (path === 'right') {
      if (this.checkDirection(x, yPlus1, limit) !== undefined) {
        return this.moving(x, yPlus1, 'right');
      } else {
        console.log('Там либо хвост, либо стена!');
      }
      return undefined;
    }

    return this;

  }

  direction(event, limit) {
    const key = event.code;
    let textKey;
    if (key === 'ArrowRight') {
      textKey = 'right';
    }
    if (key === 'ArrowLeft') {
      textKey = 'left';
    }
    if (key === 'ArrowDown') {
      textKey = 'down';
    }
    if (key === 'ArrowUp') {
      textKey = 'up';
    }
    return this.directionWithPath(textKey, limit);
  }

  // метод для движения змеи на одну клеточку, нужны новые координаты головы
  moving(x, y, path = this.path) {
    const newArray = [[x, y]];
    const l = this.coordinates.length;
    for (let i = 0; i < l - 1; i++) {
      newArray.push(this.coordinates[i]);
    }
    return new Scaly(newArray, path);
  }

  // метод для роста змейки
  eating(x, y) {
    const newArray = [[x, y]];
    const l = this.coordinates.length;
    for (let i = 0; i < l; i++) {
      newArray.push(this.coordinates[i]);
    }
    return new Scaly(newArray, this.path);
  }

  isHead(x, y) {
    const [headX, headY] = this.coordinates[0];
    return headX === x && headY === y;
  }

  isTail(x, y) {
    for (let i = 1; i < this.coordinates.length; i++) {
      const [tailX, tailY] = this.coordinates[i];
      if (tailX === x && tailY === y) {
        return true;
      }
    }
    return false;
  }
}

// начальная змея
export const startSnake = new Scaly([[0, 2], [0, 1], [0, 0]], 'right');
