var prev;
var pages;
var page;
var next;
var pageUrl;
var pageUrlPrev;
var pageUrlNext;
var numbersSurroundingEllipses = 3;
var useSimplePagination = false;

function doSimplePagination() {
    $(".bootstrap-pagination").append(
        '<li class="page-item"><a class="page-link" href="' +
            pageUrl +
            'page/"' +
            page +
            '" aria-label="Page ' +
            page +
            " of " +
            pages +
            '">Page ' +
            page +
            " of " +
            pages +
            "</a></li>"
    );
}

function addPageLink(pageNum) {
    $(".bootstrap-pagination").append(
        "<li class='page-item page" +
            pageNum +
            "'><a class='page-link' href='" +
            pageUrl +
            "page/" +
            pageNum +
            "/' title='Go to page " +
            pageNum +
            "' aria-label='Go to page " +
            pageNum +
            "'>" +
            pageNum +
            "</a></li>"
    );
}

function doSimplePagination() {
    $(".bootstrap-pagination").append(
        '<li class="page-item"><a class="page-link" href="' +
            pageUrl +
            'page/"' +
            page +
            '" aria-label="Page ' +
            page +
            " of " +
            pages +
            '">Page ' +
            page +
            " of " +
            pages +
            "</a></li>"
    );
}
function doComplexPagination() {
    if (numbersSurroundingEllipses < 0) {
        numbersSurroundingEllipses = pages;
    } else if (numbersSurroundingEllipses < 2) {
        numbersSurroundingEllipses = 2;
    }
    var curPage = page;
    var showEllipses = true;
    var maxAdjusted = pages - numbersSurroundingEllipses * 2;
    if (curPage > maxAdjusted) {
        showEllipses = false;
        curPage = pages - numbersSurroundingEllipses * 2;
    } else {
        curPage--;
    }
    if (curPage < 1) {
        curPage = 1;
    }
    var firstLiCount = curPage + numbersSurroundingEllipses;
    for (var i = curPage; i < firstLiCount; i++) {
        addPageLink(i);
    }
    if (pages > numbersSurroundingEllipses) {
        if (showEllipses) {
            $(".bootstrap-pagination").append(
                '<li class="page-item disabled"><a class="page-link" href="' +
                    pageUrl +
                    'page/"' +
                    page +
                    '">&#x2026;</a></li>'
            );
        } else {
            addPageLink(pages - numbersSurroundingEllipses);
        }
        for (i = pages - numbersSurroundingEllipses + 1; i <= pages; i++) {
            addPageLink(i);
        }
    }
    $("li.page" + page).addClass("active");
}
