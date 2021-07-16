const eventCard = require("./partials/event-card.hbs");

$(function () {
    var api = new GhostContentAPI({
        url: ADVISORY.SITE_URL,
        key: ADVISORY.CONTENT_API_KEY,
        version: "v4",
    });

    var monthNames = [
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

    function parseEvent(post) {
        var splitTitle = post.title.split(":"); // <!> This assumes all event titles contain a colon
        var splitDate = post.custom_excerpt.split("-");
        return {
            day: splitDate[2],
            month: monthNames[parseInt(splitDate[1]) - 1],
            titlePrefix: splitTitle[0],
            titleSuffix: splitTitle[1],
        };
    }

    function renderContainer(posts) {
        if (posts.length > 0) {
            $("#event-card-container").html(
                eventCard({
                    events: posts.slice(0, 4).map(parseEvent),
                })
            );
        } else {
            $("#event-card-placeholder").html("No upcoming events.");
        }
    }

    // Constructing date string for the current day
    var today = new Date();
    var month = today.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = today.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var date = today.getFullYear() + "-" + month + "-" + day;

    // Fetching event posts from API
    var filterQuery = "tag:hash-event+custom_excerpt:>='" + date + "'";
    api.posts
        .browse({
            include: "tags",
            filter: filterQuery,
            order: "custom_excerpt ASC",
        })
        .then(function (posts) {
            renderContainer(posts);
        })
        .catch(function (err) {
            console.error(err);
        });
});
