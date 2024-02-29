'use strict';

// Чтобы подключить функцию помощник из модуля helpers
import { slicer, animate } from './helpers';

const one = () => {
    const block = document.querySelector('.block');
    const text = 'Текст рыба для проверки на количество символов в строке.';

    animate({
        duration: 1000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            console.log(progress);
        }
    });

    console.log(slicer(text, 20));
};

export default one;