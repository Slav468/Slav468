$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/ico/arrow/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/ico/arrow/right.svg"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: false,
                arrows: false
            }
        }]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
        $(this)
            .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
            .closest('div.catalog__wrapper').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-card__content').eq(i).toggleClass('catalog-card__content-active');
                $('.list-wrapper').eq(i).toggleClass('list-wrapper-active');
            })
        });
    };

    toggleSlide('.catalog-card__link');
    toggleSlide('.list-wrapper__back');


    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #modal-consult').fadeIn('slow');
        $('#modal-consult').css('display', 'flex');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #modal-consult, #modal-buy, #modal-thanks').fadeOut('slow');
    });

    $('.button__mini').each(function(i) {
        $(this).on('click', function() {
            $('#modal-buy .modal__descr').text($('.catalog-card__title').eq(i).text());
            $('.overlay, #modal-buy').fadeIn('slow');
            $('#modal-buy').css('display', 'flex');
        });
    });

    //Validation

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя",
                    minlength: jQuery.validator.format("Минимальное число символов {0}")
                },
                phone: "Введите номер телефона",
                email: {
                    required: "Введите свой адрес электронной почты",
                    email: "Ваш адрес должен быть в формате name@domain.com"
                }
            }
        });
    };
    validateForm('#consultation-form');
    validateForm('#modal-consult form');
    validateForm('#modal-buy form');

    //Maskinput
    $('input[name=phone]').mask("+375(99)-999-99-99");

    //Mailer

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#modal-consult, #modal-buy').fadeOut();
            $('.overlay, #modal-thanks').fadeIn('slow');
            $('.overlay, #modal-thanks').css('display', 'flex');
            $('form').trigger('reset');
        });
        return false;
    });

    //Smoth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.scroll__up').fadeIn();
        } else $('.scroll__up').fadeOut();
    });

    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    //Animation

    new Window().innerWidth();
});