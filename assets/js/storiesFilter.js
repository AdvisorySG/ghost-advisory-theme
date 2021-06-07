// Source: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (var i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (
        var arr = range,
            isArray = Array.isArray(arr),
            i = 0,
            arr = isArray ? arr : arr[Symbol.iterator]();
        ;

    ) {
        var ref;

        if (isArray) {
            if (i >= arr.length) break;
            ref = arr[i++];
        } else {
            i = arr.next();
            if (i.done) break;
            ref = i.value;
        }

        var n = ref;

        if (l) {
            if (n - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (n - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(n);
        l = n;
    }
    return rangeWithDots;
}

// Filter feature
let primaryFilters = "";
let internalFilters = "";

function getFilterOptions(target) {
    // Retrieve select value from filter and manipulate the values for filtering
    let filterOptions = $(target).val();
    // Check if target is an internal tag filter
    let internalTag = $(target).hasClass("internal-tag");
    // Set respective prefix
    let tagPrefix = internalTag ? ".tag-hash-" : ".tag-";
    // Initialise a new array for holding raw values to be written to localstorage
    let rawFilter = new Array();
    // Loop through each item in the filter
    $.each(filterOptions, function (index, value) {
        // Push the raw value for localstorage
        rawFilter.push(value);
        filterOptions[index] = tagPrefix + slugRegex(value);
    });
    if (internalTag) {
        // Write values for internal tags
        internalFilters = filterOptions;
        // Write internal filters to localstorage for persistance across pages
        localStorage.setItem("internalFilters", rawFilter.join("|"));
    } else {
        // Write values for primary tags
        primaryFilters = filterOptions;
        // Write filters to localstorage for persistance across pages
        localStorage.setItem("primaryFilters", rawFilter.join("|"));
    }
}
function slugRegex(value) {
    // ! Potentially breaking regex
    // Basic slug generator: replace whitespaces with dashes, then strip punctuation
    return value
        .replace(/\s+/g, "-")
        .replace(/[.,'!?]/, "")
        .toLowerCase();
}
function filterPosts() {
    // Get filter options for both filter categories
    getFilterOptions($("#primary-filter"));
    getFilterOptions($("#internal-filter"));
    let filters = [];
    if (primaryFilters.length >= 1 && internalFilters.length >= 1) {
        // Combine filters for an AND relationship filter
        $.each(primaryFilters, function (indexP, valueP) {
            $.each(internalFilters, function (indexI, valueI) {
                filters.push(valueP + valueI);
            });
        });
    } else {
        // Get filters
        filters = primaryFilters.concat(internalFilters);
    }
    // Hide all posts by default
    $(".gh-postfeed")
        .children()
        .each(function () {
            $(this).addClass("d-none");
        });
    if (filters.length > 0) {
        // Show post if post meets the filter tags
        $.each(filters, function (index, value) {
            $(".gh-postfeed")
                .children()
                .each(function () {
                    if ($(this).is(value)) {
                        $(this).removeClass("d-none");
                    }
                });
        });
    }
}

function retrieveFiltersFromLS() {
    // Retrieve filters from local storage and set it to the respective select element (force refresh using change())
    if (localStorage.getItem("internalFilters") != null) {
        let rawIntFilter = localStorage.getItem("internalFilters").split("|");
        $("#internal-filter").val(rawIntFilter).change();
    } else {
        // First load, select all by default
        $("#internal-filter option").prop("selected", "selected");
        $("#internal-filter").selectpicker("refresh");
    }
    if (localStorage.getItem("primaryFilters") != null) {
        let rawPriFilter = localStorage.getItem("primaryFilters").split("|");
        $("#primary-filter").val(rawPriFilter).change();
    } else {
        // First load, select all by default
        $("#primary-filter option").prop("selected", "selected");
        $("#primary-filter").selectpicker("refresh");
    }
}
$(document).ready(function () {
    // On page load, set persisted filters via localstorage
    retrieveFiltersFromLS();
    // Filter posts on active page
    filterPosts();
    // Listen to changes to both filters
    $("#primary-filter, #internal-filter").change(function () {
        // Retrieve filter options on selection change
        // getFilterOptions(this);
        // Filter
        filterPosts();
    });
    // Mobile Menu Trigger
    $(".gh-burger").click(function () {
        $("body").toggleClass("gh-head-open");
    });

    $(".clear-filter").click(function (event) {
        $(".gh-postfeed")
            .children()
            .each(function () {
                $(this).removeClass("d-none");
            });
    });
    function createPagination() {
        var url = window.location.href;
        if (pages > 1) {
            var paginationArr = pagination(page, pages);
            var paginationItem;
            var isCurrent = "";

            for (var i = paginationArr.length - 1; i >= 0; i--) {
                var pageNum = paginationArr[i];

                if (pageNum === page) {
                    paginationItem =
                        '<li class="page-item disabled"><a class="page-link">' +
                        pageNum +
                        "</a></li>";
                } else if (typeof pageNum === "number") {
                    var urlArray = url.split("/");
                    if (urlArray[urlArray.length - 3] === "page") {
                        url = url.replace(/\/page\/.*$/, "") + "/";
                    }
                    paginationItem =
                        '<li class="page-item">' +
                        '<a class="page-link" href="' +
                        url +
                        "page/" +
                        pageNum +
                        '" aria-label="Page ' +
                        pageNum +
                        '">' +
                        pageNum +
                        "</a>" +
                        "</li>";
                } else {
                    paginationItem =
                        '<li class=" page-item disabled"><a class="page-link">&hellip;</a></li>';
                }
                $(".pagination-previous").after(paginationItem);
            }
        } else {
            $(".pagination").css("display", "none");
        }
    }
    createPagination();
});
