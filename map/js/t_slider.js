$(function () {
    var ok = true;
    var pos;

    $('img.jail').jail({ event: 'load' });
    $('.slider_leftpanel_slide > .ul').css({ 'top': 290 - ($('.slider_leftpanel_slide > .ul > .slider_leftpanel_game').length * 97) });
	//$('.slider_leftpanel_slide > .ul').css({ 'top': 300 - ($('.slider_leftpanel_slide > .ul').height()) });
	//$('.slider_leftpanel_slide > .ul').css({ 'top': 0 });
	
    setInterval(function () {
        $('.uparr').click();
    }, 5000);

    $('.uparr').click(function () {
        if (ok) {
            ok = false;
            pos = $('.slider_leftpanel_slide > .ul').position();
            $('.slider_leftpanel_slide > .ul').prepend($('.slider_leftpanel_slide > .ul > .slider_leftpanel_game').slice(-1).clone());
            $('.slider_leftpanel_slide > .ul').css({ 'top': (pos.top - 100) });
            $('.slider_leftpanel_slide > .ul').animate({ top: '+=100' }, 300, function () {
                $('.slider_leftpanel_slide > .ul > .slider_leftpanel_game').slice(-1).remove();
                ok = true;
            });

            $('.slider_rightpanel_slide > .ul').animate({ top: '-=350' }, 300, function () {
                pos = $('.slider_rightpanel_slide > .ul').position();
                $('.slider_rightpanel_slide > .ul').append($('.slider_rightpanel_slide > .ul > div').eq(0).clone());
                $('.slider_rightpanel_slide > .ul').css({ 'top': (pos.top + 350) });
                $('.slider_rightpanel_slide > .ul > div').eq(0).remove();
            });
        }
    });

    $('.downarr').click(function () {
        if (ok) {
            ok = false;
            $('.slider_leftpanel_slide > .ul').append($('.slider_leftpanel_slide > .ul > div').eq(0).clone());
            $('.slider_leftpanel_slide > .ul').animate({ top: '-=100' }, 300, function () {
                pos = $('.slider_leftpanel_slide > .ul').position();
                $('.slider_leftpanel_slide > .ul > div').eq(0).remove();
                $('.slider_leftpanel_slide > .ul').css({ 'top': (pos.top + 100) });
                ok = true;
            });

            $('.slider_rightpanel_slide > .ul').prepend($('.slider_rightpanel_slide > .ul > div').slice(-1).clone());
            pos = $('.slider_rightpanel_slide > .ul').position();
            $('.slider_rightpanel_slide > .ul').css({ 'top': (pos.top - 350) });
            $('.slider_rightpanel_slide > .ul').animate({ top: '+=350' }, 300, function () {
                $('.slider_rightpanel_slide > .ul > div').slice(-1).remove();
            });
        }
    });
});        