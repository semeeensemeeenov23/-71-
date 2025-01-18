window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modal= require('./modules/modal'),
          timer= require('./modules/timer'),
          cards = require('./modules/cards'),
          calc = require('./modules/calc'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider');

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
    //Tabs//Timer// Modal// Используем классы для карточек//Forms//Slider//calc

});

// добавить проект в ГИТ
// git status
// git add -A
// git commit -a -m"1 урок"
// git push

// запуск сервера json
// json-server db.json

// запуск переработчика
// npx webpack