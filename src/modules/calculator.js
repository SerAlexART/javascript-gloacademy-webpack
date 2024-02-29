'use strict';

import { animate } from './helpers';

const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const calcTotal = document.getElementById('total');

    // Расчитывает итоговую стоимость
    const countCalc = () => {
        // * У select есть есть свойство options, который являвется HTMLCollection и нам остаётся узнать какой из options сейчас выбран
        // console.dir(calcType.options);

        // * Находим какой option выбран у select через selectedIndex
        // console.log(calcType.selectedIndex);
        // console.log(calcType.options[calcType.selectedIndex]);
        // console.dir(calcType.options[calcType.selectedIndex]);

        // * Теперь мы можем обратиться к свойству value(указан в HTML) выбранного option
        // console.dir(calcType.options[calcType.selectedIndex].value);

        // * Сохраняем в виде числа(так как в value всегда сохраняется строка) через + в переменную value выбранного select
        const calcTypeValue = +calcType.options[calcType.selectedIndex].value;

        const calcSquareValue = calcSquare.value;

        let calCountValue = 1;
        let calDayValue = 1;
        let totalValue = 0;

        // * Проверка на количество помещений. Прибавляем 10% если value количества помещений > 1
        if (calcCount.value > 1) {
            // calCountValue = calCountValue + (+calcCount.value / 10);
            calCountValue += +calcCount.value / 10;
        }

        // * Проверка на количество дней < 5 и < 10
        // Так же в каждом из условий делаем проверку на пристуствие calcDay.value. Если ничего не введено, то будет null, а null это < 5. Просто добавляем calcDay.value && ...
        if (calcDay.value && calcDay.value < 5) {
            calDayValue = 2;
        } else if (calcDay.value && calcDay.value < 10) {
            calDayValue = 1.5;
        } else {
            calDayValue = 1;
        }

        // * Расчёт по формуле и проверка на зполненные value у обязательных* элементов
        if (calcType.value && calcSquare.value) {
            totalValue = price * calcTypeValue * calcSquareValue * calCountValue * calDayValue;
        } else {
            totalValue = 0;
        }

        // * Анимация появления цифр
        if (totalValue > 0) {
            animate({
                duration: 300,
                timing(timeFraction) {
                    return 1 - Math.sin(Math.acos(timeFraction));
                },
                draw(progress) {
                    calcTotal.textContent = Math.round(totalValue * progress);
                    // calcTotal.textContent = totalValue;
                }
            });
        } else {
            calcTotal.textContent = totalValue;
        }

    };

    calcBlock.addEventListener('input', (e) => {
        // * В данном случае addEventListener будет работать только с select и input и можно даже не делать проверку при делегировании, но если будет ещё какой-нибудь другой элемент, то будет необходимо сделать проверку
        if (e.target === calcType || e.target === calcSquare ||
            e.target === calcCount || e.target === calcDay) {
            countCalc();
        }

    });
};

export default calculator;