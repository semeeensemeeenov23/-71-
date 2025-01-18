function forms() {
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

}

module.exports = forms;