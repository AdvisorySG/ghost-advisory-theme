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
    } else {
        // Write values for primary tags
        primaryFilters = filterOptions;
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

$(document).ready(function () {
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
});
