const EVENTS_LIMIT = 3;

const api = new GhostContentAPI({
    url: ADVISORY.SITE_URL,
    key: ADVISORY.CONTENT_API_KEY,
    version: "v4",
});

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const parseEvent = (post) => {
    const splitTitle = post.title.split(":"); // <!> This assumes all event titles contain a colon
    const splitDate = post.custom_excerpt.split("-");
    return {
        day: splitDate[2],
        month: MONTHS[parseInt(splitDate[1]) - 1],
        titlePrefix: splitTitle[0],
        titleSuffix: splitTitle[1],
    };
};

const date = new Date().toISOString().split("T")[0];

window.eventCards = function () {
    return {
        posts: [],
        isShowPlaceholder: true,
        placeholderText: null,
        init() {
            let referenceObj = this;
            const filterQuery = `tag:hash-event+custom_excerpt:>='${date}'`;
            api.posts
                .browse({
                    include: "tags",
                    filter: filterQuery,
                    order: "custom_excerpt ASC",
                })
                .then((posts) => {
                    if (posts.length > 0) {
                        referenceObj.isShowPlaceholder = false;
                        referenceObj.posts = posts
                            .slice(0, EVENTS_LIMIT + 1)
                            .map(parseEvent);
                    } else {
                        referenceObj.isShowPlaceholder = true;
                        referenceObj.placeholderText = "No upcoming events.";
                    }
                })
                .catch(console.error);
        },
    };
};
