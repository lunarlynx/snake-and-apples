import React from 'react';
import Square from './Square';

const Field = () => {

    const sizeOfField = 10;
    const startArray = [];

    for (let i = 0; i < sizeOfField; i++) {
        let line = [];
        for (let j = 0; j < sizeOfField; j++) {
            let oneSquare = {
                tail: undefined,
            }
            line.push(oneSquare);
        }
        startArray.push(line);
    }

    // устанавливаем начальное положение змейки
    startArray[0][2].tail = 0;
    startArray[0][1].tail = 1;
    startArray[0][0].tail = 2;

    // для проверки пограничных клеток
    function getValue(arr, i, j) {
        let arrElement = arr[i] ?? [];
        return arrElement[j];
    }

    // проверка, в какую сторону должен двигаться хвост
    // ищем, где хвост
    // двигаем хвост в нужном направлении
    function whereTail(arr, i, j) {

        let left = getValue(arr, i, j-1);
        let right = getValue(arr, i, j+1);
        let top = getValue(arr, i-1, j);
        let bottom = getValue(arr, i+1, j);

        if (left !== undefined && left.tail) {
            arr[i][j-1].tail = false;
            arr[i][j].tail = true;
            whereTail(arr, i, j-1);
        }

        if (right !==undefined && right.tail) {
            arr[i][j+1].tail = false;
            arr[i][j].tail = true;
            whereTail(arr, i, j+1);
        }

        if (top !== undefined && top.tail) {
            arr[i-1][j].tail = false;
            arr[i][j].tail = true;
            whereTail(arr, i-1, j);
        }

        if (bottom !== undefined && bottom.tail) {
            arr[i+1][j].tail = false;
            arr[i][j].tail = true;
            whereTail(arr, i+1, j);
        }

        return arr;

    }

    const [fieldArray, setFieldArray] = React.useState(startArray);
    const fieldMap = fieldArray.map(el => el.map((e,idx) => <Square key={idx} isTail={e.tail} isHead={e.head} />));

    // описание реакции на нажатие кнопок
    (function letGoLittleSnake(arr) {
        let midField = arr;

        // стрелка вниз
        document.addEventListener('keydown', function(event) {
            if (event.code === 'ArrowDown') {
                for (let i = 0; i < sizeOfField; i++) {
                    for (let j = 0; j < sizeOfField; j++) {
                        // проверка, что клетка ниже не выходит за границу
                        let downSquare = getValue(midField, i+1, j);
                        // ищем голову, проверяем, что ниже нет хвоста
                        if ((downSquare !== undefined) && midField.tail === 0) {
                            midField[i][j].tail = false;
                            midField[i+1][j].head = true;
                            setFieldArray(whereTail(midField, i, j));
                        }
                    }
                }
            }

            if (event.code === 'ArrowUp') {
                console.log('Вверх!');
            }
            if (event.code === 'ArrowLeft') {
                console.log('Влево!');
            }
            if (event.code === 'ArrowRight') {
                console.log('Вправо!');
            }
        });

        return fieldArray;

    })();

    // Рисуем 100 квадратиков со змейкой

    return fieldMap;

}

export default Field;
