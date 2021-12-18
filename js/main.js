$(document).ready(function () {

$('.mobile-wrap').on('click', function () {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
});

$(window).resize(function () {
    if ($(document).width() > 780) {
        $('.main-header__list').attr('style', '');
        $('.line-burger').removeClass('line-active');
    }
})

$(document).on('click', '.main-header__btn', function() {
  $('html,body').animate({scrollTop: $('.write').offset().top+"px"},{duration:1E3});
});

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });

}

  // деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail') || bool == true) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });

}

  // для проверки при нажатии

function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
}

  //  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

}

$('input[type="tel"]').mask("+38 (999) 999-99-99");

var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
var regPhone = /[_]/i;

$('#w_btn').on('click', function () {
    sendForm();
});

function sendForm() {
    var name = $('#w_fio').val();
    var phone = $('#w_tel').val();
    var email = $('#w_email').val();
    var msg = $('#w_msg').val();

    validate('#w_fio', 1, regName, '.write__error--fio');
    validate('#w_email', 1, regEmail, '.write__error--email');
    validate('#w_tel', 1, regPhone, '.write__error--tel', true);
    disBtn('#w_fio, #w_tel, #w_email', '#w_btn');

    valClick('#w_fio', 1, regName, '.write__error--fio'); 
    valClick('#w_email', 1, regEmail, '.write__error--email');
    valClick('#w_tel', 1, regPhone, '.write__error--tel', true);
    var btn_bool = disBtnClick('#w_fio, #w_tel, #w_email', '#w_btn');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                email: email,
                msg: msg,
            },
        }).done(function (data) {
            $('#w_fio, #w_tel, #w_email, #w_msg').val('').removeClass('form-done');
            var text = 'Ваше повідомлення відправлене!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#w_fio', 1, regName, '.write__error--name');
validate('#w_email', 1, regEmail, '.write__error--email');
validate('#w_tel', 1, regPhone, '.write__error--tel', true);
disBtn('#w_fio, #w_tel, #w_email', '#w_btn');



});