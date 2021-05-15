$(function () {
    // contentApiKey is instance-dependent; replace this with a new key if
    // testing on a local instance
    // new SearchinGhostEasy({ contentApiKey: '3ecdb68993794bc0157e776e5d' });

    // Filter feature
    var primaryFilters = "";
    var internalFilters = "";

    function getFilterOptions(target) {
        // Retrieve select value from filter and manipulate the values for filtering
        var filterOptions = $(target).val() ? $(target).val() : [];
        // Check if target is an internal tag filter
        var internalTag = $(target).hasClass("internal-tag");
        // Set respective prefix
        var tagPrefix = internalTag ? ".tag-hash-" : ".tag-";
        // Initialise a new array for holding raw values to be written to localstorage
        var rawFilter = new Array();
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
        var filters = [];
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
            var rawIntFilter = localStorage
                .getItem("internalFilters")
                .split("|");
            $("#internal-filter").val(rawIntFilter).change();
        } else {
            // First load, select all by default
            $("#internal-filter option").prop("selected", "selected");
            $("#internal-filter").selectpicker("refresh");
        }
        if (localStorage.getItem("primaryFilters") != null) {
            var rawPriFilter = localStorage
                .getItem("primaryFilters")
                .split("|");
            $("#primary-filter").val(rawPriFilter).change();
        } else {
            // First load, select all by default
            $("#primary-filter option").prop("selected", "selected");
            $("#primary-filter").selectpicker("refresh");
        }
    }
    function createPagination() {
        console.log("createPagination");
        // var pages = pages ? pages : 0;
        var url = window.location.href;
        if (pages && pages > 1) {
            console.log("pages && pages > 1");
            var paginationArr = pagination(page, pages);
            var paginationItem;

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
    $(document).ready(function () {
        // On page load, set persisted filters via localstorage
        retrieveFiltersFromLS();
        // Filter posts on active page
        filterPosts();
        // Listen to changes to both filters
        $("#primary-filter, #internal-filter").change(function () {
            // Retrieve filter options on selection change
            getFilterOptions(this);
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
        createPagination();
    });
});
