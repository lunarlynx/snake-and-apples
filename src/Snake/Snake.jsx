import React from 'react';

// удаление куска хвоста, после появления яблок не понадобится
export class Scaly {
  // чтобы создать новую змею, нужны ее координаты
  constructor(array) {
    this.coordinates = [...array];
  }

  direction(event, limit) {
    if (event.code === 'ArrowDown') {
      if ((this.coordinates[0][0] + 1 === this.coordinates[1][0]) || this.coordinates[0][0] + 1 >= limit) {
        console.log('Там либо хвост, либо стена!');
      } else {
        return this.moving(this.coordinates[0][0] + 1, this.coordinates[0][1]);
      }
    }
    if (event.code === 'ArrowUp') {
      if ((this.coordinates[0][0] - 1 === this.coordinates[1][0]) || this.coordinates[0][0] - 1 < 0) {
        console.log('Там либо хвост, либо стена!');
      } else {
        return this.moving(this.coordinates[0][0] - 1, this.coordinates[0][1]);
      }
    }
    if (event.code === 'ArrowLeft') {
      if ((this.coordinates[0][1] - 1 === this.coordinates[1][1]) || this.coordinates[0][1] - 1 < 0) {
        console.log('Там либо хвост, либо стена!');
      } else {
        return this.moving(this.coordinates[0][0], this.coordinates[0][1] - 1);
      }
    }
    if (event.code === 'ArrowRight') {
      if ((this.coordinates[0][1] + 1 === this.coordinates[1][1]) || this.coordinates[0][1] + 1 >= limit) {
        console.log('Там либо хвост, либо стена!');
      } else {
        return this.moving(this.coordinates[0][0], this.coordinates[0][1] + 1);
      }
    }
    return this;
  }

  // метод для движения змеи на одну клеточку, нужны новые координаты головы
  moving(x, y) {
    const newArray = [[x, y]];
    const l = this.coordinates.length;
    for (let i = 0; i < l - 1; i++) {
      newArray.push(this.coordinates[i]);
    }
    return new Scaly(newArray);
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
export const startSnake = new Scaly([[0, 2], [0, 1], [0, 0]]);
