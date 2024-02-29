'use strict';

const menu = () => {
    const menu = document.querySelector('menu');
    const menuBtn = document.querySelector('.menu');
    // const closeBtn = menu.querySelector('.close-btn');
    // const menuItems = menu.querySelectorAll('ul > li > a');

    // Метод закрытия меню
    const handleMenu = () => {
        // if (!menu.style.transform) {
        //     menu.style.transform = `translateX(0)`;
        // } else {
        //     menu.style.transform = ``;
        // }
        menu.classList.toggle('active-menu');
    };

    // Открытие/Закрытие меню при нажатии на бургер
    menuBtn.addEventListener('click', handleMenu);

    // Закрытие меню на кнопку X
    // closeBtn.addEventListener('click', handleMenu);

    // Закрытие меню при клике на одну из ссылок меню через for
    // for (let i = 0; i < menuItems.length; i++) {
    //     menuItems[i].addEventListener('click', handleMenu);
    // }

    // Закрытие меню при клике на одну из ссылок меню через forEach
    // menuItems.forEach(menuItem => {
    //     menuItem.addEventListener('click', handleMenu);
    // });


    // Закрытие меню через делегирование при клике на кнопку X или на одну из ссылок меню
    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn') || e.target.matches('menu > ul > li > a')) {
            handleMenu();
        }
    });

    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            console.log('test');
        }
    });
};

export default menu;