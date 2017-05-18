/**
 * Created by CardoKambla on 20.04.2017.
 */

$(document).ready(function() {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
        },
        error: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
        }
    });

    loadElements();


});
function loadElements(){
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/getMe',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#myUsername").text(data.username);
            $("#myName").text(data.firstname + " " + data.lastname);
            if(data.profile_pic == null){
                $("#profilePicture").attr("src","../../pictures/question-mark.gif");
            }else{
                $("#profilePicture").attr("src","https://iizibang.jjdev.eu/uploads/profilepics/"+data.profile_pic);
            }

        },
        error: function (data) {
            $("#myUsername").text("Could not connect");
            $("#myName").text("To the database");
            $("#profilePicture").attr("src","../../pictures/iiZiBangLogo.png");
        }
    })
}

$("#logout").click(function() {
    $.ajax({
        url : "https://iizibang.jjdev.eu/api/logout",
        method : "POST",
        success : function(data) {
            window.location.replace("https://iizibang.jjdev.eu/");
        },
        error : function(data) {
            alert("Error");
        }
    });
});

$("#change-picture-form").submit(function(e) {
    e.preventDefault();
        var data = new FormData(jQuery('#change-picture-form')[0]);


        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/changepicture',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                loadElements();

            },
            error: function (data) {
                alert('Error communicating with the API');
            }
        });

});


