const eventCard = require("./partials/event-card.hbs");

$(function () {
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

    const renderContainer = (posts) => {
        if (posts.length > 0) {
            $("#event-card-container").html(
                eventCard({
                    events: posts.slice(0, 4).map(parseEvent),
                })
            );
        } else {
            $("#event-card-placeholder").html("No upcoming events.");
        }
    };

    // Fetching event posts from API
    const date = new Date().toISOString().split("T")[0];
    const filterQuery = `tag:hash-event+custom_excerpt:>='${date}'`;
    api.posts
        .browse({
            include: "tags",
            filter: filterQuery,
            order: "custom_excerpt ASC",
        })
        .then(renderContainer)
        .catch(console.error);
});
