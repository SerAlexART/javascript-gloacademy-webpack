'use strict';

const validationForm = (formId) => {
    const form = document.getElementById(formId);

    const names = form.querySelectorAll('[type="text"]');
    const messages = form.querySelectorAll('[placeholder="Ваше сообщение"]');
    const emails = form.querySelectorAll('[type="email"]');
    const phones = form.querySelectorAll('[type="tel"]');

    // Name - Позволяем ввод только кириллицы в любом регистре, дефиса и пробела
    names.forEach((input) => {
        input.addEventListener('input', (e) => {
            console.log(input.value);
            e.target.value = e.target.value.replace(/[^а-яА-Я\-\ ]+/, '');
        });
    });

    // Message - Позволяем ввод только кириллицы в любом регистре, дефиса и пробела
    messages.forEach((input) => {
        input.addEventListener('input', (e) => {
            console.log(input.value);
            e.target.value = e.target.value.replace(/[^а-яА-Я\-\ ]/, '');
        });
    });

    // Email - Позволяем ввод только только латиницы в любом регистре, цифры и спецсимволы:@  -  _  . ! ~ * '
    emails.forEach((input) => {
        input.addEventListener('input', (e) => {
            console.log(input.value);
            e.target.value = e.target.value.replace(/[^\w\-\@\-\_\.\!\~\*\']/, '');
        });
    });

    // Phone - Позволяем ввод только цифр, круглых скобок и дефис
    phones.forEach((input) => {
        input.addEventListener('input', (e) => {
            console.log(input.value);
            e.target.value = e.target.value.replace(/[^\d\-\+\(\)]/, '');
        });
    });
};

export default validationForm;