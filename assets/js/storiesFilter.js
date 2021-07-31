const retrieveFilters = (target) => {
    const filterOptions = $(target).val() || [];
    const isInternalTag = $(target).hasClass("internal-tag");
    const tagPrefix = isInternalTag ? ".tag-hash-" : ".tag-";
    return filterOptions.map((value) => tagPrefix + value);
};

const filterPosts = () => {
    const primaryFilters = retrieveFilters($("#primary-filter"));
    const internalFilters = retrieveFilters($("#internal-filter"));
    const filters = primaryFilters.flatMap((filter1) =>
        internalFilters.map((filter2) => filter1 + filter2)
    );

    $(".gh-postfeed")
        .children()
        .each(function () {
            if (filters.some((filter) => $(this).is(filter))) {
                $(this).removeClass("d-none");
            } else {
                $(this).addClass("d-none");
            }
        });
};

$(document).ready(() => {
    filterPosts();
    $("#primary-filter, #internal-filter").change(() => filterPosts());
});
