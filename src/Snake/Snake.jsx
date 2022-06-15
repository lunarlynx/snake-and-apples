const Snake = () => {

    // удаление куска хвоста, после появления яблок не понадобится
    function moveArrayToLeft(array) {
        return array.slice(0, -1);
    }

    // для проверки пограничных клеток
    function getValue(arr, i, j) {
        let arrElement = arr[i] ?? [];
        return arrElement[j];
    }

    class Scaly {
        // чтобы создать новую змею, нужны ее текущие координаты
        constructor(array) {
            this.coordinates = [...array];
        }

        // метод для движения змеи на одну клеточку, нужны новые координаты головы
        moving(obj, x, y) {
            let newArray = moveArrayToLeft(obj.coordinates);
            newArray.unshift([x, y]);
            obj.coordinates = newArray;
            return obj;
        }
    }

    // начальная змея
    let snake = new Scaly([[0, 2], [0, 1], [0, 0]]);

    // обработка нажатия клавиш
    function letGoLittleSnake(obj, limit) {
        let movingSnake = obj;
        // стрелка вниз
        document.addEventListener('keydown', function (event) {
            if (event.code === 'ArrowDown') {
                if ((obj.coordinates[0][0] + 1 === obj.coordinates[1][0]) || obj.coordinates[0][0] + 1 >= limit) {
                    console.log('Там либо хвост, либо стена!')
                } else {
                    movingSnake = obj.moving(obj, obj.coordinates[0][0] + 1, obj.coordinates[0][1]);
                    console.log(movingSnake)
                }
            }
            if (event.code === 'ArrowUp') {
                if ((obj.coordinates[0][0] - 1 === obj.coordinates[1][0]) || obj.coordinates[0][0] - 1 < 0) {
                    console.log('Там либо хвост, либо стена!')
                } else {
                    movingSnake = obj.moving(obj, obj.coordinates[0][0] - 1, obj.coordinates[0][1]);
                    console.log(movingSnake)
                }
            }
            if (event.code === 'ArrowLeft') {
                if ((obj.coordinates[0][1] - 1 === obj.coordinates[1][1]) || obj.coordinates[0][1] - 1 < 0) {
                    console.log('Там либо хвост, либо стена!')
                } else {
                    movingSnake = obj.moving(obj, obj.coordinates[0][0], obj.coordinates[0][1] - 1);
                    console.log(movingSnake)
                }
            }
            if (event.code === 'ArrowRight') {
                if ((obj.coordinates[0][1] + 1 === obj.coordinates[1][1]) || obj.coordinates[0][1] + 1 >= limit) {
                    console.log('Там либо хвост, либо стена!')
                } else {
                    movingSnake = obj.moving(obj, obj.coordinates[0][0], obj.coordinates[0][1] + 1);
                    console.log(movingSnake)
                }
            }
        });
        return movingSnake;
    }

    console.log(snake);
    letGoLittleSnake(snake, 10);
}

export default Snake;
