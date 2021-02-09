/* an experimental widget that rewrites h1s into toggle dropdowns */

$(function () {
    var isHiding = {};

    $(".gh-content > h1").each(function () {
        $(this).addClass(
            "h1-toggle cursor-default no-underline hover:cursor-pointer hover:underline"
        );
    });

    $(".h1-toggle").each(function () {
        var $header = $(this);
        var headerId = $header.attr("id");

        function hideHeader() {
            $header.addClass("h1-toggle-hide");
            $header.removeClass("h1-toggle-show");
            $header.nextUntil("h1").hide();

            $("#" + headerId + " > i").remove();
            $header.prepend('<i class="fas fa-chevron-up px-2 py-0"></i>');
        }

        function showHeader() {
            $header.addClass("h1-toggle-show");
            $header.removeClass("h1-toggle-hide");
            $header.nextUntil("h1").show();

            $("#" + headerId + " > i").remove();
            $header.prepend('<i class="fas fa-chevron-down px-2 py-0"></i>');
        }

        // set headers to be hidden by default,
        // unless the header has been set to show...
        if ($header.hasClass("h1-toggle-show")) {
            showHeader($header);
            isHiding[headerId] = false;
        } else {
            hideHeader($header);
            isHiding[headerId] = true;
        }
        // ...and to toggle between hidden/shown when clicked.
        $header.click(function () {
            if (isHiding[headerId]) showHeader();
            else hideHeader();
            isHiding[headerId] = !isHiding[headerId];
        });
    });
});
