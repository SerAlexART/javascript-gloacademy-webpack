'use strict';

const tabs = () => {
    const tabPanel = document.querySelector('.service-header');
    const tabs = tabPanel.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    // Меняем активную кнопку при клике на неё
    tabPanel.addEventListener('click', (e) => {
        // Проверка, что работаем с элементом у которого родительский класс service-header-tab
        if (e.target.closest('.service-header-tab')) {
            const tabBtn = e.target.closest('.service-header-tab');

            tabs.forEach((tab, index) => {
                if (tab === tabBtn) {
                    tab.classList.add('active');
                    tabContent[index].classList.remove('d-none');
                } else {
                    tab.classList.remove('active');
                    tabContent[index].classList.add('d-none');
                }

                console.log(tab);
                console.log(index);
            });
        }
    });
};

export default tabs;