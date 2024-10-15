$(document).ready(function () {

    'use strict'

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //скрипт для настроек слайдеров с различными функциями

    // настройки для слайдера в блоке Instagram
    $('.slider').slick({
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        // easing: 'ease',
        // infinite: false,
        initialSlide: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        // draggable: false,
        // swipe: false,
        swipeSpeed: 500,
        // centerMode: true,
        // variableWidth: true,
    });
    // настройки для слайдера в блоке Masters
    $('.glider').slick({
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        // easing: 'ease',
        // infinite: false,
        initialSlide: 0,
        // autoplay: true,
        autoplaySpeed: 1000,
        // draggable: false,
        // swipe: false,
        swipeSpeed: 500,
        // centerMode: true,
        // variableWidth: true,
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //скрипт для взаимодействия с модальным окном в блоке Barber Club

// Закрытие попапа
    $('.exit').on('click', function (e) {
        e.preventDefault();
        $('#popup__call').removeClass('open');
        restorePopupContent();  // Восстановление исходного контента попапа
        resetForm();  // Сброс формы при закрытии попапа
    });

// Закрытие попапа при клике за пределами контента
    $('#popup__call').on('click', function (event) {
        if (!$(event.target).closest('.popup__content').length) {
            $(this).removeClass('open');
            restorePopupContent();  // Восстановление исходного контента попапа
            resetForm();  // Сброс формы при закрытии попапа

        }
    });

    // Открытие попапа
    $('.call__btn').on('click', function () {
        $('#popup__call').addClass('open');
        // restorePopupContent();
        resetForm();
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let name = $('#popup__name');
    let phone = $('#popup__phone');

    name.removeClass('error');
    phone.removeClass('error');

// Обработка отправки формы
    $('.popup__button').on('click', function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        let hasError = false;

        $('.error-input').hide();  // Скрываем предыдущие ошибки

        if (!name.val()) {
            name.addClass('error');
            name.next().show();
            hasError = true;
        }
        if (!phone.val()) {
            phone.addClass('error');
            phone.next().show();
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "http://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        displaySuccessMessage();  // Изменение контента попапа на успешное сообщение
                    } else {
                        displayErrorMessage();  // Изменение контента попапа на сообщение об ошибке
                    }
                });
        }
    });

// Функция для сброса формы
    function resetForm() {
        // document.querySelector('.popup__form').reset();  // Сброс всех полей формы
        $('.error-input').hide();           // Скрываем ошибки
        name.removeClass('error');
        phone.removeClass('error');
    }

// Функция для отображения успешного сообщения
    function displaySuccessMessage() {
        $('.popup__form, .popup__button, .popup__text').hide();  // Скрываем форму и кнопку отправки
        $('.popup__title').text('Спасибо! Мы перезвоним вам в течение 5 минут.');  // Изменяем текст
    }

// Функция для отображения сообщения об ошибке
    function displayErrorMessage() {
        $('.popup__form, .popup__button, .popup__title').hide();  // Скрываем форму и кнопку отправки
        $('.popup__text').text('Ошибка создания заказа. Попробуйте снова.');  // Изменяем текст на сообщение об ошибке
    }

// Функция для восстановления исходного контента попапа
    function restorePopupContent() {
        $('.popup__form, .popup__button, .popup__title').show();  // Показываем форму и кнопку
        $('.popup__text').text('Мы перезвоним вам в течение 5 минут.');  // Восстанавливаем исходный текст
        $('.popup__title').text('Заказать звонок');  // Восстанавливаем исходный текст
        name.val('');
        phone.val('');
    }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //скрипт для взаимодействия с модальным окном в блоке Order

    let o_name = $('#order__name');
    let o_phone = $('#order__phone');
    let o_service = $('#order__service');
    let o_master = $('#order__master');
    let o_date = $('#order__date');
    let o_time = $('#order__time');

    o_name.removeClass('error');
    o_phone.removeClass('error');
    o_service.removeClass('error');
    o_master.removeClass('error');
    o_date.removeClass('error');
    o_time.removeClass('error');

// Закрытие попапа
    $('.exit').on('click', function (e) {
        e.preventDefault();
        $('#popup__order').removeClass('open');
        restoreOrderContent();  // Восстановление исходного контента попапа
        resetOrderForm();  // Сброс формы при закрытии попапа
    });

// Закрытие попапа при клике за пределами контента
    $('#popup__order').on('click', function (event) {
        if (!$(event.target).closest('.order__content').length) {
            $(this).removeClass('open');
            restoreOrderContent();  // Восстановление исходного контента попапа
            resetOrderForm();  // Сброс формы при закрытии попапа

        }
    });

    // Открытие попапа
    $('.order__btn').on('click', function (e) {
        e.preventDefault();
        $('#popup__order').addClass('open');
        // restorePopupContent();
        resetOrderForm();
    });

    o_name.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_phone.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

// Обработка отправки формы
    $('.order__button').on('click', function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        let hasError = false;

        $('.error-input').hide();  // Скрываем предыдущие ошибки

        if (!o_name.val()) {
            o_name.addClass('error');
            o_name.next().show();
            hasError = true;
        }
        if (!o_phone.val()) {
            o_phone.addClass('error');
            o_phone.next().show();
            hasError = true;
        }
        if (!o_service.val()) {
            o_service.addClass('error');
            o_service.next().show();
            hasError = true;
        }
        if (!o_master.val()) {
            o_master.addClass('error');
            o_master.next().show();
            hasError = true;
        }
        if (!o_date.val()) {
            o_date.addClass('error');
            o_date.next().show();
            hasError = true;
        }
        if (!o_time.val()) {
            o_time.addClass('error');
            o_time.next().show();
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "http://testologia.ru/checkout",
                data: {name: o_name.val(), phone: o_phone.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        displaySuccessOrderMessage();  // Изменение контента попапа на успешное сообщение
                    } else {
                        displayErrorOrderMessage();  // Изменение контента попапа на сообщение об ошибке
                    }
                });
        }
    });

// Функция для сброса формы
    function resetOrderForm() {
        // document.querySelector('.popup__form').reset();  // Сброс всех полей формы
        $('.error-input').hide();           // Скрываем ошибки
        o_name.removeClass('error');
        o_phone.removeClass('error');
        o_service.removeClass('error');
        o_master.removeClass('error');
        o_date.removeClass('error');
        o_time.removeClass('error');
    }

// Функция для отображения успешного сообщения
    function displaySuccessOrderMessage() {
        $('.order__form, .order__button').hide();  // Скрываем форму и кнопку отправки
        $('.order__field').addClass('success-form-style');
        $('.order__title').text('Спасибо за ваш заказ!');  // Изменяем текст
        $('.order__text').text('Мы перезвоним вам для уточнения данных в течении 5 минут.');  // Изменяем текст
    }

// Функция для отображения сообщения об ошибке
    function displayErrorOrderMessage() {
        $('.order__form, .order__button, .order__title').hide();  // Скрываем форму и кнопку отправки
        $('.order__field').addClass('success-form-style');
        $('.order__text').text('Ошибка создания заказа. Попробуйте снова.');  // Изменяем текст на сообщение об ошибке
    }

// Функция для восстановления исходного контента попапа
    function restoreOrderContent() {
        $('.order__field').removeClass('success-form-style');
        $('.order__form, .order__button').show();  // Показываем форму и кнопку
        $('.order__text').text('Мы перезвоним вам в течение 5 минут');  // Восстанавливаем исходный текст
        $('.order__title').text('Оформить заявку');  // Восстанавливаем исходный текст
        o_name.val('');
        o_phone.val('');
        o_service.val('');
        o_master.val('');
        o_date.val('');
        o_time.val('');
    }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //скрипт для взаимодействия с модальным окном в блоке Discount

    // Открытие попапа
    $('.discount__btn').on('click', function (e) {
        e.preventDefault();
        $('#popup__discount').addClass('open');
    });
    // Закрытие попапа
    $('.exit').on('click', function (e) {
        e.preventDefault();
        $('#popup__discount').removeClass('open');
    });

// Закрытие попапа при клике за пределами контента
    $('#popup__discount').on('click', function (event) {
        if (!$(event.target).closest('.discount__content').length) {
            $(this).removeClass('open');
        }
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //применение плагина WOW для задержки начала анимации
    new WOW({
        animateClass: 'animate__animated',
    }).init();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // скрипт для изменения перечня услуг

// Массивы данных
    let servicesData = {
        haircut: {
            names: ['Стрижка мужская', 'Стрижка удлиненная', 'Стрижка машинкой', 'Стрижка детская', 'Стрижка бороды'],
            descriptions: ['Подбор стрижки, 2 мытья, укладка', 'Подбор стрижки, 2 мытья, укладка', 'Без ножниц', 'От 4 до 14 лет включительно, не удлиненная', 'С распариванием и окантовкой бритвой шаветт'],
            prices: ['1400 руб.', '2100 руб.', '950 руб.', '1100 руб.', '950 руб.']
        },
        shaving: {
            names: ['Бритье броды', 'Бритье и укладка', 'Бритье подмышек', 'Интимное бритье', 'Побреем и ноги'],
            descriptions: ['Подбор бороды, 2 мытья, стрижка', 'Подбор бороды, 2 мытья, укладка', 'Зажигалкой', 'От 25 до 45 лет включительно, подбор рисунка', 'С распариванием и выдергиванием лейкопластырем'],
            prices: ['1100 руб.', '1900 руб.', '150 руб.', '3500 руб.', '2200 руб.']
        },
        complex: {
            names: ['FULL стрижка', 'Комплексное бритье', 'VIP обслуживание', 'Детский комплекс', 'Комплекс бороды'],
            descriptions: ['Подбор стрижки и укладки', 'Полное бритье с массажем', 'Полный комплекс', 'Детский вариант, внимательно и аккуратно', 'Комплекс ухода за бородой, массаж и релакс'],
            prices: ['3000 руб.', '2500 руб.', '4500 руб.', '2000 руб.', '1800 руб.']
        },
        additionally: {
            names: ['Укладка волос', 'Окрашивание', 'Уход за кожей', 'Массаж головы', 'Уход за кожей'],
            descriptions: ['Укладка для особых случаев', 'Окрашивание волос', 'Процедуры по уходу', 'Расслабляющий массаж с лечебными травами', 'Комплексный уход за лицом и кожей после бритья'],
            prices: ['500 руб.', '2000 руб.', '1500 руб.', '1000 руб.', '2500 руб.']
        }
    };

// Обновление списка через цикл
    function updateServiceList(serviceType) {
        let service = servicesData[serviceType];
        let listNames = $('#name_list');
        let listDiscs = $('#disc_list');
        let listSums = $('#sum_list');

        listNames.empty();
        listDiscs.empty();
        listSums.empty();

        for (let i = 0; i < service.names.length; i++) {
            listNames.append($('<li></li>').text(service.names[i]));
            listDiscs.append($('<li></li>').text(service.descriptions[i]));
            listSums.append($('<li></li>').text(service.prices[i]));
        }
    }

// Привязка кликов к каждому пункту меню через цикл
    $('#services__nav a').on('click', function (e) {
        e.preventDefault();
        let serviceType = $(this).attr('id');  // Получаем id кликнутого элемента
        updateServiceList(serviceType);  // Обновляем список услуг на основе выбранного пункта
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // пока не применено
    // код для передачи параметра (названия) в блок ввода заказа и перемещение до этого блока
    $('.btn-add-to-card').click((e) => {
        productInput.val($(e.target).parents('.product').find('h6').text());
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    })
    // простая проверка всех блоков ввода и вывод сообщений
    $('#createOrder').click(function () {
        let addressInput = $('#address-input');
        let phoneInput = $('#phone-input');
        if (!productInput.val()) {
            alert('Выберите пиццу!');
            return;
        }
        if (!addressInput.val()) {
            alert('Введите адрес!');
            return;
        }
        if (!phoneInput.val()) {
            alert('Введите телефон!');
            return;
        }
        alert('Спасибо за заказ!');
        productInput.val('');
        addressInput.val('');
        phoneInput.val('');
    });


});