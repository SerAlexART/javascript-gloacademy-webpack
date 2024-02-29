'use strict';

const slider = () => {
    const sliderBlock = document.querySelector('.portfolio-content');
    const slides = document.querySelectorAll('.portfolio-item');
    const timeInterval = 2000;
    const dotsList = document.querySelector('.portfolio-dots');
    // console.log(dotsList);

    let dots = document.querySelectorAll('.dot');

    // Cчётчик
    let currentSlide = 0;

    // Интервал
    let interval;

    // Добавление dots равное количеству слайдов
    const addDots = () => {
        slides.forEach((newDot, index) => {
            dots = document.querySelectorAll('.dot');
            newDot = document.createElement('li');


            // newDot.classList.add('dot');

            // console.dir(slides[0]);
            // console.log(slides.length);

            if (dots[index] === 0) {
                newDot[0].classList.add('dot');
                newDot.classList.add('dot-active');
            } else {
                newDot.classList.add('dot');
                // newDot.classList.add('dot-active');
            }

            // console.log(dots.length);
            // console.log(dots[0]);

            console.dir(dotsList);

            dotsList.append(newDot);
        });

        dots[0].classList.add('dot-active');
    };

    // Показывает предыдущий слайд
    const prevSlide = (elems, index, strClass) => {
        // slides[currentSlide].classList.remove('portfolio-item-active');
        elems[index].classList.remove(strClass);
    };

    // Показывает следующий слайд
    const nextSlide = (elems, index, strClass) => {
        // slides[currentSlide].classList.add('portfolio-item-active');
        elems[index].classList.add(strClass);
    };

    // Метод автоматически переключает слайды
    const autoSlide = () => {
        dots = document.querySelectorAll('.dot');
        // slides[currentSlide].classList.remove('portfolio-item-active');
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        // slides[currentSlide].classList.add('portfolio-item-active');
        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    };

    // Метод запуска слайдера cо значением по умолчанию
    const startSlide = (timer = 1500) => {
        interval = setInterval(autoSlide, timer);
    };

    // Метод остановки слайдера
    const stopSlide = () => {
        // Очищаем интервал
        clearInterval(interval);
    };

    // Смена слайда при клике на кнопки
    sliderBlock.addEventListener('click', (e) => {
        // Сбрасываем стандартное поведений элементов
        e.preventDefault();

        dots = document.querySelectorAll('.dot');

        // Разрешаем клик только по кнопкам
        if (!e.target.matches('.dot, .portfolio-btn')) {
            return;
        }
        console.log(e.target);

        // Удаляем акивные классы
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        // Увеличиваем или уменьшаем счётчик
        if (e.target.matches('#arrow-right')) {
            currentSlide++;
        } else if (e.target.matches('#arrow-left')) {
            currentSlide--;

        } else if (e.target.classList.contains('dot')) {
            // Меняем активный dot
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

    // * Из-за Всплытия пауза и запуск могут не работать (при наведении/потери курсора мы будем обращаться к родительскому элементу), поэтому в обработчик события добавляем параметр true, чтобы дочерние элементы реагировали на слушатели
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