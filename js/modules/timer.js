function timer() {
    
    // Установка даты окончания таймера
    const deadline = '2025-12-31';

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
}

module.exports = timer;