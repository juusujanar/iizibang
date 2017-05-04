/**
 * Created by CardoKambla on 20.04.2017.
 */

$(document).ready(function() {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data.loggedIn === false) {
                sendToLogin();
            }
        },
        error: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
            console.log(data);
        }
    })

});


$("#logout").click(function() {
    $.ajax({
        url : "https://iizibang.jjdev.eu/api/logout",
        method : "POST",
        success : function(data) {
            console.log("clicked");
            window.location.replace("https://iizibang.jjdev.eu/");
        },
        error : function(data) {
            console.log(data);
            alert("Error");
        }
    });
});