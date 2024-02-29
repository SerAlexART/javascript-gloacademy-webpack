'use strict';

// *  new FormData() - собирает данные из формы, но только тех элементов у которых есть атрибут name
// Отправка в формате Json
// Собираем все элементы с формы и получаем объект


// const sendForm = (idForm) => {

const sendForm = (idForm) => {
    const form = document.getElementById(idForm);

    // Принимает некую data, тот объект, который мы и будем отправлять через метод fetch()
    const sendData = (data) => {
        // Для начала используем тестовый сервер
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            // Для формы передавали просто data
            // body: data,
            // Преобразуем данные
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

        // Собираем все данные из формы через FormData, в которую передаём нашу формы
        const formData = new FormData(form);

        // Собираем из FormData объект, пока пустой, далее через forEach из FormData мы будем его наполнять
        const formBody = {};

        // Перебираем FormData через forEach
        formData.forEach((value, key) => {
            formBody[key] = value;
        });

        console.log('submit');

        // В первый метод then() уже придут обработанные данные, которые вернёт нам сервер после успешной отправки. Отправляем FormData с собранными данными
        sendData(formBody).
            then(data => {
                console.log(data);
            });
    });
};

export default sendForm;

