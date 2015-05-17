
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
    $('.displayUsers').empty();
    for (var j = 0; j < data.length; j++) {
        var username = "Username: " + data[j].username + "\n";
        var name = "Name: " + data[j].name.first + " " + data[j].name.last + "\n";
        var email = "Email: " + data[j].email + "\n";
        var removeBtn = "<button data-id=" + data[j]._id + " class='removeData'>Delete</button>"
        $(".displayUsers").append("<div>" + username + name + email + removeBtn + "</div>");
    }
}

function deleteUser(dataId){
    $.ajax({
        type: "DELETE",
        datatype: "application/json",
        url: "/users/"+dataId,
        success: function(response) {
            console.log("User was DELETED", response);
            getData();
        },
        error: function(err) {
            console.log("No DELETE for you! ", err);
        },
        complete: function() {
            console.log("DELETE function done");
        }
    });
}

$(document).ready(function() {
    getData();

    $('.logout').on('click', function() {

    })
    $(".displayUsers").on('click', '.removeData', function() {
        var user = $(this).data('id');
        deleteUser(user);
    });
});