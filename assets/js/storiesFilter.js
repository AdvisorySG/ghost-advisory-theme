const INCREMENT = 2;

const retrieveFilters = (target) => {
    const filterOptions = $(target).val() || [];
    const isInternalTag = $(target).hasClass("internal-tag");
    const tagPrefix = isInternalTag ? ".tag-hash-" : ".tag-";
    return filterOptions.map((value) => tagPrefix + value);
};

const filterPosts = (limit) => {
    const primaryFilters = retrieveFilters($("#primary-filter"));
    const internalFilters = retrieveFilters($("#internal-filter"));
    const filters = primaryFilters.flatMap((filter1) =>
        internalFilters.map((filter2) => filter1 + filter2)
    );

    let count = 0;
    let isMoreLeft = true;
    $(".gh-postfeed")
        .children()
        .each(function () {
            if (count >= limit) {
                $(this).addClass("d-none");
                isMoreLeft = false;
                return;
            }

            if (filters.some((filter) => $(this).is(filter))) {
                $(this).removeClass("d-none");
                count += 1;
            } else {
                $(this).addClass("d-none");
            }
        });

    if (isMoreLeft) {
        $("#load-more").addClass("d-none");
        $("#load-more-text").removeClass("d-none");
    } else {
        $("#load-more").removeClass("d-none");
        $("#load-more-text").addClass("d-none");
    }
};

$(document).ready(() => {
    let postLimit = INCREMENT;
    filterPosts(postLimit);

    $("#primary-filter, #internal-filter").change(() => {
        postLimit = INCREMENT;
        filterPosts(postLimit);
    });

    $("#load-more").click(() => {
        postLimit += INCREMENT;
        filterPosts(postLimit);
    });
});
