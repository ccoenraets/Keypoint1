var keypoint = (function () {

    var slides = $(".slide"),
        gallery,
        i,
        page,
        $menu = $("#menu"),
        sfClient;

    $(function() {
        FastClick.attach(document.body);
    });

//    $("#wrapper").on('touchmove', function (event) {
//        return false;
//    });

    window.onkeyup = function (event) {
        if (event.keyCode === 39) {
            var builds = $('.build', slides[gallery.pageIndex]);
            if (builds[0]) {
                $(builds[0]).attr('class', 'built');
            } else {
                return gallery.next();
            }
        }
        if (event.keyCode === 37) {
            var builds = $('.built', slides[gallery.pageIndex]);
            if (builds.length>0) {
                $(builds[builds.length - 1]).attr('class', 'build');
            } else {
                return gallery.prev();
            }
        }
    }

    $("#menu-btn").on('click', toggleMenu);

    $("#wrapper").on("click", function() {
        if ($menu.hasClass("visible")) {
            $menu.removeClass("visible");
        }
    });

    window.onhashchange = function () {
        var p = parseInt(window.location.hash.substr(1)) || 0;
        gallery.goToPage(p);
    }

    prettyPrint();

    var baseURL = $('#slides').attr('data-base-url');
    var index = baseURL.indexOf('?');
    if (index>0) {
        baseURL = baseURL.substring(0, index);
    }
    console.log('base url: ' + baseURL);
    var images = $('img');
    for (var i=0;i<images.length;i++) {
        var src = $(images[i]).attr('data-src');
        if (src) {
            $(images[i]).attr('src', baseURL + src);
        }
    }

    $("#slides").remove();

    var liStr = "";
    for (var i=0; i<slides.length; i++) {
        var h1 = $("h1", slides[i]);
        liStr += '<li class="item"><a href="#' + i + '">' + (h1[0] ? h1[0].innerText : 'No title') + "</a></li>";
    }
    $("#list").html(liStr);


    function toggleMenu() {
        if ($menu.hasClass("visible")) {
            $menu.removeClass("visible");
        } else {
            $menu.addClass("visible");
        }
        return false;
    };

    gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

    for (i = 0; i < 3; i++) {
        page = i == 0 ? slides.length - 1 : i - 1;
        gallery.masterPages[i].appendChild(slides[page]);
    }

    setTimeout(function () {
        var p = parseInt(window.location.hash.substr(1)) || 0;
        gallery.goToPage(p);
    });

    gallery.onTouchStart(function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    });

    gallery.onFlip(function () {

        var el,
            upcoming,
            i;

        window.location.hash = gallery.pageIndex;

        for (i = 0; i < 3; i++) {
            upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
            if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                el = gallery.masterPages[i].querySelector('.slide');
                if (el) gallery.masterPages[i].removeChild(el);
                el = gallery.masterPages[i].appendChild(slides[upcoming]);
                el.className += " loading";
            }
        }

    });

    function init(session) {
        sfClient = new forcetk.Client();
        sfClient.setSessionToken(session);
        $(document).trigger('sfready');
    }

    function getSFClient() {
        return sfClient;
    }

    function getSlides() {
        return slides;
    }

    return {
        init: init,
        getSFClient: getSFClient,
        getSlides: getSlides
    }

}());