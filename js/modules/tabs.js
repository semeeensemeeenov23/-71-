function tabs() {
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
}

module.exports = tabs;