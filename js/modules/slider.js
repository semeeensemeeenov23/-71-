function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
          
    let slideIndex = 1;
    let offset = 0;

     if (slides.length < 10) {
         total.textContent = `0${slides.length}`; //отображается с нулём например, 05
         current.textContent = `0${slideIndex}`;
     } else {
         total.textContent = slides.length; //отображается число без нуля
         current.textContent = slideIndex;
     }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i=0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
         // Если слайдер находится на последнем слайде (offset равен максимальному смещению)
        if (offset == deleteNotDigits(width) * (slides.length -1)){
            offset = 0; // Возвращаемся к первому слайду, сбрасывая смещение
        } else {
            // Иначе увеличиваем смещение на ширину одного слайда
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // Если слайдер находится на первом слайде (offset равен 0)
        if (offset == 0) {
            // Перемещаемся на последний слайд
            offset = deleteNotDigits(width) * (slides.length -1);
        } else {
            // Иначе уменьшаем смещение на ширину одного слайда
            offset -= deleteNotDigits(width);
        }
        // Перемещаем контейнер слайдов на новое смещение
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
    
            slideIndex = +slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
    
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
    
    // showSlides(slideIndex); //вызывается для показа начального слайда.
    // //Установка общего количества слайдов
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`; //отображается с нулём например, 05
    // } else {
    //     total.textContent = slides.length; //отображается число без нуля
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1; // Если индекс превышает количество слайдов, возвращаемся к первому слайду
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;// Если индекс меньше 1, переходим к последнему слайду
    //     }

    //     slides.forEach(item => item.style.display = 'none'); // Скрыть все слайды

    //     slides[slideIndex - 1].style.display = 'block'; // Показать текущий слайд

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`; // Текущий индекс слайда с нулём
    //     } else {
    //         current.textContent = slideIndex; // Текущий индекс слайда
    //     }
    // }
    // //Функция переключения слайдов
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    // //Добавление обработчиков событий на кнопки
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

module.exports = slider; 