import React from 'react';
import Square from './Square';

const Field = () => {

    const arr = [];

    for (let i = 0; i < 100; i++) {
        let oneSquare = {
            id: i,
            tail: i <= 2
        }
        arr.push(oneSquare);
    }

    const [fieldArray, setFieldArray] = React.useState(arr);


    // Рисуем 100 квадратиков со змейкой
    return fieldArray.map(el => <Square key={el.id} isTail={el.tail} />);

}

export default Field;
