'use strict';

// *  new FormData() - собирает данные из формы, но только тех элементов у которых есть атрибут name
// Отправка в формате FormData

const sendForm = (idForm) => {
    const form = document.getElementById(idForm);

    let user = {
        name: 'Ser',
        age: 31
    };

    // Принимает некую data, тот объект, который мы и будем отправлять через метод fetch()
    const sendData = (data) => {
        // Для начала используем тестовый сервер
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: data,
            headers: {
                // Указываем Content-type для формы
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.json());
    };


    form.addEventListener('submit', (event) => {
        // Отменим поведение по умолчанию события submit у формы, которое отправляем данные методом GET и перезагружает страницу
        event.preventDefault();

        // Собираем все данные из формы через FormData, в которую передаём нашу формы
        const formData = new FormData(form);

        console.log('submit');

        // В первый метод then() уже придут обработанные данные, которые вернёт нам сервер после успешной отправки. Отправляем FormData с собранными данными
        sendData(formData).
            then(data => {
                console.log(data);
            });
    });
};

export default sendForm;