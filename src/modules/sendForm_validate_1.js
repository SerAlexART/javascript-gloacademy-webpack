'use strict';

// *  new FormData() - собирает данные из формы, но только тех элементов у которых есть атрибут name
// Отправка в формате Json
// Собираем все элементы с формы и получаем объект + собираем дополнительные свойства
// Валидируем код, с отдельной функцией обрабатывающей события

// const sendForm = (formId) => {

// Принимает объект со свойстами formId с массивов someElement внутри объекта
const sendForm = ({ formId, someElement = [] }) => {
    const form = document.getElementById(formId);

    // * Реализуем запрет отправки данных, если данные пустые или неверно заполнены в полях ввода
    // Один из способов навесить на каждый input с определённым name определённый обработчик, например обработчик input и валидировать данные при их вводе. При вводе правильных данных добавлять допустим класс 'success', а при ошибке добавлять класс 'error'
    // Для подобной реализации должна быть отдельная функция и отдельный обработчик события, например input, которые и будет реализовывать навешивание на элементы классов 'success' и 'error'
    const validate = (list) => {
        // console.log(list);

        // При каждом submit через функцию validate проверим наличие классов 'success'
        let success = true;

        list.forEach((input) => {
            if (!input.classList.contains('success')) {
                // Если у элемента не будет класса 'success', то переменная success = false
                success = false;
            }
        });

        // Возвращаем success
        return success;
    };


    // Принимает некую data, тот объект, который мы и будем отправлять через метод fetch()
    const sendData = (data) => {
        // Для начала используем тестовый сервер
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            // Для формы передавали просто data
            // body: data,
            body: JSON.stringify(data),
            headers: {
                // Указываем Content-type для формы
                // 'Content-Type': 'multipart/form-data'

                // Указываем Content-type для json
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    };


    form.addEventListener('submit', (event) => {
        // Отменим поведение по умолчанию события submit у формы, которое отправляем данные методом GET и перезагружает страницу
        event.preventDefault();

        // Находим все input внутри form
        const formElements = form.querySelectorAll('input');

        // Собираем все данные из формы через FormData, в которую передаём нашу формы
        const formData = new FormData(form);

        // Собираем из FormData объект, пока пустой, далее через forEach из FormData мы будем его наполнять
        // * Иногда случается так, что к отправляемым данным нам нужно добавлять дополнительные свойства, например из каких-нибудь обычных блоков(их текстовое содержимое) нам необходимо засунуть дополнительные данные. И для подобных вещей нам будет очень-очень удобен объект formBody
        const formBody = {};

        // Перебираем FormData через forEach
        formData.forEach((value, key) => {
            formBody[key] = value;
        });

        // Делаем перебор someElement через forEach
        someElement.forEach((element) => {
            console.log(element);


            // Именно тут мы и можем вытащить содержимое контента по id элемента на странице, как id свойства someElement, который мы передаём. То-есть мы на HTML странице ищем элемент с id, который указали при вызове функции внутри массива someElement в свойстве id.
            const elementForm = document.getElementById(element.id);

            // Получаем элемент
            console.log(elementForm);

            // Делаем проверку
            if (element.type === 'block') {
                // Вытаскивает текстовое содержимое, если type === 'block'
                formBody[element.id] = elementForm.textContent;
            } else if (element.type === 'input') {
                // Вытаскивает input содержимое, если type === 'input'
                formBody[element.id] = elementForm.value;
            }


        });


        console.log('submit');


        // * Валидируем все input
        // validate(formElements);
        // console.log(validate(formElements));

        if (validate(formElements)) {
            sendData(formBody).
                then(data => {
                    console.log(data);
                });
        } else (
            alert('Данные не валидны!')
        );

        // В первый метод then() уже придут обработанные данные, которые вернёт нам сервер после успешной отправки. Отправляем FormData с собранными данными
        // sendData(formBody).
        //     then(data => {
        //         console.log(data);
        //     });
    });
};

export default sendForm;

