'use strict';
const sendForm = ({ formId, someElement = [] }) => {
    const form = document.getElementById(formId);

    const statusBlock = document.createElement('div');
    const loadText = 'Загрузка...';
    const errorText = 'Ошибка...';
    const successText = 'Спасибо! Наш менеджер с вами свяжется.';

    statusBlock.style.color = '#FFFFFF';

    // * Реализуем запрет отправки данных, если данные пустые или неверно заполнены в полях ввода
    const validate = (list) => {
        let phone;
        let name;
        let message;

        let success = true;

        list.forEach((key) => {
            if (key.name === 'user_phone') {
                phone = /[\d\-\+\(\)]/.test(key.value);

            } else if (key.name === 'user_name') {
                name = /^[а-яА-Я\s]+$/g.test(key.value);

            } else if (key.name === 'user_message') {
                message = /^[а-яА-Я0-9\s\.\,\?\!\:\;\"\-\(\)]+$/.test(key.value);
            }
        });

        if (phone === false || name === false || message === false) {
            success = false;
        }

        return success;
    };

    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    };

    // Отправка формы
    const submitForm = () => {
        const formElements = form.querySelectorAll('input');
        const formData = new FormData(form);
        const formBody = {};

        statusBlock.textContent = loadText;
        form.append(statusBlock);

        formData.forEach((value, key) => {
            formBody[key] = value;
        });

        someElement.forEach((element) => {
            const elementForm = document.getElementById(element.id);

            if (element.type === 'block') {
                formBody[element.id] = elementForm.textContent;
            } else if (element.type === 'input') {
                formBody[element.id] = elementForm.value;
            }
        });



        if (validate(formElements)) {
            sendData(formBody).
                then(data => {
                    statusBlock.textContent = successText;

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


    try {
        if (!form) {
            throw new Error('Верни форму на место, пожалуйста =)');
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            submitForm();
        });

    } catch (error) {
        console.log(error.message);
    }
};

export default sendForm;

