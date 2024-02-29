
// Чтобы подключить функцию помощник из модуля helpers
import { slicer } from './helpers';

const two = () => {
    const text = 'Текст рыба для проверки на количество символов в строке.';

    console.log(slicer(text, 30));
};

export default two;