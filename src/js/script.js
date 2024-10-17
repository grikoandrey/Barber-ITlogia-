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
        initialSlide: 1,
        swipeSpeed: 500,
        responsive: [
            {
                breakpoint: 486, // При ширине экрана меньше 420px
                settings: {
                    slidesToShow: 2, // Отображать 1 слайд
                }
            }
        ]
    });
    // настройки для слайдера в блоке Masters
    $('.glider').slick({
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        initialSlide: 0,
        swipeSpeed: 500,
        responsive: [
            {
                breakpoint: 486,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
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
        resetOrderForm();
        let masterName = $(this).closest('.slider__item').find('.slider__item-name').text();

        $('#order__master option').filter(function() {
            return $(this).text().trim() === masterName;
        }).prop('selected', true);
    });

    o_name.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_phone.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_service.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_master.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_date.on('input', function () {
        $(this).removeClass('error');
        $(this).next('.error-input').hide();
    });

    o_time.on('input', function () {
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
        $('.popup__man').addClass('success-popup__man');
        $('.order__title').addClass('success-order__title').text('Спасибо за ваш заказ!');  // Изменяем текст
        $('.order__text').addClass('success-order__text').text('Мы перезвоним вам для уточнения данных в течении 5 минут.');  // Изменяем текст
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
            shortNames: ['Мужская', 'Удлиненная', 'Машинкой', 'Детская', 'Бороды'],
            descriptions: ['Подбор стрижки, 2 мытья, укладка', 'Подбор стрижки, 2 мытья, укладка', 'Без ножниц', 'От 4 до 14 лет включительно, не удлиненная', 'С распариванием и окантовкой бритвой шаветт'],
            shortDescriptions: ['Подбор, мытье, укладка', 'Подбор, мытье, укладка', 'Без ножниц', 'От 4 до 14 лет', 'Распар и окант'],
            prices: ['1400 руб.', '2100 руб.', '950 руб.', '1100 руб.', '950 руб.'],
            shortPrices: ['1400 р.', '2100 р.', '950 р.', '1100 р.', '950 р.'],
        },
        shaving: {
            names: ['Бритье бороды', 'Бритье и укладка', 'Бритье подмышек', 'Интимное бритье', 'Побреем и ноги'],
            shortNames: ['Борода', 'И укладка', 'Подмышек', 'Интимное', 'И ноги'],
            descriptions: ['Подбор бороды, 2 мытья, стрижка', 'Подбор бороды, 2 мытья, укладка', 'Зажигалкой', 'От 25 до 45 лет включительно, подбор рисунка', 'С распариванием и выдергиванием лейкопластырем'],
            shortDescriptions: ['Подбор, мытье', 'Подбор, мытье', 'Зажигалкой', 'От 25 до 45, подбор', 'Выдергивание'],
            prices: ['1100 руб.', '1900 руб.', '150 руб.', '3500 руб.', '2200 руб.'],
            shortPrices: ['1100 р.', '1900 р.', '150 р.', '3500 р.', '2200 р.']
        },
        complex: {
            names: ['FULL стрижка', 'Комплексное бритье', 'VIP обслуживание', 'Детский комплекс', 'Комплекс бороды'],
            shortNames: ['FULL', 'Complex', 'VIP', 'Детский', 'Борода'],
            descriptions: ['Подбор стрижки и укладки', 'Полное бритье с массажем', 'Полный комплекс', 'Детский вариант, внимательно и аккуратно', 'Комплекс ухода за бородой, массаж и релакс'],
            shortDescriptions: ['Подбор и укладка', 'Полное с массажем', 'Вообще все', 'Игрушки и аккуратно', 'Массаж и релакс'],
            prices: ['3000 руб.', '2500 руб.', '4500 руб.', '2000 руб.', '1800 руб.'],
            shortPrices: ['3000 р.', '2500 р.', '4500 р.', '2000 р.', '1800 р.']
        },
        additionally: {
            names: ['Укладка волос', 'Окрашивание', 'Уход за кожей', 'Массаж головы', 'Травянная ванна'],
            shortNames: ['Укладка', 'Окрашивание', 'Уход за кожей', 'Массаж', 'Травянное'],
            descriptions: ['Укладка для особых случаев', 'Окрашивание волос', 'Процедуры по уходу', 'Расслабляющий массаж с лечебными травами', 'Комплексный уход за лицом и кожей после бритья'],
            shortDescriptions: ['Для особых случаев', 'Разноцветные волосы', 'Процедуры по уходу', 'С лечебными травами', 'Уход после бритья'],
            prices: ['500 руб.', '2000 руб.', '1500 руб.', '1000 руб.', '2500 руб.'],
            shortPrices: ['500 р.', '2000 р.', '1500 р.', '1000 р.', '2500 р.']
        }
    };

    let isMobile = window.matchMedia('(max-width: 700px)').matches;

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
            if (isMobile) {
                // Для мобильной версии отображаем сокращенные имена, описания и цены
                listNames.append($('<li></li>').text(service.shortNames[i]));
                listDiscs.append($('<li></li>').text(service.shortDescriptions[i]));
                listSums.append($('<li></li>').text(service.shortPrices[i]));
            } else {
                // Для полной версии отображаем полные данные
                listNames.append($('<li></li>').text(service.names[i]));
                listDiscs.append($('<li></li>').text(service.descriptions[i]));
                listSums.append($('<li></li>').text(service.prices[i]));
            }
        }
    }

// Привязка кликов к каждому пункту меню через цикл
    $('#services__nav a').on('click', function (e) {
        e.preventDefault();
        let serviceType = $(this).attr('id');  // Получаем id кликнутого элемента
        updateServiceList(serviceType);  // Обновляем список услуг на основе выбранного пункта
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //скрипт для взаимодействия с модальным окном Burger Menu

    // Открытие попапа
    $('.header__burger').on('click', function (e) {
        e.preventDefault();
        $('#popup__burger').addClass('open');
    });
    // Закрытие попапа
    $('.exit').on('click', function (e) {
        e.preventDefault();
        $('#popup__burger').removeClass('open');
    });

// Закрытие попапа при клике за пределами контента
    $('#popup__burger').on('click', function (event) {
        if (!$(event.target).closest('.burger__content').length) {
            $(this).removeClass('open');
        }
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // изменение контента в перечне услуг

    function contentChange() {
        // Проверяем, какое значение ширины экрана
        let isMobile = window.matchMedia('(max-width: 700px)').matches;

        // Обновляем текст для типов услуг
        $('#complex').text(isMobile ? 'Комплекс' : 'Комплексные услуги');
        $('#additionally').text(isMobile ? 'Дополнительно' : 'Дополнительные услуги');

        // Обновляем названия, описания и цены для каждого сервиса
        for (let serviceKey in servicesData) {
            let service = servicesData[serviceKey];

            for (let i = 0; i < service.names.length; i++) {
                // Обновляем названия
                let nameToSet = isMobile ? service.shortNames[i] : service.names[i];
                $(`#name_list li:nth-child(${i + 1})`).text(nameToSet);

                // Обновляем описания
                let descToSet = isMobile ? service.shortDescriptions[i] : service.descriptions[i];
                $(`#disc_list li:nth-child(${i + 1})`).text(descToSet);

                // Обновляем цены
                let priceToSet = isMobile ? service.shortPrices[i] : service.prices[i];
                $(`#sum_list li:nth-child(${i + 1})`).text(priceToSet);
            }
        }
    }

    // Выполнение функции при загрузке страницы
    $(window).on('load', contentChange);

// Отслеживание изменения размера окна
    $(window).on('resize', contentChange);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // подключение масок

    $('#popup__phone').inputmask("+9(999)-999-99-99");
    $('#order__phone').inputmask("+9(999)-999-99-99");
    $('#order__date').inputmask("99.99.9999");
    $('#order__time').inputmask("99:99");

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // подключение timepicker

    $('.timepicker').timepicker({
        // timeFormat: 'HH:mm',
        // interval: 60,
        // minTime: '01',
        // maxTime: '24:00',
        // defaultTime: '12:00',
        // startTime: '00:00',
        // dynamic: false,
        // dropdown: true,
        // scrollbar: true,
        zindex: 5,
    });

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // подключение карты Яндекс
    // смотри комментарии по картам
    initMap();

    ymaps3.ready.then(() => {
        // HTML-элемент.
        const map = new ymaps3.YMap($('#map'), {
            location: {
                center: [37.588144, 55.733842],
                zoom: 5
            },
            mode: 'vector',
        });

        const layer = new YMapDefaultSchemeLayer();
        map.addChild(layer);
    });



    // async function initMap() {
    //     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    //     await ymaps3.ready;
    //
    //     const {YMap, YMapDefaultSchemeLayer} = ymaps3;
    //
    //     // Иницилиазируем карту
    //     const map = new YMap(
    //         // Передаём ссылку на HTMLElement контейнера
    //         document.getElementById('map'),
    //
    //         // Передаём параметры инициализации карты
    //         {
    //             location: {
    //                 // Координаты центра карты
    //                 center: [37.588144, 55.733842],
    //
    //                 // Уровень масштабирования
    //                 zoom: 10
    //             }
    //         }
    //     );
    //
    //     // Добавляем слой для отображения схематической карты
    //     map.addChild(new YMapDefaultSchemeLayer());
    // }
});