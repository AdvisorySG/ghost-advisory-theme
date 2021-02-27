$(function () {
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

    $(".event-card").each(function () {
        var dateArray = $(this)
            .find(".event-date-month")
            .eq(0)
            .text()
            .split("-");
        $(this).find(".event-date-day").eq(0).text(dateArray[2]);
        $(this)
            .find(".event-date-month")
            .eq(0)
            .text(monthNames[parseInt(dateArray[1]) - 1]);
    });
});
