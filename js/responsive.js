var defaultURL = 'salimane.com'; //<---- CHANGE TO YOUR WEBSITE URL

//show loading graphic

function showLoader(id) {
    $('#' + id + ' img').fadeIn('slow');
}

//hdie loading graphic

function hideLoader(id) {
    $('#' + id + ' img').fadeOut('slow');
}

//function to check load state of each frame

function allLoaded() {
    var results = [];
    $('iframe').each(function() {
        if (!$(this).data('loaded')) {
            results.push(false);
        }
    });
    var result = (results.length > 0) ? false : true;
    return result;
}

function loadPage($frame, url) {
    if (url.substr(0, 7) !== 'http://' && url.substr(0, 8) !== 'https://' && url.substr(0, 7) !== 'file://') {
        url = 'http://' + url;
    }
    $('iframe').not($frame).each(function() {
        showLoader($(this).parent().attr('id'));
    })
    $('iframe').not($frame).data('loaded', false);
    $('iframe').not($frame).attr('src', url);
}

$('.frame').each(function() {
    showLoader($(this).attr('id'));
});

function quickloader(url) {
    loading(url);
    loadPage('', url);
}


//when document loads
$(document).ready(function() {

    loadPage('', defaultURL);

    //query string
    var qsArray = window.location.href.split('?');
    var qs = qsArray[qsArray.length - 1];

    if (qs !== '' && qsArray.length > 1) {
        $('#url input[type=text]').val(qs);
        quickloader(url);
    }

    //set slidable div width
    $('#frames #inner').css('width', function() {
        var width = 0;
        $('.frame').each(function() {
            width += $(this).outerWidth() + 20;
        });
        return width;
    });

    //add event handlers for options radio buttons
    $('input[type=radio]').change(function() {
        $frames = $('#frames');
        $inputs = $('input[type=radio]:checked').val();

        if ($inputs == '1') {
            $frames.addClass('widthOnly');
        } else {
            $frames.removeClass('widthOnly');
        }
    });

    //add event handlers for scrollbars checkbox
    $('input[type=checkbox]').change(function() {
        var scrollBarWidth = 15;
        $frames = $('#frames');
        $inputs = $('#scrollbar:checked');

        if ($inputs.length === 0) {
            scrollBarWidth = -15;
        }

        $frames.find('iframe').each(function(i, el) {
            $(el).attr('width', parseInt($(el).attr('width')) + scrollBarWidth);
        });
    });

    //when the url textbox is used
    $('form').submit(function() {
        url = $('#url input[type=text]').val();
        quickloader(url);
        return false;
    });

    //when frame loads
    $('iframe').load(function() {

        var $this = $(this);
        var url = '';
        var error = false;

        try {
            url = $this.contents().get(0).location.href;
        } catch (e) {
            error = true;
            if ($('#url input[type=text]').val() !== '') {
                url = $('#url input[type=text]').val();
            } else {
                url = defaultURL;
            }
        }

        //load other pages with the same URL
        if (allLoaded()) {
            if (error) {
                alert('Browsers prevent navigation from inside iframes across domains.\nPlease use the textbox at the top for external sites.');
                loadPage('', defaultURL);
            } else {
                loadPage($this, url);
            }
        }

        //when frame loads, hide loader graphic
        else {
            error = false;
            hideLoader($(this).parent().attr('id'));
            $(this).data('loaded', true);
        }
    });

});

eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return c.toString(36)
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[c.toString(a)] = k[c] || c.toString(a)
        }
        k = [function(e) {
            return d[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('4 5(0){3(0===\'1.2\'){6(\'7 c!!! d b a 8 9 e ;)\')}}', 15, 15, 'url|salimane|com|if|function|loading|alert|Nice|would|do|you|knew|try|I|this'.split('|'), 0, {}))