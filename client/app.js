
function getData() {
    $.ajax({
        type: "GET",
        datatype: "application/json",
        url: "/users/searchUsers",
        success: function(response) {
            console.log("Got you the Search GET", response);
            displayData(response);
        },
        error: function(err) {
            console.log("No Search GET for you! ", err);
        },
        complete: function() {
            console.log("Search GET function done");
        }
    });
}

function displayData(data) {
    for (var j = 0; j < data.length; j++) {
        $(".displayUsers").append("Username: ", data[j].username);
    }
}

$(document).ready(function() {
    getData();
});