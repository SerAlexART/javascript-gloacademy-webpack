'use strict';

const slider = () => {
    const sliderBlock = document.querySelector('.portfolio-content');
    const slides = document.querySelectorAll('.portfolio-item');
    const timeInterval = 2000;
    const dotsList = document.querySelector('.portfolio-dots');

    let dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let interval;

    // Добавление dots равное количеству слайдов
    const addDots = () => {
        slides.forEach((newDot) => {
            dots = document.querySelectorAll('.dot');
            newDot = document.createElement('li');

            newDot.classList.add('dot');

            dotsList.append(newDot);
        });

        dots[0].classList.add('dot-active');
    };

    // Показывает предыдущий слайд
    const prevSlide = (elems, index, strClass) => {
        elems[index].classList.remove(strClass);
    };

    // Показывает следующий слайд
    const nextSlide = (elems, index, strClass) => {
        elems[index].classList.add(strClass);
    };

    // Метод автоматически переключает слайды
    const autoSlide = () => {
        dots = document.querySelectorAll('.dot');
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    };

    // Метод запуска слайдера cо значением по умолчанию
    const startSlide = (timer = 1500) => {
        interval = setInterval(autoSlide, timer);
    };

    // Метод остановки слайдера и очищения интервала
    const stopSlide = () => {
        clearInterval(interval);
    };

    // Смена слайда при клике на кнопки
    sliderBlock.addEventListener('click', (e) => {
        e.preventDefault();

        dots = document.querySelectorAll('.dot');

        if (!e.target.matches('.dot, .portfolio-btn')) {
            return;
        }
        console.log(e.target);

        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if (e.target.matches('#arrow-right')) {
            currentSlide++;
        } else if (e.target.matches('#arrow-left')) {
            currentSlide--;

        } else if (e.target.classList.contains('dot')) {
            dots.forEach((dot, index) => {
                if (e.target === dot) {
                    currentSlide = index;
                }
            });
        }

        // Делаем проверку на длину слайдера
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        // Добавляем активные классы
        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    });

    // Пауза слайдера при наведении на его кнопки
    sliderBlock.addEventListener('mouseenter', (e) => {
        if (e.target.matches('.dot, .portfolio-btn')) {
            stopSlide(timeInterval);
        }
    }, true);

    // Запуск слайдера при потери курсора с его кнопок
    sliderBlock.addEventListener('mouseleave', (e) => {
        if (e.target.matches('.dot, .portfolio-btn')) {
            startSlide(timeInterval);
        }
    }, true);

    addDots();
    startSlide();
};

export default slider;