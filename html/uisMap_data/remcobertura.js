$(function () {

    var found = false;
    $("td").each(function (index, ele) {
        if ($(ele).text() == "Coberturas" || $(ele).text() == "COBERTURA") {
            found = true;
        }
    });
    if (found) {
        $("td").filter(':nth-child(2), :nth-child(3)').hide();
        var hideNext = false;
        $("td:visible").each(function (index, ele) {
            if(hideNext) {
                $(ele).hide();
                hideNext = false;
            }
            if ($(ele).attr("rowspan")) {
                hideNext = true;
            }
        });
    }
    $("body").css("max-width", "720px");
    $("body").css("margin", "auto");
});


