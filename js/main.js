$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}
	//Adaptive functions
	$(window).resize(function (event) {
		adaptive_function();
	});

	function adaptive_header(w, h) {
		var headerMenu = $('.header-menu');
		var headerContacts = $('.header-contacts');
		if (w < 767) {
			if (!headerContacts.hasClass('done')) {
				headerContacts.addClass('done').appendTo(headerMenu);
			}
		} else {
			if (headerContacts.hasClass('done')) {
				headerContacts.removeClass('done').appendTo(headerMenu);
			}
		}
	}

	function adaptive_function() {
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		adaptive_header(w, h);
	}
	adaptive_function();
	//SLIDERS
	if ($('.slider__body').length > 0) {
		$('.slider__body').slick({
			autoplay: true,
			//infinite: false,
			dots: true,
			arrows: false,
			accessibility: false,
			slidesToShow: 1,
			autoplaySpeed: 3000,
			// adaptiveHeight: true,
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>',
			responsive: [{
				breakpoint: 768,
				settings: {}
			}]
		});
	}
	sectors($(this).scrollTop());
	$(window).scroll(function (event) {
		var scr = $(this).scrollTop();
		sectors(scr);
	});

	function sectors(scr) {
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		var headerheight = 80;
		if (w < 768) {
			headerheight = 50;
		}
		if (scr > 0) {
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}
		if (scr > h) {
			$('#up').fadeIn(300);
		} else {
			$('#up').fadeOut(300);
		}
		$.each($('.sector'), function (index, val) {
			var th = $(this).outerHeight();
			var tot = $(this).offset().top;
			if (scr >= tot && scr <= tot + th - h) {
				$('.sector.scroll').removeClass('scroll');
				$(this).addClass('scroll');
			}
			if ($(this).hasClass('scroll')) {
				if (scr >= tot && scr <= tot + th - h) {
					if ($(this).hasClass('normalscroll')) {
						$('body').addClass('scroll');
					} else {
						$('body').removeClass('scroll');
					}
				} else {
					if ($(this).hasClass('normalscroll')) {
						$('body').removeClass('scroll');
					}
				}
			}
			if (scr > tot - h / 1.5 && scr < tot + th) {
				if ($('.dotts').length > 0) {
					dotts(index, 0);
				}
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
			if (scr > tot - h && scr < tot + th) {
				$(this).addClass('view');
				if ($(this).hasClass('padding')) {
					var ps = 100 - (tot - scr) / h * 100;
					var p = headerheight / 100 * ps;
					if (p >= headerheight) {
						p = headerheight;
					}
					$(this).css({
						paddingTop: p
					});
				}
			} else {
				$(this).removeClass('view');
			}
		});
		/*
		$.each($('.lz').not('.load'), function(index, val) {
				var img=$(this).data('image');
			if(scr>tot-h && scr<tot+th){
				$(this).html('<img src="'+img+'" alt="" />');
				$(this).addClass('load');
			}
		});
		*/
	}

	function dotts(ind, init) {
		if (init == true) {
			$.each($('.sector'), function (index, val) {
				$('.dotts-list').append('<li></li>');
			});
		}
		$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
	}
	$('body').on('click', '.dotts-list li', function (event) {
		var n = $(this).index() + 1;
		var offset = 0;
		$('body,html').animate({
			scrollTop: $('.sector-' + n).offset().top + offset
		}, 800, function () {});
	});




	//VALIDATE FORMS
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
			er += formValidate($(this));
		});
		if (er == 0) {
			removeFormError(form);
			/*
				var messagehtml='';
			if(form.hasClass('editprofile')){
				var messagehtml='';
			}
			formLoad();
			*/

			//ОПТРАВКА ФОРМЫ
			/*
			function showResponse(html){
				if(!form.hasClass('nomessage')){
					showMessage(messagehtml);
				}
				if(!form.hasClass('noclear')){
					clearForm(form);
				}
			}
			var options={
				success:showResponse
			};
				form.ajaxForm(options);
			

			setTimeout(function(){
				if(!form.hasClass('nomessage')){
					//showMessage(messagehtml);
					showMessageByClass(ms);
				}
				if(!form.hasClass('noclear')){
					clearForm(form);
				}
			},0);

			return false;
			*/

			if (ms != null && ms != '') {
				showMessageByClass(ms);
				return false;
			}
		} else {
			return false;
		}
	});

	function formValidate(input) {
		var er = 0;
		var form = input.parents('form');
		if (input.attr('name') == 'email' || input.hasClass('email')) {
			if (input.val() != input.attr('data-value')) {
				var em = input.val().replace(" ", "");
				input.val(em);
			}
			if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		} else {
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		}
		if (input.attr('type') == 'checkbox') {
			if (input.prop('checked') == true) {
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
			}
		}
		if (input.hasClass('name')) {
			if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
				er++;
				addError(input);
			}
		}
		if (input.hasClass('pass-2')) {
			if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
				addError(input);
			} else {
				removeError(input);
			}
		}
		return er;
	}

	function formLoad() {
		$('.popup').hide();
		$('.popup-message-body').hide();
		$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
		$('.popup-message').addClass('active').fadeIn(300);
	}

	function showMessageByClass(ms) {
		$('.popup').hide();
		popupOpen('message.' + ms, '');
	}

	function showMessage(html) {
		$('.popup-loading').remove();
		$('.popup-message-body').show().html(html);
	}

	function clearForm(form) {
		$.each(form.find('.input'), function (index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}

	function addError(input) {
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
		if (input.hasClass('email')) {
			var error = '';
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				error = input.data('error');
			} else {
				error = input.data('error');
			}
			if (error != null) {
				input.parent().append('<div class="form__error">' + error + '</div>');
			}
		} else {
			if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
				input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
			}
		}
		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().addClass('err');
			input.parents('.select-block').find('.select').addClass('err');
		}
	}

	function addErrorByName(form, input__name, error_text) {
		var input = form.find('[name="' + input__name + '"]');
		input.attr('data-error', error_text);
		addError(input);
	}

	function addFormError(form, error_text) {
		form.find('.form__generalerror').show().html(error_text);
	}

	function removeFormError(form) {
		form.find('.form__generalerror').hide().html('');
	}

	function removeError(input) {
		input.removeClass('err');
		input.parent().removeClass('err');
		input.parent().find('.form__error').remove();

		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().removeClass('err');
			input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
			//input.parents('.select-block').find('.select-options').hide();
		}
	}

	function removeFormErrors(form) {
		form.find('.err').removeClass('err');
		form.find('.form__error').remove();
	}

	function maskclear(n) {
		if (n.val() == "") {
			n.inputmask('remove');
			n.val(n.attr('data-value'));
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}

	function searchselectreset() {
		$.each($('.select[data-type="search"]'), function (index, val) {
			var block = $(this).parent();
			var select = $(this).parent().find('select');
			if ($(this).find('.select-options__value:visible').length == 1) {
				$(this).addClass('focus');
				$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
				$(this).find('.select-title__value').val($('.select-options__value:visible').html());
				$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
			} else if (select.val() == '') {
				$(this).removeClass('focus');
				block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
				block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
			}
		});
	}
	$('.wrapper').addClass('loaded');

	$('.icon-menu').click(function (event) {
		$(this).toggleClass('active');
		$('.menu__body').toggleClass('active');
		$('body').toggleClass('lock');
	});

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}

	ibg();
});