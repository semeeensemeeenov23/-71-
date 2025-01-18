function cards() {
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
        
    
}

module.exports = cards;