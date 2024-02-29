'use strict';
const sendForm = ({ formId, someElement = [] }) => {
    const form = document.getElementById(formId);

    const statusBlock = document.createElement('div');
    const loadText = 'Загрузка...';
    const errorText = 'Ошибка...';
    const successText = 'Спасибо! Наш менеджер с вами свяжется.';

    // * Реализуем запрет отправки данных, если данные пустые или неверно заполнены в полях ввода
    const validate = (list) => {
        // console.log(list);
        let phone;
        let name;
        let message;

        let success = true;

        list.forEach((key) => {
            if (key.name === 'user_phone') {

                console.log(key);
                console.log(key.name);
                console.log(key.value);

                phone = /[\d\-\+\(\)]/.test(key.value);
                console.log(phone);
                // phone = key.replace(/[^\d\-\+\(\)]/, '');

                // console.log(input.value);
                // e.target.value = e.target.value.replace(/[^а-яА-Я\-\ ]+/, '');
            } else if (key.name === 'user_name') {
                name = /^[а-яА-Я\s]+$/g.test(key.value);
                console.log(name);

            } else if (key.name === 'user_message') {
                message = /^[а-яА-Я0-9\s\.\,\?\!\:\;\"\-\(\)]+$/.test(key.value);
                console.log(message);

            }
        });

        if (phone === false || name === false || message === false) {
            success = false;
        }

        console.log(`Статус = ${success}`);

        // Возвращаем success
        return success;
    };


    // Принимает некую data, тот объект, который мы и будем отправлять через метод fetch()
    const sendData = (data) => {
        // Для начала используем тестовый сервер
        return fetch('https://jsonplaceholder.typicode.com/posts', {

            // * Если мы захотим поместить эту страницу на GitHub или на собственный хостинг, можем отправлять данные на локальный файл или на плагин !!! phpmailer !!!, то указываем путь, в данном примере ссылаемся на server.php
            // return fetch('./server.php', {
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

    // Отправка формы
    const submitForm = () => {

        // Находим все input внутри form
        const formElements = form.querySelectorAll('input');

        // Собираем все данные из формы через FormData, в которую передаём нашу формы
        const formData = new FormData(form);

        // Собираем из FormData объект, пока пустой, далее через forEach из FormData мы будем его наполнять
        // * Иногда случается так, что к отправляемым данным нам нужно добавлять дополнительные свойства, например из каких-нибудь обычных блоков(их текстовое содержимое) нам необходимо засунуть дополнительные данные. И для подобных вещей нам будет очень-очень удобен объект formBody
        const formBody = {};

        // Добавляем блок с текстом загрузки
        statusBlock.textContent = loadText;
        form.append(statusBlock);

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


        // В первый метод then() уже придут обработанные данные, которые вернёт нам сервер после успешной отправки. Отправляем FormData с собранными данными
        // sendData(formBody).
        //     then(data => {
        //         console.log(data);
        //     });



        // * Валидируем все input
        // validate(formElements);
        // console.log(validate(formElements));
        if (validate(formElements)) {
            sendData(formBody).
                then(data => {
                    // Меняем текст при успешной отправки
                    statusBlock.textContent = successText;

                    // console.log(data);
                    // Очищаем value после отправки
                    formElements.forEach((input) => {
                        input.value = '';
                    });
                }).
                catch(error => {
                    statusBlock.textContent = errorText;
                });
        } else (
            alert('Данные не валидны! Пожалуйста, проверьте правильность заполнения данных.')
        );
    };

    // Отправка данных при отправки формы
    // form.addEventListener('submit', (event) => {
    //     // Отменим поведение по умолчанию события submit у формы, которое отправляем данные методом GET и перезагружает страницу
    //     event.preventDefault();

    //     submitForm();
    // });


    // Обрабатываем ошибку, вдруг мы не тот id передали или верстальщик уберёт элемент. Это помогает продолжать работать остальному приложению, помимо допустим формы, в которой произошла ошибка
    //  То-есть через try catch проверили наличие формы
    try {
        // Добавляем собщение об ошибке, если элемента формы нет
        if (!form) {
            throw new Error('Верни форму на место, пожалуйста =)');
        }


        // Отправка данных при отправки формы
        form.addEventListener('submit', (event) => {
            // Отменим поведение по умолчанию события submit у формы, которое отправляем данные методом GET и перезагружает страницу
            event.preventDefault();

            submitForm();
        });

    } catch (error) {
        console.log(error.message);
    }
};

export default sendForm;

