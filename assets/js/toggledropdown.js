/* an experimental widget for rewriting h1s on posts into toggle dropdowns */

$(function($) {
    var isHiding = {};

    $('.gh-content > h1').each(function() {
        var $header = $(this);
        var headerId = $header.attr('id');

        $header.addClass('h1-toggle');
        $header.nextUntil('h1').addClass(headerId + '-child');

        function hideHeader() {
            $header.addClass('h1-toggle-hide');
            $header.removeClass('h1-toggle-show');
            $header.nextUntil('h1').hide();
        }

        function showHeader() {
            $header.addClass('h1-toggle-show');
            $header.removeClass('h1-toggle-hide');
            $header.nextUntil('h1').show();
        }

        // set headers to be hidden by default
        hideHeader($header);
        isHiding[headerId] = true;

        // ... and to toggle between hidden/shown when clicked
        $header.click(function() {
            if (isHiding[headerId]) showHeader();
            else hideHeader();
        });
        isHiding[headerId] = !isHiding[headerId];
    });
});
