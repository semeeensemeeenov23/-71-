window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'); // Выбираем родительский элемент вкладок

    // Скрыть все табы и убрать активный класс
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            //item.style.display = 'none'; // Прячем все табы
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Убираем активный класс
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //tabsContent[i].style.display = 'block'; // Показываем нужный таб
        tabs[i].classList.add('tabheader__item_active'); // Добавляем активный класс
    }

    hideTabContent(); // Прячем табы по умолчанию
    showTabContent(); // Показываем первый таб по умолчанию

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent(); // Прячем табы по умолчанию
                    showTabContent(i); // Показываем первый таб по умолчанию
                }
            });
        }
    });

    //Timer

    // Установка даты окончания таймера
    const deadline = '2024-12-31';

    // Функция вычисления оставшегося времени до указанного времени
    function getTimeRemaining(endtime) {
        // Вычисляем разницу в миллисекундах между текущим временем и дедлайном
        const t = Date.parse(endtime) - Date.parse(new Date()),
            // Рассчитываем дни, часы, минуты, секунды
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        // Возвращаем объект с оставшимся временем
        return {
            'total': t,
            'days': days, // исправлено с 'daus' на 'days'
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // Функция установки и обновления таймера
    function setClock(selector, endtime) {
        // Находим контейнер таймера
        const timer = document.querySelector(selector),
            // Находим элементы таймера внутри контейнера
            days = timer.querySelector('#days'), // Исправляем селектор
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'), // Исправлено с 'mintes'
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // Устанавливаем интервал обновления

        // Функция обновления значений на странице
        function updateClock() {
            const t = getTimeRemaining(endtime); // Получаем оставшееся время

            // Обновляем содержимое HTML элементов
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Останавливаем таймер, если дедлайн достигнут
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        // Запускаем обновление таймера сразу, чтобы не было задержки 1 секунду
        updateClock();
    }

    // Запускаем таймер
    setClock('.timer', deadline);


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show'); // Добавляет класс 'show' к элементу с модальным окном
        modal.classList.remove('hide'); // Убирает класс 'hide' с элемента
        // modal.classList.toggle('show') // Альтернативный способ переключения класса
        document.body.style.overflow = 'hidden'; // Отключает прокрутку страницы
        clearInterval(modalTimerId); // Останавливает выполнение таймера (если был задан)
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show')
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // Получение родительского элемента
            this.transfer = 27; // Курс пересчета цены
            this.changeToUAH(); // Пересчет цены в гривны
        }

        changeToUAH() {
            this.price = this.price * this.transfer; // Цена пересчитывается и заменяет старое значение
        }

        render() {
            const element = document.createElement('div'); // Создание нового элемента

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element); // Вставка в DOM
        }
    }

    const getResource = async (URL) => {
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`Coul not fetch ${URL}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu') //отправляет HTTP-запрос
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     }); //из каждого объекта извлекаются свойства b Создается новый объект (экземпляр) класса MenuCard.
    
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                 new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
        });
        
    
        //Forms

    const forms = document.querySelectorAll('form'); //Получает список всех элементов <form> на странице.

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }; //Объект, содержащий сообщения

    forms.forEach(item => {
        bindPostData(item);
    }); //Цикл forEach проходит по каждой найденной форме на странице и передает ее в функцию postData.

    const postData = async (URL, data) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
           body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //Отменяет стандартное поведение браузера, чтобы форма не перезагружала страницу.
            //Устанавливается обработчик события submit для каждой формы. 
            // Когда пользователь отправляет форму, вызывается функция.

            const statusMessage = document.createElement('img'); //Создается элемент <div> для отображения текущего статуса.
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
             
            form.insertAdjacentElement('afterend', statusMessage); //Добавляется элемент со статусом внутрь формы.

            //const request = new XMLHttpRequest(); //Создается объект для отправки HTTP-запроса.
            //request.open('POST', 'server.php'); //Настраивается запрос на отправку данных методом
 
            const formData = new FormData(form); //Создает объект FormData, содержащий данные формы.

            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });


            // request.addEventListener('load', () => { //обработчик, который срабатывает при завершении запроса.
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
         .then(data => data.json())
         .then(res => console.log(res));


         //Slider

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
        //calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio'))
                elem.classList.add(activeClass);
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInfomation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                console.log(ratio, sex);

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInfomation('#gender div', 'calculating__choose-item_active');
    getStaticInfomation('.calculating__choose_big div', 'calculating__choose-item_active');
    

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
    
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                calcTotal(); // Обновляем результат
            }
        });
    }
    
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    

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
});