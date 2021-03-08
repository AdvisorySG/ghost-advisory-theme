$(function () {
    var api = new GhostContentAPI({
        url: "https://beta.advisory.sg",
        key: "336313a0318904e945f0938d06",
        version: "v3",
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

    function renderCard(post) {
        var splitTitle = post.title.split(":"); // <!> This assumes all event titles contain a colon
        var splitDate = post.custom_excerpt.split("-");
        var html =
            '<article class="border-2 border-gray-400 rounded-xl p-4 event-card">\
                        <div class="grid grid-cols-2">\
                            <div>\
                                <p class="text-yellow-500 font-semibold text-5xl event-date-day">' +
            splitDate[2] +
            '</p>\
                                <p class="text-yellow-500 text-3xl event-date-month">' +
            monthNames[parseInt(splitDate[1]) - 1] +
            '</p>\
                            </div>\
                            <div>\
                                <p class="text-5xl text-gray-500 text-right">➔</p>\
                            </div>\
                        </div>\
                        \
                        <div class="my-4">\
                            <p class="text-gray-600 font-semibold text-5xl py-1">' +
            splitTitle[0] +
            ':</p>\
                            <p class="text-gray-600 font-semibold text-3xl">' +
            splitTitle[1] +
            "</p>\
                        </div>\
                    </article>";
        return html;
    }

    function renderContainer(posts) {
        var html = '<div class="grid grid-cols-4 gap-x-20 w-4/5 m-auto">';
        posts.slice(0, 4).forEach(function (post) {
            html += renderCard(post);
        });
        html += "</div>";

        $("#event-card-container").html(html);
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
